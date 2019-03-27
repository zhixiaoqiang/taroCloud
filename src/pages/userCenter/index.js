import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Text } from '@tarojs/components'
import { AtAvatar, AtButton, AtIcon, AtList, AtListItem } from 'taro-ui'
import Footer from '@/components/common/footer'
import './index.less'


@connect(({ userCenter, global }) => ({
  userCenter,
  global
}), (dispatch) => ({
  ...dispatch.userCenter,
  ...dispatch.global
}))
export default class UserCenter extends Component {
  config = {
    navigationBarTitleText: '个人中心'
  }
  constructor (props) {
    super(props)
    this.state = {
      handleList: [
        {
          title: '我的消息',
          arrow: 'right',
          thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
        },
        {
          title: '个人信息',
          arrow: 'right',
          thumb: 'http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
        },
        {
          title: '关于我们',
          arrow: 'right',
          thumb: 'http://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png'
        },
        {
          title: '设置',
          arrow: 'right',
          thumb: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'
        }
      ]
    }
  }

  componentWillMount () {
    // console.warn(this.$router.params)
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { global } = this.props
    const { avatarUrl, userInfo } = global
    const { handleList } = this.state
    console.warn(global)
    return (
      <View className='user-center-container'>
        {/* 头部信息 */}
        <View className='at-row at-row__justify--between at-row__align--center user-header'>
          <View className='at-col at-col-18'>
            <View>
              <Text className='nick-name'>{userInfo.nickName}</Text>
            </View>
            <View>
              <Text className='desc'>人生就是一场说走就走的旅行</Text>
            </View>
            <View className='tags'>
              <AtButton circle size='small' type='primary' >天霸</AtButton>
              <AtButton circle size='small' type='primary' >tua</AtButton>
              <AtIcon value='chevron-right' size='20' color='#aaa'></AtIcon>
            </View>
          </View>
          <View
            className='at-col at-col-6 text-center'
            onClick={() => {
              wx.previewImage({
                current: avatarUrl, // 当前显示图片的http链接
                urls: [avatarUrl] // 需要预览的图片http链接列表
              })
            }}
          >
            <AtAvatar
              size='large'
              circle
              image={avatarUrl}
            />
          </View>
        </View>
        <AtList>
          {
            handleList.map((item, i) => (
              <AtListItem
                title={item.title}
                arrow={item.arrow}
                thumb={item.thumb}
                key={i}
              />
            ))
          }
        </AtList>
        <Footer current={3}></Footer>
      </View>
    )
  }
}
