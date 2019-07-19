const rp = require("request-promise");

async function post(url, body) {
  try {
    const result = await rp({
      uri: url,
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      json: true
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function get(url, body) {
  try {
    const result = await rp({
      uri: url,
      method: "GET",
      headers: { "Content-Type": "application/json" },
      qs: body,
      json: true
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  get,
  post
};
