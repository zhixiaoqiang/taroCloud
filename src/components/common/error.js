import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'

import './error.less'

function Error (props) {
  return (
    <View className="components-error">
      <View>
        <View className="generic-error" />
        <View className="error-msg">{props.error.msg}</View>
      </View>
    </View>
  )
}

Error.propTypes = {
  error: PropTypes.object,
}

export default Error
