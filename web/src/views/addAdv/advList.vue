<template>
    <div class="bottom">
        <div class="tabs clearfix">
            <div class="tabs-advertising">
                <div class="fl" style="cursor:pointer" :class="{'active':soltNum==index}" @click="chenkedSolt(item.value,index)" v-for="(item,index) in soltArr" :key="index">{{item.name}} - {{item.label}}</div>
            </div>
        </div>
        <div class="row3 clearfix">
            <div class="left cf">
                <div :class="[{'isActive':index==show},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in solttype" :key="index">
                    <span>{{item.name}}</span>
                </div>
            </div>
            <div class="right cf">
                <div class="clearfix">
                    <div>
                        <!-- type==2 is group -->
                        <a href="javascript:;" class="yxf-but" @click="pauseList" :data-butflag="type==2 ? 1524469670064 : 1522813937579">批量暂停</a>
                        <!-- <a style="margin-left:10px;" href="javascript:;" class="yxf-but" @click="openList">批量开启</a> -->
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Table :tableInfo="biaotou" @open="open" @pause="pause" @setPlayNum="setPlayNum" @moveUp="moveUp" @moveDown="moveDown" @moveTo="moveTo" @first="first" @last="last" :action="action" :enAction="enAction" :biaotou="biaotou" :tableData="tableData" :page="page" :pagesize="pagesize" :total="total" :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" :deviceInfoList="deviceInfoList" :deviceInforStatus="deviceInforStatus" :showcontrol="true" @sizeChange="sizeChange" @pageChange="pageChange" @closeDialog="closeDialog" @batchStartUsing="batchStartUsing" ></Table>
        </div>
        <!--设置播放次数-->
        <el-dialog title="设置播放次数" :visible.sync="setPlay" size="tiny">
            <div>
                <span>播放次数</span>
                <el-radio-group v-model="playTpye" @change="changeType">
                    <el-radio :label="0">不限</el-radio>
                    <el-radio :label="1">播放</el-radio>
                </el-radio-group>
                <span>
                    &nbsp;
                    <el-input-number v-model="playNum" placeholder="请输入次数" :disabled="canSetNum" @change="playNumChange" :min="1" :max="1000"></el-input-number>
                    &nbsp;次
                </span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="setPlay = false">取 消</el-button>
                <el-button type="primary" @click="savePayNum">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import store from '@/store/index'
import Table from "../../components/table/fluidTable";
export default {
    components: {
        Table,
    },
    props:["type"],
    data() {
        return {
            addExternalAdvertising: false,//增加外部广告坑位
            setPlay: false,//设置播放次数
            soltNum: "0",//默认展示广告参数
            isActive: true,
            soltArr: [],//保存广告位信息
            groupId: '',//保存设备组ID
            deviceId: '',//保存设备的ID
            soltId: '',//保存当前选择的广告位ID
            listType: 1,//播放列表类型，1--轮播播放列表    2--紧急广告列表   3--定时播放列表
            action: [
                // { name: "开启", callback: "open" },
                { name: "暂停", callback: "pause", dataButFlag: this.type==2 ? "1524469725449":"1522813649176" },
                { name: "上移", callback: "moveUp", dataButFlag: this.type==2 ? "1524464232423":"1522816671555" },
                { name: "下移", callback: "moveDown", dataButFlag: this.type==2 ? "1524464511391":"1522821718626" },
                // { name: "移动到", callback: "moveTo" },
                { name: "置顶", callback: "first", dataButFlag: this.type==2 ? "1524464574549":"1522827293503" },
                { name: "末尾", callback: "last", dataButFlag: this.type==2 ? "1524464621742":"1522827319897" },
                // { name: "设置播放次数", callback: "setPlayNum" },
            ],
            tableData: [], //保存列表信息,
            formTheadOptions: [], // 可选择表头
            checkboxVal: [], // checkboxVal
            page: 1, //当前页
            pagesize: 10, //当前页的条数
            total: 99, //当前信息的总条数
            advStatus: ['', '待审核', '审核不通过', '待播放', '投放中', '暂停中', '已过期', '已删除'],//保存广告状态
            downloadStatus: { '0': '未下载', '1': '下载中', '-1': '下载失败', '2': '下载完成' },
            solttype: [
                {
                    type: "1",
                    name: "轮播列表",
                },
                // {
                //     type: "2",
                //     name: "紧急列表",
                // }, 
            ],
            show: 0,//保存选择的展示页
            checkedList: [],//选中id
            playTpye: 0,//是否设置播放次数
            canSetNum: true,//是否能输如播放次数
            playNum: '',//设置的播放次数
            advId: '',//当前点击行的广告ID
            saveNum: '',//发送到后台的数据
            anyUrl: '',//发送请求的地址
            biaotou:[],
        };
    },
    created() {
        // console.log(12,this.$store.getters.getDeviceGroupListHeader);
        if (this.type == 1) {
            this.groupId = '';
            this.deviceId = this.$route.query.num;
            this.anyUrl = '/ad/list/device.shtml';
            this.biaotou = this.$store.getters.getDeviceListHeader;
            this.formTheadOptions=['广告编号', '广告名称', '预览图', '展现量', "播放状态", '时长', '播放次数', '下载状态'];
            this.checkboxVal=['广告编号', '广告名称', '预览图', '展现量', "播放状态", '时长', '播放次数', '下载状态'];
        } else {
            this.deviceId = '',
            this.groupId = this.$route.query.num;
            this.anyUrl = '/ad/list/group.shtml';
            this.biaotou = this.$store.getters.getDeviceGroupListHeader
            this.formTheadOptions=['广告编号', '广告名称', '预览图', '展现量', "播放状态", '时长', '播放次数'];
            this.checkboxVal=['广告编号', '广告名称', '预览图', '展现量', "播放状态", '时长', '播放次数'];
        }
        this.getSoltId();
        console.log(this.biaotou)
    },
    mounted() {
        
        console.log(11111111111111111,)
    },
    methods: {
        // 点击的某一天函数由组件内传递出来的参数
        picked(year, month, date) {
            this.$router.push({ path: '/devgroup_mag/play_list/timed_play_list' });
        },
        // 设置播放次数
        setPlayNum(data) {
            this.setPlay = true;
            this.advId = data.id
        },
        // 播放次数值改变
        playNumChange(val) {
            this.saveNum = val;
        },
        // 切换是否设置播放次数
        changeType(val) {
            console.log(val, this.playNum)
            this.playTpye = val;
            if (val < 1) {
                this.canSetNum = true;
            } else {
                this.canSetNum = false;
            }
        },
        // 保存设置的播放次数
        savePayNum(data) {
            if (this.playTpye < 1) {
                this.saveNum = -1
            } else {
                this.saveNum = this.playNum;
            }
            if (this.type == 2) {
                var url = "/group/pay/num.shtml"
            } else {
                var url = "/device/pay/num.shtml"
            }
            this.$esellApi.send(
                url,
                { 'group-id': this.groupId, 'device-id': this.deviceId, 'ad-id': this.advId, 'pay-num': this.saveNum },
                res => {
                    this.setPlay = false;
                    this.getInfor();
                },
                res => {
                    this.message("error", res.message)
                }
            );
        },
        // 切换列表类型
        makeActive(str, index) {
            // 发送请求
            this.show = index;
            this.listType = str;
            this.getInfor();
        },
        // 切换广告位
        chenkedSolt(data, num) {
            this.isShow = num;
            this.soltNum = num;
            this.soltId = data;
            if (this.type == 2) {
                var url = "/ad/list/group.shtml"
            } else {
                var url = "/ad/list/device.shtml"
            }
            this.$esellApi.send(
                url,
                { 'group-id': this.groupId, 'device-id': this.deviceId, 'slot-id': data, 'page': this.page, 'size': this.pagesize, 'type': this.listType },
                res => {
                    this.total = res.payload.total;
                    for (let i = 0; i < res.payload.data.length; i++) {
                        let sourcetype;
                        if (!res.payload.data[i]['cover-url']) {
                            res.payload.data[i]['cover-url'] = 'http://file1.yixinfa.cn/dev/180328/2e7ebf22d83e4cce9788d9176e9b6865.jpg'
                            sourcetype = 'img';
                        }else if(/\.(img|png|gif|bmp|jpeg)/gi.test(res.payload.data[i]['cover-url'])){
                            sourcetype = 'img';
                        }else if(/\.(mp4|avi)/gi.test(res.payload.data[i]['cover-url'])){
                            sourcetype = 'video'
                        }else{
                            sourcetype = 'text';
                        }

                        res.payload.data[i].status = this.advStatus[res.payload.data[i].status];
                        res.payload.data[i].type = res.payload.data[i].type;
                        res.payload.data[i]['download-status'] = (sourcetype === 'text') ? this.downloadStatus[2] : this.downloadStatus[res.payload.data[i]['download-status']]
                        res.payload.data[i]['pay-num'] = res.payload.data[i]['pay-num'] < 0 ? '不限' : res.payload.data[i]['pay-num'];
                    }
                    this.tableData = res.payload.data;
                    this.$esellApi.checkPermissions(255);
                },
                res => {
                   this.message("error", res.message)
                }
            );
        },
        // 页码改变
        pageChange(val) {
            this.page = val;
            this.getInfor();
        },
        // 每页尺寸改变
        sizeChange(val) {
            this.pagesize = val;
            this.getInfor();
        },
        // 全选单选
        batchStartUsing(data) {
            console.log(data)
            this.checkedList = data;

            // for(let i=0;i<data.length;i++){
            //     this.checkedList.push(data[i].id);
            // }
        },
        // 批量开启
        openList() {
            this.checkedList = [];
            var arr = [];
            for (let i = 0; i < this.checkedList.length; i++) {
                arr.push(this.checkedList[i].id);
            }
            console.log(121, this.arr)
            this.checkedList = new Set(...arr)
            console.log(2222, this.checkedList)
            return;
            if (this.checkedList.length < 1) {
                this.$message({
                    type: 'error',
                    message: '请先选择需要开启的广告'
                });
            } else {
                this.$esellApi.send(
                    "/ad/status/batch/enable.shtml",
                    { 'ids': this.checkedList },
                    res => {
                        this.$message({
                            type: 'success',
                            message: '暂停成功'
                        });
                        this.getInfor();
                    },
                    res => {
                          this.message("error", res.message)
                    }
                );
            }
        },
        // 批量暂停
        pauseList() {
            var arr = [];
            for (let i = 0; i < this.checkedList.length; i++) {
                arr.push(this.checkedList[i].id);
            }
            this.checkedList = new Set(arr)
            if (this.checkedList.size < 1) {
                this.$message({
                    type: 'error',
                    message: '请先选择需要暂停的广告'
                });
            } else {
                this.$esellApi.send(
                    "/ad/device/batch/disable.shtml",
                    { 'ids': this.checkedList },
                    res => {
                        this.$message({
                            type: 'success',
                            message: '暂停成功'
                        });
                        this.getInfor();
                    },
                    res => {
                        this.message("error", res.message)
                    }
                );
            }
        },
        // 开启
        open(data) {
            console.log(data)
            if (data.status == '待播放' || data.status == '投放中') {
                this.$message({
                    type: 'error',
                    message: '该广告已开启'
                });
                return
            }
            this.$esellApi.send(
                "/ad/device/batch/enable.shtml",
                { 'ids': [data.id] },
                res => {
                    this.$message({
                        type: 'success',
                        message: '开启成功'
                    });
                    this.getInfor();
                },
                res => {
                    this.message("error", res.message)
                }
            );
        },
        // 暂停
        pause(data) {
            console.log(data)
            if (data.status == '暂停中') {
                this.$message({
                    type: 'error',
                    message: '该广告已暂停'
                });
                return
            }
            this.$confirm('此操作将暂停此广告, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$esellApi.send(
                    '/ad/device/batch/disable.shtml',
                    { 'ids': [data.id] },
                    res => {
                        this.$message({
                            type: 'success',
                            message: '暂停成功'
                        });
                        this.getInfor();
                    },
                    res => {
                          this.message("error", res.message)
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
        // 上移
        moveUp(data) {
            if (this.type == 2) {
                var url = "/group/playlist/move.shtml"
            } else {
                var url = "/device/playlist/move.shtml"
            }
            this.$esellApi.send(
                url,
                { 'group-id': this.groupId, 'device-id': this.deviceId, 'ad-id': data.id,'slot-id':this.soltId},
                res => {
                    this.$message({
                        type: 'success',
                        message: '上移成功'
                    });
                    this.getInfor();
                },
                res => {
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                }
            );
        },
        // 下移
        moveDown(data) {
            if (this.type == 2) {
                var url = "/group/playlist/down.shtml"
            } else {
                var url = "/device/playlist/down.shtml"
            }
            this.$esellApi.send(
                url,
                { 'group-id': this.groupId, 'device-id': this.deviceId, 'ad-id': data.id ,'slot-id':this.soltId},
                res => {
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '下移成功'
                    });
                    this.getInfor();
                },
                res => {
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                }
            );
        },
        // 置顶
        first(data) {
            if (this.type == 2) {
                var url = "/group/playlist/move/top.shtml"
            } else {
                var url = "/device/playlist/move/top.shtml"
            }
            this.$esellApi.send(
                url,
                { 'group-id': this.groupId, 'device-id': this.deviceId, 'ad-id': data.id ,'slot-id':this.soltId},
                res => {
                    this.$message({
                        type: 'success',
                        message: '置顶成功'
                    });
                    this.getInfor();
                },
                res => {
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                }
            );
        },
        // 置尾
        last(data) {
            if (this.type == 2) {
                var url = "/group/playlist/down/tail.shtml"
            } else {
                var url = "/device/playlist/down/tail.shtml"
            }
            this.$esellApi.send(
                url,
                { 'group-id': this.groupId, 'device-id': this.deviceId, 'ad-id': data.id ,'slot-id':this.soltId},
                res => {
                    this.$message({
                        type: 'success',
                        message: '置尾成功'
                    });
                    this.getInfor();
                },
                res => {
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                }
            );
        },
        getSoltId() {
            var that = this;
            this.$esellApi.send(
                "/slot/options.shtml",
                { 'group-id': this.groupId, 'device-id': this.deviceId },
                res => {
                    this.soltArr = res.payload;
                    if (this.soltArr.length > 0) {
                        this.soltId = res.payload[0].value;
                        this.getInfor()
                    } else {
                        // this.$message({
                        //     type: 'info',
                        //     message: '暂无数据'
                        // });
                    }
                },
                res => {
                      this.message("error", res.message)
                }
            );
        },
        getInfor() {
            this.$esellApi.send(
                this.anyUrl,
                { 'page': this.page, 'size': this.pagesize, 'device-id': this.deviceId, 'group-id': this.groupId, 'slot-id': this.soltId, 'type': this.listType },
                res => {
                    this.total = res.payload.total;
                    for (let i = 0; i < res.payload.data.length; i++) {
                        if (!res.payload.data[i]['cover-url']) {
                            res.payload.data[i]['cover-url'] = 'http://file1.yixinfa.cn/dev/180328/2e7ebf22d83e4cce9788d9176e9b6865.jpg'
                        }
                        res.payload.data[i].status = this.advStatus[res.payload.data[i].status];
                        res.payload.data[i]['download-status'] = this.downloadStatus[res.payload.data[i]['download-status']]
                        res.payload.data[i]['pay-num'] = res.payload.data[i]['pay-num'] < 0 ? '不限' : res.payload.data[i]['pay-num'];
                    }
                    this.tableData = res.payload.data;
                },
                res => {
                    this.message("error", res.message)
                }
            );
        },
    },
};
</script>
<style lang="scss">
@import "../../sass/PopulariztionPlanManage.scss";
.play_list {
    .row3 {
        box-sizing: border-box;
        border-bottom: none;
        margin-top: 40px;
        .bg {
            text-align: center;
            width: 140px;
            height: 44px;
            cursor: pointer;
            line-height: 44px;
        }
        .pdf {
            border-right: 1px solid $sublineColor;
        }
    }
    .cf {
        content: '';
        display: table;
        clear: both;
    }
    .left {
        width: 100%;
        border-bottom: 1px solid #e5e5e5;
    }
    .right {
        width: 100%;
        padding-left: 20px;
        padding-bottom: 20px;
        padding-top: 20px;
        background: #fff;
        box-sizing: border-box;
    }
    div.active {
        transition: all .6s;
        color: $white !important;
        background-color: $impColor !important;
    }

    div.isActive {
        color: $impColor !important;
        background-color: $white !important;
        box-sizing: border-box;
        position: relative;
    }

    div.isActive::after {
        content: "";
        height: 2px;
        width: 100%;
        background-color: $impColor;
        position: absolute;
        bottom: -1px;
        left: 0;
    }
}
</style>


