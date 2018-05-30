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
                <div class="device-tmp-right-name" @click="switchTemplate">{{pickChecked}}
                </div>
                <div class="device-tmp-right-picture" style="width:0.2rem;"><i class="iF">&#xe61e;</i></div>
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
            templateName: "",
            message: "保存",
            templateNmae: "",//模板名字
            deviceGroupName: this.$route.query.name ? this.$route.query.name : "",
            pickChecked: "",
            pickCheckedId: "",//选中的模板id传给后台
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
        this.getDeviceGroupTemp();
    },
    methods: {
        getDeviceGroupTemplateList() {
            this.$esellApi.send('/api/template/options.shtml', {
            }).then(res => {
                console.log("成功了")
                var _self = this;
                res.payload.forEach(function(element) {
                    var obj = {};
                    obj.label = element.name;
                    obj.value = element.id;
                    _self.pickList[0].values.push(obj);
                }, this);
            }).catch(res => {
                console.log("错误了")
                Toast({ message: res.message, position: 'middle', duration: 3000 })
            })
        },
        getDeviceGroupTemp() {
            this.$esellApi.send('/api/template/detail.shtml', {
                "group-id": this.$route.query.id,
                "device-id": "",
                "template-id": "",
            }).then(res => {
                this.pickChecked = res.payload.name;
                this.pickCheckedId = res.payload.id;
            }).catch(res => {
                Toast({ message: res.message, position: 'middle', duration: 3000 })
            })
        },
        switchTemplate() {
            this.pickShow = true;
        },
        // 保存添加的设备组
        save() {
            this.$esellApi.send('/api/group/update.shtml', {
                id: this.$route.query.id,
                name: this.deviceGroupName,
                "template-id": this.pickCheckedId,
            }).then(res => {
                Toast({ message: "保存成功", position: 'middle', duration: 3000 })
                this.$router.go(-1);
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
@import '@/../../../../sass/addDeviceGroup.scss';
.device-tmp-right{
    display: flex;
    justify-content: space-between;
}
</style>