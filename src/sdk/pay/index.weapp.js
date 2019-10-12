import Taro from '@tarojs/taro'

export default function requestPayment (payMap) {
  return new Promise((resolve) => {
    wx.requestPayment({
      timeStamp: payMap.timeStamp,
      nonceStr: payMap.nonceStr,
      package: `prepay_id=${payMap.prepayId}`,
      signType: 'MD5',
      paySign: payMap.paySign,
      success: res => {
        resolve(res)
      },
      fail: error => {
        if (!/cancel/.test(error.errMsg)) {
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
