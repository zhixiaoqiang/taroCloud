import Taro from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem, Video } from '@tarojs/components'
import { usePage, useMount } from '@/hooks'
import './promotion-info.less'

const init = {
  state: {
    headerData: {
      img: 'http://img3.dian.so/lhc/2019/09/03/1500w_480h_EEEE81567502454.jpg',
    },
    pageData: [
      {
        title: '广告流量平台',
        imgs: [
          'http://img3.dian.so/lhc/2019/09/03/1396w_736h_8E4841567502511.png',
        ],
      },
      {
        title: '广告丰富玩法',
        imgs: [
          'http://img3.dian.so/lhc/2019/09/03/676w_512h_56BB71567502594.png',
          'http://img3.dian.so/lhc/2019/09/03/676w_512h_08E641567502616.png',
        ],
      },
      {
        title: '广告查看路径',
        vedioUrl: 'http://lhc-image.oss-cn-beijing.aliyuncs.com/leo/2019/09/24/5FFDA1569316960050.mp4',
        type: 'vedio',
      },
      {
        title: '成功合作案例',
        imgs: [
          'http://img3.dian.so/lhc/2019/09/03/1396w_1508h_681E91567502657.png',
          'http://img3.dian.so/lhc/2019/09/03/1396w_1508h_592991567502673.png',
          'http://img3.dian.so/lhc/2019/09/03/1396w_1508h_D93C21567502703.png',
        ],
        type: 'swiper',
      },
    ],
  },
  reducers: {
    getData () {
    },
  },
  effects: {
    async initDate () {
      this.getData()
      await new Promise((resolve) => setTimeout(() => resolve(21), 1000))
    },
  },
}

export default function Index () {
  const [state, events, loading, error] = usePage(init)
  useMount(() => {
    events.getData()
    // events.initDate()
  })

  return (
    <View className="promotion-info">
      <View className="block-images">
        <Image src={state.headerData.img} mode="widthFix" className="image" />
      </View>
      {state.pageData.map((item, index) => {
        const { title, imgs, type, vedioUrl } = item
        return (
          <View className="promotion-info-block" key={`${title}${index}`}>
            <View className="block-title">{title}</View>
            <View className="block-title-line" />
            {title === '广告查看路径' && (
              <View className="block-children">
                微信或者支付宝扫码充电
                <Image
                  className="arrow"
                  src="http://img3.dian.so/lhc/2019/09/03/80w_44h_13DB51567507595.png"
                  mode="widthFix"
                />
                取出充电宝
                <Image
                  className="arrow"
                  src="http://img3.dian.so/lhc/2019/09/03/80w_44h_13DB51567507595.png"
                  mode="widthFix"
                />
                充电宝倒计时页面点击抽奖
              </View>
            )}

            {type === 'swiper' ? (
              <Swiper
                className="swiper"
                indicatorColor="#BBBBBB"
                indicatorActiveColor="#2196F3"
                circular
                indicatorDots
                autoplay
              >
                {imgs.map(imgUrl => (
                  <SwiperItem key={imgUrl}>
                    <Image
                      key={imgUrl}
                      src={imgUrl}
                      mode="widthFix"
                      className="image"
                    />
                  </SwiperItem>
                ))}
              </Swiper>
            ) : type === 'vedio' ? (
              <Video
                src={vedioUrl}
                controls
                autoplay={false}
                initialTime="0"
                id="video"
              />
            ) : (
              <View className="block-images">
                {imgs.map(imgUrl => (
                  <Image
                    key={imgUrl}
                    src={imgUrl}
                    mode="widthFix"
                    className="image"
                  />
                ))}
              </View>
            )}
          </View>
        )
      })}
    </View>
  )
}

Index.config = {
  navigationBarTitleText: '一分钟教你读懂推广通',
  navigationBarBackgroundColor: '#FFFFFF',
}
