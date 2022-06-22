import request from "@/utils/request";
import Qs from "qs";
export let login_api = (data) => {
  return request({
    url: "/users/checkLogin",
    method: "post",
    data: Qs.stringify(data),
  });
};
