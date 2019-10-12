export default function chooseLocation () {
  return new Promise((resolve, reject) => {
    wx.chooseLocation({
      success: resolve,
      fail: reject,
    })
  })
}
