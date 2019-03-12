<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd" type="primary"><a-icon type="plus" />新增</a-button>
    <a-table :dataSource="dataSource" :columns="columns" :pagination="pagination">
      <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
      </span>
      <template slot="operation" slot-scope="text, record">
        <div @click="editRole">
        <a href="javascript:;" >编辑</a>
        </div>
      </template>
    </a-table>
    <roles-layer
    ref="RolesLayer"
    />
  </div>
</template>
<script>
import RolesLayer from './RolesLayer'

export default {
  components: {
    RolesLayer
  },
  data () {
    return {
      pagination:{defaultPageSize:10},
      visible:false,
      dataSource: [{
        key: '0',
        avatar:"afanda",
        note:'36ren',
        tags: ['nice', 'developer'],
      }, {
        key: '1',
        avatar:"afanda",
        note:'36ren',
        tags: ['loser'],
      }],
      columns: [{
        title: '\u263A名称',
        dataIndex: 'avatar',
      }, {
        title: '备注',
        dataIndex: 'note',
      }, {
        title: '状态',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' },
      }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }]
    }
  },
  methods: {
    handleAdd () {
      this.$refs.RolesLayer.title="创建角色";
      this.$refs.RolesLayer.visible=!this.$refs.RolesLayer.visible;
    },
    editRole(){
      this.$refs.RolesLayer.title="编辑角色";
      this.$refs.RolesLayer.visible=!this.$refs.RolesLayer.visible;
    },
  },
}
</script>
<style>
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