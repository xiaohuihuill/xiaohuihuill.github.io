<template>
    <div class="poparization-plan-manage play_list">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/dev_mag" class="blue">设备管理</router-link>
                <span>></span>
                <span>播放列表</span>
            </span> 
        </div>
        <advList :type="1"></advList>   
    </div>
</template>
<script>
import advList from "../addAdv/advList";
export default {
    name: "examine-play-list",
    components: {
        advList,
    },
    mounted() {
        console.log(111111)
        this.$esellApi.checkPermissions();
    },
    data() {
        return {
           
        };
    },
};
</script>
<style lang="scss" scoped>
</style>


