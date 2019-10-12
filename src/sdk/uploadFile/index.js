import Taro from '@tarojs/taro'

export default function uploadFile (params = {}) {
  return new Promise((resolve) => {
    Taro.uploadFile({
      ...params,
      success: res => {
        resolve(res)
      },
      fail: function () {
        Taro.showToast({
          title: '上传失败，请重试',
          icon: 'none',
          duration: 2000,
        })
      },
    })
  })
}
