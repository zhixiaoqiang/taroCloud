/* eslint-disable react/no-unused-state */
import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'
import Loading from '@/components/common/loading'
import Footer from '@/components/common/footer'
import { AtButton, AtNoticebar, AtSearchBar, AtCard, AtIcon } from 'taro-ui'
import Utils from '@/utils'
import './index.less'

@connect(
  ({ home, globalData }) => ({
    home,
    globalData,
  }),
  dispatch => ({
    ...dispatch.home,
    ...dispatch.globalData,
  })
)
class Index extends Component {
  componentWillMount () {
    // 获取用户信息
    Taro.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          Taro.getUserInfo({
            success: result => {
              this.saveUserInfo(result.userInfo)
            },
            fail: err => console.warn(err),
          })
        }
      },
    })
  }

  componentDidShow () {
    this.getPlanList()
  }

  componentDidHide () {}

  saveUserInfo (userInfo) {
    this.props.dispatchSetGlobalInfo({
      avatarUrl: userInfo.avatarUrl,
      userInfo: userInfo,
    })
    this.insertUserInfo(userInfo)
  }

  async insertUserInfo (data) {
    const openId = Taro.getStorageSync('openId')
    const user = wx.cloud.database().collection('user')
    user
      .where({
        _openid: openId,
      })
      .get()
      .then(res => {
        if (!res.data.length) {
          user
            .add({
              data,
            })
            .then(addRes => console.warn(addRes))
        } else {
          user.doc(res.data[0]._id).update({
            data,
          })
        }
      })
  }

  getPlanList (query = {}) {
    const success = res => {
      let { data = {} } = res.result || {}
      this.setState({
        planList: data.data || [],
      })
    }
    this.hendlePlanItem('plans/list', query, success)
    // this.hendleActical("list", {}, res => console.warn(res));
  }

  goPlan (data = {}) {
    const query = `?${Utils.stringify(data)}`
    Taro.navigateTo({
      url: `/pages/create/index${query}`,
    })
  }

  hendleActical (url, data, success) {
    wx.cloud
      .callFunction({
        // 要调用的云函数名称
        name: 'actical',
        // 传递给云函数的参数
        data: {
          $url: url,
          data,
        },
      })
      .then(res => {
        success && success(res)
      })
      .catch(err => console.warn(err))
  }

  hendlePlanItem (url, data, success) {
    wx.cloud
      .callFunction({
        // 要调用的云函数名称
        name: 'plans',
        // 传递给云函数的参数
        data: {
          $url: url,
          data,
        },
      })
      .then(res => {
        success && success(res)
      })
      .catch(err => console.warn(err))
  }

  render () {
    const { planList } = this.state
    if (!planList) {
      return <Loading />
    }
    return (
      <View className="index">
        <AtNoticebar icon="volume-plus" single marquee>
          今天也要开心鸭
        </AtNoticebar>
        <AtSearchBar
          placeholder="输入计划名称或首字母缩写"
          showActionButton
          value={this.state.searchValue}
          onChange={value => this.setState({ searchValue: value })}
          onConfirm={() =>
            this.getPlanList({ planName: this.state.searchValue })
          }
          onActionClick={() =>
            this.getPlanList({ planName: this.state.searchValue })
          }
        />
        <View className="plans">
          {planList.map(item => (
            <AtCard
              key={item._id}
              note={`${item.date || ''} ${item.time}`}
              extra={item.isLong ? '每日' : item.date}
              title={item.planName}
              onClick={() => this.goPlan({ id: item._id })}
            >
              {item.comment}
            </AtCard>
          ))}
        </View>
        <Footer current={0} />
        <AtButton
          className="create-plan"
          open-type="getUserInfo"
          onClick={() => {
            this.goPlan({ isAdd: true })
          }}
        >
          <AtIcon value="add" size="20" color="#FFF" />
        </AtButton>
      </View>
    )
  }
}

Index.config = {
  navigationBarTitleText: '首页',
}

Index.propTypes = {
  dispatchSetGlobalInfo: PropTypes.func,
}

export default Index
