import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'

import Loading from './loading'
import Error from './error'

function Container (props) {
  return (
    <View className="root-container">
      {!props.error && props.loading ? (
        <Loading />
      ) : props.error ? (
        <Error error={props.error} />
      ) : (
        <View className="root-page">{props.children}</View>
      )}
    </View>
  )
}

Container.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.object,
  children: PropTypes.node,
}

Container.defaultProps = {
  loading: false,
  force: false,
  cache: false,
}

export default Container
