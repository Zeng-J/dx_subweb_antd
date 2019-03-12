<template> 
    <a-modal
        title="修改手机"
        :visible="visible"
        okText="确认"
        cancelText="取消"
        @cancel="() => { $emit('cancel') }"
    >
        <a-form layout='vertical' :form="form">
          <a-form-item>
            <a-input size="large" type="text" placeholder="请输入新手机号" v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]">
              <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

        <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
            <a-form-item>
            <a-input size="large" type="text" placeholder="请输入图文验证码" v-decorator="['piccode', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
            </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
            <a-button
            class="getCaptcha"
            tabindex="-1"
            v-text="'76YU'"
            ></a-button>
        </a-col>
        </a-row>
        <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
            <a-form-item>
            <a-input size="large" type="text" placeholder="请输入短信验证码" v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]">
                <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
            </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
            <a-button
            class="getCaptcha"
            tabindex="-1"
            v-text="'获取验证码'"
            ></a-button>
        </a-col>
        </a-row>
        </a-form>
    </a-modal>
</template>

<script>
export default {
    props: ['visible'],
    data(){
        return {
        
        }
    },
    beforeCreate () {
        this.form = this.$form.createForm(this);
    }
}
</script>
