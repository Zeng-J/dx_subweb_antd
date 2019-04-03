<template>
    <div class="main">
      <a-row>
        <a-col :xs="24" :sm="8">
          <img 
          style="width:80%; height:250px;margin:50px auto;"
          src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3990515277,3071303246&fm=27&gp=0.jpg" alt=""
          >
        </a-col>
        <a-col :xs="24" :sm="16" :lg="{ span: 12, offset: 1 }" :xl="{ span: 10, offset: 4 }" :xxl="{ span: 8, offset: 4 }">
          <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
                      <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
            <a-tabs :activeKey="customActiveKey" :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }" @change="handleTabClick">
                <!-- 账号密码登陆组件 -->
                <a-tab-pane key="tab1" tab="账号密码登陆">
                    <a-form-item>
                        <a-input size="large" type="text" placeholder="手机号" v-decorator="[
                            'mobile1',
                            {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/}], validateTrigger: 'change'}
                        ]">
                            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
                        </a-input>
                    </a-form-item>

                    <a-form-item>
                        <a-input size="large" type="password" autocomplete="false" placeholder="密码 / 123asd" v-decorator="[
                            'password',
                            {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
                        ]">
                            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-row>
                            <a-col span='16'>
                                <a-input size="large" type="text" autocomplete="false" placeholder="验证码" v-decorator="[
                                    'picCode1',
                                    {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}
                                ]">
                                    <a-icon slot="prefix" type="info-circle" :style="{ color: 'rgba(0,0,0,.25)' }" />
                                </a-input>
                            </a-col>
                            <a-col span='7' offset='1'>
                                <img :src="src" alt="获取验证码" @click="getPic">
                            </a-col>
                        </a-row>
                    </a-form-item>
                </a-tab-pane>

                <!-- 手机登陆组件 -->
                <a-tab-pane key="tab2" tab="手机号登陆">
                    <a-form-item>
                        <a-input size="large" type="text" placeholder="手机号" v-decorator="['mobile2', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]">
                            <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />
                        </a-input>
                    </a-form-item>

                    <a-form-item>
                        <a-row>
                            <a-col span='16'>
                                <a-input size="large" type="text" autocomplete="false" placeholder="验证码" v-decorator="[
                                    'picCode2',
                                    {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}
                                ]">
                                    <a-icon slot="prefix" type="info-circle" :style="{ color: 'rgba(0,0,0,.25)' }" />
                                </a-input>
                            </a-col>
                            <a-col span='7' offset='1'>
                                <img :src="src" alt="获取验证码" @click="getPic">
                            </a-col>
                        </a-row>
                    </a-form-item>

                    <a-row :gutter="16">
                        <a-col class="gutter-row" :span="16">
                            <a-form-item>
                                <a-input size="large" type="text" placeholder="验证码" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                                    <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                                </a-input>
                            </a-form-item>
                        </a-col>
                        <a-col class="gutter-row" :span="8">
                            <a-button class="getCaptcha" tabindex="-1" :disabled="state.smsSendBtn" 
                            @click.stop.prevent="getCaptcha" v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"></a-button>
                        </a-col>
                    </a-row>
                </a-tab-pane>

            </a-tabs>

            <a-form-item>
                <a-checkbox v-decorator="['rememberMe']">自动登陆</a-checkbox>
                <router-link :to="{ name: 'recover', params: { user: 'aaa'} }" class="forge-password" style="float: right;">忘记密码</router-link>
            </a-form-item>

            <a-form-item style="margin-top:24px">
                <a-button size="large" type="primary" class="login-button" :loading="state.loginBtn" :disabled="state.loginBtn" htmlType="submit">确定</a-button>
            </a-form-item>

            <div class="user-login-other">
                <span>其他登陆方式</span>
                <a>
                    <a-icon class="item-icon" type="alipay-circle"></a-icon>
                </a>
                <a>
                    <a-icon class="item-icon" type="taobao-circle"></a-icon>
                </a>
                <a>
                    <a-icon class="item-icon" type="weibo-circle"></a-icon>
                </a>
                <router-link class="register" :to="{ name: 'register' }">注册账户</router-link>
            </div>
        </a-form>
          </div>
        </a-col>
      </a-row>



        <two-step-captcha v-if="requiredTwoStepCaptcha" :visible="stepCaptchaVisible"></two-step-captcha>
    </div>
</template>

<script>
import { getPicCode, getSmsCaptcha, login} from '@/common/api'

export default {
  data() {
    return {
        src:'',
        imgToken:'',
        smsCodeToken:'',
        customActiveKey: "tab1",
        requiredTwoStepCaptcha: false,
        stepCaptchaVisible: false,
        form: this.$form.createForm(this),
        state: {
        time: 60,
        loginBtn: false,
        smsSendBtn: false
      }
    };
  },
  methods: {
    // ================切换登陆方式组件=======================
    handleTabClick(key) {
      this.customActiveKey = key;
    },

    // ================登陸方式===============================
    Login(addr,params){
      login(addr,params)
      .then(res => {
        if (res.code === 200){
          this.$notification['success']({
          message: '提示',
          description: '登陸成功',
          duration: 8
        })
        this.$store.state.token = res.data.token
        this.$store.state.userName = res.data.userName
        this.$store.state.isLogin = true
         this.$router.push({ name: 'team'})
        
        } else{
          this.$notification["error"]({
          message: "错误",
          description:
            res.msg || "请求出现错误，请稍后再试",
          duration: 4
          });
          setTimeout(() => {
            this.state.loginBtn = false
          }, 600)
        }
      })
      .catch(err => {
        console.log(err)
      })
    },

    // ================提交表单，登陆跳转===================
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey
      } = this

      state.loginBtn = true

      const validateFieldsKey = customActiveKey === 'tab1' ? ['mobile1', 'password','picCode1'] : ['mobile2', 'picCode2','captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          if (customActiveKey === 'tab1'){
            this.Login('pwd', {
            "imgCode": values.picCode1,
            "imgToken": this.imgToken,
            "userMobile": values.mobile1,
            "userPassword": values.password
            })
          } else{
            this.Login('sms', {
            "imgCode": values.picCode2,
            "imgCodeToken": this.imgToken,
            "userMobile": values.mobile2,
            "userPassword": values.password,
            "smsCode": values.captcha,
            "smsCodeToken": this.smsCodeToken
            })
          }

        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    // ================获取图片验证码===================
    getPic() {
      var random = Math.random();
      getPicCode(random)
        .then(res => {
          this.src = res.data.imgCodePic;
          this.imgToken = res.data.imgToken;
        })
        .catch(res => {
          console.log(res);
        });
    },

    // ================获取短信验证码=====================
    getCaptcha (e) {
      e.preventDefault()
      const { form: { validateFields }, state } = this
      const that = this

      validateFields(['mobile2', 'picCode2'], { force: true }, (err, values) => {
        if (!err) {
          state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (state.time-- <= 0) {
              state.time = 60
              state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          const hide = this.$message.loading('验证码发送中..', 0)
          getSmsCaptcha('login',{
              "imgCode": values.picCode2,
              "imgToken": that.imgToken,
              "userMobile": values.mobile2
            })
            .then(res => {
              console.log(res)
              if (res.code === 200) {
                  setTimeout(hide, 2500)
                  that.smsCodeToken = res.data
                  this.$notification['success']({
                    message: '提示',
                    description: '验证码获取成功，请查看您的手机哦',
                    duration: 8
                  })
              } else{
                setTimeout(hide, 1)
                clearInterval(interval)
                that.state.time = 60
                that.state.smsSendBtn = false
                that.requestFailed(res)
              }

          }).catch(err => {
            setTimeout(hide, 1)
            clearInterval(interval)
            that.state.time = 60
            that.state.smsSendBtn = false
            that.requestFailed(err)
          })
        }
      })
    },
    requestFailed(err) {
      this.$notification["error"]({
        message: "错误",
        description:
          err.data || err.msg ||"请求出现错误，请稍后再试",
          duration: 4
      });
    }
  }
};
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>
