<template>
    <div class="device-group-add-device">
        <DeviceGroupAddDevice @select="select" :list="list" @scroll="moveIng" @scrollToEnd="scrollToEnd" @remove="remove" @clickItem="clickItem" v-if="list!=''">
        </DeviceGroupAddDevice>
        <div class="footer">
            <div class="all-device-button" @click="allSelected">
                <CheckIcon :value.sync="Allselected"></CheckIcon>
                <span>全选</span>
            </div>
            <div class="device-number">设备数：{{selectedNumber}}</div>
            <div class="add" @click="addDevice">
                <div>添加</div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import DeviceGroupAddDevice from '@/components/deviceGroupAddDevice/DeviceGroupAddDevice'
import { CheckIcon } from 'vux'
export default {
    name: '',
    components: {
        DeviceGroupAddDevice,
        CheckIcon
    },
    data() {
        return {
            Allselected: false,
            selectedNumber: 0,
            page: 1,
            size: 8,
            list: [],
            selectedArray: [],
        };
    },
    created() {
        this.getDeviceListData();
    },
    // computed: {
    //     selectedNumber: function() {
    //         return this.selectedArray.findIndex(function(value, index, arr) {
    //             return value.selected = true;
    //         })
    //     }
    // },
    methods: {
        allSelected() {
            if (!this.Allselected) {
                this.list.forEach(function(element) {
                    element.selected = false;
                }, this);
                this.selectedNumber = 0;
            } else {
                this.list.forEach(function(element) {
                    element.selected = true;
                }, this);
                if (this.list) {
                    this.selectedNumber = this.list.length;
                }

            }
        },
        select(data) {
            this.selectedArray.push(data);
            this.selectedArray = [...new Set(this.selectedArray)]
        },
        getDeviceListData() {
            this.$esellApi.send("/api/device/list.shtml", {
                page: this.page,
                size: this.size,
                "not-bind": 2
            }).then(res => {
                res.payload.data.forEach(function(element) {
                    element.selected = false;
                }, this);
                this.list = res.payload.data;
            }).catch(res => {
                Toast({})
                console.log(res);
            })
        },
        addDevice() {
            var array = [];
            this.list.forEach((ele) => {
                if (ele.selected) {
                    array.push(ele.id);
                }
            });
            if (!array.length) {
                Toast({ message: "请选取需要添加的设备", position: 'middel', duration: 3000 });
                return;
            }
            this.$esellApi.send('/api/device/in/group/batch.shtml', {
                "device-ids": array,
                "group-id": this.$route.query.id,
            }).then(res => {
                Toast({ message: "添加成功", position: 'middel', duration: 3000 });
                this.selectedArray = [];
                this.getDeviceListData();
            }).catch(res => {
                Toast({ message: res.message, position: 'middel', duration: 3000 });
            })
            console.log("添加到设备组")
        },
        //设备组管理
        deviceGroupManage() {
            this.$router.push({ path: "/dev_group" })
        },
        // 点击了设备详情
        clickItem(data) {
            console.log(data.id)
            this.$router.push({ path: "/dev_detail", query: { "id": data.id, "name": data.name } })
        },
        // 删除当前设备广告
        remove(data) {
            MessageBox.confirm('确定执行此操作?').then(action => {
                console.log(data.id)
                console.log("quren")
                this.$esellApi.send("/device/delete.shtml", {
                    id: data.id
                }).then(res => {
                    console.log(res.message);
                    Toast({
                        message: '删除操作成功',
                        iconClass: 'icon icon-success'
                    });
                }).catch(res => {
                    Toast({
                        message: "取消操作",
                        iconClass: 'icon icon-success'
                    });
                });
            }).catch(() => {
                this.popupValue = true;
                this.slots = "aaaaa";
            });
        },
        scrollToEnd() {
            this.canAjax = true;
        },
        moveIng(data, y, maxY) {
            if (data.y < (maxY - 50)) {
                if (this.canAjax) {
                    this.canAjax = false;
                    console.log(this.page * this.size)
                    if (this.total > this.page * this.size) {
                        this.page++;
                        this.getDeviceListData()
                    } else {
                        this.page = this.page
                        Toast({
                            message: '已经是最后一页的数据了',
                            position: 'middle',
                            duration: 3000
                        })
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
    },
    watch: {
        list: {
            handler(newVal, oldVal) {
                var i = 0;
                newVal.forEach((ele) => {
                    console.log(ele.selected)
                    if (ele.selected) {
                        i++;
                    }
                })
                this.selectedNumber = i;
            },
            deep: true
        }
    }
}

</script>
<style lang='scss' scoped>
@import './../../../sass/base.scss';
.device-group-add-device {
    height: 100%;
    width: 100%;
    position: relative;
    .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 999;
        height: 1rem;
        width: 100%;
        box-sizing: border-box;
        border-top: 1px solid $sublineColor;
        display: flex;
        align-items: center;
        font-size: .3rem;
        background: #fff;
        padding: 0 .22rem 0 .42rem;
        .all-device-button {
            width: 2.28rem;
            span {
                margin-left: .2rem;
            }
        }
        .device-number {
            flex: 1;
            line-height: 1rem;
        }
        .add {
            width: 2.28rem;
            height: .74rem;
            background-color: $impColor;
            color: $white;
            line-height: .74rem;
            text-align: center;
            border-radius: .05rem;
        }
    }
}
</style>