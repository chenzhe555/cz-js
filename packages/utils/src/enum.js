/**
 * 将服务器返回的表单下拉这种数据转换成前端统一格式
 * @param {*} list 要转换的数组
 * @param {*} valueKey value键值
 * @param {*} labelKey label键值
 * @param {*} keyKey key键值，不存在的话用 ${item[valueKey]}-${item[labelKey]} 方式拼接
 * @returns
 */
const transformStruct = function (list = [], valueKey = 'value', labelKey = 'label', { keyKey = 'key' } = {}) {
  return list.map(item => {
    return {
      value: item[valueKey],
      label: item[labelKey],
      key: item[keyKey] ? item[keyKey] : `${item[valueKey]}-${item[labelKey]}`
    }
  })
}

/**
   * 配合 transformStruct 使用：通过value匹配数组获取对应的label值
   * @param {*} list 匹配的数组
   * @param {*} value 要匹配的数据
   * @param {*} valueKey value键值
   * @param {*} labelKey label键值
   * @param {*} param4 defaultValue 如果不存在，则默认返回的值，默认空字符串；compareInt： 有些value前端存的int，但是后端返回的是字符串，默认不进行转换对比
   * @returns
   */
const getFormLabelByValue = (list, value, valueKey = 'value', labelKey = 'label', { defaultValue, compareInt = false } = {}) => {
  if (!Array.isArray(list)) return defaultValue

  const temp = list.find(item => compareInt ? item[valueKey] === parseInt(value) : item[valueKey] === value)
  return temp ? temp[labelKey] : defaultValue
}

/**
   * 配合 transformStruct 使用：通过label匹配数组获取对应的value值
   * @param {*} list 匹配的数组
   * @param {*} value 要匹配的数据
   * @param {*} valueKey value键值
   * @param {*} labelKey label键值
   * @param {*} param4 defaultValue 如果不存在，则默认返回的值，默认空字符串
   * @returns
   */
const getFormValueByLabel = (list, value, valueKey = 'value', labelKey = 'label', { defaultValue } = {}) => {
  if (!Array.isArray(list)) return defaultValue

  const temp = list.find(item => item[labelKey] === value)
  return temp ? temp[valueKey] : defaultValue
}

export {
  transformStruct,
  getFormLabelByValue,
  getFormValueByLabel
}
