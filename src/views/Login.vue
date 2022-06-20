<template>
  <div class="login-main">
    <h2>系统登入</h2>
    <div class="login-main-content">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-s-custom"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-edit"
            v-model="loginForm.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-button type="primary" @click="login" :loading="false" :plain="true"
          >登入</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 5, max: 8, message: "长度在 5 到 8 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          axios
            .post("http://127.0.0.1:5000/users/checkLogin", {
              username: this.username,
              password: this.password,
            })
            .then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  message: "登入成功",
                  type: "success",
                });
                this.$router.push("/index");
              } else {
                this.$message({
                  message: "账号密码错误",
                  type: "warning",
                });
              }
            });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  display: none !important;
}
.login-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #2d3a4b;
  h2 {
    color: white;
    margin-bottom: 35px;
  }
  .login-main-content {
    width: 550px;
    .el-form-item {
      margin-bottom: 30px;
      background: #2d3a4b;
    }
    .el-input--small .el-input__inner {
      border: 2px solid #c7cacd;
    }
    /deep/.el-input__inner {
      background-color: transparent !important;
    }
    .el-button {
      width: 100%;
    }
  }
}
</style>
