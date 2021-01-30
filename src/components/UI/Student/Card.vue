<template>
    <v-card style="margin-left: 20%;margin-top: 2%; width: 50%;height: 70%" class="v-card--hover ">
        <v-card-text>
            <slot name="cardText"></slot>
        </v-card-text>
    <v-card-actions>
        <v-spacer/>
        <slot name="cardAction"></slot>
    </v-card-actions>
    </v-card>
</template>

<script>
export default {
name: "Card"
}
</script>

<style scoped>

</style>