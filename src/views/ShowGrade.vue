<template>
    <RegistrationCard>
    <template #intro v-if="this.$route.params.academic_term">
            <div>level {{ $route.params.academic_term.slice(10, 11) }} Term
                {{ $route.params.academic_term.slice(12, 13) }} Session
                {{ $route.params.academic_term.slice(0, 9) }}
            </div>
            <div>
                {{getDept }}
            </div>
            <div>Name : {{getUserName }}</div>
            <div>StudentId : {{getUserId }}</div>
        </template>
        <template #description>
                    <thead>
                    <tr>
                        <th v-for="item in headers" class="teal white--text">{{ item }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in getCourses" :key="item.id">
                        <td>{{ item.course_id }}</td>
                        <td>{{ item.course_title}}</td>
                        <td>{{ (item.credit_hour).toFixed(2)  }}</td>
                        <td>{{ item.obtained_grade }}</td>
                        <td>{{ (item.obtained_grade_point).toFixed(2)  }}</td>
                    </tr>
                    </tbody>
                </template>
        <template #final>
                <tr>
                    <td>GPA</td>
                    <td>{{ (parseFloat(getGPA)).toFixed(2)  }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Registered credit hours in this term</td>
                    <td>{{ (parseFloat(getRegisteredCreditHours)).toFixed(2)  }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Credit hours earned in this term</td>
                    <td>{{ (parseFloat(getEarnedCreditHoursThisTerm)).toFixed(2)  }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>Total Credit hours</td>
                    <td>{{ (parseFloat(getTotalCreditHours)).toFixed(2)  }}</td>
                    <td></td>
                </tr>
                <tr>
                    <td>CGPA</td>
                    <td>{{ (parseFloat(getCGPA)).toFixed(2)  }}</td>
                    <td></td>
                </tr>
        </template>
    <template #default>
    </template>
    </RegistrationCard>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    name: "ShowGrade",
    data: function () {
        return {
            headers: ["COURSE_ID", "TITLE", "CREDIT_HOUR", "GRADE", "GRADE_POINT"],
        }
    },
    computed:{
        ...mapGetters('student',['getUserName','getUserId','getDept','getCourses','getRegisteredCreditHours','getEarnedCreditHoursThisTerm','getTotalCreditHours','getGPA','getCGPA'])
    },
    async mounted() {
        if (this.$route.params.academic_term === undefined) {
            await this.gotoViewGrade();
            return;
        }
        console.log("show grade $route.params.academic_term from viewGrade: ",this.$route.params.academic_term);
        await this.showGrade({term_id: this.$route.params.academic_term.slice(2, 5) + this.$route.params.academic_term.slice(7,)})
    },
    methods:{
        ...mapActions('student',['gotoViewGrade','showGrade'])
    }
}
</script>

<style scoped>

</style>
