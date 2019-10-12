import { readyWechat, readyAlipay } from '@/utils/bridgeConf'
import ua from '@/utils/userAgent'
import { showToast } from '@/sdk'

export default function getLocation () {
  return new Promise((resolve) => {
    if (ua.browser.isWechatWebview) {
      readyWechat().then(function ({ wx }) {
        wx.getLocation({
          type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: resolve,
          fail: function () {
            showToast({
              title: '定位失败，请刷新重试',
            })
          },
        })
      })
    } else if (ua.browser.isQQWebview) {
    } else if (ua.browser.isAlipayWebview) {
      readyAlipay().then(my => {
        my.call('getLocation', res => {
          if (res.error) {
            showToast({
              title: '定位失败，请刷新重试',
            })
            // failCallback && failCallback({ latitude: CURRENT_POI.latitude, longitude: CURRENT_POI.longitude })
            // failCallback && failCallback({ code: -1, message: JSON.stringify(res.error) })
          } else {
            resolve({ latitude: res.latitude, longitude: res.longitude })
          }
        })
      })
    } else if (ua.browser.isXiaoDianWebview) {
    } else if (ua.browser.isSNWebview) {
    }
  })
}
