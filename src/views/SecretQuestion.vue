<template>
    <v-card
            style="margin-left: 20%;margin-top: 2%; width: 50%;height: 70%"
            class="v-card--hover "
    >
        <v-card-text>
            <v-card-title class="display-1 text--primary">
                Change • Secret • Question
            </v-card-title>

            <v-card-actions>
                <v-text-field
                        color="black"
                        label="Password"
                        outlined
                        shaped
                        dense
                ></v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-text-field
                        color="black"
                        label="Secret Question"
                        outlined
                        shaped
                        dense
                ></v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-text-field
                        color="black"
                        label="Secret Answer"
                        outlined
                        shaped
                        dense
                ></v-text-field>
            </v-card-actions>
        </v-card-text>
        <v-card-actions>
           <v-spacer/>
            <v-btn color="teal" dark link to="/home">
                <v-icon left>far fa-share-square</v-icon>
                <span right>Change</span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>


<script>
    export default {
        name: "SecretQuestion"
    }
</script>

<style scoped>

</style>