<template>
    <v-card
            style="margin-left: 20%;margin-top: 2%;  width: 50%"
            outlined
    >
        <v-list-item three-line>
            <v-list-item-content>
                <v-simple-table >
                        <tbody>
                        <tr v-for="item in contacts" :key="item.name">
                            <td class="text-left subtitle-2">{{ item.info }}</td>
                            <td class="text-left subtitle-2">{{ item.value }}</td>
                        </tr>
                        <tr v-for="item in edits" :key="item.name">
                            <td class="text-left subtitle-2">{{ item.info }}</td>
                            <td class="text-left subtitle-2">{{ item.value }}</td>
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
                contacts:[
                    {info:'Name',value:this.$store.getters.getUserName},
                    {info:'Student Id',value:this.$store.getters.getUserId},
                    {info:'Level/Term',value:this.$store.getters.getCurrentLevel+'/'+this.$store.getters.getCurrentTerm},
                    {info:'BankAccount No',value:this.$store.getters.getBankAccountNo}
                ],
                edits:[]

            }
        },
        async mounted(){
            console.log("Contact.vue MOUNTED");
            this.$store.commit('setSpinnerFlag');
            console.log("contact Info clicked");

            let sendObject={
                id:this.$store.getters.getUserId
            };
            //console.log(sendObject);
            try{
                let response=await this.axios.get(`/contactInfo/${sendObject.id}`);
                console.log("Received data from server is: ",response.data.rows[0]);

                if(response.data.rows.length!=0){
                    console.log('response data row length is not zero');
                    let payload={
                        phone:response.data.rows[0].PHONE,
                        email:response.data.rows[0].EMAIL,
                        address:response.data.rows[0].ADDRESS
                    };
                    this.$store.commit('unsetUserInfo');
                    this.$store.commit('setUserInfo',payload);
                    this.edits=[
                        {info:'Phone No',value:this.$store.getters.getPhone},
                        {info:'Email Address',value:this.$store.getters.getEmail},
                        {info:'Residential Area',value:this.$store.getters.getAddress}
                    ]
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