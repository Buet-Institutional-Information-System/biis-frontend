<template>
    <v-card
            style="margin-left: 20%;margin-top: 2%; width: 50%;height: 70%"
            class="v-card--hover "
    >
        <v-card-text>
            <v-card-title class="display-1 text--primary">
                 • Feedback •
            </v-card-title>

            <v-card-actions>
                <v-text-field
                        color="black"
                        label="Subject"
                        outlined
                        shaped
                        dense
                ></v-text-field>
            </v-card-actions>
            <v-card-actions>
                <v-textarea
                        color="black"
                        label="Complain"
                        auto-grow
                        outlined
                        shaped
                ></v-textarea>
            </v-card-actions>
        </v-card-text>
        <v-card-actions>
            <v-spacer/>
            <v-btn color="teal" dark link to="/home">
                <v-icon left>far fa-arrow-alt-circle-right</v-icon>
                <span right>Submit</span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    export default {
        name: "Feedback"
    }
</script>

<style scoped>

</style>