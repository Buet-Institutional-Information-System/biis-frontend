<template>
  <v-card
          class="mx-auto"
          max-width="1000"
          max-height="700"
  >
    <v-card-text class="black--text font-weight-bold text-center">
      <div>REGISTERED COURSES</div>
      <div>level 1, Term 1, Session 2017-2018</div>
      <div>
        Department of Computer Science and Engineering
      </div>
      <div>Name : Sumaiya Azad</div>
      <div>StudentId : 1705048</div>
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
          <td>19.5</td>
          <td></td>
        </tr>
        <tr>
          <td>Credit hours earned upto this term</td>
          <td>19.5</td>
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
            course: []
          }
        },
      async mounted(){
        console.log("registration.vue MOUNTED");
        this.$store.commit('setSpinnerFlag');
        let sendObject={
          id:this.$store.getters.getUserId,
          term_id:this.$store.getters.getUserTerm
        };
        console.log(sendObject);
        try{
          let response=await this.axios.get('/registration',{params:sendObject});
          console.log("Received data from server is: ",response.data.rows);
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
