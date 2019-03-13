<template>
<div>
  <a-list
    itemLayout="vertical"
    size="large"
    :dataSource="listData"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" key="item.title">
        <a-list-item-meta>
            <router-link slot="title" to="/competition/message">{{item.title}}</router-link>
            <div slot="description">
                <p>{{item.description}}</p>
                <p>{{item.content}}</p>
                <p>
                    <span style="color:red;">￥1000</span>奖金
                </p>
                <a-row>
                    <a-col span="4">
                        <span ><a-button type="primary">立即报名</a-button></span>
                    </a-col>
                    <a-col span="4">
                        <span ><a-icon type="message" style="margin-right: 8px" />2019-10-10 09:12</span>
                    </a-col>
                    <a-col span="4">
                        <span >即将开赛</span>
                    </a-col>
                    <a-col span="4">
                        <span >倒计时15时36分'</span>
                    </a-col>
                    <a-col span="4">
                        <span ><a-icon type="message" style="margin-right: 8px" />在期|报名中</span>
                    </a-col>
                </a-row>
            </div>
            <img  slot="avatar" width="100%" alt="logo" :src="item.avatar" height="100%"/>
        </a-list-item-meta>
    </a-list-item>
  </a-list>
  <a-row :gutter="16">
    <a-col :span="20" >
        <a-card
        :tabList="tabListNoTitle"
        @tabChange="key => onTabChange(key)"
        >
            <router-view></router-view>
        </a-card>
    </a-col>
    <a-col :span="4">
        <a-card title="主办方">
            <img src=" https://e.jikexueyuan.com/headerandfooter/images/logo.png?t=1513326254000" style="width:100%">
            <h4>广州灯芯科技有限公司</h4>
            <p>简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介</p>
        </a-card>
    </a-col>
  </a-row>
  </div>
</template>
<script>
const listData = [{
    href: 'https://vue.ant.design/',
    title: 'ant design vue part',
    avatar: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2386514993,1599927311&fm=58&bpow=699&bpoh=508',
    description: '主办方：hr',
    content:'这是内容这是内容这是内容这是内容这是内容'
}]

export default {
  data () {
    return {
      listData,
      tabListNoTitle: [{
        key: 'details',
        tab: '竞赛详情',
      }, {
        key: 'allEvents',
        tab: '全部赛况',
      }, {
        key: 'myEvent',
        tab: '我的赛况',
      },{
        key: 'enrol',
        tab: '报名填表',
      }],
    }
  },
  methods:{
      onTabChange(key){
          this.$router.push({name:key})
      }
  }
}
</script>


