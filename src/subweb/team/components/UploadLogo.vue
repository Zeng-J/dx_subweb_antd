<template>
  <div>
    <a-form-item
      :label-col="formItemLayout.labelCol"
      :wrapper-col="formItemLayout.wrapperCol"
      label="LOGO"
    >
      <a-upload
        class="avatar-upload"
        name="avatar"
        :showUploadList="false"
        listType="picture-card"
        :action="uploadUrl"
        :beforeUpload="beforeUpload"
        @change="handleChange"
      >
        <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="width:80%" />
        <div v-else>
          <a-icon :type="loading ? 'loading' : 'plus'" />
          <div class="ant-upload-text">Upload</div>
        </div>
      </a-upload>
    </a-form-item>
  </div>
</template>

<script>
import { uploadUrl } from "@/common/const"

export default {
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
      uploadUrl,
      imageUrl: "",
      loading: false
    };
  },
  methods: {
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
        this.imageUrl = info.file.response.data;
        this.loading = false;
      }
    }
  }
};
</script>