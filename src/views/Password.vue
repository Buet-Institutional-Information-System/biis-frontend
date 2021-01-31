<template>
    <Card>
        <template #cardText>
            <v-card-title class="display-1 text--primary">
                Change • Password
            </v-card-title>
            <v-card-actions>
                <v-text-field color="black" label="Current Password" outlined shaped dense v-model="currentPassword" type="password">
                </v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-text-field color="black" label="New Password" outlined shaped dense v-model="newPassword" type="password">
                </v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-text-field color="black" label="Re-enter New Password" outlined shaped dense v-model="re" type="password">
                </v-text-field>
            </v-card-actions>
        </template>
        <template #cardAction>
            <Button icon="far fa-save" text="Save" :click="saveClicked"></Button>
        </template>
    </Card>
</template>

<script>
import {mapActions} from 'vuex'
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
        ...mapActions('student',['passwordChange']),
        async saveClicked() {
            console.log("Save clicked");
            if (this.newPassword !== this.re) {
                console.log("Password typeError");
                return;
            }
            console.log("passowrd change: new passwords matched");
            await this.passwordChange({password:this.currentPassword,newpassword: this.newPassword})
        }

    }
}
</script>

<style scoped>

</style>