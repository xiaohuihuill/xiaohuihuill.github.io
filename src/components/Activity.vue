<template>
<!--activity路由页html-->
    <div class="view">
        <!--面包屑导航-->
        <div class="head">
            <a href="#">主页</a>&nbsp;&gt;&nbsp;
            <a href="#">活动列表</a>
        </div>
        <div class="biaoge">
            <div class="table-activity">
                <!--两个按钮-->
                 <div class="one">
                        <button type="button" class="btn btn-default">
                        活动列表</button>
                        <button type="button" class="btn btn-default">
                       已报名活动</button>
                </div>
                <!--thd开始-->
                <div class="thd_activity">
                    <div class="line">
                        <div>活动ID</div>
                        <div>活动名称</div>
                        <div>活动时间</div>
                        <div>报名时间</div>
                        <div>活动状态</div>
                        <div>剩余报名数</div>
                        <div>创建者</div>
                        <div>操作</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        methods:{

        }
    }

</script>
<style lang="scss">
@import '../sass/activity.scss';
</style>



