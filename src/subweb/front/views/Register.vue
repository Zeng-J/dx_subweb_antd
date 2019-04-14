<template>
  <a-row>
    <a-col :xs="24" :sm="8">
        <img  style="width:80%; height:100%;margin:100px 0 0 60px;" src="@/assets/images/login.jpg" alt="">
    </a-col>
    <a-col :xs="24" :sm="16" :lg="{ span: 12, offset: 1 }" :xl="{ span: 10, offset: 4 }" :xxl="{ span: 8, offset: 4 }">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '380px' }">
        <div class="main user-layout-register">
          <h3>
            <span>新用户注册</span>
          </h3>
          <a-form ref="formRegister" :form=form id="formRegister">
            <a-form-item label='姓名' :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input size="large" type="text" placeholder="姓名" v-decorator="['name',
          {rules: [{ required: true,message: '请输入姓名' }], validateTrigger: ['change', 'blur']}
        ]">
              </a-input>
            </a-form-item>

            <a-form-item label='性别' :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-radio-group v-decorator="['gender',{rules: []}]">
                <a-radio value="0">
                  男
                </a-radio>
                <a-radio value="1">
                  女
                </a-radio>
              </a-radio-group>
            </a-form-item>

            <a-form-item label='手机号' :label-col="labelCol" :wrapper-col="wrapperCol">

              <a-input size="large" placeholder="11 位手机号" v-decorator="['mobile',
              {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }
        ]">
              </a-input>
            </a-form-item>

            <a-row>
              <a-col class="gutter-row" :xs="24" :sm="24" :md="{ span: 16, offset: 2 }">
                <a-form-item label='验证码' :label-col="labelCol" :wrapper-col="wrapperCol">
                  <a-input v-decorator="['picCode',{rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]" size="large" type="text" placeholder="验证码">
                    <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :xs="12" :sm="12" :md="6">
                <img :src="src" alt="获取验证码" @click="getPic">
              </a-col>
            </a-row>

            <a-row>
              <a-col class="gutter-row" :xs="24" :sm="24" :md="{ span: 16, offset: 2 }">
                <a-form-item label='验证码' :label-col="labelCol" :wrapper-col="wrapperCol">
                  <a-input v-decorator="[ 'captcha',{rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]" size="large" type="text" placeholder="验证码">
                    <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }" />
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col class="gutter-row" :xs="12" :sm="12" :md="6">
                <a-button class="getCaptcha" size="large" :disabled="state.smsSendBtn" @click.stop.prevent="getCaptcha" v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"></a-button>
              </a-col>
            </a-row>

            <a-popover placement="rightTop" trigger="click" :visible="state.passwordLevelChecked">
              <template slot="content">
                <div :style="{ width: '240px' }">
                  <div :class="['user-register', passwordLevelClass]">强度：
                    <span>{{ passwordLevelName }}</span>
                  </div>
                  <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor " />
                  <div style="margin-top: 10px;">
                    <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
                  </div>
                </div>
              </template>
              <a-form-item label='密码' :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-input v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]" size="large" type="password" @click="handlePasswordInputClick" autocomplete="false" placeholder="至少6位密码，区分大小写"></a-input>
              </a-form-item>
            </a-popover>

            <a-form-item label='确认密码' :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input v-decorator="['password2',{rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]" size="large" type="password" autocomplete="false" placeholder="确认密码"></a-input>
            </a-form-item>

            <a-form-item>
              <a-button size="large" type="primary" htmlType="submit" class="register-button" :loading="registerBtn" @click.stop.prevent="handleSubmit" :disabled="registerBtn">注册
              </a-button>
              <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
            </a-form-item>

          </a-form>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>
// import { mixinDevice } from '@/utils/mixin.js'
// import { getSmsCaptcha } from '@/api/login'

import { getPicCode, getSmsCaptcha, register } from "@/common/api.js";

const levelNames = {
  0: "低",
  1: "低",
  2: "中",
  3: "强"
};
const levelClass = {
  0: "error",
  1: "error",
  2: "warning",
  3: "success"
};
const levelColor = {
  0: "#ff0000",
  1: "#ff0000",
  2: "#ff7e05",
  3: "#52c41a"
};

const labelCol = {
  xs: { span: 24 },
  sm: { span: 6 }
};
const wrapperCol = {
  xs: { span: 24 },
  sm: { span: 16 }
};

export default {
  name: "Register",
  components: {},
  // mixins: [mixinDevice],
  data() {
    return {
      labelCol,
      wrapperCol,
      form: this.$form.createForm(this),
      src: "",
      imgToken: "",
      smsCodeToken: "",
      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: "#FF0000"
      },
      registerBtn: false
    };
  },
  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel];
    },
    passwordLevelName() {
      return levelNames[this.state.passwordLevel];
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel];
    }
  },
  methods: {
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

    handlePasswordLevel(rule, value, callback) {
      let level = 0;

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++;
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++;
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++;
      }
      this.state.passwordLevel = level;
      this.state.percent = level * 30;
      if (level >= 2) {
        if (level >= 3) {
          this.state.percent = 100;
        }
        callback();
      } else {
        if (level === 0) {
          this.state.percent = 10;
        }
        callback(new Error("密码强度不够"));
      }
    },

    handlePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue("password");
      console.log("value", value);
      if (value === undefined) {
        callback(new Error("请输入密码"));
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error("两次密码不一致"));
      }
      callback();
    },

    handlePhoneCheck(rule, value, callback) {
      // console.log("handlePhoneCheck, rule:", rule);
      // console.log("handlePhoneCheck, value", value);
      // console.log("handlePhoneCheck, callback", callback);

      callback();
    },

    handlePasswordInputClick() {
      // 手机设备，就不显示密码安全等级提示
      // if (this.isMobile()) {
      //   this.state.passwordLevelChecked = false
      //   return
      // }
      this.state.passwordLevelChecked = true;
    },

    handleSubmit() {
      this.form.validateFields((err, values) => {
        if (!err) {
          register({
            imgCode: values.picCode,
            imgCodeToken: this.imgToken,
            smsCode: values.captcha,
            smsCodeToken: this.smsCodeToken,
            userMobile: values.mobile,
            userName: values.name,
            userPassword: values.password,
            userSex: 0
          })
            .then(res => {
              console.log(res);
              if (res.code === 200) {
                this.$notification["success"]({
                  message: "提示",
                  description: "注册成功",
                  duration: 8
                });
                // this.$router.push({ name: "registerResult", params: { ...values } });
              } else {
                alert(res.msg);
              }
            })
            .catch(res => {
              console.log("err=" + res);
            });
        }
      });
    },

    getCaptcha(e) {
      e.preventDefault();
      const that = this;

      this.form.validateFields(
        ["mobile", "picCode"],
        { force: true },
        (err, values) => {
          if (!err) {
            this.state.smsSendBtn = true;

            const interval = window.setInterval(() => {
              if (that.state.time-- <= 0) {
                that.state.time = 60;
                that.state.smsSendBtn = false;
                window.clearInterval(interval);
              }
            }, 1000);

            const hide = this.$message.loading("验证码发送中..", 0);
            console.log(values.picCode);
            console.log(that.imgToken);
            console.log(values.mobile);
            getSmsCaptcha("reg", {
              imgCode: values.picCode,
              imgToken: that.imgToken,
              userMobile: values.mobile
            })
              .then(res => {
                setTimeout(hide, 2500);
                that.smsCodeToken = res.data;
                this.$notification["success"]({
                  message: "提示",
                  description: "验证码获取成功，请查看您的手机哦",
                  duration: 8
                });
              })
              .catch(err => {
                setTimeout(hide, 1);
                clearInterval(interval);
                that.state.time = 60;
                that.state.smsSendBtn = false;
                this.requestFailed(err);
              });
          }
        }
      );
    },
    requestFailed(err) {
      this.$notification["error"]({
        message: "错误",
        description:
          ((err.response || {}).data || {}).message ||
          "请求出现错误，请稍后再试",
        duration: 4
      });
      this.registerBtn = false;
    }
  },
  watch: {
    "state.passwordLevel"(val) {
      console.log(val);
    }
  }
};
</script>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 26px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
