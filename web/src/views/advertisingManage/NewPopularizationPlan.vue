<!--新建推广计划-->
<template>
    <div class="new-popularization-plan">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span>新建推广计划</span>
            </span>
        </div>
        <div class="bottom">
            <div class="row1 clearfix">
                <div class="new-popularization-plan-name clearfix fl">
                    <span class="new-popularization-plan-name-left fl">推广计划名称</span>
                    <span class="new-popularization-plan-name-right fl">
                        <el-input style="min-width:513px;" v-model="planName" placeholder="请填写推广计划名称"></el-input>
                    </span>
                </div>
                <div class="new-popularization-plan-search fl">
                    <a href="javascript:;" class="yxf-but" @click="cdup">返回</a>
                    <a href="javascript:;" class="yxf-but" @click="save">提交</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'new-popularization-plan',
    data() {
        return {
            planName:'',//推广计划名称
        }
    },
    created() {
        // 发送请求拿到页面表格数值赋值给list
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        cdup() {
            this.$router.go(-1);
        },
        save() {
            this.$esellApi.send(
                    "/campaign/add.shtml",
                    {
                        'name':this.planName
                    },
                    res => {
                        this.message("success", "操作成功", () => { })
                         this.$router.push({ path: "/adv_mag" });
                    },
                    res => {
                       this.message("error", res.message)
                    }
                );
            // // 先发送请求，保存更改后的name在进行路由跳转
            // this.$router.push({ path: "/adv_mag" });
        },
    },
    
    watch: {
      
    }
}
</script>
<style lang="scss" scoped>
.new-popularization-plan {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .top {
        line-height: 56px;
        margin-left: 20px;
        .crumbs {
            font-size: 12px;
        }
    }
    .bottom {
        background-color: #fff;
        padding: 20px;
        .row1 {
            padding: 20px;
            background: #f5f5f5;
            .new-popularization-plan-name {
                height: 30px;
                line-height: 30px;
                &-left {}
                &-right {
                    margin-left: 20px;
                }
            }
            .new-popularization-plan-search {
                margin-left: 75px;
                a {
                    margin-right: 6px;
                }
            }
        }
    }
}
</style>

