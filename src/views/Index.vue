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
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
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
  .el-breadcrumb {
    width: 100%;
    height: 80px;
    line-height: 80px;
    padding: 0 25px;
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
  background: #f0f2f5;
  flex: 1;
  padding: 26px;
}
</style>
