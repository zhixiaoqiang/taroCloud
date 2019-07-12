import Taro, { Component } from '@tarojs/taro'
import { AtLoadMore } from 'taro-ui'

export default class Loading extends Component {
  render () {
    return (
      <AtLoadMore
        status='loading'
        loadingText='加载中···'
      ></AtLoadMore>
    )
  }
}
