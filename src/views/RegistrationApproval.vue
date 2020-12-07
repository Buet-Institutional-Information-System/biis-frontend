<template>
  <v-card
          class="mx-auto"
          max-width="1000"
          max-height="700"
  >
    <v-card-text class="black--text font-weight-bold text-center">
      <div>REGISTERED COURSES</div>
      <div>level {{this.$store.getters.getCurrentLevel}}  Term {{this.$store.getters.getCurrentTerm}}  Session {{this.$store.getters.getCurrentSession}}</div>
      <div>
        {{this.$store.getters.getDept}}
      </div>
      <div>Name : {{this.$store.getters.getUserName}}</div>
      <div>StudentId : {{this.$store.getters.getUserId}}</div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-simple-table
              height="470px"
              fixed-header
      >
        <template v-slot:default>

          <thead >
          <tr>
            <th v-for="item in headers" class="teal white--text">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in course" :key="item.id">
            <td>{{ item.COURSE_ID }}</td>
            <td>{{ item.COURSE_TITLE}}</td>
            <td>{{ item.CREDIT_HOUR }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-actions>
    <v-card-actions class="font-weight-medium justify-center">
      <v-simple-table dense>
        <tr>
          <td>Registered credit hours in this term</td>
          <td>{{registered_credit_hours_this_term}}</td>
          <td></td>
        </tr>
        <tr>
          <td>Credit hours earned upto this term</td>
          <td>{{credit_hours_upto_this_term}}</td>
          <td></td>
        </tr>
      </v-simple-table>
    </v-card-actions>
  </v-card>
</template>


<script>
    export default {
        name: "RegistrationApproval",
        data: function () {
          return {
            headers: ["COURSE_ID", "TITLE", "CREDIT_HOUR"],
            course: [],
            credit_hours_upto_this_term:"",
            registered_credit_hours_this_term:""
          }
        },
      async mounted(){
        console.log("registrationApproval.vue MOUNTED");
        this.$store.commit('setSpinnerFlag');
        let sendObject={
          token:this.$store.getters.getToken,
          term_id:this.$store.getters.getUserTerm
        };
        console.log(sendObject);
        try{
          let response=await this.axios.get('/registrationApproval',{params:sendObject});
          console.log("Received data from server is: ",response.data);
          this.registered_credit_hours_this_term=response.data.registered_credit_hours;
          this.credit_hours_upto_this_term=response.data.credit_hours_earned;
          if(this.registered_credit_hours_this_term===null){
              this.registered_credit_hours_this_term=0;
          }
          if(this.credit_hours_upto_this_term===null){
                this.credit_hours_upto_this_term=0;
          }
          if(response.data.rows.length!==0){
            response.data.rows.forEach(row => this.course.push(row));
          }else {
            console.log('Wrong Information');
          }
        }catch(e){

        }finally{
          this.$store.commit('unsetSpinnerFlag');
        }
      }
    }
</script>

<style scoped>

</style>
