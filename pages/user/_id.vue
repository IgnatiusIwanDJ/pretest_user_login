<template>
  <v-layout ml-3 mr-3 wrap>
    <v-flex xs12 class="cover-image">
      <v-layout pa-0 ma-0 align-end justify-center row fill-height>
        <v-flex grow />
        <v-flex xs3 class="profile-image">
          <v-layout align-center justify-center column fill-height>
            <v-flex v-if="!loading.profilePhoto" xs12>
              <v-icon x-large class="no-profile-image">mdi-account</v-icon>
            </v-flex>
            <v-flex v-if="!loading.profilePhoto" xs12>
              <label>No pict yet</label>
            </v-flex>
            <v-flex v-if="loading.profilePhoto" xs12 align-self-center>
              <v-layout align-end justify-center row fill-height>
                <v-progress-circular :size="70" indeterminate color="primary">
                </v-progress-circular>
              </v-layout>
            </v-flex>
            <v-flex xs12>
              <v-layout align-end justify-center row fill-height>
                <v-btn
                  color="blue"
                  small
                  bottom
                  right
                  fab
                  @click="$refs.profileUpload.click()"
                >
                  <v-icon medium color="white">mdi-account-plus</v-icon>
                </v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex grow />
      </v-layout>
    </v-flex>
    <v-flex xs12 class="information-layout">
      <v-layout pt-4 align-center justify-start column>
        <v-flex pt-3 pb-4>
          <v-flex xs12 pt-3 pb-5>
            <v-layout align-center justify-center row wrap>
              <v-flex xs9>
                <v-btn
                  small
                  block
                  color="success"
                  :disabled="loading.coverPhoto"
                  :loading="loading.coverPhoto"
                  @click="$refs.coverUpload.click()"
                >
                  Upload Cover Photo
                </v-btn>
                <input
                  ref="coverUpload"
                  type="file"
                  style="display: none"
                  accept="image/*"
                  @change="coverFilePicked"
                />
                <input
                  ref="profileUpload"
                  type="file"
                  style="display: none"
                  accept="image/*"
                  @change="profileFilePicked"
                />
              </v-flex>
              <v-flex xs9 mt-3>
                <v-btn small block color="primary" @click="dialog = true">
                  Buka dialog chat
                </v-btn>
              </v-flex>
              <v-flex xs4 mt-3>
                <v-btn small block color="error" @click="logUserOut()">
                  Logout
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-layout row class="ma-0 pa-0 info-tag">
            <v-flex grow>
              <h2>Profile</h2>
            </v-flex>
            <v-flex shrink>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    :color="profileEditState ? 'blue' : 'grey'"
                    v-bind="attrs"
                    @click="toggleEditProfile()"
                    v-on="on"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit Profile</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <div class="input-grid profile">
            <label class="label-grid">Nama</label>
            <v-flex class="line-input">
              <v-text-field
                v-model="input.profile.name"
                placeholder="Nama Lengkap"
                :readonly="!profileEditState"
                required
              />
            </v-flex>
            <label class="label-grid">Jenis Kelamin</label>
            <v-radio-group
              v-model="input.profile.gender"
              :readonly="!profileEditState"
              row
              hide-details
              class="pa-0 ma-0"
            >
              <v-layout row align-center justify-center>
                <v-flex xs6 class="pa-0">
                  <v-radio :value="0" label="Laki-laki"></v-radio>
                </v-flex>
                <v-flex xs6>
                  <v-radio :value="1" label="Perempuan"></v-radio>
                </v-flex>
              </v-layout>
            </v-radio-group>
            <label class="label-grid">Tanggal Lahir</label>
            <v-flex class="line-input">
              <v-menu
                v-model="resource.birthMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                :disabled="!profileEditState"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="input.profile.birth"
                    placeholder="Tahun-Bulan-Tanggal"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="input.profile.birth"
                  @input="resource.birthMenu = false"
                >
                </v-date-picker>
              </v-menu>
            </v-flex>
            <label class="label-grid">Alamat Rumah</label>
            <v-flex class="line-input">
              <v-textarea
                v-model="input.profile.address"
                :readonly="!profileEditState"
                outlined
                rows="1"
                hide-details
                auto-grow
                name="input-7-4"
                placeholder="Alamat"
              >
              </v-textarea>
            </v-flex>
          </div>
          <v-flex xs12 pt-3 pb-2>
            <v-layout ma-0 pa-0 row wrap>
              <v-flex xs12>
                <h3 class="head-text-center">Biografi</h3>
              </v-flex>
              <v-flex xs12 pt-2>
                <v-textarea
                  v-model="input.profile.bio"
                  :readonly="!profileEditState"
                  outlined
                  rows="5"
                  hide-details
                  auto-grow
                  name="input-7-4"
                  placeholder="tuliskan bio anda..."
                >
                </v-textarea>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex v-if="profileEditState" xs12 pt-3 pb-5>
            <v-layout align-center justify-space-around row wrap>
              <v-flex xs4>
                <v-btn
                  small
                  block
                  color="primary"
                  :disabled="loading.profile"
                  :loading="loading.profile"
                  @click="saveEditProfile()"
                >
                  Save
                </v-btn>
              </v-flex>
              <v-flex xs4>
                <v-btn
                  small
                  block
                  color="error"
                  :disabled="loading.profile"
                  @click="cancelEditProfile()"
                >
                  Cancel
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-layout row class="ma-0 pa-0 info-tag">
            <v-flex grow>
              <h2>Education</h2>
            </v-flex>
            <v-flex shrink>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    :color="educationEditState ? 'blue' : 'grey'"
                    v-bind="attrs"
                    @click="toggleEditEducation()"
                    v-on="on"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit Jenjang Pendidikan</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <div class="input-grid education">
            <label class="label-grid">Nama Institusi</label>
            <v-flex class="line-input">
              <v-text-field
                v-model="input.education.place"
                :readonly="!educationEditState"
                placeholder="Nama institusi"
                required
              />
            </v-flex>
            <label class="label-grid">Bulan Kelulusan</label>
            <v-flex class="line-input">
              <v-menu
                v-model="resource.educationDateMenu"
                :close-on-content-click="false"
                :disabled="!educationEditState"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="input.education.graduationDate"
                    placeholder="Tahun-Bulan-Tanggal"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="input.education.graduationDate"
                  @input="resource.educationDateMenu = false"
                >
                </v-date-picker>
              </v-menu>
            </v-flex>
          </div>
          <v-flex v-if="educationEditState" xs12 pt-3 pb-5>
            <v-layout align-center justify-space-around row wrap>
              <v-flex xs4>
                <v-btn
                  small
                  block
                  color="primary"
                  :disabled="loading.education"
                  :loading="loading.education"
                  @click="saveEditEducation()"
                >
                  Save
                </v-btn>
              </v-flex>
              <v-flex xs4>
                <v-btn
                  small
                  block
                  color="error"
                  :disabled="loading.education"
                  @click="cancelEditEducation()"
                >
                  Cancel
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-layout row class="ma-0 pa-0 info-tag">
            <v-flex grow>
              <h2>Career</h2>
            </v-flex>
            <v-flex shrink>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    :color="careerEditState ? 'blue' : 'grey'"
                    v-bind="attrs"
                    @click="toggleEditCareer()"
                    v-on="on"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Edit Pekerjaan Terakhir</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <div class="input-grid career">
            <label class="label-grid">Nama Tempat</label>
            <v-flex class="line-input">
              <v-text-field
                v-model="input.career.place"
                :readonly="!careerEditState"
                placeholder="Nama Tempat"
                required
              />
            </v-flex>
            <label class="label-grid">Posisi Terakhir</label>
            <v-flex class="line-input">
              <v-text-field
                v-model="input.career.position"
                :readonly="!careerEditState"
                placeholder="Nama Tempat"
                required
              />
            </v-flex>
            <label class="label-grid">Tanggal Masuk</label>
            <v-flex class="line-input">
              <v-menu
                v-model="resource.startDateMenuCareer"
                :disabled="!careerEditState"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="input.career.startDate"
                    placeholder="Tahun-Bulan-Tanggal"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="input.career.startDate"
                  @input="resource.startDateMenuCareer = false"
                >
                </v-date-picker>
              </v-menu>
            </v-flex>
            <label class="label-grid">Tanggal Selesai</label>
            <v-flex class="line-input">
              <v-menu
                v-model="resource.endDateMenuCareer"
                :close-on-content-click="false"
                :disabled="!careerEditState || input.career.startDate === null"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="input.career.endDate"
                    :disabled="input.career.startDate === null"
                    placeholder="Tahun-Bulan-Tanggal"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="input.career.endDate"
                  :min="input.career.startDate"
                  @input="resource.endDateMenuCareer = false"
                >
                </v-date-picker>
              </v-menu>
            </v-flex>
          </div>
          <v-flex v-if="careerEditState" xs12 pt-3 pb-5>
            <v-layout align-center justify-space-around row wrap>
              <v-flex xs4>
                <v-btn
                  small
                  block
                  color="primary"
                  :disabled="loading.career"
                  :loading="loading.career"
                  @click="saveEditCareer()"
                >
                  Save
                </v-btn>
              </v-flex>
              <v-flex xs4>
                <v-btn
                  small
                  block
                  color="error"
                  :disabled="loading.career"
                  @click="cancelEditCareer()"
                >
                  Cancel
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-dialog v-model="dialog" :max-width="600" attach>
      <chat-dialog
        :user-id="$store.state.userLoggedIn"
        @close-dialog="dialog = false"
      />
    </v-dialog>
  </v-layout>
</template>

<script>
import Swal from 'sweetalert2'
import FormData from 'form-data'
import SharedFunctionMixin from '@/mixin/sharedFunctionMixin'

const chatDialog = () => import('../../components/chatDialog.vue')
const axios = require('axios')

export default {
  middleware: 'verifyUser',
  components: {
    chatDialog,
  },
  mixins: [SharedFunctionMixin],
  /*
  validate({ params }) {
    console.log(this.checkIfPhoneNumber(params.id))
    return this.checkIfPhoneNumber(params.id)
  },
  */
  data() {
    return {
      dialog: false,
      resource: {
        birthMenu: false,
        educationDateMenu: false,
        startDateMenuCareer: false,
        endDateMenuCareer: false,
      },
      loading: {
        profile: false,
        education: false,
        career: false,
        coverPhoto: false,
        profilePhoto: false,
      },
      profileEditState: false,
      educationEditState: false,
      careerEditState: false,
      tempData: null,
      input: {
        id: null,
        pictures: {
          profile: null,
          cover: null,
          collections: [],
        },
        profile: {
          name: '',
          gender: 0,
          birth: '',
          address: '',
          bio: '',
        },
        education: {
          place: '',
          graduationDate: '',
        },
        career: {
          place: '',
          position: '',
          startDate: '',
          endDate: '',
        },
      },
    }
  },
  created() {
    axios.defaults.headers.common.Authorization = `Bearer ${this.$store.state.authToken}`
    if (this.$store.state.userLoggedIn == null) {
      const route = this.$nuxt.$route.path.split('/')
      axios
        .post('/api/v1/register/otp/request', `phone=${route[3]}`)
        .then((response) => {
          this.$store.commit('setLoggedIn', response.data.data.user.id)
        })
        .catch((error) => {
          Swal.fire({
            title: 'Terjadi Kesalahan tidak bisa mendapat user ID',
            text: error,
            icon: 'error',
            timer: 2000,
            confirmButtonText: 'Tutup',
          })
          this.$store.commit('removeToken')
          this.$store.commit('removeLoggedIn')
          this.$router.push(`/`)
        })
    }
    this.getData()
  },
  methods: {
    profileFilePicked(e) {
      // eslint-disable-next-line
      let data = new FormData()
      const files = e.target.files
      if (files[0] !== undefined) {
        if (files[0].name.lastIndexOf('.') <= 0) {
          return
        }
        this.loading.profilePhoto = true
        data.append('image', files[0])
        axios
          .post(
            '/api/v1/uploads/profile',
            {
              image: data,
            },
            {
              headers: {
                'Content-Type': `multipart/form-data`,
              },
            },
          )
          .then((response) => {
            console.log(response)
            this.input.pictures.profile =
              response.data.data.user_picture.picture.url
          })
          .catch((error) => {
            console.log(error)
            Swal.fire({
              title: 'Terjadi Kesalahan',
              text: 'Upload gambar profile gagal',
              icon: 'error',
              timer: 2000,
              confirmButtonText: 'Tutup',
            })
          })
          .finally(() => {
            this.loading.profilePhoto = false
          })
      }
    },
    coverFilePicked(e) {
      // eslint-disable-next-line
      let data = new FormData()
      const files = e.target.files
      if (files[0] !== undefined) {
        if (files[0].name.lastIndexOf('.') <= 0) {
          return
        }
        this.loading.coverPhoto = true
        data.append('image', files[0])
        axios
          .post(
            '/api/v1/uploads/cover',
            {
              image: data,
            },
            {
              headers: {
                'Content-Type': `multipart/form-data`,
              },
            },
          )
          .then((response) => {
            console.log(response)
            this.input.pictures.cover =
              response.data.data.user_picture.cover_picture.url
          })
          .catch((error) => {
            console.log(error)
            Swal.fire({
              title: 'Terjadi Kesalahan',
              text: 'Upload Cover gambar gagal',
              icon: 'error',
              timer: 2000,
              confirmButtonText: 'Tutup',
            })
          })
          .finally(() => {
            this.loading.coverPhoto = false
          })
      }
    },
    logUserOut() {
      axios
        .post('/api/v1/oauth/revoke', {
          access_token: this.$store.state.authToken,
          confirm: 1,
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          this.$store.commit('removeToken')
          this.$store.commit('removeLoggedIn')
          this.$router.push(`/`)
        })
    },
    toggleEditCareer() {
      this.careerEditState = !this.careerEditState
      if (this.careerEditState) {
        this.tempData = JSON.parse(JSON.stringify(this.input.career))
      }
    },
    toggleEditEducation() {
      this.educationEditState = !this.educationEditState
      if (this.educationEditState) {
        this.tempData = JSON.parse(JSON.stringify(this.input.education))
      }
    },
    toggleEditProfile() {
      this.profileEditState = !this.profileEditState
      if (this.profileEditState) {
        this.tempData = JSON.parse(JSON.stringify(this.input.profile))
      }
    },
    cancelEditCareer() {
      this.careerEditState = false
      this.input.career = this.tempData
    },
    cancelEditEducation() {
      this.educationEditState = false
      this.input.education = this.tempData
    },
    cancelEditProfile() {
      this.profileEditState = false
      this.input.profile = this.tempData
    },
    saveEditCareer() {
      this.loading.career = true
      axios
        .post('/api/v1/profile/career', {
          position: this.input.career.position,
          company_name: this.input.career.place,
          starting_from: this.input.career.startDate,
          ending_in: this.input.career.endDate,
        })
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            Swal.fire({
              title: 'Sukses!!',
              text: 'Pekerjaan Terakhir sudah dirubah',
              icon: 'success',
              timer: 2000,
              confirmButtonText: 'Ok',
            })
            this.careerEditState = false
          }
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            title: 'Terjadi Kesalahan',
            text: 'Cek isian jangan ada yang kosong',
            icon: 'error',
            timer: 2000,
            confirmButtonText: 'Tutup',
          })
        })
        .finally(() => {
          this.loading.career = false
        })
    },
    saveEditEducation() {
      this.loading.education = true
      axios
        .post('/api/v1/profile/education', {
          school_name: this.input.education.place,
          graduation_time: this.input.education.graduationDate,
        })
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            Swal.fire({
              title: 'Sukses!!',
              text: 'Jenjang pendidikan sudah dirubah',
              icon: 'success',
              timer: 2000,
              confirmButtonText: 'Ok',
            })
            this.educationEditState = false
          }
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            title: 'Terjadi Kesalahan',
            text: 'Cek isian jangan ada yang kosong',
            icon: 'error',
            timer: 2000,
            confirmButtonText: 'Tutup',
          })
        })
        .finally(() => {
          this.loading.education = false
        })
    },
    saveEditProfile() {
      this.loading.profile = true
      axios
        .post('/api/v1/profile', {
          name: this.input.profile.name,
          gender: this.input.profile.gender,
          birthday: this.input.profile.birth,
          hometown: this.input.profile.address,
          bio: this.input.profile.bio,
        })
        .then((response) => {
          console.log(response)
          if (response.status === 201) {
            Swal.fire({
              title: 'Sukses!!',
              text: 'profile sudah dirubah',
              icon: 'success',
              timer: 2000,
              confirmButtonText: 'Ok',
            })
            this.profileEditState = false
          }
        })
        .catch((error) => {
          console.log(error)
          Swal.fire({
            title: 'Terjadi Kesalahan',
            text: 'Cek isian jangan ada yang kosong',
            icon: 'error',
            timer: 2000,
            confirmButtonText: 'Tutup',
          })
        })
        .finally(() => {
          this.loading.profile = false
        })
    },
    convertGender(value) {
      return value === 'male' ? 0 : 1
    },
    getData() {
      axios
        .get('/api/v1/profile/me')
        .then((response) => {
          if (response.status === 200) {
            const { user } = response.data.data
            this.input.id = user.id
            this.input.profile = {
              name: user.name,
              gender: user.gender ? this.convertGender(user.gender) : null,
              birth: user.birthday,
              address: user.hometown,
              bio: user.bio,
            }
            this.input.education = {
              place: user.education.school_name,
              graduationDate: user.education.graduation_time,
            }
            this.input.career = {
              place: user.career.company_name,
              position: '',
              startDate: user.career.starting_from,
              endDate: user.career.ending_in,
            }
            this.input.pictures = {
              profile: user.user_picture,
              cover: user.cover_picture.url,
              collections: [],
            }
          }
        })
        .catch((error, code) => {
          console.log(error)
          Swal.fire({
            title: 'Session tidak valid',
            text: 'Silahkan login ulang',
            icon: 'error',
            timer: 2000,
            confirmButtonText: 'Tutup',
          }).finally(() => {
            this.$router.push(`/`)
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.cover-image {
  min-height: 300px;
  border-radius: 15px 15px 0 0;
  background-clip: content-box;
  background-color: darkgrey;
}
.profile-image {
  height: 80%;
  min-width: 200px;
  background-color: #f3f3f3;
  border-radius: 10px 10px 2px 2px;
  background-clip: content-box;

  .no-profile-image {
    color: #846b6b;
    font-size: 9em !important;
    height: 100%;
    width: 100%;
  }
}
.information-layout {
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  background-clip: content-box;
  .info-tag {
    border-bottom: 3px solid darkgrey;
  }
  .input-grid {
    display: grid;
    padding-top: 12px;
    grid-template-columns: 150px 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    justify-items: baseline;
    align-items: center;

    &.profile {
      grid-template-rows: repeat(3, 35px) 1fr;
    }
    &.education {
      grid-template-rows: repeat(2, 35px);
    }
    &.career {
      grid-template-rows: repeat(2, 35px);
    }
  }
  .label-grid {
  }
  .bio-input {
    width: 100%;
  }
  .head-text-center {
    text-align: center;
  }
  .line-input {
    width: 100%;
  }
}
</style>
