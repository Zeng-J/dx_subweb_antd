<template>
  <div>
    <a-modal
      :title="title"
      :visible="visible"
      @cancel="handleCancel"
      @ok="handleOk"
      okText="保存"
      cancelText="返回"
    >
        <a-form  :form="form">
            <a-form-item
            :label-col="formTailLayout.labelCol"
            :wrapper-col="formTailLayout.wrapperCol"
            label="名称"
            >
            <a-input
                v-decorator="[
                'name',
                {rules: [{ required: true, message: '必填！/最长20个字符！' }]}
                ]"
                placeholder="名称"
            />
            </a-form-item> 
            <a-form-item
            :label-col="formTailLayout.labelCol"
            :wrapper-col="formTailLayout.wrapperCol"
            label="显示顺序"
            >
            <a-input
                v-decorator="[
                'order',
                {rules: [{ required: true, message: '必填！/只允许数字！' }]}
                ]"
                placeholder="数值越大，显示越靠前"
            />
            </a-form-item>           
            <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="状态"
            >
            <a-radio-group  v-model="value">
                <a-radio :value="1">启用</a-radio>
                <a-radio :value="2">禁用</a-radio>
            </a-radio-group>
            </a-form-item>
            <a-form-item
            v-bind="formItemLayout"
            label="权限"
            >
            <a-checkbox-group
                v-decorator="[
                    'checkbox-group', 
                    {rules: [{ required: true, message: '至少选择一项！' }]},
                    {initialValue: ['A', 'B']}
                ]"
                style="width: 100%;"
            >
                <a-row>
                <a-col :span="8">
                    <a-checkbox value="A">
                    全部权限
                    </a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="B">
                    组织架构
                    </a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="C">
                    查询团队成员
                    </a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="D">
                    查询团队角色
                    </a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="E">
                    创建团队成员
                    </a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="F">
                    创建团队角色
                    </a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="G">
                    编辑团队成员
                    </a-checkbox>
                </a-col>
                <a-col :span="8">
                    <a-checkbox value="H">
                    编辑团队角色
                    </a-checkbox>
                </a-col>
                </a-row>
            </a-checkbox-group>
            </a-form-item>            
            <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
            label="备注"
            >
                <a-textarea 
                placeholder="Basic usage" 
                :rows="4"
                v-decorator="[
                    'note', 
                    {rules: [{ required: true, message: '请添加备注！' }]},
                ]"
                />
            </a-form-item>
        </a-form>
    </a-modal>
  </div>
</template>
<script>
export default {
    // props:['visible'],
    beforeCreate(){
        this.form = this.$form.createForm(this)
    },
    data() {
        return {
            visible:false,
            formItemLayout:{
                labelCol: { span: 4 },
                wrapperCol: { span: 20 },
            },
            formTailLayout:{
                labelCol: { span: 4 },
                wrapperCol: { span: 10 },
            },
            value:2,
            title:''
        }
    },
  methods: {
    handleCancel () {
        const form = this.form;
        form.resetFields();
        this.visible = false;
    },
    handleOk(e) {
      console.log(e);
      const form = this.form;
      form.resetFields();
      this.visible = false;
    },
  }
}
</script>