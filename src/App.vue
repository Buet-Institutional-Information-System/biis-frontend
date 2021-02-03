<template>
    <v-app id="app">
        <Navbar/>
        <v-content>
            <Sidebar v-if="getFlagSignIn && $route.name!=='Admin'"/>
            <router-view v-if="autoLoginChecked"/>
            <Notification></Notification>
        </v-content>
    </v-app>
</template>

<script>
import Notification from "@/components/UI/Notification";
import {mapActions,mapGetters} from 'vuex'
export default {
    name: 'App',
    components: {Notification},
    data: function () {
        return {
            autoLoginChecked: false,

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

        this.autoLoginChecked = await this.app();
    },
    methods:{
        ...mapActions('student',['app']),

    }

};
</script>
