<template>
    <v-card style="margin-left: 20%;margin-top: 2%;  width: 50%" outlined>
        <v-list-item three-line>
            <v-list-item-content>
                <v-simple-table>
                    <slot name="cardText"></slot>
                </v-simple-table>
            </v-list-item-content>
            <slot name="cardImage"></slot>
        </v-list-item>
        <v-card-actions>
            <slot name="cardAction" ></slot>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: "InfoCard"
}
</script>

<style scoped>

</style>