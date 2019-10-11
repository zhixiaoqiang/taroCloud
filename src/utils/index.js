import Time from '@/utils/time'
import { languages } from '@/utils/languages'

export const isString = function (str) {
  return toString.call(str) === '[object String]'
}
export const isArray = function (arr) {
  return toString.call(arr) === '[object Array]'
}
export const isBoolean = function (bool) {
  return toString.call(bool) === '[object Boolean]'
}
export const isUndefined = function (bool) {
  return toString.call(bool) === '[object Undefined]'
}
export const isNull = function (bool) {
  return toString.call(bool) === '[object Null]'
}
export const isNumber = function (num) {
  return toString.call(num) === '[object Number]'
}
export const isObject = function (obj) {
  return toString.call(obj) === '[object Object]'
}
export const isEmptyObject = function (obj) {
  if (!isObject(obj)) {
    return false
  }
  for (const n in obj) {
    if (!isUndefined(obj[n])) {
      return false
    }
  }
  return true
}
export const isFunction = function (arg) {
  return toString.call(arg) === '[object Function]'
}
export const isSymbol = function (sym) {
  return toString.call(sym) === '[object Symbol]'
}
export const compareVersion = function (v1, v2) {
  v1 = v1.split('.')
  v2 = v2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }
  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }
  return 0
}

export const parse = function (str, decode = true) {
  if (str[0] === '?') {
    str = str.substr(1)
  }
  const params = {}
  str = str.split('&')
  for (let i = 0; i < str.length; i++) {
    const item = str[i].split('=')
    if (decode) {
      params[item[0]] = decodeURIComponent(item[1])
    } else {
      params[item[0]] = item[1]
    }
  }
  return params
}

export const stringify = function (obj, encode = true) {
  const str = []
  for (const k in obj) {
    if (typeof obj[k] !== 'undefined') {
      if (encode) {
        str.push(k + '=' + encodeURIComponent(obj[k]))
      } else {
        str.push(k + '=' + obj[k])
      }
    }
  }
  return str.join('&')
}

export const dealUrl = url => {
  const params = {}
  const urlArr = url.split('?')[1].split('&')
  for (let i = 0; i < urlArr.length; i++) {
    const item = urlArr[i].split('=')
    params[item[0]] = item[1]
  }
  return params
}

export const arrayCopy = function (params) {
  if (params) {
    return JSON.parse(JSON.stringify(params))
  }
}

export const limitFontSize = function (text, limit, needEllipsis) {
  if (text.length > limit) {
    return needEllipsis ? text.substr(0, limit) + '...' : text.substr(0, limit)
  } else {
    return text
  }
}

export const dealParams = function (params = {}) {
  if (process.env.TARO_ENV === 'alipay') {
    return params || {}
  } else {
    const newParams = {}
    for (const key in params) {
      newParams[key] = decodeURIComponent(params[key])
    }
    return newParams
  }
}

export const isPhoneNumber = function (phone) {
  const out = parseInt(phone)
  if (isNaN(out)) return false
  return /^1[3456789]\d{9}$/.test(out)
}

export const debounce = (fn, wait) => {
  let timer = null
  return function () {
    const context = this
    const args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, wait)
  }
}

export const formatNumber = data => {
  const { value, startNum = 3, endNum = 4, replaceText = '****' } = data

  const reg = new RegExp(`^(\\d{${startNum}})\\d*(\\d{${endNum}})$`)
  if (isPhoneNumber(value)) {
    return value.replace(reg, ($0, $1, $2) => `${$1 + replaceText + $2}`)
  } else {
    return value.replace(reg, ($0, $1, $2) => `${$1 + replaceText + $2}`)
  }
  // return value
}

export const removeStaticSourceHTTPSchema = function (data) {
  if (typeof data === 'string') {
    if (/^http:/.test(data)) {
      return data.replace(/^http:/, 'https:')
    }
    if (data.substr(0, 2) === '//') {
      return 'https:' + data
    }
  } else if (isArray(data)) {
    data.forEach((item, i) => {
      data[i] = removeStaticSourceHTTPSchema(item)
    })
  } else if (isObject(data)) {
    for (var k in data) {
      data[k] = removeStaticSourceHTTPSchema(data[k])
    }
  }

  return data
}

export {
  Time,
  languages,
}

export default {
  Time,
  languages,
  stringify,
}
