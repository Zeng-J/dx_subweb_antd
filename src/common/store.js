//总状态（vuex）
import Vue from 'vue';
import Vuex from 'vuex';

//引入子状态
// import FrontStore from '@/platform/front/FrontStore';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    // FrontStore
  }
});

export default store;