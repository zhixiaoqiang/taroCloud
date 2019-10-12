/*
 * @Author: 三少
 * @Date: 2019-08-12 10:43:34
 * @LastEditors: 三少
 * @LastEditTime: 2019-08-12 20:13:07
 * @Description: description
 */
import Taro from '@tarojs/taro'
import { stringify, dealParams } from '@/utils/index'

export default function getCurrentPath () {
  const ins = Taro.getCurrentPages()
  if (ins.length === 0) {
    return ''
  }
  const router =
    (ins[ins.length - 1].$component &&
      ins[ins.length - 1].$component.$router) ||
    {}
  if (!router.path) {
    return '/pages/map/index'
  } else {
    const path = `${router.path}?${stringify(dealParams(router.params || {}))}`
    return path
  }
}
