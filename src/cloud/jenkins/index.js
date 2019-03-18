// 云函数入口文件
const cloud = require('wx-server-sdk')
const rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let result = await rp({
    method: 'POST',
    uri: 'http://jenkins.dian.so/jenkins/job/warehouse-dev/build',
    headers: {
      'Jenkins-Crumb': 'd2245c0d9140fd9dbac61af318d4e795',
      'authorization': 'Basic bmF6aTpAWGxsMDQyNy4='
    },
    // auth: {
    //   user: 'nazi',
    //   pass: '@Xll0427.'
    // }
  }).then(d => {
    return d
  }).catch(err => {
    return err
  })

  return result
}