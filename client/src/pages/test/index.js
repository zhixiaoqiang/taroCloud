import Taro, { Component } from "@tarojs/taro";
import { connect } from "@tarojs/redux";

import { View, Picker, Label } from "@tarojs/components";
import { AtButton, AtForm, AtInput, AtSwitch, AtTextarea } from "taro-ui";
import Loading from "@/components/common/loading";
import Time from "@/utils/time";
import "./index.less";

@connect(
  ({ home }) => ({
    home
  }),
  dispatch => ({
    ...dispatch.home
  })
)
class Index extends Component {
  config = {
    navigationBarTitleText: "创建计划"
  };

  constructor(props) {
    super(props);
    let curDate = new Date();
    this.state = {
      pageLoading: false,
      planProps: {
        time: Time.format(curDate, "HH:mm"),
        date: Time.format(curDate, "YYYY.MM.DD")
      }
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    // console.log(this.props, nextProps)
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    const { pageLoading, planProps } = this.state;
    if (pageLoading) {
      return <Loading />;
    }
    return <View className='create'>test</View>;
  }
}

export default Index;
