<template>
  <div class="main">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#334156"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      :default-active="this.$route.path"
      router
    >
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span>后台首页</span>
      </el-menu-item>
      <el-menu-item index="/order">
        <i class="el-icon-document"></i>
        <span>订单管理</span>
      </el-menu-item>
      <el-submenu index="/goods">
        <template slot="title">
          <i class="el-icon-shopping-bag-2"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/goods/goodslist">商品列表</el-menu-item>
        <el-menu-item index="/goods/goodsadd">商品添加</el-menu-item>
        <el-menu-item index="/goods/goodstype">商品分类</el-menu-item>
      </el-submenu>
      <el-menu-item index="/shop">
        <i class="el-icon-s-shop"></i>
        <span>店铺管理</span>
      </el-menu-item>
      <el-submenu index="/account">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>账号管理</span>
        </template>
        <el-menu-item index="/account/acclist">账号列表</el-menu-item>
        <el-menu-item index="/account/accadd">账号添加</el-menu-item>
        <el-menu-item index="/account/accedit">修改密码</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item index="/count/goodscount">商品统计</el-menu-item>
        <el-menu-item index="/count/ordercount">订单统计</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="right-content">
      <div class="nav">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item
            v-for="breadCrumbItem in breadCrumbList"
            :key="breadCrumbItem.path"
            :to="breadCrumbItem.path"
            v-if="breadCrumbItem.meta.title !== '1'"
          >
            {{ breadCrumbItem.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown @command="changeTag">
          <span class="el-dropdown-link">
            欢迎你,{{ info.account }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <img class="avatar" :src="info.imgUrl" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personel">个人中心</el-dropdown-item>
            <el-dropdown-item command="out">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { getInfo_api } from "@/apis/acc.js";
import local from "@/utils/local";
export default {
  name: "index",
  data() {
    return {
      info: {
        account: "",
        ctime: "",
        id: 1,
        imgUrl: "",
        userGroup: "",
      },
    };
  },
  methods: {
    async getInfo() {
      let res = await getInfo_api();
      let { accountInfo } = res.data;
      // 赋值的过程
      this.info = accountInfo;
      // 把数据存入本地
      local.set("info", JSON.stringify(this.info));
    },
    changeTag(val) {
      if (val == "personel") {
        // 说明访问的个人中心
        this.$router.push("/account/personel");
      } else {
        // 说明访问的是退出  返回登录 清空本地
        local.clear();
        this.$router.push("/login");
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  created() {
    this.getInfo();
    this.$bus.$on("updateAvatar", () => {
      // 接收到个人中心发过来的通知
      this.getInfo();
    });
  },
  computed: {
    breadCrumbList() {
      return this.$route.matched;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  .right-content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .nav {
    width: 100%;
    height: 80px;
    line-height: 80px;
    padding: 0 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.el-menu-vertical-demo {
  width: 225px;
  height: 100%;
}
.template {
  color: #eeeeee;
}
.content {
  padding: 20px;
  background: #f0f2f5;
  flex: 1;
}
.avatar {
  width: 50px;
  height: 50px;
  margin-left: 15px;
  border-radius: 50%;
  vertical-align: middle;
}
</style>
