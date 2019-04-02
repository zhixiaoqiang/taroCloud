const SECOND = 1000
const MINUTE = SECOND * 60
const HOUR = MINUTE * 60
const DAY = HOUR * 24

export default {
  fillZero (value) {
    return value < 10 ? `0${value}` : value
  },
  /**
   * 传入时间及格式，返回相应日期时间
   * 
   * @param {string} timestamp 时间戳
   * @param {string} formatStr 输出格式(YYYY-MM-DD HH:mm:ss)
   */
  format (timestamp, formatStr) {
    if (!timestamp) return undefined
    let date = new Date(timestamp)
    let year = date.getFullYear()
    let month = this.fillZero(date.getMonth() + 1)
    let day = this.fillZero(date.getDate())
    let hour = this.fillZero(date.getHours())
    let minute = this.fillZero(date.getMinutes())
    let second = this.fillZero(date.getSeconds())

    return formatStr
            .replace('YYYY', year)
            .replace('MM', month)
            .replace('DD', day)
            .replace('HH', hour)
            .replace('mm', minute)
            .replace('ss', second)
  },
  formatToInterval (timestamp) {
    let now = Date.now()
    let value = now - timestamp
    value = value < 1 ? 1 : value

    if (value < MINUTE) {
      return Math.floor(value / SECOND) + '秒前'
    }
    if (value < HOUR) {
      return Math.floor(value / MINUTE) + '分钟前'
    }
    if (value < DAY) {
      return Math.floor(value / HOUR) + '小时前'
    }
    return this.format(timestamp, 'MM月DD日')
  }
}
