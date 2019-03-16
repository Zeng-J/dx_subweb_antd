<template>
  <div id="components-form-demo-advanced-search">
    <div class="tips">
        <p>温馨提示：</p>
        <p>1343020012121</p>
        <p>1343020012121</p>
        <p>1343020012121</p>
    </div>
    <a-card >
        <a-form
        :form="form"
        @submit="handleSearch"
        >
            <a-form-item label="1.[单选题]达到发放">
                <a-radio-group v-decorator="['radio-group']">
                    <a-radio value="a">
                    A.locastroage
                    </a-radio>
                    <a-radio value="b">
                    B.locastroage
                    </a-radio>
                    <a-radio value="c">
                    C.locastroage
                    </a-radio>
                </a-radio-group>
            </a-form-item> 
            <a-form-item label="2.[多选题]阿发发发">
                <a-checkbox-group v-decorator="['checkbox-group']">
                    <a-checkbox value="A">
                    全部权限
                    </a-checkbox>
                    <a-checkbox value="B">
                    组织架构
                    </a-checkbox>
                    <a-checkbox value="C">
                    查询团队团员
                    </a-checkbox>
                </a-checkbox-group>
            </a-form-item>
            <a-form-item label="3.[简答题]啊无法让人">
                <a-textarea placeholder="Basic usage" :rows="4"/>
            </a-form-item>  
            <a-form-item>
                <a-button
                    type="primary"
                    html-type="submit"
                >
                提交答卷
                </a-button>
            </a-form-item>
        </a-form>
    </a-card>
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