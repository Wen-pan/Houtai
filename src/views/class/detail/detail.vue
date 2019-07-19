<template>
  <div class="detail-main">
    <el-dialog title="添加学员" :visible.sync="dialog" class="detaildialog" :before-close="handleClose">
      <el-card shadow="never">
        <div slot="header">
          <span>添加学员信息</span>
        </div>
        <el-form :model="form" ref="form" label-width="80px" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" :disabled="false"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-select v-model="form.sex" placeholder="请选择">
                  <el-option
                    v-for="item in sexv"
                    :key="item.value"
                    :label="item.sex"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="班级" prop="classId">
                <el-select v-model="form.classId" placeholder="请选择">
                  <el-option
                    v-for="item in classList"
                    :key="item.id"
                    :label="item.className"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="电话" prop="tel">
                <el-input v-model="form.tel"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证">
                <el-input v-model="form.manID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城市">
                <el-cascader
                  size="small"
                  :options="options"
                  v-model="selectedOptions"
                  @change="handleChange"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="宿舍">
                <el-select v-model="form.dormId" placeholder="请选择">
                  <el-option
                    v-for="item in dormList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="入住时间">
                <el-date-picker
                  v-model="form.dormStartTime"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="选择入住日期"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="离开时间">
                <el-date-picker v-model="form.dormEndTime" type="date" placeholder="选择离开日期"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-card shadow="never">
            <div slot="header">
              <span>补充信息</span>
            </div>
            <el-row>
              <el-col :span="8">
                <el-form-item label="紧急联系人">
                  <el-input v-model="form.tel2"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="微信">
                  <el-input v-model="form.wx"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="QQ">
                  <el-input v-model="form.qq"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="毕业院校">
                  <el-input v-model="form.school"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="工作">
                  <el-input v-model="form.job"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <el-card shadow="never">
            <div slot="header">
              <span>交费信息</span>
              <p class="addPay" @click="addpay">添加交费信息+</p>
            </div>
            <el-card v-show="paydetail==true">
              <el-row>
                <el-col :span="8" class="leixing">
                  <span>类型</span>
                  <el-radio v-model="constfrom.constType" label="0" value="学费">学费</el-radio>
                  <el-radio v-model="constfrom.constType" label="1" value="住宿费">住宿费</el-radio>
                </el-col>
                <el-col :span="8">
                  <span>金额</span>
                  <el-input-number
                    v-model="constfrom.constValue"
                    controls-position="right"
                    @change="handleChange"
                  ></el-input-number>
                </el-col>
                <el-col :span="8">
                  <span>交费时间</span>
                  <el-date-picker
                    v-model="constfrom.constTime"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择交费日期"
                  ></el-date-picker>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12" class="beizhu">
                  <span>备注</span>
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="constfrom.constBak"
                  ></el-input>
                </el-col>
              </el-row>
              <div class="button">
                <el-button @click="closepay">取消</el-button>
                <el-button @click="pushpay" type="primary">确定</el-button>
              </div>
            </el-card>
            <el-table :data="constListNew" border style="width: 100%" v-show="paydetails">
              <el-table-column type="index" label="#" width="80"></el-table-column>
              <el-table-column prop="constType" label="类型" width="180">
                <template slot-scope="scope">{{scope.row.constType=='0'?'学费':'住宿费'}}</template>
              </el-table-column>
              <el-table-column prop="constValue" label="金额" width="180"></el-table-column>
              <el-table-column prop="constTime" label="时间"></el-table-column>
              <el-table-column prop="constBak" label="备注"></el-table-column>
              <el-table-column label="操作">
                <template v-if="!scope.row.id" slot-scope="scope">
                  <el-button @click="delconstInfo(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </el-form>
      </el-card>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="haldendialog('form')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionDataPlus, CodeToText } from "element-china-area-data";
import { resetDate, handlePostObjArr } from "@/utils/index";
import studentApi from "@/api/student";
export default {
  name: "detail",
  props: {
    classList: Array,
    dormList: Array
  },
  data() {
    return {
      
      seecloseto: false,
      see: true,
      //交费信息备注
      textarea: "",
      num: "0",
      // 交费信息弹窗
      paydetail: false,
      // 本地交费信息
      paydetails: true,
      // 添加学员弹框
      dialog: false,
      // 学员信息
      form: {
        name: "",
        classId: "",
        dormId: "",
        dormStartTime: "",
        dormEndTime: "",
        city: ""
      },
      // 性别选择
      sexv: [
        {
          sex: "男",
          value: "0"
        },
        {
          sex: "女",
          value: "1"
        }
      ],
      constListNew: [], //新增const
      constList: [], //交费记录
      constfrom: {
        constType: "0", //0学费，1住宿费
        constTime: "", //交费时间
        constValue: 0, //交费金额
        constBak: "", //备注
        consttext: "删除"
      },
      value1: "",
      value: [],
      // 城市选择
      options: regionDataPlus,
      selectedOptions: [],
      // 表单验证
      rules: {
        name: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        tel: [
          { required: true, message: "请输入电话", trigger: "blur" },
          { min: 1, max: 13, trigger: "blur" }
        ]
      }
    };
  },

  methods: {
    cansdialog() {},
    //保存信息
    haldendialog(id) {
      var api = "";
      if (this.form.id) {
        api = studentApi.updateStndent;
      } else {
        api = studentApi.saveStndent;
      }
      //验证表单
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.city = this.selectedOptions.join(",");
          api({
            xyUser: this.form,
            ...handlePostObjArr("xyConstItems", this.constListNew)
          }).then(res => {
            if (res.code == "success") {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              resetDate(this, "form");
              this.dialog = false;
              this.$parent.getStudentList();
              
            }
          });
        } else {
          return false;
        }
      });
    },
    //如果有id的话就是编辑页面没有就是添加新的页面
    openDialog(id) {
      if (id) {
        studentApi.studentdetail({ id }).then(res => {
          this.form = res.data;
        });
      }else{
        resetDate(this,'constfrom')
      }
      this.dialog = true;
    },
    seedetail(id) {
     
        studentApi.studentdetail({ id }).then(res => {
          this.form = res.data;
        });
     
      this.disabled=true
      this.dialog = true;
    },
    seeclose() {
      this.seecloseto = true,
      this.dialog = false
      this.$emit('getStudentList')
    },
    handleChange(value) {
      this.cityStr = CodeToText[this.form.city[0]]+','+CodeToText[this.form.city[1]]+','+CodeToText[this.form.city[2]]
    },
    //交费信息弹窗
    addpay() {
      this.paydetails = false;
      this.paydetail = true;
    },
    //取消弹窗
    closepay() {
      this.paydetails = true;
      this.paydetail = false;
    },
    //关闭弹窗
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done((
            this.dialog = false));
           
        })
        .catch(_ => {});
      resetDate(this, "form");
    },
    // 交费信息保存
    pushpay() {
      this.paydetails = true;
      this.paydetail = false;
      //深度克隆
      var constInfo = JSON.parse(JSON.stringify(this.constfrom));
      constInfo.tempId = new Date().getTime();
      this.constListNew.push(constInfo); //需要提交的对象
      this.constList.push(constInfo); //需要展示的列表，包括以前提交的数据
      //还原表格
      resetDate(this, "constfrom");
    },
    //交费信息删除查找如果id不等于的就删
    delconstInfo(row) {
      this.constList = this.constList.filter(item => item.tempId != row.tempId);
      this.constListNew = this.constListNew.filter(
        item => item.tempId != row.tempId
      );
    }
  }
};
</script>

<style lang='scss' scoped>
.detail-main {
  .detaildialog {
    .addPay {
      display: block;
      float: right;
      color: orangered;
      cursor: pointer;
    }
  }
  .leixing {
    margin-top: 10px;
  }
  .button {
    text-align: right;
  }
  .beizhu {
    margin-top: 20px;
  }
}
</style>
