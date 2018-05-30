<!--素材管理-->
<template>
  <div class="material-manage">
    <div class="top clearfix">
      <span class="fl">您的位置&nbsp;:&nbsp;</span>
      <span class="crumbs fl">
        <router-link to="/home" class="blue">系统首页</router-link>
        <span>></span>
        <router-link to="/user_mag" class="blue">公司管理</router-link>
        <span>></span>
        <span>修改密码</span>
      </span>
    </div>
    <div class="bottom">
      <div class="password">
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="77px" class="demo-ruleForm">
          <!--<el-form-item label="填写旧密码" prop="laoPass">
              <el-input type="password" style="max-width:513px;" v-model="ruleForm2.laoPass" auto-complete="off" placeholder="请填写旧密码"></el-input>
            </el-form-item>-->
          <el-form-item label="填写新密码" prop="pass">
            <el-input type="password" style="max-width:513px;" v-model="ruleForm2.pass" auto-complete="off" placeholder="请填写新密码"></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkPass">
            <el-input type="password" style="max-width:513px;" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请填写新密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm2')">清空</el-button>
            <el-button style="margin-left:10px" type="primary" @click="submitForm('ruleForm2')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "material-manage",
  data() {
    // 旧密码
    var laoPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请填写旧密码"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback();
        } else {
          callback();
        }
      }, 0);
    };
    // 新密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请填写新密码"));
      } else {
        if (this.ruleForm2.checkPass !== "") {
          this.$refs.ruleForm2.validateField("checkPass");
        }
        callback();
      }
    };
    // 确认新密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次填写新密码"));
      } else if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      list: null,
      all: 40,
      ishide: true,
      active: "all",
      area: "",
      checked: true,
      Index: "0",
      value2: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      ruleForm2: {
        pass: "",
        checkPass: "",
        laoPass: ""
      },
      rules2: {
        laoPass: [{ validator: laoPass, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  created() {
    // 发送请求拿到页面表格数值赋值给list
  },
  mounted() {
    this.$esellApi.checkPermissions();
  },
  methods: {
    cdup() {
      this.$router.go(-1);
    },
    // 重置密码
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$esellApi.send("/company/proxy/resetPassword.shtml", {
            id: this.$route.query.id,
            "password": md5(this.ruleForm2.pass),
          }, res => {
            this.message("success", "修改成功")
            this.$router.push({ path: "/corporate_manage" })
          }, res => {
            this.message("error", res.message)
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 清空
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../sass/materialManage.scss";
</style>

