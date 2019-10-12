import ua from '@/utils/userAgent'

export default function chooseLocation () {
  return new Promise(() => {
    if (ua.browser.isWechatWebview) {
    } else if (ua.browser.isQQWebview) {
    } else if (ua.browser.isAlipayWebview) {
    } else if (ua.browser.isXiaoDianWebview) {
    } else if (ua.browser.isSNWebview) {
    }
  })
}
