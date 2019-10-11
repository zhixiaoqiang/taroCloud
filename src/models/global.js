export default {
  state: {},
  reducers: {
    dispatchSetGlobalInfo (state, payload) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // async dispatchIncrementAsync(payload) {
    //   // await new Promise(resolve => setTimeout(resolve, 1000))
    //   this.increment(payload)
    // }
  },
}
