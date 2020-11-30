<template>
  <v-app-bar dark app clipped-left>
    <v-layout>
      <v-img
          :src="require('@/images/BuetLogo.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
          @click="$vuetify.goTo(0)"
      />
      <v-toolbar-title class="display-1">Buet Institutional Informantion System</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-circular :size="50" :width="5" indeterminate
                           v-if="$store.getters.getSpinnerFlag"></v-progress-circular>
    </v-layout>
    <v-tab v-if="$route.name==='Admin'">
      <v-icon left>mdi-star-settings-outline</v-icon>
      <span style="font-size:x-large">Admin</span>
    </v-tab>
    <v-tab v-if="$store.getters.getFlagSignIn" link to="/home">
      <v-icon left>mdi-home-outline</v-icon>
      <span right>Home</span>
    </v-tab>

    <v-tab v-if="$store.getters.getFlagSignIn" @click="logOutClicked">
      <v-icon left>mdi-logout</v-icon>
      <span class="font-weight-light">Log</span>
      <span class="font-weight-medium">Out</span>
    </v-tab>


  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  data: function () {
    return {
      items: ['Home', 'LogIn']
    }
  },
  methods: {
    logOutClicked() {
      this.$store.commit('unsetUser');
      this.$store.commit('unsetUserInfo')
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>

</style>