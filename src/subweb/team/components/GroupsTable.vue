<template>
<div>
  <slot>
    <a-button class="editable-add-btn" @click="handleAdd" type="primary"><a-icon type="plus" />新增</a-button>
    <a-table :dataSource="dataSource" :columns="columns" :pagination="pagination">
      <!-- 表头LOGO自定义 -->
      <span slot="Logo"><a-icon type="smile-o" />LOGO</span>

      <!-- 行内数据自定义 -->
      <span slot="groupLogo" slot-scope="logo">
        <img :src="logo" alt="LOGO" srcset="">
      </span>
      <span slot="members" slot-scope="members">
        <router-link to="group/member">{{members}}[点击查看]</router-link>
      </span>
      <template slot="dataStatus" slot-scope="status">
        <a-tag color="blue" v-if="status === 1">报名</a-tag>
        <a-tag color="blue" v-else-if="status === 2">在期</a-tag>
        <a-tag color="blue" v-else>结束</a-tag>
      </template>
      <template slot="operation" slot-scope="id">
        <div @click="editGroup(id)">
        <a href="javascript:;" >编辑</a>
        </div>
      </template>
    </a-table>
    <groups-layer
    ref="GroupsLayer"
    />
  </slot>
</div>
</template>
<script>
import GroupsLayer from './GroupsLayer'
import { teamGroup } from '@/common/api'

export default {
  components: {
    GroupsLayer
  },
  created(){
    this.getTeamGroup()
  },
  data () {
    return {
      pagination:{defaultPageSize:10},
      dataSource: [],
      columns: [{
        slots: { title: 'Logo' },
        dataIndex: 'groupLogo',
        scopedSlots: { customRender:'groupLogo' }
      }, {
        title: '群组名称',
        dataIndex: 'groupName',
      },{
        title: '成员总数',
        dataIndex: 'memberCount',
        scopedSlots: { customRender: 'members' },
      },{
        title: '备注',
        dataIndex: 'groupReserve',
      }, {
        title: '群组状态',
        dataIndex: 'dataStatus',
        scopedSlots: { customRender: 'dataStatus' },
      },  {
        title: '操作',
        dataIndex: 'id',
        scopedSlots: { customRender: 'operation' },
      }],
    }
  },
  methods: {
    handleAdd () {
      this.$refs.GroupsLayer.title='创建群组'
      this.$refs.GroupsLayer.visible=!this.$refs.GroupsLayer.visible
    },
    editGroup(id){
      this.$refs.GroupsLayer.getGroupDetails(id)
    },
    getTeamGroup(){
      teamGroup('pageSize=1000', this.$store.state.token)
        .then(res => {
        console.log('群组列表', res)
          if (res.code === 4401) {
          return this.$notification.error({
          message: '注意',
          description: '用户已失效，请重新登录',
          })
        }

        this.dataSource = res.data.list
        for (let i=0;i<this.dataSource.length;i++) {
          this.dataSource[i].key = this.dataSource[i].id
        }
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
}
</script>
<style scoped>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
}
</style>