<template>
    <div class="poster-manage">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/poster_mag" class="blue">海报管理</router-link>
                <span>></span>
                <span>制作海报</span>
            </span>
        </div>
        <div class="bottom">
            <div>
                <el-steps :space="100" :active="active" finish-status="success">
                    <el-step title="替换图片">1</el-step>
                    <el-step title="编辑文字">2</el-step>
                </el-steps>
            </div>
            <div class="showPoster" style="margin:20px 0;">
                <div class="clearfix">
                    <div class="fl" style="width:600px;height:400px;">
                        <img style="width:100%;height:100%;" src="./../../assets/images/poster_manage/poster_manage.jpg" alt="">
                    </div>
                    <div class="fl" v-show="isOneStep" style="margin-left:20px;">
                        <a href="javascript:;" class="yxf-but">更换图片</a>
                    </div>
                    <div class="fl" v-show="!isOneStep" style="margin-left:20px;">
                        <div>
                            <a href="javascript:;" class="yxf-but display">编辑文字</a>
                        </div>
                        <div style="margin-top:20px;">
                            <a href="javascript:;" class="yxf-but display">设置标题</a>
                        </div>
                    </div>
                </div>

            </div>
            <div v-show="isOneStep">
                <a href="javascript:;" class="yxf-but" @click="culp" style="margin-right:6px;">返回</a>
                <a href="javascript:;" class="yxf-but" @click="next">下一步</a>
            </div>
            <div v-show="!isOneStep">
                <a href="javascript:;" class="yxf-but" @click="last" style="margin-right:6px;">上一步</a>
                <a href="javascript:;" class="yxf-but" @click="accomplish">完成</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "poster-manage",
    data() {
        return {
            isOneStep: true,//是第一步
            active: 1,
        }
    },
    created() {
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        culp() {
            this.$router.go(-1);
        },
        last() {
            this.active = 1;
            this.isOneStep = true;
        },
        next() {
            if (this.active++ > 2) this.active = 2;
            this.isOneStep = false;
        }
    },
    watch: {

    },
    destroyed() {
    },
    updated() {

    },
    computed: {

    }
};
</script>
<style lang="scss" scoped>
@import "../../sass/posterManage.scss";
</style>


