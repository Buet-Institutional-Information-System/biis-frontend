<template>
    <RegistrationCard>
        <template #intro>
            <div>OFFERED COURSES</div>
            <div>level {{ getCurrentLevel }} Term {{getCurrentTerm }} Session
                {{ getCurrentSession }}
            </div>
            <div>
                {{ getDept }}
            </div>
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
                <td>{{ (parseFloat(item.CREDIT_HOUR)).toFixed(1)  }}</td>
                <td>
                    <v-checkbox dense color="teal" v-model.trim="item.select"></v-checkbox>
                </td>
            </tr>
            </tbody>
        </template>
        <template #final>
        <tr>
            <td>Total credit hours in this term </td>
            <td >{{ (parseFloat(getTotalCreditHours)).toFixed(2)  }}</td>
            <td></td>
        </tr>
        </template>
        <template #default>
        <!--                <v-spacer/>-->
            <Button icon="far fa-arrow-alt-circle-right" text="Submit" :click="approvalClicked" :disabled="course_id_length===0 || getSpinnerFlag"></Button>
        </template>
    </RegistrationCard>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
    name: "Registration",
    data: function () {
        return {
            headers: ["COURSE_ID", "TITLE", "CREDIT_HOUR", "SELECT"],
            status:null,
            course_id:[]
        }
    },
    computed:{
        ...mapGetters(['getSpinnerFlag']),
      ...mapGetters('student',['getCurrentLevel','getCurrentTerm','getCurrentSession','getDept','getTotalCreditHours','getCourses']),
        course_id_length:function(){
            this.course_id=[];
            this.getCourses.forEach(c => {
                if (c['select'] === true) {
                    this.course_id.push(c['COURSE_ID']);
                }
            });
            return this.course_id.length
        }
    },
    async mounted() {
        await this.registration();
    },
    methods: {
        ...mapActions(['setNotificationTimer']),
        ...mapActions('student',['registration','registrationSubmitClicked']),
        async approvalClicked(){
            console.log("inside registartionApprovalClicked getCourses: ",this.getCourses);
            console.log("inside registartionApprovalClicked course_id: ",this.course_id);
            console.log("inside registartionApprovalClicked course_id_length: ",this.course_id_length);
            this.status = await this.registrationSubmitClicked(this.course_id);
            if(this.status===200){
                await this.setNotificationTimer();
            }
        }
    }
}
</script>

<style scoped>

</style>
