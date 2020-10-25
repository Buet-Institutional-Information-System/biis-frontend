<template>
  <v-card
      class="mx-auto"
      max-width="1000"
      max-height="700"
  >
    <v-card-text class="black--text font-weight-bold text-center">
      <div>level {{this.$route.params.academic_term.slice(10,11)}}  Term {{this.$route.params.academic_term.slice(12,13)}}  Session {{this.$route.params.academic_term.slice(0,9)}}</div>
      <div>
        {{this.$store.getters.getDept}}
      </div>
      <div>Name : {{this.$store.getters.getUserName}}</div>
      <div>StudentId : {{this.$store.getters.getUserId}}</div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-simple-table
          height="430px"
          fixed-header
      >
        <template v-slot:default>
          <thead>
          <tr>
            <th v-for="item in headers" class="teal white--text" >{{ item }}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in course" :key="item.id">
            <td>{{ item.COURSE_ID }}</td>
            <td>{{ item.COURSE_TITLE }}</td>
            <td>{{ item.CREDIT_HOUR }}</td>
            <td>{{ item.OBTAINED_GRADE }}</td>
            <td>{{ item.OBTAINED_GRADE_POINT }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card-actions>
    <v-card-actions class="font-weight-medium justify-center">
      <v-simple-table dense>
        <tr>
          <td>GPA</td>
          <td>19.5</td>
          <td></td>
        </tr>
        <tr>
          <td>Registered credit hours in this term</td>
          <td>19.5</td>
          <td></td>
        </tr>
        <tr>
          <td>Credit hours earned in this term</td>
          <td>19.5</td>
          <td></td>
        </tr>
        <tr>
          <td>Total Credit hours</td>
          <td>19.5</td>
          <td></td>
        </tr>
        <tr>
          <td>CGPA</td>
          <td>19.5</td>
          <td></td>
        </tr>
      </v-simple-table>
                </v-card-actions>
              </v-card>
            </template>

            <script>
            export default {
              name: "Registration",
              data: function () {
                return {
                  headers: ["COURSE_ID", "TITLE", "CREDIT_HOUR", "GRADE", "GRADE_POINT"],
                  course: []
                }
              },
              async mounted() {
                console.log(this.$route.params.academic_term);
                console.log("showgrade.vue MOUNTED");
                this.$store.commit('setSpinnerFlag');

                let sendObject={
                  id:this.$store.getters.getUserId,
                  term_id:this.$route.params.academic_term.slice(2,5)+this.$route.params.academic_term.slice(7,)
                };
                console.log(sendObject);
                try{
                  let response=await this.axios.get('/showGrade',{params:sendObject});
                  console.log("Received data from server is: ",response.data.rows);

                  if(response.data.rows.length!=0){
                    console.log('response data row length is not zero');
                    response.data.rows.forEach(row => this.course.push(row));
                  }else{
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
