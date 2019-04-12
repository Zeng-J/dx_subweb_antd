<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd" type="primary"><a-icon type="plus" />新增</a-button>
    <a-table :dataSource="dataSource" :columns="columns" rowKey="id" change="change">
      <template slot="logo" slot-scope="text">
        <img :src="text" alt="" style="width:30px">
      </template>
      <template slot="userSex" slot-scope="text">
        <span v-text="text==0?'女':'男'"></span>
      </template>
        <span slot="status" slot-scope="tag">
        <a-tag color="blue" v-text="tag ===1 ? '启用' : '禁用'"></a-tag>
      </span>
      <template slot="operation" slot-scope="text">
        <div @click="edit(text)">
        <a href="javascript:;" >编辑</a>
        </div>
      </template>
    </a-table>
    <members-layer
    ref="MembersLayer"
    @getTeamMember="getTeamMember"
    />
  </div>
</template>
<script>
import MembersLayer from './MembersLayer'
import { teamMember } from '@/common/api'

export default {
  components: {
    MembersLayer,
  },
  data () {
    return {
      dataSource: [],
      columns: [{
        title: '头像',
        dataIndex: 'userLogo',
        scopedSlots: { customRender: 'logo' }
      }, {
        title: '姓名',
        dataIndex: 'userName',
      },{
        title: '性别',
        dataIndex: 'userSex',
        scopedSlots: { customRender: 'userSex' }
      },{
        title: '手机号',
        dataIndex: 'userMobile',
      },{
        title: '角色',
        dataIndex: 'roleIds',
      },{
        title: '电子邮箱',
        dataIndex: 'email',
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
        dataIndex: 'id',
        scopedSlots: { customRender: 'operation' },
      }],
    }
  },
  created(){
    this.getTeamMember()
  },
  methods: {
    handleAdd () {
      this.$refs.MembersLayer.addTeamMember()
    },
    edit(text){
      // console.log(text)
      this.$refs.MembersLayer.getMemberDetail(text)
      this.$refs.MembersLayer.title='编辑成员'
      // this.$refs.MembersLayer.visible=!this.$refs.MembersLayer.visible
    },
    getTeamMember(){
      teamMember('pageSize=52', this.$store.state.token)
      .then(res => {
        console.log('团队成员',res)
        if (res.code === 4401) {
        return this.$notification.error({
                message: '注意',
                description: '用户已失效，请重新登录',
                })
        }
        this.dataSource = res.data.list
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
}
</script>
<style scoped>


.editable-add-btn {
  margin-bottom: 8px;
}
</style>
