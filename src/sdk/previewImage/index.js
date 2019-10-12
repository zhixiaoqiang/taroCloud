import Taro from '@tarojs/taro'

export default function previewImage (params = {}) {
  return new Promise((resolve) => {
    Taro.previewImage({
      ...params,
      success: res => {
        resolve(res)
      },
      fail: function () {
        Taro.showToast({
          title: '预览失败，请重试',
          icon: 'none',
          duration: 2000,
        })
      },
    })
  })
}
