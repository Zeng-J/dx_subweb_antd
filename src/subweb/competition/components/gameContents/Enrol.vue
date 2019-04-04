<template>
  <div id="components-form-demo-advanced-search">
    <div class="tips">
      <img src=" https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1552203654038&di=64dfa5a9d658e2a563849708463520eb&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F120922%2F234819-120922100F789.jpg" style="width:10%;float:right">
      <p>温馨提示：</p>
      <p>1343020012121</p>
      <p>1343020012121</p>
      <p>1343020012121</p>
    </div>
    <p style="color:red">特别提醒：一旦提交，不可修改！</p>
    <a-form class="ant-advanced-search-form" :form="form" @submit="handleSearch">
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="真实姓名">
            <a-input v-decorator="[ 'realName', { rules: [{ required: true, message: 'Input something!',}],}]" placeholder="placeholder" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="手机号码">
            <a-input v-decorator="[ 'mobile', { rules: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号!',}],}]" placeholder="placeholder" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="QQ邮箱">
            <a-input v-decorator="[ 'email', { rules: [{ required: true, pattern:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/, message: '请输入正确的邮箱地址!',}],}]" placeholder="placeholder" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="所属院校">
            <a-input v-decorator="[ 'school', { rules: [{ required: true, message: 'Input something!',}],}]" placeholder="placeholder" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="院系专业">
            <a-input v-decorator="[ 'major', { rules: [{ required: true, message: 'Input something!',}],}]" placeholder="placeholder" />
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="毕业年份">
            <a-date-picker v-decorator="['graduateTime', { rules: [{ type: 'object', required: true, message: 'Please select time!' }]}]" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-form-item label="个人简历">
            <a-upload name="resume" :action="uploadUrl" @change="handleChange" v-decorator="['resume']">
              <a-button>上传</a-button>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item label="学生证">
            <a-upload name="studentCard" :action="uploadUrl" @change="handleChange" v-decorator="['studentCard']">
              <a-button>上传</a-button>
            </a-upload>
          </a-form-item>
        </a-col>
        <a-col :span="8">
          <a-form-item>
            <a-button type="primary" htmlType="submit">提交报名</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>
<script>
import { uploadUrl } from "@/common/const"
import { jionContest } from '@/common/api'

export default {
  data() {
    return {
      uploadUrl,
      form: this.$form.createForm(this)
    };
  },

  methods: {
    handleSearch(e) {
      e.preventDefault();
      this.form.validateFields((error, values) => {
        // console.log("error", error)
        if (error) {
          return
        }
        // console.log("Received values of form: ", values)

        jionContest({
          "graduateTime": values.graduateTime._d,
          "relContestId": this.$route.query.contestId,
          "userMajor": values.major,
          "userMobile": values.mobile,
          "userName": values.realName,
          "userQqEmail": values.email,
          "userResume":  (values.resume && values.resume.file.response.data) || '',
          "userSchool": values.school,
          "userStudentCard": (values.studentCard && values.studentCard.file.response.data) || ''
        },this.$store.state.token)
        .then(res => {
          if (res.code !== 200) {
            return this.$message.error(res.msg)
          }
          this.$message.success(res.msg)
        })
        .catch(err => {
          console.log(err)
        })

      })
    },
    handleChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        this.$message.success(`${info.file.name} 文件上传成功`);
      } else if (info.file.status === "error") {
        this.$message.error(`${info.file.name} 文件上传失败`);
      }
    }
  }
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