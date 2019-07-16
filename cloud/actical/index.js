// 云函数模板
// 部署：在 cloud-functions/login 文件夹右击选择 “上传并部署”

const cloud = require("wx-server-sdk");
const TcbRouter = require("tcb-router");
const { post } = require("./request");
// 初始化 cloud
cloud.init({
  traceUser: true
});
const db = cloud.database();
// const _ = db.command;
const fednews = db.collection("fed-news");
// const MAX_LIMIT = 100;
/**
 * 这个示例将经自动鉴权过的小程序用户 openid 返回给小程序端
 *
 * event 参数包含小程序端调用传入的 data
 *
 */
exports.main = (event, context) => {
  const app = new TcbRouter({ event });
  // const { OPENID } = cloud.getWXContext();

  // app.use 表示该中间件会适用于所有的路由
  app.use(async (ctx, next) => {
    ctx.data = {};
    await next(); // 执行下一中间件
  });

  app.router("list", async ctx => {
    ctx.data = await post("https://extension-ms.juejin.im/resources/github", {
      category: "trending",
      lang: "javascript",
      limit: 30,
      offset: 0,
      period: "day",
      ...event.data
    });

    ctx.body = ctx.data;
  });

  async function aa(item, site) {
    const isRepeat = await fednews
      .where({
        messageURL: item.messageURL
      })
      .get();

    if (isRepeat.data.length > 0) {
      return Promise.resolve();
    }

    return await fednews.add({
      data: {
        site,
        isRepeat,
        ...item
      }
    });
  }

  app.router("insertFedNews", async ctx => {
    const { site, list = [] } = event.data;

    const tasks = list.map(async item => await aa(item, site));
    try {
      await Promise.all(tasks);
      ctx.body = { success: true, data: "成功" };
    } catch (error) {
      ctx.body = { code: 0, success: false, error: error };
    }
  });

  return app.serve();
};
