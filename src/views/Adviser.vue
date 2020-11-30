<template>
    <v-card
            style="margin-left: 20%;margin-top: 2%; width: 50%"
            outlined
            shaped
            class="adviser"
    >
        <v-list-item three-line>
            <v-list-item-content>
                <div class="overline body-1"> • ADVISER •</div>
                <v-list-item class="headline mb-1">{{this.adviserName}}</v-list-item>
                <v-list-item class="title">{{this.adviserDesignation}}</v-list-item>
                <v-list-item class="subtitle-2">{{this.adviserDept}}</v-list-item>
            </v-list-item-content>

            <v-list-item-avatar
                    tile
                    size="200"
                    color="grey"
            >
                <v-img :src=$store.getters.getAdviserImage class="mt-1"/>
            </v-list-item-avatar>
        </v-list-item>

    </v-card>
</template>

<script>
    export default {
        name: "Adviser",
        data: function () {
            return {
                adviserName: "",
                adviserDesignation: "",
                adviserDept: "",
            }
        },
        async mounted() {
            this.$store.commit('setSpinnerFlag');
            console.log("Adviser clicked");
            let sendObject = {
                id: this.$store.getters.getAdviserId,
                token:this.$store.getters.getToken
            };
            //console.log(sendObject);
            try {
                // let response = await this.axios.get(`/adviser/${sendObject.id}`);
                let response = await this.axios.get('/adviserInfo',{params:sendObject});
                console.log("Received data from server is: ");
                console.log(response.data.rows[0]);
                if (response.data.rows.length != 0) {
                    this.adviserName = response.data.rows[0].INS_NAME;
                    this.adviserDept = response.data.rows[0].DEPT;
                    this.adviserDesignation = response.data.rows[0].DESIGNATION;
                } else {
                    console.log('Wrong Information');
                }
            } catch (e) {
                console.log(e);
            } finally {
                this.$store.commit('unsetSpinnerFlag');
            }
        }
    }
</script>

<style scoped>

</style>