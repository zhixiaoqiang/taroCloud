export default {
  state: 0,
  reducers: {
    setTrendingList (state, payload) {
      return [...state.trending, ...payload]
    },
  },
  effects: {
    async dispatchGetTrendingList (payload) {
      this.setTrendingList(payload)
    },
  },
}
