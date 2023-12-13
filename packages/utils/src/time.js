import moment from 'moment'

/**
 * 获取当前时间戳，默认毫秒
 * @param {Number} type  1.毫秒 2.秒
 * @returns
 */
const getCurrentTimeStamp = (type = 1) => {
  const time = new Date().getTime()
  return type === 1 ? time : parseInt(time / 1000)
}

/**
 * 获取当前时间字符串，默认格式：yyyy-MM-DD HH:mm:ss
 * @param {*} formatter 要转换的格式，默认：yyyy-MM-DD HH:mm:ss
 * @returns
 */
const getCurrentTimeString = (formatter = 'yyyy-MM-DD HH:mm:ss') => {
  return moment().format(formatter)
}

/**
 * date/timeStamp(毫秒)转指定字符串格式
 * @param {*} value 要转换的值
 * @param {*} formatter 要转换的格式，默认：yyyy-MM-DD HH:mm:ss
 * @returns
 */
const formatterToString = (value, formatter = 'yyyy-MM-DD HH:mm:ss') => {
  return moment(value).format(formatter)
}

/**
 * 时间字符串转时间戳(秒)
 * @param {String} timeString 要转换的时间字符串
 * @returns
 */
const transformTimeStringToTimeStamp = (timeString = '') => {
  return timeString ? moment(timeString).unix() : 0
}

/**
 * 时间字符串转日期
 * @param {String} timeString 要转换的时间字符串
 * @returns
 */
const transformTimeStringToDate = (timeString = '') => {
  return timeString ? new Date(timeString) : null
}

/**
 * 获取N(年、月、日、星期、小时、分钟、秒)前的时间字符串
 * @param {Number} times N(年 - 1、月 - 2、日 - 3、星期 - 4、小时 - 5、分钟 - 6、秒 - 7)前，默认天
 * @param {Number} fromZero 1 - 今日0点算起 2.今日23:59:59算起 3. 当前时间算起
 * @param {} type: 年-1、月-2、日-3、星期-4、小时-5、分钟-6、秒-7；
 * @returns
 */
const aheadTimeToFormatterString = function (
  times,
  fromZero = 1,
  { type = 3, formatter = 'yyyy-MM-DD HH:mm:ss', isFormatter = true } = {}
) {
  let timesType = 'days'
  switch (type) {
    case 1:
      timesType = 'years'
      break
    case 2:
      timesType = 'months'
      break
    case 3:
      timesType = 'days'
      break
    case 4:
      timesType = 'weeks'
      break
    case 5:
      timesType = 'hours'
      break
    case 6:
      timesType = 'minutes'
      break
    case 7:
      timesType = 'seconds'
      break
    default:
      break
  }
  if (fromZero === 1) {
    if (isFormatter) {
      return moment()
        .startOf('day')
        .subtract(times, timesType)
        .format(formatter)
    } else return moment().startOf('day').subtract(times, timesType)
  } else if (fromZero === 2) {
    if (isFormatter) {
      return moment().endOf('day').subtract(times, timesType).format(formatter)
    } else return moment().endOf('day').subtract(times, timesType)
  } else {
    if (isFormatter) {
      return moment().subtract(times, timesType).format(formatter)
    } else return moment().subtract(times, timesType)
  }
}

/**
 * 获取N(年、月、日、星期、小时、分钟、秒)前的时间对象
 * @param {Number} times N(年 - 1、月 - 2、日 - 3、星期 - 4、小时 - 5、分钟 - 6、秒 - 7)前，默认天
 * @param {Number} fromZero 1 - 今日0点算起 2.今日23:59:59算起 3. 当前时间算起
 * @returns
 */
const aheadTimeToDate = function (times, fromZero = 1, { type = 3 } = {}) {
  return aheadTimeToFormatterString(times, fromZero, {
    isFormatter: false,
    type
  })
}

/**
 * 获取N月前的时间字符串
 * @param {Number} months N月前
 * @param {Number} fromZero 1 - 今日0点算起 2.今日23:59:59算起 3. 当前时间算起
 * @param {String} formatter 要转换的字符串格式，默认 yyyy-MM-DD HH:mm:ss
 * @returns
 */
const aheadMonthsToFormatterString = function (
  months,
  fromZero = 1,
  formatter = 'yyyy-MM-DD HH:mm:ss'
) {
  return aheadTimeToFormatterString(months, fromZero, { formatter, type: 2 })
}

/**
 * 获取N天前的时间字符串
 * @param {Number} days N天前
 * @param {Number} fromZero 1 - 今日0点算起 2.今日23:59:59算起 3. 当前时间算起
 * @param {String} formatter 要转换的字符串格式，默认 yyyy-MM-DD HH:mm:ss
 * @returns
 */
const aheadDaysToFormatterString = function (
  days,
  fromZero = 1,
  formatter = 'yyyy-MM-DD HH:mm:ss'
) {
  return aheadTimeToFormatterString(days, fromZero, { formatter, type: 3 })
}

/**
 * 获取N天前的时间字符串
 * @param {Number} days N天前
 * @param {Number} fromZero 1 - 今日0点算起 2.今日23:59:59算起 3. 当前时间算起
 * @param {String} formatter 要转换的字符串格式，默认 yyyy-MM-DD HH:mm:ss
 * @returns
 */
const aheadDaysToDate = function (days, fromZero = 1) {
  return aheadTimeToDate(days, fromZero, { type: 3 })
}

export {
  getCurrentTimeStamp,
  getCurrentTimeString,
  formatterToString,
  transformTimeStringToTimeStamp,
  transformTimeStringToDate,
  aheadTimeToFormatterString,
  aheadMonthsToFormatterString,
  aheadDaysToFormatterString,
  aheadTimeToDate,
  aheadDaysToDate
}
