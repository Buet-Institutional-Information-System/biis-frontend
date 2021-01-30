<template>
    <v-row no-gutters>
        <v-col cols="12" sm="6">
            <AdminStudent/>
        </v-col>
        <v-col cols="12" sm="6">
            <AdminTeacher/>
        </v-col>
    </v-row>

</template>

<script>
import AdminStudent from "@/components/pages/AdminStudent";
import AdminTeacher from "@/components/pages/AdminTeacher";

export default {
    name: "Admin",
    components: {AdminStudent,AdminTeacher},
}

</script>

<style scoped>

</style>