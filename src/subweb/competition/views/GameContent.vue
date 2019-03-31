<template>
    <div>
        <a-card style="width: 100%" :bordered="false">
            <a-card-meta :title="item.contestName">
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" slot="avatar" style="width:250px;height:180px" />
                <template slot="description">
                    <p><span>主办方:</span>{{item.sponsorName}}</p>
                    <p>{{item.contestIntroduce}}</p>
                    <p><span>￥</span>{{item.contestReward}}奖金</p>
                    <a-row>
                        <a-col span="4">
                            <span>
                                <a-button type="primary">立即报名</a-button>
                            </span>
                        </a-col>
                        <a-col span="8">
                            <span>
                                <a-icon type="message" style="margin-right: 8px" />{{ item.contestStartTime }}</span><span>即将开赛</span>
                        </a-col>
                        <a-col span="4">
                            <span>倒计时{{ time.day }}天{{time.hour}}时{{time.minute}}分钟{{time.second}}秒</span>
                        </a-col>
                        <a-col span="4">
                            <span>
                                <a-icon type="message" style="margin-right: 8px" />在期|报名中</span>
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
                <a-card :tabList="tabListNoTitle" @tabChange="key => onTabChange(key)">
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
import { contestInfoId } from "@/common/api";

export default {
  data() {
    return {
      item: {},
      time:{
          day:0,
          hour:0,
          minute:0,
          second:0
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
      ]
    };
  },
  created() {
    contestInfoId(this.$route.query.teamId)
      .then(res => {
        console.log(res)
        this.item = res.data
        let endtime = new Date(res.data.contentJoinTime)
        let that = this
        let tmp = parseInt((endtime.getTime()-new Date().getTime())/1000)
        if(tmp > 0){
        var t =  setInterval(function () {
                    let nowtime = new Date()
                    var lefttime= parseInt((endtime.getTime()-nowtime.getTime())/1000); 
                    let d=parseInt(lefttime/3600/24)
                    let h= parseInt(lefttime/(60*60))%24
                    let m= parseInt(lefttime/(60))%60
                    let s= parseInt(lefttime%60)
                    // that.time.day = d
                    // that.time.hour = h
                    // that.time.minute = m
                    // that.time.second = s
                    console.log('second='+s)
        }, 1000)
        } else{
            clearInterval(t)
            this.time.day = '已结束'
        }

        // console.log(d,h,m,s)
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onTabChange(key) {
      this.$router.push({ name: key })
    }
  }
};
</script>


