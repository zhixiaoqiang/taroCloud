import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import { AtLoadMore } from 'taro-ui'

export default function Loading (props) {
  const { text } = props
  return (
    <AtLoadMore
      status="loading"
      loadingText={text}
    />
  )
}

Loading.defaultProps = {
  text: '加载中···',
}

Loading.propTypes = {
  text: PropTypes.string,
}
