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

const p1 = new Promise((resolve, reject) => {
  console.log('1.promise1'); // 1
  resolve();
})
  .then(() => {
    console.log('3.then11'); // 3
    new Promise((resolve, reject) => {
      console.log('4.promise2'); // 4
      resolve();
    })
      .then(() => {
        console.log('6.then21');
      })
      .then(() => {
        console.log('7.then23');
      });
  })
  .then(() => {
    console.log('8.then12');
  });

const p2 = new Promise((resolve, reject) => {
  console.log('2.promise3'); // 2
  resolve();
}).then(() => {
  console.log('5.then31');
});
