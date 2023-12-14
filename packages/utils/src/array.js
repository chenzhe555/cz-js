import { cloneDeep } from './lodash'

/**
 * 通过值查找数组中某个键对应的值相同的项。ps: 为了满足在table-tree-column类似中方便复用，所以用value不用对象形式
 * @param {*} list 要被查找的数组
 * @param {*} value 要查找的值
 * @param {*} key 唯一匹配的键值
 * @param {*} param3 childrenKey 子数组键值
 * @returns
 */
const recursionFindDataItemByValue = (list, value, key = 'value', { childrenKey = 'children' } = {}) => {
  if (!Array.isArray(list) || !value || !key) return
  let result = null
  for (let i = 0; i < list.length; i++) {
    const aItem = list[i]
    // 当前数据源中查找
    if (aItem[key] === value) {
      result = aItem
      break
    }
    // 子数据源中查找
    if (Array.isArray(aItem[childrenKey])) {
      const temp = recursionFindDataItemByValue(aItem[childrenKey], value, key, { childrenKey })
      if (temp) {
        result = temp
        break
      }
    }
  }
  return result
}

/**
 * 给数组每一级添加固定字段
 * @param {Array} list 需要拼接的数组
 * @param {Object} extraInfo 需要拼接的字段信息
 * @param {String} childrenKey 子级的键值
 * @returns
 */
const appendListExtraParams = (list, extraInfo = {}, { childrenKey = 'children' } = {}) => {
  if (!Array.isArray(list)) return
  const keys = Object.keys(extraInfo)
  if (keys.length <= 0) return
  list.forEach(item => {
    keys.forEach(key => {
      item[key] = extraInfo[key]
    })
    if (Array.isArray(item[childrenKey])) {
      appendListExtraParams(item[childrenKey], extraInfo, { childrenKey })
    }
  })
}

/**
 * 给数据拼接上一层数据
 * @param {Array} list 要拼接的数组数据
 * @param {*} param1 childrenKey 子数组键值 deleteChildren 是否删除数组节点元素 parentItem 上一层数据
 * @returns
 */
const appendParentItemInfo = (list, { childrenKey = 'children', deleteChildren = true, parentItem } = {}) => {
  if (!Array.isArray(list)) return

  list.forEach(item => {
    if (parentItem) {
      if (deleteChildren) delete parentItem[childrenKey]
      item.parentItem = { ...parentItem }
    }

    if (item[childrenKey] && Array.isArray(item[childrenKey])) {
      appendParentItemInfo(item[childrenKey], { parentItem: cloneDeep(item) })
    }
  })
}

/**
 * 将list结构数据转换成树形结构
 * @param {*} list
 * @param {*} param1 idKey: id唯一键；pidKey: 父id唯一键；childrenKey：子项数组键值；canAddKey：是否自动拼接新id和pid字段；canAddKey：canAddKey为真添加的新id唯一键；addParentId：canAddKey为真添加的新父id唯一键
 * @returns
 */
const transformListToTree = (list, { idKey = 'conditionId', pidKey = 'upConditionId', childrenKey = 'children', canAddKey = true, addIdKey = 'id', addParentId = 'pid' } = {}) => {
  const treeList = []
  if (!Array.isArray(list)) return treeList

  // 以id为键值组成一个对象
  const listMap = {}
  list.forEach(item => {
    if (canAddKey) {
      // id
      item[addIdKey] = item[idKey]
      // 父级id
      item[addParentId] = item[pidKey]
    }
    // 给每个增加一个children字段
    item[childrenKey] = []
    listMap[item[idKey]] = item
  })

  // 编辑数组，将节点挂在父节点上
  list.forEach(item => {
    const parentItem = listMap[item[pidKey]]
    if (parentItem) {
      parentItem[childrenKey].push(item)
    } else {
      treeList.push(item)
    }
  })

  return treeList
}

/**
 * 新增数组中相同的key键值数据
 * @param {Array} list 要修改的数据
 * @param {Array} keyList 修改对应的键值 [{key: '原已有key', addKey: '新增key'}]
 * @param {Object} param2 replaceForce: 是否强制替换
 * @returns
 */
const addSameListKey = (list, keyList = [], { childrenKey = 'children', replaceForce = true } = {}) => {
  if (!Array.isArray(list)) return

  list.forEach(item => {
    keyList.forEach(keyItem => {
      if (item[keyItem.key]) {
        let addValue = true
        // 只有不覆盖替换且有相应的添加addKey值，才不进行赋值操作
        if (!replaceForce && item[keyItem.addKey]) addValue = false
        if (addValue) item[keyItem.addKey] = cloneDeep(item[keyItem.key])
      }
      // 递归替换
      addSameListKey(item[childrenKey], keyList, { childrenKey, replaceForce })
    })
  })
}

/**
 * 删除/赋值树状数组中子数组字段
 * @param {Array} list 操作数组
 * @param {Object} param1 childrenKey 子数组键值 type：1.删除空子节点 2.赋值空数组（避免children=null有些情况也出现下拉图标）
 */
const deleteChildrenKeyByTreeList = (list = [], { childrenKey = 'children', type = 1 } = {}) => {
  list.forEach(item => {
    if (Array.isArray(item[childrenKey]) && item[childrenKey].length > 0) {
      deleteChildrenKeyByTreeList(item[childrenKey], { childrenKey, type })
    } else {
      // 添加额外参数isLeaf
      item.isLeaf = true
      if (type === 1) {
        delete item[childrenKey]
      } else if (type === 2) {
        item[childrenKey] = []
      }
    }
  })
}

export {
  appendListExtraParams,
  recursionFindDataItemByValue,
  appendParentItemInfo,
  transformListToTree,
  addSameListKey,
  deleteChildrenKeyByTreeList
}
