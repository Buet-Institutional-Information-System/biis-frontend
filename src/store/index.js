import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

import studentModule from './modules/student/index.js';
import adminModule from './modules/admin/index.js';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
      admin:adminModule,
      student:studentModule
  }
})
