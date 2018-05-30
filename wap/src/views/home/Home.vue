<template>
    <div class="home">
        <!--main-->
        <router-view></router-view>
        <!--footer-->
        <mt-tabbar v-model="selected" fixed>
            <router-link to="/device" class="shebei">
                <mt-tab-item id="shebei">
                    <i class="iF">&#xe60c;</i>
                    <div>设备</div>
                </mt-tab-item>
            </router-link>
            <router-link to="/advertising" class="guanggao">
                <mt-tab-item id="guanggao">
                    <i class="iF">&#xe62b;</i>
                    <div>广告</div>
                </mt-tab-item>
            </router-link>
            <router-link to="/audit" class="shenhe">
                <mt-tab-item id="shenhe">
                    <i class="iF">&#xe607;</i>
                    <div>审核</div>
                </mt-tab-item>
            </router-link>
            <router-link to="/user" class="wode">
                <mt-tab-item id="wode">
                    <i class="iF">&#xe61c;</i>
                    <div>我的</div>
                </mt-tab-item>
            </router-link>
        </mt-tabbar>
    </div>
</template>
<script>
export default {
    name: "home",
    data() {
        return {
            selected: 'shebei',
        }
    },
}
</script>
<style lang='scss' scoped>
@import '../../sass/home.scss';
</style>