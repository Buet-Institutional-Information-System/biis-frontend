import Vue from 'vue'
import App from './App.vue'
import router from './router'

import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

import store from './store';

Vue.use(VueAxios, axios);
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:1148';

router.beforeEach((to, from, next) => {
    //console.log(to,from,next);
    if (to.name === 'Admin') {
        console.log("In admin block");
    } else if (to.name === 'SignIn' && store.getters.getFlagSignIn === true) {
        store.commit('unsetUser');

     } else if (to.name !== 'SignIn' && store.getters.getFlagSignIn === false) {
        console.log('block');
        router.push('/');
    }
    next();

});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')



