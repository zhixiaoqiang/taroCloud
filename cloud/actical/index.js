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
const fednewsDay = db.collection("fed-news-day");
const fednewsWeek = db.collection("fed-news-week");
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

  app.router("trendingList", async ctx => {
    const res = await post("https://extension-ms.juejin.im/resources/github", {
      category: "trending",
      lang: "javascript",
      limit: 30,
      offset: 0,
      period: "day",
      ...event.data
    });

    ctx.body = res;
  });

  app.router("list", async ctx => {
    try {
      const { pageSize = 10, offset = 0 } = event.data;
      const res = await fednews
        .where({
          site: "github"
        })
        .limit(pageSize)
        .skip(offset)
        .get();

      ctx.body = {
        success: true,
        data: res.data
      };
    } catch (error) {
      ctx.body = { code: 0, success: false, error: error };
    }
  });

  async function insertFedNew(item, site) {
    const { data: result } = await fednews
      .where({
        messageURL: item.messageURL
      })
      .field({
        starCount: true
      })
      .get();
    const fedNew = result[0];

    if (!fedNew) {
      return await fednews.add({
        data: {
          site,
          ...item
        }
      });
    } else {
      if (fedNew.starCount !== item.startCount) {
        return await fednews
          .where({
            messageURL: item.messageURL
          })
          .update({
            data: {
              site,
              ...item
            }
          });
      }
      return Promise.resolve();
    }
  }

  app.router("insertFedNews", async ctx => {
    const { site, list = [] } = event.data;

    const tasks = list.map(async item => await insertFedNew(item, site));
    try {
      await Promise.all(tasks);
      ctx.body = { success: true, data: "成功" };
    } catch (error) {
      ctx.body = { code: 0, success: false, error: error };
    }
  });

  app.router("insertFedNewsDay", async ctx => {
    const { date, text } = event.data;

    try {
      await fednewsDay.add({
        data: {
          date,
          text
        }
      });
      ctx.body = { success: true, data: "成功" };
    } catch (error) {
      ctx.body = { code: 0, success: false, error: error };
    }
  });

  app.router("insertFedNewsWeek", async ctx => {
    const { date, text, type } = event.data;

    try {
      await fednewsWeek.add({
        data: {
          date,
          text,
          type
        }
      });
      ctx.body = { success: true, data: "成功" };
    } catch (error) {
      ctx.body = { code: 0, success: false, error: error };
    }
  });

  return app.serve();
};
