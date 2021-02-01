<template>
    <v-navigation-drawer permanent clipped app>
        <v-list>
            <v-list-item class="px-2">
                <v-list-item-avatar class=" mr-2">
                    <v-img :src="getUserImage"></v-img>
                </v-list-item-avatar>
            </v-list-item>

            <v-list-item link>
                <v-list-item-content>
                    <v-list-item-title class="title ">{{getUserName}}</v-list-item-title>
                    <v-list-item-subtitle>{{getDept}}</v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list nav dense>
            <v-list-item link to="/registration">
                <v-list-item-icon>
                    <v-icon>fas fa-edit</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Registration</v-list-item-title>
            </v-list-item>

            <v-list-item link to="/viewGrade">
                <v-list-item-icon>
                    <v-icon>fas fa-user-graduate</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Grade</v-list-item-title>
            </v-list-item>

            <v-list-item link to="/feedback">
                <v-list-item-icon>
                    <v-icon>fas fa-comment</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Feedback</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/contact">
                <v-list-item-icon>
                    <v-icon>fas fa-address-card</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Contact Information</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/adviser">
                <v-list-item-icon>
                    <v-icon>mdi-teach</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Adviser</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/password">
                <v-list-item-icon>
                    <v-icon>fas fa-key</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Change Password</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/secretQuestion">
                <v-list-item-icon>
                    <v-icon>fas fa-question-circle</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Change Secret Question</v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import {mapGetters} from 'vuex'
    export default {
        name: "Sidebar",
        computed:{
            ...mapGetters('student',['getUserImage','getUserName','getDept'])
        }
    }
</script>

<style scoped>

</style>