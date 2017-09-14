<template>
<!--advert路由页html-->
    <div class="view">
        <!--面包屑导航-->
        <div class="head">
            <a href="#">主页</a>&nbsp;&gt;&nbsp;
            <a href="#">广告审核</a>
        </div>
        <div class="biaoge">
            <div class="table-advert">
                <!--头部地带-->
                <div class="one">
                    <!--第一列-->
                    <div class="col1">
                        <div class="top">
                            <span>广告主名称 :&nbsp;</span><input type="text" class="form-control" placeholder="广告主名称">
                        </div>
                        <div class="bottom">
                            <span>广告类型 :&nbsp;</span>
                            <select class="form-control">
                                <option>请选择类型</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                    <!--第二列-->
                    <div class="col2">
                        <div class="top">
                            <span>广告标题 :&nbsp;</span><input type="text" class="form-control" placeholder="广告标题">
                        </div>
                        <div class="bottom">
                            <span>广告类型 :&nbsp;</span>
                            <select class="form-control">
                                <option>请选择规格</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>
                    <!--第三列-->
                    <div class="col3">
                        <div class="bottom">
                            <span>广告状态 :&nbsp;</span>
                            <select class="form-control">
                                <option>请选择状态</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                        <div class="top">
                            <span>投放时间 :&nbsp;</span><input type="text" class="form-control" placeholder="投放时间">
                        </div>
                    </div>
                    <div class="search">
                        <button type="submit" class="btn">
                            <i class="iF iF-search"></i>
                        </button>
                    </div>
                </div>
                <!--<input type="text" class="form-control" placeholder="Text input">-->
<!--广告id标题等-->
                <div class="thd">
                    <div class="line">
                        <div>
                            <span class="checkbox">
                                <input type="checkbox" name="impression" id="impression" value="1">
                                <i></i>
                            </span>ID
                        </div>
                        <div>广告标题</div>
                        <div>类型</div>
                        <div>规格名称</div>
                        <div>设备名称</div>
                        <div>广告主</div>
                        <div>投放时间</div>
                        <div>广告审核状态</div>
                        <div>设备审核状态</div>
                        <div>操作</div>
                    </div>
                </div>
                <!--审核按钮-->
                <div class="audit">
                    <button type="button" class="btn btn-default">
                        <i class="iF iF-pass vlm"></i>审核通过</button>
                    <button type="button" class="btn btn-default">
                        <i class="iF iF-notpass vlm"></i>审核不通过</button>
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
@import '../sass/advert.scss'
</style>


