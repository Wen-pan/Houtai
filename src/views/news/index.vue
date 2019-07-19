<template>
  <div class="news-main">
    <el-card class="news-card" :body-style="{ padding: '0px' }">
      <div slot="header">
        <h2>新闻管理</h2>
        <el-button type="success" @click="addnews()">添加</el-button>
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="标题">
            <el-input v-model="searchForm.title" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="searchForm.author" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" size="mini">搜索</el-button>
            <el-button type="success" @click="resact" size="mini">重置</el-button>
          </el-form-item>
        </el-form>
        <el-pagination
          class="newspage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.start"
          :page-sizes="[5, 10, 15]"
          :page-size="page.limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.todolcount"
        ></el-pagination>
      </div>
      <el-table
        :data="newsList"
        border
        stripe
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column fixed type="index" label="#" width="120" height="50"></el-table-column>
        <el-table-column prop="title" label="标题" width="120" height="50"></el-table-column>
        <el-table-column prop="hot" label="热度" width="120" height="50"></el-table-column>
        <el-table-column prop="author" label="作者" width="120" height="50"></el-table-column>
        <el-table-column prop="addTime" label="发布时间" width="120" height="50"></el-table-column>
        <el-table-column prop="cover" label="封面图片" width="120" height="50">
          <template slot-scope="scope">
            <img :src="scope.row.cover" alt width="100" height="100" />
          </template>
        </el-table-column>
        <el-table-column prop="desc" label="内容描述" width="120" height="50"></el-table-column>
        <el-table-column prop="zanCount" label="点赞量" width="120" height="50"></el-table-column>
        <el-table-column prop="viewCount" label="浏览量" width="120" height="50"></el-table-column>
        <el-table-column prop="content1" label="文章" width="120" height="50"></el-table-column>
        <el-table-column prop="content2" label="转码的html" width="120" height="50"></el-table-column>
        <el-table-column label="操作" fixed="right" width="150">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="addnews(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="delnews(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <newsDialog ref="detail"></newsDialog>
    </el-card>
  </div>
</template>

<script>
import newsDialog from "./detail/detail";
import tinymce from "@/components/Tinymce";
import NewsApi from "@/api/news";
import { resetDate } from "@/utils/index";
export default {
  name: "News",
  components: {
    tinymce,
    newsDialog
  },
  data() {
    return {
      loading:false,
      searchForm: {
        title: "",
        author: ""
      },
      newsList: [],
      myUrl: "http://59.110.138.169/media/",
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
    this.getNewsLists();
  },
  methods: {
    getNewsLists() {
      this.loading=true;
      var searchObj = this.searchForm;
      NewsApi.getNewsList({
        start: this.page.start,
        limit: this.page.limit,
        ...searchObj
      }).then(res => {
        console.log(res);
        this.loading=false;
        this.newsList = res.data.list;
        this.page.limit = res.data.pageSize;
        this.page.todolcount = res.data.totalRow;
        this.page.todopage = res.data.totalPage;
      });
    },
    handleSizeChange(val) {
      this.page.limit = val;
      this.getNewsLists();
    },
    handleCurrentChange(val) {
      this.page.start = val;
      this.getNewsLists();
    },
    addnews(id) {
      this.$refs.detail.opendialog(id);
    },
    delnews(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          NewsApi.DelNewsList({ id }).then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getNewsLists();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    onSubmit() {
      resetDate(this, "page");
      this.getNewsLists();
    },
    resact() {
      this.searchForm = this.$options.data().searchForm;
      this.page = this.$options.data().page;
      this.getNewsLists();
    }
  }
};
</script>

<style lang='scss' scoped>
.news-main {
  .news-card {
    margin: 30px 20px;
    .newspage {
      text-align: right;
    }
  }
  .demo-form-inline {
    text-align: right;
  }
}
</style>
