<template>
    <div v-if="getUserId!==''">
        <v-img :src="getUserImage" class="pa-4" style="margin-left: 35%; margin-top:2%;height:15%;width:15%;  border-width: 20px;border-color:lightgrey;   border-style: double"></v-img>
        <v-card style="margin-left:20%;margin-top: 2%;width:50%" shaped>
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item class="title" >{{getUserName}}</v-list-item>
                    <v-list-item class="subtitle-2">{{getDept}}</v-list-item>
                  <v-list-item>Student Id: {{getUserId}}</v-list-item>
                    <v-list-item>Level: {{getCurrentLevel}} Term: {{getCurrentTerm}}</v-list-item>
                    <v-list-item>Session: {{getCurrentSession}}</v-list-item>
                    <v-list-item>Hall: {{getHallName}} ({{getHallStatus}})</v-list-item>
                </v-list-item-content>
            </v-list-item>
        </v-card>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
    // @ is an alias to /src
    export default {
        name: 'Home',
        components: {
        },
        computed:{
            ...mapGetters('student',['getUserImage','getUserName','getDept','getUserId','getCurrentLevel','getCurrentTerm','getCurrentSession','getHallName','getHallStatus'])
        }
    }
</script>
