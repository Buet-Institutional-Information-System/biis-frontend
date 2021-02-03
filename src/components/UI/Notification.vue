<template>
        <v-alert text :type="getMessageType" style="position: absolute; right: 1%; top: 1%" v-if="getMessageType!==null">
            {{getMessage}}
            <v-btn fab x-small depressed :color="getMessageType" @click="resetNotification">x</v-btn>
        </v-alert>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    name: "Notification",

    computed:{
        ...mapGetters(['getMessage','getMessageType'])
    },
    methods:{
        ...mapActions(['resetNotification']),
        closeNotification(){

        }
    }

}
</script>

<style scoped>

</style>