import Taro from '@tarojs/taro'

export default function (name, data) {
  return Taro.setStorageSync(name, data)
}
