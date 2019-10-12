import Taro from '@tarojs/taro'

export default function showActionSheet (obj) {
  return new Promise((resolve, reject) => {
    Taro.showActionSheet(obj)
      .then(res => {
        if (process.env.TARO_ENV === 'alipay') {
          if (res.index !== undefined) {
            res.tapIndex = res.index
          }
        }
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
