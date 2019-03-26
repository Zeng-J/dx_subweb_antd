<template>
    <a-modal
      :visible="visible"
      title='修改密码'
      okText="确认"
      cancelText="取消"
      @cancel="() => { $emit('cancel') }"
      @ok="() => { $emit('create') }"
      
    >
      <a-form layout='vertical' :form="form">
        <a-form-item label='请输入旧密码'>
          <a-input
            type="password"
            v-decorator="[
              'oldPassword',
              {
                rules: [{ required: true, pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,message: '请输入旧密码' }],validateTrigger: 'change'
              }
            ]"
          />
        </a-form-item>

        <a-form-item label='请输入新密码'>
          <a-input
            type="password"
            v-decorator="[
              'password',
              {
                rules: [{ required: true, pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,message: '请输入新密码/必须为6-12位英文字母、数字组合' },{validator: validateToNextPassword}],validateTrigger: 'change'
              }
            ]"
          />
        </a-form-item>
        <a-form-item label='确认密码'>
          <a-input
            type="password"
            v-decorator="[
            'confirm',
            {
                rules:[{required:true,message: '请再次输入密码' },{ validator: compareToFirstPassword}]
            }
            ]"
             @blur="handleConfirmBlur"
          />
        </a-form-item>
      </a-form>
    </a-modal>
</template>

<script>
export default {
  props: ['visible'],
  data(){
    return {
      confirmDirty: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleConfirmBlur (e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword  (rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('两次输入密码不一致');
      } else {
        callback();
      }
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
      }
      callback();
    },
  },
};
</script>