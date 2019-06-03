// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require('wx-server-sdk')
const TcbRouter = require('tcb-router')
const pinyin4js = require("pinyin4js")
// 初始化 cloud
cloud.init({
  traceUser: true
})
const db = cloud.database()
const _ = db.command
const plans = db.collection('plans')
const MAX_LIMIT = 100
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 * 
 * event 参数包含小程序端调用传入的 data
 * 
 */
exports.main = (event, context) => {
  const app = new TcbRouter({ event })
  const { OPENID } = cloud.getWXContext()

  // app.use 表示该中间件会适用于所有的路由
  app.use(async (ctx, next) => {
    ctx.data = {};
    await next(); // 执行下一中间件
  })

  app.router('plans/initPY', async (ctx) => {
    // 先取出集合记录总数
    const countResult = await plans.count()
    const total = countResult.total
    // 计算需分几次取, 云函数上限100条
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = plans
        .skip(i * MAX_LIMIT)
        .limit(MAX_LIMIT)
        .get()

      tasks.push(promise)
    }
    const result = (await Promise.all(tasks)).reduce((acc, cur) => ({
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }))


    const res = result.data.map(async (item) => {
      let {
        _id: id,
        planName,
      } = { ...item }

      const planNamePinYing = await pinyin4js.getShortPinyin(planName)
      await plans
        .doc(id)
        .update({
          data: {
            planNamePinYing
          }
        })
    })

    try {
      await Promise.all(res)
      ctx.body = { code: 0, data: '成功' };
    } catch (error) {
      ctx.body = { code: 0, data: error };
    }


  })

  app.router('plans/list', async (ctx) => {
    // 先取出集合记录总数
    const countResult = await plans.count()
    const total = countResult.total
    // 计算需分几次取, 云函数上限100条
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promise = plans
        .where(_.or([
          {
            _openid: OPENID,
            planName: event.data.planName ? db.RegExp({
              regexp: event.data.planName,
              options: 'i'
            }) : undefined
          },
          {
            _openid: OPENID,
            planNamePinYing: event.data.planName ? db.RegExp({
              regexp: event.data.planName,
              options: 'i'
            }) : undefined
          }
        ]))
        .orderBy('isLong', 'desc')
        .orderBy('date', 'asc')
        .orderBy('time', 'asc')
        .skip(i * MAX_LIMIT)
        .limit(MAX_LIMIT)
        .get()

      tasks.push(promise)
    }
    ctx.data = (await Promise.all(tasks)).reduce((acc, cur) => ({
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }))

    ctx.body = { code: 0, data: ctx.data };
  })

  app.router('plans/create', async (ctx) => {
    const planNamePinYing = await pinyin4js.getShortPinyin(event.data.planName)
    await plans.add({
      data: {
        ...event.data,
        planNamePinYing,
        _openid: OPENID
      }
    })


    ctx.body = '创建成功'
  })

  app.router('plans/detail', async (ctx) => {
    ctx.data = await plans
      .doc(event.data.id)
      .get()


    ctx.body = ctx.data
  })

  app.router('plans/update', async (ctx) => {
    const planNamePinYing = await pinyin4js.getShortPinyin(event.data.planName)
    await plans
      .doc(event.data.id)
      .update({
        data: {
          ...event.data,
          planNamePinYing
        }
      })


    ctx.body = '更新成功'
  })

  return app.serve()
}
