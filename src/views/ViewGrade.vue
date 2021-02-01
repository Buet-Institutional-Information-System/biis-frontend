<template>
    <Card>
        <template #cardText>
            <v-card-title class="display-1 text--primary" v-if="getShowFlag">
                View • Grade
            </v-card-title>
            <v-card-title class="display-1 text--primary" v-else>
                No • Grade • Available
            </v-card-title>
            <v-card-actions style="padding-top: 5%">
                <v-select v-if="getShowFlag" v-model="select" color="black" item-color="teal" :items="getGradeTermList" label="Select Level/Term" outlined rounded required>
                </v-select>
            </v-card-actions>
        </template>
        <template #cardAction>
            <v-spacer/>
            <Button icon="mdi-school-outline" text="Show Grade" :click="showGrade" v-if="getShowFlag" style="margin-right: 40%;"></Button>
        </template>
    </Card>
</template>
<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    name: "ViewGrade",
    data: function () {
        return {
            error: "Select an option",
            select: null
        }
    },
    computed:{
      ...mapGetters('student',['getGradeTermList','getShowFlag'])
    },
    async mounted() {
        await this.viewGrade();
    },
    methods: {
        ...mapActions('student',['gotoShowGrade','viewGrade']),
        async showGrade() {
            if (this.select !== null) {
                await this.gotoShowGrade({academic_term: this.select});
            }
            else{
                console.log("viewGrade didnot selected an option, error: ",this.error);
            }
        }
    }
}
</script>

<style scoped>



</style>