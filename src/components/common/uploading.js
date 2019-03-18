import Taro, { Component } from '@tarojs/taro'
import { AtLoadMore } from 'taro-ui'

export default class Uploading extends Component {
  render () {
    return (
      <AtLoadMore
        status='loading'
        loadingText='加载中···'
      ></AtLoadMore>
    )
  }
}
