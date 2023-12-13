import axios, { Cancel } from 'axios'

export default class BaseRequest {
  /** *************************************************初始化*********************************************************************/
  // 构造器函数
  constructor (initialData = {}) {
    // 初始化常量
    this.initConstants(initialData)
    // 初始化axios实例
    this.initAxios()
    // 初始化请求异常错误码
    this.initHttpErrorStatusMap()
  }

  // 初始化axios实例
  initAxios () {
    this.http = axios.create({
      timeout: this.requestCommonTimeout,
      withCredentials: true,
      headers: { 'X-Requested-With': 'XMLHttpRequest', 'Cache-Control': 'no-cache' },
      responseType: 'json',
      responseEncoding: 'utf8'
    })

    // 拦截器
    this.http.interceptors.request.use(this.requestInterceptorsSuccess, this.requestInterceptorsFail)
    this.http.interceptors.response.use(this.responseInterceptorsSuccess, this.responseInterceptorsFail)
  }

  // 初始化http错误码Map
  initHttpErrorStatusMap () {
    this.httpErrorStatusMap = {
      301: '永久重定向',
      302: '临时重定向',
      304: '资源未变更',
      400: '请求异常，服务器未识别',
      401: '当前无权限访问',
      403: '服务器拒绝访问',
      404: '当前请求不存在',
      405: '当前请求方法不被允许',
      406: '资源类型错误',
      500: '服务器内部错误',
      502: '网关异常',
      503: '当前服务不可用',
      504: '网关超时'
    }
  }

  // 初始化常量
  initConstants ({ type = 1, timeout = 20000, httpUnknownErrorCode = '100100', httpStatusErrorCode = '100101', httpTimeoutCode = '100102', requestErrorCommonCode = '100103', httpCancelCode = '100104' } = {}) {
    // 当前axios请求类型
    this.requestType = type
    // 默认超时时间
    this.requestCommonTimeout = timeout
    // 通用暂未纳入的状态码
    this.httpUnknownErrorCode = httpUnknownErrorCode
    // 请求报错
    this.requestErrorCommonCode = requestErrorCommonCode
    // 响应异常状态码
    this.httpStatusErrorCode = httpStatusErrorCode
    // 请求超时状态码
    this.httpTimeoutCode = httpTimeoutCode
    // 请求被取消状态码
    this.httpCancelCode = httpCancelCode
    // 取消请求的token Map
    this.cancelTokenMap = {}
    // 全局请求唯一id索引计数
    this.requestIdCount = 1
  }

  /** *************************************************拦截器*********************************************************************/
  requestInterceptorsSuccess = (request) => {
    // 业务方可以在重写方法中拼接公共业务参数，或者往header中筛入参数
    if (this.handleRequestInterceptorsSuccess) this.handleRequestInterceptorsSuccess(request)
    return request
  }

  requestInterceptorsFail = (error) => {
    // 暂未针对特殊处理
    return Promise.resolve({
      code: this.requestErrorCommonCode,
      msg: error.message || '请求异常，请检查后重试！',
      data: {}
    })
  }

  // 思考 如何 res, isSuccess
  responseInterceptorsSuccess = (response) => {
    let result = response.data || {}
    if (this.handleResponseInterceptorsSuccess) {
      result = this.handleResponseInterceptorsSuccess(response.data || {}, response)
    }
    return Promise.resolve(result)
  }

  // 对应hook - handleResponseInterceptorsFail
  // 如果不存在重写handleResponseInterceptorsFail，则走默认逻辑
  // 一般情况下不建议重写，在最外层调用获取code非0即可
  responseInterceptorsFail = (error) => {
    // 非200 Response状态码
    // 请求超时
    // 被取消
    const { response, message } = error
    let result = { data: {}, code: this.httpUnknownErrorCode }
    if (response) {
      // 存在status异常状态码
      result.code = this.httpStatusErrorCode
      result.msg = this.getHttpErrorStatusText(response.status)
    } else {
      if (message && message.includes('timeout')) {
        // 超时
        result.code = this.httpTimeoutCode
        result.msg = '请求超时，请稍后重试！'
      } else if (error instanceof Cancel) {
        // 请求被取消
        result.code = this.httpCancelCode
        result.msg = '当前请求被取消！'
      } else {
        result.code = this.httpUnknownErrorCode
        result.msg = message || '未知错误，请检查后重试！'
      }
    }

    if (this.handleResponseInterceptorsFail) {
      // 重写赋值返回结果,自行对异常进行弹框提示等操作
      result = this.handleResponseInterceptorsFail(error)
    } else {
      if (this.handleHttpError) this.handleHttpError(result)
    }

    return Promise.resolve(result)
  }

  /** *************************************************辅助方法*********************************************************************/
  // http异常状态码映射表
  getHttpErrorStatusText (status) {
    return this.httpErrorStatusMap[status] || '服务器异常，请稍后重试！'
  }

  // 生成全局唯一请求id
  generateRequestUniqueId () {
    // 时间戳+计数，目前够保证唯一了，后续有bug或者需求再换实现方式
    return new Date().getTime() + '^' + this.requestIdCount++
  }

  // 拼接用户额外传入的config参数
  appendRequestConfig (params, config) {
    // 自定义超时
    if (config.timeout) params.timeout = config.timeout
    // 是否取消掉前面未完成的请求，默认是
    if (config.cancelOriginRequest !== false && this.cancelTokenMap[params.url]) {
      // 调用取消函数
      const keys = Object.keys(this.cancelTokenMap[params.url])
      keys.forEach(key => {
        const func = this.cancelTokenMap[params.url][key]
        func && func()
      })
      // 删除当前url的所有请求key
      delete this.cancelTokenMap[params.url]
    }
  }

  /** *************************************************对外暴露供调用的方法*********************************************************************/
  // 清空所有请求
  cleanAllRequest () {
    // 取消所有请求
    const keys = Object.keys(this.cancelTokenMap)
    keys.forEach(key => {
      const childrenKeys = Object.keys(this.cancelTokenMap[key])
      childrenKeys.forEach(item => {
        const func = this.cancelTokenMap[key][item]
        func && func()
      })
    })
    // 重置map
    this.cancelTokenMap = {}
  }

  // 通用请求参数
  request (params) {
    // 生成全局唯一id
    const requestUniqueId = this.generateRequestUniqueId()
    params.requestUniqueId = requestUniqueId
    // 拼接cancelToken
    const cancelToken = new axios.CancelToken(cancelFunc => {
      // { url: {id1: func, id2: func}}
      if (this.cancelTokenMap[params.url]) {
        this.cancelTokenMap[params.url][requestUniqueId] = cancelFunc
      } else {
        this.cancelTokenMap[params.url] = { requestUniqueId: cancelFunc }
      }
    })
    params.cancelToken = cancelToken
    return new Promise(resolve => {
      this.http(params).then((res) => {
        resolve(res)
      }).catch(e => {
        resolve(e)
      })
    })
  }

  // get请求
  get (url, data, config = {}) {
    const params = {
      url,
      method: 'get',
      params: data
    }
    this.appendRequestConfig(params, config)
    return this.request(params)
  }

  // post请求
  post (url, data, config = {}) {
    const params = {
      url,
      method: 'post',
      data
    }
    this.appendRequestConfig(params, config)
    return this.request(params)
  }

  test = () => {
    console.log('czxx')
  }
}
