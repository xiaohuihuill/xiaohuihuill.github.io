<template>
    <div class="new-advertising">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/adv_mag" class="blue">广告管理</router-link>
                <span>></span>
                <router-link to="/adv_mag/pop_plan_mag" class="blue">推广计划管理</router-link>
                <span>></span>
                <span>编辑广告</span>
            </span>
        </div>
        <div class="bottom">
            <!--first step-->
            <div class="first-step">
                <div class="first-step-title clearfix">
                    <span class="fl">第一步&nbsp;:&nbsp;设置广告信息</span>
                </div>
                <div class="first-step-info">
                    <!--推广计划-->
                    <div class="popularization-plan">
                        <el-row>
                            <el-col :span="2" style="width:48px;">
                                <div class="grid-content bg-purple">推广计划</div>
                            </el-col>
                            <el-col :span="13" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <el-select v-model="campaignId" style="width:80%" placeholder="请选择推广计划" @visible-change='campaignChangeValue' clearable>
                                        <el-option v-for="item in campaignList" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!--投放时间-->
                    <div class="put-in-time">
                        <el-row>
                            <el-col :span="2" style="width:48px;">
                                <div class="grid-content bg-purple">投放时间</div>
                            </el-col>
                            <el-col :span="2" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span @click="sevenDays(7)">
                                        <el-radio class="radio" v-model="timeToMarketRadio" label="qitian">七天</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content bg-purple-light">
                                    <span @click="oneMonth(1)">
                                        <el-radio class="radio" v-model="timeToMarketRadio" label="yigeyue">一个月</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content bg-purple-light">
                                    <span @click="threeMonth(3)">
                                        <el-radio class="radio" v-model="timeToMarketRadio" label="sangeyue">三个月</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content bg-purple-light">
                                    <span @click="sixMonth(6)">
                                        <el-radio class="radio" v-model="timeToMarketRadio" label="liugeyue">六个月</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content bg-purple-light">
                                    <span @click="other">
                                        <el-radio class="radio" v-model="timeToMarketRadio" label="qitashijian">其他时间</el-radio>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!--开始与结束时间-->
                    <div class="start-end-time">
                        <el-row>
                            <el-col :span="2" style="width:48px;">
                                <div class="grid-content bg-purple">
                                    <span>开始时间</span>
                                </div>
                            </el-col>
                            <el-col :span="4" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-date-picker style="width:100%" :editable="false" :readonly="readonly " v-model="start" type="datetime" placeholder="请选择日期时间">
                                        </el-date-picker>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content bg-purple" style="text-align:center">
                                    <span>
                                        结束时间
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-date-picker style="width:100%" :readonly="readonly" v-model="end" type="datetime" placeholder="请选择日期时间">
                                        </el-date-picker>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!--广告类型-->
                    <div class="advertising-type">
                        <el-row>
                            <el-col :span="2" style="width:48px;">
                                <div class="grid-content bg-purple">广告类型</div>
                            </el-col>
                            <el-col :span="2" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span @change="adTypeIsShowOrHide('1')">
                                        <el-radio class="radio" v-model="editAdvertisingType" label="1">普通广告</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <!--<el-col :span="2">
                                                                    <div class="grid-content bg-purple-light">
                                                                        <span @change="adTypeIsShowOrHide('2')">
                                                                    <el-radio class="radio" v-model="type" label="2">紧急广告</el-radio>
                                                                </span>
                                                            </div>
                                                        </el-col>-->
                            <el-col :span="2" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span @change="adTypeIsShowOrHide('3')">
                                        <el-radio class="radio" v-model="editAdvertisingType" label="3">定时插播</el-radio>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="advertising-position-3 advertising-type" v-if="editAdvertisingType=='3'">
                        <el-row>
                            <el-col :span="2" style="width:48px; margin-top:6px;">
                                <div class="grid-content bg-purple">插播时间</div>
                            </el-col>
                            <el-col :span="13" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-button @click="timerInsertPay_dialog = true">新增插播时间</el-button>
                                    </span>
                                    <div style="margin-top:20px;">
                                        <el-table :data="insertDate" border style="width: 500px">
                                            <el-table-column type="index" label="编号" width="50">
                                            </el-table-column>
                                            <el-table-column label="循环周期" width="90">
                                                <template slot-scope="scope">
                                                    <span v-if="scope.row['action-type']=='everyday'">
                                                        每天
                                                    </span>
                                                    <span v-if="scope.row['action-type']=='someday'">
                                                        某天
                                                    </span>
                                                    <span v-if="scope.row['action-type']=='week'">
                                                        <span v-for="(item,index) in scope.row['time-quantum']" :key="index">
                                                            {{item.name}}&nbsp;
                                                        </span>
                                                    </span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="start-time" label="开始时间" width="80">
                                            </el-table-column>
                                            <el-table-column prop="stop-time" label="结束时间" width="80">
                                            </el-table-column>
                                            <el-table-column prop="play-times" label="播放次数" width="80">
                                                <template slot-scope="scope">
                                                    <span v-html="scope.row['play-times']== '0' ? '——' :scope.row['play-times'] "></span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="操作">
                                                <template scope="scope">
                                                    <a href="javascript:void(0);" @click="removeInsertDate(scope.row)">删除</a>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <!--<TimingInterCutTable @removeInsertDate="removeInsertDate" :insertDate="insertDate"></TimingInterCutTable>-->
                </div>
            </div>
            <!--the second step-->
            <div class="second-step">
                <div class="second-step-title clearfix">
                    <span class="fl">第二步&nbsp;:&nbsp;选择投放广告位</span>
                </div>
                <div class="second-step-info">
                    <div class="device-group" style="height:30px;">
                        <el-row style="height:30px;" v-if="ad_type=='1'">
                            <el-col :span="2" style="width:48px;">
                                <div class="grid-content bg-purple">设备</div>
                            </el-col>
                            <el-col :span="10" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        设备名称&nbsp;&nbsp;(&nbsp;&nbsp;{{this.$route.query.device_name?this.$route.query.device_name:""}}&nbsp;&nbsp;)&nbsp;&nbsp;
                                    </span>
                                </div>
                            </el-col>
                            <!--<el-col :span="4" style="text-align: right;">
                                                                                                                                                                                                       <a href="javascript:;" class="yxf-but" @click="issueToDeviceGroup = true">发布到多个设备组</a>
                                                                                                                                                                                 </el-col>-->
                        </el-row>
                        <el-row style="height:30px;" v-else>
                            <el-col :span="2" style="width:48px;">
                                <div class="grid-content bg-purple">设备组</div>
                            </el-col>
                            <el-col :span="10" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-select v-model="adGroups[0]['groupId']" style="width:100%" placeholder="请选择设备组" @change='changeGroupValue' clearable @clear="clearGroupValue">
                                            <el-option v-for="item in groupList" :key="item.value" :label="item.label" :value="item.value" multiple>
                                            </el-option>
                                        </el-select>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="advertising-position">
                        <el-row>
                            <el-col :span="2" style="width:48px;">
                                <div class="grid-content bg-purple">广告位</div>
                            </el-col>
                            <el-col :span="13" style="margin-left:20px;" v-if="ad_type=='2'">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-select v-model="adGroups[0]['slotId']" style="width:80%" placeholder="请选择广告位" clearable>
                                            <el-option v-for="item in slotList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="13" style="margin-left:20px;" v-else>
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-select v-model="adDevices[0]['slotId']" style="width:80%" placeholder="请选择广告位" clearable>
                                            <el-option v-for="item in slotList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <!--the third step-->
            <div class="third-step">
                <div class="third-step-title clearfix">
                    <span class="fl">第三步&nbsp;:&nbsp;上传素材</span>
                </div>
                <div class="third-step-info">
                    <Upload @addMaterials='addMaterials' :materials="materials"></Upload>
                </div>
            </div>
            <div class="submit" style="margin-left:20px;">
                <div>
                    <a href="javascript:;" class="yxf-but" @click="cdup">返回</a>
                    <a href="javascript:;" class="yxf-but" style="margin-left:6px;" @click="accomplishGoAduit">完成，去审核</a>
                </div>
            </div>
        </div>
        <!--发布到那些设备的弹框-->
        <el-dialog title="请选择广告同时发布到哪些设备组上" :visible.sync="issueToDeviceGroup" width="100%">
            <div class="select-device-group-dialog">
                <!--屏幕类型-->
                <div class="device-group-dialog-screen-type clearfix" style="width:100%">
                    <div class="device-group-dialog-screen-type-titel fl" style="width:10%">屏幕类型</div>
                    <div class="device-group-dialog-screen-type-info fl" style="width:90%">
                        <span>
                            <el-radio v-model="deviceGroupDialogRadio" label="1">全屏</el-radio>
                        </span>
                        <span>
                            <el-radio v-model="deviceGroupDialogRadio" label="2">竖屏</el-radio>
                        </span>
                        <span>
                            <el-radio v-model="deviceGroupDialogRadio" label="3">双屏</el-radio>
                        </span>
                    </div>
                </div>
                <!--选择模板-->
                <div class="device-group-dialog-optional-module clearfix" style="width:100%;margin-top:20px;">
                    <div class="device-group-dialog-optional-module-titel fl" style="width:10%">选择模板</div>
                    <div class="device-group-dialog-optional-module-info fl" style="width:90%">
                        <span style="margin-right:25px;">
                            <el-radio v-model="deviceGroupDialogRadio" label="1">左右二分屏-横屏</el-radio>
                        </span>
                        <span style="margin-right:25px;">
                            <el-radio v-model="deviceGroupDialogRadio" label="2">上下二分屏-横屏</el-radio>
                        </span>
                        <span style="margin-right:55px;">
                            <el-radio v-model="deviceGroupDialogRadio" label="3">四分屏-横屏</el-radio>
                        </span>
                        <span style="margin-right:25px;">
                            <el-radio v-model="deviceGroupDialogRadio" label="4">三分屏-横屏</el-radio>
                        </span>
                        <div style="margin-top:10px;">
                            <span style="margin-right:53px;">
                                <el-radio v-model="deviceGroupDialogRadio" label="5">二分屏-横屏</el-radio>
                            </span>
                            <span>
                                <el-radio v-model="deviceGroupDialogRadio" label="6">全屏-横屏</el-radio>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="device-group-dialog-screen-type clearfix" style="width:100%;margin-top:20px;">
                    <div class="device-group-dialog-screen-type-titel fl" style="width:10%">设备组</div>
                    <div class="device-group-dialog-screen-type-info fl" style="width:90%">
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <div style="margin: 10px 0;"></div>
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <el-checkbox v-for="city in cities" :label="city" :key="city" style="margin-right:42px;margin-bottom:10px;">{{city}}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <a href="javascript:;" @click="issueToDeviceGroup = false" class="yxf-but" style="margin-right:10px;">取 消</a>
                <a href="javascript:;" @click="issueToDeviceGroup = false" class="yxf-but">确 定</a>
            </span>
        </el-dialog>
        <el-dialog title="定时插播" :visible.sync="timerInsertPay_dialog" width="100%" size="large">
            <div class="select-device-group-dialog">
                <div class="cycle-period">
                    <div>
                        <span style="margin-right:6px;">选择循环周期</span>
                        <span style="margin-right:20px;" v-for="(item,index) in list" :key="index" @change="selectTime(index,item.type)">
                            <el-radio class="radio" v-model="periodRadio" :label="item.type">{{item.select}}</el-radio>
                        </span>
                    </div>
                    <!--每天-->
                    <div v-show="isShow==0" class="everyday" style="margin:20px 0 20px;">
                        <div class="clearfix">
                            <div class="clearfix fl">
                                <div style="margin-bottom:20px;">
                                    <span style="margin-right:30px;">开始时间</span>
                                    <el-time-picker v-model="everyday['start-time']" :picker-options="{
                                                               selectableRange: '00:00:00 - 23:59:59'
                                                               }" placeholder="请选择开始时间">
                                    </el-time-picker>
                                </div>
                                <div>
                                    <span style="margin-right:30px;">结束时间</span>
                                    <el-radio class="radio" v-model="everydayRadio" label="1">
                                        <span class="everyday-start-time-title">
                                            循环播放至
                                            <el-time-picker v-model="everyday['stop-time']" :picker-options="{
                                                                selectableRange: '00:00:00 - 23:59:59'
                                                                 }" placeholder="请选择结束时间">
                                            </el-time-picker>
                                        </span>
                                    </el-radio>
                                    <el-radio class="radio" v-model="everydayRadio" label="2">
                                        播放&nbsp;
                                        <el-input-number :min="0" :max="999" size="small" :step="1" v-model="everydayCirculationTime"></el-input-number>&nbsp;&nbsp;&nbsp;次结束
                                    </el-radio>
                                </div>
                            </div>
                        </div>
                        <div class="fl" style="margin:20px 0 20px 85px;">
                            <a href="javascript:;" class="yxf-but" @click="everyDayAdd">新 增</a>
                        </div>
                    </div>
                    <!--每周-->
                    <div v-show="isShow==1" class="weekly" style="margin:20px 0 20px;">
                        <div style="margin-bottom:20px" class="clearfix">
                            <span class="fl" style="margin-right: 25px;">选择周几</span>
                            <span class="fl" style="margin-left:10px;">
                                <el-checkbox-group v-model="week1">
                                    <el-checkbox style="margin-right:20px;" v-for="city in weeks" :label="city" :key="city">{{city.name}}</el-checkbox>
                                </el-checkbox-group>
                            </span>
                        </div>
                        <div class="clearfix">
                            <div class="clearfix">
                                <div style="margin-bottom:20px;">
                                    <span style="margin-right:30px;">开始时间</span>
                                    <el-time-picker v-model="week['start-time']" :picker-options="{
                                                               selectableRange: '00:00:00 - 23:59:59'
                                                               }" placeholder="请选择开始时间">
                                    </el-time-picker>
                                </div>
                                <div>
                                    <span style="margin-right:30px;">结束时间</span>
                                    <el-radio class="radio" v-model="weekRadio" label="1">
                                        <span class="everyday-start-time-title">
                                            循环播放至
                                            <el-time-picker v-model="week['stop-time']" :picker-options="{
                                                                selectableRange: '00:00:00 - 23:59:59'
                                                                 }" placeholder="请选择结束时间">
                                            </el-time-picker>
                                        </span>
                                    </el-radio>
                                    <el-radio class="radio" v-model="weekRadio" label="2">
                                        播放&nbsp;
                                        <el-input-number :min="0" :max="999" size="small" :step="1" v-model="weekCirculationTime"></el-input-number>&nbsp;&nbsp;&nbsp;次结束
                                    </el-radio>
                                </div>
                            </div>
                            <div class="fl" style="margin:20px 0;">
                                <a href="javascript:;" class="yxf-but" @click="weekAdd">新 增</a>
                            </div>
                        </div>
                    </div>
                    <!--某天-->
                    <div v-show="isShow==2" class="someday" style="margin:20px 0 20px;">
                        <div class="clearfix">
                            <div class="clearfix">
                                <div style="margin-bottom:20px;">
                                    <span style="margin-right:30px;">开始时间</span>
                                    <el-date-picker v-model="someday['start-time']" type="datetime" placeholder="请选择开始时间">
                                    </el-date-picker>
                                </div>
                                <div>
                                    <span style="margin-right:30px;">结束时间</span>
                                    <el-radio class="radio" v-model="somedayRadio" label="1">
                                        <span class="everyday-start-time-title">
                                            循环播放至
                                            <el-date-picker v-model="someday['stop-time']" type="datetime" placeholder="请选择结束时间">
                                            </el-date-picker>
                                        </span>
                                    </el-radio>
                                    <el-radio class="radio" v-model="somedayRadio" label="2">
                                        播放&nbsp;
                                        <el-input-number :min="0" :max="999" size="small" :step="1" v-model="somedayCirculationTime"></el-input-number>&nbsp;&nbsp;&nbsp;次结束
                                    </el-radio>
                                </div>
                            </div>
                            <div class="fl" style="margin:20px 0;">
                                <a href="javascript:;" class="yxf-but" @click="someDayAdd">新 增</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { formatDate, formatDate2every } from '@/utils/date.js';
import { region } from "@/assets/common/base"
import Upload from "@/components/upload/Upload.vue"
import Table from "./table2/Table2.vue"
const weekOptions = [
    { name: "周一", id: 1 },
    { name: "周二", id: 2 },
    { name: "周三", id: 3 },
    { name: "周四", id: 4 },
    { name: "周五", id: 5 },
    { name: "周六", id: 6 },
    { name: "周日", id: 7 }];
const cityOptions = ['易售测试屏幕1', '易售测试屏幕2', '易售测试屏幕3', '易售测试屏幕4', '易售测试屏幕1', '易售测试屏幕2', '易售测试屏幕3', '易售测试屏幕4'];
export default {
    name: "new-advertising",
    components: {
        Table,
        Upload,
    },
    data() {
        return {
            isShow: 0,//默认打开每天的
            everydayNumber: 0,//每天的循环播放次数
            everydayRadio: "1",//每天的循环播放的类型，1表示时间类型，2表示播放次数（用字符串）
            somedayRadio: "1",
            weekRadio: "1",
            everydayCirculationTime: '',
            weekCirculationTime: '',
            somedayCirculationTime: '',
            weekArr: [],
            periodRadio: "everyday",//定时插播头部的周期
            list: [{//定时插播头部的radio
                select: "每天",
                type: "everyday",
            }, {
                select: "每周几",
                type: "week",
            }, {
                select: "某天",
                type: "someday",
            }],
            everyday: {
                'start-time': "",
                'stop-time': "",
            },
            week: {
                'start-time': "",
                'stop-time': "",
            },
            someday: {
                'start-time': "",
                'stop-time': "",
            },
            weeks: weekOptions,//星期一到日的数组
            week1: [],//选中的星期
            timerInsertPay_dialog: false,
            insertDate: [],
            ad_type: "",//1是设备，2是设备组
            slotList: "",//广告位列表
            groupList: "",//设备组列表
            campaignList: '',//推广计划列表
            Index: "0",
            active: 'all-advertising',
            bg: "advertising",
            timeToMarketRadio: "qitashijian",//默认选中其他
            contentRadio: "picture",
            ishide: true,
            // 多选数据
            checkAll: true,
            checkedCities: ['易售测试屏幕1', '易售测试屏幕2'],
            cities: cityOptions,
            isIndeterminate: true,
            // 弹出框数据
            deviceGroupDialogRadio: "",
            issueToDeviceGroup: false,//发布到设备组的弹出框
            // 页面数据
            editAdvertisingType: "",//广告类型
            materials: [],
            start: "",//开始时间
            end: "",//结束时间
            campaignId: "",//推广计划id
            adGroups: [{
                slotId: "",
                groupId: ""
            }],
            adDevices: [{
                slotId: "",
                deviceId: ""
            }],
            readonly: false,
            is: false,
        };
    },
    created() {
        this.getEditAdvertisingInfo()
        this.campaignChangeValue();
        this.groupChangeValue();
        this.$esellApi.checkPermissions();
    },
    methods: {
        getEditAdvertisingInfo() {
            this.$esellApi.send("/ad/show.shtml", {
                id: this.$route.query.id
            }, res => {
                console.log("getEditAdvertisingInfo111111111111111", res.payload['start-time'])
                this.editAdvertisingType = "" + res.payload.type;
                if (this.editAdvertisingType == "3") {
                    this.insertDate = res.payload['ad-timers'];
                }
                this.start = new Date(res.payload['start-time']);
                this.end = new Date(res.payload['end-time']);
                this.campaignId = "" + res.payload['campaign-id'];
                // 可能多选
                // 响应数据给个类型是设备还是设备组
                if (res.payload['ad-groups'].length > 0) {
                    this.ad_type = "2";//设备组
                    for (var i = 0; i < res.payload['ad-groups'].length; i++) {
                        console.log("测试", res.payload['ad-groups'])
                        this.adGroups[i].groupId = "" + res.payload['ad-groups'][i]['group-id']
                        this.adGroups[i].slotId = "" + res.payload['ad-groups'][i]['slot-id']
                    }
                } else {
                    this.ad_type = "1";//设备
                    for (var i = 0; i < res.payload['ad-devices'].length; i++) {
                        this.adDevices[i].deviceId = "" + res.payload['ad-devices'][i]['device-id']
                        this.adDevices[i].slotId = "" + res.payload['ad-devices'][i]['slot-id']
                    }
                }
                var obj = {};
                if (res.payload['material-type'] == "WEB") {
                    obj['cover-url'] = 'http://file1.yixinfa.cn/dev/180417/006cebb2107f4eb5a3e88053c922ab7b.png/100'
                } else {
                    if (res.payload['cover-url']) {
                        obj['cover-url'] = res.payload['cover-url'];
                    } else {
                        obj['cover-url'] = 'http://file1.yixinfa.cn/dev/180328/2e7ebf22d83e4cce9788d9176e9b6865.jpg'
                    }
                }
                obj['duration'] = res.payload['duration'];
                obj['name'] = res.payload['name'];
                obj['id'] = res.payload['material-id'];
                obj["material-library"] = true;
                this.materials.push(obj);
                this.slotChangeValue();
            }, res => {
                this.message("error", res.message);
            })
        },
        campaignChangeValue() {
            this.$esellApi.send("/campaign/options.shtml", {}, res => {
                this.campaignList = res.payload;
            }, res => {
                this.message("error", res.message);
            })
        },
        groupChangeValue() {
            this.$esellApi.send("/group/options.shtml", {}, res => {
                this.groupList = res.payload;
            }, res => {
                this.message("error", res.message);
            })
        },
        slotChangeValue(type) {
            console.log(type, 111111)
            if (this.ad_type == "2") {
                console.log("查设备组")
                this.$esellApi.send("/slot/options.shtml", {
                    "group-id": this.adGroups[0].groupId == "" ? this.$route.query.id : this.adGroups[0].groupId
                }, res => {
                    this.slotList = res.payload;
                    if (res.payload.length > 0) {
                        if (type) {
                            this.adGroups[0]['slotId'] = res.payload[0].value;
                        }
                    } else {
                        this.adGroups[0]['slotId'] = "该设备无广告位"
                    }
                }, res => {
                    this.message("error", res.message);
                })
            } else {
                console.log("查设备")
                this.$esellApi.send("/slot/options.shtml", {
                    "device-id": this.adDevices[0].deviceId
                }, res => {
                    this.slotList = res.payload;
                }, res => {
                    this.message("error", res.message);
                })
                console.log("查完设备了")
            }
        },
        //更改设备组选择的值
        changeGroupValue() {
            this.slotChangeValue(true)
        },
        //设备组下拉如果清空则把广告位的下拉一并清空
        clearGroupValue() {
            this.adGroups[0]['slotId'] = "";
        },
        addMaterials(val) {
            this.materials = val;
        },
        // 切换tab
        makeActive(str, index) {
            // 发送请求
            this.Index = index;
            console.log(str);
        },
        // 多选框方法
        handleCheckAllChange(event) {
            this.checkedCities = event.target.checked ? cityOptions : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },
        cdup() {
            this.$router.go(-1);
        },
        // 当前'日'时间函数（简洁写法）
        computationDays(int) {
            const startTime = new Date(); //开始时间
            const endTime = startTime.setTime(startTime.getTime() + 1000 * 3600 * 24 * int); //结束时间
            this.end = endTime;
        },
        // 七天
        sevenDays(int) {
            const startTime = new Date();
            this.start = startTime;
            this.readonly = true;
            this.computationDays(int);
        },
        // 当前'月'时间函数（简洁写法）
        computationMonth(int) {
            let startTime = new Date(); //开始时间
            let endTime = startTime.setMonth(startTime.getMonth() + int);; //结束时间
            this.end = endTime;
        },
        // 一个月
        oneMonth(int) {
            const startTime = new Date();
            this.start = startTime;
            this.readonly = true;
            this.computationMonth(int);
        },
        // 三个月
        threeMonth(int) {
            const startTime = new Date();
            this.start = startTime;
            this.readonly = true;
            this.computationMonth(int);
        },
        // 六个月
        sixMonth(int) {
            const startTime = new Date();
            this.start = startTime;
            this.readonly = true;
            this.computationMonth(int);
        },
        // 其他
        other() {
            this.readonly = false;
        },
        // 完成去审核
        accomplishGoAduit() {
            if (this['campaignId'] == "") {
                this.message("warning", "推广计划不能为空");
                return
            }
            if (this.ad_type == '2' || this.ad_type == undefined) {
                if (this['adGroups'][0]['groupId'] == "") {
                    this.message("warning", "设备组不能为空");
                    return
                }
                if (this['adGroups'][0]['slotId'] == "" || this['adGroups'][0]['slotId'] == undefined) {
                    this.message("warning", "广告位不能为空");
                    return
                }
            }
            if (this.materials == "") {
                this.message("warning", "素材不能为空");
                return
            }
            if (this.materials.length > 1) {
                this.message("warning", "素材只允许一个");
                return
            }
            // 设备组是2
            console.log("设备组是2", this.materials);
            if (this.ad_type == '2' || this.ad_type == undefined) {
                this.$esellApi.send("/ad/update.shtml", {//此对象可以抽离
                    "id": this.$route.query.id,//id
                    "name": "",//广告名称
                    "type": this.editAdvertisingType,//广告类型
                    "campaign-id": this['campaignId'],//推广计划id
                    "start-time": formatDate(+this.start),//开始时间
                    "end-time": formatDate(+this.end),//结束时间
                    "material-id": this.materials[0]['id'],//（后台接口将数据拆开）此处开始没预留，后期要求可能做成多个素材
                    "duration": this.materials[0]['duration'],
                    "name": this.materials[0]['name'],
                    "ad-groups": [{
                        "group-id": this.adGroups[0].groupId,
                        "slot-id": this.adGroups[0].slotId
                    }],
                    "ad-timers": this.insertDate,
                }, res => {
                    this.$router.push({ path: "/adv_audit" });
                }, res => {
                    this.message("error", res.message);
                })
            } else {
                // 设备
                console.log(this.adDevices);
                this.$esellApi.send("/ad/update.shtml", {
                    "id": this.$route.query.id,//id
                    "type": this.editAdvertisingType,//广告类型
                    "campaign-id": this['campaignId'],//推广计划id
                    "start-time": formatDate(+this.start),//开始时间
                    "end-time": formatDate(+this.end),//结束时间
                    "material-id": this.materials[0]['id'],//此处开始没预留，后期要求可能做成多个素材
                    "duration": this.materials[0]['duration'],
                    "name": this.materials[0]['name'],
                    "ad-devices": [{
                        "device-id": this.adDevices[0].deviceId,
                        "slot-id": this.adDevices[0].slotId
                    }],
                    "ad-timers": this.insertDate,
                }, res => {
                    if (res.message == "OK") {
                        this.$router.push({ path: "/adv_audit" });
                    }
                }, res => {
                    this.message("error", res.message);
                })
            }
        },
        adTypeIsShowOrHide(str) {
            this.editAdvertisingType = str;
            if (this.editAdvertisingType == '3') {
                $(".advertising-position-3").css({ "display": "block" })
            } else {
                $(".advertising-position-3").css({ "display": "none" })
            }
        },
        everyDayAdd() {
            if (this.everydayRadio == "2") {
                if (!this.everyday['start-time']) {
                    this.message("warning", "请先设置开机时间");
                    return;
                }
                if (!this.everydayCirculationTime) {
                    this.message("warning", "次数为空不能新增");
                    return;
                }
                var obj = {};
                this.everyday['start-time'] = "";
                this.everyday['stop-time'] = "";
                obj['time-quantum'] = 'everyday';
                obj['action-type'] = 'everyday';
                obj['start-time'] = "";
                obj['stop-time'] = "";
                obj['start_Millisecond'] = "";
                obj['stop_Millisecond'] = "";
                obj['play-times'] = this.everydayCirculationTime;
                this.insertDate.push(obj);
                this.message("success", "新增成功");
            } else {
                if (!this.everyday['start-time']) {
                    this.message("warning", "请先设置开机时间");
                    return;
                }
                if (!this.everyday['stop-time']) {
                    this.message("warning", "请先设置结束时间");
                    return;
                }
                if (this.everyday['start-time'] >= this.everyday['stop-time']) {
                    this.message("warning", "结束时间不能小于开始时间");
                    return;
                }
                var obj = {};
                obj['time-quantum'] = 'everyday';
                obj['start-time'] = formatDate2every(this.everyday['start-time']);
                obj['stop-time'] = formatDate2every(this.everyday['stop-time']);
                obj['start_Millisecond'] = +this.everyday['start-time'];
                obj['stop_Millisecond'] = +this.everyday['stop-time'];
                obj['play-times'] = this.everydayCirculationTime;
                obj['action-type'] = 'everyday';
                this.insertDate.push(obj);
                this.message("success", "新增成功");
            }
        },
        weekAdd() {
            if (this.weekRadio == "2") {
                if (this.week1.length <= 0) {
                    this.message("warning", "请先选择每周几");
                    return;
                }
                if (!this.week['start-time']) {
                    this.message("warning", "请先选择开始时间");
                    return;
                }
                if (!this.weekCirculationTime) {
                    this.message("warning", "次数为空不能新增");
                    return;
                }
                var obj = {};
                this.week['start-time'] = "";
                this.week['stop-time'] = "";
                obj['time-quantum'] = this.week1;
                obj['action-type'] = 'week';
                obj['start-time'] = "";
                obj['stop-time'] = "";
                obj['start_Millisecond'] = "";
                obj['stop_Millisecond'] = "";
                obj['play-times'] = this.weekCirculationTime;
                this.insertDate.push(obj);
                this.message("success", "新增成功");
            } else {
                if (this.week1.length <= 0) {
                    this.message("warning", "请先选择每周几");
                    return;
                }
                if (!this.week['start-time']) {
                    this.message("warning", "请先选择开始时间");
                    return;
                }
                if (!this.week['stop-time']) {
                    this.message("warning", "请先选择结束时间");
                    return;
                }
                if (this.week['start-time'] > this.week['stop-time']) {
                    this.message("warning", "结束时间不能小于开始时间");
                    return;
                }
                var obj = {};
                obj['time-quantum'] = this.week1;
                obj['start-time'] = formatDate2every(this.week['start-time']);
                obj['stop-time'] = formatDate2every(this.week['stop-time']);
                obj['start_Millisecond'] = +this.week['start-time'];
                obj['stop_Millisecond'] = +this.week['stop-time'];
                obj['play-times'] = 0;
                obj['action-type'] = 'week';
                this.insertDate.push(obj);
                this.message("success", "新增成功");
            }
        },
        someDayAdd() {
            if (this.somedayRadio == "2") {
                if (!this.someday['start-time']) {
                    this.message("warning", "请先设置开机时间");
                    return;
                }
                if (!this.somedayCirculationTime) {
                    this.message("warning", "次数为空不能新增");
                    return;
                }
                var obj = {};
                this.everyday['start-time'] = "";
                this.everyday['stop-time'] = "";
                obj['time-quantum'] = '';
                obj['action-type'] = 'someday';
                obj['start-time'] = "";
                obj['stop-time'] = "";
                obj['start_Millisecond'] = "";
                obj['stop_Millisecond'] = "";
                obj['play-times'] = this.somedayCirculationTime;
                this.insertDate.push(obj);
                this.message("success", "新增成功");
            } else {
                var newDate = +new Date();
                if (!this.someday['start-time']) {
                    this.message("warning", "请先选择开始时间");
                    return;
                }
                if (!this.someday['stop-time']) {
                    this.message("warning", "请先选择结束时间");
                    return;
                }
                var obj = {};
                obj['time-quantum'] = '';
                obj['start-time'] = formatDate(this.someday['start-time']);
                obj['stop-time'] = formatDate(this.someday['stop-time']);
                obj['start_Millisecond'] = + this.someday['start-time'];
                obj['stop_Millisecond'] = + this.someday['stop-time'];
                obj['play-times'] = this.somedayCirculationTime;
                obj['action-type'] = 'someday';
                this.insertDate.push(obj);
                this.message("success", "新增成功");
            }
        },
        selectTime(index, type) {
            this.everydayRadio = "1";
            this.weekRadio = "1";
            this.somedayRadio = "1";
            this.weekArr = [];
            this.timeSwitchType = type;
            this.radio = type;
            this.isShow = index;
        },
    },
    // location.reload()刷新页面
    watch: {
        editAdvertisingData: {
            handler: function(val, old) {
                console.log(val.type);
            },
            deep: true
        },
        week1: function(val, oldVal) {
            this.weekArr = val;
        },
        someday: {
            handler(newvalue, oldvalue) {
                this.someday['start-time'] = newvalue['start-time'];
                this.someday['sotp-time'] = newvalue['stop-time'];
                var date11 = new Date(this.someday['start-time']);
                var date22 = new Date(this.someday['stop-time']);
                var newDate = +new Date();
                if (+date11 < newDate + 300000) {
                    this.message("warning", "开始时间不能小于当前时间的5分钟")
                    this.someday['start-time'] = "";
                    return
                }
                if (+date22 < newDate + 300000) {
                    this.message("warning", "结束时间不能小于当前时间的5分钟")
                    this.someday['stop-time'] = "";
                    return
                }
                if (+date11 + 300000 > + date22) {
                    this.message("warning", "结束时间不能小于开始时间的5分钟");
                    this.someday['stop-time'] = "";
                    return;
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
@import "../../sass/newAdvertising.scss";
.large-size {
    width: 300px!important;
}

.el-col-13 {
    width: 52.16667%;
}
</style>


