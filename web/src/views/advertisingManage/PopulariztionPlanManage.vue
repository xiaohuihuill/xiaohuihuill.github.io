<template>
    <div class="poparization-plan-manage">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/adv_mag" class="blue">广告管理</router-link>
                <span>></span>
                <span>推广计划管理</span>
            </span>
        </div>
        <div class="bottom">
            <div class="tabs clearfix">
                <div class="tabs-advertising">
                    <!-- <div class="fl advertising" :class="{'active':bg=='advertising'}" @click="advertisingSwitch('advertising')">广告</div> -->
                    <!--<div class="fl advertising-group" :class="{'active':bg=='advertising-group'}" @click="advertisingSwitch('advertising-group')">广告组</div>-->
                </div>
            </div>
            <div v-loading.body="loading=isLoading">
                <!--广告-->
                <div class="advertising" v-show="isShow" style="margin-top:20px;">
                    <div class="condition">
                        <div class="condition-info">
                            <div class="condition-content clearfix" style="width:100%">
                                <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                    <div class="popularization-plan-info fl" style="width: 77px;">推广计划</div>
                                    <div class="popularization-plan-input fl" style="width:71%">
                                        <el-select v-model="PopulariztionPlanManageAdvertisingData['campaign-id']" placeholder="请选择推广计划" style="width:100%;" @visible-change='campaignChangeValue' clearable>
                                            <el-option v-for="item in campaignList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                                <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                    <div class="popularization-plan-info fl" style="width: 77px;">广告名称</div>
                                    <div class="popularization-plan-input fl" style="width:71%">
                                        <el-input v-model="PopulariztionPlanManageAdvertisingData.name" placeholder="请填写广告名称" style="100%;"></el-input>
                                    </div>
                                </div>
                                <div class="popularization-plan clearfix fl" style="width:32.33%">
                                    <div class="popularization-plan-info fl" style="width: 77px;">投放设备组</div>
                                    <div class="popularization-plan-input fl" style="width:71%">
                                        <el-select v-model="PopulariztionPlanManageAdvertisingData['group-id']" placeholder="请选择投放设备组" style="width:100%" @visible-change='groupChangeValue' clearable>
                                            <el-option v-for="item in groupList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                </div>
                            </div>
                            <div class="condition-content clearfix" style="width:100%">
                                <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                    <div class="popularization-plan-info fl" style="width: 77px;">投放时间</div>
                                    <div class="popularization-plan-input fl" style="width:71%">
                                        <el-date-picker v-model="PopulariztionPlanManageAdvertisingData['start-time']" type="datetime" :editable="false" placeholder="请选择开始时间" style="width:100%;">
                                        </el-date-picker>
                                    </div>
                                </div>
                                <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                    <div class="popularization-plan-info fl" style="width: 77px;">到</div>
                                    <div class="popularization-plan-input fl" style="width:71%">
                                        <el-date-picker v-model="PopulariztionPlanManageAdvertisingData['end-time']" type="datetime" :editable="false" placeholder="请选择结束时间" style="width:100%;">
                                        </el-date-picker>
                                    </div>
                                </div>
                            </div>
                            <div class="condition-search">
                                <a href="javascript:;" class="yxf-but" @click="PopilarzitionPlanManageSearch">查询</a>
                                <a href="javascript:;" class="yxf-but" @click="cleanCondition">清空条件</a>
                            </div>
                        </div>
                        <div class="advertising-operation">
                            <a class="yxf-but advertising-operation-add" data-butflag="1522812102804" @click="addadvertising">新建广告</a>
                            <a class="yxf-but advertising-operation-start-using" data-butflag="1523871433145" @click="batchStartUsingXia">批量启用</a>
                            <a class="yxf-but advertising-operation-suspend" data-butflag="1523871386985" @click="batchPause">批量暂停</a>
                            <a class="yxf-but advertising-operation-delete" data-butflag="1523872095242" @click="batchRemove">批量删除</a>
                        </div>
                        <div>
                            <div class="row3 clearfix">
                                <div :class="[{'isActive':index==Index},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type" :key="index">
                                    <span>{{item.name}}</span>
                                </div>
                            </div>
                            <Table v-on:batchStartUsing="batchStartUsing" element-loading-text="拼命加载中" v-loading="loading" @delete1='delete1' :tableData='tableData' :total='total' @open='open' @pause='pause' @edit='edit' @lowerIncidence='lowerIncidence' :PopulariztionPlanManageAdvertisingData.size='size' @handleSizeChange='handleSizeChange' @handleCurrentChange='handleCurrentChange'></Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--时间提示框-->
        <el-dialog title="提示" :visible.sync="isTime" size="tiny">
            <span ref="spanInfo" class="spanInfo">{{spanInfo}}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isTime = false">取 消</el-button>
                <el-button type="primary" @click="isTime = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { formatDate } from '@/utils/date.js';
import Table from './table2/Table2.vue'
export default {
    name: "poparization-plan-manage",
    components: {
        Table
    },
    data() {
        return {
            groupList: '',
            campaignList: '',
            isTime: false,//时间提示框默认隐藏
            spanInfo: "",//时间提示信息
            isLoading: false,//广告与广告组切换
            loading: false,//广告的所有状态切换
            val: [],//存储子组件传过来是否有点击checkbox的数组
            PopulariztionPlanManageAdvertisingData: {
                page: 1,//页码
                size: 10,//页数
                "campaign-id": this.$route.query.id ? this.$route.query.id : '',//推广计划id
                "ad-status": "",//广告状态
                name: "",//广告名称
                "group-id": "",//投放设备组
                "device-id": "",//投放设备
                "start-time": "",//开始时间
                "end-time": "",//结束时间
            },//查询需要提交的广告数据值
            isShow: true,// true显示广告，flase显示广告组
            bg: "advertising",// 广告添加该bg类，advertising_group广告组添加该bg类
            active: 'all-advertising',//默认选中的广告的状态
            isActive: true,//默认选中的广告的状态添加该isActive类名
            Index: this.$route.query.number ? this.$route.query.number : "0",// 广告的状态通过index判断
            // 广告的状态
            type: [{
                type: "",
                name: "全部广告",
            }, {
                type: "4",
                name: "投放中",
            }, {
                type: "3",
                name: "待播放",
            }, {
                type: "1",
                name: "待审核",
            }, {
                type: "2",
                name: "审核不通过",
            }, {
                type: "5",
                name: "暂停中",
            }, {
                type: "6",
                name: "已过期",
            }],
            tableData: [],//Listdata
            total: [],//总条数
        };
    },
    created() {
        this.PopulariztionPlanManageAdvertisingData["ad-status"] = this.$route.query.status
        this.getPopularzitionPlanManageListData();
        this.campaignChangeValue();
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        campaignChangeValue(val) {
            this.$esellApi.send("/campaign/options.shtml", {}, res => {
                console.log(res.payload)
                this.campaignList = res.payload;
            }, res => {
                this.message("error", res.message)
            })
        },
        groupChangeValue(val) {
            if (val) {
                this.$esellApi.send("/group/options.shtml", {}, res => {
                    console.log(res.payload)
                    this.groupList = res.payload;
                }, res => {
                    this.message("error", res.message)
                })
            }
        },
        getPopularzitionPlanManageListData() {
            this.loading = true;
            
            this.$esellApi.send("/ad/list/campaign.shtml", {
                page: this.PopulariztionPlanManageAdvertisingData.page,//页码
                size: this.PopulariztionPlanManageAdvertisingData.size,//页数
                "campaign-id": this.PopulariztionPlanManageAdvertisingData['campaign-id'] ? this.PopulariztionPlanManageAdvertisingData['campaign-id'] : this.$route.query.id,//推广计划id
                "ad-status": this.PopulariztionPlanManageAdvertisingData['ad-status'],//广告状态
                name: this.PopulariztionPlanManageAdvertisingData['name'],//广告名称
                "group-id": this.PopulariztionPlanManageAdvertisingData['group-id'],//投放设备组
                "device-id": this.PopulariztionPlanManageAdvertisingData['device-id'],//投放设备
                "start-time": formatDate(+this.PopulariztionPlanManageAdvertisingData['start-time']),//开始时间
                "end-time": formatDate(+this.PopulariztionPlanManageAdvertisingData['end-time']),//结束时间
            }, res => {
                this.tableData = res.payload.data;
                this.total = res.payload.total;
                this.loading = false;
                this.$esellApi.checkPermissions(100);
            }, res => {
                this.message("error", res.message)
            });
            // var _self = this;
            // setTimeout(() => {
            //     _self.loading = false;
            // }, 3000);
        },
        // 推广计划管理查询
        PopilarzitionPlanManageSearch() {
            this.getPopularzitionPlanManageListData();
        },
        // 子组件传递的值接受赋值
        batchStartUsing(val) {
            this.val = [];
            var _self = this
            val.map(function(v, i) {
                _self.val.push(v.id)
            })
            _self.val = [...new Set(_self.val)]
            this.val = _self.val;
        },
        // 批量暂停
        batchPause() {
            debugger
            if (this.val.length > 0) {
                this.$esellApi.send("/ad/device/batch/disable.shtml", {
                    ids: this.val
                }, res => {
                    if (res.message == "OK") {
                        this.getPopularzitionPlanManageListData();
                        this.message('success', '批量暂停成功');
                        this.val = []
                    }
                }, res => {
                    this.message('error', res.message);
                })
            } else {
                this.message('error', '请先选择需要操作的记录', () => { });
            }
        },
        // 批量开启
        batchStartUsingXia() {
            if (this.val.length > 0) {
                console.log("this.val", this.val)
                this.$esellApi.send("/ad/device/batch/enable.shtml", {
                    ids: this.val
                }, res => {
                    if (res.message == "OK") {
                        this.getPopularzitionPlanManageListData();
                        this.val = []
                        this.message('success', '批量启用成功');
                    }
                }, res => {
                    this.message('error', res.message);
                })
            } else {
                this.message('error', '请先选择需要操作的对象', () => { });
            }
        },
        // 批量删除
        batchRemove() {
            if (this.val.length > 0) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$esellApi.send("/ad/delete/batch.shtml", {
                        ids: this.val
                    }, res => {
                        if (res.message == "OK") {
                            this.getPopularzitionPlanManageListData();
                            this.message('success', '批量删除成功');
                            this.val = []
                        }
                    }, res => {
                        this.message('error', res.message);
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            } else {
                this.message('error', '请先选择需要操作的对象', () => { });
            }
        },
        // 清空条件
        cleanCondition() {
            this.PopulariztionPlanManageAdvertisingData = {
                page: 1,//页码
                size: 10,//页数
                "campaign-id": '',//推广计划id
                "ad-status": "",//广告状态
                name: "",//广告名称
                "group-id": "",//投放设备组
                "device-id": "",//投放设备
                "start-time": "",//开始时间
                "end-time": "",//结束时间
            }
            this.message("success","全部清空")
        },
        addadvertising() {
            this.$router.push({ path: "/adv_mag/new_adv" ,query:{'campaign-id':this.$route.query.id}});
        },
        addadvertisingGroup() {
            this.$router.push({ path: "/adv_mag/new_advgrop" });
        },
        makeActive(str, index) {
            // 发送请求
            console.log(index)
            this.Index = index;
            console.log(str);
            this.PopulariztionPlanManageAdvertisingData['ad-status'] = str;
            console.log(this.PopulariztionPlanManageAdvertisingData['ad-status']);
            this.getPopularzitionPlanManageListData();
        },
        advertisingSwitch(str) {
            this.isLoading = true;
            const that = this;
            this.bg = str;
            setTimeout(function() {
                that.isLoading = false;
            }, 2000)
        },
        //下发情况
        lowerIncidence() {
            this.$router.push({ path: '/adv_mag/pop_plan_mag/lower_incidence' })
        },
        // 启用
        open(row) {
            this.$esellApi.send("/ad/device/batch/enable.shtml", {
                ids: [row.id]
            }, res => {
                if (res.message == "OK") {
                    this.getPopularzitionPlanManageListData();
                    this.message("success", "启用成功")
                }
            }, res => {
                this.message("error", res.message)
            })
        },
        //暂停
        pause(row) {
            console.log(row)
            this.$esellApi.send("/ad/device/batch/disable.shtml", {
                ids: [row.id]
            }, res => {
                if (res.message == "OK") {
                    this.getPopularzitionPlanManageListData();
                    this.message("success", "暂停成功")
                }
            }, res => {
                this.message("error", res.message)
                console.log(res);
            })
        },
        // 修改
        edit(row) {
            // 1是设备
            // 2是设备组
            if (row['device-names'] == undefined) {
                this.$router.push({ path: '/adv_mag/edit_adv', query: { id: "" + row.id} })
            } else {
                this.$router.push({ path: '/adv_mag/edit_adv', query: { id: "" + row.id, device_name: row["device-names"][0] } })
            }

        },
        // 删除  不能用delete(关键词)
        delete1(row) {
            // 提示可直接使用
            // 成功操作
            this.$confirm('此操作将永久删除该广告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$esellApi.send("/ad/delete/batch.shtml", {
                    ids: [row.id]
                }, res => {
                    if (res.message == "OK") {
                        this.getPopularzitionPlanManageListData();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }
                }, res => {
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                })
            }).catch(() => {
                // 失败操作
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 每页多少数据
        handleSizeChange(val) {
            console.log("pagesize", val)
            this.PopulariztionPlanManageAdvertisingData.size = val;
            this.getPopularzitionPlanManageListData();
        },
        // 页码
        handleCurrentChange(val) {
            console.log("pageindex", val)
            this.PopulariztionPlanManageAdvertisingData.page = val;
            this.getPopularzitionPlanManageListData();
        }
    },
    watch: {
        PopulariztionPlanManageAdvertisingData: {
            handler(newvalue, oldvalue) {
                this.PopulariztionPlanManageAdvertisingData['start-time'] = newvalue['start-time'];
                this.PopulariztionPlanManageAdvertisingData['end-time'] = newvalue['end-time'];
                var date11 = new Date(this.PopulariztionPlanManageAdvertisingData['start-time']);
                var date22 = new Date(this.PopulariztionPlanManageAdvertisingData['end-time']);
                if (+date11 > +date22) {
                    this.spanInfo = '结束时间不要小于开始时间';
                    this.isTime = true;
                    this.PopulariztionPlanManageAdvertisingData['end-time'] = "";
                    return
                }
            },
            deep: true
        }
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
@import "../../sass/PopulariztionPlanManage.scss";
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
</style>


