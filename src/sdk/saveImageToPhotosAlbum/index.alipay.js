import Taro from '@tarojs/taro'

export default function saveImageToPhotosAlbum (params = {}) {
  return new Promise((resolve) => {
    Taro.saveImageToPhotosAlbum({
      ...params,
      success: res => {
        resolve(res)
      },
      fail: function () {
        Taro.showToast({
          title: '保存失败，请重试',
          icon: 'none',
          duration: 2000,
        })
      },
    })
  })
}
