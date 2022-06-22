<template>
  <Card>
    <span slot="title">账号列表</span>
    <div slot="content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="账号" width="180">
          <template slot-scope="scope">{{ scope.row.acc }}</template>
        </el-table-column>
        <el-table-column prop="name" label="用户组" width="240">
          <template slot-scope="scope">{{ scope.row.userGroup }}</template>
        </el-table-column>
        <el-table-column prop="days" label="创建日期" width="180">
          <template slot-scope="scope">{{ scope.row.days }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
      <el-button type="primary" @click="delAll">删除选中</el-button>
      <el-button type="danger" @click="toggleSelection">取消选择</el-button>
      <el-dialog title="编辑当前用户" :visible.sync="dialogTableVisible">
        <el-form :model="form">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="form.acc" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="修改用户组" :label-width="formLabelWidth">
            <el-select v-model="form.userGroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogTableVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
export default {
  components: {
    Card,
  },
  data() {
    return {
      currentPage: 1, // 当前页数
      pageSize: 5, // 每页显示多少条
      total: 2, // 总条数
      dialogTableVisible: false, // 弹窗表格是否显示
      tableData: [
        {
          id: 1,
          days: "2016-05-02",
          acc: "王小虎",
          userGroup: "超级管理员",
        },
        {
          id: 2,
          days: "2016-05-02",
          acc: "王小龙",
          userGroup: "普通管理员",
        },
      ],
      form: {
        acc: "",
        userGroup: "",
      },
      formLabelWidth: "120px",
    };
  },

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.ids = val.map((item) => item.id);
    },
    delAll() {
      JSON.stringify(this.ids);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    toggleSelection(rows) {
      this.$refs.multipleTable.clearSelection();
    },
    edit(row) {
      console.log(row);
      this.dialogTableVisible = true;
      this.form = row;
    },
  },
};
</script>

<style lang="less" scoped>
.el-table {
  margin-bottom: 20px;
}
.el-pagination {
  margin-bottom: 20px;
}
</style>
