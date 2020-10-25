<template>
    <v-card
            style="margin-left: 20%;margin-top: 2%; height: 50%; width: 50%"
            class="v-card--hover "
    >
        <v-card-text>
            <v-card-title class="display-1 text--primary">
                View • Grade
            </v-card-title>

            <v-card-actions>
                <v-select
                        v-model="select"
                        color="black"
                        item-color="teal"
                        :items="items"
                        label="Select Level/Term"
                        outlined
                        rounded
                        required
                ></v-select>
            </v-card-actions>
        </v-card-text>
        <v-card-actions>

                <v-spacer />
                <v-btn color="teal" dark @click=showGrade>
                    <v-icon left>mdi-school-outline</v-icon>
                    <span right>Show Grade</span>
                </v-btn>

        </v-card-actions>
    </v-card>
</template>
<script>
    export default {
        name: "ViewGrade",
        data:function () {
            return {
                items:[],
                error:"Select an option",
                select:""
            }
        },
      async mounted(){
        console.log("viewgrade.vue MOUNTED");
        this.$store.commit('setSpinnerFlag');
        console.log("grade clicked");

        let sendObject={
          id:this.$store.getters.getUserId
        };
        //console.log(sendObject);
        try{
          let response=await this.axios.get(`/viewGrade/${sendObject.id}`);
          console.log("Received data from server is: ",response.data.rows[0]);

          if(response.data.rows.length!=0){
            console.log('response data row length is not zero');
            response.data.rows.forEach(row => this.items.push('20'+row["TERM_ID"].slice(0,3)+'20'+row["TERM_ID"].slice(3,)));
            console.log(this.items);
          }else{
            console.log('Wrong Information');
          }
        }catch(e){

        }finally{
          this.$store.commit('unsetSpinnerFlag');
        }
      },
        methods:{
            showGrade(){
                this.$router.push({name: 'ShowGrade', params: {academic_term: this.select}});
            }
        }
    }
</script>

<style scoped>

</style>