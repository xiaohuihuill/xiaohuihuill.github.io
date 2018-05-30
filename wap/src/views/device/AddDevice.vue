<template>
    <div class="add-device">
        <div class="add-device-info">
            <div class="add-device-number">
                <div class="add-device-number-left">
                    <span>*</span>设备编号</div>
                <div class="add-device-number-right">
                    <div id="wrap">
                        <input type="tel" maxlength="12" class="realInput" v-model="realInput" :readonly="readonly" style="color:transparent;" unselectable="on" @keyup="getNum()" @keydown="delNum()" id="focusId">
                        <ul class="write-input clearfix">
                            <li v-for="(disInput,index) in disInputs" :key="index">
                                <input type="tel" maxlength="1" style="font-size:.28rem;" v-model="disInput.value">
                            </li>
                        </ul>
                    </div>
                    <!--<input type='tel' name='code' class='now' maxlength="1" />
                                            <input type='tel' name='code' class='now' maxlength="1" />
                                            <input type='tel' name='code' class='now' maxlength="1" />
                                            <input style="margin-right:0.2rem;" type='text' name='code' class='now' maxlength="1" />
                                            <input type='tel' name='code' class='now' maxlength="1" />
                                            <input type='tel' name='code' class='now' maxlength="1" />
                                            <input type='tel' name='code' class='now' maxlength="1" />
                                            <input style="margin-right:0.2rem;" type='text' name='code' class='now' maxlength="1" />
                                            <input type='tel' name='code' class='now' maxlength="1" />-->
                    <!--<input type='tel' name='code' class='now' maxlength="1" />
                                            <input type='tel' name='code' class='now' maxlength="1" />
                                            <input type='tel' name='code' class='now' maxlength="1" />-->

                </div>
            </div>
            <div class="add-device-name">
                <div class="add-device-name-left">
                    <span>*</span>设备名称</div>
                <div class="add-device-name-right">
                    <input type="text" v-model="deviceName" placeholder="请填写设备名称">
                </div>
            </div>
            <div class="add-device-group">
                <div class="add-device-name-left">
                    选择设备组
                </div>

                <div class="add-device-name-right">
                    <mt-picker :slots="slots" @change="onValuesChange" valueKey="label"></mt-picker>
                </div>
            </div>
        </div>
        <bottom-operation :message="message" @click="accomplish"></bottom-operation>
    </div>
</template>
<script>
import { Toast } from "mint-ui";
import { Picker } from 'mint-ui';
import BottomOperation from "@/components/bottomOperation/BottomOperation"
import { setTimeout } from 'timers';
export default {
    name: "AddDevice",
    components: {
        BottomOperation,
        Picker,
    },
    data() {
        return {
            slots: [{
                flex: 1,
                values: [{'value':'0', 'label':'请选择'}],
                className: 'slot1',
                textAlign: 'center',
                defaultIndex : 0
            }],
            selectGroupId: 0,
            readonly: false,
            messagepacket: false,
            packets: [],
            disInputs: [
                { value: '' },
                { value: '' },
                { value: '' },
                { value: '' },
                { value: '' },
                { value: '' },
                { value: '' },
                { value: '' },
                { value: '' },
                { value: '' },
                { value: '' },
                { value: '' }
            ],
            realInput: '',
            deviceName: "",
            message: "完成",
        };
    },
    created() {
        if (this.$route.query.uuid) {
            this.disInputs = this.toArray(this.$route.query.uuid);
            this.readonly = true;
        }
        setTimeout(()=>{this.initDeviceGroup()}, 0);
    },
    mounted() {
        this.getbackMoney();
    },
    methods: {
        onValuesChange(data) {
            this.selectGroupId = data.values[0].value;
        },
        initDeviceGroup() {
            let that = this;
            this.$esellApi.send('/api/group/options.shtml', {}).then(res => {
                for(let index in res.payload){
                    let data = res.payload[index];
                    that.slots[0].values.push(data);
                }
            }).catch(res => {
                Toast({ message: res.message, position: 'middel', duration: 3000 });
            })
        },
        toArray(data) {
            var _self = this;
            var a = data.split("");
            a.forEach(function(element, index) {
                _self.disInputs[index].value = element;
            });
            return this.disInputs
        },
        // 完成
        accomplish() {
            if (!this.disInputs) {
                Toast({ message: "请先填写设备编号", position: 'middel', duration: 2000 });
                return;
            }
            if (!this.deviceName) {
                Toast({ message: "请先填写设备名称", position: 'middel', duration: 2000 });
                return;
            }
            this.realInput = this.$route.query.uuid?this.$route.query.uuid : this.realInput;
            this.$esellApi.send('/api/device/add.shtml', {
                uuid: this.realInput,
                name: this.deviceName,
                'group-id': this.selectGroupId
            }).then(res => {
                this.$router.push({ path: "/device" });
                Toast({ message: "添加设备成功", position: 'middel', duration: 2000 });
            }).catch(res => {
                Toast({ message: res.message, position: 'middel', duration: 3000 });
            })
        },
        // getFirstFoicus() {
        //     var nows = document.querySelectorAll('.now');
        //     $(nows[0]).focus();
        //     console.log("默认获取第一个框")
        // },
        getbackMoney() {
            this.messagepacket = true;
            var idObj = document.getElementById('focusId');
            idObj.focus();
            //点击进来自动获取焦点ios无效。ios特性(安全性)
        },
        getbackMoneyclock() {
            this.messagepacket = false
        },
        getNum() {
            for (var i = 0; i < this.realInput.length; i++) {
                this.disInputs[i].value = this.realInput.charAt(i)
                // 表示字符串中某个位置的数字，即字符在字符串中的下标。
            }
        },
        delNum() {
            var oEvent = window.event;
            if (oEvent.keyCode == 8) {
                if (this.realInput.length > 0) {
                    this.disInputs[this.realInput.length - 1].value = ''
                }
            }
        }
    },
    watch: {
    },
}

</script>
<style lang='scss' scoped>
@import "./../../sass/addDevice.scss";
#wrap {
    width: 100%;
    height: 100%;
}

.phonenum-show {
    padding: 10px;
    background: #fff;
}

.getback-title {
    padding-bottom: 10px;
    border-bottom: 1px solid #dddddd;
    position: relative;
    font-size: 14px;
    margin-bottom: 10px;
}

.getback-title span {
    position: absolute;
    right: 0;
    top: 3px;
    width: 15px;
    height: 15px;
    display: inline-block;
}

.write-phonenum p {
    text-align: center;
    font-size: 12px;
}

.write-phonenum p span {
    color: #3b90d1;
}

.write-input {
    width: 100%;
}

.write-input li {
    float: left;
    width: 0.4rem;
    height: 0.48rem;
    border: 1px solid #dedede;
    border-right: 0px;
}

.write-input li:last-child {
    border-right: 1px solid #dedede;
}

.write-input li input {
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    resize: none;
    outline: none;
    border: 0;
    text-align: center;
    font-size: .16rem;
    width: 0.4rem;
    height: 0.48rem;
    line-height: 0.48rem;
    box-sizing: border-box;
}

.write-phonenum .mint-button--default {
    background: #3b90d1;
    color: #fff;
    font-family: "微软雅黑";
    font-size: 14px;
    width: 80%;
    margin: 10px auto;
}

.realInput {
    /* Keyword values */
    -webkit-appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    resize: none;
    outline: none;
    border: 0;
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 0.98rem;
    background: none;
    display: block;
    left: 0;
    top: 0;
    opacity: 0;
    font-size: 0px;
    caret-color: #fff;
    color: #000;
    text-indent: -5em;
    font-size: .28rem;
}







/*影藏input标签*/

input[type=tel]:disabled {
    background-color: #fff;
}

// .now {
//     width: .36rem;
//     height: 0.48rem;
//     border: 1px solid #999999;
// }
// .now:focus {
//     border: 1px #587d18 solid;
// }
</style>