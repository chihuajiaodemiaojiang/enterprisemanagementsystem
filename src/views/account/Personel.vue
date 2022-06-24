<template>
  <Card>
    <span slot="title">管理员信息</span>
    <div slot="content">
      <div>管理员ID: {{ info.id }}</div>
      <el-divider></el-divider>
      <div>账号: {{ info.account }}</div>
      <el-divider></el-divider>
      <div>用户组: {{ info.userGroup }}</div>
      <el-divider></el-divider>
      <div>创建时间: {{ info.ctime | formatDate }}</div>
      <el-divider></el-divider>
      <div>
        <el-upload
          action="http://127.0.0.1:5000/users/avatar_upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          class="avatar-uploader"
        >
          <img v-if="imageUrl" :src="baseUrl + imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- 提交00按钮 -->
        <el-button @click="editAvatar" size="mini" type="primary"
          >修改头像</el-button
        >
      </div>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card.vue";
// 引入local工具
import local from "@/utils/local.js";
import { avataredit_api } from "@/apis/acc.js";
// 引入moment工具
import moment from "moment";

export default {
  data() {
    return {
      baseUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/", // 图片的前半截路径
      imageUrl: "",
      //   准备一下数据
      info: {
        account: "",
        ctime: "",
        id: 12,
        imgUrl: "",
        userGroup: "",
      },
    };
  },

  components: {
    Card,
  },
  //   准备函数
  methods: {
    // 上传成功
    handleAvatarSuccess(res) {
      console.log("上传成功", res);
      let { code, imgUrl } = res;
      if (code === 0) {
        this.imageUrl = imgUrl;
      }
    },
    // 上传之前
    beforeAvatarUpload() {
      console.log("上传之前");
    },
    // 获取本地存储的用户数据
    getFn() {
      this.info = JSON.parse(local.get("info"));
    },
    // 修改用户头像的函数
    async editAvatar() {
      let res = await avataredit_api({
        imgUrl: this.imageUrl,
      });
      let { code } = res.data;
      if (code == 0) {
        this.$bus.$emit("updateAvatar");
      }
    },
  },
  //   生命周期
  created() {
    this.getFn();
  },
  //过滤器
  filters: {
    formatDate(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style lang="less" scoped>
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>
