<template>
  <div class="detail-main">
    <el-dialog :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
      <el-card :body-style="{ padding: '0px' }">
        <div slot="header"></div>
        <el-form label-width="80px" :model="form" ref="form" :rules="rules">
          <el-form-item label="标题" prop="title">
            <el-input placeholder="请输入内容" v-model="form.title" clearable></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input placeholder="请输入内容" v-model="form.author" clearable></el-input>
          </el-form-item>
          <el-form-item label="封面图片">
            <el-button type="success" @click="addnews">从素材库添加</el-button>
            <img class="imgs" :src="form.cover" alt />
          </el-form-item>
          <div class="imges" v-show="fathImg!=''">
            <img class="imgs" @click="displayImg" :src="myUrl+fathImg" alt />
            <div class="show-img">
              <img @click="delImg" src="@/imgs/no.png" alt />
            </div>
          </div>
          <el-form-item label="内容描述">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="选择文本">
            <el-radio v-model="radio" label="1">MarkdownEditor</el-radio>
            <el-radio v-model="radio" label="2">Tinymce</el-radio>
          </el-form-item>
          <tinymce v-show="radio==2"></tinymce>
          <markdown v-show="radio==1"></markdown>
          <sources ref="source" @myimgurl="MyImgurl"></sources>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="handlenews('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import sources from "./source/source";
import tinymce from "@/components/Tinymce";
import markdown from "@/components/MarkdownEditor";
import detailNewsApi from "@/api/news";
import { resetDate, handlePostObjArr } from "@/utils/index";
export default {
  name: "detail",
  components: {
    tinymce,
    markdown,
    sources
  },
  data() {
    return {
      
      fathImg: "",
      radio: "1",
      textarea: "",
      dialogVisible: false,
      labelPosition: "right",
      myUrl: "http://59.110.138.169/media/",
      form: {
        title: "",
        desc: "",
        author: ""
      },
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.MyImgurl();
  },
  methods: {
    opendialog(id) {
      if (id) {
        detailNewsApi.getNewsdetail({ id }).then(res => {
          this.form = res.data;
        });
      }

      this.dialogVisible = true;
    },
    addnews() {
      this.$refs.source.opensource();
    },
    handleClose() {},
    MyImgurl(imgurl) {
      this.fathImg = imgurl;
    },
    handlenews(id) {
      console.log(123);
      var api = "";
      if (this.form.id) {
        api = detailNewsApi.UpdateNews;
      } else {
        api = detailNewsApi.SaveNews;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          api({ xyNews: this.form }).then(res => {
            this.$message({ type: true, message: "保存成功!" });
            this.dialogVisible = false;
            this.$emit("getNewsLists");
            resetDate(this, "form");
          });
        } else {
          return false;
        }
      });
    },
    cancel(done) {
      this.$confirm("尚未保存,确认关闭？")
        .then(_ => {
          done((this.dialogVisible = false));
        })
        .catch(_ => {});
      resetDate(this, "form");
    },
    displayImg() {

    },
    delImg(){
      this.fathImg='';
    }
  }
};
</script>

<style lang='scss' scoped>
.detail-main {
  .imges {
    position: relative;
    width: 100px;
    height: 100px;
    margin-left: 80px;

    .imgs {
      width: 100%;
      height: 100%;
    }
    &:hover .show-img{
      display: block;
    }
    .show-img {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      img {
        display: block;
        width: 20px;
        height: 20px;
        float: right;
      }
    }
  }
}
</style>
