<template>
    <v-card
            style="margin-left: 20%;margin-top: 2%;  width: 50%"
            outlined
    >
        <v-list-item three-line>
            <v-list-item-content>
                <v-simple-table>
                    <tbody>
                    <tr v-for="[key,value] in Object.entries(contacts)" >
                        <td class="text-left subtitle-2">{{ key }}</td>
                        <td class="text-left subtitle-2">{{ value }}</td>
                    </tr>
                    <tr v-for="[key,value] in Object.entries(edits)" >
                      <td class="text-left subtitle-2">{{ key }}</td>
                      <td class="text-left subtitle-2" ><v-text-field
                                                            color="black"
                                                            clearable
                                                            dense
                                                            outlined
                                                            style="margin-top: 5%"
                                                            v-model="edits[key]"
                                                    ></v-text-field>
                      </td>
                    </tr>
<!--                    <tr>-->
<!--                        <td class="text-left subtitle-2">Phone No</td>-->
<!--                        <td class="text-left subtitle-2">-->
<!--                            <v-text-field-->
<!--                                    color="black"-->
<!--                                    clearable-->
<!--                                    dense-->
<!--                                    outlined-->
<!--                                    style="margin-top: 5%"-->
<!--                                    v-model="phone"-->
<!--                            ></v-text-field>-->
<!--                        </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                      <td class="text-left subtitle-2">Email</td>-->
<!--                      <td class="text-left subtitle-2">-->
<!--                        <v-text-field-->
<!--                            color="black"-->
<!--                            clearable-->
<!--                            dense-->
<!--                            outlined-->
<!--                            style="margin-top: 5%"-->
<!--                            v-model="email"-->
<!--                        ></v-text-field>-->
<!--                      </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                      <td class="text-left subtitle-2">Contact Person Name</td>-->
<!--                      <td class="text-left subtitle-2">-->
<!--                        <v-text-field-->
<!--                            color="black"-->
<!--                            clearable-->
<!--                            dense-->
<!--                            outlined-->
<!--                            style="margin-top: 5%"-->
<!--                            v-model="contact_person_name"-->
<!--                        ></v-text-field>-->
<!--                      </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                      <td class="text-left subtitle-2">Contact Person Number</td>-->
<!--                      <td class="text-left subtitle-2">-->
<!--                        <v-text-field-->
<!--                            color="black"-->
<!--                            clearable-->
<!--                            dense-->
<!--                            outlined-->
<!--                            style="margin-top: 5%"-->
<!--                            v-model="contact_person_number"-->
<!--                        ></v-text-field>-->
<!--                      </td>-->
<!--                    </tr>-->
<!--                    <tr>-->
<!--                        <td class="text-left subtitle-2">Residential Area</td>-->
<!--                        <td class="text-left subtitle-2">-->
<!--                            <v-textarea-->
<!--                                    color="black"-->
<!--                                    clearable-->
<!--                                    dense-->
<!--                                    outlined-->
<!--                                    style="margin-top: 5%"-->
<!--                                    v-model="address"-->
<!--                            ></v-textarea>-->
<!--                        </td>-->
<!--                    </tr>-->
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
                contacts:
                    {
                      'Name': this.$store.getters.getUserName,
                      'Student Id': this.$store.getters.getUserId,
                      'Level/Term': this.$store.getters.getCurrentLevel + '/' + this.$store.getters.getCurrentTerm
                    },
                edits:{'Phone No':this.$store.getters.getPhone,
                  'Email':this.$store.getters.getEmail,
                  'Contact Person Name':this.$store.getters.getContactPersonName,
                  'Contact Person Phone':this.$store.getters.getContactPersonNumber,
                  'Residential Area':this.$store.getters.getAddress}
            }
        },
        methods: {
            async confirmClicked() {
                this.$store.commit('setSpinnerFlag');
                console.log("edit Info clicked");
                let sendObject = {
                    token:this.$store.getters.getToken,
                    phone: this.edits['Phone No'],
                    email:this.edits['Email'],
                    contact_person_name:this.edits['Contact Person Name'],
                    contact_person_number: this.edits['Contact Person Phone'],
                    address: this.edits['Residential Area']
                };
                console.log('SEND OBJECT: ', sendObject);
                try {
                    console.log("inside try");
                    let response =await this.axios.patch('/editInfo', sendObject);
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
    /*

    person={
    name: Taaha,
    addess: shiddheswari
    }

    person=[{info:name, value: Taaha},{info: address, value: shiddhwarai}]

     */

    /*






     */
</script>

<style scoped>

</style>