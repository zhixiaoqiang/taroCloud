import Taro from '@tarojs/taro'

export default function makePhoneCall (phone) {
  Taro.makePhoneCall({ phoneNumber: phone })
}
