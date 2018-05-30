<template>
    <div class="edit-device-info">
        <div class="device-number device-style">
            <div class="device-number-left">
                <span>*</span>设备编号</div>
            <div class="device-number-right">{{uuid}}</div>
        </div>
        <div class="device-name device-style">
            <div class="device-name-left">
                <span class="impColor">*</span>设备名称</div>
            <div class="device-name-right">
                <input type="text" v-model="deviceName">
            </div>
        </div>
        <!--<div class="device-type device-style">
                                                            <div class="device-type-left">
                                                                <span>*</span>设备类型</div>
                                                            <div class="device-type-right">竖屏</div>
                                                        </div>-->
        <div class="belong-to-device-group device-style">
            <div class="belong-to-device-group-left">
                <span>*</span>所属设备组</div>
            <div class="belong-to-device-group-right">{{groupName}}</div>
        </div>
        <div class="device-tmp device-style">
            <div class="device-tmp-left">
                <span class="impColor">*</span>设备模板</div>
            <div class="device-tmp-right">
                <div class="device-tmp-right-name" @click="switchTemplate">
                    <span>{{pickChecked}}</span>
                    <span>
                        <i class="iF">&#xe61e;</i>
                    </span>
                </div>
                <div class="device-tmp-right-picture"></div>
            </div>
        </div>
        <div class="belong-to-area device-style" @click="examineAddress">
            <div class="belong-to-area-left">所在地区</div>
            <div class="belong-to-area-conent">
                <x-address title="" value-text-align="left" v-model="value" :list="addressData" placeholder="请选择地址" @on-show="logShow" :show.sync="showAddress"></x-address>
            </div>
            <div class="belong-to-area-right">
                <i class="iF">&#xe61e;</i>
            </div>
        </div>
        <div class="detailed-address device-style">
            <div class="detailed-address-left">详细地址</div>
            <div class="detailed-address-right">
                <input type="text" v-model="detailedAddress" placeholder="请输入详细地址">
            </div>
        </div>
        <bottom-operation :message="message" @click="save"></bottom-operation>
        <SelectPick :checked="pickChecked" :list="pickList" :isShow="pickShow" @confirm="setGroup" @cancle="cancle"></SelectPick>
    </div>
</template>
<script>
import { XAddress, ChinaAddressV4Data } from 'vux'
import { Toast } from 'mint-ui'
import BottomOperation from "@/components/bottomOperation/BottomOperation"
import SelectPick from '@/components/select/SelectPick';
export default {
    name: "EditDeviceInfo",
    components: {
        XAddress,
        SelectPick,
        BottomOperation,
        Toast
    },
    data() {
        return {
            showAddress: false,
            addressData: ChinaAddressV4Data,
            value: [],
            editDeviceInfoListData: "",
            message: "保存",
            deviceName: "",
            uuid: "",
            groupName: "",
            detailedAddress: "",//详细地址
            deviceTemplateName: "",
            pickChecked: "",
            pickShow: false,//picker是否打开
            pickType: '',
            pickList: [{//重启默认list
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center',
                defaultIndex: 0,
            }],
            templateId: "",
        }
    },
    created() {
        this.getEditDeviceInfoList();
        this.getAddressListData();
        this.getTemplateOptionList();
        this.$nextTick(function() {
            $("#addressData .vux-popup-picker-select").css({ "text-align": "left" });
            var flag = false;//先定义一个变量，当改变窗口大小的时候用来做判断
            $("input").focus(function() {//获取焦点时，flag为true
                flag = true;
            });
            window.onresize = function() {
                if (flag) {//如果flag为true，键盘弹起，改变底部按钮的position，同时将flag改为false
                    $("button").css({ "position": "initial" });
                    flag = false;
                } else {
                    $("button").css({ "position": "fixed" });
                    flag = true;
                };
            };
        })
    },
    methods: {
        getTemplateOptionList() {
            var _self = this;
            this.$esellApi.send('/template/options.shtml', {
            }).then(res => {
                res.payload.forEach(function(element) {
                    var obj = {};
                    obj.value = element.id;
                    obj.label = element.name;
                    if (element['cover-url']) {
                        obj.img = element['cover-url']
                    }
                    _self.pickList[0].values.push(obj)
                }, this);
                console.log(_self.pickList[0].values);
            }).catch(res => {
                Toast({ message: res.message, position: 'middle', duration: 3000 })
            })
        },
        //进入页面获取他是否有属性，有就回显，
        getEditDeviceInfoList() {
            this.$esellApi.send("/api/device/show.shtml", {
                id: this.$route.query.id,
            }).then(res => {
                this.detailedAddress = res.payload.device.address ? res.payload.device.address : "";
                this.pickChecked = res.payload.template.name ? res.payload.template.name : '';
                this.templateId = res.payload.template.id ? res.payload.template.id : '';
                this.editDeviceInfoListData = res.payload.device ? res.payload.device : '';
                this.value = res.payload.device['district-codes'] ? res.payload.device['district-codes'] : [];
                this.deviceName = res.payload.device['name'] ? res.payload.device['name'] : '';
                this.uuid = res.payload.device['uuid'] ? res.payload.device['uuid'] : '';
                this.groupName = res.payload.device['group-name'] ? res.payload.device['group-name'] : '';
            }).catch(res => {
                Toast({ message: res.message, position: 'middel', duration: 2000 });
            })
        },
        getAddressListData() {
        },
        completeSettings() {
            this.$esellApi.send('', {
            }).then(res => {
                Toast({ message: "设置成功", position: 'middel', duration: 3000 });
            }).catch(res => {
                Toast({ message: res.message, position: 'middel', duration: 3000 });
            })
        },
        onShadowChange(ids, names) {
            console.log(11111111, ids, names)
        },
        getName(value) {
            return value2name(value, ChinaAddressV4Data)
        },
        logHide(str) {
            console.log('on-hide', str)
        },
        logShow() {
            console.log('on-show')
        },
        // picker的取消
        cancle() {
            this.pickShow = false;
        },
        // picker的确定
        setGroup(data) {
            this.pickShow = false;
            this.pickChecked = data[0].label;
            this.templateId = data[0].value;
        },
        examineAddress() {
            this.threePickShow = true;
            console.log("打开的是地址的", this.threePickShow)
        },
        switchTemplate() {
            this.pickShow = true;
            this.pickList = this.pickList;
        },

        save() {
            this.$esellApi.send('/api/device/update.shtml', {
                id: this.$route.query.id,
                name: this.deviceName,
                'district-code': this.value[this.value.length - 1],
                address: this.detailedAddress,
                // 'group-id': ,
                'template-id': this.templateId,
            }).then(res => {
                Toast({ message: "保存成功", position: 'middle', duration: 3000 })
            }).catch(res => {
                Toast({ message: res.message, position: 'middle', duration: 3000 })
            })
        },
    },
    watch: {
    }
}
</script>

<style lang='scss' scoped>
@import '@/../../../../sass/editDeviceInfo.scss';
</style>