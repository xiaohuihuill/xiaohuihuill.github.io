<template>
    <div class="remote-control">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/dev_mag" class="blue">设备管理</router-link>
                <span>></span>
                <span>远程控制</span>
            </span>
        </div>
        <div class="bottom">
            <div class="remote-control-device">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <!--基本控制页面-->
                    <el-tab-pane label="基本控制" name="first">
                        <div style="height:30px;line-height:30px;">
                            <span class="remote-control-device-group-name-title fl" style="width:77px">声音</span>
                            <span class="remote-control-device-group-name-input fl" style="width:30%">
                                <el-slider v-model="basicControl.volume" style="width:100%;"></el-slider>
                            </span>
                            <span class="display" style="margin-left:50px;width:100px;">当前:&nbsp;{{basicControl.volume}}</span>
                            <a href="javascript:;" class="yxf-but" style="margin-left:20px;" @click="mute">静音</a>
                        </div>
                        <div style="margin-top:20px;height:30px;line-height:30px;">
                            <span class="remote-control-device-group-name-title fl" style="width:77px">亮度</span>
                            <span class="remote-control-device-group-name-input fl" style="width:30%">
                                <el-slider v-model="basicControl.brightness" :max="225" style="width:100%;"></el-slider>
                            </span>
                            <span style="margin-left:50px;width:100px;">当前:&nbsp;{{basicControl.brightness}}</span>
                        </div>
                        <div style="margin-top:20px;height:30px;line-height:30px;">
                            <span class="remote-control-device-group-name-title fl" style="width:77px">缓存</span>
                            <span class="remote-control-device-group-name-input fl" style="width:30%">
                                <el-slider :min="0" :max="7" v-model="basicControl['cache-time']" style="width:100%;"></el-slider>
                            </span>
                            <span style="margin-left:50px;width:100px;">当前:&nbsp;{{basicControl['cache-time']}}&nbsp;天</span>
                        </div>
                        <div style="margin-top:20px;">
                            <span class="remote-control-device-group-name-title fl" style="width:67px">重启</span>
                            <span @change="changechecked1('re')">
                                <el-checkbox v-model="basicControlReboot">立即重启</el-checkbox>
                            </span>
                        </div>
                        <div style="margin-top:20px;">
                            <span class="remote-control-device-group-name-title fl" style="width:67px">关机</span>
                            <span @change="changechecked2('sd')">
                                <el-checkbox v-model="basicControlShutdown">立即关机</el-checkbox>
                            </span>
                        </div>
                        <div style="margin-top:20px;">
                            <span class="remote-control-device-group-name-title fl" style="width:67px">缓存</span>
                            <span>
                                <el-checkbox v-model="basicControlCache">立即清理</el-checkbox>
                            </span>
                        </div>
                        <div style="margin-top:20px;">
                            <a href="javascript:;" class="yxf-but" style="margin-right:6px;" @click="cdup">返 回</a>
                            <a href="javascript:;" class="yxf-but" data-butflag="1522752252765" @click="basicControlSubmit">提 交</a>
                        </div>
                    </el-tab-pane>
                    <!--定时开关机页面-->
                    <el-tab-pane label="定时开关机" name="second">
                        <div style="margin-top:5px;" data-butflag="1522752270461">
                            <div>
                                <div class="cycle-period">
                                    <div>
                                        <span style="margin-right:6px;">循环周期</span>
                                        <span style="margin-right:20px;" v-for="(item,index) in list" :key="index" @change="selectTime(index,item.type)">
                                            <el-radio class="radio" v-model="radio" :label="item.type">{{item.select}}</el-radio>
                                        </span>
                                    </div>
                                    <!--每天-->
                                    <div v-show="isShow==0" class="everyday" style="margin:20px 0 20px;">
                                        <div class="clearfix">
                                            <div style="height:30px;line-height:30px;width:250px;" class="clearfix fl">
                                                <div class="fl everyday-end-time-title">
                                                    <span style="margin-right:10px;">关机时间</span>
                                                </div>
                                                <div class="fl clearfix" style="height:30px;">
                                                    <div class="fl clearfix">
                                                        <div class="fl everyday-end-time-loop-playback-input" style="height:30px;width:171px;">
                                                            <el-time-picker v-model="everyDayAddData['stop-time']" :picker-options="{
                                                                                                                                                                                                                                                                                                                                                                                                                                                                     selectableRange: '00:00:00 - 23:59:59'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                     }" placeholder="请选择关机时间">
                                                            </el-time-picker>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="height:30px;line-height:30px;width:250px;" class="clearfix fl">
                                                <div class="fl everyday-start-time-title">
                                                    <span style="margin-right:10px;">开机时间</span>
                                                </div>
                                                <div class="fl everyday-start-time-input" style="height:30px;width:20%;">
                                                    <el-time-picker v-model="everyDayAddData['start-time']" :picker-options="{
                                                                                                                                                                                                                                                                                                     selectableRange: '00:00:00 - 23:59:59'
                                                                                                                                                                                                                                                                                                      }" placeholder="请选择开机时间">
                                                    </el-time-picker>
                                                </div>
                                            </div>
                                            <div class="fl">
                                                <a href="javascript:;" class="yxf-but" @click="everyDayAdd">新 增</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!--每周几-->
                                    <div v-show="isShow==1" class="weekly" style="margin:20px 0 20px;">
                                        <div style="margin-bottom:20px" class="clearfix">
                                            <span class="fl">选择周几</span>
                                            <span class="fl" style="margin-left:10px;">
                                                <el-checkbox-group v-model="checkedCities1">
                                                    <el-checkbox style="margin-right:20px;" v-for="city in cities" :label="city" :key="city">{{city.name}}</el-checkbox>
                                                </el-checkbox-group>
                                            </span>
                                        </div>
                                        <div class="clearfix">
                                            <div style="height:30px;line-height:30px;width:250px;" class="clearfix fl">
                                                <div class="fl everyday-end-time-title">
                                                    <span style="margin-right:10px;">关机时间</span>
                                                </div>
                                                <div class="fl clearfix" style="height:34px;">
                                                    <div class="fl clearfix">
                                                        <div class="fl everyday-end-time-loop-playback-input">
                                                            <el-time-picker v-model="weekAddData['stop-time']" :picker-options="{
                                                                                                                                                                                                                                                                                                             selectableRange: '00:00:00 - 23:59:59'
                                                                                                                                                                                                                                                                                                            }" placeholder="请选择关机时间">
                                                            </el-time-picker>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="height:30px;line-height:30px;width:250px" class="clearfix fl">
                                                <div class="fl everyday-start-time-title">
                                                    <span style="margin-right:10px;">开机时间</span>
                                                </div>
                                                <div class="fl everyday-start-time-input" style="height:34px;width:171px;">
                                                    <el-time-picker v-model="weekAddData['start-time']" :picker-options="{
                                                                                                                                                                                                                                                                                                    selectableRange: '00:00:00 - 23:59:59'
                                                                                                                                                                                                                                                                                                    }" placeholder="请选择开机时间">
                                                    </el-time-picker>
                                                </div>
                                            </div>
                                            <div class="fl">
                                                <a href="javascript:;" class="yxf-but" @click="weekAdd">新 增</a>
                                            </div>
                                        </div>
                                    </div>
                                    <!--某天-->
                                    <div v-show="isShow==2" class="someday" style="margin:20px 0 20px;">
                                        <div class="clearfix">
                                            <div style="height:30px;line-height:30px;width:250px;" class="clearfix fl">
                                                <div class="fl everyday-end-time-title">
                                                    <span style="margin-right:10px;">关机时间</span>
                                                </div>
                                                <div class="fl clearfix" style="height:34px;width:171px;">
                                                    <div class="fl clearfix">
                                                        <div class="fl everyday-end-time-loop-playback-input">
                                                            <el-date-picker v-model="someDayAddData['stop-time']" type="datetime" placeholder="请选择关机时间">
                                                            </el-date-picker>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="height:30px;line-height:30px" class="clearfix fl">
                                                <div class="fl everyday-start-time-title">
                                                    <span style="margin-right:10px;">开机时间</span>
                                                </div>
                                                <div style="width:250px;">
                                                    <el-date-picker v-model="someDayAddData['start-time']" type="datetime" placeholder="请选择开机时间">
                                                    </el-date-picker>
                                                </div>
                                            </div>
                                            <div class="fl">
                                                <a href="javascript:;" class="yxf-but" @click="someDayAdd">新 增</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style="margin-top:20px;">
                            <el-table :data="tableData" border style="width: 100%">
                                <el-table-column prop="id" label="编号" width="180">
                                </el-table-column>
                                <el-table-column label="周期" width="">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row['action-type']=='everyday'">
                                            每天
                                        </div>
                                        <div v-else-if="scope.row['action-type']=='week'">
                                            <span v-for="(item,index) in scope.row['weekdays']" :key="index">
                                                {{item}} &nbsp;
                                            </span>
                                        </div>
                                        <div v-else>
                                            某天
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="stop-time" label="关机时间" width="">
                                </el-table-column>
                                <el-table-column prop="start-time" label="开机时间" width="">
                                </el-table-column>
                                <el-table-column label="操作" width='80'>
                                    <template slot-scope="scope">
                                        <div class="file-operation-other clearfix">
                                            <!--<a class="blue fl" @click="timingEdit(scope.row)">编辑</a>-->
                                            <a class="blue delete1 fl" data-butflag="1524041383401" @click="delete1(scope.row)">删除</a>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="paging" v-if="ishide" style="text-align: center;margin-top:20px;">
                            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="timeSwitchSize" :page-sizes='[10,20]' layout="total, sizes, prev, pager, next, jumper" :total="timeSwitchTotal">
                            </el-pagination>
                        </div>
                        <div style="margin-top:20px;">
                            <a href="javascript:;" class="yxf-but" data-butflag="1522753019555" @click="saveCommit">保存设置</a>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
            <!--all-device-->
            <!--时间提示框-->
            <el-dialog title="提示" :visible.sync="isTime" size="tiny">
                <span ref="spanInfo" class="spanInfo">{{spanInfo}}</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isTime = false">取 消</el-button>
                    <el-button type="primary" @click="isTime = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>

import { formatDate } from '@/utils/date.js';
const cityOptions = [
    { name: "周一", id: 1 },
    { name: "周二", id: 2 },
    { name: "周三", id: 3 },
    { name: "周四", id: 4 },
    { name: "周五", id: 5 },
    { name: "周六", id: 6 },
    { name: "周日", id: 7 }];
export default {
    name: 'remote-control1',
    data() {
        return {
            reg: "/^[,|[|]]*/g",
            weekinfo: [],
            timeSwitchTotal: "",
            timeSwitchPage: 1,
            timeSwitchSize: 10,
            timeSwitchType: "",
            ishide: true,//默认展示分页
            isTime: false,//时间提示框默认隐藏
            spanInfo: "",//时间提示信息
            checkedCities1: [],
            cities: cityOptions,
            all: 40,
            basicControlReboot: false,//重启是否勾选  默认都不选
            basicControlShutdown: false,//关机是否勾选   默认都不选 
            basicControlCache: false,//缓存是否勾选   默认都不选 
            basicControl: {
                volume: "0",//音量
                brightness: "0",//亮度
                "cache-time": "0",//缓存天数
                operation: "",//re/sd(重启/关机)
                "clear-cache": this.basicControlCache
            },
            everyDayAddData: {
                "attrbute-id": this.$route.query.id,//基本属性ID(父级ID)
                "start-time": "",//开始时间
                "stop-time": "",//结束时间
                "action-type": "everyday",//选择类型：everyday,week,someday（每天、每星期的、某天）
            },
            weekArr: [],
            weekAddData: {
                "attrbute-id": this.$route.query.id,//基本属性ID(父级ID)
                "start-time": "",//开始时间
                "stop-time": "",//结束时间
                "action-type": "week",//选择类型：everyday,week,someday（每天、每星期的、某天）
                "time-quantum": [],//当前字段为 (1~7)
            },
            someDayAddData: {
                "attrbute-id": this.$route.query.id,//基本属性ID(父级ID)
                "start-time": "",//开始时间
                "stop-time": "",//结束时间
                "action-type": "someday",//选择类型：everyday,week,someday（每天、每星期的、某天）
            },
            ishide: true,
            isShow: 0,
            checked: false,
            radio: 'everyday',
            ishide: true,
            activeName: 'first',
            tableData: [],
            list: [{
                select: "每天",
                type: "everyday",
            }, {
                select: "每周几",
                type: "week",
            }, {
                select: "某天",
                type: "someday",
            }],
        }
    },
    created() {
        console.log(11)
        this.getDeviceRemoteControl();
    },
    methods: {
        selectTime(index, type) {
            this.everyDayAddData = {
                "attrbute-id": this.$route.query.id,//基本属性ID(父级ID)
                "start-time": "",//开始时间
                "stop-time": "",//结束时间
                "action-type": "everyday",//选择类型：everyday,week,someday（每天、每星期的、某天）
            };
            this.weekArr = [];
            this.weekAddData = {
                "attrbute-id": this.$route.query.id,//基本属性ID(父级ID)
                "start-time": "",//开始时间
                "stop-time": "",//结束时间
                "action-type": "week",//选择类型：everyday,week,someday（每天、每星期的、某天）
                "time-quantum": [],//当前字段为 (1~7)
            };
            this.someDayAddData = {
                "attrbute-id": this.$route.query.id,//基本属性ID(父级ID)
                "start-time": "",//开始时间
                "stop-time": "",//结束时间
                "action-type": "someday",//选择类型：everyday,week,someday（每天、每星期的、某天）
            };
            this.timeSwitchType = type;
            this.radio = type;
            this.isShow = index;
            this.getDeviceRemoteControlSwitchList(type);
        },
        getDeviceRemoteControl() {
            this.$esellApi.send("/device/attrbute/get.shtml", {
                id: this.$route.query.id
            }, res => {
                if (res.payload == undefined) {
                    this.timeSwitchType = "everyday";
                    this.radio = "everyday";
                    this.getDeviceRemoteControlSwitchList('everyday');
                } else {
                    this.basicControl = {
                        volume: res.payload.volume?res.payload.volume:0, //音量
                        brightness: res.payload.brightness?res.payload.brightness:0, //亮度
                        "cache-time": res.payload["cache-time"]?res.payload["cache-time"]:0, //缓存天数
                        // operation: res.payload.id,//re/sd(重启/关机)
                    };
                    if (res.payload['action-type'] == undefined) {
                        this.timeSwitchType = "everyday";
                        this.radio = "everyday";
                    } else {
                        this.timeSwitchType = res.payload['action-type'];
                        this.radio = res.payload['action-type'];
                        if (this.timeSwitchType == "week") {
                            this.isShow = 1;
                        }
                        if (this.timeSwitchType == "someday") {
                            this.isShow = 2;
                        }
                    }
                    this.getDeviceRemoteControlSwitchList(this.timeSwitchType);
                    // console.log("this.timeSwitchType", this.timeSwitchType)
                }
            }, res => {
                this.message("error", res.message);
                console.log(res);
            })
        },
        getDeviceRemoteControlSwitchList(type) {
            this.$esellApi.send("/device/timer/list.shtml", {
                "attrbute-id": this.$route.query.id,
                "action-type": type,
                page: this.timeSwitchPage,
                size: this.timeSwitchSize
            }, res => {
                this.timeSwitchTotal = res.payload.total;
                this.tableData = res.payload.data;
                this.$esellApi.checkPermissions();
            }, res => {
                this.message("error", res.message);
                console.log(res);
            })
        },
        cdup() {
            this.$router.go(-1);
        },
        // 设置定时编辑
        // timingEdit(row) {
        //     console.log(row);
        //     this.$router.push({ path: '/dev_mag/remote_control/set_timing_switch_time' })
        // },
        // 截屏编辑
        ScreenShotsEdit(row) {
            this.$router.push({ path: '/dev_mag/remote_control/set_timing_screen_shots' })
        },
        delete1(row) {
            console.log(row);
            this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 成功操作
                this.$esellApi.send("/device/timer/delete.shtml", {
                    id: row.id
                }, res => {
                    console.log(this.timeSwitchType)
                    this.getDeviceRemoteControlSwitchList(this.timeSwitchType);
                    this.message("success", "删除操作成功")
                }, res => {
                    this.message("error", res.message)
                })
            }).catch(() => {
                // 失败操作
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        mute() {
            this.basicControl.volume = 0;
        },
        changechecked1(str) {
            this.basicControl.operation = str;
            if (this.basicControlReboot && this.basicControlShutdown) {
                this.message("warning", "两者只能选其一")
                this.basicControlReboot = true;
                this.basicControlShutdown = false;
            }
        },
        changechecked2(str) {
            this.basicControl.operation = str;
            if (this.basicControlReboot && this.basicControlShutdown) {
                this.message("warning", "两者只能选其一")
                this.basicControlReboot = false;
                this.basicControlShutdown = true;
            }
        },
        // 基本设置属性的保存提交
        basicControlSubmit() {
            console.log(this.basicControl)
            if (!this.basicControlReboot && !this.basicControlShutdown) {
                this.basicControl.operation = "";
            }
            this.$esellApi.send("/device/attrbute/save.shtml", {
                id: this.$route.query.id,//设备编号(该字段为空则为添加,否则为修改)
                volume: this.basicControl.volume,//音量
                brightness: this.basicControl.brightness,//亮度
                "cache-time": this.basicControl["cache-time"],//缓存天数
                "clear-cache": this.basicControlCache == false ? '' : true,//清理缓存
                operation: this.basicControl.operation,//re/sd(重启/关机)
            }, res => {
                this.getDeviceRemoteControl();
                this.message("success", "保存成功")
                this.basicControl = {
                    volume: "",//音量
                    brightness: "",//亮度
                    "cache-time": "",//缓存天数
                    operation: "",//re/sd(重启/关机)
                    "clear-cache": false
                };
                this.basicControlReboot = false;//重启是否勾选  默认都不选
                this.basicControlShutdown = false;//关机是否勾选   默认都不选 
                this.basicControlCache = false;//缓存是否勾选   默认都不选 
            }, res => {
                this.message("error", res.message)
            })
        },
        saveCommit() {
            this.$esellApi.send("/device/timer/commit.shtml", {
                "attrbute-id": this.$route.query.id,//设备编号(该字段为空则为添加,否则为修改)
                "action-type": this.timeSwitchType,//re/sd(重启/关机)
            }, res => {
                this.timeSwitchType = this.timeSwitchType;//保存状态
                this.message("success", "保存成功")
            }, res => {
                this.message("error", res.message)
            })
        },
        everyDayAdd() {
            console.log(+this.everyDayAddData["start-time"])
            console.log(+this.everyDayAddData["stop-time"])
            if (!this.everyDayAddData["stop-time"]) {
                this.message("warning", "关机时间不能为空")
                return
            }
            if (!this.everyDayAddData["start-time"]) {
                this.message("warning", "开机时间不能为空")
                return
            }
            var date11 = new Date(+this.everyDayAddData['start-time']);
            var date22 = new Date(+this.everyDayAddData['stop-time']);

            if (Math.abs(+date11 - +date22) < 300000) {
                this.spanInfo = '关机时间与开机时间间隔不能小于5分钟';
                this.isTime = true;
                this.weekAddData['stop-time'] = "";
                return
            }
            if (this.everyDayAddData["action-type"]) {

            }
            this.$esellApi.send("/device/timer/save.shtml", {
                "attrbute-id": this.$route.query.id,//基本属性ID(父级ID)
                "start-time": formatDate(+this.everyDayAddData["start-time"]),//开始时间
                "stop-time": formatDate(+this.everyDayAddData["stop-time"]),//结束时间
                "action-type": this.everyDayAddData["action-type"],//选择类型：everyday,week,someday（每天、每星期的、某天）
                "start-millisecond": +this.everyDayAddData["start-time"],//开始时间搓
                "stop-millisecond": +this.everyDayAddData["stop-time"],//开始时间搓
            }, res => {
                this.getDeviceRemoteControlSwitchList('everyday');
                this.message("success", "新增成功")
                this.$esellApi.checkPermissions(211);
            }, res => {
                this.message("error", res.message)
            })
        },
        weekAdd() {
            this.weekAddData["time-quantum"] = [];
            this.weekArr.forEach(function(element) {
                this.weekAddData["time-quantum"].push(element.name)
            }, this);
            console.log("this", this.weekAddData["time-quantum"])
            if (this.weekAddData["time-quantum"].length < 1) {
                this.message("warning", "每周时间不能为空")
                return
            }
            if (!this.weekAddData["stop-time"]) {
                this.message("warning", "关机时间不能为空")
                return
            }
            if (!this.weekAddData["start-time"]) {
                this.message("warning", "开机时间不能为空")
                return
            }

            var date11 = new Date(+this.weekAddData['start-time']);
            var date22 = new Date(+this.weekAddData['stop-time']);
            if (Math.abs(+date11 - +date22) < 300000) {
                this.spanInfo = '关机时间与开机时间间隔不能小于5分钟';
                this.isTime = true;
                this.weekAddData['stop-time'] = "";
                return
            }
            this.$esellApi.send("/device/timer/save.shtml", {
                "attrbute-id": this.$route.query.id,//基本属性ID(父级ID)
                "start-time": formatDate(+this.weekAddData["start-time"]),//开始时间
                "stop-time": formatDate(+this.weekAddData["stop-time"]),//结束时间
                "action-type": this.weekAddData["action-type"],//选择类型：everyday,week,someday（每天、每星期的、某天）
                "time-quantum": this.weekAddData["time-quantum"],//当前字段为 (1~7)
                "start-millisecond": +this.weekAddData["start-time"],//开始时间搓
                "stop-millisecond": +this.weekAddData["stop-time"],//开始时间搓
            }, res => {
                this.getDeviceRemoteControlSwitchList('week');
                this.message("success", "新增成功")
                this.$esellApi.checkPermissions(211);
            }, res => {
                this.message("error", res.message)
            })
        },
        someDayAdd() {
            if (!this.someDayAddData["start-time"]) {
                this.message("warning", "开机时间不能为空")
                return
            }
            if (!this.someDayAddData["stop-time"]) {
                this.message("warning", "关机时间不能为空")
                return
            }
            this.$esellApi.send("/device/timer/save.shtml", {
                "attrbute-id": this.$route.query.id,//基本属性ID(父级ID)
                "start-time": formatDate(+this.someDayAddData["start-time"]),//开始时间
                "stop-time": formatDate(+this.someDayAddData["stop-time"]),//结束时间
                "action-type": this.someDayAddData["action-type"],//选择类型：everyday,week,someday（每天、每星期的、某天）
                "start-millisecond": +this.someDayAddData["start-time"],//开始时间搓
                "stop-millisecond": +this.someDayAddData["stop-time"],//开始时间搓
            }, res => {
                this.getDeviceRemoteControlSwitchList("someday");
                this.message("success", "新增成功")
                this.$esellApi.checkPermissions(211);
            }, res => {
                this.message("error", res.message)
            })
        },
        handleSizeChange(val) {
            this.timeSwitchSize = val;
            this.getDeviceRemoteControlSwitchList(this.timeSwitchType);
        },
        handleCurrentChange(val) {
            this.timeSwitchPage = val;
            this.getDeviceRemoteControlSwitchList(this.timeSwitchType);
        }
    },
    watch: {
        checkedCities1: function(val, oldVal) {
            this.weekArr = val;
        },
        someDayAddData: {
            handler(newvalue, oldvalue) {
                this.someDayAddData['start-time'] = newvalue['start-time'];
                this.someDayAddData['stop-time'] = newvalue['stop-time'];
                var date11 = new Date(this.someDayAddData['start-time']);
                var date22 = new Date(this.someDayAddData['stop-time']);
                var timestamp = +new Date();
                if (+date11 < timestamp) {
                    this.spanInfo = '开机时间不能小于当前时间';
                    this.isTime = true;
                    this.someDayAddData['start-time'] = "";
                    return
                }
                if (+date11 < +date22) {
                    this.spanInfo = '关机时间不能小于开机时间';
                    this.isTime = true;
                    this.someDayAddData['start-time'] = "";
                    return
                }
                if (+date22 < timestamp) {
                    this.spanInfo = '关机时间不能小于当前时间';
                    this.isTime = true;
                    this.someDayAddData['start-time'] = "";
                    this.someDayAddData['stop-time'] = "";
                    return
                }

                var data333 = (+date11) - (+date22)//时间差
                if (Math.abs(data333) < 300000) {
                    this.spanInfo = '关机时间与开机时间间隔不能小于5分钟';
                    this.isTime = true;
                    this.someDayAddData['stop-time'] = "";
                    return
                }
            },
            deep: true
        },
    }
}
</script>
<style lang="scss" scoped>
@import '../../sass/remoteControl.scss';

#draggable {
    width: 150px;
    height: 150px;
    padding: 0.5em;
}
</style>

