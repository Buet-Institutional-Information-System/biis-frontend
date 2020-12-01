<template>
    <v-app id="app">
        <Navbar/>
        <v-content>
            <Sidebar v-if="$store.getters.getFlagSignIn"/>
            <router-view/>
        </v-content>
    </v-app>
</template>

<script>


import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";


export default {
    name: 'App',
    data: function () {
        return {}

    },
    async mounted(){

    },
    components: {
        Navbar,
        Sidebar

    },


};
</script>
