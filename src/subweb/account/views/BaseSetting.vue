<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form layout="vertical" :form='form'>
          <a-form-item label="邮箱">
            <a-input placeholder="" v-decorator="[
              'email',
              {rules: [{  message: 'Please input your email' }]}
            ]" />
          </a-form-item>
          <a-form-item label="昵称">
            <a-input placeholder="" v-decorator="[
              'name',
              {rules: [{required: true, message: '请输入您的昵称' }], validateTrigger: ['change', 'blur']}
            ]" />
          </a-form-item>
          <a-form-item label="联系电话：">
            <a-input placeholder="" v-decorator="[
              'mobile',
              {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }], validateTrigger: ['change', 'blur'] }
            ]" />
          </a-form-item>
          <a-form-item label="个人简介">
            <a-textarea rows="4" placeholder="You are not alone." v-decorator="[
              'userInfo',
              {rules: [{message:'Please input your userInfo' }]}
            ]" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" htmlType="submit" @click="handleSubmit">更新基本信息</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="edit">
          <a-icon type="cloud-upload-o" class="upload-icon" />
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="img"/>
        </div>
      </a-col>
    </a-row>
    <avatar-modal ref="modal" @fun="changeImg"/>
  </div>
</template>

<script>
import AvatarModal from "./AvatarModal";
import { getUser, putUser } from "@/common/api.js"

export default {
  components: {
    AvatarModal
  },
  data() {
    return {
      // cropper
      preview: {},
      form: this.$form.createForm(this),
      style:'',
      img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1218485516,264644399&fm=27&gp=0.jpg",
    };
  },

  created() {
    this.getUserBase();
  },

  methods: {
    getUserBase() {
      getUser(this.$store.state.token)
        .then(res => {
          console.log(res);
          if (res.code === 200) {
            this.form.setFieldsValue({
              name: res.data.userName,
              mobile: res.data.userMobile,
              email: "",
              userInfo: res.data.userIntro
            })
            this.img = res.data.userLogo || this.img
            this.$store.state.token = res.data.token
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSubmit() {
      // console.log('token',this.$store.state.token)
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log( this.$store.state.token)
          putUser({
            "logoPic": this.img,
            "userIntro": values.userInfo,
            "userName": values.name,
            "userSex": 0
            }, this.$store.state.token)
          .then(res => {
            console.log(res)
            if(res.code === 200){
              this.$notification['success']({
              message: '提示',
              description: '更改成功',
              duration: 2
              })
            } else {
              alert(res.msg)
            }
          })
          .catch(res => {
            console.log('err='+res)
          })
        }
      })
    },

    changeImg(img){
      console.log(img)
      this.img = img
    },

    edit(){
      this.$refs.modal.edit(this.img)
    }
    
  }
};
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img,
  .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
