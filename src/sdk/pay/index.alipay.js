import Taro from '@tarojs/taro'

export default function requestPayment (payMap) {
  return new Promise((resolve) => {
    my.tradePay({
      tradeNO: payMap.alipayUrl, // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
      success: res => {
        resolve(res)
      },
      fail: error => {
        if (`${error.resultCode}` === '6001') {
          Taro.showToast({
            title: '支付失败，请重试',
            icon: 'none',
            duration: 2000,
          })
        }
      },
    })
  })
}
