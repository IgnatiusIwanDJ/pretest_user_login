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
          <v-layout mt-5 ml-1 mr-1 row>
            <template v-for="(codeBlock, index) in input.userInput">
              <v-flex :key="'otp-input-' + index" xs3 pl-2 pr-2>
                <v-text-field
                  :ref="'otp-' + index"
                  v-model="input.userInput[index]"
                  :disabled="loading"
                  outlined
                  @keyup="inputOnKeyUp($event, index)"
                >
                </v-text-field>
              </v-flex>
            </template>
          </v-layout>
        </v-card-title>
        <v-card-actions>
          <v-layout align-start justify-center column>
            <v-flex xs12 pb-2 align-self-center>
              <v-btn
                :loading="loading"
                :disabled="loading"
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
                :disabled="loading"
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

const axios = require('axios')

export default {
  middleware: 'registrationCheck',
  data() {
    return {
      loading: false,
      input: {
        userInput: ['', '', '', ''],
      },
    }
  },
  watch: {
    'input.userInput'(val) {
      if (
        val.length === 4 &&
        val.every((item) => item !== '' && item !== undefined)
      ) {
        this.postVerify(val)
      }
    },
  },
  created() {
    this.askOtp()
  },
  beforeDestroy() {
    this.$store.commit('removeTempData')
  },
  methods: {
    askOtp() {
      const axiosConfig = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          crossOrigin: true,
        },
      }
      axios
        .post(
          'http://pretest-qa.dcidev.id/api/v1/register/otp/request',
          `phone=${this.$store.state.toVerify.telephone}`,
          axiosConfig,
        )
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            title: 'Terjadi Kesalahan',
            text: error,
            icon: 'error',
            timer: 2000,
            confirmButtonText: 'Tutup',
          })
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
      console.log(otpCode)
      this.loading = true
      console.log('ngirim verifikasi')
    },
  },
}
</script>

<style lang="scss" scoped>
.verification-page {
  font-weight: 500;
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
