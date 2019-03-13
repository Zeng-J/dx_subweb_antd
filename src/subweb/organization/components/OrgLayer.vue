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
                placeholder=""
            />
            </a-form-item>
            <a-form-item
            :label-col="formTailLayout.labelCol"
            :wrapper-col="formTailLayout.wrapperCol"
            label="后缀"
            >
            <a-input
                v-decorator="[
                'suffix',
                {rules: [{ required: true, message: '必填！/最长20个英文字母！' }]}
                ]"
                placeholder=""
            />
            </a-form-item>
            <a-form-item
            v-bind="formItemLayout"
            label="应用"
            >
            <a-checkbox-group
                v-decorator="[
                    'apply', 
                    {rules: [{ required: true, message: '至少选择一项！' }]},
                    {initialValue: ['A', 'B']}
                ]"
                style="width: 100%;"
            >
                <a-row>
                <a-col :span="8">
                    <a-checkbox value="A">
                    教育培训
                    </a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox
                    value="B"
                    >
                    教材内容
                    </a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="C">
                    人才猎聘
                    </a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="D">
                    工作任务
                    </a-checkbox>
                </a-col>
                </a-row>
            </a-checkbox-group>
            </a-form-item>
             <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="简介"
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
                <a-row>
                    <a-col :span="5">
                        <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width:60%;height:50px;"/>
                    </a-col>
                    <a-col :span="6">
                        <a-upload
                        name="avatar"
                        listType="picture-card"
                        class="avatar-uploader"
                        :showUploadList="false"
                        action="//jsonplaceholder.typicode.com/posts/"
                        :beforeUpload="beforeUpload"
                        @change="handleChange"
                        >
                            <span><a-icon type="plus" />上传</span>
                        </a-upload>
                    </a-col>
                    <a-col :span="13">
                        <span>图片大小不超过500KB，建议50*50宽度的jpg/png</span>
                    </a-col>
                </a-row>
                
                
            </a-form-item>
            <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="角色初始"
            >
                管理员、普通成员
            </a-form-item>
        </a-form>
    </a-modal>
  </div>
</template>
<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
    beforeCreate(){
        this.form = this.$form.createForm(this)
    },
    data() {
        return {
            formItemLayout:{
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            },
            formTailLayout:{
                labelCol: { span: 4 },
                wrapperCol: { span: 10 },
            },
            value:2,
            title:'',
            visible:false,
            imageUrl: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3312302970,794464507&fm=27&gp=0.jpg',
        }
    },
  methods: {
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
     handleChange (info) {
      if (info.file.status === 'uploading') {
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
        })
      }
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('图片必须小于2MB!')
      }
      return isJPG && isLt2M
    },
  }
}
</script>

<style scoped>
  .avatar-uploader > .ant-upload {
    width: 80px;
    height: 45px;
  }
  /* .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  } */
</style>