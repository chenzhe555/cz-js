/**
 * 将文件Blob转成文件并下载
 * @param {*} data 服务器返回data的blob
 * @param {*} fileName 下载的文件名
 * @param {*} type 文件类型
 */
const exportBlobToFile = function (data, fileName, type = 'application/vnd.ms-excel') {
  if (!data || !fileName) return

  const blob = new Blob([data], { type })
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    window.navigator.msSaveOrOpenBlob(blob, fileName)
  } else {
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

/**
 * 下载url地址的文件
 * @param {*} fileUrl 文件地址
 * @param {*} fileName 文件名称
 * @returns
 */
const downloadFileWithUrl = (fileUrl = '', fileName = '') => {
  if (!fileUrl || !fileName) return

  const link = document.createElement('a')
  link.style.display = 'none'
  link.setAttribute('href', fileUrl)
  link.setAttribute('download', fileName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * 文件大小（默认M）、文件类型校验
 * @param {*} file 要校验的文件
 * @param {*} param1 size M大小 为0代表不校验大小；regStr 校验正则，没有则不校验文本
 * @returns type: 1. 大小校验 2.文件类型校验 3.文件异常
 */
const verifyFile = function (file, { size = 10, regStr = '.(doc|docx|pdf|jpg|png|xls|xlsx|DOC|DOCX|PDF|PNG|JPG|XLS|XLSX)$' } = {}) {
  if (!file || !file.size) return { result: false, type: 3, msg: '上传文件异常' }

  if (size > 0 && file.size / Math.pow(1024, 2) > size) {
    // 校验文件大小
    return {
      result: false,
      type: 1,
      msg: `上传文件大小不能大于${size}M`
    }
  } else if (regStr && !new RegExp(regStr).test(file.name)) {
    // 校验文件类型
    return {
      result: false,
      type: 2,
      msg: '上传文件类型不正确'
    }
  }
  return {
    result: true
  }
}

/**
 * js下载多个文件（iframe方式）
 * @param {*} urls 下载地址
 */
const downloadMultiFilesWithUrl = (urls = []) => {
  if (!Array.isArray(urls)) return
  // 计数区分iframe
  let downCount = 0
  for (let i = 0; i < urls.length; i++) {
    const hiddenIFrameID = 'hiddenDownloader' + downCount++
    const iframe = document.createElement('iframe')
    iframe.id = hiddenIFrameID
    iframe.style.display = 'none'
    document.body.appendChild(iframe)
    // 直接下载，不会弹出新的页面
    iframe.src = urls[i]
  }
}

export { exportBlobToFile, downloadFileWithUrl, verifyFile, downloadMultiFilesWithUrl }
