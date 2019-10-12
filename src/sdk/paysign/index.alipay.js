export default function paySign ({ alipayUrl }) {
  return new Promise((resolve, reject) => {
    my.paySignCenter({
      signStr: alipayUrl,
      success: res => resolve(res),
      fail: err => reject(err),
    })
  })
}
