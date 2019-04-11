<template>
  <div>
    <a-button class="editable-add-btn" @click=handleAdd() type="primary"><a-icon type="plus" />新增</a-button>
    <a-table :dataSource="dataSource" :columns="columns" :pagination="pagination">
      <!-- slot-scope 有两个参数值，名字随意命名。第一个参数为当前该行该列的值，第二个参数为该列的所有值，为一个对象 -->
      <span slot="dataStatus" slot-scope="tag">
        <a-tag color="blue" v-text="tag ===1 ? '启用' : '禁用'"></a-tag>
      </span>
      <span slot="admin" slot-scope="tag">
        <a-tag color="blue" v-text="tag ===1 ? '是' : '否'"></a-tag>
      </span>
      <template slot="operation" slot-scope="id">
        <div @click="editRole(id)">
        <a href="javascript:;" >编辑</a>
        </div>
      </template>
    </a-table>
    <roles-layer
    ref="RolesLayer"
    @getTeamRolesList='getTeamRolesList'
    />
  </div>
</template>
<script>
import RolesLayer from './RolesLayer'
import { roleList } from '@/common/api'

export default {
  components: {
    RolesLayer
  },
  data () {
    return {
      pagination:{defaultPageSize:10},
      visible:false,
      dataSource: [],
      columns: [{
        title: '\u263A名称',
        dataIndex: 'roleName',
      }, {
        title: '管理员',
        dataIndex: 'isAdmin',
        scopedSlots: { customRender: 'admin' },
      }, {
        title: '备注',
        dataIndex: 'roleReserve',
      }, {
        title: '状态',
        dataIndex: 'dataStatus',
        scopedSlots: { customRender: 'dataStatus' },
      }, {
        title: '操作',
        dataIndex: 'id',
        scopedSlots: { customRender: 'operation' },
      }]
    }
  },
  created(){
    this.getTeamRolesList()
  },
  methods: {
    handleAdd () {
      console.log("fs");
      this.$refs.RolesLayer.title="创建角色";
      this.$refs.RolesLayer.visible=!this.$refs.RolesLayer.visible;
    },
    editRole(id){
      // console.log(id)
      this.$refs.RolesLayer.getRoleDetails(id)
    },
    getTeamRolesList(){
    roleList(this.$store.state.token)
      .then(res => {
        console.log('角色列表', res)
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