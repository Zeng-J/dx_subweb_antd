<template>
  <a-layout id="components-layout-demo-fixed">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', background:'#fff'}">
      <div class="logo" />
      <a-menu
        theme="light"
        mode="horizontal"
        :defaultSelectedKeys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">首页</a-menu-item>
        <a-menu-item key="2">应用</a-menu-item>
        <a-menu-item key="3">服务</a-menu-item>
        <a-menu-item key="4">关于</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-breadcrumb :style="{ margin: '16px 0' }">
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
          <router-view></router-view>
      </div>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center', width: '100%',padding:'10px 0 60px'}">
      <global-foot/>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import GlobalFoot from './GlobalFoot'

export default {
    components:{
        GlobalFoot
    }
}
</script>


<style scoped>
#components-layout-demo-fixed .logo {
  width: 120px;
  height: 31px;
  /* background: rgba(255,255,255,.2); */
  margin: 16px 24px 16px 0;
  float: left;
  background-image: url(https://e.jikexueyuan.com/headerandfooter/images/logo.png?t=1513326254000);
  background-size:100% 100%;
}
</style>