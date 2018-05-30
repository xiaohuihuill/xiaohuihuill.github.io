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
        <div style="width:100%;overflow-y:auto;">
            <el-table :data="tableData" :key='key' border fit highlight-current-row style="min-width:1200px">
                <el-table-column type="selection" width="48" align="center">
                </el-table-column>
                <el-table-column :prop="fruit" :key='fruit' v-for='(fruit,index) in formThead' :label="fruit" :sortable="fruit=='总数'||fruit=='在线数'||fruit=='离线数'">
                    <template slot-scope="scope">
                        {{scope.row[fruit]}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="280">
                    <template slot-scope="scope">
                        <div class="file-operation-other clearfix">
                            <a class="blue fl" data-butflag="1522749696026" @click="issueAdvertising(scope.row)">发布广告</a>
                            <a class="blue fl" data-butflag="1522750159224" @click="playList(scope.row)">播放列表</a>
                            <a class="blue fl" data-butflag="1522750269761" @click="remoteControl(scope.row)">远程控制</a>
                            <a class="blue fl" data-butflag="1522750476803" @click="synchronizedBroadcast(scope.row)">同步播放</a>
                            <a class="blue fl" data-butflag="1522750503585" @click="examineDevice(scope.row)">查看设备</a>
                            <a class="blue fl" data-butflag="1522750646060" @click="addDevice(scope.row)">添加设备</a>
                            <a class="blue fl"  @click="ScreencaptureManage(scope.row)">截屏管理</a>
                            <a class="fl" data-butflag="1522750891939" @click="delete1(scope.row)">不可编辑删除</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paging" v-if="ishide" style="text-align: center;margin-top:20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="pagesize" :page-sizes='[10,20]' layout="total, sizes, prev, pager, next, jumper" :total="100">
            </el-pagination>
        </div>
        <!--设备信息-->
        <el-dialog title="设备信息" :visible.sync="dialogVisible" width="30%">
            <div class="device-info">
                <div v-for="(item,index) in deviceInfoList" :key="index" style="margin-top:10px;">
                    <span style="min-width:80px;" class="display">{{index}}:</span>
                    <span>{{item}}</span>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
const defaultFormThead = ['设备组名称', '屏幕类型', '设备模板', '总数', '在线数', '离线数'] // 默认选中项
export default {
    data() {
        return {
            deviceInfoList: "",
            dialogVisible: false,
            isShow: false,
            ishide: true,
            // 列表数据
            tableData: [
                {
                    "type": 'A',
                    "设备组名称": '默认横屏组',
                    "屏幕类型": '横屏',
                    "设备模板": '全屏-横屏',
                    "总数": '10001',
                    "在线数": '1111',
                    "离线数": '11'
                },
                {
                    "type": 'A',
                    "设备组名称": '默认竖屏组',
                    "屏幕类型": '竖屏',
                    "设备模板": '全屏-横屏',
                    "总数": '10004',
                    "在线数": '2222',
                    "离线数": '12'
                },
                {
                    "type": 'B',
                    "设备组名称": '设备组1',
                    "屏幕类型": '横屏',
                    "设备模板": '全屏-横屏',
                    "总数": '10003',
                    "在线数": '3333',
                    "离线数": '13'
                }
            ],
            key: 1, // table key
            formTheadOptions: ['设备组名称', '屏幕类型', '设备模板', '总数', '在线数', '离线数'], // 可选择表头
            checkboxVal: defaultFormThead, // checkboxVal
            formThead: defaultFormThead // 默认表头
        }
    },
    watch: {
        checkboxVal(valArr) {
            this.$esellApi.checkPermissions();
            this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
            this.key = this.key + 1// 为了保证table 每次都会重渲 （牺牲性能保证效果，当然也可以不用）
        }
    },
    mounted() {
        console.log(this.checkboxVal);
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
            this.$router.push({ path: "/devgroup_mag/examine_play_list" })
        },
        // 远程控制
        remoteControl(row) {
            this.$router.push({ path: "/devgroup_mag/remote_control" })
        },
        // 截屏管理
        ScreencaptureManage(row) {
            this.$router.push({ path: "/devgroup_mag/screen_shot_mag" })
        },
        // 同步播放
        synchronizedBroadcast(row) {
            this.$confirm('您确定要修改同步状态吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消修改!'
                });
            });
        },
        // 查看设备
        examineDevice(row) {
            this.$router.push({ path: "/devgroup_mag/examine_dev" })
        },
        // 添加设备
        addDevice(row) {
            this.$router.push({ path: '/devgroup_mag/add_dev' })
        },
        // 修改
        edit(row) {
            this.$router.push({ path: "/devgroup_mag/remote_control" });
            console.log(id);
        },
        // 删除  不能用delete(关键词)
        delete1(row) {
            console.log(id);
            // 提示可直接使用
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 成功操作
                this.list.forEach((v, i) => {
                    if (i == row) {
                        this.list.splice(row, 1);
                    }
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                // 失败操作
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
    top: -50px;
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
