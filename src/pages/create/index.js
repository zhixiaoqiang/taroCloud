import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Button, Text } from '@tarojs/components'
import { AtButton, AtNoticebar, AtSearchBar } from 'taro-ui'
import './index.less'


@connect(({ home }) => ({
  home
}), (dispatch) => ({
  ...dispatch.home
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '创建计划'
  }

  componentWillMount () {
    console.warn(this.$router.params)
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <AtNoticebar icon='volume-plus' single marquee>这是 NoticeBar 通告栏这是 NoticeBar 通告栏这是 NoticeBar 通告栏这是 NoticeBar 通告栏</AtNoticebar>
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        <Button className='add_btn' onClick={() => this.props.dispatchIncrementAsync(1)}>+</Button>
        <View><Text>{this.props.home}</Text></View>
        {/* <View><Text onClick={() => this.sum()}>Hello, World</Text></View> */}
        <AtButton type='primary' onClick={() => this.add()}>ADD</AtButton>
        <AtButton type='primary' onClick={() => this.jenkins()}>build-warehouse-dev</AtButton>
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
}

export default Index
