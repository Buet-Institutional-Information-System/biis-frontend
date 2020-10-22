import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

axios.defaults.baseURL='http://localhost:1148';
Vue.use(VueAxios,axios);
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  //console.log(to,from,next);
  if(to.name==='SignIn' && store.getters.getFlagSignIn===true){
    store.commit('unsetUser');
  }
  if(to.name!=='SignIn'  &&  store.getters.getFlagSignIn===false){
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
