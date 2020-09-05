<template>
  <v-layout
    align-center
    justify-space-around
    row
    wrap
    fill-height
    class="verification-page"
  >
    <v-flex pt-2 ml-2 mr-2 shrink>
      <v-card class="verification-template">
        <v-card-title primary-title>
          <v-form ref="otpForm" v-model="otpValid" lazy-validation>
            <v-layout mt-5 ml-1 mr-1 row>
              <template v-for="(codeBlock, index) in input.userInput">
                <v-flex :key="'otp-input-' + index" xs3 pl-2 pr-2>
                  <v-text-field
                    :ref="'otp-' + index"
                    v-model="input.userInput[index]"
                    :rules="rules.otp"
                    :disabled="loading"
                    outlined
                    @keyup="inputOnKeyUp($event, index)"
                  >
                  </v-text-field>
                </v-flex>
              </template>
            </v-layout>
          </v-form>
        </v-card-title>
        <v-card-actions>
          <v-layout align-start justify-center column>
            <v-flex xs12 pb-2 align-self-center>
              <v-btn
                :loading="loading"
                :disabled="loading || !otpValid || resendOtp"
                class="login-button"
                color="orange"
                @click="postVerify()"
              >
                Verifikasi
              </v-btn>
            </v-flex>
            <v-flex xs12 pb-2 pt-3 align-self-center>
              <v-btn
                text
                small
                :loading="resendOtp"
                :disabled="loading || resendOtp"
                class="login-button"
                color="grey"
                @click="askOtp()"
              >
                Kirim Ulang Kode Verifikasi
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Swal from 'sweetalert2'
import SharedFunctionMixin from '@/mixin/sharedFunctionMixin'

const axios = require('axios')

export default {
  middleware: 'registrationCheck',
  mixins: [SharedFunctionMixin],
  data() {
    return {
      loading: false,
      resendOtp: false,
      otpValid: true,
      input: {
        userInput: ['', '', '', ''],
      },
      rules: {
        otp: [
          (v) => !!v || 'isi otp',
          (v) => !this.checkIfEmpty(v) || 'isi otp',
          (v) => this.checkDigits(v) || 'Pastikan mengisi angka 0-9',
        ],
      },
    }
  },
  watch: {
    'input.userInput'(val) {
      if (
        val.length === 4 &&
        val.every(
          (item) => item !== '' && item !== undefined && this.checkDigits(item),
        )
      ) {
        this.postVerify(val)
      }
    },
  },
  beforeDestroy() {
    this.$store.commit('removeTempData')
  },
  methods: {
    askOtp() {
      this.resendOtp = true
      axios
        .post(
          '/api/v1/register/otp/request',
          `phone=${this.$store.state.toVerify.telephone}`,
        )
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            title: 'Terjadi Kesalahan tidak bisa mengirimkan OTP',
            text: error,
            icon: 'error',
            timer: 2000,
            confirmButtonText: 'Tutup',
          })
        })
        .finally(() => {
          this.resendOtp = false
        })
    },
    inputOnKeyUp(event, index) {
      if (!Number.isNaN(Number(event.key)) || event.keyCode === 39) {
        if (index < 3) {
          const indexNextComponent = index + 1
          const nextComponent = this.$refs['otp-'.concat(indexNextComponent)][0]
          const nextInput = nextComponent.$refs.input
          nextInput.focus()
        }
      } else if (event.keyCode === 8 || event.keyCode === 37) {
        if (index > 0) {
          const indexPreviousComponent = index - 1
          const previousComponent = this.$refs[
            'otp-'.concat(indexPreviousComponent)
          ][0]
          const previousInput = previousComponent.$refs.input
          previousInput.focus()
        }
      }
    },
    postVerify(otpCode) {
      if (this.$refs.otpForm.validate()) {
        this.loading = true
        axios
          .post('/api/v1/register/otp/match', {
            user_id: this.$store.state.toVerify.userId,
            otp_code: otpCode.join(''),
          })
          .then((response) => {
            console.log(response)
            if (response.status === 201) {
              this.$store.commit(
                'saveToken',
                response.data.data.user.access_token,
              )
              axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.user.access_token}`
            }
          })
          .catch((error) => {
            console.log(error)
            Swal.fire({
              title: 'Terjadi Kesalahan tidak bisa mengirimkan OTP',
              text: error,
              icon: 'error',
              timer: 2000,
              confirmButtonText: 'Tutup',
            })
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.verification-page {
  font-family: Roboto, sans-serif !important;
  .verification-template {
    min-height: 400px;
  }
  .login-button {
    height: 44px;
    min-width: 200px;
    padding: 0 19.5555555556px;
  }
}

@media only screen and (min-width: 480px) {
  .verification-template {
    min-height: 400px;
    max-width: 400px;
  }
}
</style>
