<template>

  <v-row no-gutters>
    <v-col cols="12" sm="6">
      <v-container
          fluid
          style="width:100%;padding-left:30%"

      >
        <v-card
            class="mx-auto"
            max-width="500"
            height="640"
        >
          <v-toolbar
              color="teal"
              dark
          >
            <v-icon left>mdi-account-convert</v-icon>

            <v-toolbar-title>Student</v-toolbar-title>


          </v-toolbar>

          <v-list>
            <v-list-group
                v-for="item in student"
                :key="item.text"
                :prepend-icon="item.icon"
                color="teal"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </template>
              <v-form v-if="item.text==='Create'" style="margin-left: 5%;margin-right: 5%">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                        v-model="studentId"
                        label="Student Id"
                        color="teal"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                        v-model="studentName"
                        label="Name"
                        color="teal"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                        v-model="dept"
                        :items="deptEngList"
                        label="Departments"
                        color="teal"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                        v-model="term"
                        :items="termList"
                        label="Current Academic Terms"
                        color="teal"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field
                        v-model="adviserId"
                        label="Adviser"
                        color="teal"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field
                        v-model="password"
                        type="password"
                        label="Password"
                        color="teal"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                        v-model="hall"
                        :items="['Ahsanullah','Chatri','Nazrul','Rashid','Sher-e-bangla','Shuhrawardy','Titumir']"
                        label="Hall"
                        color="teal"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-select
                        v-model="hallStatus"
                        :items="['Attached','Resident']"
                        label="Hall Status"
                        color="teal"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-btn color="teal" dark @click="insertStudent">
                  <v-icon left>mdi-cellphone-arrow-down</v-icon>
                  <span right>Insert Student</span>
                </v-btn>
              </v-form>
              <v-form v-if="item.text==='Update Grade'" style="margin-left: 5%;margin-right: 5%">
                <v-text-field
                    v-model="studentId"
                    label="Student Id"
                    color="teal"
                ></v-text-field>
                <v-text-field
                    v-model="termId"
                    label="Term Id"
                    color="teal"
                ></v-text-field>
                <v-text-field
                    v-model="courseId"
                    label="Course Id"
                    color="teal"
                ></v-text-field>
                <v-text-field
                    v-model="courseGrade"
                    label="Grade"
                    color="teal"
                ></v-text-field>
                <v-btn color="teal" dark @click="updateGrade">
                  <v-icon left>mdi-update</v-icon>
                  <span right>Update Grade</span>
                </v-btn>
              </v-form>
              <v-form v-if="item.text==='Delete'" style="margin-left: 5%;margin-right: 5%">
                <v-text-field
                    v-model="studentId"
                    label="Student Id"
                    color="teal"
                ></v-text-field>
                <v-btn color="teal" dark @click="deleteStudent">
                  <v-icon left>mdi-delete-sweep-outline</v-icon>
                  <span right>Delete Student</span>
                </v-btn>
              </v-form>
            </v-list-group>
          </v-list>

        </v-card>

      </v-container>
    </v-col>
    <v-col cols="12" sm="6">
      <v-container
          fluid
          style="width:100%;height:100%; padding-right:30%"

      >
        <v-card
            class="mx-auto"
            max-width="500"
            height="640"
        >
          <v-toolbar
              color="teal"
              dark
          >
            <v-icon left>mdi-teach</v-icon>

            <v-toolbar-title>Teacher</v-toolbar-title>
          </v-toolbar>

          <v-list>
            <v-list-group
                v-for="item in teacher"
                :key="item.text"
                :prepend-icon="item.icon"
                color="teal"
            >
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item-content>
              </template>
              <v-form v-if="item.text==='Create'" style="margin-left: 5%;margin-right: 5%">
                <v-text-field
                    v-model="insId"
                    label="Teacher Id"
                    color="teal"
                ></v-text-field>
                <v-text-field
                    v-model="insName"
                    label="Name"
                    color="teal"
                ></v-text-field>
                <v-select
                    v-model="insDept"
                    :items="deptList"
                    label="Departments"
                    color="teal"
                ></v-select>
                <v-select
                    v-model="insDesignation"
                    :items="['Professor','Associate Professor','Assistant Professor','Lecturer']"
                    label="Designation"
                    color="teal"
                ></v-select>
                <v-btn color="teal" dark @click="insertTeacher">
                  <v-icon left>mdi-cellphone-arrow-down</v-icon>
                  <span right>Insert Teacher</span>
                </v-btn>
              </v-form>
              <v-form v-if="item.text==='Update Designation'" style="margin-left: 5%;margin-right: 5%">
                <v-text-field
                    v-model="insId"
                    label="Teacher Id"
                    color="teal"
                ></v-text-field>
                <v-select
                    v-model="insDesignation"
                    :items="['Professor','Associate Professor','Assistant Professor','Lecturer']"
                    label="Designation"
                    color="teal"
                ></v-select>
                <v-btn color="teal" dark @click="updateDesignation">
                  <v-icon left>mdi-update</v-icon>
                  <span right>Update Designation</span>
                </v-btn>
              </v-form>
              <v-form v-if="item.text==='Delete'" style="margin-left: 5%;margin-right: 5%">
                <v-text-field
                    v-model="insId"
                    label="Teacher Id"
                    color="teal"
                ></v-text-field>
                <v-btn color="teal" dark @click="deleteTeacher">
                  <v-icon left>mdi-delete-sweep-outline</v-icon>
                  <span right>Delete Teacher</span>
                </v-btn>
              </v-form>
            </v-list-group>
          </v-list>
        </v-card>
      </v-container>
    </v-col>
  </v-row>

</template>

<script>
export default {
  name: "Admin",
  data: () => ({
    student: [
      {
        text: 'Create',
        icon: 'mdi-database-plus-outline',
        items: ['id', 'name', 'password', 'dept', 'term', 'ins', 'hall', 'hallStatus']
      },
      {text: 'Update Grade', icon: 'mdi-database-edit-outline', items: ['dept', 'id', 'courseid', 'grade']},
      {text: 'Delete', icon: 'mdi-database-minus-outline', items: ['dept', 'id']},
    ],
    teacher: [
      {text: 'Create', icon: 'mdi-database-plus-outline', items: ['id', 'name', 'dept', 'designation']},
      {text: 'Update Designation', icon: 'mdi-database-edit-outline', items: ['dept', 'id', 'designation']},
      {text: 'Delete', icon: 'mdi-database-minus-outline', items: ['dept', 'id']},
    ],
    studentId: "",
    studentName: "",
    dept: "",
    deptEngList: ['CSE', 'EEE'],
    deptList: ['CSE', 'EEE', 'PHY', 'ENG'],
    term: "",
    termList: ['18-19/1-1', '18-19/1-2'],
    adviserId: "",
    hall: "",
    hallStatus: "",
    password: "",
    termId: "",
    courseId: "",
    courseGrade: "",
    insId: "",
    insName: "",
    insDept: "",
    insDesignation: "",
  }),
  async mounted() {
    this.$store.commit('setSpinnerFlag');
    console.log('admin mounted');
    try {
      let response = await this.axios.get('/admin/depts');
      let response2 = await this.axios.get('/admin/engDepts');
      let response3 = await this.axios.get('/admin/terms');
      //console.log(response.data);
      if (response.data.length != 0) {
        this.deptList = response.data;
        //console.log(this.deptList);
      }
      if (response2.data.length != 0) {
        this.deptEngList = response2.data;
        //console.log(this.deptEngList);
      }
      if (response3.data.length != 0) {
        this.termList = response3.data;
        //console.log(this.termList);
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.$store.commit('unsetSpinnerFlag');
    }
  },
  methods: {
    async insertStudent() {
      this.$store.commit('setSpinnerFlag');
      let sendObject = {
        id: this.studentId,
        name: this.studentName,
        dept: this.dept,
        term: this.term,
        ins: this.adviserId,
        hall: this.hall,
        hallStatus: this.hallStatus,
        password: this.password
      }
      try{
        let response=await this.axios.post('/admin/student',sendObject);
        this.studentId="";
        this.studentName="";
        this.dept="";
        this.term="";
        this.adviserId="";
        this.hall="";
        this.hallStatus="";
        this.password="";
        console.log(response);
      }catch(e){
        console.log(e);
      }finally {
        this.$store.commit('unsetSpinnerFlag');
      }
    },
    async updateGrade() {
      this.$store.commit('setSpinnerFlag');
      let sendObject={
        id:this.studentId,
        term_id:this.termId,
        course_id:this.courseId,
        grade:this.courseGrade
      }
      try{
        let response=await this.axios.patch('/admin/updateGrade',sendObject);
        this.studentId="";
        this.termId="";
        this.courseId="";
        this.courseGrade="";
        console.log(response);
      }catch(e){
        console.log(e);
      }finally {
        this.$store.commit('unsetSpinnerFlag');
      }
    },
    async deleteStudent() {
      this.$store.commit('setSpinnerFlag');
      let sendObject={
        id:this.studentId
      }
      try{
        let response=await this.axios.delete('/admin/student',{data:sendObject});
        this.studentId="";
        console.log(response);
      }catch(e){
        console.log(e);
      }finally {
        this.$store.commit('unsetSpinnerFlag');
      }
    },
    async insertTeacher() {
      this.$store.commit('setSpinnerFlag');
      let sendObject={
        id:this.insId,
        name:this.insName,
        dept:this.insDept,
        designation:this.insDesignation
      }
      try{
          let response=await this.axios.post('/admin/teacher',sendObject);
          this.insId="";
          this.insName="";
          this.insDept="";
          this.insDesignation="";
          console.log(response);
      }catch(e){
          console.log(e);
      }finally {
        this.$store.commit('unsetSpinnerFlag');
      }
    },
    async updateDesignation() {
      this.$store.commit('setSpinnerFlag');
      let sendObject={
        id:this.insId,
        designation: this.insDesignation
      }
      try{
        let response=await this.axios.patch('/admin/updateDesignation',sendObject);
        this.insId="";
        this.insDesignation="";
        console.log(response);
      }catch(e){
        console.log(e);
      }finally {
        this.$store.commit('unsetSpinnerFlag');
      }
    },
    async deleteTeacher() {
      this.$store.commit('setSpinnerFlag');
      let sendObject={
        id:this.insId
      }
      console.log(sendObject);
      try{
        let response=await this.axios.delete('/admin/teacher',{data:sendObject});
        this.insId="";
        this.insDesignation="";
        console.log(response);
      }catch(e){
        console.log(e);
      }finally {
        this.$store.commit('unsetSpinnerFlag');
      }
    }
  }
}

</script>

<style scoped>

</style>