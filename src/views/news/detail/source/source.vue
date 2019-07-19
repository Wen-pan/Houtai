<template>
  <div class="source-main">
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
      :modal="false"
      :modal-append-to-body="false"
      :lock-scroll="false"
    >
      <h2>素材库</h2>
      <el-row>
        <el-col :span="6" v-for="m in uploadList" :key="m.id">
          <div class="imgbox">
            <img :src="myUrl+m.fileName" alt @click="choice(m.id)" />
            <div class="showicon" v-show="flag==m.id" @click="choices(m.id)">
              <img src="@/imgs/yes.png" alt />
            </div>
          </div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addImg">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UploadApi from "@/api/article";
export default {
  name: "source.vue",

  data() {
    return {
      flag: '',
      dialogVisible: false,
      uploadList: [],
      myUrl: "http://59.110.138.169/media/",
      myimgurl:'',
      myimgid:'',
    };
  },
  created() {
    this.getuploadList();
  },
  methods: {
    opensource() {
      this.dialogVisible = true;
    },
    handleClose() {},
    getuploadList() {
      UploadApi.getUploadList().then(res => {
        this.uploadList = res.data.list;
        console.log(this.uploadList);
      });
    },
    choice(id) {
     this.flag=id
     this.myimgid=id
    },
    choices(id){
        this.flag=1
    },
    addImg(){
      this.myimgurl=this.uploadList.find(item=>item.id==this.myimgid).fileName
      this.$emit('myimgurl',this.myimgurl)
      this.dialogVisible=false
    }
  }
};
</script>

<style lang='scss' scoped>
.source-main {
  .imgbox {
    position: relative;
    width: 150px;
    height: 150px;
    margin-top: 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .showicon {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      background: rgba(0, 0, 0, 0.8);
      img {
        display: block;
        width: 20px;
        height: 20px;

        margin: 0 auto;
      }
    }
  }
}
</style>
