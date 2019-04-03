<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :style="{ height: '100%', borderRight: 0 }"
        >
            <a-menu-item-group key="g1" :style="{'border-style':'outset','border-width':'1.4px'}">
                <template slot="title"><a-icon type="calendar" /><span>竞赛库</span></template>

                <a-menu-item v-for="(item, index) in list" :key='index'>{{item.typeName}}</a-menu-item>
                <!-- <a-menu-item key="2">后端开发</a-menu-item>
                <a-menu-item key="3">人工智能</a-menu-item>
                <a-menu-item key="4">智能硬件/物联网</a-menu-item>
                <a-menu-item key="5">设计/产品/测试</a-menu-item>
                <a-menu-item key="6">云计算/大数据</a-menu-item>
                <a-menu-item key="7">技术支撑</a-menu-item>
                <a-menu-item key="8">综合</a-menu-item> -->
            </a-menu-item-group>
            <a-menu-item key="9">
                <router-link to="current"><a-icon type="calendar" />在期竞赛</router-link>
            </a-menu-item>
            <a-menu-item key="10">
                <router-link to="past"><a-icon type="calendar" />往期竞赛</router-link>
            </a-menu-item>
            <a-menu-item key="11">
                <span><a-icon type="calendar" />我的竞赛</span>
            </a-menu-item>
        </a-menu>
      </a-layout-sider>
        <router-view></router-view>
    </a-layout>
  </a-layout>
</template>
<script>
// import {  } from '../components/competition/Contest'
import { listContestType } from '@/common/api'

export default {
  data(){
    return {
      list:[]
    }
  },
  methods: {
    getListContestType(){
      listContestType()
      .then(res => {
        console.log(res)
        this.list = res.data
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  created(){
    this.getListContestType()
  }
};
</script>


