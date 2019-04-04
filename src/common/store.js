//总状态（vuex）
import Vue from 'vue'
import Vuex from 'vuex'

//引入子状态
import FrontStore from '@/subweb/front/FrontStore'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    FrontStore,
  },

  state:sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')): {
    token:'',
    isLogin:false,
    userName:'没名字',
    avatar:'http://07imgmini.eastday.com/mobile/20190401/20190401163221_3028b98c5cf564b0fe8d3adbcdf412a9_3_mwpm_05501609.jpg'
  }
});

export default store;