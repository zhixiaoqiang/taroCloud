import Taro from '@tarojs/taro'

export default function removeStorageSync (name) {
  return Taro.removeStorageSync(name)
}
