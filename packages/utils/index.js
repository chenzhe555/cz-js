import { FORMATTER_MAP, getCurrentTimeStamp, getCurrentTimeString, formatterToString, transformTimeStringToTimeStamp, aheadTimeToFormatterString } from './src/time'
import { saveObjToLocalStorage, getObjFromLocalStorage, saveStringToLocalStorage, getStringFromLocalStorage, removeLocalStorageItem, saveObjToSessionStorage, getObjFromSessionStorage, saveStringToSessionStorage, getStringFromSessionStorage, removeSessionStorageItem } from './src/storage'
import { cloneDeep, uniqueId, flattenDeep } from './src/lodash'
import { exportBlobToFile, downloadFileWithUrl, verifyFile, downloadMultiFilesWithUrl } from './src/files'
import { transformStruct, getFormLabelByValue, getFormValueByLabel } from './src/enum'
import { generateUniqueID } from './src/common'
import { getBrowerType, judgeBrowerIsChrome, getChromeVersion, testChromeVersion } from './src/browser'
import { appendListExtraParams, recursionFindDataItemByValue, appendParentItemInfo, transformListToTree, addSameListKey, deleteChildrenKeyByTreeList } from './src/array'

export {
  FORMATTER_MAP,
  getCurrentTimeStamp,
  getCurrentTimeString,
  formatterToString,
  transformTimeStringToTimeStamp,
  aheadTimeToFormatterString,
  saveObjToLocalStorage,
  getObjFromLocalStorage,
  saveStringToLocalStorage,
  getStringFromLocalStorage,
  removeLocalStorageItem,
  saveObjToSessionStorage,
  getObjFromSessionStorage,
  saveStringToSessionStorage,
  getStringFromSessionStorage,
  removeSessionStorageItem,
  cloneDeep,
  uniqueId,
  flattenDeep,
  exportBlobToFile,
  downloadFileWithUrl,
  verifyFile,
  downloadMultiFilesWithUrl,
  transformStruct,
  getFormLabelByValue,
  getFormValueByLabel,
  generateUniqueID,
  getBrowerType,
  judgeBrowerIsChrome,
  getChromeVersion,
  testChromeVersion,
  appendListExtraParams,
  recursionFindDataItemByValue,
  appendParentItemInfo,
  transformListToTree,
  addSameListKey,
  deleteChildrenKeyByTreeList
}
