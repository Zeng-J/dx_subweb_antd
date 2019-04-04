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
                    <a-radio-group v-decorator="['userSex', {initialValue:1}]">
                        <a-radio :value="1" >男</a-radio>
                        <a-radio :value="0">女</a-radio>
                    </a-radio-group>
                </a-form-item>

                <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="头像">
                    <img :src="userLogo" alt="" srcset="" style="width:10%">
                </a-form-item>
                <a-form-item :label-col="formTailLayout.labelCol" :wrapper-col="formTailLayout.wrapperCol" label="显示序列">
                    <a-input v-decorator="[
                'dataOrder',
                {rules: [{ required: true, message: '必填！/只允许数字！' }]}
                ]" placeholder="数值越大，显示越靠前" />
                </a-form-item>

                <a-form-item v-bind="formItemLayout" label="角色">
                    <a-checkbox-group v-decorator="[
                    'checkbox-group', 
                    {rules: [{ required: true, message: '至少选择一项！' }]},
                    {initialValue: ['A', 'B']}
                ]" style="width: 100%;">
                        <a-row>
                            <a-col :span="8">
                                <a-checkbox value="A">
                                    管理员
                                </a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="B">
                                    普通成员
                                </a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="C">
                                    教师
                                </a-checkbox>
                            </a-col>
                            <a-col :span="8">
                                <a-checkbox value="D">
                                    学生
                                </a-checkbox>
                            </a-col>
                        </a-row>
                    </a-checkbox-group>
                </a-form-item>
                <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol" label="状态">
                    <a-radio-group v-decorator="['dataStatus', {initialValue:1}]">
                        <a-radio :value="1">启用</a-radio>
                        <a-radio :value="0">禁用</a-radio>
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
import { teamMemberById } from "@/common/api";

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
      value: 2,
      title: "",
      visible: false,
      userLogo: ""
    };
  },
  methods: {
    handleCancel() {
      const form = this.form;
      form.resetFields();
      this.visible = false;
    },
    handleOk(e) {
      console.log(e);
      const form = this.form;
      form.resetFields();
      this.visible = false;
    },
    getTeamMemberById(relUserId) {
      console.log("团队成员弹层", relUserId);
      teamMemberById(relUserId, this.$store.state.token)
        .then(res => {
          console.log(res);
          if (res.code !== 200) {
            return;
          }
          this.form.setFieldsValue({
            userMobile: res.data.userMobile,
            userName: res.data.userName,
            userSex:res.data.userSex,
            dataOrder:res.data.dataOrder,
            dataStatus:res.data.dataStatus
          })
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

