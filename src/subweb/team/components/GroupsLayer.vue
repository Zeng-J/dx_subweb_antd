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
        <a-form  :form="form">
            <a-form-item
            :label-col="formTailLayout.labelCol"
            :wrapper-col="formTailLayout.wrapperCol"
            label="名称"
            >
            <a-input
                v-decorator="[
                'name',
                {rules: [{ required: true, message: '必填！/最长20个字符！' }]}
                ]"
                placeholder="名称"
            />
            </a-form-item> 
            <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="状态"
            >
            <a-radio-group  v-model="value">
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
                'order',
                {rules: [{ required: true, message: '必填！/只允许数字！' }]}
                ]"
                placeholder="数值越大，显示越靠前"
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
                    'note', 
                    {rules: [{ required: true, message: '请添加备注！' }]},
                ]"
                />
            </a-form-item>
            <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="LOGO"
            >
                <a-upload
                action="//jsonplaceholder.typicode.com/posts/"
                listType="picture-card"
                :fileList="fileList"
                @preview="handlePreview"
                @change="handleChange"
                >
                <div>  
                    <a-button  type="primary"><a-icon type="plus" />新增</a-button>
                </div>
                </a-upload>
            </a-form-item>
        </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
    // props:['visible'],
    beforeCreate(){
        this.form = this.$form.createForm(this)
    },
    data() {
        return {
            visible:false,
            formItemLayout:{
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            },
            formTailLayout:{
                labelCol: { span: 4 },
                wrapperCol: { span: 10 },
            },
            value:1,
            title:'',

            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: '-1',
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
        }
    },
  methods: {
    handlePreview (file) {
      this.previewImage = file.url || file.thumbUrl
      this.previewVisible = true
    },
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
    handleCancel () {
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
  }
}
</script>