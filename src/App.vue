<template>
  <v-app id="app">
      <Navbar />
      <v-content v-if="$store.getters.getFlagSignIn">
          <Sidebar/>
          <router-view/>
      </v-content>
      <v-content v-else ><SignIn/></v-content>
  </v-app>
</template>

<script>


import Navbar  from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SignIn from "./components/SignIn";


export default {
  name: 'App',
 data:function(){
      return{

      }

 },
  components: {
      Navbar,
      Sidebar,
      SignIn,

  },

  data: () => ({
    //
  }),
};
</script>
