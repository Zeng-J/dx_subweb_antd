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
              { rules: [{ required: true, message: '必填！/只允许数字！' }] }
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
              'groupReserve',
              { rules: [{ required: true, message: '请添加备注！' }] }
            ]"
          />
        </a-form-item>
        <!-- <a-form-item
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
              <a-button type="primary"><a-icon type="plus" />新增</a-button>
            </div>
          </a-upload>
        </a-form-item> -->
        <a-form-item
        :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="LOGO">
          <a-upload
            class="avatar-upload"
            name="avatar"
            :showUploadList="false"
            listType="picture-card"
            :action="uploadUrl"
            :beforeUpload="beforeUpload"
            @change="handleChange"
          >
            <div>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div>Upload</div>
            </div>
          </a-upload>
          <img :src="img"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import { teamGroupDetails } from "@/common/api"
import { uploadUrl } from '@/common/const'

export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  data() {
    return {
      uploadUrl,  
      img:'',
      loading:false,
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

      previewVisible: false,
      previewImage: "",
      fileList: [
        {
          uid: "-1",
          name: "xxx.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
      ],
      id: ""
    };
  },
  methods: {
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
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
          })
          this.img = res.data.groupLogo
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  beforeUpload(file) {
    const isJPG = file.type === "image/jpeg" || "image/png";
    if (!isJPG) {
      this.$message.error("You can only upload JPG file or PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.$message.error("Image must smaller than 2MB!");
    }
    return isJPG && isLt2M;
  },

  handleChange(info) {
    console.log(info);
    if (info.file.status === "uploading") {
      this.loading = true;
      return;
    }
    if (info.file.status === "done") {
      this.img = info.file.response.data;
      this.loading = false;
    }
  }
};
</script>