import Taro from '@tarojs/taro'

export default function getLocation () {
  return new Promise((resolve, reject) => {
    Taro.getLocation({
      type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      success: resolve,
      fail: function (err) {
        reject(err)
        Taro.showToast({
          title: '定位失败，请刷新重试',
          icon: 'none',
          duration: 2000,
        })
      },
    })
  })
}
