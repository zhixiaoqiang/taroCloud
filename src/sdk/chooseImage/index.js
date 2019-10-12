import Taro from '@tarojs/taro'

export default function chooseImage (params = {}) {
  return new Promise(resolve => {
    Taro.chooseImage({
      success: res => {
        resolve(res)
      },
      fail: function () {},
      ...params,
    })
  })
}
