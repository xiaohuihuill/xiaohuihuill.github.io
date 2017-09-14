<template>
  <div id="app">
    <div id="head">
      <div class="top">
        <h1 class="logo">
          <a href="http://ssp.pingxiaobao.com/">
            <img src="http://ssp.pingxiaobao.com//images/logo.png">
          </a>
        </h1>
        <div class="tophi">
          <div class="logoarea">
            <span class="welcome">您好，
              <em class="white">itable</em>，欢迎您使用屏媒广告业务系统！</span>
          </div>
          <div class="topGt">
            <ul>
              <li>
                <a href="#">
                  <i class="iF iF-home big"></i>&nbsp;
                  <span>系统主页</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="iF iF-help"></i>&nbsp;
                  <span>帮助中心</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i class="iF iF-exit"></i>&nbsp;
                  <span>退出系统</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <nav>
        <ul>
          <li class="bg">
            <a href="#">
              <i class="iF iF-home"></i>
              <span>屏媒广告媒体系统</span>
            </a>
          </li>
          <li>
            <router-link to="./Advert">
              <a href="#">
                <i class="iF iF-audit"></i>
                <span>广告审核</span>
              </a>
            </router-link>
          </li>
          <li>
            <router-link to="./Facility">
              <a href="#">
                <i class="iF iF-device"></i>
                <span>设备管理</span>
              </a>
            </router-link>
          </li>
          <li>
            <router-link to="./Statement">
              <a href="#">
                <i class="iF iF-baobiao"></i>
                <span>报表</span>
              </a>
            </router-link>
          </li>
          <li>
            <router-link to="./Password">
            <a href="#">
              <i class="iF iF-password"></i>
              <span>修改密码</span>
            </a>
            </router-link>
          </li>
          <li>
            <router-link to="./Activity">
            <a href="#">
              <i class="iF iF-yingxiao"></i>
              <span>活动中心</span>
            </a>
             </router-link>
          </li>
        </ul>
      </nav>
      <div class="route">
        <router-view></router-view>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>


<style lang='scss'>
@import './sass/app.scss';
</style>
