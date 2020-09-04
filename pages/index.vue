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
          <v-layout mt-2 ml-1 mr-1 row>
            <v-flex xs12 pl-2 pr-2>
              <v-text-field label="no hp" outlined></v-text-field>
            </v-flex>
            <v-flex xs12 pl-2 pr-2>
              <v-text-field label="password" outlined></v-text-field>
            </v-flex>
            <v-flex xs12 pl-2 pr-2>
              <v-text-field label="country" outlined></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-actions>
          <v-layout align-start justify-center column>
            <v-flex xs12 pb-2 align-self-center>
              <v-btn class="login-button" color="orange">Register</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex pt-2 ml-2 mr-2 shrink>
      <v-card ml-2 mr-2 class="card-login-template">
        <v-card-title primary-title>
          <v-layout mt-2 ml-1 mr-1 row>
            <v-flex xs12 pl-2 pr-2>
              <v-text-field label="no hp" outlined></v-text-field>
            </v-flex>
            <v-flex xs12 pl-2 pr-2>
              <v-text-field label="password" outlined></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-actions>
          <v-layout align-start justify-center column>
            <v-flex xs12 pb-2 align-self-center>
              <v-btn class="login-button" color="orange">Login</v-btn>
            </v-flex>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<style lang="scss" scoped>
.login-page {
  font-weight: 500;
  font-family: Roboto, sans-serif !important;
  .card-login-template {
    height: 80vh;
  }
  .login-button {
    height: 44px;
    min-width: 200px;
    padding: 0 19.5555555556px;
  }
}

@media only screen and (min-width: 1280px) {
  .card-login-template {
    height: 80vh;
    max-width: 400px;
  }
}
</style>
