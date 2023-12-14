import _ from 'lodash'

/**
 * 深拷贝
 * @param {*} value 对象，数组等...
 * @returns
 */
const cloneDeep = (value) => {
  return _.cloneDeep(value)
}

/**
 * 生成唯一ID
 * @returns
 */
const uniqueId = () => {
  return _.uniqueId()
}

/**
 * 将多维数组转换成一维数组
 * @param {*} arr 要平铺的多维数组，比如：[1, [2, [3, [4]], 5]] 转换成 [1, 2, 3, 4, 5]
 * @returns
 */
const flattenDeep = function (arr = []) {
  return _.flattenDeep(arr)
}

export {
  cloneDeep,
  uniqueId,
  flattenDeep
}
