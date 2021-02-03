import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuelidate from "vuelidate";


import '@/components'
import store from './store';
import router from './router'



Vue.use(VueAxios, axios);
Vue.use(Vuelidate);
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:1148';



new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')



