<template>
    <!--facility路由页html-->
    <div class="view">
        <!--面包屑导航-->
        <div class="head">
            <a href="#">主页</a>&nbsp;&gt;&nbsp;
            <a href="#">设备管理</a>
        </div>
        <!--主要内容部分-->
        <div class="biaoge">
            <div class="table-facility">
                <div class="one">
                    <!--第一列-->
                    <div class="col1">
                        <div class="bottom">
                            <span>所在地区 :&nbsp;</span>
                            <select class="form-control">
                                <option>请选择省</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            <select class="form-control">
                                <option>请选择市</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            <select class="form-control">
                                <option>请选择区</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div class="top">
                            <span>设备编号 :&nbsp;</span><input type="text" class="form-control" placeholder="全部设备">
                        </div>
                    </div>
                    <!--第二列-->
                    <div class="col2">
                        <div class="bottom">
                            <span>在线状态 :&nbsp;</span>
                            <select class="form-control">
                                <option>请选择状态</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div class="top">
                            <span>设备名称 :&nbsp;</span><input type="text" class="form-control" placeholder="设备名称">
                        </div>
                    </div>
                    <!--搜索框-->
                    <div class="search">
                        <button type="submit" class="btn">
                            <i class="iF iF-search"></i>
                        </button>
                    </div>
                </div>
                <!--表头开始-->
                <div class="thd">
                    <div class="line">
                        <div>设备编号</div>
                        <div>设备名称</div>
                        <div>设备类型</div>
                        <div>在线状态</div>
                        <div>设备状态</div>
                        <div>地址</div>
                        <div>操作</div>
                    </div>
                </div>
                <!--审核按钮-->
                <div class="audit">
                    <button type="button" class="btn btn-default">
                        <i class="iF iF-pass vlm"></i>新增设备</button>
                    <button type="button" class="btn btn-default">
                        <i class="iF iF-notpass vlm"></i>批量新增设备</button>
                        <button type="button" class="btn btn-default">
                        同步播放</button>
                        <button type="button" class="btn btn-default">
                       工单管理</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {

    }
}
</script>
<style lang="scss">
@import '../sass/facility.scss';
</style>


