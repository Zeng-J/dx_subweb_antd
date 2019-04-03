<template>
    <a-layout style="padding: 0 0 0 2px;">
        <a-layout-header style=" background:#fff;padding: 14px;">
            <a-menu mode="horizontal">
                <a-menu-item key="1" @click="getListContest('')">
                    全部竞赛
                </a-menu-item>
                <a-sub-menu key="sub1" title="热门类型">
                    <a-menu-item key="2" @click="getListContest('popular=1')">最新</a-menu-item>
                    <a-menu-item key="3" @click="getListContest('popular=2')">最热</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub2" title="参与权限">
                    <a-menu-item key="4" @click="getListContest('contentPower=1')">免费</a-menu-item>
                    <a-menu-item key="5" @click="getListContest('contentPower=2')">VIP</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub3" title="内容类型">
                    <a-menu-item key="6" @click="getListContest('contentType=1')">知识体系</a-menu-item>
                    <a-menu-item key="7" @click="getListContest('contentType=2')">项目实战</a-menu-item>
                </a-sub-menu>
                <a-sub-menu key="sub4" title="等级难度">
                    <a-menu-item key="8" @click="getListContest('contestLevel=1')">初级</a-menu-item>
                    <a-menu-item key="9" @click="getListContest('contestLevel=2')">中级</a-menu-item>
                    <a-menu-item key="10" @click="getListContest('contestLevel=3')">高级</a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-header>
        <a-layout-content :style="{ background: '#fff', padding: '14px 24px', margin: 0, minHeight: '280px' }">
            <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="listData">
                <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
                    <a-tag slot="extra" color="#f50">{{item.contestReward}}奖金</a-tag>
                    <a-list-item-meta>
                        <div slot="description">
                            <p>{{item.contestIntroduce}}</p>
                            <a-row >
                                <div :style="{color:item.color}">
                                <a-col span="8">
                                    <span>
                                        <a-icon type="clock-circle" style="margin-right: 8px" />{{ item.tips }}
                                    </span>
                                </a-col>
                                <a-col span="7">
                                    <span v-if="time[index]">倒计时{{ time[index].day }}天{{ time[index].hour }}时{{ time[index].minute }}分钟{{ time[index].second }}秒</span>
                                    <span v-else>活动已结束</span>
                                </a-col>
                                <a-col span="6">
                                    <span>
                                        <a-icon type="clock-circle" style="margin-right: 8px" />
                                        <span v-if="item.color === '#87d068'">在期&nbsp;|&nbsp;报名中</span>
                                        <span v-else-if="item.color === 'orange'">在期&nbsp;|&nbsp;等待竞赛</span>
                                        <span v-else-if="item.color === '#f50'">在期&nbsp;|&nbsp;竞赛中</span>
                                        <span v-else>往期&nbsp;|&nbsp;已结束</span>
                                    </span>
                                </a-col>
                                </div>
                                <a-col span="3">
                                    <span>
                                        <a-icon type="clock-circle" style="margin-right: 8px" />
                                        <span v-if="item.contestLevel  === 1">初级</span>
                                        <span v-else-if="item.contestLevel === 2">中级</span>
                                        <span v-else>高级</span>
                                    </span>
                                </a-col>
                            </a-row>
                        </div>
                        <router-link slot="title" :to="{name:'gameContent', query:{teamId:item.id}}">{{item.contestName}}<a-icon type="share-alt" /></router-link>
                        <a-badge slot="avatar" :count="item.contentPower === 1 ? '免费' : 'VIP'" 
                        :offset="[-25,5]"
                        :numberStyle="{background:'green','border-radius':'0'}">
                            <!-- <img width="120" alt="logo" :src="item.contestLogo" /> -->
                            <img width="150" height="110" alt="logo" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1660005742,3398689291&fm=200&gp=0.jpg" />
                        </a-badge>
                    </a-list-item-meta>

                </a-list-item>
            </a-list>
        </a-layout-content>
    </a-layout>
</template>
<script>
import { getListContest } from "@/utils/contestList"


export default {
  data() {
    return {
      listData: [],
      pagination: {
        onChange: page => {
          console.log(page);
        },
        pageSize: 10
      },
      time: [],
      timerCount:[]
    };
  },
  created() {
    this.getListContest('')
  },
  methods: {
    getListContest(data) {
        getListContest(this, data)
    }
  }
};
</script>
