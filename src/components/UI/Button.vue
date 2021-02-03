<template>
    <v-btn color="teal" class="white--text" @click="click" :disabled="disabled">
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
        },
        'disabled':{
            type:Boolean,
            required:false,
            default: false
        }
    }
}
</script>

<style scoped>

</style>