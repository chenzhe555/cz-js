/**
 * 存储对象到localstorage
 * @param {String} key 存储数据的键值
 * @param {Object} data 存储的数据，对象
 * @param {String} appendExtraValue key前拼接的额外字符串
 */
const saveObjToLocalStorage = (key, data, { appendExtraValue = '' } = {}) => {
  if (!key || !data) return

  const realKey = `${appendExtraValue}${key}`
  try {
    localStorage.setItem(realKey, JSON.stringify(data))
  } catch (e) {
    // 一般是存储空间不够报错,所以此处如果异常，就先清除下当前key下的数据
    localStorage.removeItem(realKey)
  }
}

/**
 * 获取localstorage中存储的对象数据
 * @param {String} key
 * @param {String} appendExtraValue key前拼接的额外字符串
 * @returns
 */
const getObjFromLocalStorage = (key, { appendExtraValue = '' } = {}) => {
  if (!key) return

  let obj
  try {
    const temp = localStorage.getItem(`${appendExtraValue}${key}`)
    if (temp) obj = JSON.parse(temp)
  } catch (_) {}

  return obj
}

/**
 * 存储字符串到localstorage
 * @param {String} key 存储数据的键值
 * @param {Object} data 存储的数据，字符串
 * @param {String} appendExtraValue key前拼接的额外字符串
 */
const saveStringToLocalStorage = (key, data, { appendExtraValue = '' } = {}) => {
  if (!key || !data) return

  const realKey = `${appendExtraValue}${key}`
  try {
    localStorage.setItem(realKey, data)
  } catch (e) {
    // 一般是存储空间不够报错,所以此处如果异常，就先清除下当前key下的数据
    localStorage.removeItem(realKey)
  }
}

/**
 * 获取localstorage中存储的字符串数据
 * @param {String} key
 * @param {String} appendExtraValue key前拼接的额外字符串
 * @returns
 */
const getStringFromLocalStorage = (key, { appendExtraValue = '' } = {}) => {
  if (!key) return

  return localStorage.getItem(`${appendExtraValue}${key}`)
}

/**
 * 删除localstorage中存储的数据
 * @param {String} key
 * @param {String} appendExtraValue key前拼接的额外字符串
 * @returns
 */
const removeLocalStorageItem = (key, { appendExtraValue = '' } = {}) => {
  if (!key) return

  localStorage.removeItem(`${appendExtraValue}${key}`)
}

/**
 * 存储对象到sessionstorage
 * @param {String} key 存储数据的键值
 * @param {Object} data 存储的数据，对象
 * @param {String} appendExtraValue key前拼接的额外字符串
 */
const saveObjToSessionStorage = (key, data, { appendExtraValue = '' } = {}) => {
  if (!key || !data) return

  const realKey = `${appendExtraValue}${key}`
  try {
    sessionStorage.setItem(realKey, JSON.stringify(data))
  } catch (e) {
    // 一般是存储空间不够报错,所以此处如果异常，就先清除下当前key下的数据
    sessionStorage.removeItem(realKey)
  }
}

/**
 * 获取sessionstorage中存储的对象数据
 * @param {String} key
 * @param {String} appendExtraValue key前拼接的额外字符串
 * @returns
 */
const getObjFromSessionStorage = (key, { appendExtraValue = '' } = {}) => {
  if (!key) return

  let obj
  try {
    const temp = sessionStorage.getItem(`${appendExtraValue}${key}`)
    if (temp) obj = JSON.parse(temp)
  } catch (_) {}

  return obj
}

/**
 * 存储字符串到sessionstorage
 * @param {String} key 存储数据的键值
 * @param {Object} data 存储的数据，字符串
 * @param {String} appendExtraValue key前拼接的额外字符串
 */
const saveStringToSessionStorage = (key, data, { appendExtraValue = '' } = {}) => {
  if (!key || !data) return

  const realKey = `${appendExtraValue}${key}`
  try {
    sessionStorage.setItem(realKey, data)
  } catch (e) {
    // 一般是存储空间不够报错,所以此处如果异常，就先清除下当前key下的数据
    sessionStorage.removeItem(realKey)
  }
}

/**
 * 获取sessionstorage中存储的字符串数据
 * @param {String} key
 * @param {String} appendExtraValue key前拼接的额外字符串
 * @returns
 */
const getStringFromSessionStorage = (key, { appendExtraValue = '' } = {}) => {
  if (!key) return

  return sessionStorage.getItem(`${appendExtraValue}${key}`)
}

/**
 * 移除sessionstorage中存储的数据
 * @param {String} key
 * @param {String} appendExtraValue key前拼接的额外字符串
 * @returns
 */
const removeSessionStorageItem = (key, { appendExtraValue = '' } = {}) => {
  if (!key) return

  sessionStorage.removeItem(`${appendExtraValue}${key}`)
}

export {
  saveObjToLocalStorage,
  getObjFromLocalStorage,
  saveStringToLocalStorage,
  getStringFromLocalStorage,
  removeLocalStorageItem,
  saveObjToSessionStorage,
  getObjFromSessionStorage,
  saveStringToSessionStorage,
  getStringFromSessionStorage,
  removeSessionStorageItem
}
