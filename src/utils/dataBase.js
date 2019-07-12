// jsonp('http://api.douban.com/v2/movie/top250', 'call').then(res => console.warn(res))
// const jsonp = (url, callBack) => {
//   return new Promise ((resolve, reject) => {
//     const script = document.createElement('script')
//     script.type = 'text/javascript'
//     script.src = `${url}?callback=${callBack}`
//     document.head.appendChild(script)
//     window[callBack] = (res) => {
//       resolve(res)
//     }
//   })
// }

// export default {
//   jsonp
// }
