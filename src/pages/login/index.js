import Taro from '@tarojs/taro'

import { redirectTo, setStorageSync, getStorageSync } from '@/sdk'
import { usePage, useDidShow } from '@/hooks'

import { View, Button, Text } from '@tarojs/components'
import { AtAvatar } from 'taro-ui'
import Container from '@/components/common/container'

import { useDispatch } from '@tarojs/redux'

import './index.less'

const init = {
  state: {
    isLogin: false,
  },
  effects: {
    initData () {
      const isLogin = getStorageSync('isLogin')
      if (isLogin) {
        this.setState({
          isLogin: true,
        })
        redirectTo({ url: '/pages/trending/index' })
      }
    },
    handleLogin (dispatch) {
      dispatch.dispatchSetGlobalInfo({ isLogin: true })
      setStorageSync('isLogin', true)
      redirectTo({ url: '/pages/trending/index' })
    },
  },
}
export default function Index () {
  const [state, events, loading] = usePage(init)
  const dispatch = useDispatch()

  useDidShow(() => {
    events.initData(dispatch)
  })

  return (
    <Container loading={state.isLogin || loading.initData !== false}>
      <View className="pages-login-index">
        <View className="container">
          <Text>FED PUSH</Text>
          <View className="image-container">
            <AtAvatar
              size="large"
              circle
              image="https://wx.qlogo.cn/mmhead/Q3auHgzwzM5PxvXbKcYvIcYibL14V0z5vpBicx7d5NkdibALZ2n9CAgIg/0"
            />
          </View>

          <Button className="button" onClick={() => events.handleLogin(dispatch.globalData)}>
          立即进入
          </Button>
        </View>
      </View>
    </Container>

  )
}

Index.config = {
  navigationBarTitleText: '',
}
