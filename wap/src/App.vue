<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { getQueryParam, isWeChat } from "@/common/base"
export default {
  name: 'App',
  data() {
    return {
      is: true,
    }
  },
  created() {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   this.$router.push({ path: "/login" })
    // }
    if (isWeChat()) {
        //本地没有token，则走鉴权
        let currentHost = location.href;
        //如果是首次请求登录页面，则鉴权:   /#/login   /#/
        if (/(#\/login$|\/#\/$|yixinfa\.cn\/$|yixinfa\.cn$)/.test(currentHost)) {
          // alert('token:' + localStorage.getItem('token'))
           if(localStorage.getItem('token')){
             //本地有token直接跳设备页面
           this.$router.push({ path: "/device" })
          }
          window.location.href = (this.$esellApi.getHost() + this.$esellApi.getAuthPage());
          return;
        }
          // alert('token2:' + localStorage.getItem('token'))
        let token = getQueryParam('s_token');
        token && localStorage.setItem('token', token);
    }
  },
  mounted() {
    // this.windowLocation();
  },
  methods: {
    windowLocation() {
      // if (this.is) {
      //   window.location.reload();
      //   this.is = false;
      // }
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.name) {
        var selected = sessionStorage.getItem("select")
      }
    }
  }
}
</script>
<style>
#app {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
</style>
