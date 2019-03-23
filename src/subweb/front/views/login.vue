<template>
    <div class="main">
        <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
            <a-tabs :activeKey="customActiveKey" :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }" @change="handleTabClick">
                <!-- 账号密码登陆组件 -->
                <a-tab-pane key="tab1" tab="账号密码登陆">
                    <a-form-item>
                        <a-input size="large" type="text" placeholder="帐户名或邮箱地址 / admin" v-decorator="[
                            'username',
                            {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
                        ]">
                            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
                        </a-input>
                    </a-form-item>

                    <a-form-item>
                        <a-input size="large" type="password" autocomplete="false" placeholder="密码 / admin" v-decorator="[
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
                                    'picCode',
                                    {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}
                                ]">
                                    <a-icon slot="prefix" type="info-circle" :style="{ color: 'rgba(0,0,0,.25)' }" />
                                </a-input>
                            </a-col>
                            <a-col span='8'>
                                <span>8456</span>
                            </a-col>
                        </a-row>
                    </a-form-item>
                </a-tab-pane>

                <!-- 手机登陆组件 -->
                <a-tab-pane key="tab2" tab="手机号登陆">
                    <a-form-item>
                        <a-input size="large" type="text" placeholder="手机号" v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]">
                            <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }" />
                        </a-input>
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
                            <a-button class="getCaptcha" tabindex="-1" :disabled="state.smsSendBtn" v-text="!state.smsSendBtn && '获取验证码' || (state.time+' s')"></a-button>
                        </a-col>
                    </a-row>
                </a-tab-pane>

            </a-tabs>

            <a-form-item>
                <a-checkbox v-decorator="['rememberMe']">自动登陆</a-checkbox>
                <router-link :to="{ name: 'recover', params: { user: 'aaa'} }" class="forge-password" style="float: right;">忘记密码</router-link>
            </a-form-item>

            <a-form-item style="margin-top:24px">
                <a-button size="large" type="primary" class="login-button" :loading="state.loginBtn" :disabled="state.loginBtn">确定</a-button>
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

        <two-step-captcha v-if="requiredTwoStepCaptcha" :visible="stepCaptchaVisible"></two-step-captcha>
    </div>
</template>

<script>
export default {
  data() {
    return {
      customActiveKey: "tab1",
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      requiredTwoStepCaptcha: false,
      stepCaptchaVisible: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    };
  },
  methods: {
    // =================表单验证邮箱和手机号===================
    handleUsernameOrEmail(rule, value, callback) {
      const { state } = this;
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      if (regex.test(value)) {
        state.loginType = 0;
      } else {
        state.loginType = 1;
      }
      callback();
    },
    // ================切换登陆方式组件=======================
    handleTabClick(key) {
      this.customActiveKey = key;
    },
    // ================提交表单，登陆跳转===================
    handleSubmit() {
      alert("denglu");
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
