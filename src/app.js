import '@tarojs/async-await'
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import 'taro-ui/dist/style/index.scss'

import Index from './pages/index'

import store from './store'
import './app.less'

// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  // eslint-disable-next-line react/sort-comp
  config = {
    pages: [
      'pages/test-page/promotion-info', // 一分钟教你读懂推广通
      'pages/trending/index',
      'pages/index/index',
      'pages/create/index',
      'pages/userCenter/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'New Fed',
      navigationBarTextStyle: 'black',
    },
  };

  componentDidMount () {
    this.updateApp()
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }
    // this.getUserOpenId()
  }

  // getUserOpenId () {
  //   const openId = Taro.getStorageSync('openId')
  //   if (openId) return openId
  //   return wx.cloud
  //     .callFunction({
  //       name: 'login',
  //     })
  //     .then(res => {
  //       Taro.setStorageSync('openId', res.result.openid)
  //       return res.result.openid
  //     })
  //     .catch(err => {
  //       return false
  //     })
  // }

  /* 更新小程序 */
  updateApp () {
    if (Taro.canIUse('getUpdateManager')) {
      const updateManager = Taro.getUpdateManager()
      updateManager.onCheckForUpdate(res => {
        // 请求完新版本信息的回调
        console.warn('onCheckForUpdate', res)
      })
      updateManager.onUpdateReady(() => {
        Taro.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success (res) {
            if (res.confirm) {
              // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
              updateManager.applyUpdate()
            }
          },
        })
      })
      updateManager.onUpdateFailed(() => {
        // 新版本下载失败
      })
    }
  }

  componentDidShow () {}

  componentDidHide () {}

  componentCatchError () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
