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
              'groupName',
              { rules: [{ required: true, message: '必填！/最长20个字符！' }] }
            ]"
            placeholder="名称"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="状态"
        >
          <a-radio-group v-decorator="['dataStatus']">
            <a-radio :value="1">报名</a-radio>
            <a-radio :value="2">在期</a-radio>
            <a-radio :value="3">结束</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :label-col="formTailLayout.labelCol"
          :wrapper-col="formTailLayout.wrapperCol"
          label="显示序列"
        >
          <a-input
            v-decorator="[
              'dataOrder',
              { rules: [{ required: true, pattern: /^\d+$/,  message: '必填！/只允许数字！' }] }
            ]"
            placeholder="数值越小，显示越靠前"
          />
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
              'groupReserve',
              { rules: [{ required: true, message: '请添加备注！' }] }
            ]"
          />
        </a-form-item>
          <upload-logo 
          ref="UploadLogo"/>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { teamGroupDetails, putGroupDetails, postGroupDetails } from "@/common/api"
import UploadLogo from './UploadLogo'

export default {
  components:{
    UploadLogo
  },
  beforeCreate() {
    this.form = this.$form.createForm(this)
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
      visible: false,
      title: "",
      id: ""
    };
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
          if (this.title === '编辑群组') {
            putGroupDetails({
              "dataOrder": values.dataOrder,
              "dataStatus": values.dataStatus,
              "groupLogo": this.$refs.UploadLogo.imageUrl,
              "groupName": values.groupName,
              "groupReserve": values.groupReserve,
              "id": this.id
            }, this.$store.state.token)
            .then(res => {
                console.log('保存编辑群组后', res)
                if (res.code === 200) {
                    this.$notification['success']({
                        message: '提示',
                        description: '更改成功',
                        duration: 2
                    })
                    // 重新连接群组列表接口
                    this.$emit('getTeamGroup')
                }
            })
            .catch(err => {
                console.log(err)
            })
          } else{
              postGroupDetails({
                "dataOrder": values.dataOrder,
                "dataStatus": values.dataStatus,
                "groupLogo": this.$refs.UploadLogo.imageUrl,
                "groupName": values.groupName,
                "groupReserve": values.groupReserve,
              }, this.$store.state.token)
              .then(res => {
                  console.log('保存新增群组后', res)
                  if (res.code === 200) {
                      this.$notification['success']({
                          message: '提示',
                          description: '更改成功',
                          duration: 2
                      })
                      // 重新连接群组列表接口
                      this.$emit('getTeamGroup')
                  }
              })
              .catch(err => {
                  console.log(err)
              })           
          }
          this.visible = false
        }
      })
    },
    getGroupDetails(id) {
      console.log("群组详情弹窗id", id);
      this.id = id;
      this.visible = true;
      this.title = "编辑群组";
      teamGroupDetails(id, this.$store.state.token)
        .then(res => {
          console.log("群组详情弹窗", res);

          this.form.setFieldsValue({
            groupName: res.data.groupName,
            groupReserve: res.data.groupReserve,
            dataOrder: res.data.dataOrder,
            dataStatus: res.data.dataStatus
          });
          this.$refs.UploadLogo.imageUrl = res.data.groupLogo;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addTeamGroup(){
      console.log('新增群组弹层')
      this.title = "新增群组"
      const form = this.form
      form.resetFields()
      this.$refs.UploadLogo.imageUrl = ''
      this.visible = true
    },
  }
}
</script>