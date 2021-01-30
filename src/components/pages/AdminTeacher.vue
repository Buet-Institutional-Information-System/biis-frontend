<template>
    <AdminCard attribute="teacher">
        <template #header>
            <v-icon left>mdi-teach</v-icon>
            <v-toolbar-title>Teacher</v-toolbar-title>
        </template>

        <template #create>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model="insId" label="Teacher Id" color="teal">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model="insName" label="Name" color="teal">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-file-input small-chips multiple prepend-icon="mdi-camera" v-model="adviserImage" label="Teacher Image"
                          color="teal">
            </v-file-input>
            <v-row>
                <v-col cols="12" md="6">
                    <v-select v-model="insDept" :items="deptList" label="Departments" color="teal">
                    </v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select v-model="insDesignation"
                              :items="['Professor','Associate Professor','Assistant Professor','Lecturer']"
                              label="Designation" color="teal">
                    </v-select>
                </v-col>
            </v-row>
            <Button icon="mdi-cellphone-arrow-down" text="Insert Teacher" :click="insertTeacher">
            </Button>
        </template>
        <template #update>
            <v-text-field v-model="insId" label="Teacher Id" color="teal">
            </v-text-field>
            <v-select v-model="insDesignation"
                      :items="['Professor','Associate Professor','Assistant Professor','Lecturer']" label="Designation"
                      color="teal">
            </v-select>
            <Button icon="mdi-update" text="Update Designation" :click="updateDesignation">
            </Button>
        </template>
        <template #delete>
            <v-text-field v-model="insId" label="Teacher Id" color="teal">
            </v-text-field>
            <Button icon="mdi-delete-sweep-outline" text="Delete Teacher" :click="deleteTeacher">
            </Button>
        </template>
    </AdminCard>
</template>

<script>

export default {
    name: "AdminTeacher",
    data:()=>({
        insId: "",
        insName: "",
        insDept: "",
        insDesignation: "",
        adviserImage: null,
        deptList:[]
    }),
    async mounted() {
        this.$store.commit('setSpinnerFlag');
        this.$store.commit('unsetFlagSignIn');
        console.log('admin mounted');

        try {
            let response = await this.axios.get('/admin/depts');
            //console.log(response.data);
            if (response.data.length != 0) {
                this.deptList = response.data;
                //console.log(this.deptList);
            }
        } catch (e) {
            console.log(e);
        } finally {
            this.$store.commit('unsetSpinnerFlag');
        }
    },
    methods:{
        async insertTeacher() {
            console.log("this.adviserImage: ", this.adviserImage[0]);
            this.$store.commit('setSpinnerFlag');
            let sendObject = {
                id: this.insId,
                name: this.insName,
                dept: this.insDept,
                designation: this.insDesignation,
                adviserImage: this.adviserImage[0]
            }
            let formData = new FormData();
            for (let item in sendObject) {
                formData.append(item, sendObject[item]);
            }
            console.log(formData.get('id'));
            console.log(formData.get('name'));
            console.log(formData.get('dept'));
            console.log(formData.get('designation'));
            try {
                let response = await this.axios.post('/admin/teacher', formData);
                this.insId = "";
                this.insName = "";
                this.insDept = "";
                this.insDesignation = "";
                this.adviserImage = null;
                console.log(response);
            } catch (e) {
                console.log(e);
            } finally {
                this.$store.commit('unsetSpinnerFlag');
            }
        },
        async updateDesignation() {
            this.$store.commit('setSpinnerFlag');
            let sendObject = {
                id: this.insId,
                designation: this.insDesignation
            }
            try {
                let response = await this.axios.patch('/admin/updateDesignation', sendObject);
                this.insId = "";
                this.insDesignation = "";
                console.log(response);
            } catch (e) {
                console.log(e);
            } finally {
                this.$store.commit('unsetSpinnerFlag');
            }
        },
        async deleteTeacher() {
            this.$store.commit('setSpinnerFlag');
            let sendObject = {
                id: this.insId
            }
            console.log(sendObject);
            try {
                let response = await this.axios.delete('/admin/teacher', {data: sendObject});
                this.insId = "";
                this.insDesignation = "";
                console.log(response);
            } catch (e) {
                console.log(e);
            } finally {
                this.$store.commit('unsetSpinnerFlag');
            }
        }
    }
}
</script>

<style scoped>

</style>