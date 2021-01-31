<template>
    <v-app id="app">
        <Navbar/>
        <v-content>
            <Sidebar v-if="getFlagSignIn"/>
            <router-view v-if="autoLoginChecked"/>
        </v-content>
    </v-app>
</template>

<script>
import {mapGetters} from 'vuex'
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
            console.log("Token found");
            return;
        }
        console.log("token detected: ",localStorage.getItem('token'));
        this.$store.commit('student/setToken',localStorage.getItem('token'));
        console.log("App token from store: ",this.$store.getters['student/getToken']);
        let sendObject={
            token: this.$store.getters['student/getToken']
        }
        console.log('token: ',sendObject);

        try {
            let response = await this.axios.get('/signIn',{params:sendObject});
            if (response.data.rows.length != 0) {

                let payload = {
                    id: response.data.rows[0].STUDENT_ID,
                    token:this.$store.getters['student/getToken'],
                    term_id: response.data.rows[0].TERM_ID,
                    dept_id: response.data.rows[0].DEPT_ID,
                    name: response.data.rows[0].STUDENT_NAME,
                    level: response.data.rows[0].LVL,
                    term: response.data.rows[0].TRM,
                    session: response.data.rows[0].SSSN,
                    hallName: response.data.rows[0].HALL_NAME,
                    hallStatus: response.data.rows[0].HALL_STATUS,
                    dept: response.data.rows[0].DEPT_NAME,
                    adviserId: response.data.rows[0].INS_ID
                };
                this.$store.commit('student/setUser', payload);
                this.autoLoginChecked=true;
            }
        }catch (e){
            console.log(e);
        }
    },


};
</script>
