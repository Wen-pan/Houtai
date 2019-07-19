<template>
  <div class="classes-main">
    <el-card class="class-card">
      <div slot="header">
        <h2>班级管理</h2>
        <el-button type="primary" @click="addclass()">添加</el-button>
        <el-pagination
          class="classpage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.start"
          :page-sizes="[5, 10, 15]"
          :page-size="page.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.todolcount"
        ></el-pagination>
      </div>
      <el-table :data="classList" border stripe style="width: 100%">
        <el-table-column fixed type="index" label="#" width="120"></el-table-column>
        <el-table-column prop="className" label="班级名字" width="120"></el-table-column>
        <el-table-column prop="type" label="班级类型" width="120"></el-table-column>
        <el-table-column prop="startTime" label="开班时间" width="120"></el-table-column>
        <el-table-column prop="endTime" label="结课时间" width="120"></el-table-column>
        <el-table-column prop="desc" label="班级描述" width="120"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="addclass(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <classDetail ref="detail" @getclassLists="getclassLists"></classDetail>
    </el-card>
  </div>
</template>

<script>
import ClassListApi from "@/api/class";
import classDetail from "@/views/classes/detail/detail";
export default {
  name: "classes",

  data() {
    return {
      classList: [],
      // 分页
      page: {
        start: 1, //当前第几页
        limit: 5, //每页显示的个数
        todolcount: 0, //总数
        todopage: 0 //总页数
      }
    };
  },
  created() {
    this.getclassLists();
  },
  components: {
    classDetail
  },
  methods: {
    getclassLists() {
      ClassListApi.getclassList({
        start: this.page.start,
        limit: this.page.limit
      }).then(res => {
        this.classList = res.data.list;
        this.page.limit = res.data.pageSize;
        this.page.todolcount = res.data.totalRow;
        this.page.todopage = res.data.totalPage;
      });
    },
    addclass(id) {
      this.$refs.detail.opendialog(id);
    },

    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          ClassListApi.delclassDetail({ id }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getclassLists();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val) {
      this.page.limit = val;
      console.log(val);
      this.getclassLists();
    },
    handleCurrentChange(val) {
      this.page.start = val;
      this.getclassLists();
      console.log(val);
    }
  }
};
</script>

<style lang='scss' scoped>
.classes-main {
  .class-card {
    margin: 30px;
    .classpage {
      text-align: right;
    }
  }
}
</style>
