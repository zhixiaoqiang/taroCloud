import Taro from '@tarojs/taro'

export default function showToast (params) {
  Taro.showToast({
    title: (params && params.title) || params || '',
    icon: (params && params.icon) || 'none',
    duration: 2000,
    mask: true,
  })
}
