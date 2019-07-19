<template>
  <div class="class-main">
    <el-card class="search-card">
      <div slot="header">
        <span>搜索条件</span>
      </div>
      <el-form :model="searchForm" ref="searchForm" label-width="80px">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="姓名">
              <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="班级">
              <el-select v-model="searchForm.classId" placeholder="请选择">
                <el-option
                  v-for="item in classList"
                  :key="item.id"
                  :label="item.className"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="宿舍">
              <el-select v-model="searchForm.dormId" placeholder="请选择">
                <el-option
                  v-for="item in dormList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4" :offset="20">
            <el-form-item>
              <el-button type="primary" @click="dosearch" size="mini">查询</el-button>
              <el-button @click="reset" size="mini" >重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="list-card">
      <div slot="header">
        <span>学员列表</span>
        <el-button type="primary" @click="adddetail()">添加</el-button>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.start"
          :page-sizes="[5,10,15]"
          :page-size="page.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.todolcount"
        ></el-pagination>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="studentlists"
        border
        style="width: 100%"
      >
        <el-table-column fixed type="index" label="#" width="100"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="sexv" label="性别" width="100"></el-table-column>
        <el-table-column prop="classname" label="班级" width="100"></el-table-column>
        <el-table-column prop="dormname" label="宿舍" width="100"></el-table-column>
        <el-table-column prop="qq" label="QQ" width="100"></el-table-column>
        <el-table-column prop="wx" label="微信" width="100"></el-table-column>
        <el-table-column prop="school" label="学校" width="100"></el-table-column>
        <el-table-column prop="city" label="城市" width="100"></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope" >
            <el-button size="mini" type="primary" @click="seedetail(scope.row.id)">查看</el-button>
            <el-button size="mini" type="success" @click="adddetail(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <studentDetail
      ref="detail"
      :classList="classList"
      @getStudentList="getStudentList"
      :dormList="dormList"
    ></studentDetail>
  </div>
</template>

<script>
import StudentApi from "@/api/student";
import studentDetail from "./detail/detail";
import classApi from "@/api/clazz";
import dormApi from "@/api/dorm";
import { resetDate } from "@/utils/index";
import { regionDataPlus, CodeToText } from "element-china-area-data";
export default {
  name: "Clazz",

  data() {
    return {
      searchForm: {
        name: "",
        classId: "",
        dormId: ""
      },
      // 分页
      page: {
        start: 1, //当前第几页
        limit: 5, //每页显示的个数
        todolcount: 0, //总数
        todopage: 0 //总页数
      },
      // 列表数据
      studentlist: [],
      //班级数据
      classList: [],
      // 宿舍数据
      dormList: [],
      detailshow: false,
      loading: true
    };
  },
  components: {
    studentDetail
  },
  created() {
    this.getclassLists();
    this.getdormLists();
    this.getStudentList();
  },
  computed: {
    studentlists() {
      return this.studentlist.map(item => {
        if (item.city) {
          var cityStr = item.city.split(",");
          var citys = "";
          for (var i = 0; i < cityStr.length; i++) {
            citys += CodeToText[cityStr[i]];
          }
          item.city = citys
        }
        return item;
      });
    }
  },
  methods: {
    dosearch() {
      resetDate(this, "page");
      this.getStudentList();
    },
    // 获取列表
    getStudentList() {
      this.loading = true;
      //分页的查询条件
      var { start, limit } = this.page; //解构
      //搜索的查询条件
      var searchObj = this.searchForm;
      StudentApi.getstndentList({
        start,
        limit,
        ...searchObj
      }).then(res => {
        this.page.limit = res.data.pageSize;
        this.page.todolcount = res.data.totalRow;
        this.page.todopage = res.data.totalPage;
        this.studentlist = res.data.list;
        this.loading = false;
      });
    },
    //班级列表
    getclassLists() {
      classApi.getclassList().then(res => {
        this.classList = res.data.list;
      });
    },
    //宿舍列表
    getdormLists() {
      dormApi.getDormList().then(res => {
        this.dormList = res.data.list;
      });
    },
    //删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          StudentApi.delstudentdetail({ id }).then(res => {
            this.getStudentList();
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
    seedetail(id) {
      this.$refs.detail.seedetail(id);
    },
    // 分页页数
    handleSizeChange(val) {
      this.page.limit = val;
      this.getStudentList();
    },
    //分页每页显示几个
    handleCurrentChange(val) {
      this.page.start = val;
      this.getStudentList();
    },
    //重置
    reset() {
      this.searchForm = this.$options.data().searchForm;
      this.page = this.$options.data().page;
      this.getStudentList();
    },
    //添加&&编辑调用子组件的方法
    adddetail(id) {
      this.$refs.detail.openDialog(id); //调用子组件的方法
    }
  }
};
</script>
<style lang='scss' scoped>
.class-main {
  .search-card {
    margin: 30px 20px;
  }
  .list-card {
    margin: 10px 20px;
    .pagination {
      text-align: right;
    }
  }
}
</style>

