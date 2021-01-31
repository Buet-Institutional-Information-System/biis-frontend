<template>
    <InfoCard>
        <template #cardText>
            <tbody>
            <tr v-for="[key,value] in Object.entries(getContacts)">
                <td class="text-left subtitle-2">{{ key }}</td>
                <td class="text-left subtitle-2">{{ value }}</td>
            </tr>
            <tr v-for="[key,value] in Object.entries(getEdits)">
                <td class="text-left subtitle-2">{{ key }}</td>
                <td class="text-left subtitle-2">{{ value }}</td>
            </tr>
            </tbody>
        </template>
        <template #cardImage>
            <v-list-item-avatar tile size="150" color="grey">
                <v-img :src=getUserImage class="mt-1"/>
            </v-list-item-avatar>
        </template>
        <template #cardAction>
            <Button icon="mdi-pencil-outline" text="Edit Information" :click="gotoEditInfo"></Button>
        </template>
    </InfoCard>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'

export default {
    name: "Contact",
    data: function () {
        return {
            contacts: {},
            edits: {}
        }
    },
    computed: {
        ...mapGetters('student', [ 'getUserImage','getContacts','getEdits'])
    },
    async mounted() {

        await this.contact();

        console.log("getContacts: ",this.getContacts);
        console.log("getEdits: ",this.getEdits);
    },
    methods: {
        ...mapActions('student', ['contact', 'gotoEditInfo']),
    }

}
</script>

<style scoped>

</style>