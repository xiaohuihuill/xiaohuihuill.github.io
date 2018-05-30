

<template>
    <div class="device-manage">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span>设备管理</span>
            </span>
        </div>
        <div class="bottom">
            <div class="device-manage-condition">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">设备编号</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="advertisingManageData.uuid" placeholder="请填写设备编号" style="width:100%;"></el-input>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">设备名称</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="advertisingManageData.name" placeholder="请填写设备名称" style="width:100%;"></el-input>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%">
                                <div class="popularization-plan-info fl" style="width: 77px;">归属设备组</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-select clearable v-model="advertisingManageData.deviceGroup" placeholder="请选择归属设备组" style="width:100%">
                                        <el-option v-for="item in deviceGroupList" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">开放设备</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-select clearable v-model="advertisingManageData.publicDevice" placeholder="请选择开放设备" style="width:100%;">
                                        <el-option v-for="item in devicePublicStatus" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">所在地区</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-cascader clearable placeholder="请选择省市区" :options="province" filterable style="width:100%;" change-on-select v-model="advertisingManageData.province"></el-cascader>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%">
                                <div class="popularization-plan-info fl" style="width: 77px;">公司名称</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="advertisingManageData.companyName" placeholder="请填写公司名称" style="100%;"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">申请人</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="advertisingManageData.proposer" placeholder="请填写申请人" style="100%;"></el-input>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">联系人电话</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="advertisingManageData.linkman" placeholder="请填写联系人电话" style="100%;"></el-input>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%">
                                <div class="popularization-plan-info fl" style="width: 77px;">安装人</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="advertisingManageData.install" placeholder="请填写安装人" style="100%;"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="condition-search">
                             <a href="javascript:;" class="yxf-but" @click="serch" data-butflag="1522750564242">查询</a>
                            <a href="javascript:;" class="yxf-but" @click="cleanCondition">清空条件</a>
                        </div>
                    </div>
                    <div class="advertising-operation">
                        <a class="yxf-but advertising-operation-suspend" @click="addDevice" data-butflag="1522751852517">新增设备</a>
                        <a href="javascript:;" class="yxf-but advertising-operation-suspend" @click="showGroupList" data-butflag="1522750722040">批量新增到设备组</a>
                        <a href="javascript:;" class="yxf-but advertising-operation-delete" @click="removeGroupList" data-butflag="1522751985332">批量移出设备组</a>
                    </div>
                    <div>
                        <div class="row3 clearfix" v-on:click.prevent>
                            <div :class="[{'isActive':index==Index},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type" :key="index">
                                <span>{{item.name}}</span>
                            </div>
                        </div>
                        <Table @batchStartUsing="batchStartUsing" @screen="screen" @deviceInfor="deviceInfor" @edit="edit" @remove="remove" @addManyScreenAdv="addManyScreenAdv" @remoteControl="remoteControl" @playList="playList" @addAdv="addAdv" @removeGroup="removeGroup" :action="action" :enAction="enAction" :tableInfo="tableInfo" :tableData="tableData" :page="page" :pagesize="pagesize" :total="total" :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" :deviceInfoList="deviceInfoList" :showcontrol="true" :deviceInforStatus="deviceInforStatus" @sizeChange="sizeChange" @pageChange="pageChange" @closeDialog="closeDialog"></Table>
                    </div>
                </div>
            </div>
        </div>
        <!--弹出框添加到哪个设备组-->
        <el-dialog title="请选择添加到哪个设备组" :visible.sync="groupList" size="tiny">
            <div class="">
                <span>选择设备组</span>
                <span>
                    <el-select v-model="groupId" placeholder="请选择设备组">
                        <el-option v-for="item in deviceGroupList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="groupList = false">取 消</el-button>
                <el-button type="primary" @click="addGroup">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import Table from "../../components/table/fluidTable";
export default {
    name: "device-manage",
    components: {
        Table
    },
    data() {
        return {
            biaotou:[],
            action: [
                { name: "发布广告", dataButFlag:"1524733392302", callback: "addAdv"},
                // { name: "多屏广告", dataButFlag:"1524733392302", callback: "addManyScreenAdv" },
                { name: "播放列表", dataButFlag:"1522810284639", callback: "playList"},
                { name: "远程控制", dataButFlag:"1522752149314", callback: "remoteControl" },
                // { name: "截屏管理", dataButFlag:"", callback: "screen" },
                // { name: "设备信息", dataButFlag:"", callback: "deviceInfor" },
                { name: "编辑设备", dataButFlag:"1522753193021", callback: "edit" },
                { name: "删除设备", dataButFlag:"1522751788758", callback: "remove" },
                { name: "移出设备组", dataButFlag:"1522750783346", callback: "removeGroup" },
            ],
            enAction: [
                { name: "启用", callback: "open" },
                { name: "暂停", callback: "pause" },
                { name: "无法编辑删除", callback: "" },
            ],
            tableInfo: [
                {
                    label: "设备编号",
                    status: true,
                    prop: "uuid",
                },
                {
                    label: "设备名称",
                    status: true,
                    prop: "name",
                },
                {
                    label: "归属设备组",
                    status: true,
                    prop: "group-name",
                    init: '——'
                },
                {
                    label: "状态",
                    status: true,
                    prop: "status",
                    type: true,
                    class: "green"
                },
                {
                    label: "设备创建时间",
                    status: true,
                    prop: "create-time"
                },
                // {
                //     label: "心跳时间",
                //     status: true,
                //     prop: "heart-beat-time",
                //     // prop:"heartBeat-Time",
                //     init: '——'
                // },
                {
                    label: "地址",
                    status: true,
                    prop: "address",
                    init: '——'
                },
            ],
            tableData: [], //保存列表信息,
            formTheadOptions: ["设备编号", "设备名称", "归属设备组", "状态", '设备创建时间', '地址'], // 可选择表头
            checkboxVal: ["设备编号", "设备名称", "归属设备组", "状态", '设备创建时间', '地址'], // checkboxVal
            page: 1, //当前页
            pagesize: 10, //当前页的条数
            total: 99, //当前信息的总条数
            deviceStatus: { 'UNK': '未知', 'ONL': '在线', 'OFL': '离线', 'N': '已失效', 'INA': '未激活' },
            deviceInforStatus: false,
            deviceGroupList: [],//所有的设备组信息
            groupList: false,//批量添加到设备组
            is: true,
            bg: "advertising",
            checkedList: [],//保存选中的设备ID
            groupId: '',//保存选择的设备组
            advertisingManageData: {
                uuid: "",
                name: "",
                deviceGroup: "",
                publicDevice: "",
                province: "",
                companyName: "",
                proposer: "",
                linkman: "",
                install: "",

            },
            value: '',//弹出框里面的选择添加设备组
            isShow: true,
            active: 'all-advertising',
            isActive: true,
            Index: "0",
            typeArr:["all","ONL","OFL","INA",],
            type: [
                {
                    type: "all",
                    name: "全部设备",
                },
                {
                    type: "ONL",
                    name: "在线设备",
                },
                {
                    type: "OFL",
                    name: "离线设备",
                },
                {
                    type: "INA",
                    name: "未激活设备",
                }
            ],
            devicePublicStatus: [
                {
                    value: 'Y',
                    label: '开放'
                }, {
                    value: 'N',
                    label: '不开放'
                },
            ],
            deviceInfoList: [
                { "title": "设备编号", "info": "100000000001" },
                { "title": "设备名称", "info": "一楼广告机" },
                { "title": "所在地区", "info": "广东省深圳市宝安区" },
                { "title": "详细地址", "info": "航城创新创业园" },
                { "title": "设备模板", "info": "二分屏-横屏" },
                { "title": "设备实景图", "info": "" },
                { "title": "公有/私有", "info": "公有" },
                { "title": "归属用户", "info": "user(user), CCC(13510476255)" },
                { "title": "mac地址", "info": "1.1.1.1.1" },
                { "title": "状态", "info": "在线" },
                { "title": "到期时间", "info": "2017-10-17 18:05:02" },
                { "title": "最后上线时间", "info": "2017-10-16 18:05:02" },
                { "title": "apk版本", "info": "1.2.8.9" },
                { "title": "设备型号", "info": "菲尼特" },
                { "title": "屏幕尺寸", "info": "15.3寸" },
                { "title": "所属媒体", "info": "齐齐哈尔公交" },
                { "title": "分辨率", "info": "1920*1080" },
                { "title": "IP地址", "info": "192.1.1.1" },
                { "title": "可用空间", "info": "1G" },
                { "title": "当前音量", "info": "12" },
                { "title": "是否静音", "info": "否" }
            ],
            province: [],
        }
    },
    created() {
        this.Index=this.$route.query.number?this.$route.query.number:this.Index;
        this.getProvince()
        this.getInfor({
            'page': this.page,
            'size': this.pagesize,
            'uuid': this.advertisingManageData.uuid,
            'group-id': this.advertisingManageData.deviceGroup,
            'name': this.advertisingManageData.name,
            'open': this.advertisingManageData.publicDevice,
            'district-code': this.advertisingManageData.province[this.advertisingManageData.province.length - 1],
            'status': this.typeArr[this.Index],
            'applicant': this.advertisingManageData.proposer,
            'phone': this.advertisingManageData.linkman,
            'installer': this.advertisingManageData.install,
        });
        this.getGroup();
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        // 查询
        serch() {
            this.getInfor({
                'page': this.page,
                'size': this.pagesize,
                'uuid': this.advertisingManageData.uuid,
                'group-id': this.advertisingManageData.deviceGroup,
                'name': this.advertisingManageData.name,
                'open': this.advertisingManageData.publicDevice,
                'district-code': this.advertisingManageData.province[this.advertisingManageData.province.length - 1],
                'applicant': this.advertisingManageData.proposer,
                'phone': this.advertisingManageData.linkman,
                'installer': this.advertisingManageData.install,
                'status': this.advertisingManageData.status,
            });
        },
        // 重置查询条件
        cleanCondition() {
            this.advertisingManageData = {
                uuid: "",
                name: "",
                deviceGroup: "",
                publicDevice: "",
                province: [],
                companyName: "",
                proposer: "",
                linkman: "",
                install: "",
            }
        },
        addDevice() {
            this.$router.push({
                name: "addDevice",
                params: {
                    'groupInfor': this.deviceGroupList,
                    'province': this.province
                }
            });
        },
        addadvertising() {
            this.$router.push({ path: "/new_adv" });
        },
        // 状态查询
        makeActive(str, index) {
            this.advertisingManageData.status = str;
            this.Index = index;
            this.getInfor({
                'page': this.page,
                'size': this.pagesize,
                'uuid': this.advertisingManageData.uuid,
                'group-id': this.advertisingManageData.deviceGroup,
                'name': this.advertisingManageData.name,
                'open': this.advertisingManageData.publicDevice,
                'district-code': this.advertisingManageData.province[this.advertisingManageData.province.length - 1],
                'status': str,
                'applicant': this.advertisingManageData.proposer,
                'phone': this.advertisingManageData.linkman,
                'installer': this.advertisingManageData.install,
            });
        },
        getProvince() {
            this.$esellApi.send(
                "/district/list.shtml",
                {},
                res => {
                    this.province = res.payload;
                },
                res => {
                    this.$message({
                        type: "error",
                        message: res.message,
                    });
                }
            );
        },
        //批量添加到设备组
        addGroup() {
            if (this.groupId) {
                this.$esellApi.send(
                    "/device/in/group/batch.shtml",
                    {
                        'device-ids': this.checkedList,
                        'group-id': this.groupId
                    },
                    res => {
                        this.groupList = false;
                        this.getInfor({
                            'page': this.page,
                            'size': this.pagesize,
                            'uuid': this.advertisingManageData.uuid,
                            'group-id': this.advertisingManageData.deviceGroup,
                            'name': this.advertisingManageData.name,
                            'open': this.advertisingManageData.publicDevice,
                            'district-code': this.advertisingManageData.province[this.advertisingManageData.province.length - 1],
                            'status': this.typeArr[this.Index],
                            'applicant': this.advertisingManageData.proposer,
                            'phone': this.advertisingManageData.linkman,
                            'installer': this.advertisingManageData.install, 
                        });
                    },
                    res => {
                        this.$message({
                            type: "error",
                            message: res.message,
                        });
                    }
                );
            } else {
                this.$message({
                    type: 'error',
                    message: '请先选择需要加入的设备组'
                });
            }
        },
        // 显示设备组选项
        showGroupList() {
            if (this.checkedList.length > 0) {
                this.groupList = true;
            } else {
                this.$message({
                    type: 'error',
                    message: '请先选择需要设置的设备'
                });
            }
        },
         // 批量移出设备组
        removeGroupList(){
            if (this.checkedList.length > 0) {
                this.$esellApi.send(
                    "/device/out/group/batch.shtml",
                    {
                        'device-ids':this.checkedList
                    },
                    res => {
                        this.getInfor({
                            'page': this.page,
                            'size': this.pagesize,
                            'uuid': this.advertisingManageData.uuid,
                            'group-id': this.advertisingManageData.deviceGroup,
                            'name': this.advertisingManageData.name,
                            'open': this.advertisingManageData.publicDevice,
                            'district-code': this.advertisingManageData.province[this.advertisingManageData.province.length - 1],
                            'status': this.typeArr[this.Index],
                            'applicant': this.advertisingManageData.proposer,
                            'phone': this.advertisingManageData.linkman,
                            'installer': this.advertisingManageData.install, 
                        });
                    },
                    res => {
                        this.$message({
                            type: "error",
                            message: res.message,
                        });
                    }
                );
            } else {
                this.$message({
                    type: 'error',
                    message: '请先选择需要设置的设备'
                });
            }
        },
        // 关闭遮罩层
        closeDialog() {
            this.deviceInforStatus = false;
        },
        batchStartUsing(val) {
            let idArr = [];
            for (let i = 0; i < val.length; i++) {
                idArr.push(val[i].id);
            }
            this.checkedList = idArr;
        },
        // 页码改变
        pageChange(val) {
            this.page = val;
            this.getInfor({
                    'page': this.page,
                    'size': this.pagesize,
                    'uuid': this.advertisingManageData.uuid,
                    'group-id': this.advertisingManageData.deviceGroup,
                    'name': this.advertisingManageData.name,
                    'open': this.advertisingManageData.publicDevice,
                    'district-code': this.advertisingManageData.province[this.advertisingManageData.province.length - 1],
                    'status': this.typeArr[this.Index],
                    'applicant': this.advertisingManageData.proposer,
                    'phone': this.advertisingManageData.linkman,
                    'installer': this.advertisingManageData.install, 
            });
        },
        // 每页尺寸改变
        sizeChange(val) {
            this.pagesize = val;
            this.getInfor({
                'page': this.page,
                'size': this.pagesize,
                'uuid': this.advertisingManageData.uuid,
                'group-id': this.advertisingManageData.deviceGroup,
                'name': this.advertisingManageData.name,
                'open': this.advertisingManageData.publicDevice,
                'district-code': this.advertisingManageData.province[this.advertisingManageData.province.length - 1],
                'status': this.typeArr[this.Index],
                'applicant': this.advertisingManageData.proposer,
                'phone': this.advertisingManageData.linkman,
                'installer': this.advertisingManageData.install, 
            });
        },
        // 发布广告
        addAdv(data) {
            this.$router.push({ name: 'deviceToAdv', query: { 'type': '1', 'num': data.id, 'name': data.name } })
        },
        addManyScreenAdv(data){
            this.$router.push({ name: 'deviceToManyScreenAdv', query: { 'type': '1', 'num': data.id, 'name': data.name } });
        },
        // 播放列表
        playList(data) {
            this.$router.push({ path: "/dev_mag/examine_playlist", query: { 'num': data.id ,"biaotou":this.biaotou}})
        },
        //远程控制
        remoteControl(data) {
            if(data.status=="在线"){
                this.$router.push({ path: "/dev_mag/remote_control", query: { 'id': data.id } })
            }else{
                this.$message({
                    type: "error",
                    message: '非在线设备，无法进行远程控制',
                });
            }
        },
        // 截屏管理
        screen() {
            this.$router.push({ path: '/dev_mag/scree_shot_mag_dev' })
        },
        // 查看设备信息
        deviceInfor(data) {
            this.deviceInforStatus = true;
        },
        // 编辑
        edit(data) {
            this.$router.push({
                name: "editDevice",
                params: {
                    'groupInfor': this.deviceGroupList,
                    'province': this.province,
                    'id': data.id,
                }
            });
        },
        // 删除
        remove(data) {
            this.$confirm('此操作将解除设备的绑定, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$esellApi.send(
                    "/device/delete.shtml",
                    {
                        id: data.id
                    },
                    res => {
                        this.getInfor({
                            'page': this.page,
                            'size': this.pagesize,
                            'uuid': this.advertisingManageData.uuid,
                            'group-id': this.advertisingManageData.deviceGroup,
                            'name': this.advertisingManageData.name,
                            'open': this.advertisingManageData.publicDevice,
                            'district-code': this.advertisingManageData.province[this.advertisingManageData.province.length - 1],
                            'status': this.typeArr[this.Index],
                            'applicant': this.advertisingManageData.proposer,
                            'phone': this.advertisingManageData.linkman,
                            'installer': this.advertisingManageData.install, 
                        });
                        this.$message({
                            type: 'success',
                            message: '解除成功'
                        });
                    },
                    res => {
                        this.$message({
                            type: "error",
                            message: res.message,
                        });
                    }
                );
            }).catch(() => {
            });
        },
        //移出设备组
        removeGroup(data) {

            if(!data['group-name'] || data['group-name'] == "undefined" || data['group-name'].length===0){
                this.$message({
                            type: 'error',
                            message: '移除失败：该设备还未加入任何设备组'
                        });
                return;
            }

            this.$confirm('此操作将把设备从设备组移出, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$esellApi.send(
                    "/device/out/group.shtml",
                    {
                        'device-id': data.id
                    },
                    res => {
                        this.getInfor({
                            'page': this.page,
                            'size': this.pagesize,
                            'uuid': this.advertisingManageData.uuid,
                            'group-id': this.advertisingManageData.deviceGroup,
                            'name': this.advertisingManageData.name,
                            'open': this.advertisingManageData.publicDevice,
                            'district-code': this.advertisingManageData.province[this.advertisingManageData.province.length - 1],
                            'status': this.typeArr[this.Index],
                            'applicant': this.advertisingManageData.proposer,
                            'phone': this.advertisingManageData.linkman,
                            'installer': this.advertisingManageData.install, 
                        });
                        this.$message({
                            type: 'success',
                            message: '移出成功'
                        });
                    },
                    res => {
                        this.$message({
                            type: "error",
                            message: res.message,
                        });
                    }
                );
            }).catch(() => {
            });
        },
        // 获取设备组信息
        getGroup() {
            this.$esellApi.send(
                "/group/options.shtml",
                {},
                res => {
                    this.deviceGroupList = res.payload
                },
                res => {
                    this.$message({
                        type: "error",
                        message: res.message,
                    });
                }
            );

        },
        getInfor(data) {
            this.$esellApi.send(
                "/device/list.shtml",
                data,
                res => {
                    this.total = res.payload.total;
                    var data = res.payload.data;
                    for (var i = 0; i < data.length; i++) {
                        if (this.deviceStatus[data[i].status]) {
                            data[i].status = this.deviceStatus[data[i].status]
                        } else {
                            data[i].status = "未知";
                        }
                    }
                    this.tableData = data;
                    this.$esellApi.checkPermissions(200);
                },
                res => {
                    this.$message({
                        type: "error",
                        message: res.message,
                    });
                }
            );
        },
    },
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


