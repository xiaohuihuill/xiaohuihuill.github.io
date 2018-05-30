<template>
    <div class="add-device-group">
        <div class="device-name device-style">
            <div class="device-name-left">
                <span class="impColor">*</span>设备组名称</div>
            <div class="device-name-right">
                <input type="text" v-model="deviceGroupName" placeholder="请填写设备组名称">
            </div>
        </div>
        <!--<div class="device-type device-style">
                <div class="device-type-left">
                <span class="impColor">*</span>屏幕类型
                </div>
               <div class="device-type-right">竖屏</div>
        </div>-->
        <div class="device-tmp device-style">
            <div class="device-tmp-left">
                <span class="impColor">*</span>设备组模板</div>
            <div class="device-tmp-right">
                <div class="device-tmp-right-name" @click="switchTemplate">
                    <span style="color:#dedede" v-if="pickChecked==''">请选择设备组模板</span>
                     <i class="iF">&#xe61e;</i>
                    <span style="color:#666666">{{pickChecked}}</span>
                </div>
                <div class="device-tmp-right-picture"></div>
            </div>
        </div>
        <bottom-operation :message="message" @click="save"></bottom-operation>
        <SelectPick :checked="pickChecked" :list="pickList" :isShow="pickShow" @confirm="setGroup" @cancle="cancle"></SelectPick>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import SelectPick from '@/components/select/SelectPick';
import BottomOperation from "@/components/bottomOperation/BottomOperation"
export default {
    name: "AddDeviceGroup",
    components: {
        SelectPick,
        BottomOperation,
        Toast
    },
    data() {
        return {
            message: "保存",
            templateNmae: "",//模板名字
            deviceGroupName: this.$route.query.name ? this.$route.query.name : "",
            pickChecked: '',
            pickShow: false,//picker是否打开
            pickType: '',
            pickList: [{//重启默认list
                flex: 1,
                values: [],
                className: 'slot1',
                textAlign: 'center',
                defaultIndex: 0,
            }],
        };
    },
    created() {
        this.getDeviceGroupTemplateList();
    },
    methods: {
        getDeviceGroupTemplateList() {
            this.$esellApi.send('/api/template/options.shtml', {
            }).then(res => {
                var _self = this;
                res.payload.forEach(function(element) {
                    var obj = {};
                    obj.label = element.name;
                    obj.value = element.id;
                    _self.pickList[0].values.push(obj);
                }, this);
            }).catch(res => {
                Toast({ message: res.message, position: 'middle', duration: 3000 })
            })
        },
        switchTemplate() {
            this.pickShow = true;
        },
        // 保存添加的设备组
        save() {
            if (!this.deviceGroupName) {
                Toast({ message: "设备组名称不能为空", position: 'middle', duration: 2000 })
                return;
            }
            this.$esellApi.send('/api/group/add.shtml', {
                name: this.deviceGroupName,
                "template-id": this.pickCheckedId,
            }).then(res => {
                Toast({ message: "保存成功", position: 'middle', duration: 3000 })
                this.$router.push({path:"/dev_group"});
            }).catch(res => {
                Toast({ message: res.message, position: 'middle', duration: 3000 })
            })
        },
        // picker的取消
        cancle() {
            this.pickShow = false;
        },
        // picker的确定
        setGroup(data) {
            console.log('点击了确认data', data);
            this.pickShow = false;
            this.pickChecked = data[0].label;
            this.pickCheckedId = data[0].value;
        },
    }
}

</script>
<style lang='scss' scoped>
@import '@/../../../../sass/addDeviceGroup.scss'
</style>