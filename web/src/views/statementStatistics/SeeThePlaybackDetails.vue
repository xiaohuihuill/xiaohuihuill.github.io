<!--广告展现量的播放详情-->
<template>
    <div class="statement-statistics">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/statement_statistics" class="blue">报表统计</router-link>
                <span>></span>
                <router-link to="/statement_statistics/adv_impressions" class="blue">广告趋势</router-link>
                <span>></span>
                <span>播放详情</span>
            </span>
        </div>
        <div class="bottom">
            <div class="advertising">
                <div class="condition">
                    <div class="condition-info">
                        <!--广告名称、广告素材-->
                        <div class="condition-content clearfix" style="width:100%;line-height:30px;">
                            <div class="clearfix fl" style="width:100%">
                                <div class="fl" style="width: 77px;">设备编号：</div>
                                <div class="fl" style="width: 77px;margin-right:3%">212132212121</div>
                                <div class="fl" style="width: 77px;">设备名称：</div>
                                <div class="fl" style="width: 77px;margin-right:3%">设备1</div>
                                <div class="fl" style="width: 77px;">所属设备组：</div>
                                <div class="fl" style="width: 77px;margin-right:3%">设备组1</div>
                                <div class="fl" style="width: 77px;">设备地址：</div>
                                <div class="fl" style="">北京市西城区CCCXXXX</div>
                            </div>
                        </div>
                        <!--数据时段-->
                        <div class="popularization-plan clearfix" style="margin-top:4px;line-height:30px;height:30px;">
                            <div class="popularization-plan-info fl" style="width:77px;">数据时段</div>
                            <div class="popularization-plan-input fl" style="width:90%">
                                <span>
                                    <el-radio class="radio" v-model="advertisingManageData.radio" label="1">今天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="advertisingManageData.radio" label="2">昨天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="advertisingManageData.radio" label="3">过去7天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="advertisingManageData.radio" label="4">过去30天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="advertisingManageData.radio" label="5" style="margin-right:20px;">自定义时间段</el-radio>
                                    <el-date-picker v-model="advertisingManageData.date1" type="datetime" placeholder="请选择开始时间" format="yyyy-MM-dd HH:mm">
                                    </el-date-picker>
                                    <el-date-picker v-model="advertisingManageData.date2" type="datetime" placeholder="请选择结束时间" format="yyyy-MM-dd">
                                    </el-date-picker>
                                </span>
                            </div>
                        </div>
                        <div class="condition-search" style="margin-top:14px">
                            <a href="javascript:;" class="yxf-but">查询</a>
                            <a href="javascript:;" class="yxf-but" @click="cleanCondition">清空条件</a>
                        </div>
                    </div>
                </div>
                <div style="margin-top:20px;" class="clearfix">
                    <a href="javascript:;" class="yxf-but fr">下载报表</a>
                </div>
                <div style="margin-top:20px;">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="number" label="播放时间">
                        </el-table-column>
                        <el-table-column prop="name" label="播放截图">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'device-manager',
    data() {
        return {
            advertisingManageData: {
                checked: true,
                input1: "",
                date1: '',
                date2: "",
                value2: "",
                value3: "",
                radio: "1",
            },
            tableData: [{
                "number": '12223523663',
                "name": '设备1',
            }, {
                "number": '12223523663',
                "name": '设备2',
            }, {
                "number": '12223523663',
                "name": '设备3',
            }, {
                "number": '12223523663',
                "name": '设备4',
            }]
        }
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
    },
    watch: {
    }
}
</script>
<style lang="scss" scoped>
@import "../../sass/statementStatistics.scss";
</style>

