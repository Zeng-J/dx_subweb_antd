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
  state:{
    token:'set',
    isLogin:false,
    userName:''
  }
});

export default store;