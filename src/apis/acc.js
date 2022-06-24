import request from "@/utils/request";
import Qs from "qs";
export let login_api = (data) => {
  return request({
    url: "/users/checkLogin",
    method: "post",
    data: Qs.stringify(data),
  });
};
// 获取账号列表的api
export let acclist_api = (data) => {
  return request({
    url: "/users/list",
    method: "get",
    params: data,
  });
};
export let delacc_api = (data) => {
  return request({
    url: "/users/del",
    method: "get",
    params: data,
  });
};
// 添加账号的api
export let addacc_api = (data) => {
  return request({
    url: "/users/add",
    method: "post",
    data: Qs.stringify(data),
  });
};

// 批量删除账号的api
export let delaccAll_api = (data) => {
  return request({
    url: "/users/batchdel",
    method: "get",
    params: data,
  });
};
// 修改账号的api
export let editacc_api = (data) => {
  return request({
    url: "/users/edit",
    method: "post",
    data: Qs.stringify(data),
  });
};
// 检查旧密码的api
export let checkOldPwd_api = (data) => {
  return request({
    url: "/users/checkoldpwd",
    method: "get",
    params: data,
  });
};

//修改密码的api
export let editPwd_api = (data) => {
  return request({
    url: "/users/editpwd",
    method: "post",
    data: Qs.stringify(data),
  });
};
// 获取用户信息的api
export let getInfo_api = (data) => {
  return request({
    url: "/users/info",
    method: "get",
    params: data,
  });
};

// 修改用户头像的api
export let avataredit_api = (data) => {
  return request({
    url: "/users/avataredit",
    method: "get",
    params: data,
  });
};
