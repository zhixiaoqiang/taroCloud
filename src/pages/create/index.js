import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux'

import { View, Text, Picker, Label } from '@tarojs/components'
import { AtButton, AtForm, AtInput, AtSwitch, AtTextarea } from 'taro-ui'
import Loading from '@/components/common/loading'
import Time from '@/utils/time'
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
      pageLoading: false,
      planProps: {
        time: Time.format(curDate, 'HH:mm'),
        date: Time.format(curDate, 'YYYY.MM.DD')
      }
    }
  }

  componentWillMount () {
  }

  componentDidMount () {
    
    const { id } = this.$router.params
    if (id) {
      this.setState({
        pageLoading: true
      }, () => this.getPlanDetail(id))
      
    }
  }

  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  getPlanDetail (id) {
    const success = (res) => {
        this.setState({
        planProps: res.result.data,
        pageLoading: false
      })
    }

    this.hendlePlanItem('plans/detail', { id }, success)
  }

  setPlanProps (data = {}) {
    const planProps = { ...this.state.planProps, ...data }
    this.setState({
      planProps
    })
  }

  varify (planProps) {
    if (!planProps.planName) {
      Taro.showToast({
        title: '请填写任务名称'
      })
      return false
    }
    return true
  }

  submit () {
    let {
      _id,
      time,
      date,
      isLong,
      planName,
      comment
    } = { ...this.state.planProps }
    let params = {
      time,
      date,
      isLong,
      planName,
      comment
    }
    
    if (!this.varify(params)) return

    const success = () => {
      Taro.showToast({
        title: '提交成功'
      })
      Taro.navigateBack()
    }
    if (_id) {
      this.hendlePlanItem('plans/update', { ...params, id: _id }, success)
    } else {
      params = {
        ...params,
        createTime: Time.format(new Date(), 'YYYY-MM-DD HH:mm:ss'),
        date: isLong ? null : date
      }
      this.hendlePlanItem('plans/create', params, success)
    }
  }

  hendlePlanItem (url, data, success) {
    console.warn(data)
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: "plans",
      // 传递给云函数的参数
      data: {
          $url: url,
          data
      }
    }).then(res => {
      success && success(res)
    }).catch(err => console.warn(err))
  }

  render () {
    const { pageLoading, planProps } = this.state
    if (pageLoading) {
      return <Loading />
    }
    return (
      <View className='create'>
        <AtForm >
        <AtInput
          title='计划名称'
          clear
          type='text'
          placeholder='请输入计划名称'
          value={planProps.planName}
          onChange={(value) => this.setPlanProps({ planName: value })}
        />
        <View>
          <View className='at-input'>
            <Label className='at-input__title' style='display:inline-block'>选择时间</Label>
            <Picker
              mode='time'
              onChange={(e) => this.setPlanProps({ time: e.target.value })}
              className='at-input__input'
              value={planProps.time}
            >
              {planProps.time}
            </Picker>
          </View>
        </View>
        <AtSwitch
          title='是否长期计划'
          checked={planProps.isLong}
          onChange={(value) => this.setPlanProps({ isLong: value })}
        />
        {!planProps.isLong && <View>
          <View className='at-input'>
            <Label className='at-input__title' style='display:inline-block'>选择日期</Label>
            <Picker
              mode='date'
              onChange={(e) => this.setPlanProps({ date: e.target.value })}
              className='at-input__input'
              value={planProps.date}
            >
              {planProps.date}
            </Picker>
          </View>
        </View>}
        <AtTextarea
          value={planProps.comment}
          onChange={(e) => this.setPlanProps({ comment: e.target.value })}
          maxLength={200}
          placeholder='计划备注...'
        />
      </AtForm>
        <AtButton className='submit-btn' type='primary' onClick={() => this.submit()}>提交</AtButton>
      </View>
    )
  }
}

export default Index
