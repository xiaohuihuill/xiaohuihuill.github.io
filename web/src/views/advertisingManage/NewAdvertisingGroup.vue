<template>
    <div class="new-advertising">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/adv_mag" class="blue">广告管理</router-link>
                <span>></span>
                <span>新建广告组</span>
            </span>
        </div>
        <div class="bottom">
            <!--first step-->
            <div class="first-step">
                <div class="first-step-title clearfix">
                    <span class="fl">第一步&nbsp;:&nbsp;设置广告组信息</span>
                </div>
                <div class="first-step-info">
                    <!--推广计划-->
                    <div class="popularization-plan">
                        <el-row>
                            <el-col :span="2" style="width:48px;">
                                <div class="grid-content bg-purple">推广计划</div>
                            </el-col>
                            <el-col :span="20" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <el-select v-model="advertisingManagerData.popularizationPlanValue" style="width:80%" placeholder="请选择推广计划">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
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
                            <el-col :span="3" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span @click="sevenDays(7)">
                                        <el-radio class="radio" v-model="advertisingManagerData.timeToMarketRadio" label="qitian">七天</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content bg-purple-light">
                                    <span @click="oneMonth(30)">
                                        <el-radio class="radio" v-model="advertisingManagerData.timeToMarketRadio" label="yigeyue">一个月</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple-light">
                                    <span @click="threeMonth(90)">
                                        <el-radio class="radio" v-model="advertisingManagerData.timeToMarketRadio" label="sangeyue">三个月</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple-light">
                                    <span @click="sixMonth(180)">
                                        <el-radio class="radio" v-model="advertisingManagerData.timeToMarketRadio" label="liugeyue">六个月</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="4">
                                <div class="grid-content bg-purple-light">
                                    <span @click="other">
                                        <el-radio class="radio" v-model="advertisingManagerData.timeToMarketRadio" label="qitashijian">其他时间</el-radio>
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
                            <el-col :span="7" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-date-picker style="width:100%" :readonly="readonly " v-model="advertisingManagerData.dateValue1" type="datetime" placeholder="选择日期时间">
                                        </el-date-picker>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="2" >
                                <div class="grid-content bg-purple" style="text-align:center">
                                    <span>
                                        结束时间
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="7">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-date-picker style="width:100%" :readonly="readonly" v-model="advertisingManagerData.dateValue2" type="datetime" placeholder="选择日期时间">
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
                                <div class="grid-content bg-purple">广告组类型</div>
                            </el-col>
                            <el-col :span="3" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-radio class="radio" v-model="advertisingManagerData.typeRadio" label="common">普通广告</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-radio class="radio" v-model="advertisingManagerData.typeRadio" label="urgency">紧急广告</el-radio>
                                    </span>
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
                    <div class="put-in-target">
                        <el-row>
                            <el-col :span="2" style="width:48px;">
                                <div class="grid-content bg-purple">投放目标</div>
                            </el-col>
                            <el-col :span="3" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-radio class="radio" v-model="advertisingManagerData.typeRadio1" label="common">设备组</el-radio>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-radio class="radio" v-model="advertisingManagerData.typeRadio1" label="urgency">设备</el-radio>
                                    </span>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="device-group" style="height:30px;">
                        <el-row style="height:30px;">
                            <el-col :span="2" style="width:48px;">
                                <div class="grid-content bg-purple">设备组</div>
                            </el-col>
                            <el-col :span="12" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-select v-model="advertisingPlace2" style="width:100%" placeholder="请选择设备组">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
                                            </el-option>
                                        </el-select>
                                    </span>
                                </div>
                            </el-col>
                            <el-col :span="4" style="text-align: right;">
                                <a href="javascript:;" class="yxf-but" @click="issueToDeviceGroup = true">发布到多个设备组</a>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="advertising-position">
                        <el-row>
                            <el-col :span="2" style="width:48px;">
                                <div class="grid-content bg-purple">广告位</div>
                            </el-col>
                            <el-col :span="20" style="margin-left:20px;">
                                <div class="grid-content bg-purple-light">
                                    <span>
                                        <el-select v-model="advertisingPlace2" style="width:80%" placeholder="请选择广告位">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
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
                    <Upload></Upload>
                </div>
            </div>
            <div class="submit" style="margin-left:20px;">
                <div>
                    <a href="javascript:;" class="yxf-but" @click="cdup">返回</a>
                    
                    <a href="javascript:;" class="yxf-but" style="margin-left:6px;" @click="successGoToAudit">完成，去审核</a>
                    <a href="javascript:;" class="yxf-but" style="margin-left:6px;" @click="successContinueToRelease">完成，继续发布</a>
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

    </div>
</template>
<script>
import Upload from "@/components/upload/Upload.vue"
import Table from "./table2/Table2.vue"
const cityOptions = ['易售测试屏幕1', '易售测试屏幕2', '易售测试屏幕3', '易售测试屏幕4', '易售测试屏幕1', '易售测试屏幕2', '易售测试屏幕3', '易售测试屏幕4'];
export default {
    name: "new-advertising",
    components: {
        Table,
        Upload
    },
    data() {
        return {
            Index: "0",
            active: 'all-advertising',
            bg: "advertising",
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
            advertisingManagerData: {
                timeToMarketRadio: "qitian",
                typeRadio: "common",
                typeRadio1: "common",
                contentRadio: "picture",
                dateValue1: +new Date().getTime(),
                dateValue2: +new Date().setTime(new Date().getTime() + 3600 * 1000 * 24 * 7),
                popularizationPlanValue: "",
                advertisingPlace1: "",
                advertisingPlace2: "",
            },
            readonly: true,
            is: false,
            options: [
                {
                    value: "选项1",
                    label: "黄金糕"
                },
                {
                    value: "选项2",
                    label: "双皮奶"
                },
                {
                    value: "选项3",
                    label: "蚵仔煎"
                },
                {
                    value: "选项4",
                    label: "龙须面"
                },
                {
                    value: "选项5",
                    label: "北京烤鸭"
                }
            ],
        };
    },
    created() {
        // console.log(this.typeRadio);
        // console.log(this.dateValue1);
        // const now = new Date();
        // this.dateValue1 = "231";
        // this.dateValue2 = "123";
        // console.log(this.dateValue1);
        console.log(this.advertisingManagerData);
        this.cities = ['易售测试屏幕1', '易售测试屏幕2', '易售测试屏幕3'];
        console.log(this.cities);
        // 发送请求拿到页面表格数值赋值给list

    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        successGoToAudit(){
            this.$router.push({path:'/adv_audit'})
        },
        successContinueToRelease(){
            this.$router.push({path:''})
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
        // 弹出框
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        cdup() {
            // this.$router.push({ path: "/adv_mag/new_adv" });
            this.$router.go(-1);
        },
        // 当前时间函数（简洁写法）
        computationDays(int) {
            const startTime = new Date(); //开始时间
            const endTime = startTime.setTime(startTime.getTime() + 3600 * 1000 * 24 * int); //结束时间
            this.advertisingManagerData.dateValue2 = endTime;
        },
        sevenDays(int) {
            this.readonly = true;
            this.computationDays(int);
        },
        oneMonth(int) {
            this.readonly = true;
            this.computationDays(int);
        },
        threeMonth(int) {
            this.readonly = true;
            this.computationDays(int);
        },
        sixMonth(int) {
            this.readonly = true;
            this.computationDays(int);
        },
        year(int) {
            this.readonly = true;
            this.computationDays(int);
        },
        perpetual() {
            this.advertisingManagerData = "";
            this.advertisingManagerData = "";
            this.readonly = true;
        },
        other() {
            this.readonly = false;
        },
    },
    watch: {
        radio: function(newValue, oldValue) { }
    },
    destroyed() {
    },
    updated() {
        // console.log(this.timeToMarketRadio);
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
</style>


