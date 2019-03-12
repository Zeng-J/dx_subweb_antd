<template>
<div>
  <slot>
    <a-button class="editable-add-btn" @click="handleAdd" type="primary"><a-icon type="plus" />新增</a-button>
    <a-table :dataSource="dataSource" :columns="columns" :pagination="pagination">
      <span slot="tags" slot-scope="tags">
        <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
      </span>
      <span slot="members" slot-scope="members">
        <router-link to="group/member">{{members}}[点击查看]</router-link>
      </span>
      <template slot="operation" slot-scope="text, record">
        <div @click="editGroup">
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

export default {
  components: {
    GroupsLayer
  },
  data () {
    return {
      pagination:{defaultPageSize:10},
      // visible:false,
      dataSource: [{
        key: '0',
        avatar:"afanda",
        name: 'Edward King 0',
        members:'36ren',
        tags: ['nice', 'developer'],
      }, {
        key: '1',
        avatar:"afanda",
        name: 'Edward King 0',
        members:'36ren',
        tags: ['loser'],
      }],
      columns: [{
        title: '\u263ALOGO',
        dataIndex: 'avatar',
      }, {
        title: '名称',
        dataIndex: 'name',
      },{
        title: '成员',
        dataIndex: 'members',
        scopedSlots: { customRender: 'members' },
      },{
        title: '备注',
        key: 'tags',
        dataIndex: 'tags',
        scopedSlots: { customRender: 'tags' },
      }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' },
      }],
    }
  },
  methods: {
    handleAdd () {
      this.$refs.GroupsLayer.title='创建群组';
      this.$refs.GroupsLayer.visible=!this.$refs.GroupsLayer.visible;
    },
    editGroup(){
      this.$refs.GroupsLayer.title='编辑群组';
      this.$refs.GroupsLayer.visible=!this.$refs.GroupsLayer.visible;
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