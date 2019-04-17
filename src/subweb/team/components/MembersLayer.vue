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
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="手机号"
        >
        <a-row>
          <a-col span=12>
          <a-input
            v-decorator="[
              'userMobile',
              { rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号！' }] }
            ]"
            placeholder="手机号" :disabled="disabled.mobileDisabled"
          />
          </a-col>
          <a-col span=12>
            <a-button :disabled="disabled.btnDisabled" @click="ismemberBtn">检验是否注册</a-button>
          </a-col>
        </a-row>
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="姓名"
        >
          <a-input
            v-decorator="[
              'userName',
              { rules: [{ required: true, message: '必填!' }] }
            ]"
            placeholder="姓名" :disabled="disabled.nameDisabled"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="性别"
        >
          <a-radio-group
            v-decorator="['userSex', { initialValue: 1 }]"
            disabled
          >
            <a-radio :value="1">男</a-radio>
            <a-radio :value="0">女</a-radio>
          </a-radio-group>
        </a-form-item>

        <!-- <upload-logo ref="UploadLogo"/> -->
        <a-form-item
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
          label="显示序列"
        >
          <a-input
            v-decorator="[
              'dataOrder',
              { rules: [{ required: true, pattern: /^\d+$/, message: '必填！/只允许数字！' }] }
            ]"
            placeholder="数值越小，显示越靠前"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="角色">
          <a-checkbox-group
            v-decorator="[
              'roles',
              {
                rules: [{ required: true, message: '至少选择一项！' }],
                initialValue: ['1001']
              }
            ]"
            style="width: 100%;"
          >
            <a-row>
              <a-col :span="8" v-for="value in roleList" :key="value.id">
                <a-checkbox :value="value.id">
                  {{ value.roleName }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
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
          label="备注"
        >
          <a-textarea
            placeholder="Basic usage"
            :rows="4"
            v-decorator="[
              'memberReserve',
              { rules: [{ required: true, message: '请添加备注！' }] }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { teamMemberById, roleList, editTeamMember, postTeamMember, ismember } from "@/common/api"
// import UploadLogo from './UploadLogo'

export default {
  // components:{
  //   UploadLogo
  // },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  created(){
      roleList()
        .then(res => {
          // console.log('角色选项', res)
          this.roleList = res.data.list
        })
        .catch(err => {
          console.log(err)
        })
  },
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 }
      },
      formTailLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 10 }
      },
      title: "",
      visible: false,
      roleList: [],
      id: "",
      disabled:{
        nameDisabled:true,
        mobileDisabled:true,
        btnDisabled:true
      }
    };
  },
  methods: {
    handleCancel() {
      const form = this.form
      form.resetFields()
      this.visible = false
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.title === "编辑成员") {
            editTeamMember(
              {
                dataOrder: values.dataOrder,
                dataStatus: values.dataStatus,
                id: this.id,
                memberReserve: values.memberReserve,
                roleIds: values.roles
              })
              .then(res => {
                // console.log(res)
                if (res.code === 200) {
                  this.$notification["success"]({
                    message: "提示",
                    description: "更改成功",
                    duration: 2
                  });
                  // 重新连接团队列表接口
                  this.$emit("getTeamMember")
                  return this.visible = false
                }
              })
              .catch(err => {
                console.log("编辑成员详情err=", err)
              })
          } else {
            postTeamMember({
                dataOrder: values.dataOrder,
                dataStatus: values.dataStatus,
                memberReserve: values.memberReserve,
                roleIds: values.roles,
                userMobile: values.userMobile,
                userName: values.userName,
                userSex: 1
              })
              .then(res => {
                console.log("新增成员", res)
                if (res.code === 200) {
                  this.$notification["success"]({
                    message: "提示",
                    description: "更改成功",
                    duration: 2
                  })
                  // 重新连接团队列表接口
                  this.$emit("getTeamMember")
                  return this.visible = false
                } else {
                  this.$message.info(res.msg)
                }
              })
              .catch(err => {
                console.log("新增成员详情err=", err)
              });
          }
        }
      });
    },
    getMemberDetail(relUserId) {
      this.disabled = {
        nameDisabled:true,
        mobileDisabled:true,
        btnDisabled:true
      }
      this.visible = !this.visible
      // console.log("团队成员弹层", relUserId)
      teamMemberById(relUserId)
        .then(res => {
          console.log("成员详情", res);
          if (res.code !== 200) {
            return;
          }
          this.form.setFieldsValue({
            userMobile: res.data.userMobile,
            userName: res.data.userName,
            userSex: res.data.userSex,
            dataOrder: res.data.dataOrder,
            dataStatus: res.data.dataStatus,
            memberReserve: res.data.memberReserve,
            roles: res.data.roleIds.split(",")
          });
          this.id = res.data.id;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addTeamMember() {
      console.log("新增成员弹层")
      this.title = "新增成员"
      const form = this.form
      form.resetFields()
      this.disabled = {}
      console.log(this.$store.state.token)

      this.visible = true
    },
    ismemberBtn(){
      this.form.validateFields(['userMobile'], (err, val) => {
        // console.log('判断是否成员', val.userMobile)
        if (!err) {
          ismember(val.userMobile)
          .then(res => {
            // console.log(res)
            this.$message.info(res.msg)
          })
          .catch(err => {
            console.log('检查是否已经是成员', err)
          })
        }
      })
    }
  }
};
</script>

