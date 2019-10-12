const fillZero = value => {
  return value < 10 ? `0${value}` : value
}

/**
 * 兼容ios的new Date, 使用new Date的请替换成这个函数
 * @author nazi
 * @export
 * @param {*} timestamp
 * @returns
 */
export function compatibleIosDate (timestamp) {
  if (!timestamp) {
    return new Date()
  }
  if (typeof timestamp === 'number') {
    return new Date(timestamp)
  } else {
    // string
    const dateStr = String(timestamp || '')
    const arr = dateStr.split(/[./-]/)
    return arr.length === 2
      ? new Date(dateStr.replace(/[/.]/g, '-'))
      : new Date(dateStr.replace(/[-.]/g, '/'))
  }
}

export const formatTime = (timestamp, formatStr) => {
  const date = compatibleIosDate(timestamp)

  const year = date.getFullYear()
  const month = fillZero(date.getMonth() + 1)
  const day = fillZero(date.getDate())
  const hour = fillZero(date.getHours())
  const minute = fillZero(date.getMinutes())
  const second = fillZero(date.getSeconds())

  return formatStr
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
    .replace('hh', hour)
    .replace('mm', minute)
    .replace('ss', second)
}

// 获取当前月有多少天
export const getCountDays = (timestamp) => {
  const curDate = compatibleIosDate(timestamp)
  const curMonth = curDate.getMonth()
  curDate.setMonth(curMonth + 1)
  curDate.setDate(0)
  return curDate.getDate()
}

export const timeUnitFormat = function (time) {
  if (time < 1) {
    return '00'
  } else if (time < 10) {
    return '0' + time
  } else {
    return time
  }
}

export const secondsToTime = function (secs) {
  if (parseInt(secs || 0) === 0) {
    return '00:00'
  }
  secs = Math.round(secs)
  const hours = Math.floor(secs / (60 * 60))

  const divisorForMinutes = secs % (60 * 60)
  const minutes = Math.floor(divisorForMinutes / 60)

  const divisorForSeconds = divisorForMinutes % 60
  const seconds = Math.ceil(divisorForSeconds)

  let time = ''
  if (hours > 0) {
    time += '0' + hours + ':'
  }

  time += timeUnitFormat(minutes) + ':'
  time += timeUnitFormat(seconds)
  return time
}

export default {
  fillZero,
  format: formatTime,
  secondsToTime,
  getCountDays,
  timeUnitFormat,
  compatibleIosDate,
}
