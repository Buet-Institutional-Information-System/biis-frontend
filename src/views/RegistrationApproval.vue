<template>
    <RegistrationCard>
        <template #intro>
            <div>REGISTERED COURSES</div>
            <div>level {{ $store.getters.getCurrentLevel }} Term {{ $store.getters.getCurrentTerm }} Session
                {{ $store.getters.getCurrentSession }}
            </div>
            <div>
                {{ $store.getters.getDept }}
            </div>
            <div>Name : {{ $store.getters.getUserName }}</div>
            <div>StudentId : {{ $store.getters.getUserId }}</div>
        </template>
        <template #description>
            <thead>
            <tr>
                <th v-for="item in headers" class="teal white--text">{{ item }}</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in course" :key="item.id">
                <td>{{ item.COURSE_ID }}</td>
                <td>{{ item.COURSE_TITLE }}</td>
                <td>{{ (item.CREDIT_HOUR).toFixed(1) }}</td>
            </tr>
            </tbody>
        </template>
        <template #final>
            <tr>
                <td>Registered credit hours in this term</td>
                <td>{{ (registered_credit_hours_this_term).toFixed(2)  }}</td>
                <td></td>
            </tr>
            <tr>
                <td>Credit hours earned upto this term</td>
                <td>{{ (credit_hours_upto_this_term).toFixed(2)  }}</td>
                <td></td>
            </tr>
        </template>
        <template #default>
        </template>
    </RegistrationCard>
</template>


<script>
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
    async mounted() {
        console.log("registrationApproval.vue MOUNTED");
        this.$store.commit('setSpinnerFlag');
        let sendObject = {
            token: this.$store.getters.getToken,
            term_id: this.$store.getters.getUserTerm
        };
        console.log(sendObject);
        try {
            let response = await this.axios.get('/registrationApproval', {params: sendObject});
            console.log("Received data from server is: ", response.data);
            this.registered_credit_hours_this_term = response.data.registered_credit_hours;
            this.credit_hours_upto_this_term = response.data.credit_hours_earned;
            if (this.registered_credit_hours_this_term === null) {
                this.registered_credit_hours_this_term = 0;
            }
            if (this.credit_hours_upto_this_term === null) {
                this.credit_hours_upto_this_term = 0;
            }
            if (response.data.rows.length !== 0) {
                response.data.rows.forEach(row => this.course.push(row));
            } else {
                console.log('Wrong Information');
            }
        } catch (e) {

        } finally {
            this.$store.commit('unsetSpinnerFlag');
        }
    }
}
</script>

<style scoped>

</style>
