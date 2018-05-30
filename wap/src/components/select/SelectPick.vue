<template>
    <div class="selectPick">
        <div class="select_wrapper" v-if="show">
            <div class="cancel" @click="cancle">取消</div>
            <div class="confirm" @click="confirm">确认</div>
            <mt-picker :slots="pickerList" :value-key="valueKey" @change="valuesChange"></mt-picker>
        </div>
    </div>
</template>
<script>
import { Picker } from 'mint-ui';
import { ftruncate } from 'fs';
export default {
    components: {
        Picker,
    },
    props: {
        list: "",//传入的数据列表
        isShow: '',//是否显示列表
        checked: '',//选择的值
        valueKey: {
            type: String,
            default: 'label',
        },//展示那个字段
    },
    data() {
        return {
            pickerList: [],//传入组件里的列表
            val: "",//列表里面选中的值
            show: '',//是否显示列表
            checkedValue: '',//传出的选中值
            checkedIndex: '',//传出选中值在pickerList中的下标位置
            label: 'label',
            initIndex: 0,//保存默认的下标值
        };
    },
    watch: {
        list() {
            this.pickerList = this.list;
            this.initIndex = this.pickerList[0].defaultIndex ? this.pickerList[0].defaultIndex : 0
        },
        isShow: function() {
            if (this.isShow) {
                this.checkedValue = this.checked;
                this.showList()
            }
            this.show = this.isShow
        }
    },
    created() {
        this.checkedValue = this.checked;
    },
    methods: {
        showList() {
            this.pickerList = this.list;
            if (this.list[0].values.length > 0) {
                if (this.checkedValue) {
                    for (let i = 0; i < this.list[0].values.length; i++) {
                        if (this.list[0].values[i].label == this.checkedValue || this.list[0].values[i].name == this.checkedValue) {
                            this.checkedIndex = i;
                            break;
                        }
                    }
                    this.pickerList[0].defaultIndex = this.checkedIndex;
                } else {
                    this.pickerList[0].defaultIndex = this.initIndex;
                }
            }
        },
        getChecked(data) {
            return data == this.checkedValue
        },
        valuesChange(picker, values) {
            this.val = values;
            // this.$emit("change", {picker: picker,values: values})
        },
        cancle() {
            this.show = false;
            this.$emit("cancle");
        },
        confirm() {
            this.show = false;
            this.checkedValue = this.val[0];
            this.$emit("confirm", this.val)
        },
    },
}

</script>
<style lang='scss'>
@import "../../sass/base.scss";

.selectPick {
    width: 100%;
    color: $contenTextColor;
    position: relative;
    font-size: 0.3rem;
    .picker-slot {
        font-size: .28rem;
    }
    .select_wrapper {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 9999;
        background: #fff;
        .cancel {
            position: absolute;
            left: 10%;
            top: 0.2rem;
            width: 0.8rem;
            height: 0.8rem;
            text-align: center;
            line-height: 2.5;
            z-index: 999;
        }
        .confirm {
            position: absolute;
            right: 10%;
            top: 0.2rem;
            width: 0.8rem;
            height: 0.8rem;
            text-align: center;
            line-height: 2.5;
            z-index: 999;
            color: #04BE02;
        }
    }
}
</style>