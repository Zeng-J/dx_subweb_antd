<template>
  <div>
    <!-- <a-button class="editable-add-btn" @click="handleAdd" type="primary"><a-icon type="plus" />新增</a-button> -->
    <a-table :dataSource="dataSource" :columns="columns">
      <img slot="logo" :src="logo" alt="" srcset="" slot-scope="logo" style="width:20px">
      <span slot="sex" slot-scope="val" v-text="val===1?'男':'女'"></span>
      <span slot="status" slot-scope="tag">
        <a-tag color="blue" v-text="tag ===1 ? '启用' : '禁用'"></a-tag>
      </span>
      <template slot="operation">
        <div>
            <router-link to="relation">成员关联</router-link>
        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import { teamMember } from '@/common/api'

export default {
  created(){
    // console.log(this.$route.query)
    teamMember('groupId='+this.$route.query.id)
    .then(res => {
      if (res.code === 200) {
        this.dataSource = res.data.list
        for (let i=0;i<this.dataSource.length;i++) {
          this.dataSource[i].key = this.dataSource[i].relUserId
        }
      }
    })
    .catch(err => {
      console.log(err)
    })
  },
  data () {
    return {
      dataSource: [],
      columns: [{
        title: '头像',
        dataIndex: 'userLogo',
        scopedSlots: { customRender:'logo' }
      }, {
        title: '姓名',
        dataIndex: 'userName',
      },{
        title: '性别',
        dataIndex: 'userSex',
        scopedSlots: { customRender:'sex' }
      },{
        title: '手机号',
        dataIndex: 'userMobile',
      },{
        title: '角色',
        dataIndex: 'roleIds',
      },{
        title: '状态',
        dataIndex: 'dataStatus',
        scopedSlots: { customRender: 'status' },
      },
      {
        title: '备注',
        dataIndex: 'memberReserve',
      }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }],
    }
  },
  methods: {
    // handleAdd () {
    //   this.$refs.MembersLayer.title='创建成员';
    //   this.$refs.MembersLayer.visible=!this.$refs.MembersLayer.visible;
    // }
  },
}
</script>
<style scoped>


.editable-add-btn {
  margin-bottom: 8px;
}
</style>

