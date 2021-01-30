<template>
    <RegistrationCard>
        <template #intro>
            <div>OFFERED COURSES</div>
            <div>level {{ $store.getters.getCurrentLevel }} Term {{ $store.getters.getCurrentTerm }} Session
                {{ $store.getters.getCurrentSession }}
            </div>
            <div>
                {{ $store.getters.getDept }}
            </div>
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
                <td>{{ item.CREDIT_HOUR }}</td>
                <td>
                    <v-checkbox dense color="teal" v-model="item.select"></v-checkbox>
                </td>
            </tr>
            </tbody>
        </template>
        <template #final>
        <tr>
            <td>Total credit hours in this term</td>
            <td>{{ total_credit_hour }}</td>
            <td></td>
        </tr>
        </template>
        <template #default>
        <!--                <v-spacer/>-->
            <Button icon="far fa-arrow-alt-circle-right" text="Submit" :click="approvalClicked"></Button>
        </template>
    </RegistrationCard>
</template>

<script>


export default {
    name: "Registration",
    data: function () {
        return {
            headers: ["COURSE_ID", "TITLE", "CREDIT_HOUR", "SELECT"],
            total_credit_hour: "",
            course: []
        }
    },
    async mounted() {
        console.log("registration.vue MOUNTED");
        this.$store.commit('setSpinnerFlag');
        let sendObject = {
            token: this.$store.getters.getToken,
            term_id: this.$store.getters.getUserTerm,
            available_dept: this.$store.getters.getUserDeptId
        };
        console.log(sendObject);
        try {
            let response = await this.axios.get('/registration', {params: sendObject});
            console.log("Received data from server is: ", response.data.rows);
            console.log(response.data.registration);
            if (response.data.registration && response.data.rows.length !== 0) {
                this.total_credit_hour = response.data.total_credit_hour;
                response.data.rows.forEach(row => row['select'] = false);
                response.data.rows.forEach(row => this.course.push(row));
                console.log(this.course[0]);
            } else if (!response.data.registration) {
                this.$router.push('/registrationApproval');
            } else {
                console.log('Wrong Information');
            }
        } catch (e) {

        } finally {
            this.$store.commit('unsetSpinnerFlag');
        }
    },
    methods: {
        async approvalClicked() {
            console.log(this.course);
            this.$store.commit('setSpinnerFlag');
            let sendObject = {
                token: this.$store.getters.getToken,
                term_id: this.$store.getters.getUserTerm,
                course_id: []
            };
            this.course.forEach(c => {
                if (c['select'] === true) {
                    sendObject.course_id.push(c['COURSE_ID']);
                }
            });
            console.log(sendObject);
            try {
                let response = await this.axios.post('/insertRegistration', sendObject);

                console.log("Response Status ", response.status);
                this.$router.push('/registrationApproval');
            } catch (e) {

            } finally {
                this.$store.commit('unsetSpinnerFlag');
            }
        }
    }
}
</script>

<style scoped>

</style>
