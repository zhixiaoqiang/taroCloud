import Taro from '@tarojs/taro'
import PropTypes from 'prop-types'
import { View, Picker, Label } from '@tarojs/components'

export default function Uploading (props) {
  const { onChange, title, value, type } = props
  return (
    <View
      className="at-input"
      is="npm/taro-ui/dist/weapp/components/input/index"
    >
      <Label className="at-input__title" style="display:inline-block">
        {title}
      </Label>
      <Picker mode={type} onChange={onChange} className="at-input__input">
        {value}
      </Picker>
    </View>
  )
}

Uploading.propTypes = {
  onChange: PropTypes.func,
  title: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
}
