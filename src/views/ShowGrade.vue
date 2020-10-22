<template>
  <v-card
          class="mx-auto"
          max-width="1000"
          max-height="700"
  >
    <v-card-text class="black--text font-weight-bold text-center">
      <div>level 1, Term 1, Session 2017-2018</div>
      <div>
        Department of Computer Science and Engineering
      </div>
      <div>Name : Sumaiya Azad</div>
      <div>StudentId : 1705048</div>
    </v-card-text>
    <v-card-actions class="justify-center">
      <v-simple-table
              height="420px"
      >
        <template v-slot:default>

          <thead class="teal" >
          <tr>
            <th v-for="item in headers" class="white--text">{{item}}</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in course" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.credithr }}</td>
            <td>{{item.grade}}</td>
            <td>{{item.grade_point}}</td>
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
            headers: ["COURSE_ID", "TITLE", "CREDIT_HOUR", "GRADE","GRADE_POINT"],
            course: [{id: "CSE300", title: "Technical Writing and Presentation", credithr: "0.75",grade:"A+",grade_point:"4.00"},
              {id: "CSE305", title: "Computer Architecture", credithr: "3.00",grade:"A+",grade_point:"4.00"},
              {id: "CSE306", title: "Computer Architecture Sessional", credithr: "0.75",grade:"A+",grade_point:"4.00"},
              {id: "CSE307", title: "Software Engineering", credithr: "3.00",grade:"A+",grade_point:"4.00"},
              {id: "CSE308", title: "Compiler", credithr: "0.75",grade:"A+",grade_point:"4.00"},
              {id: "CSE309", title: "Compiler Sessional", credithr: "3.00",grade:"A+",grade_point:"4.00"},
              {id: "CSE310", title: "Data Communication", credithr: "0.75",grade:"A+",grade_point:"4.00"},
              {id: "CSE311", title: "Microprocessors, Microcontrollers and Embedded Systems", credithr: "3.00",grade:"A+",grade_point:"4.00"},
              {id: "CSE315",title: "Microprocessors, Microcontrollers and Embedded Systems Sessional",credithr: "3.00",grade:"A+",grade_point:"4.00"}
            ]
          }
        }
    }
</script>

<style scoped>

</style>
