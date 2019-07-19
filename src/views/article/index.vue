<template>
  <div class="article-main">
    <el-card class="article-card" :body-style="{ padding: '0px' }">
      <div slot="header">
        <h2>素材管理</h2>
        <el-button type="success" @click="addImg">添加</el-button>
      </div>
      <el-row>
        <el-col v-for="m in uploadList" :key="m.id" :span="6">
          <div class="imgbox">
            <img class="imgdetail" :src="myUrl+m.fileName" alt />

            <div class="imgoperation">
              <el-input
                class="imginput"
                @keyup.enter.native="KeyPress(m.id)"
                v-model="mytitle"
                v-show="inputshow==m.id"
                placeholder="请输入内容"
                v-focus="true"
                @blur="blurfun"
              ></el-input>
              <p v-show="titleshow">{{m.title}}</p>
              <div class="icon">
                <el-button type="primary" icon="el-icon-edit" circle @click="edit(m.id,m.title)"></el-button>
                <el-button type="success" icon="el-icon-picture-outline" circle @click="see(m.id)"></el-button>
                <el-button type="danger" icon="el-icon-delete" circle @click="del(m.id)"></el-button>
              </div>
            </div>
          </div>
          <div @click="showflag" v-show="id==m.id" class="Mask">
            <div @click.stop class="showImg">
              <img :src="myUrl+m.fileName" alt />
            </div>
          </div>
        </el-col>
      </el-row>
      <uploaddetail ref="detail"></uploaddetail>
    </el-card>
  </div>
</template>

<script>
import UploadApi from "@/api/article";
import uploaddetail from "./detail/detail";
export default {
  name: "index.vue",
  components: {
    uploaddetail
  },
  data() {
    return {
      id: "",
      titleshow: true,
      inputshow: 1,
      mytitle: "",
      myUrl: "http://59.110.138.169/media/",
      uploadList: []
    };
  },
  created() {
    this.getuploadList();
  },
  directives: {
    focus: function(el) {
      el.querySelector("input").focus();
    }
  },
  methods: {
    getuploadList() {
      UploadApi.getUploadList().then(res => {
        this.uploadList = res.data.list;
        console.log(this.uploadList);
      });
    },
    edit(id, title) {
      this.mytitle = title;
      this.inputshow = id;
      this.titleshow = false;
    },
    KeyPress(id) {
      console.log(123);
      UploadApi.postUpdateTitle({ title: this.mytitle, id: id }).then(res => {
        this.inputshow = 1;
        this.getuploadList();
      });
    },
    see(id) {
      this.id = id;
    },
    showflag() {
      this.id = "";
    },
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          UploadApi.delUpdateList({ id }).then(res => {
            this.getuploadList();
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
    addImg() {
      this.$refs.detail.opendialog();
    },

    blurfun() {
      this.inputshow = "1";
       this.titleshow = true;
    }
  }
};
</script>

<style lang='scss' scoped>
.article-main {
  ul {
    list-style: none;
  }
  .article-card {
    margin: 20px 30px;
    .imgbox {
      position: relative;
      margin-top: 20px;
      width: 300px;
      height: 280px;
      .imginput {
        z-index: 99999;
        width: 100%;
      }
      .imgdetail {
        width: 100%;
        height: 100%;
      }
      .imgoperation {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;

        .icon {
          width: 100%;
          height: 40px;
          background-color: #f4f5f9;
          display: flex;
          justify-content: space-around;
        }
        p{
          color: #f4f5f9;
        }
      }
    }
    .Mask {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999999;
      .showImg {
        width: 400px;
        height: 380px;
        margin: 200px auto;
        border: 2px solid black;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
