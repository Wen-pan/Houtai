<template>
  <div class="dorm-main">
    <el-card class="dorm-card">
      <div slot="header">
        <h2>宿舍管理</h2>
        <el-button type="primary" @click="adddetail()">添加</el-button>
        <el-pagination
          class="dormpage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.start"
          :page-sizes="[5, 10, 15]"
          :page-size="page.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.todolcount"
        ></el-pagination>
      </div>
      <el-table :data="dormList" border stripe  v-loading="loading">
        <el-table-column fixed type="index" label="#" width="120"></el-table-column>
        <el-table-column prop="name" label="宿舍名" width="120"></el-table-column>
        <el-table-column prop="type" label="宿舍类型" width="120"></el-table-column>
        <el-table-column prop="position" label="详细地址" width="120"></el-table-column>
        <el-table-column prop="startTime" label="开班时间" width="120"></el-table-column>
        <el-table-column prop="endTime" label="结课时间" width="120"></el-table-column>
        <el-table-column prop="bak" label="班级描述" width="120"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="adddetail(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <dormdetailList ref="detail" @getdormLists="getdormLists"></dormdetailList>
    </el-card>
  </div>
</template>

<script>
import dormdetailList from "./detail/detail";
import DormdListApi from "@/api/dorm";
export default {
  name: "Dorm",

  data() {
    return {
       loading: false,
      dormList: [],
      // 分页
      page: {
        start: 1, //当前第几页
        limit: 5, //每页显示的个数
        todolcount: 0, //总数
        todopage: 0 //总页数
      },
    };
  },
  components: {
    dormdetailList
  },
  created() {
    this.getdormLists();
  },
  methods: {
    getdormLists() {
      this.loading=true
      var { start, limit } = this.page;
      DormdListApi.getDormList({start,limit}).then(res => {
        console.log(res)
        Object.assign(this.page,{
          limit:res.data.pageSize,
          todolcount:res.data.totalRow,
          todopage:res.data.totalPage
        })
        this.dormList = res.data.list;
        this.loading=false
      });
    },
    adddetail(id) {
      this.$refs.detail.opendialog(id);
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          DormdListApi.deldorm({ id }).then(res => {
            this.getdormLists();
          });
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleSizeChange(val){
        this.page.limit=val;
        this.getdormLists()
    },
    handleCurrentChange(val){
      this.page.start=val;
      this.getdormLists()
    }
  }
};
</script>

<style lang='scss' scoped>
.dorm-main {
  .dorm-card {
    margin: 20px;
    .dormpage{
      text-align: right;
    }
  }
}
</style>


