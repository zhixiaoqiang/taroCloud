import CONSTANTS from '@/constants'

export default function paySign (data) {
  return new Promise((resolve, reject) => {
    wx.navigateToMiniProgram({
      appId: CONSTANTS.WX_QIANYUE_APPID,
      path: 'pages/index/index',
      extraData: data,
      success: res => resolve(res),
      fail: err => reject(err),
    })
  })
}
