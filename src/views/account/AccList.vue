<template>
  <Card>
    <span slot="title">账号列表</span>
    <div slot="content">
      <el-table
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="账号" width="180">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column prop="name" label="用户组" width="240">
          <template slot-scope="scope">{{ scope.row.userGroup }}</template>
        </el-table-column>
        <el-table-column prop="days" label="创建日期" width="180">
          <template slot-scope="scope">{{
            scope.row.ctime | formatDate()
          }}</template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.id)"
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
      <el-button type="primary" @click="delAll()">删除选中</el-button>
      <el-button type="danger" @click="toggleSelection">取消选择</el-button>
      <el-dialog title="编辑当前用户" :visible.sync="dialogTableVisible">
        <el-form :model="form">
          <el-form-item label="账号" :label-width="formLabelWidth">
            <el-input v-model="form.account" autocomplete="off"></el-input>
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
          <el-button type="primary" @click="ok()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </Card>
</template>

<script>
import Card from "@/components/Card";
import {
  acclist_api,
  addacc_api,
  delaccAll_api,
  delacc_api,
  editacc_api,
} from "@/apis/acc.js";
import moment from "moment";
export default {
  components: {
    Card,
  },
  created() {
    this.getList();
  },
  data() {
    return {
      currentPage: 1, // 当前页数
      pageSize: 5, // 每页显示多少条
      total: 2, // 总条数
      dialogTableVisible: false, // 弹窗表格是否显示
      tableData: [],
      form: {
        account: "",
        userGroup: "",
      },
      formLabelWidth: "120px",
    };
  },

  methods: {
    async getList() {
      let res = await acclist_api({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      });
      let { data, total } = res.data;
      // 赋值
      if (data.length === 0) {
        if (this.currentPage > 1) {
          this.currentPage--;
          await this.getList();
        }
      }
      this.tableData = data;
      this.total = total;
    },
    handleSelectionChange(row) {
      this.ids = row.map((item) => item.id);
      console.log(this.ids);
    },
    handleSizeChange(val) {
      // 把值 赋值给条数
      this.pageSize = val;
      // 不要忘了重绘视图哦~~~
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // 不要忘了重绘视图哦~~~
      this.getList();
    },
    async delAll() {
      if (this.ids.length !== 0) {
        let res = await delaccAll_api({
          ids: JSON.stringify(this.ids),
        });
        await this.getList();
      } else {
        this.$message.error("你还未选择用户");
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该账号, 是否继续?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 点了删除按钮
          let res = await delacc_api({ id });
          let { code } = res.data;
          if (code === 0) {
            // 不要忘了重绘视图哦~~~
            await this.getList();
          }
        })
        .catch(() => {
          // 点了取消按钮
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    toggleSelection(rows) {
      this.$refs.multipleTable.clearSelection();
    },
    async edit(row) {
      this.dialogTableVisible = true;
      this.form = row;
    },
    async ok() {
      await editacc_api(this.form).then((res) => {
        console.log(res);
      });
      this.getList();
      this.dialogTableVisible = false;
    },
  },
  filters: {
    formatDate(val) {
      return moment(val).format("YYYY-MM-DD HH:mm:ss");
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
