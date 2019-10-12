import Taro from '@tarojs/taro'

export default function setNavigationBarTitle (title) {
  Taro.setNavigationBarTitle({
    title: title || '',
  })
}
