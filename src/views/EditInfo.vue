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
                <td class="text-left subtitle-2">
                    <v-text-field color="black" clearable dense outlined style="margin-top: 5%" v-model="getEdits[key]">
                    </v-text-field>
                </td>
            </tr>
            </tbody>
        </template>
        <template #cardAction>
            <Button icon="far fa-share-square" text="Back" :click="gotoContact"></Button>
            <v-spacer/>
            <Button icon="mdi-content-save-edit-outline" text="Confirm" :click="confirmClicked"></Button>
        </template>
    </InfoCard>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    name: "EditInfo",
    computed: {
        ...mapGetters('student', ['getContacts','getEdits'])
    },
    async mounted() {
        await this.contact();
    },
    methods: {
        ...mapActions('student',['contact','editConfirmClicked','gotoContact']),
        confirmClicked(){
            this.editConfirmClicked(this.getEdits);
        }

    }
}
</script>

<style scoped>

</style>