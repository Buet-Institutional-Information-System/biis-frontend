import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

import studentModule from './modules/student/index.js';
import adminModule from './modules/admin/index.js';

import rootGetters from './getters';
import rooMutations from './mutations'
import rootActions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
      spinnerFlag:false,
  },
  getters:rootGetters,
  mutations:rooMutations,
  actions:rootActions,
  modules: {
      admin:adminModule,
      student:studentModule
  }
})
