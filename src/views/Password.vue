<template>
    <Card>
        <template #cardText>
            <v-card-title class="display-1 text--primary">
                Change • Password
            </v-card-title>
            <v-card-actions>
                <v-text-field color="black" label="Current Password" outlined shaped dense v-model.trim="currentPassword" type="password"
                              @blur="$v.currentPassword.$touch()"
                              :error="$v.currentPassword.$error"
                              :error-messages="$v.currentPassword.$error?'Please enter valid password':null">
                </v-text-field>
            </v-card-actions>

            <v-card-actions>
                <v-text-field color="black" label="New Password" outlined shaped dense v-model.trim="newPassword" type="password"
                              @blur="$v.newPassword.$touch()"
                              :error="$v.newPassword.$error"
                              :error-messages="$v.newPassword.$error?'Password should contain 5 characters(including 1 letter, 1 digit)':null">
                </v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-text-field color="black" label="Re-enter New Password" outlined shaped dense v-model.trim="re" type="password"
                              @blur="$v.re.$touch()"
                              :error="$v.re.$error"
                              :error-messages="$v.re.$error?'Password did not match':null">
                </v-text-field>
            </v-card-actions>
        </template>
        <template #cardAction>
            <Button icon="far fa-save" text="Save" :click="saveClicked" :disabled="$v.$anyError || getSpinnerFlag"></Button>
        </template>
    </Card>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import { required,alphaNum, minLength, sameAs } from 'vuelidate/lib/validators'
export default {
    name: "Password",
    data: function () {
        return {
            currentPassword: "",
            newPassword: "",
            re: "",
            status:null
        }
    },
    computed:{
      ...mapGetters(['getSpinnerFlag']) ,
    },
    validations:{
        currentPassword: {
            required,
            alphaNum,
            minLen: minLength(5),
        },
        newPassword: {
            alphaNum,
            required,
            minLen: minLength(5)
        },
        re: {
            required,
            sameAs: sameAs('newPassword')
        },
    },
    methods: {
        ...mapActions(['setNotificationTimer']),
        ...mapActions('student',['passwordChange']),
        async saveClicked() {
            console.log("Save clicked");
            if (this.newPassword !== this.re) {
                console.log("Password typeError");
                return;
            }
            console.log("passowrd change: new passwords matched");
            this.status=await this.passwordChange({password:this.currentPassword,newpassword: this.newPassword});
            if(this.status===200){
                await this.setNotificationTimer();
            }
        }

    }
}
</script>

<style scoped>

</style>