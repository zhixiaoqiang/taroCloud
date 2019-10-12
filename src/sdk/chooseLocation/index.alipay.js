export default function chooseLocation () {
  return new Promise((resolve, reject) => {
    my.chooseLocation({
      success: resolve,
      fail: reject,
    })
  })
}
