<template>
    <v-card
            style="margin-left: 20%;margin-top: 2%;  width: 50%"
            outlined
    >
        <v-list-item three-line>
            <v-list-item-content>
                <v-simple-table>
                    <tbody>
                    <tr v-for="item in contacts" :key="item.name">
                        <td class="text-left subtitle-2">{{ item.info }}</td>
                        <td class="text-left subtitle-2">{{ item.value }}</td>
                    </tr>
                    <tr>
                        <td class="text-left subtitle-2">Phone No</td>
                        <td class="text-left subtitle-2">
                            <v-text-field
                                    color="black"
                                    clearable
                                    dense
                                    outlined
                                    style="margin-top: 5%"
                                    v-model="phone"
                            ></v-text-field>
                        </td>
                    </tr>
                    <tr>
                      <td class="text-left subtitle-2">Contact Person Name</td>
                      <td class="text-left subtitle-2">
                        <v-text-field
                            color="black"
                            clearable
                            dense
                            outlined
                            style="margin-top: 5%"
                            v-model="contact_person_name"
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                      <td class="text-left subtitle-2">Contact Person Number</td>
                      <td class="text-left subtitle-2">
                        <v-text-field
                            color="black"
                            clearable
                            dense
                            outlined
                            style="margin-top: 5%"
                            v-model="contact_person_number"
                        ></v-text-field>
                      </td>
                    </tr>
                    <tr>
                        <td class="text-left subtitle-2">Residential Area</td>
                        <td class="text-left subtitle-2">
                            <v-textarea
                                    color="black"
                                    clearable
                                    dense
                                    outlined
                                    style="margin-top: 5%"
                                    v-model="address"
                            ></v-textarea>
                        </td>
                    </tr>
                    </tbody>
                </v-simple-table>
            </v-list-item-content>
        </v-list-item>
        <v-card-actions>
          <v-btn color="teal" dark @click="backClicked">
            <v-icon left>far fa-share-square</v-icon>
            <span right>Back</span>
          </v-btn>
            <v-spacer/>
            <v-btn color="teal" dark @click="confirmClicked">
                <v-icon left>mdi-content-save-edit-outline</v-icon>
                <span right>Confirm</span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "EditInfo",
        data: function () {
            return {
                contacts: [
                    {info: 'Name', value: this.$store.getters.getUserName},
                    {info: 'Student Id', value: this.$store.getters.getUserId},
                    {
                        info: 'Level/Term',
                        value: this.$store.getters.getCurrentLevel + '/' + this.$store.getters.getCurrentTerm
                    }
                ],
                phone: this.$store.getters.getPhone,
                contact_person_name: this.$store.getters.getContactPersonName,
                contact_person_number: this.$store.getters.getContactPersonNumber,
                address: this.$store.getters.getAddress
            }
        },
        // mounted(){
        //     this.phone=this.$store.getters.getPhone;
        //     this.email=this.$store.getters.getEmail;
        //     this.address=this.$store.getters.getAddress;
        // },
        methods: {
            async confirmClicked() {
                this.$store.commit('setSpinnerFlag');
                console.log("edit Info clicked");
                let sendObject = {
                    id: this.$store.getters.getUserId,
                    phone: this.phone,
                    contact_person_name:this.contact_person_name,
                    contact_person_number: this.contact_person_number,
                    address: this.address
                };
                console.log('SEND OBJECT: ', sendObject);
                try {
                    console.log("inside try");
                    let response = this.axios.patch('/editInfo', sendObject);
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
          backClicked(){
            this.$router.push('/contact');
          }
        }
    }
</script>

<style scoped>

</style>