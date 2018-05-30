<template>
  <div class="home">
    <!--top-->
    <div class="top">
      <!--logo-->
      <div class="logo clearfix">
        <div class="icon fl">
          <i v-if="this.$store.getters.isNewbp" class="iF iF-yun"></i>
          <!-- <i v-else class="iF iF-yun"></i> -->
          <i v-if="this.$store.getters.isNewbp" class="iF iF-yixinfa"></i>
          <img v-else src="https://yixinfa-prod.oss-cn-shenzhen.aliyuncs.com/webImg/login_logo_1.png" width="160" style="margin-left:10px;" />
          <!-- <i v-else class="iF iF-yixinfa"></i> -->
        </div>
        <div class="control fr">
          <i id="control" class="iF iF-open" v-model="isCollapse" @click="Collapse" :class="{isCollapse}"></i>
        </div>
      </div>
      <!--header-->
      <div class="header clearfix">
        <div class="hello fl">
          您好&nbsp;,&nbsp;
          <span>{{name}}</span>&nbsp;,&nbsp;欢迎您使用{{this.$store.getters.getText}}客户自助系统 !
        </div>
        <div class="instruct fr">
          <div class="clearfix ">
            <div class="system fl">
              <router-link to="/home">
                <a href="javascript:;">
                  <i class="iF iF-home"></i>
                  <span>系统首页</span>
                </a>
              </router-link>
            </div>
            <div class="exit fl" @click="open2()">
              <a href="javascript:;">
                <i class="iF iF-exit"></i>
                <span>退出系统</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--nav-->
    <div class="nav" :style="{width:isCollapse?'64px':'140px'}" style="overfllow-y:auto">
      <el-menu :default-active="$route.path.match(/^\/[a-zA-Z0-9\_]+/)[0]" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <el-menu-item v-for="(item,index) in menuList" :key="index" :index="'/' + item.routeIndex">
          <i :class="'iF ' + item.className"></i>
          <span slot="title">{{item.title}}</span>
        </el-menu-item>
      </el-menu>
    </div>
    <!--route-->
    <div class="main" :style="{paddingLeft:isCollapse?'64px':'140px'}">
      <!--<transition name="fade" mode="ease-out-in">-->
        <router-view class="route"></router-view>
      <!--</transition>-->
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { esell } from '@/assets/common/esellapi.js'
export default {
  name: "home",
  data() {
    return {
      flag: false,
      isActive: true,
      language: '',
      is: true,
      isCollapse: false,
      activeRouter: '',
      menuList: [],
      name: "",
    };
  },
  created() {
    const token = localStorage.getItem("token");
    if (this.$route.path == '/' && !token) {
      this.$router.push({ path: "/login" })
    } else if (this.$route.path == '/' && token) {
      this.$router.push({ path: "/home" })
    } else if (this.$route.path != '/' && !token) {
      this.$router.push({ path: "/login" })
    }
    this.getmenu();
  },
  mounted() {
    this.$esellApi.checkPermissions();
  },
  methods: {
    cn(bool) {
      this.isActive = bool;
      this.language = "cn";
      Cookies.set('language', "cn")
      this.$i18n.locale = this.language;
    },
    en(bool) {
      this.isActive = bool;
      this.language = "en";
      Cookies.set('language', "en")
      this.$i18n.locale = this.language;
    },
    getmenu() {
      const esellapi = new esell;
      esellapi.send("/account/menu.shtml", {
      }, (res) => {
        console.log(res);
        if (res.code = "0") {
          this.menuList = res.payload.menu;
          this.name = res.payload.name;
        } else {
          this.message('error', res.message);
          this.$router.push({ path: '/' });
        }
      }, (res) => {
        this.message('error', res.message);
      })
    },
    // navControl
    handleOpen(key, keyPath, index) {
      console.log(key, keyPath, index);
    },
    handleClose(key, keyPath, indexPath) {
      console.log(key, keyPath, indexPath);
    },
    // navControlFunction
    Collapse() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        $(".control").css({ transform: "rotate(90deg)" });
      } else {
        $(".control").css({ transform: "rotate(0deg)" });
      }
    },
    open2() {
      if (this.flag) {
        return;
      } else {
        this.flag = true;
        this.$confirm("此操作将退出登录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.flag = false;
          const esellapi = new esell;
          esellapi.send("/account/logout.shtml", {}, (res) => {
            this.flag = false;
            this.$message({ type: "success", message: "退出成功!" });
            localStorage.removeItem('token');
            localStorage.removeItem('ownedPermissions');
            this.$router.push({ path: "/" });
          }, (res) => {
            localStorage.removeItem('token');
            this.$router.push({ path: "/" });
          })
        }).catch(() => {
          this.flag = false;
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
      }
    }
  },
  watch: {
  }
};
</script>
<style lang="scss" scoped>
@import "../../sass/home.scss";
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 140px;
}

.aa {
  line-height: 30px!important;
  border: 1px solid #fff;
  background-color: rgba(255, 255, 255, .2);
  border-radius: 2px;
}
// .fade-enter-active, .fade-leave-active {
//   transition: opacity .2s
// }
// .fade-enter, .fade-leave-active {
//   opacity: 0
// }
// @keyframes fold-in {
//   0% {
//     transform: translate3d(0, 100%, 0);
//   }
//   50% {
//     transform: translate3d(0, 50%, 0);
//   }
//   100% {
//     transform: translate3d(0, 0, 0);
//   }
// }
// @keyframes fold-out {
//   0% {
//     transform: translate3d(0, 0, 0);
//   }
//   50% {
//     transform: translate3d(0, 50%, 0);
//   }
//   100% {
//     transform: translate3d(0, 100%, 0);
//   }
// }
</style>

