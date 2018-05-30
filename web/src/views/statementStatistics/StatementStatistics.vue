<template>
    <div class="statement-statistics">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span>报表统计</span>
            </span>
        </div>
        <div class="bottom">
            <div class="tabs clearfix">
                <div class="tabs-advertising">
                    <div class="fl poster-library" :class="{'active':bg=='poplarization-plan'}" @click="posterSwitch('poplarization-plan','1')">推广计划</div>
                    <div class="fl mine-poster" :class="{'active':bg=='advertising'}" @click="posterSwitch('advertising','2')">广告</div>
                    <div class="fl mine-poster" :class="{'active':bg=='advertising-group'}" @click="posterSwitch('advertising-group','3')">广告组</div>
                </div>
            </div>
            <!--推广计划-->
            <div class="advertising" v-show="isShow==1" style="margin-top:20px;">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">数据类型</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-checkbox v-model="checked">展现量</el-checkbox>
                                </div>
                            </div>
                        </div>
                        <div class="popularization-plan clearfix">
                            <div class="popularization-plan-info fl" style="width:77px;">数据时段</div>
                            <div class="popularization-plan-input fl" style="width:90%">
                                <span>
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="1">今天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="2">昨天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="3">过去7天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="4">过去30天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="5" style="margin-right:20px;">自定义时间段</el-radio>
                                    <el-date-picker v-model="statementStatisticsData.date1" type="datetime" placeholder="请选择开始时间" format="yyyy-MM-dd HH:mm">
                                    </el-date-picker>
                                    <el-date-picker v-model="statementStatisticsData.date2" type="datetime" placeholder="请选择结束时间" format="yyyy-MM-dd">
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
                    <a href="javascript:;" class="yxf-but fr" @click="downloadStatement('tableExcel')">下载报表</a>
                </div>
                <div style="margin-top:0px;">
                    <div class="row3 clearfix" v-on:click.prevent>
                        <div :class="[{'isActive':index==Index},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type" :key="index">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                    <Table ></Table>
                </div>
            </div>
            <!--广告-->
            <div class="advertising" v-show="isShow==2" style="margin-top:20px;">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">数据类型</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-checkbox v-model="checked">展现量</el-checkbox>
                                </div>
                            </div>
                        </div>
                        <div class="popularization-plan clearfix">
                            <div class="popularization-plan-info fl" style="width:77px;">数据时段</div>
                            <div class="popularization-plan-input fl" style="width:90%">
                                <span>
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="1">今天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="2">昨天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="3">过去7天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="4">过去30天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="5" style="margin-right:20px;">自定义时间段</el-radio>
                                    <el-date-picker v-model="statementStatisticsData.date1" type="datetime" placeholder="请选择开始时间" format="yyyy-MM-dd HH:mm">
                                    </el-date-picker>
                                    <el-date-picker v-model="statementStatisticsData.date2" type="datetime" placeholder="请选择结束时间" format="yyyy-MM-dd">
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
                <div style="margin-top:0px;">
                    <div class="row3 clearfix" v-on:click.prevent>
                        <div :class="[{'isActive':index==Index},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type" :key="index">
                            <span>{{item.name}}(
                                <span>{{item.num}}</span>&nbsp;)</span>
                        </div>
                    </div>
                    <Table2></Table2>
                </div>
            </div>
            <!--广告组-->
            <div class="advertising" v-show="isShow==3" style="margin-top:20px;">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">数据类型</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-checkbox v-model="checked">展现量</el-checkbox>
                                </div>
                            </div>
                        </div>
                        <div class="popularization-plan clearfix">
                            <div class="popularization-plan-info fl" style="width:77px;">数据时段</div>
                            <div class="popularization-plan-input fl" style="width:90%">
                                <span>
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="1">今天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="2">昨天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="3">过去7天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="4">过去30天</el-radio>
                                </span>
                                <span style="margin-left:2%;">
                                    <el-radio class="radio" v-model="statementStatisticsData.radio" label="5" style="margin-right:20px;">自定义时间段</el-radio>
                                    <el-date-picker v-model="statementStatisticsData.date1" type="datetime" placeholder="请选择开始时间" format="yyyy-MM-dd HH:mm">
                                    </el-date-picker>
                                    <el-date-picker v-model="statementStatisticsData.date2" type="datetime" placeholder="请选择结束时间" format="yyyy-MM-dd">
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
                    <a href="javascript:;" class="yxf-but fr" >下载报表</a>
                </div>
                <div style="margin-top:0px;">
                    <div class="row3 clearfix" v-on:click.prevent>
                        <div :class="[{'isActive':index==Index},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type" :key="index">
                            <span>{{item.name}}(
                                <span>{{item.num}}</span>&nbsp;)</span>
                        </div>
                    </div>
                    <Table3></Table3>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {method5} from '@/utils/downloadStatement'
import Table from './table2/Table1.vue'
import Table2 from './table2/Table2.vue'
import Table3 from './table2/Table3.vue'
export default {
    name: "statement-statistics",
    components: {
        Table,
        Table2,
        Table3
    },
    data() {
        return {
            activeName: "landscape",
            ishide: "true",
            is: true,
            count: 8,
            bg: "poplarization-plan",
            isShow: 1,
            advertisingManageData: {
                input1: "",
                date1: "",
                date2: "",
                value1: "",
                value2: "",
                value3: "",
                radio: "1",
            },
            statementStatisticsData: {
                input1: "",
                date1: '',
                date2: "",
                value1: "",
                value2: "",
                value3: "",
                radio: "1",
            },
            isActive: true,
            Index: "0",
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            type: [{
                type: "all-advertising",
                name: "全部推广计划",
                num: 100
            }, {
                type: "put-in",
                name: "推广中",
                num: 20
            }, {
                type: "stay-play",
                name: "暂停中",
                num: 10
            }],
        };
    },
    created() {
        // console.log(this.advertisingManagerData);
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        cleanCondition() {
            this.statementStatisticsData = {
                input1: "",
                date1: "",
                date2: "",
                value1: "",
                value2: "",
                value3: "",
                radio: "1",
            }
        },
        makeActive(str, index) {
            // 发送请求
            this.Index = index;
            console.log(str);
        },
        posterSwitch(str, index) {
            this.isShow = index;
            this.bg = str;
            console.log(this.isShow);
        },
        // 下载报表
        downloadStatement(tableExcel){
            console.log(111);
            method5(tableExcel);
            console.log(11);
        },
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
@import "../../sass/statementStatistics.scss";
div.active {
    transition: all .6s;
    color: $white !important;
    background-color: $impColor !important;
}

div.isActive {
    color: $impColor !important;
    box-sizing: border-box;
    position: relative;
    transition: all 0s .1s;
    height: 34px!important;
    line-height: 34px!important;
}

div.isActive::before {
    content: "";
    height: 2px;
    width: 100%;
    background-color: $impColor;
    position: absolute;
    top: -1px;
    left: 0;
}

.material-hint {
    position: absolute;
    top: 10px;
    right: 0;
}
</style>


