<template>
    <v-app id="app">
        <Navbar/>
        <v-content>
            <Sidebar v-if="getFlagSignIn && $route.name!=='Admin'"/>
            <router-view/>

<!--            <router-view v-if="autoLoginChecked"/>-->
        </v-content>

    </v-app>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    name: 'App',
    data: function () {
        return {
            autoLoginChecked: false
        }

    },
    computed:{
      ...mapGetters('student',["getFlagSignIn"])
    },
    async mounted(){
        if(localStorage.getItem('token')===null ){
            this.autoLoginChecked = true;
            console.log("app no token found");
            return;
        }
        await this.app();
        this.autoLoginChecked = true;
    },
    methods:{
        ...mapActions('student',['app']),
    }

};
</script>
