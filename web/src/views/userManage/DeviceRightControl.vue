<template>
    <div class="advertising-audit">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/user_mag" class="blue">用户管理</router-link>
                <span>></span>
                <span>设备权限控制</span>
            </span>
        </div>
        <div class="bottom">
            <div class="tabs clearfix">
                <div class="tabs-advertising">
                    <div class="fl advertising" :class="{'active':bg=='device-group'}" @click="advertisingSwitch('device-group')">设备组</div>
                    <div class="fl advertising-group" :class="{'active':bg=='device'}" @click="advertisingSwitch('device')">设备</div>
                </div>
            </div>
            <!--设备组-->
            <div class="advertising" v-show="isShow" style="margin-top:20px;">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">设备组名称</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="deviceGroupListData.name" placeholder="请填写设备组名称" style="width:100%;"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="condition-search">
                            <a href="javascript:;" @click="getDeviceGroupJurisdictionRightControlData" class="yxf-but">查询</a>
                            <a href="javascript:;" class="yxf-but" @click="CleanGr1">清空条件</a>
                        </div>
                    </div>
                    <div class="advertising-operation" style="margin:20px 0;">
                        <a href="javascript:;" class="yxf-but" data-butflag="1524055879231" style="margin-right:6px;" @click="authControlDeviceGroup">批量允许控制</a>
                        <a href="javascript:;" class="yxf-but" data-butflag="1524055907608" @click="unauthControlDeviceGroup">批量不允许控制</a>
                    </div>
                    <!-- <div class="row3 clearfix" v-on:click.prevent>
                                    <div :class="[{'isActive':index==Index},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type" :key="index">
                                        <span>{{item.name}}</span>
                                    </div>
                                </div> -->
                    <div>
                        <el-table :data="deviceGroupLisTableData" ref="deviceGroupTable" border style="width: 100%" @select-all="valueChange" @select="valueChange">
                            <el-table-column type="selection" width="48" align="center">
                            </el-table-column>
                            <el-table-column prop="name" label="设备组名称" width="180">
                            </el-table-column>
                            <el-table-column prop="template-name" label="设备模板">
                            </el-table-column>
                            <el-table-column label="设备总数" sortable>
                                <template slot-scope="scope">
                                    <div v-html='scope.row.nums ? scope.row.nums:"0"'></div>
                                </template>
                            </el-table-column>
                            <el-table-column label="有无权限" v-if="showPermissionColum">
                                <template slot-scope="scope">
                                    <div v-html='scope.row.pstatus ? "有权限":(scope.row.pstatus==false?"无权限":scope.row.pstatus)||"——"'></div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="300">
                                <template slot-scope="scope">
                                    <div class="file-operation-other clearfix">
                                        <a class="blue start fl" @click="deviceGroupexamineDevice(scope.row),dialogVisible=true" style="margin-right:10px;">查看设备</a>
                                        <a class="blue pause fl" data-butflag="1524055879231" @click="authControlDeviceGroup(scope.row)" style="margin-right:10px;">允许控制</a>
                                        <a class="blue edit fl" data-butflag="1524055907608" @click="unauthControlDeviceGroup(scope.row)">不允许控制</a>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="paging" v-if="ishide" style="text-align: center;margin-top:20px;">
                        <el-pagination @size-change="deviceGroupListHandleSizeChange" @current-change="deviceGroupListHandleCurrentChange" :current-page="currentPage4" :page-size="deviceGroupListData.size" :page-sizes='[10,30,50]' layout="total, sizes, prev, pager, next, jumper" :total="deviceGroupListData.total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <!--设备-->
            <div class="advertising" v-show="!isShow" style="margin-top:20px;">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">设备编号</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="deviceListData.uuid" placeholder="请填写设备编号" style="width:100%;"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="condition-search">
                            <a href="javascript:;" class="yxf-but" @click="getDeviceJurisdictionRightControlData">查询</a>
                            <a href="javascript:;" class="yxf-but" @click="cleanCondition">清空条件</a>
                        </div>
                    </div>
                    <div class="advertising-operation" style="margin:20px 0;">
                        <a href="javascript:;" class="yxf-but" data-butflag="1524055775832" style="margin-right:6px;" @click="authControlDevice">批量允许控制</a>
                        <a href="javascript:;" class="yxf-but" data-butflag="1524055835464" @click="unauthControlDevice">批量不允许控制</a>
                    </div>
                    <!-- <div class="row3 clearfix" v-on:click.prevent>
                                    <div :class="[{'isActive':index==Index},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type2" :key="index">
                                        <span>{{item.name}}</span>
                                    </div>
                                </div> -->
                    <div>
                        <el-table ref="deviceTable" :row-key="id" :data="deviceTableData" border style="width: 100%">
                            <el-table-column type="selection" width="48" align="center">
                            </el-table-column>
                            <el-table-column prop="uuid" label="设备编号" width="180">
                            </el-table-column>
                            <el-table-column prop="template-name" label="设备模板">
                            </el-table-column>
                            <!-- <el-table-column prop="jurisdiction" label="有无权限">
                                        </el-table-column> -->
                            <el-table-column label="有无权限" v-if="showPermissionColum">
                                <template slot-scope="scope">
                                    <div v-html='scope.row.pstatus ? "有权限":(scope.row.pstatus==false?"无权限":scope.row.pstatus)||"——"'></div>
                                </template>
                            </el-table-column>

                            <el-table-column label="操作" width="300">
                                <template slot-scope="scope">
                                    <div class="file-operation-other clearfix">
                                        <a class="blue pause fl" data-butflag="1524055775832" @click="authControlDevice(scope.row)" style="margin-right:10px;">允许控制</a>
                                        <a class="blue edit fl" data-butflag="1524055835464" @click="unauthControlDevice(scope.row)">不允许控制</a>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="paging" v-if="ishide" style="text-align: center;margin-top:20px;">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage5" :page-size="deviceListData.size" :page-sizes='[10,30,50]' layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "advertising-audit",
    data() {
        return {
            // 设备组权限列表数据
            deviceGroupListData: {
                page: 1, //设备组第几页页码
                total: '', //设备组总条数
                size: 10,//设备组页码
                "account-ids": this.$route.query.accountIds,
                "name": '',
                "uuid": '',
            },
            // 设备权限列表数据
            deviceListData: {
                page: 1, //设备第几页页码
                total: '', //设备总条数
                size: 10,//设备页码
                "account-ids": this.$route.query.accountIds,
                "name": '',
            },
            page: 1, //当前页
            pagesize: 10, //当前页的条数
            total: 99, //当前信息的总条数
            isShow: true,
            ishide: true,
            deviceInfoList: "",
            is: true,
            bg: "device-group",
            showPermissionColum: false,
            deviceGroupRightControlData: {
                input: "",
                deviceGroup: "",
                device: "",
                date1: "",
                date2: "",
                value1: ""
            },
            deviceRightControlData: {
                input: "",
                deviceGroup: "",
                device: "",
                date1: "",
                date2: "",
                value1: ""
            },
            active: 'all-advertising',
            isActive: true,
            Index: "0",
            type: [{
                type: "",
                name: "全部设备组",
            }],
            type2: [{
                type: "",
                name: "全部设备",
            }],
            deviceGroupLisTableData: [],//存储设备组权限表格数据
            deviceTableData: []
        };
    },
    created() {
        let queryIds = eval('(' + this.$route.query.accountIds + ')');
        this.showPermissionColum = queryIds && queryIds.length == 1;
        this.getDeviceGroupJurisdictionRightControlData();//设备组请求
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        valueChange(val) {
            //KenJon table 勾选
        },
        //设备组请求
        getDeviceGroupJurisdictionRightControlData() {
            this.deviceGroupListData.control = "1";
            this.$esellApi.send("/group/list.shtml", this.deviceGroupListData, (res) => {
                this.deviceGroupLisTableData = res.payload.data;
                this.deviceGroupListData.total = res.payload.total;
                this.$esellApi.checkPermissions(200);
            }, (res) => {
                this.message('error', res.message);
            })
        },
        //设备请求
        getDeviceJurisdictionRightControlData() {
            this.deviceListData.control = "1";
            this.$esellApi.send("/device/list.shtml", this.deviceListData, (res) => {

                this.deviceTableData = res.payload.data;
                this.total = res.payload.total;
                this.$esellApi.checkPermissions(200);
            }, (res) => {
                this.message('error', res.message);
            })
        },
        //设备组切换每页多少条数据的请求
        deviceGroupListHandleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.deviceGroupListData.size = val;
            this.getDeviceGroupJurisdictionRightControlData();//设备组请求
        },
        //设备组切换第几页数据的请求
        deviceGroupListHandleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.deviceGroupListData.page = val;
            this.getDeviceGroupJurisdictionRightControlData();//设备组请求
        },
        //设备切换每页多少条数据的请求
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.deviceListData.size = val;
            this.getDeviceJurisdictionRightControlData();//设备组请求
        },
        //设备切换第几页数据的请求
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.deviceListData.page = val;
            this.getDeviceJurisdictionRightControlData();//设备组请求
        },
        // 设备组清除条件
        CleanGr1() {
            this.deviceGroupListData.name = '';
        },
        // 设备清除条件
        cleanCondition() {
            this.deviceListData.uuid = '';
        },
        // 设备组切换有无权限
        makeActive(str, index) {
            // 发送请求
            this.Index = index;
            console.log(str);
            //设备组请求
            this.getDeviceGroupJurisdictionRightControlData();

        },
        // 设备组与设备切换时发送请求
        advertisingSwitch(str) {
            if (str == 'device-group') {
                this.isShow = true
                //设备组请求
                this.getDeviceGroupJurisdictionRightControlData();
            } else {
                this.isShow = false
                //设备请求
                this.getDeviceJurisdictionRightControlData();
            }
            this.bg = str;
            console.log(str);
        },
        // 设备组的查看设备
        deviceGroupexamineDevice(row) {
            // this.advertisingSwitch('device');

            this.bg = 'device';
            this.isShow = false
            this.$esellApi.send("/device/list.shtml", {
                'page': this.page,
                'size': this.pagesize,
                'account-ids': this.$route.query.accountIds,
                'group-id': row.id
            }, (res) => {
                this.deviceTableData = res.payload.data;
                this.total = res.payload.total;
                this.$esellApi.checkPermissions(200);
            }, (res) => {
                this.message('error', res.message);
            })

        },
        // 设备组的允许控制
        authControlDeviceGroup(row) {
            let deviceIds = [];
            let data;
            if (row.id) {
                deviceIds.unshift(row.id);
            } else {
                data = this.$refs.deviceGroupTable.selection;
                for (var i = 0; i < data.length; i++) {
                    let item = data[i];
                    if (item.id) {
                        deviceIds.unshift(item.id);
                    }
                }
                if (deviceIds.length === 0) {
                    this.message("error", '请先选择设备组', () => { });
                    return;
                }
            }
            this.$esellApi.send("/device/group/permission/batch/auth.shtml", {
                "group-ids": deviceIds,
                "account-ids": this.deviceGroupListData['account-ids'],
            }, (res) => {
                if (res.message == "OK") {
                    if (data) {
                        this.getDeviceGroupJurisdictionRightControlData();
                    } else {
                        row.pstatus = true
                    }
                    this.message("success", "允许控制成功", () => { })
                }
            }, (res) => {
                this.message("error", res.message, () => { })
            })
        },
        // 设备组的不允许控制
        unauthControlDeviceGroup(row) {
            let deviceIds = [];
            let data;
            if (row.id) {
                deviceIds.unshift(row.id);
            } else {
                data = this.$refs.deviceGroupTable.selection;
                for (var i = 0; i < data.length; i++) {
                    let item = data[i];
                    if (item.id) {
                        deviceIds.unshift(item.id);
                    }
                }
                if (deviceIds.length === 0) {
                    this.message("error", '请先选择设备组', () => { });
                    return;
                }
            }
            this.$esellApi.send("/device/group/permission/batch/unauth.shtml", {
                "group-ids": deviceIds,
                "account-ids": this.deviceGroupListData['account-ids'],
            }, (res) => {
                if (res.message == "OK") {
                    if (data) {
                        this.getDeviceGroupJurisdictionRightControlData();
                    } else {
                        row.pstatus = false
                    }
                    this.message("success", "不允许控制成功", () => { })
                }
            }, (res) => {
                this.message("error", res.message, () => { })
            })
        },

        // 设备的允许控制
        authControlDevice(row) {
            let deviceIds = [];
            let data;
            if (row.id) {
                deviceIds.unshift(row.id);
            } else {
                data = this.$refs.deviceTable.selection;
                for (var i = 0; i < data.length; i++) {
                    let item = data[i];
                    if (item.id) {
                        deviceIds.unshift(item.id);
                    }
                }
                if (deviceIds.length === 0) {
                    this.message("error", '请先选择设备', () => { });
                    return;
                }
            }

            this.$esellApi.send("/device/permission/auth.shtml", {
                "device-ids": deviceIds,
                "account-ids": this.deviceGroupListData['account-ids'],
            }, (res) => {
                if (res.message == "OK") {
                    if (data) {
                        this.getDeviceJurisdictionRightControlData();
                    } else {
                        row.pstatus = true
                    }
                    this.message("success", "允许控制成功", () => { })
                }
            }, (res) => {
                this.message("error", res.message, () => { })
            })
        },
        // 设备的不允许控制
        unauthControlDevice(row) {
            let deviceIds = [];
            let data;
            if (row.id) {
                deviceIds.unshift(row.id);
            } else {
                data = this.$refs.deviceTable.selection;
                for (var i = 0; i < data.length; i++) {
                    let item = data[i];
                    if (item.id) {
                        deviceIds.unshift(item.id);
                    }
                }
                if (deviceIds.length === 0) {
                    this.message("error", '请先选择设备', () => { });
                    return;
                }
            }

            this.$esellApi.send("/device/permission/unauth.shtml", {
                "device-ids": deviceIds,
                "account-ids": this.deviceGroupListData['account-ids'],
            }, (res) => {
                if (res.message == "OK") {
                    if (data) {
                        this.getDeviceJurisdictionRightControlData();
                    } else {
                        row.pstatus = false
                    }
                    this.message("success", "不允许控制成功", () => { })
                }
            }, (res) => {
                this.message("error", res.message, () => { })
            })
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
@import "../../sass/deviceRightControl.scss";
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


