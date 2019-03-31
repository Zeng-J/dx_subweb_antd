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
        <a-menu-item key="1"><router-link to="/team">首页</router-link></a-menu-item>
        <a-menu-item key="2">应用</a-menu-item>
        <a-menu-item key="3">服务</a-menu-item>
        <a-menu-item key="4">关于</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <a-row>
        <a-col :xs="24" :sm="8">
          <img 
          style="width:80%; height:250px;margin:50px auto;"
          src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3990515277,3071303246&fm=27&gp=0.jpg" alt=""
          >
        </a-col>
        <a-col :xs="24" :sm="16" :lg="{ span: 12, offset: 1 }" :xl="{ span: 10, offset: 4 }" :xxl="{ span: 8, offset: 4 }">
          <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
              <router-view></router-view>
          </div>
        </a-col>
      </a-row>
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