<template>
  <a-layout id="components-layout-demo-fixed">
    <basic-header />
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px' }">
      <bread-crumb />
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
import BasicHeader from './BasicHeader'
import BreadCrumb from './BreadCrumb'

export default {
    components:{
        GlobalFoot,
        BasicHeader,
        BreadCrumb
    }
}
</script>


<style>

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