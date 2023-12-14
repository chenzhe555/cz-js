import moment from 'moment'

/**
 * 时间字符串格式Map
 */
const FORMATTER_MAP = {
  Date: 'yyyy-MM-DD', // 日期
  Time: 'HH:mm:ss', // 时间
  DateTime: 'yyyy-MM-DD HH:mm:ss' // 日期时间
}

/** ****************************************************************时间戳相关****************************************************************************** */
/**
 * 获取当前时间戳，默认毫秒
 * @param {Number} type  1.毫秒 2.秒
 * @returns
 */
const getCurrentTimeStamp = (type = 1) => {
  const time = new Date().getTime()
  return type === 1 ? time : parseInt(time / 1000)
}

/** ****************************************************************时间字符串相关****************************************************************************** */
/**
 * 获取当前时间字符串，默认格式：yyyy-MM-DD HH:mm:ss
 * @param {FORMATTER_MAP} formatter 要转换的格式，默认：yyyy-MM-DD HH:mm:ss
 * @returns
 */
const getCurrentTimeString = (formatter = FORMATTER_MAP.DateTime) => {
  return moment().format(formatter)
}

/** ****************************************************************时间戳转时间字符串****************************************************************************** */
/**
 * date/timeStamp(毫秒)转指定格式字符串格式
 * @param {*} value 要转换的值
 * @param {FORMATTER_MAP} formatter 要转换的格式，默认：yyyy-MM-DD HH:mm:ss
 * @returns
 */
const formatterToString = (value, formatter = FORMATTER_MAP.DateTime) => {
  return moment(value).format(formatter)
}

/** ****************************************************************时间字符串转时间戳****************************************************************************** */
/**
 * 时间字符串转时间戳(秒)
 * @param {String} timeString 要转换的时间字符串
 * @returns
 */
const transformTimeStringToTimeStamp = (timeString = '') => {
  return timeString ? moment(timeString).unix() : 0
}

/** ****************************************************************N天月日等等的计算****************************************************************************** */
/**
 * 获取N(年、月、日、星期、小时、分钟、秒)前的时间字符串，待完成测试
 * @param {Number} times N(年 - 1、月 - 2、日 - 3、星期 - 4、小时 - 5、分钟 - 6、秒 - 7)前，默认天
 * @param {Number} fromZero 1 - 今日0点算起 2.今日23:59:59算起 3. 当前时间算起
 * @returns
 */
const aheadTimeToFormatterString = function (times, fromZero = 1, { type = 3, formatter = FORMATTER_MAP.DateTime, isFormatter = true } = {}) {
  const aMap = {
    1: 'years',
    2: 'months',
    3: 'days',
    4: 'weeks',
    5: 'hours',
    6: 'minutes',
    7: 'seconds'
  }
  const timesType = aMap[type] || 'days'
  if (fromZero === 1) {
    if (isFormatter) {
      return moment().startOf('day').subtract(times, timesType).format(formatter)
    } else {
      return moment().startOf('day').subtract(times, timesType)
    }
  } else if (fromZero === 2) {
    if (isFormatter) {
      return moment().endOf('day').subtract(times, timesType).format(formatter)
    } else {
      return moment().endOf('day').subtract(times, timesType)
    }
  } else {
    if (isFormatter) {
      return moment().subtract(times, timesType).format(formatter)
    } else {
      return moment().subtract(times, timesType)
    }
  }
}

export {
  FORMATTER_MAP,
  getCurrentTimeStamp,
  getCurrentTimeString,
  formatterToString,
  transformTimeStringToTimeStamp,
  aheadTimeToFormatterString
}
