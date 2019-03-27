import Taro, { Component } from '@tarojs/taro'
import { View, AtInput, Picker, Label } from '@tarojs/components'

export default class Uploading extends Component {
  render () {
    const { onChange, title, value, type } = this.props
    return (
      <View className='at-input' is='npm/taro-ui/dist/weapp/components/input/index'>
        <Label
          className='at-input__title'
          style='display:inline-block'
        >
          {title}
        </Label>
        <Picker
          mode={type}
          onChange={onChange}
          className='at-input__input'
        >
          {value}
        </Picker>
      </View>
    )
  }
}

{/* <FormItem
  value={0}
  title='选择时间'
  type='time'
  onChange={this.handleChange.bind(this)}
/> */}
