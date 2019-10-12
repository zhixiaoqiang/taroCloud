export default function creditBorrow (param) {
  return new Promise((resolve, reject) => {
    my.zmCreditBorrow({
      ...param,
      success: resolve,
      fail: reject,
    })
  })
}
