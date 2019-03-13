<template>
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="vertical"
          :style="{ height: '100%', borderRight: 0 }"
        >
            <a-menu-item key="1">
                <span><a-icon type="mail" /><span>竞赛库</span></span>
            </a-menu-item>
            <a-menu-item key="2">
                <span>研发部</span>
            </a-menu-item>
            <a-sub-menu key="sub1">
                <span slot="title"><span>技术部</span></span>
                <a-menu-item key="3">Option 3</a-menu-item>
                <a-menu-item key="4">Option 4</a-menu-item>
            <a-sub-menu key="sub1-2" title="Submenu">
                <a-menu-item key="5">Option 5</a-menu-item>
                <a-menu-item key="6">Option 6</a-menu-item>
            </a-sub-menu>
            </a-sub-menu>
            <a-sub-menu key="sub2">
                <span slot="title">待开发</span>
                <a-menu-item key="7">Option 7</a-menu-item>
                <a-menu-item key="8">Option 8</a-menu-item>
                <a-menu-item key="9">Option 9</a-menu-item>
                <a-menu-item key="10">Option 10</a-menu-item>
            </a-sub-menu>
        </a-menu>
      </a-layout-sider>
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
          <list />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import list from '../components/List'

export default {
    components:{
        list
    },
  methods: {

  }
};
</script>


