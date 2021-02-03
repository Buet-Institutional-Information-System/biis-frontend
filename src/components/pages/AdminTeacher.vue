<template>
    <AdminCard attribute="teacher">
        <template #header>
            <v-icon left>mdi-teach</v-icon>
            <v-toolbar-title>Teacher</v-toolbar-title>
        </template>

        <template #create>
            <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model.trim="insId" label="Teacher Id" color="teal"
                                  @blur="$v.insId.$touch()"
                                  :error="$v.insId.$error"
                                  :error-messages="$v.insId.$error?'required':null">
                    </v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                    <v-text-field v-model.trim="insName" label="Name" color="teal"
                                  @blur="$v.insName.$touch()"
                                  :error="$v.insName.$error"
                                  :error-messages="$v.insName.$error?'required':null">
                    </v-text-field>
                </v-col>
            </v-row>
            <v-file-input small-chips multiple prepend-icon="mdi-camera" v-model.trim="adviserImage" label="Teacher Image"
                          color="teal"
                          @blur="$v.adviserImage.$touch()"
                          :error="$v.adviserImage.$error"
                          :error-messages="$v.adviserImage.$error?'required':null">
            </v-file-input>
            <v-row>
                <v-col cols="12" md="6">
                    <v-select v-model.trim="insDept" :items="getDeptList" label="Departments" color="teal"
                              @blur="$v.insDept.$touch()"
                              :error="$v.insDept.$error"
                              :error-messages="$v.insDept.$error?'required':null">
                    </v-select>
                </v-col>
                <v-col cols="12" md="6">
                    <v-select v-model.trim="insDesignation"
                              :items="['Professor','Associate Professor','Assistant Professor','Lecturer']"
                              label="Designation" color="teal"
                              @blur="$v.insDesignation.$touch()"
                              :error="$v.insDesignation.$error"
                              :error-messages="$v.insDesignation.$error?'required':null">
                    </v-select>
                </v-col>
            </v-row>
            <Button icon="mdi-cellphone-arrow-down" text="Insert Teacher" :click="insertTeacher">
            </Button>
        </template>
        <template #update>
            <v-text-field v-model.trim="uinsId" label="Teacher Id" color="teal"
                          @blur="$v.uinsId.$touch()"
                          :error="$v.uinsId.$error"
                          :error-messages="$v.uinsId.$error?'required':null">
            </v-text-field>
            <v-select v-model.trim="uinsDesignation"
                      :items="['Professor','Associate Professor','Assistant Professor','Lecturer']" label="Designation"
                      color="teal"
                      @blur="$v.uinsDesignation.$touch()"
                      :error="$v.uinsDesignation.$error"
                      :error-messages="$v.uinsDesignation.$error?'required':null">
            </v-select>
            <Button icon="mdi-update" text="Update Designation" :click="updateDesignation">
            </Button>
        </template>
        <template #delete>
            <v-text-field v-model.trim="dinsId" label="Teacher Id" color="teal"
                          @blur="$v.dinsId.$touch()"
                          :error="$v.dinsId.$error"
                          :error-messages="$v.dinsId.$error?'required':null">
            </v-text-field>
            <Button icon="mdi-delete-sweep-outline" text="Delete Teacher" :click="deleteTeacher">
            </Button>
        </template>
    </AdminCard>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {alphaNum, minLength, required} from "vuelidate/lib/validators";
export default {
    name: "AdminTeacher",
    data:()=>({
        insId: "",
        uinsId:"",
        dinsId:"",
        insName: "",
        insDept: "",
        insDesignation: "",
        uinsDesignation:"",
        adviserImage: null,

    }),
    validations:{
        insId:{
            required
        },
        uinsId:{
            required
        },
        dinsId:{
            required
        },
        insName:{
            required,
        },
        insDept:{
            required,
        },
        insDesignation:{
            required,
        },
        uinsDesignation:{
            required,
        },
        adviserImage:{
            required,
        }
    },
    computed:{
      ...mapGetters('admin',['getDeptList'])
    },
    async mounted() {
        await this.adminTeacher();
    },
    methods:{
        ...mapActions(['setNotificationTimer']),
        ...mapActions('admin',['adminTeacher','adminInsertTeacher','adminUpdateDesignation','adminDeleteTeacher']),
        async insertTeacher() {
            let sendObject = {
                id: this.insId,
                name: this.insName,
                dept: this.insDept,
                designation: this.insDesignation,
                adviserImage: (this.adviserImage ? this.adviserImage[0]: null)
            }
            let response=await this.adminInsertTeacher(sendObject);
            if (response === 'clear') {
                await this.clear();
            }
        },
        async updateDesignation() {
            let sendObject = {
                id: this.uinsId,
                designation: this.uinsDesignation
            }
            let response=await this.adminUpdateDesignation(sendObject);
            if (response === 'clear') {
                await this.clear();
            }
        },
        async deleteTeacher() {
            let sendObject = {
                id: this.dinsId
            };
            let response=await this.adminDeleteTeacher(sendObject);
            if (response === 'clear') {
                await this.clear();
            }
        },
        async clear(){
            await this.setNotificationTimer();
            this.insId = "";
            this.uinsId="";
            this.dinsId="";
            this.insName = "";
            this.insDept = "";
            this.insDesignation = "";
            this.uinsDesignation="";
            this.adviserImage = null;
            this.$v.$reset();
        }
    }
}
</script>

<style scoped>

</style>