export const state = () => ({
  toVerify: null,
  authToken: localStorage.getItem('token'),
  deviceToken: localStorage.getItem('device_token'),
  currentLocation: null,
  userLoggedIn: null,
})

export const mutations = {
  keepTempData(state, payload) {
    state.toVerify = payload
  },
  removeTempData(state) {
    state.toVerify = null
  },
  removeCurrentLocation(state) {
    state.currentLocation = null
  },
  saveCurrentLocation(state, payload) {
    state.currentLocation = payload
  },
  setLoggedIn(state, payload) {
    state.userLoggedIn = payload
  },
  removeLoggedIn(state) {
    state.userLoggedIn = null
  },
  saveDeviceToken(state, payload) {
    localStorage.setItem('device_token', payload)
    state.deviceToken = payload
  },
  saveToken(state, payload) {
    localStorage.setItem('token', payload)
    state.authToken = payload
  },
  removeToken(state, payload) {
    localStorage.removeItem('token')
    state.authToken = null
  },
}
