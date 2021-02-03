<template>
   <Card>
       <template #cardText>
            <v-card-title class="display-1 text--primary">
                 • Feedback •
            </v-card-title>
           <v-card-actions>
                <v-text-field color="black" label="Subject" outlined shaped dense v-model.trim="subject"
                              @blur="$v.subject.$touch()"
                              :error="$v.subject.$error"
                              :error-messages="$v.subject.$error?'Please enter a subject.':null">
                </v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-textarea color="black" label="Complain" auto-grow outlined shaped v-model.trim="complain"
                            @blur="$v.complain.$touch()"
                            :error="$v.complain.$error"
                            :error-messages="$v.complain.$error?'Please enter your complain.':null">
                </v-textarea>
            </v-card-actions>
       </template>
        <template #cardAction>
            <Button icon="far fa-arrow-alt-circle-right" text="Submit" :click="gotoHome" :disabled="$v.$anyError || getSpinnerFlag"></Button>
        </template>
   </Card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {required} from "vuelidate/lib/validators";
    export default {
        name: "Feedback",
        data:function(){
            return{
                subject:"",
                complain:""
            }
        },
        validations:{
            subject: {
                required
            },
            complain: {
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