<template>
    <AdminCard attribute="student">
        <template #header>
            <v-icon left>mdi-account-convert</v-icon>
            <v-toolbar-title>Student</v-toolbar-title>
        </template>
        <template #create>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model.trim="studentId" label="Student Id" color="teal"
                                  @blur="$v.studentId.$touch()"
                                  :error="$v.studentId.$error"
                                  :error-messages="$v.studentId.$error?'required':null">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model.trim="studentName" label="Name" color="teal"
                                  @blur="$v.studentName.$touch()"
                                  :error="$v.studentName.$error"
                                  :error-messages="$v.studentName.$error?'required':null">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model.trim="password" type="password" label="Password" color="teal"
                                  @blur="$v.password.$touch()"
                                  :error="$v.password.$error"
                                  :error-messages="$v.password.$error?'required':null">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-file-input small-chips multiple prepend-icon="mdi-camera" v-model="studentImage"
                                  label="Student Image" color="teal"
                                  @blur="$v.studentImage.$touch()"
                                  :error="$v.studentImage.$error"
                                  :error-messages="$v.studentImage.$error?'required':null">
                    </v-file-input>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model.trim="adviserId" label="Adviser Id" color="teal"
                                  @blur="$v.adviserId.$touch()"
                                  :error="$v.adviserId.$error"
                                  :error-messages="$v.adviserId.$error?'required':null">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select v-model.trim="dept" :items="getDeptEngList" label="Department" color="teal"
                              @blur="$v.dept.$touch()"
                              :error="$v.dept.$error"
                              :error-messages="$v.dept.$error?'required':null">
                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" md="4">
                    <v-select v-model.trim="term" :items="getTermList" label="Term" color="teal"
                              @blur="$v.term.$touch()"
                              :error="$v.term.$error"
                              :error-messages="$v.term.$error?'required':null">
                    </v-select>
                </v-col>
                <v-col cols="12" md="4">
                    <v-select v-model.trim="hall"
                              :items="['Ahsanullah','Chatri','Nazrul','Rashid','Sher-e-bangla','Shuhrawardy','Titumir']"
                              label="Hall" color="teal"
                              @blur="$v.hall.$touch()"
                              :error="$v.hall.$error"
                              :error-messages="$v.hall.$error?'required':null">
                    </v-select>
                </v-col>
                <v-col cols="12" md="4">
                    <v-select v-model.trim="hallStatus" :items="['Attached','Resident']" label="Hall Status"
                              color="teal"
                              @blur="$v.hallStatus.$touch()"
                              :error="$v.hallStatus.$error"
                              :error-messages="$v.hallStatus.$error?'required':null">
                    </v-select>
                </v-col>
            </v-row>
            <Button icon="mdi-cellphone-arrow-down" text="Insert Student" :click="insertStudent" :disabled="getSpinnerFlag">
            </Button>
        </template>
        <template #update>
            <v-text-field v-model.trim="ustudentId" label="Student Id" color="teal"
                          @blur="$v.ustudentId.$touch()"
                          :error="$v.ustudentId.$error"
                          :error-messages="$v.ustudentId.$error?'required':null">
            </v-text-field>
            <v-text-field v-model.trim="termId" label="Term Id" color="teal"
                          @blur="$v.termId.$touch()"
                          :error="$v.termId.$error"
                          :error-messages="$v.termId.$error?'required':null">
            </v-text-field>
            <v-text-field v-model.trim="courseId" label="Course Id" color="teal"
                          @blur="$v.courseId.$touch()"
                          :error="$v.courseId.$error"
                          :error-messages="$v.courseId.$error?'required':null">
            </v-text-field>
            <v-text-field v-model.trim="courseGrade" label="Grade" color="teal"
                          @blur="$v.courseGrade.$touch()"
                          :error="$v.courseGrade.$error"
                          :error-messages="$v.courseGrade.$error?'required':null">
            </v-text-field>
            <v-card-actions>
                <Button icon="mdi-update" text="Update Grade" :click="updateGrade" :disabled="getSpinnerFlag">
                </Button>
                <v-spacer/>
                <Button icon="far fa-share-square" text="Publish" :click="publish" :disabled="getSpinnerFlag">
                </Button>
            </v-card-actions>
        </template>
        <template #delete>
            <v-text-field v-model.trim="dstudentId" label="Student Id" color="teal"
                          @blur="$v.dstudentId.$touch()"
                          :error="$v.dstudentId.$error"
                          :error-messages="$v.dstudentId.$error?'required':null">
            </v-text-field>
            <Button icon="mdi-delete-sweep-outline" text="Delete Student" :click="deleteStudent" :disabled="getSpinnerFlag">
            </Button>
        </template>
    </AdminCard>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {required,alphaNum, minLength,} from 'vuelidate/lib/validators'
export default {
    name: "AdminStudent",
    data: () => ({
        studentId: "",
        ustudentId: "",
        dstudentId: "",
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
    validations:{
        studentId:{
            required
        },
        ustudentId:{
            required
        },
        dstudentId:{
            required
        },
        studentName:{
            required,
        },
        dept:{
            required,
        },
        term:{
            required,
        },
        adviserId:{
            required,
        },
        hall:{
            required,
        },
        hallStatus:{
            required,
        },
        password:{
            required,
            alphaNum,
            minLen: minLength(5),
        },
        termId:{
            required,
        },
        courseId:{
            required,
        },
        courseGrade:{
            required,
        },

        studentImage:{
            required,
        }
    },
    async mounted() {
        await this.adminStudent();
        console.log("GET TERM LIST:", this.getTermList);
    },
    computed: {
        ...mapGetters(['getSpinnerFlag']),
        ...mapGetters('admin', ['getDeptEngList', 'getTermList']),
    },
    methods: {
        ...mapActions(['setNotificationTimer']),
        ...mapActions('admin', ['adminStudent', 'adminInsertStudent', 'adminUpdateGrade', 'publish', 'adminDeleteStudent']),
        async insertStudent() {
            console.log("Inside insert student");
            let sendObject = {
                id: this.studentId,
                name: this.studentName,
                dept: this.dept,
                term_id: this.term,
                ins: this.adviserId,
                hall: this.hall,
                hallStatus: this.hallStatus,
                password: this.password,
                studentImage: (this.studentImage ? this.studentImage[0]: null)
            }
            console.log("inside insert student before api call")
            let response = await this.adminInsertStudent(sendObject);
            if (response === 'clear') {
                await this.clear();
            }
        },
        async updateGrade() {
            let sendObject = {
                id: this.ustudentId,
                term_id: this.termId,
                course_id: this.courseId,
                grade: this.courseGrade
            }
            let response = await this.adminUpdateGrade(sendObject);
            if (response === 'clear') {
                await this.clear();
            }
        },
        async deleteStudent() {

            let sendObject = {
                id: this.dstudentId
            }
            let response = await this.adminDeleteStudent(sendObject);
            if (response === 'clear') {
                await this.clear();
            }
        },
        async clear() {
            await this.setNotificationTimer();
            this.studentId = "";
            this.ustudentId = "";
            this.dstudentId = "";
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
            this.$v.$reset();
        }
    }
}
</script>

<style scoped>

</style>