<template>
    <InfoCard>
        <template #cardText>
            <tbody>
            <tr v-for="[key,value] in Object.entries(getContacts)">
                <td class="text-left subtitle-2">{{ key }}</td>
                <td class="text-left subtitle-2">{{ value }}</td>
            </tr>
            <tr>
                <td class="text-left subtitle-2"> Phone No</td>
                <td class="text-left subtitle-2">
                    <v-text-field color="black" clearable dense outlined style="margin-top: 5%" v-model.trim="phone"
                                  @blur="$v.phone.$touch()"
                                  :error="$v.phone.$error"
                                  :error-messages="$v.phone.$error?'Please enter your valid phone number.':null">
                    </v-text-field>
                </td>
            </tr>
            <tr>
                <td class="text-left subtitle-2">Email</td>
                <td class="text-left subtitle-2">
                    <v-text-field color="black" clearable dense outlined style="margin-top: 5%" v-model.trim="email"
                                  @blur="$v.email.$touch()"
                                  :error="$v.email.$error"
                                  :error-messages="$v.email.$error?'Please enter your valid email.':null">
                    </v-text-field>
                </td>
            </tr>
            <tr>
                <td class="text-left subtitle-2">Contact Person Name</td>
                <td class="text-left subtitle-2">
                    <v-text-field color="black" clearable dense outlined style="margin-top: 5%"
                                  v-model.trim="contact_person_name"
                                  @blur="$v.contact_person_name.$touch()"
                                  :error="$v.contact_person_name.$error"
                                  :error-messages="$v.contact_person_name.$error?'Contact person name is required.':null">
                    </v-text-field>
                </td>
            </tr>
            <tr>
                <td class="text-left subtitle-2">Contact Person Phone</td>
                <td class="text-left subtitle-2">
                    <v-text-field color="black" clearable dense outlined style="margin-top: 5%"
                                  v-model.trim="contact_person_phone"
                                  @blur="$v.contact_person_phone.$touch()"
                                  :error="$v.contact_person_phone.$error"
                                  :error-messages="$v.contact_person_phone.$error?'Contact person phone is required.':null">
                    </v-text-field>
                </td>
            </tr>
            <tr>
                <td class="text-left subtitle-2">Residential Area</td>
                <td class="text-left subtitle-2">
                    <v-text-field color="black" clearable dense outlined style="margin-top: 5%"
                                  v-model.trim="residential_area">
                    </v-text-field>
                </td>
            </tr>
            </tbody>
        </template>
        <template #cardAction>
            <Button icon="far fa-share-square" text="Back" :click="gotoContact"></Button>
            <v-spacer/>
            <Button icon="mdi-content-save-edit-outline" text="Confirm" :click="confirmClicked" :disabled="$v.$anyError || check || getSpinnerFlag"></Button>
        </template>
    </InfoCard>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {required, alphaNum, minLength, maxLength, email, numeric} from 'vuelidate/lib/validators'

export default {
    name: "EditInfo",
    data: function () {
        return {
            phone: "",
            email: "",
            contact_person_name: "",
            contact_person_phone: "",
            residential_area: "",
            status:null
        }
    },
    computed: {
        ...mapGetters(['getSpinnerFlag']),
        ...mapGetters('student', ['getContacts', 'getEdits']),
        check(){
            if(this.phone===this.getEdits['Phone No'] &&
                this.email===this.getEdits['Email'] &&
                this.contact_person_name===this.getEdits['Contact Person Name'] &&
                this.contact_person_phone===this.getEdits['Contact Person Phone'] &&
                this.residential_area===this.getEdits['Residential Area']){
                return true
            }
            else {
                return false
            }
        }
    },
    async mounted() {
        await this.contact();
        this.phone = this.getEdits['Phone No'];
        this.email = this.getEdits['Email'];
        this.contact_person_name = this.getEdits['Contact Person Name'];
        this.contact_person_phone = this.getEdits['Contact Person Phone'];
        this.residential_area = this.getEdits['Residential Area'];
    },
    validations: {
        phone: {
            required,
            minLen: minLength(11),
            maxLen: maxLength(11),
            numeric
        },
        email: {
            required,
            email
        },
        contact_person_name: {
            required
        },
        contact_person_phone: {
            required,
            minLen: minLength(11),
            maxLen: maxLength(11),
            numeric
        },
    },
    methods: {
        ...mapActions(['setNotificationTimer']),
        ...mapActions('student', ['contact', 'editConfirmClicked', 'gotoContact']),
        async confirmClicked() {
            let payload={
                'Phone No': this.phone,
                'Email': this.email,
                'Contact Person Name': this.contact_person_name,
                'Contact Person Phone': this.contact_person_phone,
                'Residential Area': this.residential_area,
            }
            this.status=await this.editConfirmClicked(payload);
            if(this.status===200){
                await this.setNotificationTimer();
            }
        }
    }
}
</script>

<style scoped>

</style>