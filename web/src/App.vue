<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "app",
  created() {
  },
  watch: {
    $route(to, from) {
      const token = localStorage.getItem("token");
      if (from.path != '/' && !token) {
        this.$router.push({ path: "/" })
      }
    }
  },
};
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>