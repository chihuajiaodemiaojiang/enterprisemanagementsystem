<template>
  <Card>
    <span slot="title">修改密码</span>
    <div slot="content">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpass">
          <el-input
            type="newpassword"
            v-model="ruleForm.newpass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
import { editPwd_api, checkOldPwd_api } from "@/apis/acc.js";
import { PWD_REG } from "@/utils/reg.js";
import local from "@/utils/local";
export default {
  components: {
    Card,
  },
  data() {
    let checkOldPwd = async (rules, value, callback) => {
      if (!value) {
        // 非空
        callback(new Error("旧密码不能为空"));
      } else if (!PWD_REG.test(value)) {
        // 正则
        callback(new Error("请输入4-12位密码"));
      } else {
        // 验证通过
        let res = await checkOldPwd_api({
          oldPwd: value,
        });
        let { code, msg } = res.data;
        if (code === "00") {
          callback();
        } else {
          callback(new Error(msg));
        }
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        checkPass: "",
        newpass: "",
      },
      rules: {
        pass: [{ validator: checkOldPwd, trigger: "blur" }],
        newpass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm() {
      console.log("发请求,把所有验证都走一次");
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          // 通过了  发请求 弹窗
          let res = await editPwd_api({
            newPwd: this.ruleForm.newpass,
          });
          let { code } = res.data;
          if (code === 0) {
            // 修改密码成功
            // 清空本地的token
            local.clear();
            // 回到登录
            await this.$router.push("/login");
          }
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.el-form-item {
  width: 306px;
}
</style>
