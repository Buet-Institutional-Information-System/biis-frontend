import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from 'vuetify';
import axios from 'axios';

const app=createApp(App);

app.use(store);
app.use(router);
app.use(vuetify);
app.use(axios);


axios.defaults.baseURL = 'http://localhost:1148';

router.beforeEach((to, from, next) => {
    if (to.name === 'Admin') {
        console.log("In admin block");
    }

    else if (to.name !== 'SignIn' && store.getters.getFlagSignIn === false && localStorage.getItem('token')===null) {
        console.log('block');
        router.push('/');
    }
    next();

});


app.mount('#app')
