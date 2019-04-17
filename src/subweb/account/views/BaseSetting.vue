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
          <a-form-item label="性别">
            <a-radio-group
              v-decorator="['userSex', { initialValue: 1 }]"
            >
              <a-radio :value="1">男</a-radio>
              <a-radio :value="0">女</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" htmlType="submit" @click="handleSubmit">更新基本信息</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview">
          <a-icon type="cloud-upload-o" class="upload-icon" />
          <div class="mask">
            <a-upload class="avatar-upload" name="avatar"  :showUploadList="false" 
              listType="picture"
              :action="uploadUrl" 
              :beforeUpload="beforeUpload" 
              @change="handleChange">
              <div>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">Upload</div>
              </div>
            </a-upload>
          </div>
          <img :src="img"/>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getUser, putUser } from "@/common/api.js"
import { uploadUrl } from '@/common/const'

export default {
  data() {
    return {
      uploadUrl,
      form: this.$form.createForm(this),
      img:"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1218485516,264644399&fm=27&gp=0.jpg",
      loading:false,
    }
  },

  created() {
    this.getUserBase()
  },

  methods: {
    getUserBase() {
      getUser()
        .then(res => {
          console.log(res)
          if (res.code === 200) {
            this.form.setFieldsValue({
              name: res.data.userName,
              mobile: res.data.userMobile,
              email: "",
              userInfo: res.data.userIntro,
              userSex:res.data.userSex
            })
            this.img = res.data.userLogo || this.img
            // this.$store.state.token = res.data.token
            console.log('基本设置token', res.data.token)
            this.$store.commit('setToken', res.data.token)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          putUser({
            "logoPic": this.img,
            "userIntro": values.userInfo,
            "userName": values.name,
            "userSex": values.userSex
            })
          .then(res => {
            console.log(res)
            if(res.code === 200){
              this.$notification['success']({
              message: '提示',
              description: '更改成功',
              duration: 2
              })

              this.$store.commit('setAccount',{
                userName:values.name,
                avatar:this.img
              })
              // 不推荐直接修改state中的值
              // this.$store.state.avatar = this.img
              // this.$store.state.userName = values.name
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

    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png'
      if (!isJPG) {
        this.$message.error('You can only upload JPG file or PNG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJPG && isLt2M
    },

    handleChange (info) {
      console.log(info)
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        this.img = info.file.response.data
        this.loading = false
      }
    },
    
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
