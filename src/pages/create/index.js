import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Text, Picker, Label } from '@tarojs/components'
import { AtButton, AtForm, AtInput, AtSwitch, AtTextarea, AtCalendar } from 'taro-ui'
// import FormItem from '@/components/common/formItem'
import './index.less'


@connect(({ home }) => ({
  home
}), (dispatch) => ({
  ...dispatch.home
}))
class Index extends Component {
  config = {
    navigationBarTitleText: '创建计划'
  }

  constructor (props) {
    super(props)
    let curDate = new Date()
    this.state = {
      planProps: {
        time: `${curDate.getHours()}:${curDate.getMinutes()}`
      }
    }
  }

  componentWillMount () {
    console.warn(this.$router.params)
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChange (value) {
    this.setState({
      value: value
    })
  }

  add () {
    const { planProps } = this.state
    wx.cloud.callFunction({
      name: 'add',
      // 传给云函数的参数
      data: {
        a: 12,
        b: 19,
      },
    }).then(res => {
      console.warn(res.result.result)
      let title = `调用add成功，值为${String(res.result.result)}`
      wx.showToast({
        title,
      })
    })
  }

  render () {
    const { planProps } = this.state
    return (
      <View className='create'>
        <AtForm >
        <AtInput
          title='任务名称'
          clear
          type='text'
          placeholder='请输入任务名称'
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
        />
        <View>
          <View className='at-input'>
            <Label className='at-input__title' style='display:inline-block'>选择时间</Label>
            <Picker mode='time' onChange={this.onTimeChange} className='at-input__input'>
              {planProps.time}
            </Picker>
          </View>
        </View>
        <AtSwitch
          title='是否长期任务'
          checked={this.state.value}
          onChange={this.handleChange}
        />
        <View>
          <Text>选择日期</Text>
            <AtCalendar
              minDate={Date.now()}
              isMultiSelect
              isVertical
            />
        </View>
        <AtTextarea
          value={this.state.value}
          onChange={this.handleChange.bind(this)}
          maxLength={200}
          placeholder='备注...'
        />
      </AtForm>
        <AtButton type='primary' onClick={() => this.submit()}>提交</AtButton>
        {/* <Footer current={1} ></Footer> */}
      </View>
    )
  }
}

export default Index
