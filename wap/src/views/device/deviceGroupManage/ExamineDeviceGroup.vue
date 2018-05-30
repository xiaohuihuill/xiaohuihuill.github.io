<template>
    <div class="examine-device-group" style="height:100%;width:100%;">
<Loading v-show="isLoading"></Loading>
        <div v-if="list.length > 0" style="height:100%;width:100%">
            <ExamineDeviceGroupList :list="list" @scroll="moveIng" @scrollToEnd="scrollToEnd" @remove="remove" @clickItem="clickItem"></ExamineDeviceGroupList>
        </div>
        <div v-else class="img_wrapper">
            <ImgContent emptyInfor="暂无设备" addSomething="添加设备" @add="nullAddDevice1"></ImgContent>
        </div>
        <DeviceGroupFooter @deviceGroupPlayList="deviceGroupPlayList" @deviceGroupAddDevice="deviceGroupAddDevice" @deviceGroupAddAdv="deviceGroupAddAdv" @deviceGroupEditInfo="deviceGroupEditInfo" @deviceGroupRemoteControl="deviceGroupRemoteControl"></DeviceGroupFooter>
    </div>
</template>
<script>
import Loading from '@/components/loading/loading';
import ImgContent from '@/components/imgContent/imgContent';
import { Toast, MessageBox } from 'mint-ui';
import ExamineDeviceGroupList from '@/components/examineDeviceGroupList/ExamineDeviceGroupList';
import DeviceGroupFooter from "@/components/deviceGroupFooter/deviceGroupFooter";
export default {
    name: "",
    components: {
        DeviceGroupFooter,
        ExamineDeviceGroupList,
        Toast,
        MessageBox,
        ImgContent,
        Loading
    },
    data() {
        return {
            isLoading: false,
            id: "",
            list: [],
            page: 1,
            size: 10,
            total: null,
        };
    },
    created() {
        this.id = this.$route.query.id
        this.getExmineDeviceGroupListData();
    },
    methods: {
        getExmineDeviceGroupListData() {
            this.isLoading = true;
            this.$esellApi.send("/api/group/sons.shtml", {
                page: this.page,
                size: this.size,
                id: this.$route.query.id,
            }).then(res => {
                this.isLoading = false;
                this.total = res.payload.total;
                if (this.page && this.page == 1) {
                    this.list = res.payload.data;
                }else{
                    this.list = this.list.concat(res.payload.data)
                }
            }).catch(res => {
                this.isLoading = false;
                Toast({ message: res.message, position: 'middle', duration: 3000 })
            })
        },
        nullAddDevice1() {
            this.$router.push({ path: '/dev_group/add_dev', query: { type: '2', id: this.id } })
        },
        // 设备组播放列表
        deviceGroupPlayList() {
            this.$router.push({ path: "/dev_detail/playList", query: { type: "2", id: this.id } })
        },
        // 设备组添加设备
        deviceGroupAddDevice() {
            this.$router.push({ path: "/dev_group/add_dev", query: { type: "2", id: this.id } })
        },
        // 设备组发布广告
        deviceGroupAddAdv() {
            this.$router.push({ path: "dev_detail", query: { type: "2", id: this.id, name: this.$route.query.name } });
        },
        // 设备组编辑
        deviceGroupEditInfo() {
            this.$router.push({ path: "/dev_group/edit_dev_group", query: { type: "2", id: this.id, name: this.$route.query.name } });
        },
        // 设备组远程控制
        deviceGroupRemoteControl() {
            this.$router.push({ path: "/dev_detail/remote_control", query: { type: "2", id: this.id } });
        },
        // 点击了设备详情
        clickItem(data) {
            // console.log(data.id);
            // this.$router.push({ path: "/dev_detail", query: { "id": data.id } })
        },
        // 删除当前设备广告
        remove(data) {
            
            MessageBox.confirm('确定执行此操作?').then(action => {
                this.$esellApi.send("/api/device/out/group.shtml", {
                    "device-id": data.id
                }).then(res => {
                    Toast({ message: '移出操作成功', position: 'middle', duration: 1000 })
                    this.getExmineDeviceGroupListData();
                }).catch(res => {
                    Toast({ message: res.message, position: 'middle', duration: 3000 })
                });
            }).catch(() => {
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
                        this.getExmineDeviceGroupListData()
                    } else {
                        this.page = this.page
                        Toast({
                            message: '已经是最后一页的数据了',
                            position: 'middle',
                            duration: 1000
                        })
                    }
                }
            } else if (data.y > 40) {
                if (this.canAjax) {
                    this.canAjax = false;
                    this.page = 1;
                    this.getExmineDeviceGroupListData()
                }
            }
        },
    }
}

</script>
<style lang='scss' scoped>

</style>