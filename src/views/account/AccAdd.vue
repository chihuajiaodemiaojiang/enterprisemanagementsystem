<template>
  <Card>
    <span slot="title">添加账号</span>
    <div slot="content">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        hide-required-asterisk
      >
        <el-form-item label="账户" prop="account">
          <el-input v-model="ruleForm.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="user">
          <el-select v-model="ruleForm.user" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
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
import { addacc_api } from "@/apis/acc";
import { ACC_REG, PWD_REG } from "@/utils/reg";
export default {
  components: {
    Card,
  },
  data() {
    let checkAcc = (rules, value, callback) => {
      // 非空判断
      if (!value) {
        callback(new Error("账号不能为空"));
      } else if (!ACC_REG.test(value)) {
        callback(new Error("请输入4-12位之间"));
      } else {
        // 所有条件都满足
        callback();
      }
    };

    // 验证密码
    let checkPwd = (rules, value, callback) => {
      if (!value) {
        // 非空
        callback(new Error("密码不能为空"));
      } else if (!PWD_REG.test(value)) {
        // 不满足正则
        callback(new Error("请输入4-12密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        pass: "",
        account: "",
        user: "",
      },
      rules: {
        pass: [{ validator: checkPwd, trigger: "blur" }],
        account: [{ validator: checkAcc, trigger: "blur" }],
        userGroup: [
          { required: true, message: "用户组不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = await addacc_api({
            account: this.ruleForm.account,
            password: this.ruleForm.pass,
            userGroup: this.ruleForm.user,
          });
          let { code } = res.data;
          if (code == 0) {
            // 跳转页面
            this.$router.push("/account/acclist");
          }
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
.el-form-item {
  width: 306px;
}
</style>
