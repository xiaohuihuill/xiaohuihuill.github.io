<template>
    <div class="addAdv" ref="addAdv">
        <Scroll :data="refreshScroll">
            <div class="addAdv_content">
                <div class="title">
                    <span>设置广告信息</span>
                </div>
                <div class="addAdv_wrapper">
                    <div class="item">
                        <div class="item_left">
                            <span>*</span> 推广计划</div>
                        <div class="item_right plan_name">
                            <SelectContent :value="planName" :placeholder="planInt" @showItem="checkPlan" @clearItem="clearPlan"></SelectContent>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item_left">
                            <span>*</span> 广告名称</div>
                        <div class="item_right">
                            <input type="text" v-model="advName">
                        </div>
                    </div>
                    <div class="item">
                        <div class="item_left">
                            <span>*</span> 投放时间</div>
                        <div class="item_right">
                            <Select @clickItem="clickItem" :list=selectList :selectType="selectType"></Select>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item_left pl24">
                            开始时间
                        </div>
                        <div class="item_right">
                            <div @click="checkStartTime" v-if="selectType==4">
                                {{startTime}}
                            </div>
                            <div class="time" v-else>
                                {{startTime}}
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item_left pl24">
                            结束时间
                        </div>
                        <div class="item_right">
                            <div @click="checkEndTime" v-if="selectType==4">
                                {{endTime}}
                            </div>
                            <div class="time" v-else>
                                {{endTime}}
                            </div>
                        </div>
                    </div>

                    <div class="item no_border">
                        <div class="item_left">
                            <span>*</span> 广告类型</div>
                        <div class="item_right">
                            <Select @clickItem="changeSlotType" :list="slotType" :selectType="checkedSlotType"></Select>
                        </div>
                    </div>

                </div>
                <div class="title">
                    <span>选择投放广告位</span>
                </div>
                <div class="addAdv_wrapper">
                    <div class="item no_border">
                        <div class="item_left adv_position">
                            <span>*</span> 广告位置
                        </div>
                        <div class="item_right" v-if="isGroup==1">
                            <div class="item_gtoup">
                                <SelectContent :value="groupName" :placeholder=" groupInt" @showItem="checkGroup" @clearItem="clearGroup"></SelectContent>
                            </div>
                            <div class="item_slot">
                                <SelectContent :value="slotName" :placeholder="slotInt" @showItem="checkSlot" @clearItem="clearSlot" v-if="groupName"></SelectContent>
                                <div class="deffault" v-else>
                                    未选设备组，无法选择广告位
                                </div>
                            </div>
                        </div>
                        <div class="item_right" v-else>
                            <div class="item_gtoup">
                                {{deviceName}}
                            </div>
                            <div class="item_slot">
                                <SelectContent :value="slotName" :placeholder="slotInt" @showItem="checkSlot" @clearItem="clearSlot" v-if="deviceName!=tip && isGroup==2"></SelectContent>
                                <div class="deffault" v-else>
                                    未选择设备，无法选择广告位
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="title">
                    <span>上传素材</span>
                </div>
                <div class="addAdv_wrapper upload_wrapper">
                    <div class="item no_border">
                        <div class="item_left">
                            <span>*</span> 广告素材
                        </div>
                        <div class="item_right">
                            <div class="upload_box">
                                <div class="upload_img" @click="addUpload">
                                    <i class="iF">&#xe653;</i>
                                    <p>上传素材</p>
                                </div>
                                <button id="upload" ref="upWrapper"></button>
                                <div class="upload_text" :class="uploadType==2?'advtive_text':''" @click="addText">
                                    <i class="iF">&#xe6ae;</i>
                                    <p>上传文字</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="slot_box">
                        <div class="img_lissst" v-show="uploadType==1" v-if="upInfor.length>0">
                            <ImgList :list="upInfor" @remove="removeImg" @clickItem="clickItem"></ImgList>
                        </div>
                        <div v-else v-show="uploadType==1" class="initText">
                            您暂未上传素材
                        </div>
                        <div class="item no_border " v-show="uploadType==2">
                            <div class="item_left">
                                <span>*</span> 文字内容
                            </div>
                            <div class="item_right">
                                <input type="text" placeholder="请输入文字内容" v-model="textSlotVal">
                            </div>
                        </div>
                        <div class="item no_border " v-show="uploadType==2">
                            <div class="item_left">
                                <span>*</span> 播放时长
                            </div>
                            <div class="item_right">
                                <input v-model="slotShowTime" type="text" placeholder="请输入播放时长"> 秒
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Scroll>
        <div class="saveAdv_wrapper">
            <div class="save_adv" @click="save">
                发布
            </div>
        </div>
        <mt-datetime-picker ref="startTimeEle" type="datetime" :startDate="initTime" @confirm="setStartTime">
        </mt-datetime-picker>
        <mt-datetime-picker ref="endTimeEle" type="datetime" :startDate="initTime" @confirm="setEndTime">
        </mt-datetime-picker>
        <SelectPick @confirm="setGroup" @cancle="cancle" :valueKey="valueKey" :checked="pickChecked" :list="pickList" :isShow="pickShow"></SelectPick>
        <Infor :position="position" :duration="duration" :type="type" :content="content" :modal="modal" :showPopup="showPopup"></Infor>
    </div>
</template>

<script>
import Select from '@/components/select/Select';
import SelectPick from '@/components/select/SelectPick';
import SelectContent from '@/components/select/SelectContent';
import ImgList from '@/components/advList/imgList';
import Scroll from '@/components/scroll/Scroll';
import { DatetimePicker } from 'mint-ui';
import Infor from "@/components/message/Message";
// import {messageMixin} from '@/common/base.js';
import { addAdvMinxin } from '@/common/mixin.js';

const tip = "无法确定需发布的设备";
export default {
    // mixins: [messageMixin],
    mixins: [addAdvMinxin],
    components: {
        Select,
        DatetimePicker,
        SelectPick,
        ImgList,
        Scroll,
        SelectContent,
        Infor,
    },
    data() {
        return {
            planInfor: [{
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center',
                defaultIndex: 0,
            }],
            groupInfor: [{
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center',
                defaultIndex: 0,
            }],
            slotInfor: [{
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center',
                defaultIndex: 0,
            }],
            pickList: [],
            pickChecked: "",
            pickShow: false,
            pickType: "",//是哪个选择框打开的picker  1------推广计划，  2-----设备组   3----广告位
            //         slots: [
            //     {
            //       flex: 1,
            //       values: [{"value":"47","label":"测试设备组1"},{"value":"48","label":"测试2"},{"value":"50","label":"2"},{"value":"51","label":"3"},{"value":"52","label":"4"},{"value":"53","label":"5"},{"value":"54","label":"6"},{"value":"55","label":"7"},{"value":"56","label":"8"},{"value":"57","label":"9"},{"value":"58","label":"测试111"},{"value":"59","label":"测试111"},{"value":"60","label":"555"},{"value":"61","label":"111"},{"value":"63","label":"69"},{"value":"67","label":"默认设备组"},{"value":"69","label":"测试开关机"},{"value":"70","label":"我去测试"},{"value":"71","label":"测试2"},{"value":"72","label":"测试3"},{"value":"73","label":"测试4"},{"value":"74","label":"测试5"},{"value":"75","label":"默认设备组"}],
            //       className: 'slot1',
            //       textAlign: 'center',
            //       defaultIndex:1,
            //     }
            //   ],
            pls: "选择一个设备组",
            val: '',
            advName: "未命名",//广告名称
            selectList: [
                { 'name': '七天' },
                { 'name': '一个月' },
                { 'name': '三个月' },
                { 'name': '六个月' },
                { 'name': '其他时间' },
            ],
            selectType: 0,//选中投放时间的类型
            checkedSlotType: 0,//选中的广告类型
            initTime: "",//时间插件的初始值
            startTime: '',//开始时间
            endTime: '',//结束时间
            slotType: [//切换广告类型
                { 'name': '普通广告' },
                // { 'name': '紧急广告' },
            ],
            showPlan: false,//选择推广计划的下拉列表
            showGroup: false,//选择设备组拉列表
            planName: "",//推广计划名称
            groupName: "",//设备组名称
            slotName: "",//广告位名称
            planInt: '请选择推广计划',//默认值
            groupInt: '请选择设备组',//默认值
            slotInt: '请选择广告位',//默认值
            checkedGroup: '',//选中的设备组ID
            checkedPlan: '',//选中的推广计划ID
            checkedSlot: '',//选中的广告位ID
            plupload: '',//初始化的上传组件
            upIdArr: [],//保存上传的ID
            upInfor: [],//保存上传完成信息
            payloadInfor: [],//保存组件上传信息
            inforIndex: -1,//保存当前上传的第几个
            uploadType: 1,
            scroll: '',//最外层的better-scroll
            slotShowTime: '15',//默认播放时长
            textSlotVal: '',
            refreshScroll: [1, 2],//刷新scroll高度
            slotId: '',//保存广告ID
            isGroup: 1,//判断是设备还是设备组
            deviceName: '',//设备名称
            deviceId: "",//设备ID
            tip: tip,
            contentId: '',//编辑的素材ID
            valueKey: 'lable',
            multi: '',//上传的是图片还是视频
            position: 'top',//信息框参数
            content: '',//信息框参数
            showPopup: false,//信息框参数
            modal: true,//信息框参数
            duration: '3000',//信息框参数
            type: 'error',//信息框参数
            footerType: '1',//信息框参数
        };
    },
    created() {
        this.getPlanInfor();
        this.getGroupInfor();
        this.initTime = new Date();
        this.planName = this.$route.query.planName;
        this.checkedPlan = this.$route.query.checkedPlan ? this.$route.query.checkedPlan : "";
        console.log("1111111",this.checkedPlan)
        if (this.$route.query.type == 1) {
            this.isGroup = 2;
            this.deviceId = this.$route.query.num;
            this.checkedSlot = this.$route.query.slotNum;
            this.slotName = this.$route.query.slotName;
            this.deviceName = this.$route.query.name ? this.$route.query.name : tip;
            this.getSlotInfor({ 'device-id': this.deviceId });
        } else if (this.$route.query.type == 2) {
            this.isGroup = 1
            this.checkedGroup = this.$route.query.num;
            this.groupName = this.$route.query.name;
            this.checkedSlot = this.$route.query.slotNum;
            this.slotName = this.$route.query.slotName;
            this.getSlotInfor({ 'group-id': this.checkedGroup });
        }
    },
    methods: {
        save() {
            const isNum = /^[0-9]+$/;
            let slotInforArr = []
            if (!this.planName) {
                this.content = "请选择推广计划"
                this.showPopup = !this.showPopup;
                return
            }
            if (this.advName.trim().length < 1) {
                this.content = "广告名称不能为空"
                this.showPopup = !this.showPopup;
                return
            }
            if (this.$route.query.type == "2") {
                if (!this.checkedGroup) {
                    this.content = "请选择设备组"
                    this.showPopup = !this.showPopup;
                    return
                }
            }
            if (!this.checkedSlot || !this.slotName) {
                this.content = "请选择广告位"
                this.showPopup = !this.showPopup;
                return
            }
            if (this.uploadType == 1) {
                if (this.upInfor.length < 1) {
                    this.content = "请上传素材"
                    this.showPopup = !this.showPopup;
                    return
                }
                for (let i = 0; i < this.upInfor.length; i++) {
                    if (!isNum.test(this.upInfor[i].duration)) {
                        this.content = "第" + (i + 1) + "个素材时长不为正整数"
                        this.showPopup = !this.showPopup;
                        return
                    }
                    let obj = {}
                    obj['id'] = this.upInfor[i].id;
                    obj['duration'] = this.upInfor[i].duration;
                    obj['type'] = this.upInfor[i].type;
                    obj['name'] = this.advName;
                    slotInforArr.push(obj)
                }
            } else if (this.uploadType == 2) {
                if (this.textSlotVal.trim().length < 1) {
                    this.content = "文字内容不能为空"
                    this.showPopup = !this.showPopup;
                    return
                }
                if (!isNum.test(this.slotShowTime)) {
                    this.content = "第1个素材时长不为正整数"
                    this.showPopup = !this.showPopup;
                    return
                }
                slotInforArr = [{
                    "duration": this.slotShowTime,
                    "type": "CONTENT",
                    "name": this.advName,
                    "content": { "content": "" + this.textSlotVal + "", "bg_color": "#999", "font_color": "#333", "font_size": 30, "font_norma": "1" },
                }]
            }
            if (this.isGroup == 1) {
                this.$esellApi.send("/api/ad/add.shtml", {
                    "start-time": this.startTime,
                    "end-time": this.endTime,
                    "type": this.checkedSlotType + 1,
                    "campaign-id": this.checkedPlan,
                    "ad-groups": [{ "group-id": this.checkedGroup, "slot-id": this.checkedSlot }],
                    "materials": slotInforArr,
                }).then(res => {
                    this.$router.push({ name: "advertising" })
                }).catch(res => {

                    // this.content=res.message
                    // this.showPopup=!this.showPopup;
                })
            } else if (this.isGroup == 2) {
                console.log("文字")
                this.$esellApi.send("/api/ad/add.shtml", {
                    "start-time": this.startTime,
                    "end-time": this.endTime,
                    "type": this.checkedSlotType + 1,
                    "campaign-id": this.checkedPlan,
                    "ad-devices": [{ "device-id": this.deviceId, "slot-id": this.checkedSlot }],
                    "materials": slotInforArr,
                }).then(res => {
                    this.$router.push({ name: "advertising" })
                }).catch(res => {
                    // this.content=res.message
                    // this.showPopup=!this.showPopup;
                })
            }
        },
        setStartTime(val) {
            this.startTime = this.dataType(val);
        },
        setEndTime(val) {
            this.endTime = this.dataType(val);
        },
        // picker的取消
        cancle() {
            this.pickShow = false;
        },
        // picker的确定
        setGroup(data) {
            this.pickShow = false;
            if (this.pickType == 1) {
                this.planName = data[0].label;
                this.checkedPlan = data[0].value;
            } else if (this.pickType == 2) {
                this.groupName = data[0].label;
                this.checkedGroup = data[0].value;
                this.slotName = "";
                this.getSlotInfor({ 'group-id': data[0].value })
            } else if (this.pickType == 3) {
                this.slotName = data[0].name;
                this.checkedSlot = data[0].value;
            }
        },
        // 点击打开选择推广计划
        checkPlan() {
            this.pickShow = true;
            this.pickType = 1;
            this.pickChecked = this.planName;
            this.pickList = this.planInfor;
            this.valueKey = "label";
        },
        // 删除推广计划名称
        clearPlan() {
            this.planName = "";
            this.checkedPlan = "";
            this.pickShow = false;
        },
        // 选择设备组
        checkGroup() {
            this.pickShow = true;
            this.pickType = 2;
            this.pickChecked = this.groupName;
            this.pickList = this.groupInfor;
            this.valueKey = "label";
        },
        // 删除推广计划名称设备组名称
        clearGroup() {
            this.groupName = "";
            this.slotName = "";
            this.checkedGroup = "";
            this.checkedSlot = "";
            this.pickShow = false;
        },
        // 选择广告位
        checkSlot() {
            this.pickShow = true;
            this.pickType = 3;
            this.pickChecked = this.slotName;
            this.pickList = this.slotInfor;
            this.valueKey = "name";
        },
        // 删除广告位名称
        clearSlot() {
            this.slotName = "";
            this.checkedSlot = "";
            this.pickShow = false;
        },
        // 选择投放时间
        clickItem(data) {
            this.selectType = data;
            this.startTime = this.dataType(new Date);
            if (data == 0) {
                this.endTime = this.getSevenDay();
            } else if (data == 1) {
                this.endTime = this.getNextMonth(this.dataType(new Date), 1);
            } else if (data == 2) {
                this.endTime = this.getNextMonth(this.dataType(new Date), 3);
            } else if (data == 3) {
                this.endTime = this.getNextMonth(this.dataType(new Date), 6);
            }
            else if (data == 4) {
                this.endTime = this.startTime;
            }
        },
        // 选择开始时间
        checkStartTime() {
            this.$refs.startTimeEle.open();
        },
        // 选择结束时间
        checkEndTime() {
            this.$refs.endTimeEle.open();
        },
        // 切换广告类型
        changeSlotType(data) {
            this.checkedSlotType = data;
        },
        // 获取时间格式
        dataType(date) {
            let year = date.getFullYear();//获取当前年
            let yue = date.getMonth() + 1;//获取当前月
            yue = yue < 10 ? '0' + yue : yue;
            let day = date.getDate();//获取当前日
            day = day < 10 ? '0' + day : day;
            let h = date.getHours();//获取当前小时数(0-23)
            h = h < 10 ? '0' + h : h;
            let m = date.getMinutes();//获取当前分钟数(0-59)
            m = m < 10 ? '0' + m : m;
            let s = date.getSeconds();//获取当前秒 
            s = s < 10 ? '0' + s : s;
            let str = year + '-' + yue + '-' + day + ' ' + h + ':' + m + ":" + s
            return str
        },
        // 获取N月后的时间
        getNextMonth(date, num) {
            var arr = date.split('-');
            var year = arr[0]; //获取当前日期的年份
            var month = arr[1]; //获取当前日期的月份
            var day = arr[2]; //获取当前日期的日
            var days = new Date(year, month, 0);
            days = days.getDate(); //获取当前日期中的月的天数
            var year2 = year;
            var month2 = parseInt(month) + num;
            if (month2 > 12) {
                year2 = parseInt(year2) + 1;
                month2 = month2 - 12;
            }
            var day2 = day;
            var days2 = new Date(year2, month2, 0);
            days2 = days2.getDate();
            if (day2 > days2) {
                day2 = days2;
            }
            if (month2 < 10) {
                month2 = '0' + month2;
            }

            var t2 = year2 + '-' + month2 + '-' + day2;
            return t2;
        },
        getSevenDay() {
            var date = new Date().getTime();
            date = new Date(date + 604800000);
            date = this.dataType(date)
            return date;
        },
        // 获取名称
        getFileName(str) {
            var reg = /\.(jpg|jpeg|png|bmp|mp4|avi|flv|wma|wmv|JPG)$/;
            return str.replace(reg, "");
        },
        // 删除上传的图片
        removeImg(item, id, num, serverId) {
            var index;
            let that = this;
            var list = this.plupload.files;
            if (!item['material-library']) {
                $.each(this.plupload.files, function(o, val) {
                    if (val) {
                        if (val.id == id) {
                            index = o;
                            if (!that.upInfor.length == that.payloadInfor.length) {
                                for (let i = 0; i < that.upInfor.length; i++) {
                                    for (let k in that.payloadInfor) {
                                        if (!that.payloadInfor[that.upInfor[i].fileId]) {
                                            delete that.payloadInfor[that.upInfor[i].fileId];
                                        }
                                    }
                                }
                            }
                            if (item.status) {
                                that.upInfor.splice(num, 1);
                            } else {
                                that.plupload.removeFile(that.plupload.files[index]);
                                that.upInfor.splice(num, 1);
                                that.payloadInfor.splice(index, 1);
                                return;
                            }
                        }
                        that.inforIndex = -1;
                    }

                });
            } else {
                this.upInfor.find((item, index) => {
                    if (item.id == serverId) {
                        this.upInfor.splice(index, 1)
                    };
                })
            }
        },
        // 发布文字广告
        addText() {
            this.uploadType = 2;
        },
        // 发布图片广告
        addUpload() {
            this.uploadType = 1;
            this.$refs.upWrapper.click();
        },
        // 获取所有推广计划
        getPlanInfor() {
            this.$esellApi.send("/api/campaign/options.shtml", {
            }).then(res => {
                this.planInfor[0].values = res.payload;
            }).catch(res => {
                // this.content=res.message
                // this.showPopup=!this.showPopup;
            })
        },
        // 获取所有设备组
        getGroupInfor() {
            this.$esellApi.send("/api/group/options.shtml", {
            }).then(res => {
                this.groupInfor[0].values = res.payload;
            }).catch(res => {
                // this.content=res.message
                // this.showPopup=!this.showPopup;
            })
        },
        // 获取所有广告位
        getSlotInfor(data) {
            this.$esellApi.send("/api/slot/options.shtml", data).then(res => {
                if (res.payload) {
                    this.slotInfor[0].values = res.payload;
                    this.slotName = res.payload[0].name;
                    this.checkedSlot = res.payload[0].value;
                } else {
                    this.slotInfor[0].values = [{ "value": "-1", "label": "暂无数据" }]
                }
            }).catch(res => {
                // this.content=res.message
                // this.showPopup=!this.showPopup;
            })
        }
    },
    watch: {
    },
    filters: {
    },
}

</script>
<style lang='scss'>
@import '../../../sass/addAdv';
</style>