import Taro from '@tarojs/taro'

export default function showModal (params) {
  return new Promise(function (resolve, reject) {
    Taro.showModal({
      title: params.title || '',
      content: params.content || '',
      showCancel:
        typeof params.showCancel === 'boolean' ? params.showCancel : false,
      cancelText: params.cancelText || '取消',
      cancelColor: params.cancelColor || '#000000',
      confirmText: params.confirmText || '确定',
      confirmColor: params.confirmColor || '#2196F3',
      success (res) {
        resolve && resolve(res)
        if (res.confirm) {
          params.success && params.success(res)
        } else {
          params.cancel && params.cancel(res)
        }
      },
      fail (error) {
        reject && reject(error)
      },
    })
  })
}
