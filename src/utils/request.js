import Taro from '@tarojs/taro'
import { uploadFile, hideLoading, getCurrentPath } from '@/sdk'
import { removeStaticSourceHTTPSchema } from '@/utils/index'
import store from '@/store'
import CONSTANTS from '@/constants/index'

const getReqData = options => {
  let { data, method } = options

  return method === 'GET' ? data : JSON.stringify(data)
}

const getReqUrl = options => {
  const { url } = options
  const isDev = process.env.NODE_ENV !== 'production'

  const domain = isDev ? CONSTANTS.DEV_DOMAIN : CONSTANTS.DOMAIN

  if (/^https?/.test(url)) {
    return url
  }

  return domain + url
}

const getReqHeader = () => {
  const header = {
    'Content-Type': 'application/json',
  }
  return header
}

const requestErr = response => {
  const { globalData } = store.getState()
  const { dispatchSetGlobalInfo } = store.dispatch.globalData
  const { code } = response
  if (code + '' === CONSTANTS.API_CODE_NEED_LOGIN) {
    hideLoading()
    const path = getCurrentPath()
    if (!globalData.isLogin || !/pages\/login\/index/.test(path)) {
      dispatchSetGlobalInfo({ isLogin: true })
      Taro.reLaunch({
        url: `/pages/login/index?src=${encodeURIComponent(path)}`,
      })
    }
    // 中断请求
    return new Promise(() => {}).catch(() => {})
  } else {
    throw response
  }
}
const requestSuccess = (response, options) => {
  if (!response) {
    return requestErr({ code: -1, msg: '服务端开小差了' })
  }
  if (!response.success) {
    return requestErr(response)
  }
  response.data = removeStaticSourceHTTPSchema(response.data)

  if (options.proxy) {
    return response.data
  } else {
    return {
      success: true,
      data: response.data,
    }
  }
}

const errorHandler = (err, options) => {
  console.warn('err', err)
  // 当请求status不为200时，出错信息的数据会存在两个地方，一个是data里，一个是data同级的字段里
  if (err.data && err.data.errorMessage) {
    err = err.data
  }
  const error = { success: false }
  if (err.errorMessage && err.errorMessage === 'JSON parse data error') {
    err.errorMessage = '服务无法访问'
  }
  if (err.errMsg && err.errMsg.indexOf('request:fail') > -1) {
    err.errorMessage = '网络不可用'
  }
  error.msg = err.msg || err.errorMessage || err.errMsg || '服务端开小差了'
  error.code = err.code || err.status || err.error || -1
  if (options.pageError) {
    throw error
  } else if (options.proxy) {
    error.proxy = true
    throw error
  } else {
    return {
      success: false,
      code: error.code,
      msg: error.msg,
    }
  }
}

/**
 * options 参数说明
 * proxy: 错误信息是否自动以toast处理。默认为true
 */

export default async (options = {}) => {
  options.method = (options.method || 'GET').toUpperCase()
  options.timestamp = +new Date()
  options.proxy = options.proxy !== false
  try {
    let response
    if (options.url) {
      response = await Taro.request({
        url: getReqUrl(options),
        data: getReqData(options),
        header: getReqHeader(options),
        method: options.method,
      })
    } else {
      options.url = '/xxx'
      response = await uploadFile({
        url: getReqUrl(options),
        filePath: options.data,
        fileType: 'image',
        name: 'file',
        // header: getReqHeader('upload'),
      })
      if (response.data) {
        response.data = JSON.parse(response.data)
      }
    }
    return requestSuccess(response.data, options)
  } catch (err) {
    return errorHandler(err, options)
  }
}
