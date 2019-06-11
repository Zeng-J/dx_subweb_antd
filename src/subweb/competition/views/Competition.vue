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
            </a-menu-item-group>
            <a-menu-item key="9">
                <span @click="getCurrent"><a-icon type="calendar" />在期竞赛</span>
            </a-menu-item>
            <a-menu-item key="10">
                <span @click="getPast"><a-icon type="calendar" />往期竞赛</span>
            </a-menu-item>
            <a-menu-item key="11">
                <span @click="getMine"><a-icon type="calendar" />我的竞赛</span>
            </a-menu-item>
        </a-menu>
      </a-layout-sider>
        <contest-list ref="contestList"/>
    </a-layout>
  </a-layout>
</template>
<script>
import ContestList from '../components/competition/ContestList'
import { listContestType } from '@/common/api'


export default {
  components:{
    ContestList
  },
  created(){
      listContestType()
      .then(res => {
        console.log('竞赛类型',res)
        this.list = res.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  data(){
    return {
      list:[]
    }
  },
  methods: {
    getCurrent(){
      this.$refs.contestList.getListContest("term=1")
    },
    getPast(){
      this.$refs.contestList.getListContest("term=2")
    },
    getMine(){
      this.$refs.contestList.getMyContest()
    }
  },
};
</script>


