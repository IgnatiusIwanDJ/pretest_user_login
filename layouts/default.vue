<template>
  <v-app>
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
