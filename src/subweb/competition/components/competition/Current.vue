<template>
  <a-layout style="padding: 0 0 0 2px;">
    <a-layout-content style=" background:#fff;padding: 14px;">
        <a-menu
        mode="horizontal"
        >
            <a-menu-item key="1">
                全部课程
            </a-menu-item>
            <a-menu-item key="2">
                最新
            </a-menu-item>
            <a-menu-item key="3">
                课程类型
            </a-menu-item>
            <a-menu-item key="4">
                内容类型
            </a-menu-item>
            <a-menu-item key="5">
                难度等级
            </a-menu-item>
        </a-menu>
    </a-layout-content>
    <a-layout-content :style="{ background: '#fff', padding: '14px 24px', margin: 0, minHeight: '280px' }">
      <a-list
    itemLayout="vertical"
    size="large"
    :pagination="pagination"
    :dataSource="listData"
    >
      <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
          <span slot="extra" style="background:red;color:#fff">{{item.contestReward}}</span>
          <a-list-item-meta>
            <div slot="description">
                <p>{{item.contestIntroduce}}</p>
                <a-row>
                    <a-col span="6">
                        <span ><a-icon type="message" style="margin-right: 8px" />2019-10-10 09:12</span>
                    </a-col>
                    <a-col span="6">
                        <span >即将开赛</span>
                    </a-col>
                    <a-col span="6">
                        <span >倒计时15时36分'</span>
                    </a-col>
                    <a-col span="6">
                        <span ><a-icon type="message" style="margin-right: 8px" />在期|报名中</span>
                    </a-col>
                </a-row>
            </div>
              <router-link slot="title" :to="{name:'gameContent', query:{teamId:item.id}}">{{item.contestName}}</router-link>
              <a-badge slot="avatar" :count="item.contentPower" :numberStyle="{background:'green','border-radius':'0'}">
                  <img  width="120" alt="logo" :src="item.contestLogo" />
              </a-badge>
          </a-list-item-meta>
          
      </a-list-item>
    </a-list>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { listContest } from '@/common/api'

export default {
  data () {
    return {
      listData:[],
      pagination: {
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      },
    }
  },
  created() {
      this.getListContest()
  },
    methods: {
      getListContest(){
        listContest()
        .then(res => {
          console.log(res)
          this.listData = res.data.list
        })
        .catch(err => {
          console.log(err)
        })
      }
  }
}
</script>
