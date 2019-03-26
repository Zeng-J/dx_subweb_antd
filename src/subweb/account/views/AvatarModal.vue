<template>
  <a-modal title="修改头像" :visible="visible" :maskClosable="false" :confirmLoading="confirmLoading" :width="800" @cancel="cancelHandel">
    <a-row>
      <a-col :xs="24" :md="12" :style="{height: '350px'}">
        <vue-cropper ref="cropper" 
        :img="options.img" 
        :info="true" 
        :autoCrop="options.autoCrop" 
        :autoCropWidth="options.autoCropWidth" 
        :autoCropHeight="options.autoCropHeight" 
        :fixedBox="options.fixedBox" @realTime="realTime">
        </vue-cropper>
      </a-col>
      <a-col :xs="24" :md="12" :style="{height: '350px'}">
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img" />
        </div>
          <a-upload class="avatar-upload" name="avatar"  :showUploadList="false" 
          listType="picture-card"
          action="//jsonplaceholder.typicode.com/posts/" 
          :beforeUpload="beforeUpload" 
          @change="handleChange">
            <div>
              <a-icon :type="loading ? 'loading' : 'plus'" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
      </a-col>
    </a-row>

    <template slot="footer">
      <a-button key="back" @click="cancelHandel">取消</a-button>
      <a-button key="submit" type="primary" :loading="confirmLoading" @click="okHandel">保存</a-button>
    </template>
  </a-modal>
</template>
<script>
// 图片裁剪插件
import { VueCropper } from "vue-cropper";

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      visible: false,
      confirmLoading: false,
      loading:false,

      options: {
        img:
          "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1218485516,264644399&fm=27&gp=0.jpg",
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true
      },
      previews: {}
    };
  },
  methods: {
    edit(img) {
      this.options.img = img
      this.visible = true;
    },
    close() {
      this.id = null;
      this.visible = false;
    },
    cancelHandel() {
      this.close();
    },
    okHandel() {
      const vm = this;

      vm.confirmLoading = true;
      this.$emit('fun',this.options.img)
      setTimeout(() => {
        vm.confirmLoading = false;
        vm.close();
        vm.$message.success("上传头像成功");
      }, 1000);
    },

    realTime(data) {
      console.log(data);
      this.previews = data;
    },

    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    },

    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.options.img = imageUrl
          this.loading = false
        })
      }
    },
  }
};
</script>

<style lang="less" scoped>
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}

.avatar-upload {
  position: absolute;
  top: 70%;
  right:0;
}
</style>
