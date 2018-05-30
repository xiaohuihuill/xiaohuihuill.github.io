<template>
    <div class="new-set-timing-play">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/devgroup_mag" class="blue">设备组管理</router-link>
                <span>></span>
                <router-link to="/devgroup_mag/remote_control" class="blue">远程控制</router-link>
                <span>></span>
                <span>新增定时开关机时间</span>
            </span>
        </div>
        <div class="bottom">
            <div>
                <div class="cycle-period">
                    <div>
                        <span style="margin-right:6px;">选择循环周期</span>
                        <span style="margin-right:20px;" v-for="(item,index) in list" :key="index" @click="selectTime(index)">
                            <el-radio class="radio" v-model="radio" :label="item.radioIndex">{{item.select}}</el-radio>
                        </span>
                    </div>
                    <!--每天-->
                    <div v-show="isShow==0" class="everyday" style="margin:20px 0 20px;">
                        <div>
                            <div style="height:30px;line-height:30px;" class="clearfix">
                                <div class="fl everyday-start-time-title">
                                    <span style="margin-right:10px;">开始时间</span>
                                </div>
                                <div class="fl everyday-start-time-input" style="height:34px;width:60%;">
                                    <el-time-select style="width:513px;" v-model="value1" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="请选择开始时间">
                                    </el-time-select>
                                </div>
                            </div>
                            <div style="height:30px;line-height:30px;margin-top:20px;width:100%;" class="clearfix">
                                <div class="fl everyday-end-time-title">
                                    <span style="margin-right:10px;">结束时间</span>
                                </div>
                                <div class="fl clearfix" style="height:30px;">
                                    <div class="fl clearfix">
                                        <div class="fl everyday-end-time-loop-playback-title" style="margin-right:6px;">
                                            <el-radio class="radio" v-model="radio22" label="1">循环播放至</el-radio>
                                        </div>
                                        <div class="fl everyday-end-time-loop-playback-input">
                                            <el-time-select v-model="value2" :picker-options="{
                                                        start: '08:30',
                                                         step: '00:15',
                                                        end: '18:30'}" placeholder="请选择结束时间">
                                            </el-time-select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--每周几-->
                    <div v-show="isShow==1" class="weekly" style="margin:20px 0 20px;">
                        <div>
                            <div style="margin-bottom:20px" class="clearfix">
                                <span class="fl">选择周几</span>
                                <span class="fl" style="margin-left:10px;">
                                    <el-checkbox-group v-model="checkedCities1">
                                        <el-checkbox style="margin-right:20px;" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                                    </el-checkbox-group>
                                </span>
                            </div>
                            <div style="height:30px;line-height:30px;" class="clearfix">
                                <div class="fl everyday-start-time-title">
                                    <span style="margin-right:10px;">开始时间</span>
                                </div>
                                <div class="fl everyday-start-time-input" style="height:34px;width:60%;">
                                    <el-time-select style="width:513px;" v-model="value1" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="请选择开始时间">
                                    </el-time-select>
                                </div>
                            </div>
                            <div style="height:30px;line-height:30px;margin-top:20px;width:100%;" class="clearfix">
                                <div class="fl everyday-end-time-title">
                                    <span style="margin-right:10px;">结束时间</span>
                                </div>
                                <div class="fl clearfix" style="height:34px;">
                                    <div class="fl clearfix">
                                        <div class="fl everyday-end-time-loop-playback-title" style="margin-right:6px;">
                                            <el-radio class="radio" v-model="radio22" label="1">循环播放至</el-radio>
                                        </div>
                                        <div class="fl everyday-end-time-loop-playback-input">
                                            <el-time-select v-model="value2" :picker-options="{
                                                                                                                            start: '08:30',
                                                                                                                            step: '00:15',
                                                                                                                            end: '18:30'
                                                                                                                          }" placeholder="请选择结束时间">
                                            </el-time-select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--某天-->
                    <div v-show="isShow==2" class="someday" style="margin:20px 0 20px;">
                        <div style="height:30px;line-height:30px">
                            <div class="fl everyday-start-time-title">
                                <span style="margin-right:10px;">开始时间</span>
                            </div>
                            <div style="width:100%;">
                                <el-date-picker style="width:513px;" v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions0">
                                </el-date-picker>
                            </div>
                        </div>
                        <div style="margin-top:20px;">
                            <div class="fl everyday-start-time-title" >
                                <span style="margin-right:10px;">已选择</span>
                            </div>
                            <div style="margin-left:65px;">111</div>
                        </div>
                        <div style="height:30px;line-height:30px;margin-top:20px;width:100%;" class="clearfix">
                            <div class="fl everyday-end-time-title">
                                <span style="margin-right:10px;">结束时间</span>
                            </div>
                            <div class="fl clearfix" style="height:34px;">
                                <div class="fl clearfix">
                                    <div class="fl everyday-end-time-loop-playback-title" style="margin-right:6px;">
                                        <el-radio class="radio" v-model="radio22" label="1">循环播放至</el-radio>
                                    </div>
                                    <div class="fl everyday-end-time-loop-playback-input">
                                        <el-time-select v-model="value2" :picker-options="{
                                            start: '08:30',
                                            step: '00:15',
                                             end: '18:30'
                                                 }" placeholder="请选择结束时间">
                                        </el-time-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--操作-->
            <div class="play-list-operation">
                <a href="javascript:;" class="yxf-but" @click="cdup">返回</a>
                <a href="javascript:;" class="yxf-but" style="margin-left:6px;">保存</a>
            </div>
        </div>
    </div>
</template>
<script>
const cityOptions = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
export default {
    name: 'new-set-timing-play',
    data() {
        return {
            checkedCities1: [],
            cities: cityOptions,
            all: 40,
            value1: '',
            value2: "",
            ishide: true,
            radio: "0",
            radio22: "1",
            isShow: 0,
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: ''
        }
    },
    created() {
        this.list = [{
            select: "每天",
            radioIndex: "0",
        }, {
            select: "每周几",
            radioIndex: "1",
        }, {
            select: "某天",
            radioIndex: "2",
        }];
        console.log(this.radio);
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        cdup(){
            this.$router.go(-1);
        },
        selectTime(index) {
            this.isShow = index;
        },
        edit(row) {
        },
        delete1(row) {
        },
    },
    watch: {
        checkedCities1(newVal, oldVal) {
            console.log(newVal);
        },
    }
}
</script>
<style lang="scss" scoped>
@import '../../sass/newSetTimingPlay.scss';
</style>

