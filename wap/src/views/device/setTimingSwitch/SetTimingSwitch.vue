<template>
    <div class="set-timing-switch">
        <div class="period">
            <div class="period-left">重复周期</div>
            <div class="period-right">
                <div class="period-everyday period-style" :class="isShow=='0'?'itemid':''" @click="period('everyday','0')">
                    <span>每天</span>
                </div>
                <div class="period-week period-style" :class="isShow=='1'?'itemid':''" @click="period('week','1')">
                    <span>每周</span>
                </div>
                <div class="period-someday period-style" :class="isShow=='2'?'itemid':''" @click="period('someday','2')">
                    <span>某天</span>
                </div>
            </div>
        </div>
        <div class="content">
            <!--               每天                      -->
            <div class="everyday" v-show="isShow=='0'">
                <div class="close-time" @click="everydayShowPlugin('everydayCloseTime')">
                    <div class="close-time-left">关机时间</div>
                    <div class="close-time-right">
                        <input type="text" readonly v-model="everydayCloseTime" placeholder="请选择关机时间">
                    </div>
                </div>
                <div class="open-time" @click="everydayShowPlugin('everydayOpenTime')">
                    <div class="open-time-left">开机时间</div>
                    <div class="open-time-right">
                        <input type="text" readonly v-model="everydayOpenTime" placeholder="请选择开机时间">
                    </div>
                </div>
                <div class="add-to-timing-switch-list" @click="addToTimingSwitchList('everyday')">
                    新增到定时开关机列表
                </div>
                <div class="timing-switch-list">定时开关机列表</div>
                <!--循环下面这个div-->
                <TimingSwitchList :list="everydaylist" @scroll="moveIng" @scrollToEnd="scrollToEnd" @remove="remove"></TimingSwitchList>
                <BottomOperation :message="message" @click="completeSettings('everyday')"></BottomOperation>
            </div>
            <!--                    每周                     -->
            <div class="week everyday" v-show="isShow=='1'">
                <div class="everyday-timing-switch-time">
                    <div class="everyday-timing-switch-time-left">
                        选择周几
                    </div>
                    <div class="everyday-timing-switch-time-right">
                        <checker v-model="demo21" type="checkbox" default-item-class="box" selected-item-class="itemid">
                            <checker-item :value="item" v-for="(item, index) in items1" :key="index">{{item.key}}</checker-item>
                        </checker>
                    </div>
                </div>
                <div class="close-time">
                    <div class="close-time-left">关机时间</div>
                    <div class="close-time-right" @click="weekShowPlugin('weekCloseTime')">
                        <input type="text" readonly v-model="weekCloseTime" placeholder="请选择关机时间">
                    </div>
                </div>
                <div class="open-time">
                    <div class="open-time-left">开机时间</div>
                    <div class="open-time-right" @click="weekShowPlugin('weekOpenTime')">
                        <input type="text" readonly v-model="weekOpenTime" placeholder="请选择开机时间">
                    </div>
                </div>
                <div class="add-to-timing-switch-list" @click="addToTimingSwitchList('week')">
                    新增到定时开关机列表
                </div>
                <div class="timing-switch-list">定时开关机列表</div>
                <TimingSwitchList style="height: calc(100% - 0.97rem - 0.97rem - 0.97rem - 0.8rem - 1.97rem );" :list="weeklist" @scroll="moveIng" @scrollToEnd="scrollToEnd" @remove="remove"></TimingSwitchList>
                <BottomOperation :message="message" @click="completeSettings('week')"></BottomOperation>
            </div>
            <!--                                             某天                                     -->
            <div class="someday everyday" v-show="isShow=='2'">
                <div class="close-time" @click="somedayShowPlugin('somedayCloseTime')">
                    <div class="close-time-left">关机时间</div>
                    <div class="close-time-right">
                        <input type="text" readonly v-model="somedayCloseTime" placeholder="请选择关机时间">
                    </div>
                </div>
                <div class="open-time" @click="somedayShowPlugin('somedayOpenTime')">
                    <div class="open-time-left">开机时间</div>
                    <div class="open-time-right">
                        <input type="text" readonly v-model="somedayOpenTime" placeholder="请选择开机时间">
                    </div>
                </div>
                <div class="add-to-timing-switch-list" @click="addToTimingSwitchList('someday')">
                    新增到定时开关机列表
                </div>
                <div class="timing-switch-list">定时开关机列表</div>
                <TimingSwitchList :list="somedaylist" @scroll="moveIng" @scrollToEnd="scrollToEnd" @remove="remove"></TimingSwitchList>
                <BottomOperation :message="message" @click="completeSettings('someday')"></BottomOperation>
            </div>
        </div>
    </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Checker, CheckerItem } from 'vux'
import TimingSwitchList from './TimingSwitchList.vue'
import BottomOperation from "@/components/bottomOperation/BottomOperation"
import { formatDate } from './../../../utils/date'
import { Toast } from 'mint-ui'
export default {
    name: 'setTimingSwitch',
    components: {
        Checker,
        CheckerItem,
        BottomOperation,
        TimingSwitchList,
        Toast,
        MessageBox
    },
    data() {
        return {
            items1: [{
                key: '周一',
                value: '1'
            }, {
                key: '周二',
                value: '2'
            }, {
                key: '周三',
                value: '3'
            }, {
                key: '周四',
                value: '4'
            }, {
                key: '周五',
                value: '5'
            }, {
                key: '周六',
                value: '6'
            }, {
                key: '周日',
                value: '7'
            }],
            demo21: null,
            isShow: '2',
            // actiontype: "",//据上个页面拿到上一次保存的设置的类型
            periodType: '',//当前页面切换的周期类型
            everydayCloseTime: "",//每天关机时间
            everydayOpenTime: "",//每天开机时间
            weekCloseTime: "",//每周关机时间
            weekOpenTime: "",//每周关机时间
            somedayCloseTime: "",//某天关机时间
            somedayOpenTime: "",//某天关机时间
            message: "完成设置",
            everydaylist: [],//每天的列表数据
            weeklist: [],//每周的列表数据
            somedaylist: [],//每天的列表数据
            page: 1,
            size: 10,
        };
    },
    created() {
        if (this.$route.query.actiontype) {
            if (!this.$route.query.actiontype) {
                this.isShow = "0";
                this.periodType = 'everyday'
            }
            if (this.$route.query.actiontype == "everyday") {
                this.isShow = "0";
                this.periodType = "everyday"
            }
            if (this.$route.query.actiontype == "week") {
                this.isShow = "1";
                this.periodType = "week"
            }
            if (this.$route.query.actiontype == "someday") {
                this.isShow = "2";
                this.periodType = "someday"
            }
        }
        this.getTimingSwitch();
    },
    methods: {
        getTimingSwitch() {
            var url;
            if (this.$route.query.type != '2') {
                url = "/api/device/timer/list.shtml"
            } else {
                url = "/api/group/timer/list.shtml"
            }
            this.$esellApi.send(url, {
                "attrbute-id": this.$route.query.id,
                "action-type": this.periodType,
                page: this.page,
                size: this.size
            }).then(res => {
                if (this.periodType == "everyday") {
                    this.everydaylist = res.payload.data;
                }
                if (this.periodType == "week") {
                    this.weeklist = res.payload.data;
                }
                if (this.periodType == "someday") {
                    this.somedaylist = res.payload.data;
                }
                console.log("这里么", this.somedaylist)
            }).catch(res => {
                Toast({ message: res.message, position: 'middle', duration: 3000 })
            })
        },
        addToTimingSwitchList(type) {
            console.log(type)
            var array = [];
            if (this.demo21) {
                this.demo21.forEach(function(element) {
                    array.push(element.key)
                }, this);
            }
            var url;
            var data = {
                "action-type": this.periodType ? this.periodType : type,
                "attrbute-id": this.$route.query.id,
            };
            if (this.$route.query.type != '2') {
                url = "/api/device/timer/save.shtml"
            } else {
                url = "/api/group/timer/save.shtml"
            }
            if (this.periodType == 'everyday') {
                data["start-time"] = "2018-01-01 " + this.everydayOpenTime;
                data["stop-time"] = "2018-01-01 " + this.everydayCloseTime;
                data['start-millisecond'] = this.timeToRub(this.everydayOpenTime);
                data['stop-millisecond'] = this.timeToRub(this.everydayCloseTime)
            } else if (this.periodType == 'week') {
                data["time-quantum"] = array;
                data["start-time"] = "2018-01-01 " + this.weekOpenTime;
                data["stop-time"] = "2018-01-01 " + this.weekCloseTime;
                data['start-millisecond'] = this.timeToRub(this.weekOpenTime);
                data['stop-millisecond'] = this.timeToRub(this.weekCloseTime)

            } else if (this.periodType == 'someday') {
                data["start-time"] = this.somedayOpenTime;
                data["stop-time"] = this.somedayCloseTime;
                data['start-millisecond'] = +new Date(this.somedayOpenTime);
                data['stop-millisecond'] = +new Date(this.somedayCloseTime)
            }
            if (this.periodType == 'week') {
                if (array.length <= 0) {
                    Toast({ message: "请先选择每周几才能新增", position: 'middle', duration: 3000 })
                    return
                }
            }
            console.log(111, data)
            if (!data["start-time"] || !data["stop-time"]) {
                Toast({ message: "请先选择开关机时间", position: 'middle', duration: 3000 })
                return;
            }
            this.$esellApi.send(url, data).then(res => {
                console.log(res.payload)
                this.getTimingSwitch();
            }).catch(res => {
                Toast({ message: res.message, position: 'middle', duration: 3000 })
            })
        },
        // 日期转换成时间搓
        timeToRub(data) {
            var t = "2018-01-01 " + data;  // 月、日、时、分、秒如果不满两位数可不带0.
            return +new Date(t);  // 将指定日期转换为标准日期格式。Fri Dec 08 2017 20:05:30 GMT+0800 (中国标准时间)
            // 将转换后的标准日期转换为时间戳。
        },
        // 删除当前的定时开关机
        remove(data) {
            MessageBox.confirm('确定执行此操作?').then(action => {
                var url;
                if (this.$route.query.type != "2") {
                    url = "/api/device/timer/delete.shtml"
                } else {
                    url = "/api/group/timer/delete.shtml"
                }
                this.$esellApi.send(url, {
                    id: data.id
                }).then(res => {
                    this.getTimingSwitch();
                    Toast({ message: "删除成功", position: 'middle', duration: 3000 });
                    
                }).catch(res => {
                    Toast({ message: res.message, position: 'middle', duration: 3000 })
                })
            }).catch(() => {
                Toast({ message: "服务器错误", position: 'middle', duration: 3000 })
            });
        },
        completeSettings(type) {
            var url;
            if (this.$route.query.type != "2") {
                url = "/api/device/timer/commit.shtml"
            } else {
                url = "/api/group/timer/commit.shtml"
            }
            this.$esellApi.send(url, {
                "action-type": type,
                "attrbute-id": this.$route.query.id
            }).then(res => {
                Toast({ message: "保存成功", position: 'middle', duration: 3000 })
            }).catch(res => {
                Toast({ message: res.message, position: 'middle', duration: 3000 })
            })
        },

        scrollToEnd() {
            this.canAjax = true;
        },
        moveIng(data, y, maxY) {
            if (data.y < 0) {
                if (this.canAjax) {
                    this.canAjax = false;
                    console.log(this.page * this.size)
                    if (this.total > this.page * this.size) {
                        this.page++;
                        this.getDeviceListData()
                    } else {
                        this.page = this.page
                        Toast({ message: res.message, position: 'middle', duration: 3000 })
                    }
                }
            } else if (data.y > 50) {
                if (this.canAjax) {
                    this.canAjax = false;
                    this.getDeviceListData()
                    console.log("下拉刷新")
                }
            }
        },
        period(type, index) {
            this.periodType = type;
            this.isShow = index;
            this.everydayCloseTime = "";//每天关机时间
            this.everydayOpenTime = "";//每天开机时间
            this.weekCloseTime = "";//每周关机时间
            this.weekOpenTime = "";//每周关机时间
            this.somedayCloseTime = "";//某天关机时间
            this.somedayOpenTime = "";//某天关机时间
            this.getTimingSwitch();
        },
        // 每天的
        everydayShowPlugin(type) {
            var _self = this;
            var newTime;
            if (!newTime) {
                newTime = formatDate(new Date());
            }
            if (this.everydayCloseTime && type == "everydayCloseTime") {
                newTime = this.everydayCloseTime
            }
            if (this.everydayOpenTime && type == "everydayOpenTime") {
                newTime = this.everydayOpenTime
            }
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'HH:mm',
                value: newTime,
                onConfirm(val) {
                    if (type == "everydayCloseTime") {
                        _self.everydayCloseTime = val + ":00";
                    }
                    if (type == "everydayOpenTime") {
                        _self.everydayOpenTime = val + ":00";
                    }
                    console.log('plugin confirm', val)
                },
            })
        },
        weekShowPlugin(type) {
            var _self = this;
            var newTime;
            if (!newTime) {
                newTime = formatDate(new Date());
            }
            if (this.weekCloseTime && type == "weekCloseTime") {
                newTime = this.weekCloseTime
            }
            if (this.weekOpenTime && type == "weekOpenTime") {
                newTime = this.weekOpenTime
            }
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                format: 'HH:mm',
                value: newTime,
                onConfirm(val) {
                    if (type == "weekCloseTime") {
                        _self.weekCloseTime = val + ":00";
                    }
                    if (type == "weekOpenTime") {
                        _self.weekOpenTime = val + ":00";
                    }
                    console.log('plugin confirm', val)
                },
            })
        },
        // 某天的
        somedayShowPlugin(type) {
            var _self = this;
            var newTime;
            if (!newTime) {
                newTime = formatDate(new Date());
            }
            if (this.somedayCloseTime && type == "somedayCloseTime") {
                newTime = this.somedayCloseTime
            }
            if (this.somedayOpenTime && type == "somedayOpenTime") {
                newTime = this.somedayOpenTime
            }
            console.log("this.$vux.datetime.show", this.$vux.datetime);
            this.$vux.datetime.show({
                cancelText: '取消',
                confirmText: '确定',
                // "end-date":"onlySetEndDate",
                // 'start-date': formatDate(new Date()),
                format: 'YYYY-MM-DD HH:mm',
                value: newTime,
                onConfirm(val) {
                    if (type == "somedayCloseTime") {
                        console.log(11111, +new Date(val), +new Date(newTime));
                        if (+new Date(newTime) + 300000 > +new Date(val)) {
                            Toast({ message: "选择时间要求是在当前时间5分钟后", position: 'middle', duration: 3000 })
                        } else {
                            _self.somedayCloseTime = val + ":00";
                        }
                    }
                    if (type == "somedayOpenTime") {
                        if (+new Date(val) < +new Date(_self.somedayCloseTime) + 300000) {
                            Toast({ message: "开机时间要求是在关机时间5分钟后", position: 'middle', duration: 3000 })
                        } else {
                            _self.somedayOpenTime = val + ":00";
                        }
                    }
                },
                onShow() {
                },
                onHide() {
                }
            })
        },
    },
    watch: {
    }
}

</script>
<style lang='scss' scoped>
@import './../../../sass/setTimingSwitch.scss';
@import './../../../sass/base.scss';
.everyday-timing-switch-time {
    position: relative;
    display: flex;
    height: 1.97rem;
    border-bottom: 1px solid $sublineColor;
    width: 100%;
    box-sizing: border-box;
    .everyday-timing-switch-time-left {
        height: 2rem;
        line-height: 2rem;
        font-size: .3rem;
        width: 1.5rem;
    }
    .everyday-timing-switch-time-right {
        padding-top: .22rem;
        flex: 1;
        font-size: .3rem;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        .close {
            height: 1rem;
            line-height: 1rem;
            border-bottom: 1px solid $sublineColor;
            box-sizing: border-box;
            display: flex;
            .close-left {
                padding-right: 0.22rem
            }
            .close-right {}
        }
        .open {
            height: 1rem;
            line-height: 1rem;
            display: flex;
            box-sizing: border-box;
            .open-left {
                padding-right: 0.22rem
            }
            .open-right {}
        }
    }
}

.box {
    margin-right: 0.12rem;
    width: 1.3rem;
    height: 0.6rem;
    box-sizing: border-box;
    border-radius: 0.05rem;
    color: $impTextColor;
    background-color: $sublineColor;
    text-align: center;
    line-height: 0.6rem;
    font-size: 0.3rem;
    margin-bottom: .22rem;
}

.itemid {
    background-color: $impColor!important;
    color: $white!important;
}
</style>