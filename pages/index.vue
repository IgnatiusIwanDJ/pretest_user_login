<template>
  <v-layout
    align-center
    justify-space-around
    row
    wrap
    fill-height
    class="login-page"
  >
    <v-flex pt-2 ml-2 mr-2 shrink>
      <v-card class="card-login-template">
        <v-card-title primary-title>
          <v-form ref="registerForm" v-model="registerValid" lazy-validation>
            <v-layout mt-2 ml-1 mr-1 row>
              <v-flex xs12 pl-2 pr-2>
                <v-text-field
                  v-model="register.telephone"
                  :rules="rules.telephone"
                  label="no hp"
                  outlined
                  prepend-inner-icon="mdi-phone"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 pl-2 pr-2>
                <v-text-field
                  v-model="register.password"
                  :rules="rules.password"
                  label="password"
                  outlined
                  prepend-inner-icon="mdi-lock"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 pl-2 pr-2>
                <v-text-field
                  v-model="register.country"
                  :rules="rules.country"
                  label="country"
                  outlined
                  @keyup.enter="postRegister()"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-title>
        <v-card-actions>
          <v-layout align-start justify-center column>
            <v-flex xs12 pb-2 align-self-center>
              <v-btn
                :disabled="!registerValid"
                class="login-button"
                color="orange"
                @click="postRegister()"
              >
                Register
              </v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex pt-2 ml-2 mr-2 shrink>
      <v-card ml-2 mr-2 class="card-login-template">
        <v-card-title primary-title>
          <v-form ref="loginForm" v-model="loginValid" lazy-validation>
            <v-layout mt-2 ml-1 mr-1 row>
              <v-flex xs12 pl-2 pr-2>
                <v-text-field
                  v-model="signIn.telephone"
                  :rules="rules.telephone"
                  label="no hp"
                  outlined
                  prepend-inner-icon="mdi-phone"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 pl-2 pr-2>
                <v-text-field
                  v-model="signIn.password"
                  :rules="rules.password"
                  label="password"
                  outlined
                  prepend-inner-icon="mdi-lock"
                  @keyup.enter="
                    postLogin({
                      telephone: signIn.telephone,
                      password: signIn.password,
                      latLong: register.latLong,
                      deviceToken: register.deviceToken,
                      deviceType: 2,
                    })
                  "
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-title>
        <v-card-actions>
          <v-layout align-start justify-center column>
            <v-flex xs12 pb-2 align-self-center>
              <v-btn
                :disabled="!loginValid"
                class="login-button"
                color="orange"
                @click="
                  postLogin({
                    telephone: signIn.telephone,
                    password: signIn.password,
                    latLong: register.latLong,
                    deviceToken: register.deviceToken,
                    deviceType: 2,
                  })
                "
              >
                Login
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
  mixins: [SharedFunctionMixin],
  data() {
    return {
      registerValid: true,
      loginValid: true,
      rules: {
        telephone: [
          (v) => !!v || 'isi nomor telephone',
          (v) => !this.checkIfEmpty(v) || 'isi nomor telephone',
          (v) =>
            this.checkIfPhoneNumber(v) ||
            'nomor telephone harus angka dan berdigit 10',
        ],
        password: [
          (v) => !!v || 'isi password',
          (v) => !this.checkIfEmpty(v) || 'isi password',
        ],
        country: [
          (v) => !!v || 'isi negara asal',
          (v) => !this.checkIfEmpty(v) || 'isi negara asal',
        ],
      },
      register: {
        telephone: '',
        password: '',
        country: '',
        latLong: '',
        deviceToken: localStorage.getItem('device_token'),
        deviceType: 2,
      },
      signIn: {
        telephone: '',
        password: '',
      },
    }
  },
  created() {
    if (localStorage.getItem('device_token') == null) {
      this.register.deviceToken = btoa(
        Math.random() + navigator.userAgent + Date(),
      )
      this.$store.commit('saveDeviceToken', this.register.deviceToken)
    }
    this.getLocation()
  },
  methods: {
    getLocation() {
      if (window.navigator && window.navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (item) => {
            this.register.latLong = `${item.coords.latitude},${item.coords.longitude}`
            this.$store.commit('saveCurrentLocation', this.register.latLong)
          },
          () => {},
        )
      }
    },
    postLogin(userData) {
      if (this.$refs.loginForm.validate()) {
        axios
          .post(
            '/api/v1/oauth/sign_in',
            `phone=${userData.telephone}&password=${userData.password}&latlong=${userData.latlong}&device_token=${userData.deviceToken}&device_type=${userData.deviceType}`,
          )
          .then((response) => {
            console.log(response)
            this.$store.commit(
              'saveToken',
              response.data.data.user.access_token,
            )
            axios.defaults.headers.common.Authorization = `Bearer ${response.data.data.user.access_token}`
            this.$router.push(`/user/${userData.telephone}`)
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
      }
    },
    postRegister() {
      if (this.$refs.registerForm.validate()) {
        this.getLocation()
        axios
          .post(
            '/api/v1/register',
            `phone=${this.register.telephone}&password=${this.register.password}&country=${this.register.country}&latlong=${this.register.latLong}&device_token=${this.register.deviceToken}&device_type=${this.register.deviceType}`,
          )
          .then((response) => {
            console.log(response)
            if (response.status === 201) {
              const tempData = {
                telephone: this.register.telephone,
                sugarId: response.data.data.user.sugar_id,
                userId: response.data.data.user.id,
                userStatus: response.data.data.user.user_status,
              }
              this.$store.commit('keepTempData', tempData)
              this.$router.push('/verification')
            }
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
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.login-page {
  font-family: Roboto, sans-serif !important;
  .card-login-template {
    min-height: 400px;
  }
  .login-button {
    height: 44px;
    min-width: 200px;
    padding: 0 19.5555555556px;
  }
}

@media only screen and (min-width: 1280px) {
  .card-login-template {
    min-height: 400px;
    max-width: 400px;
  }
}
</style>
