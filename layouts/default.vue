<template>
  <v-app>
    <!-- <a href='https://www.freepik.com/vectors/background'>Background vector created by freepik - www.freepik.com</a> -->
    <v-main class="layout-styling">
      <v-container fill-height>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
@import '@/assets/variables.scss';

.layout-styling {
  background-image: url('~@/assets/background.jpg');
}
</style>
