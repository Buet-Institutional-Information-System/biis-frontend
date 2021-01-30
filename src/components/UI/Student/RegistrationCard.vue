<template>
    <v-card class="mx-auto" max-width="1000" max-height="755">
        <v-card-text class="black--text font-weight-bold text-center">
            <slot name="intro"></slot>
        </v-card-text>
        <v-card-actions class="justify-center">
            <v-simple-table  height="450" fixed-header>
                <template v-slot:default>
                    <slot name="description"></slot>
                </template>
            </v-simple-table>
        </v-card-actions>
        <v-card-actions class="font-weight-medium justify-center" style="padding-top: 2%">
            <v-simple-table dense>
                <slot name="final"></slot>
            </v-simple-table>
        </v-card-actions>
        <v-card-actions class="justify-center" style="padding-bottom: 2%">
            <slot ></slot>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
name: "RegistrationCard"
}
</script>

<style scoped>

</style>