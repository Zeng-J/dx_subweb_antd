<template>
    <div>
        <a-card style="width: 100%" :bordered="false">
            <a-card-meta :title="item.contestName">
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" slot="avatar" style="width:250px;height:180px" />
                <template slot="description">
                    <p>
                        <span>主办方:</span>{{item.sponsorName}}</p>
                    <p>{{item.contestIntroduce}}</p>
                    <p>
                        <span>￥</span>{{item.contestReward}}奖金</p>
                    <a-row :style="{color:item.color}">
                        <a-col span="4">
                            <span>
                                <a-button v-if="item.userJoinState" disabled>已报名</a-button>
                                <a-button type="primary" v-else :disabled="item.color === 'black'" @click="() => {this.key='enrol'}">
                                    <router-link to="enrol" >立即报名</router-link>
                                </a-button>
                            </span>
                        </a-col>
                        <a-col span="8">
                            <span>
                                <a-icon type="clock-circle" style="margin-right: 8px" />{{ item.tips }}
                            </span>
                        </a-col>
                        <a-col span="4">
                            <span v-if="time">倒计时{{ time.day }}天{{time.hour}}时{{time.minute}}分钟{{time.second}}秒</span>
                            <span v-else>活动已结束</span>
                        </a-col>
                        <a-col span="4">
                            <span>
                                <a-icon type="clock-circle" style="margin-right: 8px" />
                                <span v-if="item.color === '#87d068'">在期&nbsp;|&nbsp;报名中</span>
                                <span v-else-if="item.color === 'orange'">在期&nbsp;|&nbsp;等待竞赛</span>
                                <span v-else-if="item.color === '#f50'">在期&nbsp;|&nbsp;竞赛中</span>
                                <span v-else>往期&nbsp;|&nbsp;已结束</span>
                            </span>
                        </a-col>
                        <a-col span="4">
                            <span>{{item .contestUserNum }}人参与</span>
                        </a-col>
                    </a-row>
                </template>
            </a-card-meta>
        </a-card>
        <a-row :gutter="16">
            <a-col :span="20">
                <a-card :tabList="tabListNoTitle" @tabChange="key => onTabChange(key)" :activeTabKey="key">
                    <router-view></router-view>
                </a-card>
            </a-col>
            <a-col :span="4">
                <a-card title="主办方">
                    <a :href="item.sponsorWebsite"><img :src="item.sponsorLogo" style="width:100%">
                        <h4>{{item.sponsorName}}</h4>
                    </a>
                    <p>{{item.sponsorIntroduce}}</p>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import { contestInfoId } from "@/common/api"

export default {
  data() {
    return {
        item: {},
        key:'details',
        time: {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0
        },
        tabListNoTitle: [
            {
                key: "details",
                tab: "竞赛详情"
            },
            {
                key: "allEvents",
                tab: "全部赛况"
            },
            {
                key: "myEvent",
                tab: "我的赛况"
            },
            {
                key: "enrol",
                tab: "报名填表"
            },
            {
                key: "test",
                tab: "进入答题"
            }
        ],
    }
  },
  created() {
    if (this.$store.state.isLogin === false) {
        this.contestInfoId('open', '')
    } else {
         this.contestInfoId('auth', this.$store.state.token)
    }
  },
  methods: {
    onTabChange(key) {
        this.key=key
        this.$router.push({ name: key, query:{contestId:this.item.id} });
    },
    contestInfoId(addr, token) {
      contestInfoId(addr, this.$route.query.teamId, token)
        .then(res => {
          console.log(res)
          this.item = res.data
          let that = this

          let end1 = new Date(res.data.contentJoinTime);
          let end2 = new Date(res.data.contestStartTime);
          let end3 = new Date(res.data.contestEndTime);

          let tmp1 = (end1.getTime() - new Date().getTime()) / 1000;
          let tmp2 = (end2.getTime() - new Date().getTime()) / 1000;
          let tmp3 = (end3.getTime() - new Date().getTime()) / 1000;

          let tmp, endtime;
          if (tmp1 > 0) {
            tmp = tmp1;
            endtime = end1.getTime();
            that.item.tips = end1.toLocaleString() + " 截至报名";
            that.item.color = "#87d068";
          } else if (tmp2 > 0) {
            tmp = tmp2;
            endtime = end2.getTime();
            that.item.tips = end2.toLocaleString() + " 开始竞赛";
            that.item.color = "orange";
          } else if (tmp3 > 0) {
            tmp = tmp3;
            endtime = end3.getTime();
            that.item.tips = end3.toLocaleString() + " 结束竞赛";
            that.item.color = "#f50";
          } else {
            clearInterval(t);
            that.time = null;
            tmp = 0;
            that.item.tips = end3.toLocaleString() + " 已结束";
            that.item.color = "black";
          }
          if (tmp > 0) {
            var t = setInterval(function() {
              let nowtime = new Date()
              var lefttime = parseInt((endtime - nowtime.getTime()) / 1000);
              let d = parseInt(lefttime / 3600 / 24);
              let h = parseInt(lefttime / (60 * 60)) % 24;
              let m = parseInt(lefttime / 60) % 60;
              let s = parseInt(lefttime % 60);
              that.time.day = d;
              that.time.hour = h;
              that.time.minute = m;
              that.time.second = s;
            }, 1000)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>


