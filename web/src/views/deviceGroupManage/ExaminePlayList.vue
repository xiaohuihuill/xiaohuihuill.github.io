<template>
    <div class="poparization-plan-manage play_list">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/devgroup_mag" class="blue">设备组管理</router-link>
                <span>></span>
                <span>播放列表</span>
            </span> 
        </div>
      <advList :type="2"></advList>   
    </div>
</template>
<script>
import advList from "../addAdv/advList";
export default {
    name: "examine-play-list",
    components: {
        advList,
    },
    data() {
        return {
           
        };
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
};
</script>
<style lang="scss" scoped>
</style>


