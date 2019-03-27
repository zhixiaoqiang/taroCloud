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
      Taro.showToast({
        title,
      })
    })
  }

  setPlanProps (data = {}) {
    const planProps = { ...this.state.planProps, ...data }
    this.setState({
      planProps
    })
  }

  onTimeChange (data) {
    this.setPlanProps(data)
  }

  varify (planProps) {
    if (!planProps.taskName) {
      Taro.showToast({
        title: '请填写任务名称'
      })
      return false
    }
  }

  submit () {
    const planProps = { ...this.state.planProps }
    if (!planProps.taskName) return Taro.showToast({
      title: '请填写任务名称'
    })
    this.props.dispatchCreatePlan(planProps)
  }

  render () {
    const { planProps } = this.state
    return (
      <View className='create'>
        <AtForm >
        <AtInput
          title='计划名称'
          clear
          type='text'
          placeholder='请输入计划名称'
          value={planProps.taskName}
          onChange={this.setPlanProps.bind(this)}
        />
        <View>
          <View className='at-input'>
            <Label className='at-input__title' style='display:inline-block'>选择时间</Label>
            <Picker mode='time' onChange={this.onTimeChange.bind(this)} className='at-input__input'>
              {planProps.time}
            </Picker>
          </View>
        </View>
        <AtSwitch
          title='是否长期计划'
          checked={planProps.isLong}
          onChange={this.setPlanProps.bind(this)}
        />
        <View>
          <View className='at-input'>
            <Label className='at-input__title' style='display:inline-block'>选择日期</Label>
            <Picker mode='date' onChange={this.onTimeChange.bind(this)} className='at-input__input'>
              {planProps.time}
            </Picker>
          </View>
        </View>
        {/* <View>
          <Text>选择日期</Text>
            <AtCalendar
              minDate={Date.now()}
              isMultiSelect
              isVertical
            />
        </View> */}
        <AtTextarea
          value={planProps.comment}
          onChange={this.setPlanProps.bind(this)}
          maxLength={200}
          placeholder='计划备注...'
        />
      </AtForm>
        <AtButton type='primary' onClick={() => this.submit()}>提交</AtButton>
      </View>
    )
  }
}

export default Index
