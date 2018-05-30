<template>
    <div class="device-group-manage">
        <Loading v-show="isLoading"></Loading>
        <DeviceGroupList :list="list" @scroll="moveIng" @scrollToEnd="scrollToEnd" @remove="remove" @clickItem="clickItem" v-if="list.length>0">
        </DeviceGroupList>
        <bottom-operation :message="message" @click="addDeviceGroup"></bottom-operation>
    </div>
</template>
<script>
import Loading from '@/components/loading/loading';
import { Toast, MessageBox } from "mint-ui";
import DeviceGroupList from '@/components/deviceGroupList/DeviceGroupList';
import BottomOperation from '@/components/bottomOperation/BottomOperation'
export default {
    name: "DeviceGroupManage",
    components: {
        BottomOperation,
        DeviceGroupList,
        MessageBox,
        Loading
    },
    data() {
        return {
            isLoading: false,
            message: "新增设备组",
            selected: "shebei",
            list: [],
            page: 1,
            size: 10,
            total: null,
        };
    },
    created() {
        this.getDeviceListData();
    },
    methods: {
        getDeviceListData(type) {
            this.isLoading = true;
            this.$esellApi.send("/api/group/list.shtml", {
                page: this.page,
                size: this.size
            }).then(res => {
                this.isLoading = false;
                this.total = res.payload.total;
                if (this.page && this.page == 1) {
                    this.list = res.payload.data;
                } else {
                    if (type) {
                        this.list = this.this.list;
                    } else {
                        this.list = this.list.concat(res.payload.data)
                    }
                }
            }).catch(res => {
                this.isLoading = false;
                Toast({ message: res.message, position: 'middel', duration: 2000 });
            })
        },
        addDevice() {
            this.$router.push({ path: "/add_dev" })
        },
        //设备组管理
        deviceGroupManage() {
            this.$router.push({ path: "/dev_group" })
        },
        // 点击了设备详情
        clickItem(data) {
            this.$router.push({ path: "/examine_dev_group", query: { id: data.id, type: '2', name: data.name } })
        },
        addDeviceGroup() {
            this.$router.push({ path: "/add_dev_group" })
        },
        // 删除当前设备广告
        remove(data) {
            if (data['default-value'] == "Y") {
                Toast({
                    message: '默认数据，无法删除',
                    duration: 1000
                });
                return
            }
            MessageBox.confirm('确定执行此操作?').then(action => {
                this.$esellApi.send("/api/group/delete.shtml", {
                    id: data.id
                }).then(res => {
                    this.list.forEach(function(element, index) {
                        if (element.id == data.id) {
                            this.list.splice(index, 1);
                        }
                    }, this);
                    Toast({ message: "删除成功", position: 'middel', duration: 2000 });
                }).catch(res => {
                    Toast({ message: res.message, position: 'middel', duration: 2000 });
                });
            }).catch(() => {
                Toast({ message: res.message, position: 'middel', duration: 2000 });
            });
        },
        scrollToEnd() {
            this.canAjax = true;
        },
        moveIng(data, y, maxY) {
            if (Math.abs(y) - Math.abs(maxY) > 20) {
                if (this.canAjax) {
                    this.canAjax = false;
                    if (this.total > this.page * this.size) {
                        this.page++;
                        this.getDeviceListData()
                    } else {
                        this.page = this.page;
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
                    this.page = 1;
                    this.getDeviceListData(true);
                }
            }
        },
    }
}

</script>
<style lang='scss' scoped>
@import './../../../sass/deviceGroupManage.scss'
</style>