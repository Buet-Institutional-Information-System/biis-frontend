<template>
   <Card>
       <template #cardText>
            <v-card-title class="display-1 text--primary">
                 • Feedback •
            </v-card-title>
           <v-card-actions>
                <v-text-field color="black" label="Subject" outlined shaped dense>
                </v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-textarea color="black" label="Complain" auto-grow outlined shaped>
                </v-textarea>
            </v-card-actions>
       </template>
        <template #cardAction>
            <Button icon="far fa-arrow-alt-circle-right" text="Submit" :click="gotoHome"></Button>
        </template>
   </Card>
</template>

<script>
import {mapActions} from 'vuex'
    export default {
        name: "Feedback",
        methods:{
            ...mapActions('student',['gotoHome'])

        }
    }
</script>

<style scoped>

</style>