/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./baseRequest.js":
/*!************************!*\
  !*** ./baseRequest.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BaseRequest)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nclass BaseRequest {\r\n  /** *************************************************初始化*********************************************************************/\r\n  // 构造器函数\r\n  constructor (initialData = {}) {\r\n    // 初始化常量\r\n    this.initConstants(initialData)\r\n    // 初始化axios实例\r\n    this.initAxios()\r\n    // 初始化请求异常错误码\r\n    this.initHttpErrorStatusMap()\r\n  }\r\n\r\n  // 初始化axios实例\r\n  initAxios () {\r\n    this.http = axios__WEBPACK_IMPORTED_MODULE_0___default().create({\r\n      timeout: this.requestCommonTimeout,\r\n      withCredentials: true,\r\n      headers: { 'X-Requested-With': 'XMLHttpRequest', 'Cache-Control': 'no-cache' },\r\n      responseType: 'json',\r\n      responseEncoding: 'utf8'\r\n    })\r\n\r\n    // 拦截器\r\n    this.http.interceptors.request.use(this.requestInterceptorsSuccess, this.requestInterceptorsFail)\r\n    this.http.interceptors.response.use(this.responseInterceptorsSuccess, this.responseInterceptorsFail)\r\n  }\r\n\r\n  // 初始化http错误码Map\r\n  initHttpErrorStatusMap () {\r\n    this.httpErrorStatusMap = {\r\n      301: '永久重定向',\r\n      302: '临时重定向',\r\n      304: '资源未变更',\r\n      400: '请求异常，服务器未识别',\r\n      401: '当前无权限访问',\r\n      403: '服务器拒绝访问',\r\n      404: '当前请求不存在',\r\n      405: '当前请求方法不被允许',\r\n      406: '资源类型错误',\r\n      500: '服务器内部错误',\r\n      502: '网关异常',\r\n      503: '当前服务不可用',\r\n      504: '网关超时'\r\n    }\r\n  }\r\n\r\n  // 初始化常量\r\n  initConstants ({ type = 1, timeout = 20000, httpUnknownErrorCode = '100100', httpStatusErrorCode = '100101', httpTimeoutCode = '100102', requestErrorCommonCode = '100103', httpCancelCode = '100104' } = {}) {\r\n    // 当前axios请求类型\r\n    this.requestType = type\r\n    // 默认超时时间\r\n    this.requestCommonTimeout = timeout\r\n    // 通用暂未纳入的状态码\r\n    this.httpUnknownErrorCode = httpUnknownErrorCode\r\n    // 请求报错\r\n    this.requestErrorCommonCode = requestErrorCommonCode\r\n    // 响应异常状态码\r\n    this.httpStatusErrorCode = httpStatusErrorCode\r\n    // 请求超时状态码\r\n    this.httpTimeoutCode = httpTimeoutCode\r\n    // 请求被取消状态码\r\n    this.httpCancelCode = httpCancelCode\r\n    // 取消请求的token Map\r\n    this.cancelTokenMap = {}\r\n    // 全局请求唯一id索引计数\r\n    this.requestIdCount = 1\r\n  }\r\n\r\n  /** *************************************************拦截器*********************************************************************/\r\n  requestInterceptorsSuccess = (request) => {\r\n    // 业务方可以在重写方法中拼接公共业务参数，或者往header中筛入参数\r\n    if (this.handleRequestInterceptorsSuccess) this.handleRequestInterceptorsSuccess(request)\r\n    return request\r\n  }\r\n\r\n  requestInterceptorsFail = (error) => {\r\n    // 暂未针对特殊处理\r\n    return Promise.resolve({\r\n      code: this.requestErrorCommonCode,\r\n      msg: error.message || '请求异常，请检查后重试！',\r\n      data: {}\r\n    })\r\n  }\r\n\r\n  // 思考 如何 res, isSuccess\r\n  responseInterceptorsSuccess = (response) => {\r\n    let result = response.data || {}\r\n    if (this.handleResponseInterceptorsSuccess) {\r\n      result = this.handleResponseInterceptorsSuccess(response.data || {}, response)\r\n    }\r\n    return Promise.resolve(result)\r\n  }\r\n\r\n  // 对应hook - handleResponseInterceptorsFail\r\n  // 如果不存在重写handleResponseInterceptorsFail，则走默认逻辑\r\n  // 一般情况下不建议重写，在最外层调用获取code非0即可\r\n  responseInterceptorsFail = (error) => {\r\n    // 非200 Response状态码\r\n    // 请求超时\r\n    // 被取消\r\n    const { response, message } = error\r\n    let result = { data: {}, code: this.httpUnknownErrorCode }\r\n    if (response) {\r\n      // 存在status异常状态码\r\n      result.code = this.httpStatusErrorCode\r\n      result.msg = this.getHttpErrorStatusText(response.status)\r\n    } else {\r\n      if (message && message.includes('timeout')) {\r\n        // 超时\r\n        result.code = this.httpTimeoutCode\r\n        result.msg = '请求超时，请稍后重试！'\r\n      } else if (error instanceof axios__WEBPACK_IMPORTED_MODULE_0__.Cancel) {\r\n        // 请求被取消\r\n        result.code = this.httpCancelCode\r\n        result.msg = '当前请求被取消！'\r\n      } else {\r\n        result.code = this.httpUnknownErrorCode\r\n        result.msg = message || '未知错误，请检查后重试！'\r\n      }\r\n    }\r\n\r\n    if (this.handleResponseInterceptorsFail) {\r\n      // 重写赋值返回结果,自行对异常进行弹框提示等操作\r\n      result = this.handleResponseInterceptorsFail(error)\r\n    } else {\r\n      if (this.handleHttpError) this.handleHttpError(result)\r\n    }\r\n\r\n    return Promise.resolve(result)\r\n  }\r\n\r\n  /** *************************************************辅助方法*********************************************************************/\r\n  // http异常状态码映射表\r\n  getHttpErrorStatusText (status) {\r\n    return this.httpErrorStatusMap[status] || '服务器异常，请稍后重试！'\r\n  }\r\n\r\n  // 生成全局唯一请求id\r\n  generateRequestUniqueId () {\r\n    // 时间戳+计数，目前够保证唯一了，后续有bug或者需求再换实现方式\r\n    return new Date().getTime() + '^' + this.requestIdCount++\r\n  }\r\n\r\n  // 拼接用户额外传入的config参数\r\n  appendRequestConfig (params, config) {\r\n    // 自定义超时\r\n    if (config.timeout) params.timeout = config.timeout\r\n    // 是否取消掉前面未完成的请求，默认是\r\n    if (config.cancelOriginRequest !== false && this.cancelTokenMap[params.url]) {\r\n      // 调用取消函数\r\n      const keys = Object.keys(this.cancelTokenMap[params.url])\r\n      keys.forEach(key => {\r\n        const func = this.cancelTokenMap[params.url][key]\r\n        func && func()\r\n      })\r\n      // 删除当前url的所有请求key\r\n      delete this.cancelTokenMap[params.url]\r\n    }\r\n  }\r\n\r\n  /** *************************************************对外暴露供调用的方法*********************************************************************/\r\n  // 清空所有请求\r\n  cleanAllRequest () {\r\n    // 取消所有请求\r\n    const keys = Object.keys(this.cancelTokenMap)\r\n    keys.forEach(key => {\r\n      const childrenKeys = Object.keys(this.cancelTokenMap[key])\r\n      childrenKeys.forEach(item => {\r\n        const func = this.cancelTokenMap[key][item]\r\n        func && func()\r\n      })\r\n    })\r\n    // 重置map\r\n    this.cancelTokenMap = {}\r\n  }\r\n\r\n  // 通用请求参数\r\n  request (params) {\r\n    // 生成全局唯一id\r\n    const requestUniqueId = this.generateRequestUniqueId()\r\n    params.requestUniqueId = requestUniqueId\r\n    // 拼接cancelToken\r\n    const cancelToken = new (axios__WEBPACK_IMPORTED_MODULE_0___default().CancelToken)(cancelFunc => {\r\n      // { url: {id1: func, id2: func}}\r\n      if (this.cancelTokenMap[params.url]) {\r\n        this.cancelTokenMap[params.url][requestUniqueId] = cancelFunc\r\n      } else {\r\n        this.cancelTokenMap[params.url] = { requestUniqueId: cancelFunc }\r\n      }\r\n    })\r\n    params.cancelToken = cancelToken\r\n    return new Promise(resolve => {\r\n      this.http(params).then((res) => {\r\n        resolve(res)\r\n      }).catch(e => {\r\n        resolve(e)\r\n      })\r\n    })\r\n  }\r\n\r\n  // get请求\r\n  get (url, data, config = {}) {\r\n    const params = {\r\n      url,\r\n      method: 'get',\r\n      params: data\r\n    }\r\n    this.appendRequestConfig(params, config)\r\n    return this.request(params)\r\n  }\r\n\r\n  // post请求\r\n  post (url, data, config = {}) {\r\n    const params = {\r\n      url,\r\n      method: 'post',\r\n      data\r\n    }\r\n    this.appendRequestConfig(params, config)\r\n    return this.request(params)\r\n  }\r\n\r\n  test = () => {\r\n    console.log('czxx')\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://@cz-js/request/./baseRequest.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   BaseRequest: () => (/* reexport safe */ _baseRequest__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _baseRequest__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./baseRequest */ \"./baseRequest.js\");\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://@cz-js/request/./index.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = axios;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;