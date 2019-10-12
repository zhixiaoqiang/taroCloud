/**
 * HTTP Response Header 事件回调函数的参数
 * @typedef {Object} HeadersReceivedParam
 * @property {Object} header 开发者服务器返回的 HTTP Response Header
 */

/**
 * HTTP Response Header 事件的回调函数
 * @callback HeadersReceivedCallback
 * @param {HeadersReceivedParam} res 参数
 */

/**
 * 进度变化回调函数的参数
 * @typedef {Object} ProgressUpdateParam
 * @property {number} progress 进度百分比
 * @property {number} [totalBytesWritten] 已经下载的数据长度，单位 Bytes
 * @property {number} [totalBytesSent] 已经上传的数据长度，单位 Bytes
 * @property {number} [totalBytesExpectedToWrite] 预期需要下载的数据总长度，单位 Bytes
 * @property {number} [totalBytesExpectedToSend] 预期需要上传的数据总长度，单位 Bytes
 */

/**
 * 进度变化事件的回调函数
 * @callback ProgressUpdateCallback
 * @param {ProgressUpdateParam} res 参数
 */

const NETWORK_TIMEOUT = 60000

const XHR_STATS = {
  UNSENT: 0, // Client has been created. open() not called yet.
  OPENED: 1, // open() has been called.
  HEADERS_RECEIVED: 2, // send() has been called, and headers and status are available.
  LOADING: 3, // Downloading; responseText holds partial data.
  DONE: 4, // The operation is complete.
}

/**
 * 设置xhr的header
 * @param {XMLHttpRequest} xhr
 * @param {Object} header
 */
const setHeader = (xhr, header) => {
  let headerKey
  for (headerKey in header) {
    xhr.setRequestHeader(headerKey, header[headerKey])
  }
}

const createCallbackManager = () => {
  const callbacks = []

  /**
   * 添加回调
   * @param {{ callback: function, ctx: any } | function} opt
   */
  const add = opt => {
    callbacks.push(opt)
  }

  /**
   * 移除回调
   * @param {{ callback: function, ctx: any } | function} opt
   */
  const remove = opt => {
    let pos = -1
    callbacks.forEach((callback, k) => {
      if (callback === opt) {
        pos = k
      }
    })
    if (pos > -1) {
      callbacks.splice(pos, 1)
    }
  }

  /**
   * 获取回调函数数量
   * @return {number}
   */
  const count = () => callbacks.length

  /**
   * 触发回调
   * @param  {...any} args 回调的调用参数
   */
  const trigger = (...args) => {
    callbacks.forEach(opt => {
      if (typeof opt === 'function') {
        opt(...args)
      } else {
        const { callback, ctx } = opt
        callback.call(ctx, ...args)
      }
    })
  }

  return {
    add,
    remove,
    count,
    trigger,
  }
}

const createUploadTask = ({
  url,
  filePath,
  formData,
  name,
  header,
  success,
  error,
}) => {
  let timeout
  let formKey
  const apiName = 'uploadFile'
  const xhr = new XMLHttpRequest()
  const form = new FormData()
  const callbackManager = {
    headersReceived: createCallbackManager(),
    progressUpdate: createCallbackManager(),
  }

  xhr.open('POST', url)
  setHeader(xhr, header)

  for (formKey in formData) {
    form.append(formKey, formData[formKey])
  }

  xhr.upload.onprogress = e => {
    const { loaded, total } = e
    callbackManager.progressUpdate.trigger({
      progress: Math.round((loaded / total) * 100),
      totalBytesSent: loaded,
      totalBytesExpectedToSent: total,
    })
  }

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== XHR_STATS.HEADERS_RECEIVED) return
    callbackManager.headersReceived.trigger({
      header: xhr.getAllResponseHeaders(),
    })
  }

  xhr.onload = () => {
    const status = xhr.status
    success({
      errMsg: `${apiName}:ok`,
      statusCode: status,
      data: xhr.responseText || xhr.response,
    })
  }

  xhr.onabort = () => {
    clearTimeout(timeout)
    error({
      errMsg: `${apiName}:fail abort`,
    })
  }

  xhr.onerror = e => {
    error({
      errMsg: `${apiName}:fail ${e.message}`,
    })
  }

  const send = () => {
    xhr.send(form)
    timeout = setTimeout(() => {
      xhr.onabort = null
      xhr.onload = null
      xhr.upload.onprogress = null
      xhr.onreadystatechange = null
      xhr.onerror = null
      abort()
      error({
        errMsg: `${apiName}:fail timeout`,
      })
    }, NETWORK_TIMEOUT)
  }
  form.append(name, filePath, filePath.name || `file-${Date.now()}`)
  send()

  /**
   * 中断任务
   */
  const abort = () => {
    xhr.abort()
  }

  /**
   * 监听 HTTP Response Header 事件。会比请求完成事件更早
   * @param {HeadersReceivedCallback} callback HTTP Response Header 事件的回调函数
   */
  const onHeadersReceived = callbackManager.headersReceived.add
  /**
   * 取消监听 HTTP Response Header 事件
   * @param {HeadersReceivedCallback} callback HTTP Response Header 事件的回调函数
   */
  const offHeadersReceived = callbackManager.headersReceived.remove

  /**
   * 监听进度变化事件
   * @param {ProgressUpdateCallback} callback HTTP Response Header 事件的回调函数
   */
  const onProgressUpdate = callbackManager.progressUpdate.add
  /**
   * 取消监听进度变化事件
   * @param {ProgressUpdateCallback} callback HTTP Response Header 事件的回调函数
   */
  const offProgressUpdate = callbackManager.progressUpdate.remove

  return {
    abort,
    onHeadersReceived,
    offHeadersReceived,
    onProgressUpdate,
    offProgressUpdate,
  }
}

/**
 * 将本地资源上传到服务器。客户端发起一个 HTTPS POST 请求，其中 content-type 为 multipart/form-data。使用前请注意阅读相关说明。
 * @param {Object} object 参数
 * @param {string} object.url 开发者服务器地址
 * @param {string} object.filePath 要上传文件资源的路径
 * @param {string} object.name 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
 * @param {Object} [object.header] HTTP 请求 Header，Header 中不能设置 Referer
 * @param {Object} [object.formData] HTTP 请求中其他额外的 form data
 * @param {function} [object.success] 接口调用成功的回调函数
 * @param {function} [object.fail] 接口调用失败的回调函数
 * @param {function} [object.complete] 接口调用结束的回调函数（调用成功、失败都会执行）
 * @returns {UploadTask}
 */
const uploadFile = ({
  url,
  filePath,
  name,
  header,
  formData,
  success,
  fail,
  complete,
}) => {
  let task
  const promise = new Promise((resolve, reject) => {
    task = createUploadTask({
      url,
      filePath,
      name,
      header,
      formData,
      success: res => {
        success && success(res)
        complete && complete()
        resolve(res)
      },
      error: res => {
        fail && fail(res)
        complete && complete()
        reject(res)
      },
    })
  })

  promise.headersReceive = task.onHeadersReceived
  promise.progress = task.onProgressUpdate
  promise.abort = task.abort

  return promise
}

export default uploadFile
