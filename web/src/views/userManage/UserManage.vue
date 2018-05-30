<template>
    <div class="device-manage">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span>用户管理</span>
            </span>
        </div>
        <div class="bottom">
            <div class="device-manage-condition">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width:77px;">用户姓名</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="userManageData.name" placeholder="请填写用户姓名" style="width:100%;"></el-input>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">用户账号</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="userManageData['user-name']" placeholder="请填写用户账号" style="width:100%;"></el-input>
                                </div>
                            </div>
                            <!--<div class="popularization-plan clearfix fl" style="width:32.33%">
                                                            <div class="popularization-plan-info fl" style="width: 77px;">父账号</div>
                                                            <div class="popularization-plan-input fl" style="width:71%">
                                                                <el-input style="100%;" v-model="userManageData['parent-id']" placeholder="请填写父账号"></el-input>
                                                            </div>
                                                        </div>-->
                        </div>
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">账号状态</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-select v-model="userManageData['status']" placeholder="请选择账号状态" style="width:100%;">
                                        <el-option v-for="item in accountStatusOptions" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">角色</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-select v-model="userManageData['role-id']" placeholder="请选择角色" style="width:100%;">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="condition-search">
                            <a href="javascript:;" class="yxf-but" @click="query" data-butflag="1522748135025">查询</a>
                            <a href="javascript:;" class="yxf-but" @click="cleanCondition">清空条件</a>
                        </div>
                    </div>
                    <div class="advertising-operation">
                        <a href="javascript:;" class="yxf-but advertising-operation-suspend" @click="addNewUser" data-butflag="1522755726253">新增新用户</a>
                        <router-link to="/user_mag/role_mag">
                            <a href="javascript:;" class="yxf-but advertising-operation-delete" data-butflag="1522747231198">角色管理</a>
                        </router-link>
                        <el-button @click="deviceRemoteControl" data-butflag="1523945955516">设备组权限控制</el-button>
                    </div>
                    <div>
                        <div class="row3 clearfix" v-on:click.prevent>
                            <div :class="[{'isActive':index==Index},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type" :key="index">
                                <span>{{item.name}}</span>
                            </div>
                        </div>
                        <div v-loading="loading">
                            <Table v-on:batchStartUsing="batchStartUsing" @pause="pause" @start="start" :tableData="tableData" :total="total" v-on:pageIndex="pageIndex1" v-on:pagesize="pagesize1"></Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Table from './table2/UserManageTable.vue'
export default {
    name: "device-manage",
    components: {
        Table
    },
    data() {
        return {
            loading: '',//加载状态是否开启
            pageIndex: 1, //第几页页码
            total: 0, //总条数
            pagesize: 10, //页码
            is: true,
            bg: "advertising",
            userManageData: {
                name: "",//真实姓名
                "user-name": "",//用户账号
                "parent-id": "",//父账号
                status: "",//账号状态
                "role-id": "",//角色
            },
            tableData: [],//向子组件传递的值
            total: '',
            isShow: true,
            active: '',
            isActive: true,
            Index: "0",
            type: [{
                type: "",
                name: "全部用户",
            }, {
                type: "Y",
                name: "启用中",
            }, {
                type: "N",
                name: "暂停中",
            }],
            options: [],
            accountStatusOptions: [{
                value: 'Y',
                label: '启用'
            }, {
                value: 'N',
                label: '暂停'
            }],
        };
    },
    created() {
        this.getUserManageListData();
        this.getOptionsList();
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        toCorporateManagement() {
            this.$router.push({ path: '/corporate_manage' })
        },
        getOptionsList() {
            this.$esellApi.send(
                "/role/options.shtml",
                {},
                res => {
                    console.log(res);
                    this.options = res.payload;
                },
                res => {
                    this.message("error", res.message)
                }
            );
        },
        deviceRemoteControl() {
            let selectd = this.val;
            if (!selectd) {
                this.message('error', '请先选择用户再进行操作！');
                return;
            }
            selectd = selectd.map(function(e) { return e.id });
            selectd = JSON.stringify(selectd);

            this.$router.push({ path: "/user_mag/dev_right_control?accountIds=" + selectd })
        },
        getUserManageListData() {
            this.loading = true;
            this.$esellApi.send(
                "/user/list.shtml",
                {
                    page: this.pageIndex, //当前页数
                    size: this.pagesize, //一页多少条
                    name: this.userManageData["name"],
                    "user-name": this.userManageData["user-name"],
                    "parent-id": this.userManageData["parent-id"],
                    status: this.userManageData["status"],
                    "role-id": this.userManageData["role-id"],
                },
                res => {
                    if (res.message == "OK") {
                        this.tableData = res.payload.data;
                        this.total = res.payload.total;
                        this.loading = false;
                        this.$esellApi.checkPermissions(1);
                    }
                },
                res => {
                    this.message("error", res.message)
                }
            );
        },
        start(row) {
            if (row) {
                if (row.status == "Y") {
                    this.message("error", "请勿重复操作", () => { })
                    return
                } else {// 否则发送请求，重新渲染表格
                    this.$esellApi.send("/user/enable.shtml", { "id": row.id }, res => {
                        row.status = "Y"
                        this.getUserManageListData()
                        this.message("success", "操作成功")
                    }, res => {
                        // 依据服务器返回的错误信息提示
                        // this.message("error", "请勿重复操作", () => { })
                        this.message("error", res.message)
                    })
                }
            }
        },
        pause(row) {
            if (row) {
                if (row.status == "N") {
                    this.message("error", "请勿重复操作")
                    return
                } else {// 否则发送请求，重新渲染表格
                    this.$esellApi.send("/user/disable.shtml", { "id": row.id },
                        res => {
                            row.status = "N"
                            this.getUserManageListData()
                            this.message("success", "操作成功")
                        }, res => {
                            // 依据服务器返回的错误信息提示
                            // this.message("error", "请勿重复操作", () => { })
                            this.message("error", "系统提示错误")
                        })
                }
            }
        },
        // 拿到子组件传过来的一页多少条的值
        pageIndex1(val) {
            this.pageIndex = val;
            this.getUserManageListData();
        },
        // 拿到子组件传过来的一页多少条的值
        pagesize1(val) {
            this.pagesize = val;
            this.getUserManageListData();
        },
        query() {
            console.log(this.userManageData.status)
            if (this.userManageData.status == "Y") {
                this.Index = '1';
            } else if (this.userManageData.status == "N") {
                this.Index = '2';
            } else {
                this.Index = '0';
            }
            this.getUserManageListData();
        },
        addNewUser() {
            this.$router.push({ path: "/user_mag/add_new_user" })
        },
        cleanCondition() {
            this.userManageData = {
                name: "",//真实姓名
                "user-name": "",//用户账号
                "parent-id": "",//父账号
                status: "",//账号状态
                "role-id": "",//角色
            }
            this.Index = "0"
        },
        batchStartUsing(val) {
            this.val = val;
        },
        // 批量暂停
        batchPause() {
            if (this.val.length > 0) {
                this.message('success', '操作成功', () => { });
            } else {
                this.message('error', '请先选择操作对象', () => { });
            }
            this.val.forEach(function(v, i) {
                if (v['状态'] == '暂停') {
                    this.message('error', '请勿重复操作', () => { });
                    return false;
                }
            }, this)
        },
        // 批量开启
        batchStartUsingXia() {
            if (this.val.length > 0) {
                this.message('success', '操作成功', () => { });
            } else {
                this.message('error', '请先选择操作对象', () => { });
                return false;
            }
            this.val.forEach(function(v, i) {
                console.log(v['状态'])
                if (v['状态'] == '启用') {
                    console.log(111);
                    this.message('error', '请勿重复操作', () => { });
                    return false;
                }
            }, this)
        },
        addadvertising() {
            console.log(this.$router);
            this.$router.push({ path: "/new_adv" });
        },
        makeActive(str, index) {
            // 发送请求
            this.userManageData.status = str;
            this.Index = index;
            this.getUserManageListData();
        },
        advertisingSwitch(str) {
            if (str == 'advertising') {
                this.isShow = true
            } else {
                this.isShow = false
            }
            this.bg = str;
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


