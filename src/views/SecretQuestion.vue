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
            <Button icon="far fa-share-square" text="Change" :click="home"></Button>
        </template>
    </Card>
</template>


<script>
    export default {
        name: "SecretQuestion",
        methods:{
            home(){
                this.$router.push('/home');
            }
        }
    }
</script>

<style scoped>

</style>