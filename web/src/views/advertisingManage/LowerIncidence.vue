<template>
    <div class="device-manage">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/adv_mag" class="blue">广告管理</router-link>
                <span>></span>
                <router-link to="/adv_mag/pop_plan_mag" class="blue">推广计划管理</router-link>
                <span>></span>
                <span>下发情况</span>
            </span>
        </div>
        <div class="bottom">
            <div class="device-manage-condition">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">设备名称</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="advertisingManageData.input1" placeholder="请填写设备名称" style="100%;"></el-input>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">设备编号</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="advertisingManageData.input2" placeholder="请填写设备编号" style="100%;"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="condition-search">
                            <a href="javascript:;" class="yxf-but">查询</a>
                            <a href="javascript:;" class="yxf-but" @click="cleanCondition">清空条件</a>
                        </div>
                    </div>

                    <div style="margin-top:20px;">

                        <div class="row3 clearfix" v-on:click.prevent>
                            <div :class="[{'isActive':index==Index},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type" :key="index">
                                <span>{{item.name}}(
                                    <span>{{item.num}}</span>&nbsp;)</span>
                            </div>
                        </div>
                        <div>
                            <el-table :data="tableData" style="width: 100%" border>
                                <el-table-column prop="date" label="序号" width="48" align="center">
                                </el-table-column>
                                <el-table-column prop="设备编号" label="设备编号">
                                </el-table-column>
                                <el-table-column prop="设备编号" label="设备名称">
                                </el-table-column>
                                <el-table-column prop="date" label="审核通过时间">
                                </el-table-column>
                                <el-table-column prop="设备编号" label="下载完成时间">
                                </el-table-column>
                                <el-table-column prop="date" label="历时">
                                </el-table-column>
                                <el-table-column prop="设备编号" label="状态">
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <a class="blue start fl" @click="resend(scope.row)">重新发送</a>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "device-manage",
    data() {
        return {
            Index: "0",
            advertisingManageData: {
                input1: "",
                input2: "",
                date1: "",
                date2: "",
                value: ''
            },
            type: [{
                type: "all-advertising",
                name: "全部设备",
                num: 100
            }, {
                type: "put-in",
                name: "成功",
                num: 20
            }, {
                type: "stay-play",
                name: "失败",
                num: 10
            }],
            tableData: [{
                date: '1',
                "设备编号": '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2',
                "设备编号": '上海市普陀区金沙江路 1517 弄'
            }]
        };
    },
    created() {
        console.log(this.advertisingManagerData);
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        resend(row){
            console.log(row);
        },
        cleanCondition() {
            this.advertisingManageData = {
                input: "",
                date1: "",
                date2: "",
                value: ''
            }
        },
        addadvertising() {
            console.log(this.$router);
            this.$router.push({ path: "/new_adv" });
        },
        makeActive(str, index) {
            // 发送请求
            this.Index = index;
            console.log(str);
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
</style>


