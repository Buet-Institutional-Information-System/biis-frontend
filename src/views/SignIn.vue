<template>
    <v-container fluid style="width:100%;height:100%;padding-top: 5%">
        <v-row justify="center" style="padding-top: 0%">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-1">
                    <v-toolbar color="teal" dark flat>
                        <v-toolbar-title class="font-weight-light">BI</v-toolbar-title>
                        <v-toolbar-title>IS</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text >
                        <v-form >
                            <v-text-field  color="teal" label="UserId" name="userId" type="text" v-model.trim="id"
                                           @blur="$v.id.$touch()"
                                           :error="$v.id.$error"
                                           :error-messages="$v.id.$error?'Id is required':null"/>
<!--                            <p v-if="$v.id.$error" class="red&#45;&#45;text">Id is required</p>-->
                            <v-text-field  color="teal" id="password" label="Password" name="password" type="password" v-model.trim="password"
                                           @blur="$v.password.$touch()"
                                           :error="$v.password.$error"
                                           :error-messages="$v.password.$error?'Password is required':null"/>
<!--                            <p v-if="$v.password.$error" class="red&#45;&#45;text">Password is required</p>-->
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <Button icon="mdi-login" text="Login" :click="signInClicked" :disabled="$v.$anyError || getSpinnerFlag"></Button>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
    name: "SignIn",
    emits:['loggedIn'],
    async mounted() {
        if (this.getFlagSignIn) {
            await this.gotoHome();
        }
    },
    data: function () {
        return {
            id: "",
            password: "",
            status: null,
        }
    },
    validations:{
        id: {
            required,
        },
        password: {
            required,
        },
    },
    computed: {
        ...mapGetters(['getSpinnerFlag']),
        ...mapGetters('student', ['getFlagSignIn']),
    },
    methods: {
        ...mapActions(['resetNotification','setNotificationTimer']),
        ...mapActions('student', ['gotoHome', 'logInClicked']),
        async signInClicked() {
            this.resetNotification();
            this.status=null;
            let sendObject = {
                id: this.id,
                password: this.password
            };
            this.status = await this.logInClicked(sendObject);
            if(this.status===200){
                await this.setNotificationTimer();
            }
        }
    }
}
</script>

<style scoped>
.v-text-field.invalid label{
    color: red;
}
</style>