<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd" type="primary"><a-icon type="plus" />新增</a-button>
    <a-table :dataSource="dataSource" :columns="columns">
      <span slot="customTitle"><a-icon type="smile-o" />LOGO</span>

      <template slot="logo" slot-scope="text">
        <!-- <a href="javascript:;" >{{text}}</a> -->
        <img :src="text" alt="" >
      </template>
      <template slot="operation">
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
      dataSource: [],
      columns: [{
        slots: { title: 'customTitle' },
        dataIndex: 'orgLogo',
        scopedSlots: { customRender: 'logo' },
      }, {
        title: '团队名称',
        dataIndex: 'orgName',
      },{
        title: '团队后缀',
        dataIndex: 'orgSuffix',
      },{
        title: '团队网址',
        dataIndex: 'orgUrl',
      },{
        title: '角色',
        dataIndex: 'roles',
      },{
        title: '备注',
        dataIndex: 'note',
      },{
        title: '当前团队',
        dataIndex: 'is_current',
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
      orgMgtList()
      .then(res => {
        console.log('组织列表', res)

        if (res.code === 4401) {
          return this.$notification.error({
          message: '注意',
          description: '用户已失效，请重新登录',
          })
        }

        if (res.code === 200) {
          this.dataSource = res.data.list 
          for (let i=0;i<this.dataSource.length;i++) {
            this.dataSource[i].key = this.dataSource[i].orgSuffix
          }
        }
        // console.log(this.dataSource)
        // console.log(res)
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
