import Taro from '@tarojs/taro'

export default function reLaunch (params) {
  const pages = Taro.getCurrentPages()
  let currentPage = ''
  if (pages && pages.length > 0) {
    currentPage = pages[pages.length - 1]
  }
  currentPage.$component &&
    currentPage.$component.componentDidHide &&
    currentPage.$component.componentDidHide()
  Taro.reLaunch(params)
}
