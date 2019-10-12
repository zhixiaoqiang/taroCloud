export default function login () {
  return new Promise((resolve, reject) => {
    my.getAuthCode({
      scopes: 'auth_user',
      success: res => {
        resolve(res)
      },
      fail: res => {
        reject(res)
      },
    })
  })
}
