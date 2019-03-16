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

        <a-table :dataSource="dataSource" :columns="columns">
            <span slot="rank"><a-icon type="smile-o" /> 排名</span>
            <span slot="tags" slot-scope="tags">
                <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
            </span>
        </a-table>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  data () {
    return {
        dataSource: [{
            key: '0',
            rank:"1",
            name:"sgg",
            note:'36ren',
            tags: ['nice', 'developer'],
            reword:"1000元奖金",
            time:'30:22',
        }, {
            key: '1',
            rank:"2",
            name:"ruj",
            note:'36ren',
            tags: ['loser'],
            reword:"1000元奖金",
            time:'30:22',
        }],
        columns: [{
            slots: { title: 'rank' },
            dataIndex: 'rank',
        }, {
            title: '姓名',
            dataIndex: 'name',
        }, {
            title: '耗时',
            dataIndex: 'time',
        }, {
            title: '分数',
            key: 'tags',
            dataIndex: 'tags',
            scopedSlots: { customRender: 'tags' },
        }, {
            title: '奖金',
            dataIndex: 'reword',
        }, {
            title: '备注',
            dataIndex: 'note',
        }]
    }
  },
}
</script>
