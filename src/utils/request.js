import axios from "axios";
import local from "@/utils/local";
import { Message } from "element-ui";
import router from "@/router";
axios.defaults.baseURL = "http://127.0.0.1:5000";
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    let tk = local.get("tk");
    config.headers.Authorization = tk;
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    if (response.data.msg) {
      let { code, msg } = response.data;
      if (code === 0) {
        // 弹出成功地弹窗
        Message({
          type: "success",
          message: msg,
        });
      } else if (code === "00" || code === "11") {
      } else {
        // 弹出失败的弹窗
        Message.error(msg);
      }
    }
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    if (error.response.data.code === 401) {
      // 说明用户用的是一个错误的token
      // 清空错误的token, 并且重新登录
      local.clear();
      router.push("/login");
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default axios;
