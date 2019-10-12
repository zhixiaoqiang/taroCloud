import Taro from '@tarojs/taro'

export default function hideNavigationBarLoading (params = {}) {
  if (!params.success) {
    params.success = () => {}
  }
  Taro.hideNavigationBarLoading(params)
}
