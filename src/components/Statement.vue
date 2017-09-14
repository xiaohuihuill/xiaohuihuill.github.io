<template>
    <!--statement路由页html-->
    <div class="view">
        <!--面包屑导航-->
        <div class="head">
            <a href="#">主页</a>&nbsp;&gt;&nbsp;
            <a href="#">广告位展示报表</a>
        </div>
        <div class="biaoge">
            <div class="table-statement">
                <!--账户收入-->
                <table class="table">
                    <div class="tips">
                        我的账户情况，今日收入：
                        <span>0.00</span> 元，账户余额：
                        <span>0.00</span> 元.
                    </div>
                </table>
                <div class="srcArea">
                    <!--数据类型-->
                    <div class="shuju">
                        <div class="one">
                            <span>数据类型：</span>
                            <div class="right">
                                <div>
                                    <span class="checkbox">
                                        <input type="checkbox" name="impression" id="impression" value="1" checked="checked">
                                        <i></i>
                                    </span>展现量
                                </div>
                                <div>
                                    <span class="checkbox">
                                        <input type="checkbox" name="impression" id="impression" value="1" checked="checked">
                                        <i></i>
                                    </span>收入
                                </div>
                                <div>
                                    <span class="checkbox">
                                        <input type="checkbox" name="impression" id="impression" value="1" checked="checked">
                                        <i></i>
                                    </span>平均展现收入
                                </div>
                            </div>
                        </div>
                        <div class="two">
                            <span>数据时段：</span>

                            <div>
                                <span class="radio">
                                    <input name="time" type="radio" value="0" checked="checked">
                                    <i></i>
                                </span>
                                <b>今天</b>
                            </div>
                            <div>
                                <span class="radio">
                                    <input name="time" type="radio" value="0">
                                    <i></i>
                                </span>
                                <b>昨天</b>
                            </div>
                            <div>
                                <span class="radio">
                                    <input name="time" type="radio" value="0">
                                    <i></i>
                                </span>
                                <b>过去7天</b>
                            </div>
                            <div>
                                <span class="radio">
                                    <input name="time" type="radio" value="0">
                                    <i></i>
                                </span>
                                <b>过去30天</b>
                            </div>
                            <div>
                                <span class="radio">
                                    <input name="time" type="radio" value="0">
                                    <i></i>
                                </span>
                                <b>自定义时间段</b>
                            </div>
                            <div class="time">
                                <input type="text" name="start_time" value="" id="start_time" placeholder="开始时间" readonly="readonly">&nbsp;到&nbsp;<input type="text" name="start_time" value="" id="start_time" placeholder="结束时间" readonly="readonly">
                            </div>
                        </div>
                    </div>
                    <!--查询按钮-->
                    <div class="center">
                        <button class="btn btn-default" type="button">
                            <i class="iF iF-search vlm"></i>查询</button>
                    </div>
                    <!--下载按钮-->
                    <div class="download">
                        <button class="btn btn-default" type="button">
                            <i class="iF">&#xe612;</i>下载</button>
                    </div>
                    <!--最下面-->
                    <div class="fenyeCon">
                        <table width="100%" border="0" cellpadding="0" cellspacing="0" class="table">
                            <thead>
                                <tr>
                                    <th>广告位</th>
                                    <th>收入&nbsp;
                                        <i class="iF">&#xe611;</i>
                                        <i class="iF">&#xe623;</i>
                                    </th>
                                    <th>展现量&nbsp;
                                         <i class="iF">&#xe611;</i>
                                        <i class="iF">&#xe623;</i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
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
@import '../sass/statement.scss';
</style>

