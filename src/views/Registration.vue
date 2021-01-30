<template>
    <v-card class="mx-auto" max-width="1000">
        <v-card-text class="black--text font-weight-bold text-center">
          <div>OFFERED COURSES</div>
            <div>level {{this.$store.getters.getCurrentLevel}}  Term {{this.$store.getters.getCurrentTerm}}  Session {{this.$store.getters.getCurrentSession}}</div>
            <div>
                {{this.$store.getters.getDept}}
            </div>
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-simple-table  height="480" fixed-header>
                <template v-slot:default>
                    <thead >
                    <tr>
                        <th v-for="item in headers" class="teal white--text">{{item}}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in course" :key="item.id">
                        <td>{{ item.COURSE_ID }}</td>
                        <td>{{ item.COURSE_TITLE }}</td>
                        <td>{{ item.CREDIT_HOUR }}</td>
                        <td>
                            <v-checkbox dense color="teal" v-model="item.select"></v-checkbox>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-actions>
        <v-card-actions class="font-weight-medium justify-center">
            <v-simple-table dense>
                <tr>
                    <td>Total credit hours in this term</td>
                    <td>{{total_credit_hour}}</td>
                    <td></td>
                </tr>
            </v-simple-table>
        </v-card-actions>
        <v-card-actions class="justify-center">
            <!--                <v-spacer/>-->
            <v-btn color="teal" dark  @click="approvalClicked">
                <v-icon left>far fa-arrow-alt-circle-right</v-icon>
                <span right>Submit</span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>


    export default {
        name: "Registration",
        data: function () {
            return {
                headers: ["COURSE_ID", "TITLE", "CREDIT_HOUR","SELECT"],
                total_credit_hour:"",
                course: []
            }
        },
      async mounted(){
        console.log("registration.vue MOUNTED");
        this.$store.commit('setSpinnerFlag');
        let sendObject={
          token:this.$store.getters.getToken,
          term_id:this.$store.getters.getUserTerm,
          available_dept:this.$store.getters.getUserDeptId
        };
        console.log(sendObject);
        try{
          let response=await this.axios.get('/registration',{params:sendObject});
          console.log("Received data from server is: ",response.data.rows);
          console.log(response.data.registration);
          if(response.data.registration && response.data.rows.length!==0){
            this.total_credit_hour=response.data.total_credit_hour;
            response.data.rows.forEach(row => row['select']=false);
            response.data.rows.forEach(row => this.course.push(row));
            console.log(this.course[0]);
          }else if(!response.data.registration){
              this.$router.push('/registrationApproval');
          } else {
            console.log('Wrong Information');
          }
        }catch(e){

        }finally{
          this.$store.commit('unsetSpinnerFlag');
        }
      },
        methods: {
            async approvalClicked() {
                console.log(this.course);
              this.$store.commit('setSpinnerFlag');
              let sendObject={
                token:this.$store.getters.getToken,
                term_id:this.$store.getters.getUserTerm,
                course_id:[]
              };
              this.course.forEach(c => {
                if (c['select']===true){
                  sendObject.course_id.push(c['COURSE_ID']);
                }
              });
              console.log(sendObject);
              try{
                let response=await this.axios.post('/insertRegistration',sendObject);

                console.log("Response Status ",response.status);
                this.$router.push('/registrationApproval');
              }catch(e){

              }finally {
                this.$store.commit('unsetSpinnerFlag');
              }
            }
        }
    }
</script>

<style scoped>

</style>
