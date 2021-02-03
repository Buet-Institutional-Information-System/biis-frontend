<template>
    <AdminCard attribute="teacher">
        <template #header>
            <v-icon left>mdi-teach</v-icon>
            <v-toolbar-title>Teacher</v-toolbar-title>
        </template>

        <template #create>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model.trim="insId" label="Teacher Id" color="teal">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model.trim="insName" label="Name" color="teal">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-file-input small-chips multiple prepend-icon="mdi-camera" v-model.trim="adviserImage" label="Teacher Image"
                          color="teal">
            </v-file-input>
            <v-row>
                <v-col cols="12" md="6">
                    <v-select v-model.trim="insDept" :items="getDeptList" label="Departments" color="teal">
                    </v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select v-model.trim="insDesignation"
                              :items="['Professor','Associate Professor','Assistant Professor','Lecturer']"
                              label="Designation" color="teal">
                    </v-select>
                </v-col>
            </v-row>
            <Button icon="mdi-cellphone-arrow-down" text="Insert Teacher" :click="insertTeacher">
            </Button>
        </template>
        <template #update>
            <v-text-field v-model.trim="insId" label="Teacher Id" color="teal">
            </v-text-field>
            <v-select v-model.trim="insDesignation"
                      :items="['Professor','Associate Professor','Assistant Professor','Lecturer']" label="Designation"
                      color="teal">
            </v-select>
            <Button icon="mdi-update" text="Update Designation" :click="updateDesignation">
            </Button>
        </template>
        <template #delete>
            <v-text-field v-model.trim="insId" label="Teacher Id" color="teal">
            </v-text-field>
            <Button icon="mdi-delete-sweep-outline" text="Delete Teacher" :click="deleteTeacher">
            </Button>
        </template>
    </AdminCard>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
    name: "AdminTeacher",
    data:()=>({
        insId: "",
        insName: "",
        insDept: "",
        insDesignation: "",
        adviserImage: null,

    }),
    computed:{
      ...mapGetters('admin',['getDeptList'])
    },
    async mounted() {
        await this.adminTeacher();
    },
    methods:{
        ...mapActions('admin',['adminTeacher','adminInsertTeacher','adminUpdateDesignation','adminDeleteTeacher']),
        async insertTeacher() {
            let sendObject = {
                id: this.insId,
                name: this.insName,
                dept: this.insDept,
                designation: this.insDesignation,
                adviserImage: this.adviserImage[0]
            }
            let response=await this.adminInsertTeacher(sendObject);
            if (response === 'clear') {
                this.clear();
            }
        },
        async updateDesignation() {
            let sendObject = {
                id: this.insId,
                designation: this.insDesignation
            }
            let response=await this.adminUpdateDesignation(sendObject);
            if (response === 'clear') {
                this.clear();
            }
        },
        async deleteTeacher() {

            let sendObject = {
                id: this.insId
            };
            let response=await this.adminDeleteTeacher(sendObject);
            if (response === 'clear') {
                this.clear();
            }
        },
        clear(){
            this.insId = "";
            this.insName = "";
            this.insDept = "";
            this.insDesignation = "";
            this.adviserImage = null;
        }
    }
}
</script>

<style scoped>

</style>