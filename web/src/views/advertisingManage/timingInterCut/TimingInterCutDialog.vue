<template>
    <div class="timing-inter-cut-dialog">
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
export default {
    name: '',
    data() {
        return {
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
            everydayNumber: 0,//每天的循环播放次数
            everydayRadio: "1",//每天的循环播放的类型，1表示时间类型，2表示播放次数（用字符串）
            somedayRadio: "1",
            weekRadio: "1",
            weekArr: [],
        };
    },
    methods: {

    }
}

</script>
<style lang='scss' scoped>

</style>