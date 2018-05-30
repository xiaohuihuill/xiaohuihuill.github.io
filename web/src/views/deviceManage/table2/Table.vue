<template>
    <div class="app-container">
        <!--控制动态表格-->
        <el-popover ref="popover5" placement="left" width="80">
            <div class="filter-container" style="width:80px;">
                <h3>显示列</h3>
                <el-checkbox-group v-model="checkboxVal">
                    <div style="margin:10px 0;" v-for="(item,index) in formTheadOptions" :key="item">
                        <el-checkbox :label='item'>{{item}}</el-checkbox>
                    </div>
                </el-checkbox-group>
            </div>
        </el-popover>
        <!--控制动态表格按钮-->
        <a href="javascript:;" class="yxf-but controllerColumn" v-popover:popover5>设置列表</a>
        <!--动态表格数据-->
        <el-table :data="tableData" :key='key' border fit highlight-current-row style="width: 100%">
            <el-table-column type="selection" width="48" align="center">
            </el-table-column>
            <el-table-column :key='fruit' v-for='(fruit,index) in formThead' :label="fruit">
                <template slot-scope="scope">
                    <div v-html="scope.row[fruit]" :class="[scope.row[fruit]=='在线'?'yes':'']"></div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="290">
                <template slot-scope="scope">
                    <div class="file-operation-other clearfix">
                        <a class="blue fl" @click="issueAdvertising(scope.row)">发布广告</a>
                        <a class="blue fl" @click="playList(scope.row)">播放列表</a>
                        <a class="blue fl" @click="remoteControl(scope.row)">远程控制</a>
                        <a class="blue fl" @click="ScreencaptureManage(scope.row)">截屏管理</a>
                        <a class="blue fl" @click="upload(scope.row)">上传实景图</a>
                        <a class="blue fl" @click="deviceInfo(scope.row),dialogVisible = true">设备信息</a>
                        <a class="blue fl" @click="shiftOutDeviceGroup(scope.row)">移出设备组</a>
                        <a class="blue fl" @click="edit(scope.row)">编辑</a>
                        <a class="blue fl" @click="delete1(scope.row)">删除</a>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="paging" v-if="ishide" style="text-align: center;margin-top:20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="pagesize" :page-sizes='[10,20]' layout="total, sizes, prev, pager, next, jumper" :total="100">
            </el-pagination>
        </div>
        <!--设备信息-->
        <el-dialog title="设备信息" :visible.sync="dialogVisible" width="30%">
            <div class="device-info">
                <div style="width:100%;height:100%;border:1px solid #e5e5e5;border-bottom:none">
                    <div class="clearfix" style="width:100%" v-for="(item,index) in deviceInfoList" :key="index">
                        <div class="fl" style="padding:0 20px;width:20%;height:34px;line-height:34px;border-right:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;box-sizing:border-box">{{item.title}}</div>
                        <div class="fl" style="padding:0 20px;width:80%;height:34px;line-height:34px;box-sizing:border-box;border-bottom:1px solid #e5e5e5">{{item.info}}</div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
const defaultFormThead = ['设备编号', '设备名称', '归属设备组', '设备实景图', '状态', '设备创建时间', '广告推送情况', '地址', '设备到期时间'] // 默认选中项
export default {
    data() {
        return {
            isShow: false,
            ishide: true,
            dialogVisible: false,
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
            shiftOut: false,//dialog移出设备组
            // 列表数据
            tableData: [
                {
                    "设备编号": '1000000001',
                    "设备名称": '航城创新创业园',
                    "归属设备组": '默认设备组',
                    "设备实景图": "",
                    "状态": '在线',
                    "设备创建时间": '',
                    "广告推送情况": '下载中:10<br>下载失败:10<br>播放中:10<br>',
                    "地址": '广东省-深圳市-宝安区-航城大道航城创新创业园A1栋3A05室',
                    "设备到期时间": '2017-11-24 12:12:10<br>已过期',
                },
                {
                    "设备编号": '1000000001',
                    "设备名称": '航城创新创业园',
                    "归属设备组": '默认设备组',
                    "设备实景图": "",
                    "状态": '在线',
                    "设备创建时间": '',
                    "广告推送情况": '下载中:10<br>下载失败:10<br>播放中:10<br>',
                    "地址": '广东省-深圳市-宝安区-航城大道航城创新创业园A1栋3A05室',
                    "设备到期时间": '2017-11-24 12:12:10<br>已过期',
                },
                {
                    "设备编号": '1000000001',
                    "设备名称": '航城创新创业园',
                    "归属设备组": '默认设备组',
                    "设备实景图": "",
                    "状态": '在线',
                    "设备创建时间": '',
                    "广告推送情况": '下载中:10<br>下载失败:10<br>播放中:10<br>',
                    "地址": '广东省-深圳市-宝安区-航城大道航城创新创业园A1栋3A05室',
                    "设备到期时间": '2017-11-24 12:12:10<br>已过期',
                },
                {
                    "设备编号": '1000000001',
                    "设备名称": '航城创新创业园',
                    "归属设备组": '默认设备组',
                    "设备实景图": "",
                    "状态": '在线',
                    "设备创建时间": '',
                    "广告推送情况": '下载中:10<br>下载失败:10<br>播放中:10<br>',
                    "地址": '广东省-深圳市-宝安区-航城大道航城创新创业园A1栋3A05室',
                    "设备到期时间": '2017-11-24 12:12:10<br>已过期',
                },
                {
                    "设备编号": '1000000001',
                    "设备名称": '航城创新创业园',
                    "归属设备组": '默认设备组',
                    "设备实景图": "",
                    "状态": '在线',
                    "设备创建时间": '',
                    "广告推送情况": '下载中:10<br>下载失败:10<br>播放中:10<br>',
                    "地址": '广东省-深圳市-宝安区-航城大道航城创新创业园A1栋3A05室',
                    "设备到期时间": '2017-11-24 12:12:10<br>已过期',
                }],
            key: 1, // table key
            formTheadOptions: ['设备编号', '设备名称', '归属设备组', '设备实景图', '状态', '设备创建时间', '广告推送情况', '地址', '设备到期时间'], // 可选择表头
            checkboxVal: defaultFormThead, // checkboxVal
            formThead: defaultFormThead // 默认表头
        }
    },
    watch: {
        checkboxVal(valArr) {
            this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
            this.key = this.key + 1// 为了保证table 每次都会重渲 （牺牲性能保证效果，当然也可以不用）
        }
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        toggle() {
            this.isShow = !this.isShow;
        },
        // 发布广告
        issueAdvertising(row) {
            this.$router.push({ path: '/devgroup_mag/issue_adv' })
        },
        // 播放列表
        playList(row) {
            this.$router.push({ path: "/dev_mag/examine_playlist" })
        },
        // 远程控制
        remoteControl(row) {
            this.$router.push({ path: '/dev_mag/remote_control' })
        },
        // 截屏管理
        ScreencaptureManage(row) {
            this.$router.push({ path: '/dev_mag/scree_shot_mag_dev' })
        },
        // 设备信息
        deviceInfo(row) {
            // this.deviceInfoList = row;
            // console.log(row);
        },
        // 移出设备组
        shiftOutDeviceGroup(row) {
            this.$confirm('此操作将移除设备组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 修改
        edit(id) {
            this.$router.push({ path: "/dev_mag/edit_dev" });
        },
        // 删除  不能用delete(关键词)
        delete1(id) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>
<style scoped lang="scss">
.app-container {
    position: relative;
}

.file-operation-file {
    padding: 0 30px;
    div {
        font-size: 13px;
        color: #6baef3;
    }
    .edit {}
    .delete {
        margin-left: 5px;
    }
}

.file-operation-other {
    div {
        cursor: pointer;
        margin-left: 14px;
        font-size: 13px;
        color: #6baef3;
    }
    .shear {}
    .copy {}
    .edit {}
    .delete1 {}
}

.controllerColumn {
    position: absolute;
    top: -85px;
    right: 0;
    z-index: 2;
}

.file-operation-othe {
    a {
        margin-right: 6px;
    }
    a:last-child {
        margin-right: 0;
    }
}

.blue {
    margin-right: 10px;
}
</style>
