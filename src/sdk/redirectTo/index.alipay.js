import Taro from '@tarojs/taro'

export default function redirectTo (params) {
  const pages = Taro.getCurrentPages()
  let currentPage = ''
  if (pages && pages.length > 0) {
    currentPage = pages[pages.length - 1]
  }
  currentPage.$component &&
    currentPage.$component.componentDidHide &&
    currentPage.$component.componentDidHide()
  Taro.redirectTo(params)
}
