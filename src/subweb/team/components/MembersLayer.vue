<template>
    <div>
        <a-modal :title="title" :visible="visible" @cancel="handleCancel" @ok="handleOk" okText="保存" cancelText="返回">
            <a-form :form="form">
                <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="手机号">
                    <a-input v-decorator="['userMobile',{rules: [{ required: true, message: '必填！/只允许数字！' }]}]" placeholder="手机号" />
                </a-form-item>
                <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="姓名">
                    <a-input v-decorator="['userName',{rules: [{ required: true, message: '必填！/只允许数字！' }]}]" placeholder="姓名" />
                </a-form-item>
                <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="性别">
                    <a-radio-group v-decorator="['userSex', {initialValue:1}]" disabled>
                        <a-radio :value="1" >男</a-radio>
                        <a-radio :value="0">女</a-radio>
                    </a-radio-group>
                </a-form-item>

                <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="头像">
                    <img :src="userLogo" alt="头像" srcset="" style="width:10%">
                </a-form-item>
                <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol" label="显示序列">
                    <a-input v-decorator="[
                'dataOrder',
                {rules: [{ required: true, message: '必填！/只允许数字！' }]}
                ]" placeholder="数值越大，显示越靠前" />
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="角色">
                    <a-checkbox-group v-decorator="[
                    'roles', 
                    {rules: [{ required: true, message: '至少选择一项！' }]},
                    {initialValue: ['1001']}
                    ]" style="width: 100%;">
                        <a-row>
                            <a-col :span="8" v-for="value in roleList" :key="value.id">
                                <a-checkbox :value="value.id">
                                    {{value.roleName}}
                                </a-checkbox>
                            </a-col>
                        </a-row>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="状态">
                    <a-radio-group v-decorator="['dataStatus', {initialValue:1}]">
                        <a-radio :value="1">启用</a-radio>
                        <a-radio :value="2">禁用</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="备注">
                    <a-textarea placeholder="Basic usage" :rows="4" v-decorator="['memberReserve', {rules: [{ required: true, message: '请添加备注！' }]},]" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { teamMemberById, roleList, editTeamMember } from "@/common/api";

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
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
      userLogo: "",
      roleList:[],
      id:''
    };
  },
  methods: {
    handleCancel() {
      this.visible = false
    },
    handleOk(e) {
      // console.log(e)
      this.form.validateFields((err, values) => {
        if (!err) {
          editTeamMember({
            "dataOrder": values.dataOrder,
            "dataStatus": values.dataStatus,
            "id": this.id,
            "memberReserve": values.memberReserve,
            "roleIds": values.roles
          }, this.$store.state.token)
          .then(res => {
            // console.log(res)
            this.$notification['success']({
              message: '提示',
              description: '更改成功',
              duration: 2
            })
            // 重新连接团队列表接口
            this.$emit('getTeamMember')
          })
          .catch(err => {
            console.log('编辑成员详情err='+err)
          })

          return this.visible = false
        }
      })
    },
    getMemberDetail(relUserId) {
      this.visible = !this.visible
      // console.log("团队成员弹层", relUserId)
      // 角色列表，获取角色选项 
      roleList(this.$store.state.token)
      .then(res => {
        // console.log('角色选项', res)
        this.roleList = res.data.list
        return teamMemberById(relUserId, this.$store.state.token)
      })
      .then(res => {
        console.log('成员详情', res)
        if (res.code !== 200) {
          return;
        }
        this.form.setFieldsValue({
          userMobile: res.data.userMobile,
          userName: res.data.userName,
          userSex:res.data.userSex,
          dataOrder:res.data.dataOrder,
          dataStatus:res.data.dataStatus,
          memberReserve:res.data.memberReserve,
          roles: res.data.roleIds.split(',')
        })
        this.userLogo = res.data.userLogo
        this.id = res.data.id 
      })
      .catch(err => {
        console.log(err);
      })
    }
  }
};
</script>

