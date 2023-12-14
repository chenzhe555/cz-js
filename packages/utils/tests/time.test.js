/* eslint-disable no-undef */
import { getCurrentTimeStamp, getCurrentTimeString, formatterToString, transformTimeStringToTimeStamp, aheadTimeToFormatterString } from '../src/time'

test('时间戳相关输出：', () => {
  const timeStamp = getCurrentTimeStamp()
  const timeStr = getCurrentTimeString()
  console.log(timeStamp)
  console.log(timeStr)
  console.log(formatterToString(timeStamp))
  console.log(transformTimeStringToTimeStamp(timeStr))
  console.log(aheadTimeToFormatterString(10))
})
