<template>
<div>
  <a-table :columns="columns" :dataSource="data">
    <span slot="customTitle"><a-icon type="smile-o" />排名</span>
    <span slot="tags" slot-scope="tags">
      <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
    </span>
  </a-table>
  <a-table :columns="columns" :dataSource="data">
    <span slot="customTitle"><a-icon type="smile-o" />排名</span>
    <span slot="tags" slot-scope="tags">
      <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
    </span>
  </a-table>
</div>
</template>

<script>
import { situation } from '@/common/api'

const columns = [{
  dataIndex: 'rank',
  key: 'rank',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'rank' },
}, {
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '耗时',
  dataIndex: 'time',
  key: 'time',
}, {
  title: '分数',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
}, {
  title: '奖励',
  key: 'reword',
  dataIndex: 'reword',
}, {
  title: '备注',
  key: 'note',
  dataIndex: 'note',
}];

const data = [{
  key: '1',
  name: 'John Brown',
  rank: 2,
  reword: '1000奖金',
  time:'30:12',
  tags: ['99'],
  note:'万岁'
}];

export default {
  data() {
    return {
      data,
      columns,
    }
  },
  created(){
    situation(this.$route.query.contestId)
    .then(res => {
      console.log('我的赛况', res)
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>