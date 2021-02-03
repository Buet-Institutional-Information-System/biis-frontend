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
                    <v-select v-model.trim="dept" :items="getDeptEngList" label="Department" color="teal">
                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-select v-model.trim="term" :items="getTermList" label="Term" color="teal">
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
            <v-text-field v-model.trim="studentId" label="Student Id" color="teal">
            </v-text-field>
            <v-text-field v-model.trim="termId" label="Term Id" color="teal">
            </v-text-field>
            <v-text-field v-model.trim="courseId" label="Course Id" color="teal">
            </v-text-field>
            <v-text-field v-model.trim="courseGrade" label="Grade" color="teal">
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
            <v-text-field v-model.trim="studentId" label="Student Id" color="teal">
            </v-text-field>
            <Button icon="mdi-delete-sweep-outline" text="Delete Student" :click="deleteStudent">
            </Button>
        </template>
    </AdminCard>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    name: "AdminStudent",
    data: () => ({
        studentId: "",
        studentName: "",
        dept: "",
        term: "",
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
        await this.adminStudent();
    },
    computed: {
        ...mapGetters('admin', ['getDeptEngList', 'getTermList']),
    },
    methods: {
        ...mapActions('admin', ['adminStudent', 'adminInsertStudent', 'adminUpdateGrade', 'publish', 'adminDeleteStudent']),
        async insertStudent() {
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
            let response = await this.adminInsertStudent(sendObject);
            if (response === 'clear') {
                this.clear();
            }
        },
        async updateGrade() {
            let sendObject = {
                id: this.studentId,
                term_id: this.termId,
                course_id: this.courseId,
                grade: this.courseGrade
            }
            let response = await this.adminUpdateGrade(sendObject);
            if (response === 'clear') {
                this.clear();
            }
        },
        async deleteStudent() {

            let sendObject = {
                id: this.studentId
            }
            let response = await this.adminDeleteStudent(sendObject);
            if (response === 'clear') {
                this.clear();
            }
        },
        clear() {
            this.studentId = "";
            this.studentName = "";
            this.dept = "";
            this.term = "";
            this.adviserId = "";
            this.hall = "";
            this.hallStatus = "";
            this.password = "";
            this.termId = "";
            this.courseId = "";
            this.courseGrade = "";
            this.studentImage = null;
        }
    }
}
</script>

<style scoped>

</style>