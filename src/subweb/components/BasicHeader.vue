<template>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', background:'#fff'}">
      <div class="logo" />
        <a-menu
        theme="light"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        v-if="this.$store.state.isLogin"
        >
            <a-sub-menu key="sub1">
                <span slot="title">首页</span>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <span slot="title">应用</span>
            </a-sub-menu>
            <a-sub-menu key="sub3">
            <span slot="title">灯芯科技<a-icon type="down" /></span>
            <a-menu-item key="1">option9</a-menu-item>
            <a-menu-item key="2">option10</a-menu-item>
            <a-menu-item key="3">option11</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub6">
                <span slot="title">教育培训</span>
            </a-sub-menu>
            <a-menu-item key="8"><router-link to="/competition">竞赛活动</router-link></a-menu-item> 
            <a-sub-menu key="sub8">
                <span slot="title">人才猎聘</span>
            </a-sub-menu>
            <a-sub-menu key="sub9">
                <span slot="title">工作任务</span>
            </a-sub-menu>
            <a-sub-menu key="sub10">
                <span slot="title">
                    <span>
                        <img src="https://e.jikexueyuan.com/headerandfooter/images/logo.png?t=1513326254000" style="width:30px;border-radius:50%;">
                    </span>
                    <span>{{ this.$store.state.userName }}</span>
                </span>
                <a-menu-item key="10"><router-link to="/account">个人信息</router-link></a-menu-item>
                <a-menu-item key="11"><router-link to="/account/securitySettings">修改密码</router-link></a-menu-item>
                <a-menu-item key="12"><span @click="handleLogout">退出登录</span></a-menu-item>
                <a-menu-item key="7"><router-link to="/org">组织管理</router-link></a-menu-item>
                <a-sub-menu key="sub10-1" title="团队管理">
                    <a-menu-item key="4"><router-link to="/team/member">成员</router-link></a-menu-item>
                    <a-menu-item key="5"><router-link to="/team/role">角色</router-link></a-menu-item>
                    <a-menu-item key="6"><router-link to="/team/group">群组</router-link></a-menu-item>
                </a-sub-menu>
            </a-sub-menu>
             <!-- <a-menu-item > -->
            <a-popover  trigger="click">
                <template slot="content">
                        <a-tabs defaultActiveKey="1" @change="callback" :animated='animated'>
                            <a-tab-pane tab="通知（1）" key="1">
                                <a-list
                                    itemLayout="horizontal"
                                    :dataSource="data"
                                >
                                    <a-list-item slot="renderItem" slot-scope="item, index">
                                    <a-list-item-meta
                                        description="今天是个好日子"
                                    >
                                        <a slot="title" href="https://vue.ant.design/">{{item.title}}&nbsp;&nbsp;&nbsp;<a-tag color="pink">未开始</a-tag></a>
                                        <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    </a-list-item-meta>
                                    </a-list-item>
                                </a-list>
                                <p>加载更多</p>
                                <p>清空代办</p>
                            </a-tab-pane>
                            <a-tab-pane tab="消息（2）" key="2" >Content of Tab Pane 2</a-tab-pane>
                            <a-tab-pane tab="代办（4）" key="3" >Content of Tab Pane 2</a-tab-pane>
                        </a-tabs>
                </template>
                 <a-button type="default" icon="bell" style="border:#fff"></a-button>
            </a-popover>
            <!-- </a-menu-item> -->
        </a-menu>

        <a-menu
        theme="light"
        mode="horizontal"
        :defaultSelectedKeys="['1']"
        :style="{ lineHeight: '64px' }"
        v-else
        >
            <a-menu-item key="1"><router-link to="/front">首页</router-link></a-menu-item>
            <a-menu-item key="2">应用</a-menu-item>
            <a-menu-item key="3">服务</a-menu-item>
            <a-menu-item key="4">关于</a-menu-item>
            <a-menu-item key="5"><router-link to="/competition">竞赛活动</router-link></a-menu-item> 
            <a-menu-item key="6"><router-link to="/front/login">登陆</router-link></a-menu-item> 
            <a-menu-item key="7"><router-link to="/front/register">注册</router-link></a-menu-item> 
        </a-menu>
    </a-layout-header>
</template>

<script>
import { logout } from '@/common/api'

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
]

export default {
    data(){
        return{
            animated:false,
            data
        }
    },
    methods: {
        callback (key) {
            console.log(key)
        },
        handleLogout(){
            console.log("退出")
            logout(this.$store.state.token)
            .then(res => {
                    console.log(res)
                    this.$notification['success']({
                    message: '提示',
                    description: '注销成功',
                    duration: 2
                    })
                    this.$store.state.isLogin = false
                    this.$router.push ({path:'/front'}) 
            })
            .catch(err => {
                console.log(err)
            })
        }
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
