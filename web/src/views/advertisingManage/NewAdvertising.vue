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
                <span>新建广告</span>
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
                                    <el-select v-model="newAdvertisingData['campaign-id']" style="width:80%" placeholder="请选择推广计划" @visible-change='campaignChangeValue' clearable>
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
                                    <span @change="sevenDays(7)">
                                        <el-radio class="radio" v-model="timeToMarketRadio" label="qitian">七天</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content bg-purple-light">
                                    <span @change="oneMonth(1)">
                                        <el-radio class="radio" v-model="timeToMarketRadio" label="yigeyue">一个月</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content bg-purple-light">
                                    <span @change="threeMonth(3)">
                                        <el-radio class="radio" v-model="timeToMarketRadio" label="sangeyue">三个月</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content bg-purple-light">
                                    <span @change="sixMonth(6)">
                                        <el-radio class="radio" v-model="timeToMarketRadio" label="liugeyue">六个月</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2">
                                <div class="grid-content bg-purple-light">
                                    <span @change="other">
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
                                        <el-date-picker style="width:100%" :editable="false" :readonly="readonly " v-model="newAdvertisingData['start-time']" type="datetime" placeholder="选择日期时间">
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
                                        <el-date-picker style="width:100%" :editable="false" :readonly="readonly" v-model="newAdvertisingData['end-time']" type="datetime" placeholder="选择日期时间">
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
                            <el-col :span="2" style="margin-left:20px;" v-if="this.$route.query.ad_type!=2">
                                <div class="grid-content bg-purple-light">
                                    <span @change="adTypeIsShowOrHide('1')">
                                        <el-radio class="radio" v-model="newAdvertisingData.type" label="1">普通广告</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <!--<el-col :span="2" :style="{'margin-left':this.$route.query.ad_type=='2'?'20px':'0'}">
                                                                                                                                                                              <div class="grid-content bg-purple-light">
                                                                                                                                                                              <span @change="adTypeIsShowOrHide('2')">
                                                                                                                                                                               <el-radio class="radio" v-model="newAdvertisingData.type" label="2">紧急广告</el-radio>
                                                                                                                                                                           </span>
                                                                                                                                                                     </div>
                                                                                                                                                            </el-col>-->
                            <!--<el-col :span="2" style="margin-left:20px;" v-if="this.$route.query.ad_type!=2">
                                                        <div class="grid-content bg-purple-light">
                                                            <span @change="adTypeIsShowOrHide('3')">
                                                                <el-radio class="radio" v-model="newAdvertisingData.type" label="3">定时插播</el-radio>
                                                            </span>
                                                        </div>
                                                    </el-col>-->
                        </el-row>
                    </div>
                    <div class="advertising-position-3 advertising-type" v-if="this.newAdvertisingData.type =='3'">
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
                                                    <span v-html="scope.row['play-times']== 0 ? '——' :scope.row['play-times'] "></span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column label="操作">
                                                <template scope="scope">
                                                    <a href="javascript:void(0);" @click="removeInsertDate(scope.$index, scope.row, insertDate)">删除</a>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </div>
            <!--the second step-->
            <div class="second-step">
                <div class="second-step-title clearfix">
                    <span class="fl">第二步&nbsp;:&nbsp;选择投放广告位</span>
                </div>
                <div class="second-step-info">
                    <div class="device-group" style="height:30px;">
                        <el-row style="height:30px;" v-if="this.$route.query.type=='1'">
                            <el-col :span="2" style="width:48px;">
                                <div class="grid-content bg-purple">设备</div>
                            </el-col>
                            <el-col :span="10" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        设备名称({{this.$route.query.name}})
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row style="height:30px;" v-else>
                            <el-col :span="2" style="width:48px;">
                                <div class="grid-content bg-purple">设备组</div>
                            </el-col>
                            <el-col :span="10" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-select v-model="newAdvertisingData['ad-groups'][0]['group-id']" style="width:100%" placeholder="请选择设备组" clearable @change="changeGroupValue">
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
                            <el-col :span="13" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span v-if="this.$route.query.type=='2'">
                                        <el-select v-model="newAdvertisingData['ad-groups'][0]['slot-id']" style="width:80%" placeholder="请选择广告位" clearable @visible-change='slotChangeValue'>
                                            <el-option v-for="item in slotList" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </span>
                                    <span v-else>
                                        <el-select v-model="newAdvertisingData['ad-devices'][0]['slot-id']" style="width:80%" placeholder="请选择广告位" clearable @visible-change='slotChangeValue'>
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
                    <a href="javascript:;" class="yxf-but" style="margin-left:6px;" @click="accomplishGoIssue">完成，继续发布</a>
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
            <!--<span slot="footer" class="dialog-footer">
                                                                                                                    <a href="javascript:;" @click="timerInsertPay_dialog = false" class="yxf-but" style="margin-right:10px;">取 消</a>
                                                                                                                    <a href="javascript:;" @click="timerInsertPay_dialog = false" class="yxf-but">确 定</a>
                                                                                                                </span>-->
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
        Upload
    },
    data() {
        return {
            flag: true,
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
            weeks: weekOptions,//星期一到日的数组
            week1: [],//选中的星期
            insertDate: [],
            radio: '0',
            someDayAddData: [],
            everyDayAddData: [],
            weekAddData: [],
            materials: [],
            slotList: "",//广告位列表
            groupList: "",//设备组列表
            campaignList: '',//推广计划列表
            Index: "0",
            active: 'all-advertising',
            bg: "advertising",
            timeToMarketRadio: "qitian",//默认选中七天
            contentRadio: "picture",
            ishide: true,
            // 多选数据
            checkAll: true,
            checkedCities: ['易售测试屏幕1'],
            cities: cityOptions,
            isIndeterminate: true,
            // 弹出框数据
            deviceGroupDialogRadio: "",
            issueToDeviceGroup: false,//发布到设备组的弹出框
            timerInsertPay_dialog: false,
            // 页面数据
            newAdvertisingData: {
                "type": this.$route.query.ad_type ? "" + this.$route.query.ad_type : "1",//广告类型
                "campaign-id": this.$route.query['campaign-id'] ? this.$route.query['campaign-id'] : '',//推广计划id
                "start-time": (+new Date()),//开始时间
                "end-time": (+new Date() + 3600 * 1000 * 24 * 7),//结束时间
                "materials": [],
                "ad-groups": [{
                    "slot-id": "",
                    "group-id": "",
                }],
                "ad-devices": [{
                    "slot-id": "",
                    "divece-id": "",
                }],
                "ad-timers": [],
            },
            readonly: true,
            is: false,
        };
    },
    created() {
        if (this.$route.query.type == "1") {
            console.log("设备发广告");
        }
        // 1是设备
        // 2是设备组
        this.campaignChangeValue();
        this.groupChangeValue();
        this.slotChangeValue();
        // 发送请求拿到页面表格数值赋值给list
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        everyDayAdd() {
            var newDate = +new Date();
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
                this.everyday['stop-time'] = "";
                obj['time-quantum'] = 'everyday';
                obj['action-type'] = 'everyday';
                obj['start-time'] = formatDate2every(this.everyday['start-time']);
                obj['stop-time'] = "";
                obj['start_Millisecond'] = +this.everyday['start-time'];
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
                this.week['stop-time'] = "";
                obj['time-quantum'] = this.week1;
                obj['action-type'] = 'week';
                obj['start-time'] = formatDate2every(this.week['start-time']);
                obj['stop-time'] = "";
                obj['start_Millisecond'] = +this.week['start-time'];
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
                this.someday['stop-time'] = "";
                obj['time-quantum'] = '';
                obj['action-type'] = 'someday';
                obj['start-time'] = formatDate2every(this.someday['start-time']);
                obj['stop-time'] = "";
                obj['start_Millisecond'] = +this.someday['start-time'];
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
        // 普通广告与紧急广告切换
        adTypeIsShowOrHide(str) {
            this.newAdvertisingData.type = str;
            if (this.newAdvertisingData.type == '2') {
                $(".advertising-position").css({ "display": "none" })
                $(".advertising-position-3").css({ "display": "none" })
            } else if (this.newAdvertisingData.type == '1') {
                $(".advertising-position").css({ "display": "block" })
                $(".advertising-position-3").css({ "display": "none" })
            } else if (this.newAdvertisingData.type == '3') {
                // $(".advertising-position").css({ "display": "none" })
                // $(".advertising-position-3").css({ "display": "block" })
            }
        },
        // 切换重置参数
        selectTime(index, type) {
            this.everydayRadio = "1";
            this.weekRadio = "1";
            this.somedayRadio = "1";
            this.weekArr = [];
            this.timeSwitchType = type;
            this.radio = type;
            this.isShow = index;
        },
        removeInsertDate(index, row, rows) {
            rows.splice(index, 1);
        },
        addInsertDate() {
            this.insertDate = [{ id: 1, date: 'everday', 'start-time': '08:00:00', 'stop-time': '09:00:00', total: 105 }];
            console.log(this.insertDate);
        },

        campaignChangeValue() {
            this.$esellApi.send("/campaign/options.shtml", {}, res => {
                console.log(res.payload)
                this.campaignList = res.payload;
            }, res => {
                this.message("error", res.message)
            })
        },
        groupChangeValue() {
            this.$esellApi.send("/group/options.shtml", {}, res => {
                this.groupList = res.payload;
                if (this.$route.query.type == "1") {
                    this.newAdvertisingData['ad-devices'][0]["slot-id"] = this.$route.query.soltNum ? this.$route.query.soltNum : ''
                    this.newAdvertisingData['ad-devices'][0]["divece-id"] = this.$route.query.id ? this.$route.query.id : ''
                } else {
                    this.newAdvertisingData['ad-groups'][0]["slot-id"] = this.$route.query.soltNum ? this.$route.query.soltNum : ''
                    this.newAdvertisingData['ad-groups'][0]["group-id"] = this.$route.query.id ? this.$route.query.id : ''
                }
            }, res => {
                this.message("error", res.message)
            })
        },
        slotChangeValue(val) {
            if (this.$route.query.type == "1") {
                this.$esellApi.send("/slot/options.shtml", {
                    "device-id": this.$route.query.id,
                    "template-id": this.$route.query.tempId ? this.$route.query.tempId : ""
                }, res => {
                    this.slotList = res.payload;
                }, res => {
                    this.message("error", res.message)
                })
                return
            }
            if (this.$route.query.type == "2" || val) {
                this.$esellApi.send("/slot/options.shtml", {
                    "group-id": this.newAdvertisingData['ad-groups'][0]['group-id'] == "" ? this.$route.query.id : this.newAdvertisingData['ad-groups'][0]['group-id'],
                    "template-id": this.$route.query.tempId ? this.$route.query.tempId : ""
                }, res => {
                    this.slotList = res.payload;
                    if (res.payload.length > 0) {
                        if (val) {
                            this.newAdvertisingData['ad-groups'][0]['slot-id'] = res.payload[0].value;
                        }
                    } else {
                        this.newAdvertisingData.adGroups[0]['slotId'] = "该设备无广告位"
                    }
                }, res => {
                    this.message("error", res.message)
                })
                return
            }
        },
        changeGroupValue() {
            this.slotChangeValue(true)
        },
        // 子组件传过来的素材
        addMaterials(val) {
            console.log(val)
            this.materials = val;
            this.newAdvertisingData.materials = val;
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
            this.newAdvertisingData['end-time'] = endTime;
        },
        // 七天
        sevenDays(int) {
            this.readonly = true;
            this.computationDays(int);
        },
        // 当前'月'时间函数（简洁写法）
        computationMonth(int) {
            var startTime = new Date(); //开始时间
            var endTime = startTime.setMonth(startTime.getMonth() + int); //结束时间
            this.newAdvertisingData['end-time'] = endTime;
        },
        // 一个月
        oneMonth(int) {
            this.readonly = true;
            this.computationMonth(int);
        },
        // 三个月
        threeMonth(int) {
            this.readonly = true;
            this.computationMonth(int);
        },
        // 六个月
        sixMonth(int) {
            this.readonly = true;
            this.computationMonth(int);
        },
        // 其他
        other() {
            this.readonly = false;
        },
        // 完成去审核请求

        // 完成去审核
        accomplishGoAduit() {
            if (this.flag) {
                this.flag = false;
            } else {
                return;
            }
            if (this.newAdvertisingData['campaign-id'] == "") {
                this.message("warning", "推广计划不能为空");
                return
            }
            if (this.$route.query.type == '2' || this.$route.query.type == undefined) {
                if (this.newAdvertisingData['ad-groups'][0]['group-id'] == "") {
                    this.message("warning", "设备组不能为空");
                    return
                }
                if (this.newAdvertisingData.type != '2') {
                    console.log(12121212)
                    if (this.newAdvertisingData['ad-groups'][0]['slot-id'] == "" || this.newAdvertisingData['ad-groups'][0]['slot-id'] == undefined) {
                        this.message("warning", "广告位不能为空");
                        return
                    }
                }
            }
            if (this.newAdvertisingData.materials == "") {
                this.message("warning", "素材不能为空");
                return
            }
            if (this.$route.query.type == "1") {
                var data = {
                    "type": this.newAdvertisingData.type,//广告类型
                    "campaign-id": this.newAdvertisingData['campaign-id'],//推广计划id
                    "start-time": formatDate(+this.newAdvertisingData["start-time"]),//开始时间
                    "end-time": formatDate(+this.newAdvertisingData["end-time"]),//结束时间
                    "materials": this.newAdvertisingData.materials,
                    "ad-devices": [{
                        "slot-id": this.newAdvertisingData['ad-devices'][0]['slot-id'],
                        "device-id": this.newAdvertisingData['ad-devices'][0]['divece-id'],
                    }],
                    "ad-timers": this.insertDate,
                }
                console.log("想看下这个数据的广告位id", data);
                this.advertisingAdd(data)
            } else {
                var data = {
                    "type": this.newAdvertisingData.type,//广告类型
                    "campaign-id": this.newAdvertisingData['campaign-id'],//推广计划id
                    "start-time": formatDate(+this.newAdvertisingData["start-time"]),//开始时间
                    "end-time": formatDate(+this.newAdvertisingData["end-time"]),//结束时间
                    "materials": this.newAdvertisingData.materials,
                    "ad-groups": [{
                        "slot-id": this.newAdvertisingData['ad-groups'][0]['slot-id'],
                        "group-id": this.newAdvertisingData['ad-groups'][0]['group-id'],
                    }],
                    "ad-timers": this.insertDate,
                }
                this.advertisingAdd(data)
            }
        },
        advertisingAdd(data) {
            this.$esellApi.send("/ad/add.shtml", data, res => {
                this.flag = true;
                if (res.message == "OK") {
                    this.$router.push({ path: "/adv_audit" });
                }
            }, res => {
                this.message("error", res.message);
            })
        },
        // 完成去发布
        accomplishGoIssue() {
            if (this.newAdvertisingData['campaign-id'] == "") {
                this.message("warning", "推广计划不能为空");
                return
            }
            if (this.newAdvertisingData['ad-groups']['group-id'] == "") {
                this.message("warning", "设备组不能为空");
                return
            }
            if (this.newAdvertisingData['ad-groups']['slot-id'] == "") {
                this.message("warning", "广告位不能为空");
                return
            }
            if (this.newAdvertisingData.materials == "") {
                this.message("warning", "素材不能为空");
                return
            }
            console.log("this.newAdvertisingData.materials11111", this.newAdvertisingData);
            if (this.$route.query.type == "1") {
                this.$esellApi.send("/ad/add.shtml", {
                    "type": this.newAdvertisingData.type,//广告类型
                    "campaign-id": this.newAdvertisingData['campaign-id'],//推广计划id
                    "start-time": formatDate(+this.newAdvertisingData["start-time"]),//开始时间
                    "end-time": formatDate(+this.newAdvertisingData["end-time"]),//结束时间
                    "materials": this.newAdvertisingData.materials,
                    "ad-devices": [{
                        "slot-id": this.newAdvertisingData['ad-devices'][0]['slot-id'],
                        "device-id": this.newAdvertisingData['ad-devices'][0]['divece-id'],
                    }],
                    "ad-timers": this.insertDate,
                }, res => {
                    window.location.reload()
                }, res => {
                    this.message("error", res.message);
                })
            } else {
                this.$esellApi.send("/ad/add.shtml", {
                    "type": this.newAdvertisingData.type,//广告类型
                    "campaign-id": this.newAdvertisingData['campaign-id'],//推广计划id
                    "start-time": formatDate(+this.newAdvertisingData["start-time"]),//开始时间
                    "end-time": formatDate(+this.newAdvertisingData["end-time"]),//结束时间
                    "materials": this.newAdvertisingData.materials,
                    "ad-groups": [{
                        "slot-id": this.newAdvertisingData['ad-groups'][0]['slot-id'],
                        "group-id": this.newAdvertisingData['ad-groups'][0]['group-id'],
                    }],
                    "ad-timers": this.insertDate,
                }, res => {
                    window.location.reload()
                }, res => {
                    this.message("error", res.message);
                })
            }
        },
        region() {
        }
    },
    // location.reload()刷新页面
    watch: {
        week1: function(val, oldVal) {
            this.weekArr = val;
        },
        materials: {
            handler(val, oldVal) {
                console.log("新增页面的", val)
                val = '';
            },
            deep: true
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


