<!--编辑公司信息-->
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
        <div class="material-name clearfix " style="margin-top:20px;" v-if="i<1000">
          <span class="material-name-left fl">真实姓名</span>
          <span class="material-name-right fl">
            <el-input style="min-width:513px;" v-model="EditCorporateInfo.name" placeholder="请填写真实姓名"></el-input>
          </span>
        </div>
        <div class="material-name clearfix " style="margin-top:20px;">
          <span class="material-name-left fl">公司名称</span>
          <span class="material-name-right fl">
            <el-input style="min-width:513px;" v-model="EditCorporateInfo['corporate-name']" placeholder="请填写公司名称"></el-input>
          </span>
        </div>
        <div class="material-search" style="margin-top:20px;margin-left:70px;">
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
      i:10,
      EditCorporateInfo: {
        id: this.$route.query.id,
        name: this.$route.query.name,//真实姓名
        'corporate-name': this.$route.query.corporateName,
      },
      list: null,
      all: 40,
      ishide: true,
      active: "all",
      area: "",
      checked: true,
      Index: "0",
      value2: "",
      options: []
    };
  },
  created() {
    console.log(this.$route.query.id);
  },
  methods: {
    cdup() {
      this.$router.go(-1);
    },
    save() {
      if(!this.EditCorporateInfo.name){
        this.message("warning",'真实姓名不能为空');
        return;
      }
      this.$esellApi.send("/company/proxy/update.shtml", {
        id: this.$route.query.id,
        name: this.EditCorporateInfo.name,
        "company-name": this.EditCorporateInfo['corporate-name']
      }, res => {
        this.$router.push({ path: "/corporate_manage" })
        this.message("success", "编辑成功")
      }, res => {
        this.message("error", res.message)
      })
    }
  },
  watch: {
  }
};
</script>
<style lang="scss" scoped>
@import "../../sass/materialManage.scss";
</style>

