<template>
    <div class="advertising-audit">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span>广告审核</span>
            </span>
        </div>
        <div class="bottom">
            <div class="device-manage-condition">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width:77px;">广告名称</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input placeholder="请填写广告名称" v-model='advertisingAuditListDate.name'></el-input>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width:77px;">投放设备组</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-select v-model="advertisingAuditListDate['group-id']" placeholder="请选择设备组" style="width:100%" @visible-change="groupChangeValue" clearable>
                                        <el-option v-for="item in groupList" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">广告位规格</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-select v-model="advertisingAuditListDate['slot-id']" placeholder="请选择广告位规格" style="width:100%;" @visible-change="slotChangeValue" clearable>
                                        <el-option v-for="item in slotList" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">投放时间</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-date-picker v-model="advertisingAuditListDate['start-time']" :editable="false" type="datetime" placeholder="请选择开始时间" style="width:100%;">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">到</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-date-picker v-model="advertisingAuditListDate['end-time']" :editable="false" type="datetime" placeholder="请选择结束时间" style="width:100%;">
                                    </el-date-picker>
                                </div>
                            </div>
                        </div>
                        <div class="condition-search">
                            <a href="javascript:;" class="yxf-but" @click="searchAdvertisingAudit" data-butflag="1522748946198">查询</a>
                            <a href="javascript:;" class="yxf-but" @click="cleanCondition">清空条件</a>
                        </div>
                    </div>
                    <div class="advertising-operation">
                        <a href="javascript:;" class="yxf-but advertising-operation-suspend" @click="batchAuditPass" data-butflag="1522749082030">批量审核通过</a>
                        <a href="javascript:;" class="yxf-but advertising-operation-delete" @click="batchAuditNoPass" data-butflag="1522749096728">批量审核不通过</a>
                    </div>
                    <div>
                        <div class="row3 clearfix" v-on:click.prevent>
                            <div :class="[{'isActive':index==Index},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type" :key="index">
                                <span>{{item.name}}</span>
                            </div>
                        </div>
                        <Table @batchStartUsing='batchStartUsing' :batchStartUsing='currentPage4' @auditPass='auditPass' @auditNoPass='auditNoPass' :tableData="tableData" :advertisingAuditListDate.size='size' :total="total" @handleCurrentChange='handleCurrentChange' @handleSizeChange='handleSizeChange'></Table>
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
import { isvalidUsername } from '@/utils/validate'
import Table from './table2/Table.vue'
export default {
    name: "advertising-audit",
    components: {
        Table
    },
    data() {
        return {
            isTime: false,//时间提示框默认隐藏
            spanInfo: "",//时间提示信息
            val: [],//子组件传递过来的值
            slotList: "",//广告位列表
            groupList: "",//设备组列表
            campaignList: '',//推广计划列表
            is: true,
            bg: "advertising",
            advertisingAuditListDate: {
                page: 1,
                size: 10,
                name: "",
                "ad-status": "",
                "group-id": "",
                "device-id": "",
                'slot-id': "",
                "start-time": "",
                "end-time": "",
            },
            isShow: true,
            active: 'all-advertising',
            isActive: true,
            Index: "0",
            type: [{
                type: "",
                name: "全部广告",
            }, {
                type: "1",
                name: "待审核",
            }, {
                type: "2",
                name: "审核不通过",
            }, {
                type: "4",
                name: "投放中",
            }, {
                type: "3",
                name: "待播放",
            }, {
                type: "5",
                name: "暂停中",
            }, {
                type: "6",
                name: "已过期",
            }],
            tableData: [],
            total: '',
        };
    },
    created() {
        console.log("广告审核", this.$route.path)
        this.getAdvertisingAuditListData();
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        getAdvertisingAuditListData() {
            this.advertisingAuditListDate["start-time"] = formatDate(this.advertisingAuditListDate["start-time"])
            this.advertisingAuditListDate["end-time"] = formatDate(this.advertisingAuditListDate["end-time"])

            this.$esellApi.send("/ad/list/audit.shtml", this.advertisingAuditListDate, res => {
                this.tableData = res.payload.data;
                this.total = res.payload.total;
                this.$esellApi.checkPermissions();
            }, res => {
                this.message("error", res.message)
            })
        },
        // 设备组列表
        groupChangeValue(val) {
            if (val) {
                this.$esellApi.send("/group/options.shtml", {}, res => {
                    this.groupList = res.payload;
                }, res => {
                    this.message("error", res.message)
                })
            }
        },
        // 广告位列表
        slotChangeValue(val) {
            if (val) {
                if (!this.advertisingAuditListDate['group-id']) {
                    this.message("warning", "请先选择设备组")
                    return;
                }
                this.$esellApi.send("/slot/options.shtml", {
                    "group-id": this.advertisingAuditListDate['group-id']
                }, res => {
                    console.log(res.payload)
                    this.slotList = res.payload;
                }, res => {
                  this.message("error", res.message)
                })
            }
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
            console.log(this.val)
        },
        batchAuditPass() {
            if (this.val.length > 0) {
                this.$esellApi.send("/ad/audit/batch/pass.shtml", {
                    ids: this.val
                }, res => {
                    this.getAdvertisingAuditListData();
                    this.message("success", "批量审核通过成功")
                }, res => {
                    this.message("error", res.message)
                })
            } else {
                this.message("error", "请先选择操作对象")
            }
        },
        batchAuditNoPass() {
            if (this.val.length > 0) {
                this.$esellApi.send("/ad/audit/batch/fail.shtml", {
                    ids: this.val
                }, res => {
                    this.getAdvertisingAuditListData();
                    this.message("success", "批量审核不通过成功")
                }, res => {
                    this.message("error", res.message)
                })
            } else {
                this.message("error", "请先选择操作对象")
            }

        },
        // 清空条件
        cleanCondition() {
            this.advertisingAuditListDate = {
                page: "1",
                size: "10",
                name: "",
                "group-id": "",
                "device-id": "",
                'slot-id': "",
                "start-time": "",
                "end-time": "",
            }
        },
        addadvertising() {
            console.log(this.$router);
            this.$router.push({ path: "/new_adv" });
        },
        makeActive(str, index) {
            // 发送请求
            this.Index = index;
            this.advertisingAuditListDate['ad-status'] = str
            this.getAdvertisingAuditListData();
        },
        // 审核通过
        auditPass(row) {
            this.$esellApi.send("/ad/audit/pass.shtml", {
                id: row.id
            }, res => {
                if(res.message=='OK'){
                    this.getAdvertisingAuditListData();
                    this.message("success", "审核通过成功");
                }else{
                    this.message("error", res.message)
                }
            }, res => {
                this.message("error", res.message)
            })
        },
        // 审核不通过
        auditNoPass(row) {
            this.$esellApi.send("/ad/audit/fail.shtml", {
                id: row.id
            }, res => {
                this.getAdvertisingAuditListData();
                this.message("success", "审核不通过成功")
            }, res => {
                this.message("error", "审核不通过失败:" + res.message)
            })
        },
        // 每页多少数据
        handleSizeChange(val) {
            console.log("pagesize", val)
            this.advertisingAuditListDate.size = val;
            this.getAdvertisingAuditListData();
        },
        // 页码
        handleCurrentChange(val) {
            console.log("pageindex", val)
            this.advertisingAuditListDate.page = val;
            this.getAdvertisingAuditListData();
        },
        // 查询
        searchAdvertisingAudit() {
            this.getAdvertisingAuditListData();
        },
    },
    watch: {
        advertisingAuditListDate: {
            handler(newvalue, oldvalue) {
                this.advertisingAuditListDate['start-time'] = newvalue['start-time'];
                this.advertisingAuditListDate['end-time'] = newvalue['end-time'];
                var date11 = new Date(this.advertisingAuditListDate['start-time']);
                var date22 = new Date(this.advertisingAuditListDate['end-time']);
                if (+date11 > +date22) {
                    this.spanInfo = '结束时间不要小于开始时间';
                    this.isTime = true;
                    this.advertisingAuditListDate['end-time'] = "";
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
@import "../../sass/advertisingAudit.scss";
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


