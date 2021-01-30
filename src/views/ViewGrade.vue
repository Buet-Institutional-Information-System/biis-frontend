<template>
    <Card>
        <template #cardText>
            <v-card-title class="display-1 text--primary" v-if="show">
                View • Grade
            </v-card-title>
            <v-card-title class="display-1 text--primary" v-else>
                No • Grade • Available
            </v-card-title>
            <v-card-actions style="padding-top: 5%">
                <v-select v-if="show" v-model="select" color="black" item-color="teal" :items="items" label="Select Level/Term" outlined rounded required>
                </v-select>
            </v-card-actions>
        </template>
        <template #cardAction>
            <v-spacer/>
            <Button icon="mdi-school-outline" text="Show Grade" :click="showGrade" v-if="show" style="margin-right: 40%;"></Button>
        </template>
    </Card>
</template>
<script>
export default {
    name: "ViewGrade",
    data: function () {
        return {
            items: [],
            error: "Select an option",
            select: null,
            show: true
        }
    },
    async mounted() {
        console.log("viewgrade.vue MOUNTED");
        this.$store.commit('setSpinnerFlag');
        console.log("grade clicked");

        let sendObject = {
            token: this.$store.getters.getToken
        };
        //console.log(sendObject);
        try {
            let response = await this.axios.get('/viewGrade', {params: sendObject});
            console.log("Received data from server is: ", response.data.rows[0]);

            if (response.data.rows.length != 0) {
                console.log('response data row length is not zero', response.data.rows);
                response.data.rows.forEach(row => this.items.push('20' + row.slice(0, 3) + '20' + row.slice(3,)));
                console.log('this.items: ', this.items);
            } else {
                this.show = false;
            }
        } catch (e) {
            console.log("error view grade ", e);
        } finally {
            this.$store.commit('unsetSpinnerFlag');
        }
    },
    methods: {
        showGrade() {
            if (this.select !== null) {
                this.$router.push({name: 'ShowGrade', params: {academic_term: this.select}});
            }

        }
    }
}
</script>

<style scoped>



</style>