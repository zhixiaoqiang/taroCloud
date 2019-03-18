import Taro, { Component } from '@tarojs/taro'
import { AtTabBar }  from 'taro-ui'

export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
    }
  }
  handleClick (tabList, value) {
    const curTab = tabList[value]

    if (curTab.title === '新增') {
      this.uploadFile()
    } else if (curTab.router) {
      this.navigateTo(curTab.router)
    }

    this.setState({
      current: value
    })
  }
  render () {
    let { current } = this.state

    let tabList = [
      {
        title: '待办事项',
        iconType: 'bullet-list',
        text: 'new',
        router: '/pages/create/index?isAdd=true'
      },
      {
        title: '新增',
        iconType: 'camera',
        text: 'new'
      },
      {
        title: '我的',
        iconType: 'user',
        text: 'new',
        router: '/pages/create/index?isAdd=true'
      }
    ]
    return (
      <AtTabBar
        fixed
        tabList={tabList}
        onClick={this.handleClick.bind(this, tabList)}
        current={current}
      />
    )
  }

  navigateTo (url) {
    Taro.navigateTo({
      url
    })
  }

  // 选择图片并上传
  uploadFile () {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        wx.showLoading({
          title: '上传中···',
        })
        const filePath = res.tempFilePaths[0]
        const cloudPath = (new Date().getTime()) + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath, // 文件路径
          success: uploadRes => {
            console.log('[上传文件] 成功：', uploadRes)
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      }
    })
  }
}