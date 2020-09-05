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
  },
}
