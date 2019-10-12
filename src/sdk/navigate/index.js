import Taro from '@tarojs/taro'

export function navigateTo (params) {
  Taro.navigateTo(params)
}

export function navigateBack (params) {
  Taro.navigateBack(params)
}
