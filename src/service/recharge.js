
import request from '@/utils/request'
// import CONSTANTS from '@/constants'
// import { showToast } from '@/sdk'

/**
 * 获取账户余额
 * data = {}
 */
export const getADBalanceDetail = (data, options) =>
  request({
    url: '/mc/ad/balanceDetail',
    data,
    ...options,
  })

export const submitTopUps = (data, options) =>
  request({
    url: '/mc/ad/recharge',
    method: 'POST',
    data,
    ...options,
  })

export const fetchSMSCode = (data, options) => {
  return request({
    url: '/mc/ad/sendVerificationCode',
    data,
    ...options,
  })
}
