<template>
    <v-card
            style="margin-left: 20%;margin-top: 2%; height: 50%; width: 50%"
            class="v-card--hover "
    >
        <v-card-text>
            <v-card-title class="display-1 text--primary">
                View • Grade
            </v-card-title>

            <v-card-actions>
                <v-select
                        v-model="select"
                        color="black"
                        item-color="teal"
                        :items="items"
                        label="Select Level/Term"
                        outlined
                        rounded
                        required
                ></v-select>
            </v-card-actions>
        </v-card-text>
        <v-card-actions>

                <v-spacer />
                <v-btn color="teal" dark @click=showGrade>
                    <v-icon left>mdi-school-outline</v-icon>
                    <span right>Show Grade</span>
                </v-btn>

        </v-card-actions>
    </v-card>
</template>
<script>
    export default {
        name: "ViewGrade",
        data:function () {
            return {
                items:['One','Two','Three','Four'],
                error:"Select an option",
                select:""
            }
        },
        mounted(){
            console.log('mounted view grade');
        },
        methods:{
            showGrade(){
                this.$router.push('/showGrade')
            }
        }
    }
</script>

<style scoped>

</style>