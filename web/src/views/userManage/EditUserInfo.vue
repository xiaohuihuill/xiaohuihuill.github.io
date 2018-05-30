<!--素材管理-->
<template>
  <div class="material-manage">
    <div class="top clearfix">
      <span class="fl">您的位置&nbsp;:&nbsp;</span>
      <span class="crumbs fl">
        <router-link to="/home" class="blue">系统首页</router-link>
        <span>></span>
        <router-link to="/user_mag" class="blue">用户管理</router-link>
        <span>></span>
        <span>编辑用户信息</span>
      </span>
    </div>
    <div class="bottom">
      <div class="row1">
        <!--<div class="material-name clearfix">
                <span class="material-name-left fl">用户账号</span>
                <span class="material-name-right fl">
                  <el-input style="min-width:513px;" v-model="editUserInfoData.name" placeholder="请填写用户账号"></el-input>
                </span>
              </div>-->
        <div class="material-name clearfix " style="margin-top:20px;">
          <span class="material-name-left fl">真实姓名</span>
          <span class="material-name-right fl">
            <el-input style="min-width:513px;" v-model="editUserInfoData.name" placeholder="请填写真实姓名"></el-input>
          </span>
        </div>
        <div class="material-name clearfix" style="margin-top:20px;">
          <span class="material-name-left fl">选择角色</span>
          <span class="material-name-right fl">
            <el-select v-model="editUserInfoData['role-id']" placeholder="请选择角色" style="min-width:513px;">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
        </div>
        <div class="material-name clearfix" style="margin-top:20px;margin-bottom:40px;">
          <span class="material-name-left fl">用户描述</span>
          <span class="material-name-right fl">
            <el-input type="textarea" v-model="editUserInfoData.comment" style="min-width:513px;"></el-input>
          </span>
        </div>
        <div class="material-search">
          <a href="javascript:;" class="yxf-but" @click="cdup">返 回</a>
          <a href="javascript:;" class="yxf-but" @click="save">保 存</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "material-manage",
  data() {
    return {
      editUserInfoData: {
        id: this.$route.query.id,
        name: this.$route.query.name,//真实姓名
        'role-id': '',
        comment: ''
      },
      list: null,
      all: 40,
      ishide: true,
      active: "all",
      area: "",
      checked: true,
      Index: "0",
      value2: "",
      options: [],
    };
  },
  created() {
    // 发送请求拿到页面表格数值赋值给list
    this.getEditUserRole();
    this.getEditUserInfo();
  },
  mounted() {
    this.$esellApi.checkPermissions();
  },
  methods: {
    getEditUserRole() {
      this.$esellApi.send(
        "/role/options.shtml",
        {},
        res => {
          console.log(res);
          this.options = res.payload;
        },
        res => {
          this.message("error", res.payload);
        }
      );
    },
    getEditUserInfo() {
      this.$esellApi.send("/user/show.shtml",
        { "account-id": this.$route.query.id },
        res => {
          this.editUserInfoData['role-id'] = ""+res.payload.roleId;
          this.editUserInfoData['name'] = res.payload.name;
          this.editUserInfoData['comment'] = res.payload.comment;
          console.log(this.editUserInfoData['role-id']);
        },
        res => {
          this.message("error", res.payload);
        }
      );
    },
    cdup() {
      this.$router.go(-1);
    },
    save() {
      if (this.editUserInfoData['role-id'] == "") {
        this.message("error", "请先选择角色");
        return;
      }
      this.$esellApi.send("/user/update.shtml", this.editUserInfoData, res => {
        console.log("正确的", res);
        this.$router.push({ path: "/user_mag" });
        this.message("success", "编辑成功");
      }, res => {
        this.message("eroor", res.message)
      })
    }
  },
  watch: {
    area: function(newVal, oldVal) {
      console.log(newVal);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../sass/materialManage.scss";
</style>

