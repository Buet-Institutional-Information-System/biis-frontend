<template>
    <v-snackbar
        :timeout="2000"
        :value="true"
        absolute
        top
        color="success"
        right
        shaped
        multi-line="multiLine"

    >
        <span class="text-h6">Welcome Back!</span>
    </v-snackbar>
</template>

<script>
export default {
name: "Notification"
}
</script>

<style scoped>

</style>