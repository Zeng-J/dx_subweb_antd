<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd" type="primary"><a-icon type="plus" />新增</a-button>
    <a-table :dataSource="dataSource" :columns="columns">
      <template slot="operation" slot-scope="text, record">
        <!-- <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)">
          <a href="javascript:;">Delete</a>
        </a-popconfirm> -->
        <div @click="edit">
        <a href="javascript:;" >编辑</a>
        </div>
      </template>
    </a-table>
    <members-layer
    ref="MembersLayer"
    />
  </div>
</template>
<script>
import MembersLayer from './MembersLayer'

export default {
  components: {
    MembersLayer,
  },
  data () {
    return {
      dataSource: [{
        key: '0',
        avatar:"afanda",
        name: 'Edward King 0',
        age: '32',
        gender:"男",
        mobile:"13430200126",
        role:"管理员",
        email:"1293485@qq.com",
        status:"启用",
        note:"管理"
      }, {
        key: '1',
        avatar:"afanda",
        name: 'Edward King 0',
        age: '32',
        gender:"男",
        mobile:"13430200126",
        role:"管理员",
        email:"1293485@qq.com",
        status:"启用",
        note:"管理"
      }],
      columns: [{
        title: '头像',
        dataIndex: 'avatar',
      }, {
        title: '姓名',
        dataIndex: 'name',
      },{
        title: '性别',
        dataIndex: 'gender',
      },{
        title: '手机号',
        dataIndex: 'mobile',
      },{
        title: '角色',
        dataIndex: 'role',
      },{
        title: '电子邮箱',
        dataIndex: 'email',
      },{
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '备注',
        dataIndex: 'note',
      }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }],
    }
  },
  methods: {
    handleAdd () {
      this.$refs.MembersLayer.title='创建成员';
      this.$refs.MembersLayer.visible=!this.$refs.MembersLayer.visible;
    },
    edit(){
      this.$refs.MembersLayer.title='编辑成员';
      this.$refs.MembersLayer.visible=!this.$refs.MembersLayer.visible;
    }
  },
}
</script>
<style scoped>


.editable-add-btn {
  margin-bottom: 8px;
}
</style>
