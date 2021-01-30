<template>
    <v-container
        fluid
        :class="{'student':(attribute==='student'), 'teacher':(attribute==='teacher')}">
        <v-card class="mx-auto" max-width="500" height="660">
            <v-toolbar color="teal" dark>
                <slot name="header"></slot>
            </v-toolbar>
            <v-list>
                <v-list-group v-for="item in attributeArray" :key="item.text" :prepend-icon="item.icon" color="teal">
                    <template v-slot:activator >
                        <v-list-item-content >
                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item-content>
                    </template>
                    <v-form style="margin-left: 5%;margin-right: 5%" v-if="item.text.startsWith('Create')">
                        <slot name="create"></slot>
                    </v-form>
                    <v-form style="margin-left: 5%;margin-right: 5%" v-if="item.text.startsWith('Update')">
                        <slot name="update"></slot>
                    </v-form>
                    <v-form style="margin-left: 5%;margin-right: 5%" v-if="item.text.startsWith('Delete')">
                        <slot name="delete"></slot>
                    </v-form>
                </v-list-group>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: "adminCard",
    props:['attribute'],
    data:()=>(
        {
            attributeArray:[],
            student: [{text: 'Create', icon: 'mdi-database-plus-outline'},
                {text: 'Update Grade', icon: 'mdi-database-edit-outline'},
                {text: 'Delete', icon: 'mdi-database-minus-outline'}],
            teacher:[{text: 'Create', icon: 'mdi-database-plus-outline'},
                {text: 'Update Designation', icon: 'mdi-database-edit-outline'},
                {text: 'Delete', icon: 'mdi-database-minus-outline'}]
        }
    ),
    mounted(){
        console.log("Inside Admin Card ",this.attribute,this.student,this.teacher);
        if(this.attribute==='student') this.attributeArray=this.student;
        else this.attributeArray=this.teacher;
    }
}
</script>

<style scoped>
.student{
    width:100%;
    padding-left:30%
}
.teacher{
    width:100%;
    padding-right:30%
}
</style>