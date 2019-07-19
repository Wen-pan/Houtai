<template>
  <div class="upload-main">
    <el-dialog title="上传" :visible.sync="dialog" width="30%" :before-close="handleClose">
      <el-upload
        class="upload-demo"
        action="/admin/xy/upload/uploadImg"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
       
        list-type="picture"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "upload",

  data() {
    return {
      dialog: false,
      fileList: []
    };
  },

  methods: {
    opendialog() {
      this.dialog = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleClose(){

    }
  }
};
</script>

<style lang='scss' scoped>
</style>
