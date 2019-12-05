import Taro from '@tarojs/taro'

import { useDispatch } from '@tarojs/redux'
import { usePage, useDidShow, useMount, useMemo } from '@/hooks'
import { showLoading, showModal, pageScrollTo, hideLoading, setStorageSync, setClipboardData, showToast, getStorageSync } from '@/sdk'

import { AtCard, AtLoadMore } from 'taro-ui'
import { View, Picker, Text } from '@tarojs/components'
import Container from '@/components/common/container'
import Footer from '@/components/common/footer'

import { languages } from '@/utils'

import './index.less'

const CATEGORY = [
  {
    name: 'trending',
    value: 'trending',
  },
  {
    name: 'upcome',
    value: 'upcome',
  },
]
const PERIOD = [
  {
    name: 'Today',
    value: 'day',
  },
  {
    name: 'Week',
    value: 'week',
  },
  {
    name: 'Month',
    value: 'month',
  },
]
const PAGE_SIZE = 30

const init = {
  state: {
    lang: languages[6],
    category: CATEGORY[0],
    period: PERIOD[0],
    githubRange: [CATEGORY, PERIOD, languages],
    githubRangeValue: [0, 0, 6],
  },
  reducers: {
    handleLoadStatus (isComplete, isPaging) {
      return isComplete ? 'noMore' : isPaging ? 'loading' : 'more'
    },

    goActical (url) {
      // const query = `?${stringify(data)}`
      // navigateTo({
      //   url: `/pages/create/index${query}`,
      // })

      setClipboardData({
        data: url,
      }).then(() => {
        showToast({
          title: '链接已复制到剪切板',
        })
      })
    },
  },
  effects: {
    async initData () {
      const trendingProps = getStorageSync('trendingProps')
      if (trendingProps) {
        const { githubRange } = this.state
        const [category, period, lang] = githubRange
        const { categoryIndex, periodIndex, langIndex } = trendingProps

        this.setState(
          {
            category: category[categoryIndex],
            period: period[periodIndex],
            lang: lang[langIndex],
            githubRangeValue: [categoryIndex, periodIndex, langIndex],
          }
        )
        this.getActicalList({
          offset: 0,
          category: category[categoryIndex],
          period: period[periodIndex],
          lang: lang[langIndex],
        })
      } else {
        this.getActicalList({ offset: 0 })
      }
    },

    async saveUserInfo (userInfo, dispatch) {
      dispatch.globalData.dispatchSetGlobalInfo({
        avatarUrl: userInfo.avatarUrl,
        userInfo: userInfo,
      })
      this.insertUserInfo(userInfo)
    },

    async insertUserInfo (data) {
      const openId = getStorageSync('openId')
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
    },

    async getActicalList (query = {}) {
      const { articalList = [] } = this.state
      const {
        category,
        lang,
        period,
        ...other
      } = query

      let data = {
        category: (category || this.state.category).value, // 热门 trending 新生 upcome
        lang: (lang || this.state.lang).value,
        limit: PAGE_SIZE,
        offset: articalList.length || 0,
        period: (period || this.state.period).value,
        ...other,
      }

      this.setState({
        isPaging: true,
      })

      const success = res => {
        let { data } = res.result || {}
        const list = data || []
        this.setState({
          articalList: query.offset === 0 ? list : [...articalList, ...list],
          isComplete: list.length < PAGE_SIZE,
          isPaging: false,
        })
        hideLoading()
      }

      const fail = () => {
        this.setState({
          isPaging: false,
        })
        hideLoading()
      }

      this.handleActical('trendingList', data, success, fail)
    },

    async handleActical (url, data, success, fail) {
      wx.cloud
        .callFunction({
          // 要调用的云函数名称
          name: 'actical',
          // 传递给云函数的参数
          data: {
            $url: url,
            data: data || {},
          },
        })
        .then(res => {
          success && success(res)
        })
        .catch(err => {
          console.warn(err)
          fail && fail(err)
        })
    },

    async onChangeGithubParams (value) {
      const { githubRange } = this.state
      const [category, period, lang] = githubRange
      const [categoryIndex, periodIndex, langIndex] = value
      setStorageSync('trendingProps', {
        categoryIndex,
        periodIndex,
        langIndex,
      })

      showLoading('加载中···', { mask: true })

      if (pageScrollTo) {
        pageScrollTo({
          scrollTop: 0,
        })
      } else {
        showModal({
          title: '提示',
          content:
            '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        })
      }

      await this.setState(
        {
          category: category[categoryIndex],
          period: period[periodIndex],
          lang: lang[langIndex],
          githubRangeValue: [categoryIndex, periodIndex, langIndex],
          isPaging: true,
        }
      )

      this.getActicalList({
        offset: 0,
        category: category[categoryIndex],
        period: period[periodIndex],
        lang: lang[langIndex],
      })
    },
  },
}

export default function Index () {
  const [state, events, loading, error] = usePage(init)
  const dispatch = useDispatch()

  useMount(() => {
    // 获取用户信息
    Taro.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          Taro.getUserInfo({
            success: result => {
              events.saveUserInfo(result.userInfo, dispatch)
            },
            fail: err => console.warn(err),
          })
        }
      },
    })
  })

  useDidShow(() => {
    events.initData()
  })

  const {
    articalList,
    category,
    lang,
    period,
    githubRange,
    githubRangeValue,
    isComplete,
    isPaging,
  } = state

  return (
    <Container loading={!articalList}>
      <View className="trending">
        <View className="github-list">
          {articalList && articalList.map((item, i) => {
            const {
              starCount,
              forkCount,
              description,
              reponame,
              username,
              url,
              lang,
            } = item
            return (
              <AtCard
                key={i}
                note={String(
                  `Star: ${starCount} Fork: ${forkCount} Build: ${username}`
                )}
                extra={String(lang)}
                title={String(reponame)}
                onClick={() => events.goActical(url)}
              >
                {description || '暂无描述'}
              </AtCard>
            )
          })}
        </View>
        <Footer current={2} />

        <View className="fix-bottom github-props">
          {/* date & language picker */}
          <Picker
            mode="multiSelector"
            range={githubRange}
            rangeKey="name"
            value={githubRangeValue}
            onChange={e => events.onChangeGithubParams(e.detail.value)}
          >
            <View className="filter" animation>
              <Text className="filter-item">{category.name}</Text>&
              <Text className="filter-item">{period.name}</Text>&
              <Text className="filter-item">{lang.name}</Text>
            </View>
          </Picker>
        </View>

        {/* <Loading /> */}
        <AtLoadMore
          status={events.handleLoadStatus(isComplete, isPaging)}
          onClick={() => events.getActicalList()}
        />
      </View>
    </Container>
  )
}

Index.config = {
  navigationBarTitleText: 'Trending',
}
