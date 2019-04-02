import Time from '@/utils/time'

export {
  Time,
}

export default {
  Time,
  params (obj) {
    let str = []
    for (let k in obj) {
      if (typeof (obj[k]) !== 'undefined') {
        str.push(k + '=' + encodeURIComponent(obj[k]))
      }
    }
    return str.join('&')
  }
}