import Vue from "vue";
import App from "./App.vue";
import router from "@/common/router";
import store from "@/common/store";

// 整体引入ant design UI组件
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

//关闭生产模式下给出的提示
Vue.config.productionTip = false;


export const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
