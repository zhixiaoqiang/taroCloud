import Taro from '@tarojs/taro'

export default function showError (error) {
  Taro.showToast({
    title:
      (error && (error.msg || error.errMsg || error.message)) ||
      error ||
      '未知错误',
    icon: 'none',
    duration: 2000,
    mask: true,
  })
}
