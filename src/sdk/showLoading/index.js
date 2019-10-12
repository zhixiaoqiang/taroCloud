import Taro from '@tarojs/taro'

export default function showLoading (title, options = {}) {
  Taro.showLoading({
    title: title || '加载中',
    ...options,
  })
}
