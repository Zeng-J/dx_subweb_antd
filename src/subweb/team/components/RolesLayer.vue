<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      @cancel="handleCancel"
      @ok="handleOk"
      okText="保存"
      cancelText="返回"
    >
      <a-form :form="form">
        <a-form-item
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
          label="名称"
        >
          <a-input
            v-decorator="[
              'roleName',
              { rules: [{ required: true, message: '必填！/最长20个字符！' }] }
            ]"
            placeholder="名称"
          />
        </a-form-item>
        <a-form-item
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
          label="显示顺序"
        >
          <a-input
            v-decorator="[
              'dataOrder',
              { rules: [{ required: true, pattern: /^\d+$/, message: '必填！/只允许数字！' }] }
            ]"
            placeholder="数值越小，显示越靠前"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="状态"
        >
          <a-radio-group v-decorator="['dataStatus', { initialValue: 1 }]">
            <!-- <a-radio :value="0">删除</a-radio> -->
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="2">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="管理员"
        >
          <a-radio-group v-decorator="['isAdmin', { initialValue: 0 }]" disabled>
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="权限">
          <a-checkbox-group
            v-decorator="[
              'permissions',
              { rules: [{ required: true, message: '至少选择一项！' }], initialValue: ['1001']}]"
            style="width: 100%;"
          >
            <a-row>
              <a-col :span="12" v-for="val in permissionList" :key="val.permId">
                <a-checkbox :value="val.permId">
                  {{val.permName}}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="备注"
        >
          <a-textarea
            placeholder="Basic usage"
            :rows="4"
            v-decorator="[
              'roleReserve',
              { rules: [{ required: true, message: '请添加备注！' }] }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { roleDetails, editTeamRole, addTeamRole, permissionList } from "@/common/api"

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this)
  },
  created(){
    this.getPermissionList()
  },
  data() {
    return {
      visible: false,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      },
      formTailLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 }
      },
      permissionList:[],
      title: "",
      id:''
    }
  },
  methods: {
    handleCancel() {
      const form = this.form
      form.resetFields()
      this.visible = false
    },
    handleOk(e) {
      console.log(e)
        this.form.validateFields((err, values) => {
            if (!err) {
              if (this.title === '编辑角色') {
                editTeamRole({
                    "dataOrder": values.dataOrder,
                    "dataStatus": values.dataStatus,
                    "permissionIds": values.permissions,
                    "roleId": this.id,
                    "roleName": values.roleName,
                    "roleReserve": values.roleReserve
                }, this.$store.state.token)
                .then(res => {
                    console.log('保存编辑角色后', res)
                    if (res.code === 200) {
                        this.$notification['success']({
                            message: '提示',
                            description: '更改角色成功',
                            duration: 2
                        })
                        // 重新连接角色列表接口
                        this.$emit('getTeamRolesList')
                    }
                })
                .catch(err => {
                    console.log(err)
                })
              } else {
                addTeamRole({
                    "dataOrder": values.dataOrder,
                    "dataStatus": values.dataStatus,
                    "permissionIds": values.permissions,
                    "roleId": '',
                    "roleName": values.roleName,
                    "roleReserve": values.roleReserve
                }, this.$store.state.token)
                .then(res => {
                    console.log('保存新增角色后', res)
                    if (res.code === 200) {
                        this.$notification['success']({
                            message: '提示',
                            description: '新增角色成功',
                            duration: 2
                        })
                        // 重新连接角色列表接口
                        this.$emit('getTeamRolesList')
                        return
                    }
                    this.$notification['error']({
                      message: '提示',
                      description: '新增角色失败',
                      duration: 2
                    })
                })
                .catch(err => {
                    console.log(err)
                })
              }

                this.visible = false
            }
        })
    },
    getRoleDetails(id) {
        // console.log("角色详情弹窗id", id)
        this.id = id
        this.visible = true
        this.title = "编辑角色"
      roleDetails(id, this.$store.state.token)
        .then(res => {
          console.log("角色详情弹窗", res)

          this.form.setFieldsValue({
            roleName: res.data.roleName,
            roleReserve:res.data.roleReserve,
            dataOrder:res.data.dataOrder,
            dataStatus:res.data.dataStatus,
            permissions:res.data.permissions,
            isAdmin: res.data.isAdmin
          });
        })
        .catch(err => {
          console.log(err)
        })
    },
    addTeamRole(){
      console.log('新增角色弹层')
      this.title = "新增角色"
      const form = this.form
      form.resetFields()
      this.visible = true
      console.log(this.$store.state.token)
    },
    getPermissionList(){
      permissionList(this.$store.state.token)
      .then(res => {
        console.log('获取角色权限列表', res)
        for (let i=0;i<res.data.length;i++) {
          for (let j=0;j<res.data[i].perm.length;j++) {
              this.permissionList.push(res.data[i].perm[j])
          }
        }
        console.log('权限列表', this.permissionList)
      })
      .catch(err => {
        console.log('获取角色权限', err)
      })
    }
  }
};
</script>