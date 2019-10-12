/*
 * @Author: 三少
 * @Date: 2019-08-12 10:43:34
 * @LastEditors: 三少
 * @LastEditTime: 2019-08-12 20:01:03
 * @Description: description
 */
import Taro from '@tarojs/taro'

export default function getCurrentPage () {
  const pages = Taro.getCurrentPages()
  let currentPage = ''
  if (pages && pages.length > 0) {
    currentPage = pages[pages.length - 1].route
  }
  return currentPage
}
