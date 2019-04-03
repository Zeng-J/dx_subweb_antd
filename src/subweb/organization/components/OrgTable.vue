<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd" type="primary"><a-icon type="plus" />新增</a-button>
    <a-table :dataSource="dataSource" :columns="columns">
      <span slot="customTitle"><a-icon type="smile-o" />LOGO</span>
      <template slot="operation" slot-scope="text, record">
        <div @click="edit">
        <a href="javascript:;" >编辑</a>
        </div>
      </template>
    </a-table>
    <org-layer
    ref="OrgLayer"
    />
  </div>
</template>
<script>
import OrgLayer from './OrgLayer'
import { orgMgtList } from '@/common/api'

export default {
  components: {
    OrgLayer,
  },
  data () {
    return {
      dataSource: [{
        key: '0',
        avatar:"afanda",
        name: 'Edward King 0',
        role:"管理员",
        status:"启用",
        note:"管理",
        suffix:'zuizui',
        Website:'www.kao.com',
        current:'fae'
      }, {
        key: '1',
        avatar:"afanda",
        name: 'Edward King 0',
        role:"管理员",
        status:"启用",
        note:"管理",
        suffix:'zuizui',
        Website:'www.kao.com',
        current:'fae'
      },],
      columns: [{
        slots: { title: 'customTitle' },
        dataIndex: 'avatar',
        scopedSlots: { customRender: 'logo' },
      }, {
        title: '团队名称',
        dataIndex: 'name',
      },{
        title: '团队后缀',
        dataIndex: 'suffix',
      },{
        title: '团队网址',
        dataIndex: 'website',
      },{
        title: '角色',
        dataIndex: 'role',
      },{
        title: '备注',
        dataIndex: 'note',
      },{
        title: '状态',
        dataIndex: 'status',
      },
      {
        title: '当前团队',
        dataIndex: 'current',
      },{
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }],
    }
  },
  created(){
    this.getOrgMgtList()
  },
  methods: {
    getOrgMgtList(){
      console.log(this.$store.state.token)
      orgMgtList(this.$store.state.token)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    },
    handleAdd () {
      this.$refs.OrgLayer.title='创建组织';
      this.$refs.OrgLayer.visible=!this.$refs.OrgLayer.visible;
    },
    edit(){
      this.$refs.OrgLayer.title='编辑组织';
      this.$refs.OrgLayer.visible=!this.$refs.OrgLayer.visible;
    }
  },
}
</script>
<style scoped>


.editable-add-btn {
  margin-bottom: 8px;
}
</style>
