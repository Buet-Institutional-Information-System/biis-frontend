<template>
    <v-container fluid style="width:100%;height:100%;padding-top: 5%">
        <v-row justify="center" style="padding-top: 0%">
            <v-col cols="12" sm="8" md="4">
                <v-card class="elevation-1">
                    <v-toolbar color="teal" dark flat>
                        <v-toolbar-title class="font-weight-light">BI</v-toolbar-title>
                        <v-toolbar-title>IS</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field color="teal" label="UserId" name="userId" type="text" v-model.trim="id"/>
                            <v-text-field color="teal" id="password" label="Password" name="password" type="password"
                                          v-model.trim="password"/>
                        </v-form>
                        <v-alert type="error" dense outlined v-if="status!==200 && status!==null" >
                            {{getErrorMessage}}
                        </v-alert>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <Button icon="mdi-login" text="Login" :click="signInClicked"></Button>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: "SignIn",
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
    computed: {
        ...mapGetters(['getErrorMessage', 'getMessage']),
        ...mapGetters('student', ['getFlagSignIn']),
    },
    methods: {
        ...mapActions('student', ['gotoHome', 'logInClicked']),
        async signInClicked() {
            this.status=null;
            let sendObject = {
                id: this.id,
                password: this.password
            };
            this.status = await this.logInClicked(sendObject);
        }
    }
}
</script>

<style scoped>

</style>