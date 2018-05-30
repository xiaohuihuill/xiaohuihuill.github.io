<template>
    <div class="device-manage">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span>操作日志</span>
            </span>
        </div>
        <div class="bottom">
            <div class="device-manage-condition">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">日志内容</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="operationLogData.context" placeholder="请填写日志内容" style="100%;"></el-input>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">操作时间</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-date-picker v-model="operationLogData['start-time']" type="datetime" placeholder="请选择开始时间" style="width:100%;">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%">
                                <div class="popularization-plan-info fl" style="width: 77px;">到</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-date-picker v-model="operationLogData['end-time']" type="datetime" placeholder="请选择结束时间" style="width:100%;">
                                    </el-date-picker>
                                </div>
                            </div>
                        </div>
                        <div class="condition-search">
                            <a href="javascript:;" class="yxf-but" @click="operationLogSearch">查询</a>
                            <a href="javascript:;" class="yxf-but" @click="cleanCondition">清空条件</a>
                        </div>
                    </div>
                    <div style="margin-top:20px;" v-loading="loading">
                        <el-table :data="tableData" style="width: 100%" border>
                            <el-table-column prop="create-time" label="操作时间" width="400">
                            </el-table-column>
                            <el-table-column prop="context" label="操作内容">
                            </el-table-column>
                            <el-table-column prop="account-name" label="操作对象">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="paging" v-if="ishide" style="text-align: center;margin-top:20px;">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="operationLogData.size" :page-sizes='[10,20]' layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { formatDate } from '@/utils/date.js';
export default {
    name: "device-manage",
    data() {
        return {
            ishide: true,
            loading: false,
            operationLogData: {
                page: 1,
                size: 10,
                "start-time": "",
                "end-time": "",
                context: "",
            },
            tableData: [{
                date: '2016-05-02 11:11:11',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02 11:11:11',
                address: '上海市普陀区金沙江路 1517 弄'
            }],
            total: "",
        };
    },
    created() {
        this.getOperationLogListData();
        this.$esellApi.checkPermissions();
    },
    methods: {
        getOperationLogListData() {
            this.loading = true;
            this.operationLogData['start-time'] = formatDate(this.operationLogData['start-time']);
            this.operationLogData['end-time'] = formatDate(this.operationLogData['end-time']);

            this.$esellApi.send("/log/list.shtml", this.operationLogData, res => {
                this.tableData = res.payload.data;
                this.total = res.payload.total;
                this.loading = false;
            }, res => {
                this.message("error", res.message);
            })
        },
        cleanCondition() {
            this.operationLogData = {
                page: 1,
                size: 10,
                "start-time": "",
                "end-time": "",
                context: "",
            }
        },
        operationLogSearch() {
            this.getOperationLogListData();
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.operationLogData.size = val;
            this.getOperationLogListData();
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.operationLogData.page = val;
            this.getOperationLogListData();
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
@import "../../sass/deviceManage.scss";
div.active {
    transition: all .6s;
    color: $white !important;
    background-color: $impColor !important;
}

div.isActive {
    color: $impColor !important;
    background-color: $white !important;
    border: 1px solid $sublineColor;
    border-top: none; // border-top: 2px solid $impColor;
    border-bottom: none; // line-height: 38px!important;
    box-sizing: border-box;
    position: relative;
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

.row3 {
    .all-advertising {
        border-left-color: transparent!important;
    }
}
</style>


