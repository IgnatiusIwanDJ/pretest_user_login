export const state = () => ({
  toVerify: {
    otp: '',
    telephone: '',
    userId: '',
    userStatus: '',
  },
})

export const mutations = {
  keepTempData(state, payload) {
    state.toVerify = payload
  },
  removeTempData(state) {
    state.toVerify = {
      otp: '',
      telephone: '',
      userId: '',
      userStatus: '',
    }
  },
}
