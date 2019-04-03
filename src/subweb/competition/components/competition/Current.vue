<template>
    <a-layout style="padding: 0 0 0 2px;">
        <a-layout-content style=" background:#fff;padding: 14px;">
            <a-menu mode="horizontal">
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
                        <a-badge slot="avatar" :count="item.contentPower === 1 ? '免费' : 'VIP'" :numberStyle="{background:'green','border-radius':'0'}">
                            <img width="120" alt="logo" :src="item.contestLogo" />
                        </a-badge>
                    </a-list-item-meta>

                </a-list-item>
            </a-list>
        </a-layout-content>
    </a-layout>
</template>
<script>
import { listContest } from "@/common/api";

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
      time: []
    };
  },
  created() {
    this.getListContest();
  },
  methods: {
    getListContest() {
      listContest("term=1")
        .then(res => {
          console.log(res)
          this.listData = res.data.list
          let that = this
          for (let i = 0; i < this.listData.length; i++) { 
            // let endtime = new Date("2019-05-28 19:20:00")
            // let endtime = new Date(this.listData[i].contentJoinTime)
       
            // let tmp = (endtime.getTime() - new Date().getTime()) / 1000
                let end1 = new Date(this.listData[i].contentJoinTime)
                let end2 = new Date(this.listData[i].contestStartTime )
                let end3 = new Date(this.listData[i].contestEndTime )

                let tmp1 = (end1.getTime() - new Date().getTime()) / 1000
                let tmp2 = (end2.getTime() - new Date().getTime()) / 1000
                let tmp3 = (end3.getTime() - new Date().getTime()) / 1000

                let tmp, endtime
            if (tmp1>0) {
                tmp = tmp1
                endtime = end1.getTime()
                that.listData[i].tips = end1.toLocaleString() + " 截至报名"
                that.listData[i].color = "#87d068" 
            } else if (tmp2>0) {
                tmp = tmp2
                endtime = end2.getTime()
                that.listData[i].tips = end2.toLocaleString() + " 开始竞赛"
                that.listData[i].color = "orange" 
            } else if (tmp3>0) {
                tmp = tmp3
                endtime = end3.getTime()
                that.listData[i].tips = end3.toLocaleString() + " 结束竞赛"
                that.listData[i].color = "#f50" 
            } else {
                that.time.push(null)
                tmp = 0
                that.listData[i].tips = end3.toLocaleString() + " 已结束"
                that.listData[i].color = "black" 
            }
        
            if (tmp > 0) {
              that.time.push({
                day: 0,
                hour: 0,
                minute: 0,
                second: 0
              })
              ;(function(a) {
                setInterval(function() {
                  let nowtime = new Date();
                  // let endtime = new Date("2019-05-28 19:20:00")
                //   console.log(endtime)
                  var lefttime = parseInt(
                    (endtime - nowtime.getTime()) / 1000
                  );

                  let d = parseInt(lefttime / 3600 / 24);
                  let h = parseInt(lefttime / (60 * 60)) % 24;
                  let m = parseInt(lefttime / 60) % 60;
                  let s = parseInt(lefttime % 60);
                  that.time[a].day = d;
                  that.time[a].hour = h;
                  that.time[a].minute = m;
                  that.time[a].second = s;
                  // console.log('second='+s)
                }, 1000);
              })(i);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
