<template>
    <div class="device-group-manager">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span>设备组管理</span>
            </span>
        </div>
        <div class="bottom">
            <div style="padding:20px;background:#f5f5f5">
                <div style="">
                    <div class="clearfix" style="width:100%">
                        <div class=" clearfix fl" style="width:32.33%;margin-right:1%;height:30px;line-height:30px;">
                            <div class=" fl" style="width: 77px;">设备组名称</div>
                            <div class=" fl" style="width:71%">
                                <el-input v-model="searchList.groupName" placeholder="请填写设备组名称" style="width:100%;"></el-input>
                            </div>
                        </div>
                        <div class=" clearfix fl" style="width:32.33%;height:30px;line-height:30px;">
                            <div class=" fl" style="width: 77px;">设备模板</div>
                            <div class=" fl" style="width:71%">
                                <el-select clearable v-model="searchList.tempId" placeholder="请选择设备模板" style="width:100%">
                                    <el-option v-for="item in tempList" :key="item.value" :label="item.name" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="condition-search" style="margin:14px 0 0 77px;">
                    <a href="javascript:;" class="yxf-but" @click="search" style="margin-left:6px;" data-butflag="1522749206641">查询</a>
                    <a href="javascript:;" class="yxf-but" @click="cleanSearchList">清空条件</a>
                </div>
            </div>
            <div class="device-group-manager-options">
                <a href="javascript:;" class="yxf-but" @click="newDeviceGroup" data-butflag="1522749426952">
                    新建设备组
                </a>
                <a href="javascript:;" class="yxf-but" data-butflag="1524478453129" @click="batchRemove">批量删除</a>
            </div>
            <div class="home-fenyeCon">
                <Table @batchStartUsing="batchStartUsing" @addAdv="addAdv" @playList="playList" @remoteControl="remoteControl" @synPlay="synPlay" @showDevice="showDevice" @addDevice="addDevice" @screen="screen" @editGroup="editGroup" @deleteGroup="deleteGroup" :action="action" :enAction="enAction" :tableInfo="tableInfo" :tableData="tableData" :page="page" :pagesize="pagesize" :total="total" :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" :deviceInfoList="deviceInfoList" :deviceInforStatus="deviceInforStatus" :showcontrol="true" @sizeChange="sizeChange" @pageChange="pageChange" @closeDialog="closeDialog"></Table>
            </div>
        </div>
    </div>
</template>
<script>
import Table from "../../components/table/fluidTable";
export default {
    name: 'device-manager',
    components: {
        Table
    },
    data() {
        return {
            biaotou: [],
            searchList: {
                groupName: "",
                tempId: "",
            },
            enAction: [
                { name: "发布广告", dataButFlag: "1522749696026", callback: "addAdv" },
                { name: "播放列表", dataButFlag: "1522750159224", callback: "playList" },
                { name: "远程控制", dataButFlag: "1522750269761", callback: "remoteControl" },
                { name: "同步播放", dataButFlag: "1522750476803", callback: "synPlay" },
                { name: "查看设备", dataButFlag: "1522750503585", callback: "showDevice" },
                { name: "添加设备", dataButFlag: "1522750646060", callback: "addDevice" },
                // { name: "截屏管理", callback: "screen" },
                { name: "编辑设备组", dataButFlag: "1522750857360", callback: "editGroup" },
                { name: '默认设备组不可删除', dataButFlag: "1522750891939", callback: "", },
            ],
            action: [
                { name: "发布广告", dataButFlag: "1522749696026", callback: "addAdv" },
                { name: "播放列表", dataButFlag: "1522750159224", callback: "playList" },
                { name: "远程控制", dataButFlag: "1522750269761", callback: "remoteControl" },
                { name: "同步播放", dataButFlag: "1522750476803", callback: "synPlay" },
                { name: "查看设备", dataButFlag: "1522750503585", callback: "showDevice" },
                { name: "添加设备", dataButFlag: "1522750646060", callback: "addDevice" },
                // { name: "截屏管理", callback: "screen" },
                { name: "编辑设备组", dataButFlag: "1522750857360", callback: "editGroup" },
                { name: "删除设备组", dataButFlag: "1522750891939", callback: "deleteGroup" },
            ],
            tableInfo: [
                {
                    label: "设备组名称",
                    status: true,
                    prop: "name",
                    init: '——'
                },
                {
                    label: "设备模板",
                    status: true,
                    prop: "template-name",
                    init: '——'
                },
                {
                    label: "总数",
                    status: true,
                    prop: "nums",
                    init: '0'
                },
                {
                    label: "在线数",
                    status: true,
                    prop: "onlines",
                    style: true,
                    class: "green",
                    init: '0'
                },
                {
                    label: "离线数",
                    status: true,
                    prop: "offlines",
                    init: '0'
                },
            ],
            tableData: [], //保存列表信息,
            formTheadOptions: ['设备组名称', '设备模板', '总数', '在线数', '离线数'], // 可选择表头
            checkboxVal: ['设备组名称', '设备模板', '总数', '在线数', '离线数'], // checkboxVal
            page: 1, //当前页
            pagesize: 10, //当前页的条数
            total: 99, //当前信息的总条数
            tempList: "",//模板列表
            checkedGroup: [],//保存选择的设备组
        }
    },
    methods: {
        // 新增设备组
        newDeviceGroup() {
            this.$router.push({ path: "/devgroup_mag/new_devgroup" })
        },
        // 查询
        search() {
            this.getInfor({ 'page': this.page, 'size': this.pagesize, 'name': this.searchList.groupName, 'template-id': this.searchList.tempId });
        },
        // 清空查询
        cleanSearchList() {
            this.searchList = {
                groupName: "",
                tempId: "",
            }
        },
        // 发布广告
        addAdv(data) {
            this.$router.push({ path: '/devgroup_mag/issue_adv', query: { 'num': data.id } });
        },
        // 播放列表
        playList(data) {
            this.$router.push({ path: "/devgroup_mag/examine_play_list", query: { 'num': data.id } });
        },
        // 远程控制
        remoteControl(row) {
            if (row.onlines > 0) {
                this.$router.push({ path: "/devgroup_mag/remote_control", query: { id: row.id, router_type: "dev_group" } });
            } else {
                this.$message({
                    type: "error",
                    message: '该设备组无在线设备，无法远程控制',
                });
            }
        },
        // 同步播放
        synPlay(data) {
            this.$confirm('您确定要修改同步状态吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$esellApi.send(
                    "/group/sync.shtml",
                    {
                        'id': data.id,
                    },
                    res => {
                        this.$message({
                            type: 'success',
                            message: '同步操作成功'
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
                this.$message({
                    type: 'info',
                    message: '取消修改!'
                });
            });
        },
        // 批量删除
        batchRemove() {
            console.log(this.checkedGroup)
            if (this.checkedGroup.length > 0) {
                let groupIdArr = [];
                for (let i = 0; i < this.checkedGroup.length; i++) {
                    groupIdArr.push(this.checkedGroup[i].id)
                }
                this.$esellApi.send(
                    "/group/delete/batch.shtml",
                    { 'ids': groupIdArr },
                    res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.getInfor({ 'page': this.page, 'size': this.pagesize, 'name': this.searchList.groupName, 'template-id': this.searchList.tempId });
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
                    message: '请先选择需要操作的设备组!'
                });
            }
        },
        // 全选单选切换
        batchStartUsing(data) {
            this.checkedGroup = data;
        },
        // 查看设备
        showDevice(data) {
            this.$router.push({ path: "/devgroup_mag/examine_dev", query: { 'num': data.id } });
        },
        // 新增设备
        addDevice(data) {
            this.$router.push({ path: '/devgroup_mag/add_dev', query: { 'num': data.id } });
        },
        // 截屏管理
        screen(data) {
            this.$router.push({ path: "/devgroup_mag/screen_shot_mag" })
        },
        //编辑设备组
        editGroup(data) {
            console.log(data)
            this.$router.push({ name: "EditGroup", query: { 'type': data['default-value'], "num": data.id, 'name': data.name, 'tempNum': data['template-id'] } });
        },
        // 删除设备组
        deleteGroup(data) {
            this.$confirm('此操作将永久删除该设备组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$esellApi.send(
                    "/group/delete.shtml",
                    { 'id': data.id },
                    res => {
                        this.$message({
                            type: 'success',
                            message: '删除成功'
                        });
                        this.getInfor({ 'page': this.page, 'size': this.pagesize, 'name': this.searchList.groupName, 'template-id': this.searchList.tempId });
                    },
                    res => {
                        this.$message({
                            type: "error",
                            message: res.message,
                        });
                    }
                );
            }).catch(() => {
                // 失败操作
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 分页改变
        sizeChange(val) {
            this.pagesize = val;
            this.getInfor({ 'page': this.page, 'size': this.pagesize, 'name': this.searchList.groupName, 'template-id': this.searchList.tempId });
        },
        pageChange(val) {
            this.page = val;
            this.getInfor({ 'page': this.page, 'size': this.pagesize, 'name': this.searchList.groupName, 'template-id': this.searchList.tempId });
        },
        // 获取设备组列表
        getInfor(data) {
            this.$esellApi.send(
                "/group/list.shtml",
                data,
                res => {
                    this.tableData = res.payload.data;
                    this.total = res.payload.total;
                    this.$esellApi.checkPermissions(1);
                },
                res => {
                    this.$message({
                        type: "error",
                        message: res.message,
                    });
                }
            );
        },
        // 获取模板信息
        getTempInfor() {
            this.$esellApi.send(
                "/template/options.shtml",
                {},
                res => {
                    this.tempList = res.payload;
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
    created() {
        this.getInfor({ 'page': this.page, 'size': this.pagesize });
        this.getTempInfor();
    },
    watch:{
        
    }
}
</script>
<style lang="scss" scoped>
@import '../../sass/deviceGroupManage.scss';
</style>

