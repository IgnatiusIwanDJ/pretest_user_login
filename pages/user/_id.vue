<template>
  <v-layout ml-3 mr-3 wrap>
    <v-flex xs12 class="cover-image">
      <v-layout pa-0 ma-0 align-end justify-center row fill-height>
        <v-flex grow />
        <v-flex xs3 class="profile-image">
          <v-layout align-center justify-center column fill-height>
            <v-flex xs12>
              <v-icon x-large class="no-profile-image">mdi-account</v-icon>
            </v-flex>
            <v-flex xs12>
              <label>No pict yet</label>
            </v-flex>
            <v-flex xs12>
              <v-btn color="blue" small bottom right fab>
                <v-icon medium color="white">mdi-account-plus</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex grow>
          <v-layout ma-0 align-end justify-end row fill-height>
            <v-btn color="blue" small bottom right fab>
              <v-icon medium color="white">mdi-image</v-icon>
            </v-btn>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex xs12 class="information-layout">
      <v-layout pt-4 align-center justify-start column>
        <v-flex pt-3 pb-4>
          <h2 class="info-tag">Profile</h2>
          <div class="input-grid profile">
            <label class="label-grid">Nama</label>
            <v-flex class="line-input">
              <v-text-field
                v-model="input.profile.name"
                placeholder="Nama Lengkap"
                required
              />
            </v-flex>
            <label class="label-grid">Jenis Kelamin</label>
            <v-radio-group
              v-model="input.profile.gender"
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
                lazy
                transition="scale-transition"
                offset-y
                full-width
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
          <v-flex xs12 pt-3 pb-5>
            <v-layout ma-0 pa-0 row wrap>
              <v-flex xs12>
                <h3 class="head-text-center">Biografi</h3>
              </v-flex>
              <v-flex xs12 pt-2>
                <v-textarea
                  v-model="input.profile.bio"
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
          <h2 class="info-tag">Education</h2>
          <div class="input-grid education">
            <label class="label-grid">Nama Institusi</label>
            <v-flex class="line-input">
              <v-text-field
                v-model="input.education.place"
                placeholder="Nama institusi"
                required
              />
            </v-flex>
            <label class="label-grid">Bulan Kelulusan</label>
            <v-flex class="line-input">
              <v-menu
                v-model="resource.educationDateMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
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
                  type="month"
                  @input="resource.educationDateMenu = false"
                >
                </v-date-picker>
              </v-menu>
            </v-flex>
          </div>
          <v-flex xs12 pt-3 pb-5 />
          <h2 class="info-tag">Career</h2>
          <div class="input-grid career">
            <label class="label-grid">Nama Tempat</label>
            <v-flex class="line-input">
              <v-text-field
                v-model="input.career.place"
                placeholder="Nama Tempat"
                required
              />
            </v-flex>
            <label class="label-grid">Posisi Terakhir</label>
            <v-flex class="line-input">
              <v-text-field
                v-model="input.career.position"
                placeholder="Nama Tempat"
                required
              />
            </v-flex>
            <label class="label-grid">Tanggal Masuk</label>
            <v-flex class="line-input">
              <v-menu
                v-model="resource.startDateMenuCareer"
                :close-on-content-click="false"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
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
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="input.career.endDate"
                    placeholder="Tahun-Bulan-Tanggal"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-on="on"
                  >
                  </v-text-field>
                </template>
                <v-date-picker
                  v-model="input.career.endDate"
                  @input="resource.endDateMenuCareer = false"
                >
                </v-date-picker>
              </v-menu>
            </v-flex>
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import SharedFunctionMixin from '@/mixin/sharedFunctionMixin'

export default {
  middleware: 'verifyUser',
  mixins: [SharedFunctionMixin],
  /*
  validate({ params }) {
    console.log(this.checkIfPhoneNumber(params.id))
    return this.checkIfPhoneNumber(params.id)
  },
  */
  data() {
    return {
      resource: {
        birthMenu: false,
        educationDateMenu: false,
        startDateMenuCareer: false,
        endDateMenuCareer: false,
      },
      input: {
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
