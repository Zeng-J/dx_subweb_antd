<template>
  <a-list
    itemLayout="horizontal"
    :dataSource="data"
  >
    <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
      <a-list-item-meta>
        <a slot="title">{{ item.title }}</a>
        <span slot="description">
          <span class="security-list-description">{{ item.description }}</span>
          <span v-if="item.value"> : </span>
          <span class="security-list-value">{{ item.value }}</span>
        </span>
      </a-list-item-meta>
      <template v-if="item.actions">
        <a slot="actions" @click="item.actions.callback">{{ item.actions.title }}</a>
      </template>

    </a-list-item>
    <change-password-layer
      ref="ChangePassword"
      :visible="visible"
      @cancel="handleCancel"
      @create="handleSubmit"
    />
    <change-mobile-layer
      ref="ChangeMobile"
      :visible="visibleMobile"
      @cancel="mobileCancel"
    />
  </a-list>
</template>

<script>
import ChangePasswordLayer from '../components/ChangePasswordLayer'
import ChangeMobileLayer from '../components/ChangeMobileLayer'

import { putPsw } from "@/common/api.js";

export default {
  components: {ChangePasswordLayer,ChangeMobileLayer},
  data () {
    return {
      data: [
        { title: '账户密码', description: '当前密码强度', value: '强', actions: { title: '修改', callback: () => { this.visible=!this.visible } } },
        { title: '密保手机', description: '已绑定手机', value: '138****8293', actions: { title: '修改', callback: () => { this.visibleMobile=!this.visibleMobile } } },
      ],
      visibleMobile:false,
      visible:false
    }
  },
  methods:{
    handleCancel  () {
      const form = this.$refs.ChangePassword.form;
      form.resetFields();
      this.visible = false;
    },
    handleSubmit  () {
      const form = this.$refs.ChangePassword.form;
      form.validateFields((err, values) => {
        if (!err) {
          putPsw({
            "oldUserPassword": values.oldPassword,
            "userPassword1":  values.password,
            "userPassword2": values.confirm
          },this.$store.state.token)
          .then(res => {
            console.log(res)
            if(res.code === 200){
              this.$notification['success']({
              message: '提示',
              description: '更改密码成功',
              duration: 2
              })
              
              form.resetFields()
              this.visible = false

            } else {
              this.$notification['error']({
              message: '错误',
              description: res.msg || '更改密码失败',
              duration: 2
              })
            }
          })
          .catch(res => {
            console.log('err='+res)
          })
        }
      });
    },
    mobileCancel () {
      const form = this.$refs.ChangeMobile.form;
      form.resetFields();
      this.visibleMobile = false;
    }
  }
}
</script>

<style scoped>

</style>
