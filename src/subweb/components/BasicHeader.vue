<template>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%', background:'#fff'}">
      <div class="logo" />
        <a-menu
        theme="light"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        
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
            <a-sub-menu key="sub4">
                <span slot="title">团队管理<a-icon type="down" /></span>
                <a-menu-item key="4"><router-link to="/team/member">成员</router-link></a-menu-item>
                <a-menu-item key="5"><router-link to="/team/role">角色</router-link></a-menu-item>
                <a-menu-item key="6"><router-link to="/team/group">群组</router-link></a-menu-item>
            </a-sub-menu>
            <a-menu-item key="7"><router-link to="/org">组织管理</router-link></a-menu-item>
            <!-- <a-sub-menu key="sub5">
                <span slot="title"><router-link to="/org">组织管理</router-link><a-icon type="down" /></span>
            </a-sub-menu> -->
            <a-sub-menu key="sub6">
                <span slot="title">教育培训</span>
            </a-sub-menu>
            <a-sub-menu key="sub7">
                <span slot="title">竞赛活动</span>
            </a-sub-menu>   
            <a-sub-menu key="sub8">
                <span slot="title">人才猎聘</span>
            </a-sub-menu>
            <a-sub-menu key="sub9">
                <span slot="title">工作任务</span>
            </a-sub-menu>
            <a-sub-menu key="sub10">
                <span slot="title">admin<a-icon type="bell" /></span>
                <a-menu-item key="10">个人信息</a-menu-item>
                <a-menu-item key="11">修改密码</a-menu-item>
                <a-menu-item key="12">退出登录</a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-header>
</template>

<script>
export default {
    
}
</script>

