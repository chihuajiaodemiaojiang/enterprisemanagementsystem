<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <slot name="title"></slot>
    </div>
    <div>
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "Card",
};
</script>

<style lang="less" scoped></style>
