import Taro from '@tarojs/taro'

export default function showNavigationBarLoading (params = {}) {
  if (!params.success) {
    params.success = () => {}
  }
  Taro.showNavigationBarLoading(params)
}
