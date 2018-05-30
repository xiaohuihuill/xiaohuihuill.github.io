<template>
    <div class="device-detail-info">
        <div class="device-number device-style">
            <div class="device-number-left">设备编号</div>
            <div class="device-number-right">{{device.uuid}}</div>
        </div>
        <div class="device-name device-style">
            <div class="device-name-left">
                设备名称</div>
            <div class="device-name-right">
                {{device.name}}
            </div>
        </div>
        <!--<div class="device-type device-style">
                       <div class="device-type-left">设备类型</div>
                       <div class="device-type-right">竖屏</div>
                    </div>-->
        <div class="belong-to-device-group device-style">
            <div class="belong-to-device-group-left">所属设备组</div>
            <div class="belong-to-device-group-right">{{device['group-name']}}</div>
        </div>
        <div class="device-tmp device-style">
            <div class="device-tmp-left">设备模板</div>
            <div class="device-tmp-right">
                <div class="device-tmp-right-name">{{template['name']}}
                </div>
                <div class="device-tmp-right-picture"></div>
            </div>
        </div>
        <div class="belong-to-area device-style">
            <div class="belong-to-area-left">所在地区</div>
            <div class="belong-to-area-conent">
                <x-address style="display:block;" disabled title="" value-text-align="left" v-model="value" :list="addressData" placeholder="请选择地址" :show.sync="showAddress"></x-address>
            </div>
        </div>
        <div class="belong-to-device-group device-style">
            <div class="belong-to-device-group-left">详细地址</div>
            <div class="device-name-right">
                {{device.address}}
            </div>
        </div>
        <!--<div class="belong-to-device-group device-style">
                                    <div class="belong-to-device-group-left">备注</div>
                                    <div class="device-name-right">
                                       {{}}
                                    </div>
                                </div>-->
        <SelectPick :checked="pickChecked" :list="pickList" :isShow="pickShow" @confirm="setGroup" @cancle="cancle"></SelectPick>
    </div>
</template>
<script>
import { XAddress, ChinaAddressV4Data, Group } from 'vux'
import { Toast } from 'mint-ui'
import SelectPick from '@/components/select/SelectPick';
export default {
    name: "EditDeviceInfo",
    components: {
        SelectPick,
        XAddress,
        Toast,
        Group
    },
    data() {
        return {
            value: [],
            showAddress: false,
            addressData: ChinaAddressV4Data,
            deviceName111: "",
            pickChecked: "",
            pickShow: false,//picker是否打开
            pickList: [],
            pickType: '',
            pickList: [{//重启默认list
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center',
                defaultIndex: 0,
            }],
            device: "",
            template: "",
        };
    },
    created() {
        this.getTimingSwitch();
        this.$nextTick(function() {
            $("#addressData .vux-popup-picker-select").css({ "text-align": "left" });
        })
    },
    methods: {
        //进入页面获取他是否有属性，有就回显，
        getTimingSwitch() {
            this.$esellApi.send("/api/device/show.shtml", {
                id: this.$route.query.id,
            }).then(res => {
                this.device = res.payload.device;
                this.template = res.payload.template;
                this.value = res.payload.device['district-codes'];
                // this.total = res.payload.total;
                console.log(121212121, res);
            }).catch(res => {
                Toast({ message: res.message, position: 'middel', duration: 2000 });
            })
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
            console.log(ids, names)
        },
        getName(value) {
            return value2name(value, ChinaAddressV4Data)
        },
        logHide(str) {
            console.log('on-hide', str)
        },
        logShow(str) {
            console.log('on-show')
        },
        // picker的取消
        cancle() {
            this.pickShow = false;
        },
        // picker的确定
        setGroup(data) {
            console.log('点击了确认data', data);
            this.pickShow = false;
            if (this.pickType == "restart") {
                this.restartpickSelectedLable = data[0].label;
                this.restartpickSelectedValue = data[0].value;
                if (this.switchpickSelectedLable == "是" && this.restartpickSelectedLable == "是") {
                    Toast({ message: "立即重启或立即关机只能选择一个", position: 'middel', duration: 2000 });
                    this.switchpickSelectedValue = "";
                    this.switchpickSelectedLable = "";
                }
            } else if (this.pickType == "switch1") {
                this.switchpickSelectedLable = data[0].label;
                this.switchpickSelectedValue = data[0].value;
                if (this.switchpickSelectedLable == "是" && this.restartpickSelectedLable == "是") {
                    Toast({ message: "立即重启或立即关机只能选择一个", position: 'middel', duration: 2000 });
                    this.restartpickSelectedValue = "";
                    this.restartpickSelectedLable = "";
                }
            } else if (this.pickType == "clearCache") {
                this.clearCachepickSelectedLable = data[0].label;
                this.clearCachepickSelectedValue = data[0].value;
            }
        },
        minusNum() {
            this.cacheTime--;
            if (this.cacheTime == -1) {
                this.cacheTime = 0;
            }
        },
        addNum() {
            this.cacheTime++;
            if (this.cacheTime > 7) {
                this.cacheTime = 7;
            }
        },
        setTimingSwitch() {
            this.$router.push({ path: "/set_timing_switch", query: { id: this.$route.query.id, type: this.$route.query.type, actiontype: this.actionType } })
        },
    }
}

</script>
<style lang='scss' scoped>
@import '@/../../../../sass/deviceDetailInfo.scss';
.belong-to-area {
    .vux-popup-picker-select {
        text-align: left!important;
    }
}
</style>