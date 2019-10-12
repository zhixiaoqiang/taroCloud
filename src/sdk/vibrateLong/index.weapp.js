export default function vibrateLong () {
  return new Promise((resolve) => {
    wx.vibrateLong({
      success: res => {
        resolve(res.code)
      },
    })
  })
}
