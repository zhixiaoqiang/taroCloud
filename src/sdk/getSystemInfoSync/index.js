import Taro from '@tarojs/taro'

export default function getSystemInfoSync () {
  return Taro.getSystemInfoSync()
}
