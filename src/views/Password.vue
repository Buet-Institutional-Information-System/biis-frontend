<template>
    <v-card
            style="margin-left: 20%;margin-top: 2%; width: 50%;height: 70%"
            class="v-card--hover "
    >
        <v-card-text>
            <v-card-title class="display-1 text--primary">
                Change • Password
            </v-card-title>

            <v-card-actions>
                <v-text-field
                        color="black"
                        label="Current Password"
                        outlined
                        shaped
                        dense
                        v-model="currentPassword"
                        type="password"
                ></v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-text-field
                        color="black"
                        label="New Password"
                        outlined
                        shaped
                        dense
                        v-model="newPassword"
                        type="password"
                ></v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-text-field
                        color="black"
                        label="Re-enter New Password"
                        outlined
                        shaped
                        dense
                        v-model="re"
                        type="password"
                ></v-text-field>
            </v-card-actions>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn color="teal" dark @click="saveClicked">
                <v-icon left>far fa-save</v-icon>
                <span right>Save</span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "Password",
        data: function () {
            return {
                currentPassword: "",
                newPassword: "",
                re: ""
            }
        },
        methods: {
            async saveClicked() {
                console.log("Save clicked");
                if (!(this.currentPassword === this.$store.getters.getUserPassword && this.newPassword === this.re)) {

                      console.log("Password typeError or didnt match");


                    return;
                }
                console.log("Frontend matched");
                this.$store.commit('setSpinnerFlag');
                console.log("Save clicked");
                let sendObject = {
                    id: this.$store.getters.getUserId,
                    password: this.currentPassword,
                    newpassword: this.newPassword
                };
                console.log(sendObject);
                try {
                    let response = await this.axios.patch('/password', sendObject);
                    console.log("Received data from server is: ");
                    console.log(response.data.rows[0]);
                    if (response.data.rows.length != 0) {

                        let password = response.data.rows[0].PSSWRD;
                        this.$store.commit('setUserPassword', password);
                        console.log(" userPassword: ", this.$store.getters.getUserPassword);
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