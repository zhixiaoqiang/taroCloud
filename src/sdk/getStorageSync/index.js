import Taro from '@tarojs/taro'

export default function getStorageSync (name) {
  return Taro.getStorageSync(name)
}
