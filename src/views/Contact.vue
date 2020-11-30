<template>
    <v-card
            style="margin-left: 20%;margin-top: 2%;  width: 50%"
            outlined
    >
        <v-list-item three-line>
            <v-list-item-content>
                <v-simple-table >
                        <tbody>
                        <tr v-for="[key,value] in Object.entries(contacts)">
                            <td class="text-left subtitle-2">{{ key }}</td>
                            <td class="text-left subtitle-2">{{ value }}</td>
                        </tr>
                        <tr v-for="[key,value] in Object.entries(edits)" >
                            <td class="text-left subtitle-2">{{ key }}</td>
                            <td class="text-left subtitle-2">{{ value }}</td>
                        </tr>
                        </tbody>
                </v-simple-table>
            </v-list-item-content>
            <v-list-item-avatar
                    tile
                    size="150"
                    color="grey"
            ><v-img :src=$store.getters.getUserImage class="mt-1"/></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
            <v-btn color="teal" dark link to="/editInfo">
                <v-icon left>mdi-pencil-outline</v-icon>
                <span right>Edit Information</span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
    export default {
        name: "Contact",
        data:function () {
            return {
              contacts:
                  {
                    'Name': this.$store.getters.getUserName,
                    'Student Id': this.$store.getters.getUserId,
                    'Level/Term': this.$store.getters.getCurrentLevel + '/' + this.$store.getters.getCurrentTerm
                  },
                edits:[]

            }
        },
        async mounted(){
            console.log("Contact.vue MOUNTED");
            this.$store.commit('setSpinnerFlag');
            console.log("contact Info clicked");

            let sendObject={
                token:this.$store.getters.getToken
            };
            //console.log(sendObject);
            try{
                let response=await this.axios.get('/contactInfo',{params:sendObject});
                console.log("Received data from server is: ",response.data.rows[0]);

                if(response.data.rows.length!=0){
                    console.log('response data row length is not zero');
                    let payload={
                        phone:response.data.rows[0].MOBILE_NUMBER,
                        email:response.data.rows[0].EMAIL,
                        contact_person_name:response.data.rows[0].CONTACT_PERSON_NAME,
                        contact_person_number:response.data.rows[0].CONTACT_PERSON_NUMBER,
                        address:response.data.rows[0].ADDRESS
                    };
                    this.$store.commit('unsetUserInfo');
                    this.$store.commit('setUserInfo',payload);
                    console.log(this.$store.getters.getEmail);
                    this.edits=
                        {'Phone No':this.$store.getters.getPhone,
                        'Email':this.$store.getters.getEmail,
                        'Contact Person Name':this.$store.getters.getContactPersonName,
                        'Contact Person Phone':this.$store.getters.getContactPersonNumber,
                        'Residential Area':this.$store.getters.getAddress}
                }else{
                    console.log('Wrong Information');
                }
            }catch(e){
                
            }finally{
                this.$store.commit('unsetSpinnerFlag');
            }
        },

    }
</script>

<style scoped>

</style>