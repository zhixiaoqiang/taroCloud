import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from '@tarojs/redux'

import { usePage, useMount } from '@/hooks'

import { AtTabBar } from 'taro-ui'

const init = {
  state: {
    url: '/xxx',
    tabList: [],
  },

  reducers: {
    handleClick () {
      // this中挂载了 state、setState、location、reducers & effects 中的方法
      this.setState({ url: '/yyy' })

      this.navigateTo(this.state.url)
    },

    navigateTo (url) {
      console.warn(url)
    },
  },

  effects: {
    async initData () {
      const { url } = this.state
      await new Promise((resolve) => setTimeout(() => resolve(url), 500))
    },
  },
}

export default function Footer (props) {
  // state: 最新的state
  // events: 包含reducers及effects里所有的方法
  // loading: effects中的所有方法都会有loading状态，如：loading = { [fnName]: false }
  // error: effects中的所有方法都会有error
  const [state, events, loading, error] = usePage(init)

  const pageStore = useSelector(({ globalData }) => ({
    globalData,
  }))

  const dispatch = useDispatch()

  console.warn(pageStore, dispatch.globalData)

  useMount(() => {
    events.initData()
  })

  const { current } = props
  const { tabList } = state
  return (
    <AtTabBar
      fixed
      tabList={tabList}
      onClick={() => events.handleClick(tabList)}
      current={current}
    />
  )
}

Footer.propTypes = {
  current: PropTypes.number,
}
