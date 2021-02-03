<template>
    <Card>
        <template #cardText>
            <v-card-title class="display-1 text--primary">
                Change • Secret • Question
            </v-card-title>
            <v-card-actions>
                <v-text-field color="black" label="Password" outlined shaped dense v-model.trim="password" type="password"
                              @blur="$v.password.$touch()"
                              :error="$v.password.$error"
                              :error-messages="$v.password.$error?'Please enter your password.':null">
                </v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-text-field color="black" label="Secret Question" outlined shaped dense v-model.trim="secretQuestion"
                              @blur="$v.secretQuestion.$touch()"
                              :error="$v.secretQuestion.$error"
                              :error-messages="$v.secretQuestion.$error?'Please enter your secret question.':null">
                </v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-text-field color="black" label="Secret Answer" outlined shaped dense v-model.trim="secretAnswer"
                              @blur="$v.secretAnswer.$touch()"
                              :error="$v.secretAnswer.$error"
                              :error-messages="$v.secretAnswer.$error?'Please enter your secret answer.':null">
                </v-text-field>
            </v-card-actions>
        </template>
        <template #cardAction>
            <Button icon="far fa-share-square" text="Change" :click="gotoHome" :disabled="$v.$anyError || getSpinnerFlag"></Button>
        </template>
    </Card>
</template>


<script>
import {mapActions,mapGetters} from 'vuex'
import {alphaNum, minLength, required} from "vuelidate/lib/validators";
    export default {
        name: "SecretQuestion",
        data:function(){
            return{
                password:"",
                secretQuestion:"",
                secretAnswer: ""
            }
        },
        validations:{
            password: {
                required,
                alphaNum,
                minLen: minLength(5),
            },
            secretQuestion: {
                required
            },
            secretAnswer: {
                required
            },
        },
        computed:{
          ...mapGetters(['getSpinnerFlag']),
        },
        methods:{
            ...mapActions('student',['gotoHome'])
        }
    }
</script>

<style scoped>

</style>