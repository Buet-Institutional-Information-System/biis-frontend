<template>
    <v-container

        fluid
        style="width:100%;height:100%;padding-top: 5%"

    >
        <v-row

            justify="center"
            style="padding-top: 0%"
        >
            <v-col
                cols="12"
                sm="8"
                md="4"
            >
                <v-card class="elevation-1">
                    <v-toolbar
                        color="teal"
                        dark
                        flat
                    >
                        <v-toolbar-title class="font-weight-light">BI</v-toolbar-title>
                        <v-toolbar-title>IS</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                color="teal"
                                label="UserId"
                                name="userId"
                                type="text"
                                v-model="id"
                            />
                            <v-text-field
                                color="teal"
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                v-model="password"
                            />
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer/>
                        <v-btn color="teal" dark @click="signInClicked">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

export default {
    name: "SignIn",
    async mounted() {
        if(this.$store.getters.getFlagSignIn){
            this.$router.push('/home');
        }

    },
    data: function () {
        return {
            id: "",
            password: "",
        }
    },

    methods: {
        async signInClicked() {
            this.$store.commit('setSpinnerFlag');
            console.log("Sign In clicked");

            let sendObject = {
                id: this.id,
                password: this.password
            };

            //console.log(sendObject);
            try {
                let response = await this.axios.post('/signIn', sendObject);
                console.log("Received data from server is: ");
                console.log(response.data.rows[0]);
                console.log("Token: ", response.data.token);
                if (response.data.rows.length != 0) {

                    let payload = {
                        id: response.data.rows[0].STUDENT_ID,
                        token: response.data.token,
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

                    console.log(payload);
                    console.log("Inside if");
                    this.$store.commit('setUser', payload);
                    console.log("Sign in flag in store: ", this.$store.getters.getFlagSignIn, ", userId: ", this.$store.getters.getUserId, ", userPassword: ", this.$store.getters.getUserPassword);
                    localStorage.setItem("token", this.$store.getters.getToken);
                    this.$router.push('/home');
                } else {
                    console.log('Wrong Information');
                }

            } catch (e) {

            } finally {
                this.$store.commit('unsetSpinnerFlag');
            }
        }
    }
}
</script>

<style scoped>

</style>