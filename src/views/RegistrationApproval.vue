<template>
    <RegistrationCard>
        <template #intro>
            <div>REGISTERED COURSES</div>
            <div>level {{ getCurrentLevel }} Term {{ getCurrentTerm }} Session
                {{ getCurrentSession }}
            </div>
            <div>
                {{ getDept }}
            </div>
            <div>Name : {{ getUserName }}</div>
            <div>StudentId : {{ getUserId }}</div>
        </template>
        <template #description>
            <thead>
            <tr>
                <th v-for="item in headers" class="teal white--text">{{ item }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in getCourses" :key="item.id">
                <td>{{ item.COURSE_ID }}</td>
                <td>{{ item.COURSE_TITLE }}</td>
                <td>{{ (parseFloat(item.CREDIT_HOUR)).toFixed(1) }}</td>
            </tr>
            </tbody>
        </template>
        <template #final>
            <tr>
                <td>Registered credit hours in this term</td>
                <td>{{ (parseFloat(getRegisteredCreditHours)).toFixed(2)  }}</td>
                <td></td>
            </tr>
            <tr>
                <td>Credit hours earned upto this term</td>
                <td>{{ (parseFloat(getCreditHoursEarnedUptoThisTerm)).toFixed(2)  }}</td>
                <td></td>
            </tr>
        </template>
        <template #default>
        </template>
    </RegistrationCard>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    name: "RegistrationApproval",
    data: function () {
        return {
            headers: ["COURSE_ID", "TITLE", "CREDIT_HOUR"],
            course: [],
            credit_hours_upto_this_term: "",
            registered_credit_hours_this_term: ""
        }
    },
    computed:{
      ...mapGetters('student',['getDept','getCurrentLevel','getCurrentTerm','getCurrentSession','getUserName','getUserId','getCreditHoursEarnedUptoThisTerm','getRegisteredCreditHours','getCourses'])
    },
    async mounted() {
        await this.registrationApproval();
    },
    methods:{
        ...mapActions('student',['registrationApproval'])
    }
}
</script>

<style scoped>

</style>
