import Taro, { Component } from '@tarojs/taro'
import PropTypes from 'prop-types'
import { connect } from '@tarojs/redux'
import { languages, stringify } from '@/utils'
import { View, Picker, Text } from '@tarojs/components'
import Loading from '@/components/common/loading'
import Footer from '@/components/common/footer'
import { AtCard, AtLoadMore } from 'taro-ui'

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
  constructor (props) {
    super(props)
    this.state = {
      lang: languages[6],
      category: CATEGORY[0],
      period: PERIOD[0],
      githubRange: [CATEGORY, PERIOD, languages],
      githubRangeValue: [0, 0, 6],
    }
  }

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
    const trendingProps = Taro.getStorageSync('trendingProps')
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
        },
        () => this.getActicalList({ offset: 0 })
      )
    } else {
      this.getActicalList({ offset: 0 })
    }
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

  getActicalList (query = {}) {
    const { category, period, lang, articalList = [] } = this.state
    let data = {
      category: category.value, // 热门 trending 新生 upcome
      lang: lang.value,
      limit: PAGE_SIZE,
      offset: articalList.length || 0,
      period: period.value,
      ...query,
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
      Taro.hideLoading()
    }

    const fail = () => {
      this.setState({
        isPaging: false,
      })
      Taro.hideLoading()
    }

    this.handleActical('trendingList', data, success, fail)
  }

  goActical (data = {}) {
    const query = `?${stringify(data)}`
    Taro.navigateTo({
      url: `/pages/create/index${query}`,
    })
  }

  handleActical (url, data, success, fail) {
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
  }

  onChangeGithubParams = value => {
    const { githubRange } = this.state
    const [category, period, lang] = githubRange
    const [categoryIndex, periodIndex, langIndex] = value

    Taro.setStorage({
      key: 'trendingProps',
      data: {
        categoryIndex,
        periodIndex,
        langIndex,
      },
    })

    Taro.showLoading({
      title: '加载中···',
      mask: true,
    })

    if (Taro.pageScrollTo) {
      Taro.pageScrollTo({
        scrollTop: 0,
      })
    } else {
      Taro.showModal({
        title: '提示',
        content:
          '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
      })
    }

    this.setState(
      {
        category: category[categoryIndex],
        period: period[periodIndex],
        lang: lang[langIndex],
        githubRangeValue: [categoryIndex, periodIndex, langIndex],
        isPaging: true,
      },
      () => this.getActicalList({ offset: 0 })
    )
  };

  handleLoadStatus (isComplete, isPaging) {
    return isComplete ? 'noMore' : isPaging ? 'loading' : 'more'
  }

  render () {
    const {
      articalList,
      category,
      lang,
      period,
      githubRange,
      githubRangeValue,
      isComplete,
      isPaging,
    } = this.state

    if (!articalList) {
      return <Loading />
    }

    return (
      <View className="trending">
        <View className="github-list">
          {articalList.map((item, i) => {
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
                onClick={() => {
                  Taro.setClipboardData({
                    data: url,
                  }).then(() => {
                    Taro.showToast({
                      title: '已复制链接到剪切板',
                    })
                  })
                }}
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
            onChange={e => this.onChangeGithubParams(e.detail.value)}
          >
            <View className="filter" animation>
              <Text className="filter-item">{category.name}</Text>&
              <Text className="filter-item">{period.name}</Text>&
              <Text className="filter-item">{lang.name}</Text>
            </View>
          </Picker>
        </View>

        <AtLoadMore
          status={this.handleLoadStatus(isComplete, isPaging)}
          onClick={() => this.getActicalList()}
        />
      </View>
    )
  }
}

Index.config = {
  navigationBarTitleText: 'Trending',
}

Index.propTypes = {
  dispatchSetGlobalInfo: PropTypes.func,
}

export default Index
