<template>
    <div >
        <v-img :src=$store.getters.getUserImage class="pa-4" style="margin-left: 35%; margin-top:2%;height:15%;width:15%;  border-width: 20px;border-color:lightgrey;   border-style: double"></v-img>
        <v-card
                style="margin-left:20%;margin-top: 2%;width:50%"
                shaped
        >
            <v-list-item three-line>
                <v-list-item-content>
                    <v-list-item class="title" >{{$store.getters.getUserName}}</v-list-item>
                    <v-list-item class="subtitle-2">{{$store.getters.getDept}}</v-list-item>
                  <v-list-item>Student Id: {{$store.getters.getUserId}}</v-list-item>
                    <v-list-item>Level: {{$store.getters.getCurrentLevel}} Term: {{$store.getters.getCurrentTerm}}</v-list-item>
                    <v-list-item>Session: {{$store.getters.getCurrentSession}}</v-list-item>
                    <v-list-item>Hall: {{$store.getters.getHallName}} ({{$store.getters.getHallStatus}})</v-list-item>
                </v-list-item-content>
            </v-list-item>
        </v-card>
    </div>
</template>

<script>
    // @ is an alias to /src
    export default {
        name: 'Home',
        components: {
        }
    }
</script>
