//总路由

import Vue from "vue"
import Router from "vue-router" //导入路由组件

import FrontRouter from "../subweb/front/FrontRouter"
import TeamRouter from "../subweb/team/TeamRouter"
import OrgRouter from "../subweb/organization/OrgRouter"
import CompetitionRouter from "../subweb/competition/CompetitionRouter";

import BasicLayout from "../subweb/components/BasicLayout"
import AccountRouter from "../subweb/account/AccountRouter";

Vue.use(Router); //使用路由组件

// const root = [
//   {
//     path: "/", // 路径
//     redirect: "/front" //重定向
//   }
// ];

const routes = [...FrontRouter, {
    path:"/",
    name:"index",
    meta:{title:'首页'},
    component:BasicLayout,
    redirect: "/front",//重定向
    children:[
      ...TeamRouter, ...OrgRouter,...CompetitionRouter,...AccountRouter
    ]
  }];

// 让每一个 路由对象 都有 path
routes.forEach(route => {
  route.path = route.path || "/" + (route.name || "");
});

// 开始挂载路由（路由起作用）
const router = new Router({ mode: "history", routes });

//url切换前（路由状态改变前）做一些事情
router.beforeEach((to, from, next) => {
  //自定义业务
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }

  next(); //通过，切换到新的UI
});

//把自己定义为一个组件模块，别人要引用我，以 router 为名
export default router;
