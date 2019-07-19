<template>
  <div class="detail-main">
    <el-dialog :visible.sync="dialog" width="60%" :before-close="handleClose">
      <el-card>
        <div slot="header">
          <h2>班级信息</h2>
        </div>
        <el-form :model="classform" ref="classform" label-width="80px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="班级名称" prop="className">
                <el-input v-model="classform.className"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班级类型">
                <el-select v-model="classform.type" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班级描述">
                <el-input v-model="classform.desc"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开班时间">
                <el-date-picker v-model="classform.startTime" type="date" placeholder="开班时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结课时间">
                <el-date-picker v-model="classform.endTime" type="date" placeholder="结课时间"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="handleclass('classform')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import classdetailApi from "@/api/class";
import { resetDate, handlePostObjArr } from "@/utils/index";
export default {
  name: "detail",

  data() {
    return {
      dialog: false,
      classform: {},
      options: [
        {
          value: 0,
          label: "前端"
        },
        {
          value: 1,
          label: "UI"
        }
      ],
      rules: {
        className: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      }
    };
  },

  methods: {
    opendialog(id) {
      if (id) {
        classdetailApi.classDetail({ id }).then(res => {
          this.classform = res.data;
        });
      }
      resetDate(this, "classform");
      this.dialog = true;
    },
    handleClose() {},
    handleclass(id) {
      var api = "";
      if (this.classform.id) {
        api = classdetailApi.updateclassDetail;
      } else {
        api = classdetailApi.saveclassDetail;
      }
      this.$refs.classform.validate(valid => {
        if (valid) {
          api({ xyClassInfo: this.classform }).then(res => {
            this.$message({ type: "success", message: "保存成功!" });
            this.dialog = false;
            this.$emit("getclassLists");
          });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>
