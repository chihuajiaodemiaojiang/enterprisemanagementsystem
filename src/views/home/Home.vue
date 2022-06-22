<template>
  <div class="home-main">
    <!-- echarts容器 -->
    <div ref="box" class="box"></div>
  </div>
</template>

<script>
// 在首页中引入echarts
import * as echarts from "echarts";
export default {
  // 生命周期
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.box);

    // 核心配置参数
    let option = {
      title: {
        text: "首页数据",
      },
      tooltip: {
        trigger: "axis",
      },
      // 图例
      legend: {
        data: ["瑞幸咖啡", "蜜雪冰城"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {}
      //   }
      // },
      // X轴数据
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      // Y轴数据
      series: [
        {
          name: "瑞幸咖啡",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "蜜雪冰城",
          type: "line",
          stack: "Total",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    };
    // 绘制图表
    myChart.setOption(option);
  },
};
</script>

<style lang="less" scoped>
.home-main {
  .box {
    width: 100%;
    height: 380px;
    background: #fff;
    padding: 15px;
  }
}
</style>
