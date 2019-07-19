<template>
  <div class="detail-main">
    <el-dialog :visible.sync="dialog" width="50%" :before-close="handleClose">
      <el-card class="detail-card">
        <div slot="header">
          <h2>宿舍信息</h2>
        </div>
        <el-form :model="form" ref="form" label-width="80px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="宿舍名称" prop="name">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="宿舍类型">
                <el-select v-model="form.type" clearable placeholder="请选择">
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
              <el-form-item label="详细地址">
                <el-input v-model="form.position"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="开班时间">
                <el-date-picker v-model="form.startTime" type="date" placeholder="开班时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结课时间">
                <el-date-picker v-model="form.endTime" type="date" placeholder="结课时间"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班级描述">
                <el-input v-model="form.bak"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="handledorm('form')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dormdetailApi from "@/api/dorm";
import { resetDate, handlePostObjArr } from "@/utils/index";
export default {
  name: "detail",
  data() {
    return {
      dialog: false,
      options: [
        {
          value: "0",
          label: "男"
        },
        {
          value: "1",
          label: "女"
        }
      ],
      form: {
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    opendialog(id) {
      if (id) {
        dormdetailApi.dormListdetail({ id }).then(res => {
          this.form = res.data;
        });
      }
      resetDate(this, "form");
      this.dialog = true;
    },
    handleClose() {},
    handledorm(id) {
      var api = "";
      if (this.form.id) {
        api = dormdetailApi.updatedorm;
      } else {
        api = dormdetailApi.savedorm;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          api({ xyDormInfo: this.form }).then(res => {
            console.log(res)
            if (res.code == true) {
              this.$message({ type: true, message: "保存成功!" });
            }
            this.dialog=false;
            this.$emit('getdormLists')
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
.detail-main {
  .detail-card {
  }
}
</style>
