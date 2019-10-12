/*
 * @Author: 三少
 * @Date: 2019-08-12 20:00:13
 * @LastEditors: 三少
 * @LastEditTime: 2019-08-12 20:24:26
 * @Description: description
 */
import Taro from '@tarojs/taro'
import { dealParams } from '@/utils/index'

export default function getCurrentParams () {
  const ins = Taro.getCurrentPages()
  if (ins.length === 0) {
    return {}
  }
  const router = ins[ins.length - 1].$component && ins[ins.length - 1].$component.$router
  return dealParams(router.params)
}
