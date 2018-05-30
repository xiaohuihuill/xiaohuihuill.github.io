<template>
    <div class="statement-statistics">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/statement_statistics" class="blue">报表统计</router-link>
                <span>></span>
                <span>广告趋势</span>
            </span>
        </div>
        <div class="bottom">
            <div class="advertising">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%;line-height:30px;">
                            <div class="clearfix fl" style="width:100%">
                                <div class="fl" style="width: 77px;">广告名称：</div>
                                <div class="fl" style="width: 77px;margin-right:3%">广告1</div>
                                <div class="fl" style="width: 77px;">有效期：</div>
                                <div class="fl" style="width: 513px;">2017-12-01 00:00:00 到 2017-12-11 00:00:00</div>
                            </div>
                            <div class="clearfix fl" style="width:100%">
                                <div class="fl" style="width: 77px;">广告素材：</div>
                                <div class="fl" style="margin-right:3%;width:100px;height:100px;">tupian</div>
                            </div>
                        </div>
                        <div class="condition-content clearfix" style="width:100%;line-height:30px;">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">投放设备</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-select v-model="advertisingManageData.value2" placeholder="请选择投放设备" style="width:100%;">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">数据类型</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-checkbox v-model="advertisingManageData.checked">展现量</el-checkbox>
                                </div>
                            </div>
                        </div>
                        <div class="popularization-plan clearfix">
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
                <div>
                    <div class='chart-container' style="height:300px;">
                        <chart height='100%' width='100%'></chart>
                    </div>
                </div>
                <div style="margin-top:0px;">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="date" label="日期">
                        </el-table-column>
                        <el-table-column prop="name" label="广告数" sortable>
                        </el-table-column>
                        <el-table-column prop="address" label="展现量" sortable>
                        </el-table-column>
                        <el-table-column prop="type" label="状态">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Chart from '@/components/echarts/Tendency.vue'
export default {
    name: 'device-manager',
    components: {
        Chart
    },
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
                date: '2016-05-02 周一',
                name: '111',
                address: '21',
                type: '推广'
            }, {
                date: '2016-05-02 周二',
                name: '111',
                address: '212',
                type: '推广'
            }, {
                date: '2016-05-02 周三',
                name: '111',
                address: '2121',
                type: '推广'
            }, {
                date: '2016-05-02 周四',
                name: '111',
                address: '2121111',
                type: '推广'
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

