import ua from '@/utils/userAgent'

import { readyWechat, readyAlipay } from '@/utils/bridgeConf'

export default function scanCode (params = { onlyFromCamera: false }) {
  return new Promise((resolve, reject) => {
    if (ua.browser.isWechatWebview) {
      readyWechat().then(({ wx }) => {
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: params.scanType || ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            resolve(res.resultStr)
          },
          fail: function (e) {
            reject && reject(e)
          },
        })
      })
    } else if (ua.browser.isQQWebview) {
    } else if (ua.browser.isAlipayWebview) {
      readyAlipay().then(my => {
        my.call(
          'scan',
          {
            type: 'qr',
          },
          res => {
            resolve(res.qrCode)
          }
        )
      })
    } else if (ua.browser.isXiaoDianWebview) {
    } else if (ua.browser.isSNWebview) {
    }
  })
}
