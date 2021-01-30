<template>
    <AdminCard attribute="student">
        <template #header>
            <v-icon left>mdi-account-convert</v-icon>
            <v-toolbar-title>Student</v-toolbar-title>
        </template>
        <template #create>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model.trim="studentId" label="Student Id" color="teal">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model.trim="studentName" label="Name" color="teal">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model.trim="password" type="password" label="Password" color="teal">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-file-input small-chips multiple prepend-icon="mdi-camera" v-model.trim="studentImage"
                                  label="Student Image" color="teal">
                    </v-file-input>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model.trim="adviserId" label="Adviser Id" color="teal">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select v-model.trim="dept" :items="deptEngList" label="Department" color="teal">
                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-select v-model.trim="term" :items="termList" label="Term" color="teal">
                    </v-select>
                </v-col>
                <v-col cols="12" md="4">
                    <v-select v-model.trim="hall"
                              :items="['Ahsanullah','Chatri','Nazrul','Rashid','Sher-e-bangla','Shuhrawardy','Titumir']"
                              label="Hall" color="teal">
                    </v-select>
                </v-col>
                <v-col cols="12" md="4">
                    <v-select v-model.trim="hallStatus" :items="['Attached','Resident']" label="Hall Status"
                              color="teal">
                    </v-select>
                </v-col>
            </v-row>
            <Button icon="mdi-cellphone-arrow-down" text="Insert Student" :click="insertStudent">
            </Button>
        </template>
        <template #update>
            <v-text-field v-model="studentId" label="Student Id" color="teal">
            </v-text-field>
            <v-text-field v-model="termId" label="Term Id" color="teal">
            </v-text-field>
            <v-text-field v-model="courseId" label="Course Id" color="teal">
            </v-text-field>
            <v-text-field v-model="courseGrade" label="Grade" color="teal">
            </v-text-field>
            <v-card-actions>
                <Button icon="mdi-update" text="Update Grade" :click="updateGrade">
                </Button>
                <v-spacer/>
                <Button icon="far fa-share-square" text="Publish" :click="publish">
                </Button>
            </v-card-actions>
        </template>
        <template #delete>
            <v-text-field v-model="studentId" label="Student Id" color="teal">
            </v-text-field>
            <Button icon="mdi-delete-sweep-outline" text="Delete Student" :click="deleteStudent">
            </Button>
        </template>
    </AdminCard>
</template>

<script>
export default {
    name: "AdminStudent",
    data: () => ({
        studentId: "",
        studentName: "",
        dept: "",
        deptEngList: [],
        term: "",
        termList: [],
        adviserId: "",
        hall: "",
        hallStatus: "",
        password: "",
        termId: "",
        courseId: "",
        courseGrade: "",
        studentImage: null,
    }),
    async mounted() {
        this.$store.commit('setSpinnerFlag');
        this.$store.commit('unsetFlagSignIn');
        console.log('admin mounted');

        try {
            let response2 = await this.axios.get('/admin/engDepts');
            let response3 = await this.axios.get('/admin/terms');
            //console.log(response.data);
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
    methods:{
        async insertStudent() {
            console.log("insert student clicked");
            this.$store.commit('setSpinnerFlag');
            let sendObject = {
                id: this.studentId,
                name: this.studentName,
                dept: this.dept,
                term_id: this.term,
                ins: this.adviserId,
                hall: this.hall,
                hallStatus: this.hallStatus,
                password: this.password,
                studentImage: this.studentImage[0]
            }
            let formData = new FormData();
            for (let item in sendObject) {
                formData.append(item, sendObject[item]);
            }
            try {
                let response = await this.axios.post('/admin/student', formData);
                this.studentId = "";
                this.studentName = "";
                this.dept = "";
                this.term = "";
                this.adviserId = "";
                this.hall = "";
                this.hallStatus = "";
                this.password = "";
                this.studentImage = null;
                console.log(response);
            } catch (e) {
                console.log(e);
            } finally {
                this.$store.commit('unsetSpinnerFlag');
            }

        },
        async updateGrade() {
            this.$store.commit('setSpinnerFlag');
            let sendObject = {
                id: this.studentId,
                term_id: this.termId,
                course_id: this.courseId,
                grade: this.courseGrade
            }
            try {
                let response = await this.axios.patch('/admin/updateGrade', sendObject);
                this.studentId = "";
                this.termId = "";
                this.courseId = "";
                this.courseGrade = "";
                console.log(response);
            } catch (e) {
                console.log(e);
            } finally {
                this.$store.commit('unsetSpinnerFlag');
            }
        },
        async publish() {
            this.$store.commit('setSpinnerFlag');
            try {
                let response = await this.axios.patch('/admin/updatePublish');
                console.log(response);
            } catch (e) {
                console.log(e);
            } finally {
                this.$store.commit('unsetSpinnerFlag');
            }
        },
        async deleteStudent() {
            this.$store.commit('setSpinnerFlag');
            let sendObject = {
                id: this.studentId
            }
            try {
                let response = await this.axios.delete('/admin/student', {data: sendObject});
                this.studentId = "";
                console.log(response);
            } catch (e) {
                console.log(e);
            } finally {
                this.$store.commit('unsetSpinnerFlag');
            }
        }
    }
}
</script>

<style scoped>

</style>