import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Button } from '@tarojs/components'
import Uploading from '@/components/common/uploading'
import Footer from '@/components/common/footer'
import { AtButton, AtNoticebar, AtSearchBar, AtAvatar } from 'taro-ui'
import './index.less'


@connect(({ home, global }) => ({
  home,
  global
}), (dispatch) => ({
  ...dispatch.home,
  ...dispatch.global
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () {
    // 获取用户信息
    wx.getSetting({
     success: res => {
       if (res.authSetting['scope.userInfo']) {
         // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
         wx.getUserInfo({
           success: res => {
             this.props.dispatchSetGlobalInfo({
               avatarUrl: res.userInfo.avatarUrl,
               userInfo: res.userInfo
             })
             this.insertUserInfo(res.userInfo)
           }
         })
       }
     }
   })
 }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let { global } = this.props
    if (!global.avatarUrl) {
      return <Uploading></Uploading>
    }
    return (
      <View className='index'>
        <AtNoticebar icon='volume-plus' single marquee>这是 NoticeBar 通告栏这是 NoticeBar 通告栏这是 NoticeBar 通告栏这是 NoticeBar 通告栏</AtNoticebar>
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        <AtAvatar
          size='small'
          circle
          image={global.avatarUrl}
        ></AtAvatar>
        <Button
          onClick={() => {
            Taro.navigateTo({
              url: '/pages/create/index?isAdd=true'
            })
          }}
        >跳转create</Button>
        {/* <Button className='add_btn' onClick={() => this.props.dispatchIncrementAsync(1)}>+</Button>
        <View><Text>{this.props.home}</Text></View>
        <AtButton type='primary' onClick={() => this.add()}>ADD</AtButton>
        <AtButton type='primary' onClick={() => this.jenkins()}>build-warehouse-dev</AtButton> */}


        <Footer></Footer>
      </View>
    )
  }

  onChange (value) {
    this.setState({
      value: value
    })
  }

  sum () {
    wx.cloud.callFunction({
      name: 'sum',
      // 传给云函数的参数
      data: {
        a: 12,
        b: 19,
      },
    }).then(res => console.warn(res))
  }

  add () {
    wx.cloud.callFunction({
      name: 'add',
      // 传给云函数的参数
      data: {
        a: 12,
        b: 19,
      },
    }).then(res => {
      console.warn(res.result.result)
      let title = `调用add成功，值为${String(res.result.result)}`
      wx.showToast({
        title,
      })
    })
  }

  jenkins () {
    wx.cloud.callFunction({
      name: 'jenkins',
      data: {
        env: 'warehouse-dev'
      },
    }).then(res => console.warn(res))
  }

  getUserOpenId () {
    return wx.cloud.callFunction({
      name: 'login'
    }).then(res => {
      return res.result.openid
    }).catch(err => {
      return false
    })
  }

  async insertUserInfo (data) {
    let openId = await this.getUserOpenId()
    const user = wx.cloud.database().collection('user')
    user.where({
      _openid: openId
    }).get({
      success: (res) => {
        if (!res.data.length) {
          user.add({
            data
          }).then(addRes => console.warn(addRes))
        } else {
          user.update({
            data,
          })
        }
      },
      fail: console.error
    })
  }
}

export default Index
