<template>
    <InfoCard>
        <template #cardText>
            <tbody>
            <tr v-for="[key,value] in Object.entries(contacts)">
                <td class="text-left subtitle-2">{{ key }}</td>
                <td class="text-left subtitle-2">{{ value }}</td>
            </tr>
            <tr v-for="[key,value] in Object.entries(edits)">
                <td class="text-left subtitle-2">{{ key }}</td>
                <td class="text-left subtitle-2">
                    <v-text-field color="black" clearable dense outlined style="margin-top: 5%" v-model="edits[key]">
                    </v-text-field>
                </td>
            </tr>
            </tbody>
        </template>
        <template #cardAction>
            <v-btn color="teal" dark @click="backClicked">
                <v-icon left>far fa-share-square</v-icon>
                <span right>Back</span>
            </v-btn>
            <v-spacer/>
            <v-btn color="teal" dark @click="confirmClicked">
                <v-icon left>mdi-content-save-edit-outline</v-icon>
                <span right>Confirm</span>
            </v-btn>
        </template>
    </InfoCard>
</template>

<script>
export default {
    name: "EditInfo",
    data: function () {
        return {
            contacts:
                {
                    'Name': this.$store.getters.getUserName,
                    'Student Id': this.$store.getters.getUserId,
                    'Level/Term': this.$store.getters.getCurrentLevel + '/' + this.$store.getters.getCurrentTerm
                },
            edits: [],
        }
    },
    async mounted() {
        let sendObject = {
            token: this.$store.getters.getToken
        };
        try {
            let response = await this.axios.get('/contactInfo', {params: sendObject});
            console.log("Received data from server is: ", response.data.rows[0]);

            if (response.data.rows.length != 0) {
                console.log('response data row length is not zero');
                let payload = {
                    phone: response.data.rows[0].MOBILE_NUMBER,
                    email: response.data.rows[0].EMAIL,
                    contact_person_name: response.data.rows[0].CONTACT_PERSON_NAME,
                    contact_person_number: response.data.rows[0].CONTACT_PERSON_NUMBER,
                    address: response.data.rows[0].ADDRESS
                };
                this.$store.commit('unsetUserInfo');
                this.$store.commit('setUserInfo', payload);
                console.log(this.$store.getters.getEmail);
                this.edits =
                    {
                        'Phone No': this.$store.getters.getPhone,
                        'Email': this.$store.getters.getEmail,
                        'Contact Person Name': this.$store.getters.getContactPersonName,
                        'Contact Person Phone': this.$store.getters.getContactPersonNumber,
                        'Residential Area': this.$store.getters.getAddress
                    }
            } else {
                console.log('Wrong Information');
            }
        } catch (e) {

        } finally {
            this.$store.commit('unsetSpinnerFlag');
        }
    },
    methods: {
        async confirmClicked() {
            this.$store.commit('setSpinnerFlag');
            console.log("edit Info clicked");
            let sendObject = {
                token: this.$store.getters.getToken,
                phone: this.edits['Phone No'],
                email: this.edits['Email'],
                contact_person_name: this.edits['Contact Person Name'],
                contact_person_number: this.edits['Contact Person Phone'],
                address: this.edits['Residential Area']
            };
            console.log('SEND OBJECT: ', sendObject);
            try {
                console.log("inside try");
                let response = await this.axios.patch('/editInfo', sendObject);
                console.log("Received data from /editinfo route is: ");
                console.log(response);
            } catch (e) {
                console.log("ERROR in /editinfo");
                console.log(e);
            } finally {
                this.$store.commit('unsetSpinnerFlag');
                this.$router.push('/contact');
            }
        },
        backClicked() {
            this.$router.push('/contact');
        }
    }
}
</script>

<style scoped>

</style>