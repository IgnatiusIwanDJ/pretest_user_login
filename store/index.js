export const state = () => ({
  toVerify: null,
})

export const mutations = {
  keepTempData(state, payload) {
    state.toVerify = payload
  },
  removeTempData(state) {
    state.toVerify = null
  },
}
