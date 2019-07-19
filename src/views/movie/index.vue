<template>
  <div class="movie-main">
    <el-card class="movie-card">
      <div slot="header">
        <span>电影列表</span>
      </div>
      <el-table class="moviedetail" :data="movieListCom" border style="width: 100%">
        <el-table-column prop="title" label="电影" width="180"></el-table-column>
        <el-table-column prop="directorsStr" label="导演" width="180"></el-table-column>
        <el-table-column prop="castsStr" label="地址"></el-table-column>
        <el-table-column prop="rating.average" label="评分"></el-table-column>
        <el-table-column prop="images.large" label="海报">
          <template slot-scope="scope">
            <img :src="url+scope.row.images.large" alt width="150" height="210">
          </template>
        </el-table-column>
        <el-table-column prop="images.large" label="海报">
          <template slot-scope="scope">
            <el-button type="primary" @click="open(scope.row.id)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table> 
      <el-pagination background layout="prev, pager, next" :total="100" @current-change="catPage"></el-pagination>
      <el-dialog title="电影详情" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <img :src="url+myImg" alt>
        <h2>{{mydetail.title}}</h2>
        <p>导演:{{mydetail.directorsStr}}</p>
        <p>演员:{{mydetail.castsStr}}</p>
        <p>类型:{{mydetail.genres}}</p>
        <p>年份:{{mydetail.year}}</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import MovieApi from "@/api/movie";
export default {
  name: "Movie",

  data() {
    return {
      dialogVisible: false,
      moviedetail: [],
      mydetail: {},
      myImg: "",
      url: "https://images.weserv.nl/?url=",
      fenye:{
        count:0,
        pageCount:0,
        start:0
      }
    };
  },
  created() {
    this.getMovieList(1);
  },
  computed: {
    
    movieListCom() {
      var rs = this.moviedetail.map(item => {
        item.directorsStr = item.directors.reduce((a, b) => {
          var str = a + "," + b.name;
          return str;
        }, "");
        item.directorsStr = item.directorsStr.substr(1);

        item.castsStr = item.casts.reduce((a, b) => {
          var str = a + "," + b.name;
          return str;
        }, "");
        item.castsStr = item.castsStr.substr(1);
        return item;
      });
      return rs;
    }
  },
  methods: {
    catPage(val){
      console.log(val)
      this.getMovieList(val)
    },
    getMovieList(val) {
      MovieApi.getmovieList(val).then(res => {
        this.moviedetail = res.data.data;
        this.fenye.count=res.data.count
        this.fenye.pageCount=res.data.pageCount
        this.fenye.start=res.data.start
        console.log("asdas",res.data)
        console.log(this.moviedetail);
      });
    },
    open(id) {
      this.mydetail = this.movieListCom.find(item => item.id == id);
      this.myImg = this.movieListCom.find(item => item.id == id).images.large;
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style lang='scss' scoped>
.movie-main {
  .movie-card {
    margin: 30px;
    .moviedetail {
      text-align: center;
    }
  }
}
</style>
