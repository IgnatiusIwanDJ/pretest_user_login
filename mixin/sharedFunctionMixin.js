const axios = require('axios')

export default {
  methods: {
    checkIfPhoneNumber(myString) {
      const phoneRe = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
      const digits = myString.replace(/\D/g, '')
      return phoneRe.test(digits)
    },
    checkDigits(myString) {
      const numbers = /^-?\d+\.?\d*$/
      return numbers.test(myString)
    },
    checkIfEmpty(myString) {
      return /^\s*$/.test(myString)
    },
    postLogin(userData) {
      axios
        .post(
          'http://pretest-qa.dcidev.id/api/v1/oauth/sign_in',
          `phone=${userData.telephone}&password=${userData.password}&country=${userData.country}&latlong=${userData.latlong}&device_token=${userData.deviceToken}&device_type=${userData.deviceType}`,
        )
        .then((response) => {
          if (response.status === 201) {
            const tempData = {
              telephone: userData.telephone,
              userId: '111222',
              userStatus: 'pending',
            }
            this.$store.commit('keepTempData', tempData)
            this.$router.push('/verification')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
