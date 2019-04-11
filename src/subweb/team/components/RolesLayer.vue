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
              { rules: [{ required: true, message: '必填！/只允许数字！' }] }
            ]"
            placeholder="数值越大，显示越靠前"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="状态"
        >
          <a-radio-group v-decorator="['dataStatus', { initialValue: 1 }]">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="2">禁用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="管理员"
        >
          <a-radio-group v-decorator="['isAdmin', { initialValue: 1 }]">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="权限">
          <a-checkbox-group
            v-decorator="[
              'permissions',
              { rules: [{ required: true, message: '至少选择一项！' }] },
              { initialValue: ['A', 'B'] }
            ]"
            style="width: 100%;"
          >
            <a-row>
              <a-col :span="8">
                <a-checkbox value="A">
                  全部权限
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="B">
                  组织架构
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="C">
                  查询团队成员
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="D">
                  查询团队角色
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="E">
                  创建团队成员
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="F">
                  创建团队角色
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="G">
                  编辑团队成员
                </a-checkbox>
              </a-col>
              <a-col :span="8">
                <a-checkbox value="H">
                  编辑团队角色
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
import { roleDetails, editTeamRole } from "@/common/api"

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this)
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
      title: "",
      id:''
    };
  },
  methods: {
    handleCancel() {
      //   const form = this.form;
      //   form.resetFields();
      this.visible = false;
    },
    handleOk(e) {
      console.log(e)
        this.form.validateFields((err, values) => {
            if (!err) {
                editTeamRole({
                    "dataOrder": values.dataOrder,
                    "dataStatus": values.dataStatus,
                    "permissionIds": [],
                    "roleId": this.id,
                    "roleName": values.roleName,
                    "roleReserve": values.roleReserve
                }, this.$store.state.token)
                .then(res => {
                    console.log('保存编辑角色后', res)
                    if (res.code === 200) {
                        this.$notification['success']({
                            message: '提示',
                            description: '更改成功',
                            duration: 2
                        })
                        // 重新连接角色列表接口
                        this.$emit('getTeamRolesList')
                    }
                })
                .catch(err => {
                    console.log(err)
                })

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
            // 暂时写死了，后端不确定各权限代表意义
            permissions:res.data.permissions,
            isAdmin: res.data.isAdmin
          });
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
};
</script>