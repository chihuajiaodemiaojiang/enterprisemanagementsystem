import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Index from "@/views/Index";
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
Vue.use(VueRouter);
import local from "@/utils/local";
const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component: Index,
    meta: { title: "1" },
    children: [
      {
        path: "",
        component: () => import("@/views/home/Home"),
      },
    ],
  },
  {
    path: "/shop",
    component: Index,
    children: [
      {
        path: "",
        meta: { title: "1" },
        component: () => import("@/views/shop/Shop"),
      },
    ],
  },
  {
    path: "/order",
    component: Index,
    children: [
      {
        path: "",
        meta: { title: "1" },
        component: () => import("@/views/order/Order"),
      },
    ],
  },
  {
    path: "/goods",
    component: Index,
    meta: { title: "商品列表" },
    redirect: "/goods/goodslist",
    children: [
      {
        path: "goodsadd",
        meta: { title: "商品添加" },
        component: () => import("@/views/goods/GoodsAdd"),
      },
      {
        path: "goodslist",
        meta: { title: "商品列表" },
        component: () => import("@/views/goods/GoodsList"),
      },
      {
        path: "goodstype",
        meta: { title: "商品类型" },
        component: () => import("@/views/goods/GoodsType"),
      },
    ],
  },
  {
    path: "/count",
    component: Index,
    redirect: "/count/goodscount",
    meta: { title: "销售管理" },
    children: [
      {
        path: "goodscount",
        meta: { title: "商品统计" },
        component: () => import("@/views/count/GoodsCount"),
      },
      {
        path: "ordercount",
        meta: { title: "订单统计" },
        component: () => import("@/views/count/OrderCount"),
      },
    ],
  },
  {
    path: "/account",
    component: Index,
    redirect: "/account/acclist",
    meta: { title: "账号管理" },
    children: [
      {
        path: "accadd",
        meta: { title: "账号添加" },
        component: () => import("@/views/account/AccAdd"),
      },
      {
        path: "acclist",
        meta: { title: "账号列表" },
        component: () => import("@/views/account/AccList"),
      },
      {
        path: "accedit",
        meta: { title: "密码修改" },
        component: () => import("@/views/account/AccEdit"),
      },
      {
        path: "personel",
        meta: { title: "个人中心" },
        component: () => import("@/views/account/Personel"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else {
    let tk = local.get("tk");
    if (tk) {
      next();
    } else {
      next("/login");
    }
  }
});
export default router;
