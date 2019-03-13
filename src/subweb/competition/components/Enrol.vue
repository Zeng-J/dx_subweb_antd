<template>
  <div id="components-form-demo-advanced-search">
    <div class="tips">
        <img src=" https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552203654038&di=64dfa5a9d658e2a563849708463520eb&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F120922%2F234819-120922100F789.jpg"
        style="width:10%;float:right"
        >
        <p>温馨提示：</p>
        <p>1343020012121</p>
        <p>1343020012121</p>
        <p>1343020012121</p>
    </div>
    <a-form
      class="ant-advanced-search-form"
      :form="form"
      @submit="handleSearch"
    >
        <p style="color:red">特别提醒：一旦提交，不可修改！</p>
        <a-row :gutter="24">
            <a-col :span="8">
            <a-form-item label="真实姓名">
                <a-input
                v-decorator="[ 'realName', { rules: [{ message: 'Input something!',}],}]" 
                placeholder="placeholder"
                />
            </a-form-item>
            </a-col>
            <a-col :span="8">
            <a-form-item label="手机号码">
                <a-input
                v-decorator="[ 'mobile', { rules: [{ message: 'Input something!',}],}]" 
                placeholder="placeholder"
                />
            </a-form-item>
            </a-col>
            <a-col :span="8">
            <a-form-item label="QQ邮箱">
                <a-input
                v-decorator="[ 'email', { rules: [{ message: 'Input something!',}],}]" 
                placeholder="placeholder"
                />
            </a-form-item>
            </a-col>
            <a-col :span="8">
            <a-form-item label="所属院校">
                <a-input
                v-decorator="[ 'school', { rules: [{ message: 'Input something!',}],}]" 
                placeholder="placeholder"
                />
            </a-form-item>
            </a-col>       
            <a-col :span="8">
            <a-form-item label="院系专业">
                <a-input
                v-decorator="[ 'major', { rules: [{ message: 'Input something!',}],}]" 
                placeholder="placeholder"
                />
            </a-form-item>
            </a-col>
            <a-col :span="8">
            <a-form-item label="毕业年份">
                <a-input
                v-decorator="[ 'year', { rules: [{ message: 'Input something!',}],}]" 
                placeholder="placeholder"
                />
            </a-form-item>
            </a-col>
            <a-col :span="8">
            <a-form-item label="个人简历">
                <a-button type="primary">上传</a-button>
            </a-form-item>
            </a-col>
            <a-col :span="8">
            <a-form-item label="学生证">
                <a-button type="primary">上传</a-button>
            </a-form-item>
            </a-col>
        </a-row>
        <a-row>
            <a-col offset="8">
                <a-button type="primary">提交报名</a-button>
            </a-col>
        </a-row>
    </a-form>
  </div>
</template>
<script>

export default {
  data () {
    return {
      form: this.$form.createForm(this),
    };
  },

  methods: {
    handleSearch  (e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        console.log('error', error);
        console.log('Received values of form: ', values);
      });
    },
  },
};
</script>
<style scoped>
.ant-advanced-search-form {
  padding: 14px 24px;
  /* background: #465 */
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

#components-form-demo-advanced-search .ant-form {
  max-width: none;
}
#components-form-demo-advanced-search .tips {
  margin-top: 16px;
  min-height: 200px;
  padding-top: 10px;
  /* background: #000 */
}
</style>