<template>
    <v-btn color="teal" dark @click="click">
        <v-icon left>{{icon}}</v-icon>
        <span right>{{text}}</span>
    </v-btn>
</template>

<script>
export default {
    name: "Button",
    props:{
        'icon':{
            required:true
        },
        'text':{
            required:true
        },
        'click':{
            required:true,
        }
    }
}
</script>

<style scoped>

</style>