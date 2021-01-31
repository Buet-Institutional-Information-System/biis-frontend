<template>
    <v-card style="margin-left: 20%;margin-top: 2%; width: 50%" outlined shaped class="adviser">
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline body-1"> • ADVISER •</div>
                <v-list-item class="headline mb-1">{{getAdviserName}}</v-list-item>
                <v-list-item class="title">{{getAdviserDesignation}}</v-list-item>
                <v-list-item class="subtitle-2">{{getAdviserDept}}</v-list-item>
            </v-list-item-content>
            <v-list-item-avatar tile size="200" color="grey">
                <v-img :src=getAdviserImage class="mt-1"/>
            </v-list-item-avatar>
        </v-list-item>
    </v-card>
</template>

<script>
import {mapGetters,mapActions} from 'vuex';
    export default {
        name: "Adviser",
        computed:{
            ...mapGetters('student',['getAdviserId','getAdviserName','getAdviserDesignation','getAdviserDept','getAdviserImage'])
        },
        methods:{
            ...mapActions('student',['adviser'])
        },
        async mounted() {
            if(this.getAdviserName==='' || this.getAdviserDesignation==='' || this.getAdviserDept===''){
                this.adviser();
            }
        },

    }
</script>

<style scoped>

</style>