import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuelidate from "vuelidate";
import firebase from 'firebase';


import '@/components'
import store from './store';
import router from './router'

import key from './firebase/key'

let firebaseConfig = key.key;
console.log("FIREBASE KEY: ",firebaseConfig);
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.use(VueAxios, axios);
Vue.use(Vuelidate);
Vue.config.productionTip = false
//axios.defaults.baseURL = 'http://localhost:1148';
axios.defaults.baseURL =   'https://mt-biis.herokuapp.com/';


new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')



