<template>
    <Card>
        <template #cardText>
            <v-card-title class="display-1 text--primary">
                Change • Secret • Question
            </v-card-title>
            <v-card-actions>
                <v-text-field color="black" label="Password" outlined shaped dense>
                </v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-text-field color="black" label="Secret Question" outlined shaped dense>
                </v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-text-field color="black" label="Secret Answer" outlined shaped dense>
                </v-text-field>
            </v-card-actions>
        </template>
        <template #cardAction>
            <Button icon="far fa-share-square" text="Change" :click="gotoHome"></Button>
        </template>
    </Card>
</template>


<script>
import {mapActions} from 'vuex'
    export default {
        name: "SecretQuestion",
        methods:{
            ...mapActions('student',['gotoHome'])
        }
    }
</script>

<style scoped>

</style>