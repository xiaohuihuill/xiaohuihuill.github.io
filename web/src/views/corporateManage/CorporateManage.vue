<template>
    <div class="device-manage">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span>公司管理</span>
            </span>
        </div>
        <div class="bottom">
            <div class="device-manage-condition">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%;height:30px;">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width:77px;">用户账号</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="corporateManage['user-name']" placeholder="请填写用户账号" style="width:100%;"></el-input>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">真实姓名</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="corporateManage.name" placeholder="请填写真实姓名" style="width:100%;"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="condition-content clearfix" style="width:100%;height:30px;">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">公司名称</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="corporateManage['company-name']" placeholder="请填写公司名称" style="width:100%;"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="condition-search">
                            <a href="javascript:;" class="yxf-but" @click="query" data-butflag="1522748135025">查询</a>
                            <a href="javascript:;" class="yxf-but" @click="cleanCondition">清空条件</a>
                        </div>
                    </div>
                    <div class="advertising-operation">
                        <a href="javascript:;" class="yxf-but advertising-operation-suspend" @click="addNewUser" data-butflag="1522755726253">新增公司账号</a>
                        <router-link to="/user_mag/role_mag">
                            <!--<a href="javascript:;" class="yxf-but advertising-operation-delete" data-butflag="1522747231198">角色管理</a>-->
                        </router-link>
                    </div>
                    <div>
                        <div class="row3 clearfix" v-on:click.prevent>
                            <div :class="[{'isActive':index==Index},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type" :key="index">
                                <span>{{item.name}}</span>
                            </div>
                        </div>
                        <div v-loading="loading">
                            <Table v-on:batchStartUsing="batchStartUsing" @pause="pause" @start="start" :tableData="tableData" :total="total" v-on:pageIndex="pageIndex1" v-on:pagesize="pagesize1" @importDevice="importDevice"></Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="导入设备" :visible.sync="dialogFormVisible" size="large" top="10%">
            <div class="import-device-info clearfix">
                <div class="import-device-left fl">
                    <div class="import-device-all-device">所有设备</div>
                    <div class="import-device-all-content">
                        <div class="import-device-all-content-search">
                            <span>
                                <el-select v-model="importDeviceValue" clearable placeholder="请选择查询方式" style="width:28%;">
                                    <el-option v-for="item in importDeviceOptions" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </span>
                            <span>
                                <span v-if="importDeviceValue=='1'">
                                    <el-cascader clearable placeholder="请选择省市区" :options="provincesList" filterable style="width:50%;" change-on-select v-model="province"></el-cascader>
                                </span>
                                <span v-if="importDeviceValue=='2'">
                                    <el-input v-model="importDeviceName" placeholder="请填写设备名称" style="width:50%;"></el-input>
                                </span>
                                <span v-if="importDeviceValue=='3'">
                                    <el-input v-model="importDeviceGroupName" placeholder="请填写设备组名称" style="width:50%;"></el-input>
                                </span>
                            </span>
                            <span v-if="importDeviceValue!='0'">
                                <a data-v-46106c54="" href="javascript:;" data-butflag="" class="yxf-but" style="display: inline-block;" @click="importDeviceSearch">查询</a>
                            </span>
                        </div>
                        <div class="import-device-all-content-tree1">
                            <div style="height:265px;overflow: auto;padding:0 20px;box-sizing:border-box;">
                                <el-tree :data="localAllDeviceGroup" @check-change="checkChangeTree1" show-checkbox node-key="id" ref="tree1" default-expanded-keys="" default-checked-keys="" :props="defaultProps">
                                </el-tree>
                            </div>
                            <div class="import-device-info-footer">
                                <span>
                                    <el-checkbox v-model="localAllChecked" @change="allToImportDevice">&nbsp;&nbsp;全选</el-checkbox>
                                </span>
                                <!--<span>共&nbsp;{{localDeviceTotal}}&nbsp;台</span>-->
                                <span>已选&nbsp;{{localSelectedDeviceTotal}}&nbsp;/{{localDeviceTotal}}&nbsp;&nbsp;台</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="import-device-center fl">
                    <div class="import-device-operation">
                        <div class="three one" style="margin-top:20px;" @click="singleToImportDevice">
                            <el-tooltip class="item" effect="dark" content="导入选中" placement="top">
                                <span style="display:inline-block;width:100%;height:100%">&gt;</span>
                            </el-tooltip>
                        </div>
                        <div class="four one" @click="singleToGetOut">
                            <el-tooltip class="item" effect="dark" content="导出选中" placement="bottom">
                                <span style="display:inline-block;width:100%;height:100%">&lt;</span>
                            </el-tooltip>
                        </div>
                    </div>
                </div>
                <div class="import-device-right import-device-left fl">
                    <div class="import-device-all-device">已导入设备</div>
                    <div class="import-device-all-content">
                        <div class="import-device-all-content-tree2 import-device-all-content-tree1">
                            <div style="height:305px;overflow: auto;padding:0 20px;box-sizing:border-box;">
                                <el-tree :data="importAllDeviceGroup" @check-change="checkChangeTree2" show-checkbox node-key="id" ref="tree2" default-expanded-keys="" default-checked-keys="" :props="defaultProps">
                                </el-tree>
                            </div>
                            <div class="import-device-info-footer">
                                <span>
                                    <el-checkbox v-model="importAllChecked" @change="allToGetOut">&nbsp;&nbsp;全选</el-checkbox>
                                </span>
                                <!--<span>共&nbsp;{{importDeviceTotal}}&nbsp;台</span>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" style="margin-left: 10px;" @click="dialogFormVisibleDetermine">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Table from "./table2/CorporateManageTable.vue"
export default {
    name: "device-manage",
    components: {
        Table
    },
    data() {
        return {
            corporateManage: {
                name: "",
                "user-name": "",
                "role-id": "",
                "company-name": "",
                status: "",
            },
            roleOptions: "",//请求的角色列表
            roleId: "",//给后台的角色id
            importDeviceValue: "",//监听导入设备下拉的值
            importDeviceName: "",//导入设备的设备名称
            importDeviceGroupName: "",//导入设备的设备组名称
            importCompanyName: "",//导入设备的公司名称
            province: "",//导入设备的地区
            provincesList: "",//地区列表
            localAllChecked: false,//本机默认不勾选全选
            importAllChecked: false,//已导入默认不勾选全选

            localAllDeviceGroup: [],//本账号的tree数组
            localDeviceTotal: "",//本机总数
            localSelectedDeviceTotal: 0,//本机已选项总数

            importDevicePage: 1,
            importDeviceSize: 10,
            importDeviceId: '',//保存每次点击打开的导入设备id
            importDeviceTotal: 0,//已导入总数
            importAllDeviceGroup: [],//已导入的tree数组
            importDeviceGetOutId: [],//已导入的又导出数组

            importDeviceOptions: [{
                value: '1',
                label: '按地区查询'
            }, {
                value: '2',
                label: '按设备名称查询'
            }, {
                value: '3',
                label: '按设备组名称查询'
            }],
            dialogFormVisible: false,//导入设备
            localData: {
                size: 10,
                page: 1,
                name: "",
                "group-name": "",
                "district-code": "",
            },

            defaultProps: {
                children: 'children',
                label: 'label'
            },

            loading: '',//加载状态是否开启
            pageIndex: 1, //第几页页码
            pagesize: 10, //页码
            total: 0, //总条数
            is: true,
            bg: "advertising",
            // userManageData: {
            //     name: "",//真实姓名
            //     "user-name": "",//用户账号
            //     "parent-id": "",//父账号
            //     status: "",//账号状态
            //     "role-id": "",//角色
            // },
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
            array: [],
        };
    },
    created() {
        this.getProvince();
        this.getOptionsList();
        this.getCoporareManageListData();
    },
    mounted() {
        // this.$esellApi.checkPermissions();
    },
    methods: {
        importDeviceSearch() {
            this.getLocalDeviceInfoData(true);
        },
        checked() {
            console.log("点了这个checked")
            this.localAllDeviceGroup = this.localAllDeviceGroup;
        },
        //获取公司管理列表数据
        getCoporareManageListData() {
            this.loading = true;
            this.$esellApi.send("/company/proxy/list.shtml", {
                page: this.pageIndex,
                size: this.pagesize,
                "name": this.corporateManage.name,
                "user-name": this.corporateManage['user-name'],
                "company-name": this.corporateManage['company-name'],
                "role-id": this.corporateManage['role-id'],
                status: this.corporateManage.status,
            }, res => {
                this.tableData = res.payload.data;
                this.total = res.payload.total;
                this.loading = false;
            }, res => {
                this.message("error", res.message);
            })
        },

        getProvince() {
            this.$esellApi.send(
                "/district/list.shtml",
                {},
                res => {
                    this.provincesList = res.payload;
                },
                res => {
                    this.$message({
                        type: "error",
                        message: res.message,
                    });
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
        start(row) {
            if (row) {
                if (row.status == "Y") {
                    this.message("error", "请勿重复操作")
                    return
                } else {// 否则发送请求，重新渲染表格
                    this.$esellApi.send("/company/proxy/disable.shtml", { "id": row.id }, res => {
                        row.status = "Y"
                        this.getCoporareManageListData()
                        this.message("success", "操作成功")
                    }, res => {
                        // 依据服务器返回的错误信息提示
                        // this.message("error", "请勿重复操作")
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
                    this.$esellApi.send("/company/proxy/disable.shtml", { "id": row.id },
                        res => {
                            row.status = "N"
                            this.getCoporareManageListData()
                            this.message("success", "操作成功")
                        }, res => {
                            // 依据服务器返回的错误信息提示
                            // this.message("error", "请勿重复操作", () => { })
                            this.message("error", res.message)
                        })
                }
            }
        },
        getOptionsList() {
            this.$esellApi.send(
                "/role/options.shtml",
                {},
                res => {
                    this.roleOptions = res.payload;
                },
                res => {
                    this.message("error", res.message)
                }
            );
        },
        // 拿到子组件传过来的一页多少条的值
        pageIndex1(val) {
            this.pageIndex = val;
            this.getCoporareManageListData();
        },
        // 拿到子组件传过来的一页多少条的值
        pagesize1(val) {
            this.pagesize = val;
            this.getCoporareManageListData();
        },
        query() {
            console.log(this.corporateManage.status)
            if (this.corporateManage.status == "Y") {
                this.Index = '1';
            } else if (this.corporateManage.status == "N") {
                this.Index = '2';
            } else {
                this.Index = '0';
            }
            this.getCoporareManageListData();
        },
        addNewUser() {
            this.$router.push({ path: "/corporate_manage/add_new_user" })
        },
        cleanCondition() {
            this.corporateManage = {
                name: "",//真实姓名
                "user-name": "",//用户账号
                "company-name": "",//父账号
                "role-id": "",//角色
            }
            this.Index = 0
        },
        batchStartUsing(val) {
            this.val = val;
        },
        makeActive(str, index) {
            // 发送请求
            this.corporateManage.status = str;
            this.Index = index;
            this.getCoporareManageListData();
        },
        // 获取本机的设备
        getLocalDeviceInfoData(search) {
            if (search) {
                this.localData.page = 1;
                this.localAllDeviceGroup = [];
            } else {
                this.localData.page = this.localData.page;
            }
            console.log("每次重置为", this.localData.page)
            var _self = this;
            if (this.importDeviceValue == '1') {
                console.log(1,this.province)
                this.localData['group-name'] = "";
                this.localData['name'] = "";
                this.localData['district-code'] = this.province[1];
            } else if (this.importDeviceValue == '2') {
                this.localData['group-name'] = "";
                this.localData['name'] = this.importDeviceName;
                this.localData['district-code'] = "";
            } else if (this.importDeviceValue == '3') {
                this.localData['group-name'] = this.importDeviceGroupName;
                this.localData['name'] = "";
                this.localData['district-code'] = "";
            }
            console.log("",this.localData)
            this.$esellApi.send("/company/proxy/companyDeviceListParent.shtml", this.localData, res => {
                console.log("本机请求了一次", this.localData.page, res.payload.pages)
                if (this.localData.page == 1 && res.payload.pages == 1) {
                    this.localDeviceTotal = res.payload.total;
                    this.localAllDeviceGroup = res.payload.data;
                    this.localAllDeviceGroup.forEach((ele) => {
                        ele.label = ele.name;
                    })
                    return;
                }
                if (this.localData.page <= res.payload.pages) {
                    this.localAllDeviceGroup = this.localAllDeviceGroup.concat(res.payload.data);
                    this.localData.page++;
                    setTimeout(function() {
                        _self.getLocalDeviceInfoData();
                    }, 50)
                }
                this.localDeviceTotal = res.payload.total;
                this.localAllDeviceGroup.forEach((ele) => {
                    ele.label = ele.name;
                })
            }, res => {
                this.message("error", res.message);
            })
        },
        // 获取已导入的设备
        getImportDeviceInfoData() {
            var _self = this;
            this.$esellApi.send("/company/proxy/companyDeviceListSon.shtml", {
                size: this.importDeviceSize,
                page: this.importDevicePage,
                "son-id": this.importDeviceId
            }, res => {

                if (this.importDevicePage <= res.payload.pages) {
                    this.importAllDeviceGroup = this.importAllDeviceGroup.concat(res.payload.data);
                    console.log("已导入请求了一次");
                    this.importDevicePage++;
                    setTimeout(function() {
                        _self.getImportDeviceInfoData()
                    }, 50)
                }
                this.importAllDeviceGroup.forEach((ele) => {
                    ele.label = ele.name;
                })
                // if (this.importDevicePage == 1) {
                //     this.importAllDeviceGroup = this.importAllDeviceGroup.concat(res.payload.data);
                //     this.importDeviceTotal = res.payload.total;
                //     this.importAllDeviceGroup.forEach((ele) => {
                //         ele.label = ele.name;
                //     })
                //     console.log(1111, this.importAllDeviceGroup)
                //     if (res.payload.total >= (this.importDevicePage * this.importDeviceSize)) {
                //         this.importDevicePage++;
                //         setTimeout(function() {
                //             _self.getImportDeviceInfoData();
                //         }, 50);
                //     }
                // }
            }, res => {
                this.message("error", res.message);
            })
        },
        // 确定导入方法
        dialogFormVisibleDetermine() {
            var arr = [];
            this.importAllDeviceGroup.forEach(function(ele) {
                arr.push(ele.id)
            })
            arr = [...new Set(arr)];
            this.$confirm('该操作会清空设备上所有广告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$esellApi.send("/company/proxy/importDevice.shtml", {
                    deviceIds: arr,
                    id: this.importDeviceId,
                    getoutdeviceIds: this.importDeviceGetOutId
                }, (res) => {
                    this.message("success", "导入成功")
                    this.dialogFormVisible = false
                    this.localData.page = 1;
                    this.importDevicePage = 1;
                    this.localData.size = 10;
                    this.importDeviceGetOutId = [];
                    this.importAllDeviceGroup = [];
                    this.localAllDeviceGroup = [];
                }, (res) => {
                    this.message("error", res.message)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //全选准备导入
        allToImportDevice() {
            var _self = this;
            var arr = [];
            this.localAllDeviceGroup.forEach(function(ele) {
                arr.push(ele.id)
            })
            if (this.localAllChecked) {
                var zhunbeilocalAllDeviceGroupNodes = this.$refs.tree1.getCheckedNodes();
                var zhunbeilocalAllDeviceGroupKeys = this.$refs.tree1.getCheckedKeys();
                this.$refs.tree1.setCheckedKeys(arr);
                this.localSelectedDeviceTotal = arr.length;
            } else {
                this.$refs.tree1.setCheckedKeys([]);
            }
        },
        //全选准备导出
        allToGetOut() {
            var _self = this;
            var arr = [];
            this.importAllDeviceGroup.forEach(function(ele) {
                arr.push(ele.id);
            })
            if (this.importAllChecked) {
                var zhunbeilocalAllDeviceGroupNodes = this.$refs.tree2.getCheckedNodes();
                var zhunbeilocalAllDeviceGroupKeys = this.$refs.tree2.getCheckedKeys();
                this.$refs.tree2.setCheckedKeys(arr);
            } else {
                this.$refs.tree2.setCheckedKeys([]);
            }
        },
        //导入已勾选值
        singleToImportDevice() {
            var _self = this;
            var localAllDeviceGroup = this.$refs.tree1.getCheckedNodes();
            localAllDeviceGroup.forEach((ele) => {
                _self.importAllDeviceGroup.push(ele);
            })
            this.importAllDeviceGroup = [...new Set(this.importAllDeviceGroup)];
        },
        //导出已勾选值
        singleToGetOut() {
            var _self = this;
            var importAllDeviceGroup = this.$refs.tree2.getCheckedNodes();
            importAllDeviceGroup.forEach(function(element, index) {
                _self.importDeviceGetOutId.push(element.id);
                _self.importAllDeviceGroup.forEach(function(ele, i) {
                    if (ele.id == element.id) {
                        _self.importAllDeviceGroup.splice(i, 1);
                    }
                })
            })
        },
        checkChangeTree1() {
            var importAllDeviceGroup = this.$refs.tree1.getCheckedNodes();
            this.localSelectedDeviceTotal = importAllDeviceGroup.length;

            if (importAllDeviceGroup.length == this.localAllDeviceGroup.length) {
                this.localAllChecked = true;
            } else {
                this.localAllChecked = false;
            }
        },
        checkChangeTree2() {
            var importAllDeviceGroup = this.$refs.tree2.getCheckedNodes();
            if (importAllDeviceGroup.length == this.importAllDeviceGroup.length) {
                this.importAllChecked = true;
            } else {
                this.importAllChecked = false;
            }
            // var importAllDeviceGroup = this.$refs.tree2.getCheckedNodes();
        },
        importDevice(row) {
            this.importDeviceId = row.id
            this.dialogFormVisible = true;
            this.localData.page = 1;
            this.localData.size = 10;
            this.importDeviceGetOutId = [];
            this.importAllDeviceGroup = [];
            this.localAllDeviceGroup = [];
            this.getLocalDeviceInfoData();
            this.getImportDeviceInfoData();
        }
    },
    watch: {
        localAllDeviceGroup: {
            handler: function(val, oldVal) {
                // console.log("watch监听的localAllDeviceGroup", val)
                var i = 0;
                val.forEach(function(ele) {
                    if (ele.checked) {
                        i++;
                    }
                })
                this.localSelectedDeviceTotal = i;
                if (this.localSelectedDeviceTotal == val.length) {
                    this.localAllChecked = true;
                } else {
                    this.localAllChecked = false;
                }
            },
            deep: true,
        },
        importAllDeviceGroup: {
            handler: function(val, oldVal) {
                console.log(val);
                var i = 0;
                val.forEach(function(ele) {
                    if (ele.checkeds) {
                        i++;
                    }
                })
                // this.localSelectedDeviceTotal = i;
                // if (this.localSelectedDeviceTotal == val.length) {
                //     this.localAllChecked = true;
                // } else {
                //     this.localAllChecked = false;
                // }
            },
            deep: true,
        },
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

.import-device-info {
    width: 100%;
    .import-device-left {
        width: 46%;
        .import-device-all-device {
            font-size: 16px;
            height: 40px;
        }
        .import-device-all-content {
            padding: 8px;
            box-sizing: border-box;
            height: 400px;
            width: 100%;
            border: 1px solid $sublineColor;
            .import-device-all-content-tree1 {
                margin-top: 20px;
                height: 300px;
                width: 100%;
                box-sizing: border-box;
                border: 1px solid #e5e5e5;
            }
            .import-device-all-content-tree2 {
                margin-top: 20px;
                height: 340px;
                overflow: auto;
            }
        }
        .import-device-info-footer {
            width: 100%;
            text-align: left;
            height: 30px;
            line-height: 30px;
            z-index: 99;
            background: #fff;
            border-top: 1px solid #e5e5e5;
            span:nth-child(1) {
                margin-left: 46px;
            }
            span:nth-child(2) {
                margin-left: 30px;
            }
        }
    }
    .import-device-center {
        position: relative;
        margin-top: 120px;
        width: 8%;
        padding: 0 15px;
        box-sizing: border-box;
        .import-device-operation {
            .one {
                width: 80%;
                height: 20px;
                border: 1px solid #999;
                border-radius: 3px;
                margin-top: 20px;
                cursor: pointer;
                text-align: center;
            }
        }
    }
    .import-device-right {
        width: 46%;
    }
}

.el-tree {
    border-color: transparent;
}

@media screen and (max-width: 1580px) {
    .import-device-all-content-tree-tree1 {
        height: 280px!important;
        overflow: auto;
    }
}
</style>


