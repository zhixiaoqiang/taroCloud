import Taro from '@tarojs/taro'

export default function scanCode (params = { onlyFromCamera: false }) {
  return new Promise((resolve, reject) => {
    Taro.scanCode({
      ...params,
      success: res => {
        resolve(res.code)
      },
      fail: function (e) {
        reject && reject(e)
      },
    })
  })
}
