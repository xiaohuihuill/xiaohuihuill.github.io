<template>
    <div class="play-list" ref="playList">
        <Loading v-show="isLoading"></Loading>
        <Collapse v-if="list.length>0">
            <CollapseItem :title="item.name" :specification="item.label" :list="item.data" v-for="(item,index) in list" :key="index" @click="CollapseItemClick(item.value)" @scroll="moveIng" @scrollToEnd="scrollToEnd" @clickItem="clickItem">
            </CollapseItem>
        </Collapse>
        <div v-else class="img_wrapper">
            <ImgContent emptyInfor="暂无广告" addSomething="发布广告" @add="addAdv"></ImgContent>
        </div>
    </div>
</template>
<script>
import Loading from '@/components/loading/loading';
import { Collapse, CollapseItem } from '@/components/collapseItem';
import { Toast } from 'mint-ui';
import ImgContent from '@/components/imgContent/imgContent';
export default {
    components: {
        Collapse, CollapseItem, Toast, ImgContent, Loading
    },
    data() {
        return {
            isLoading: false,
            getDevicePlayListDataValue: "",//每次点开的那个广告发对应的广告列表数据
            data: "",
            page: 1,
            size: 10,
            list: [],
            devicePlayListAdvertisingTempate: "",//拿所有广告位的请求数据
            devicePlayListData: {},//拿对应广告位的播放列表的请求数据
        };
    },
    created() {
        if (this.$route.query.type != '2') {
            this.devicePlayListAdvertisingTempate = {
                "device-id": this.$route.query.id,
                "group-id": "",
                "template-id": "",
            };
        } else {
            this.devicePlayListAdvertisingTempate = {
                "device-id": "",
                "group-id": this.$route.query.id,
                "template-id": "",
            }
        }
        this.getDeviceAdvertisingName();
    },
    methods: {
        getDeviceAdvertisingName() {
            this.$esellApi.send('/api/slot/options.shtml', this.devicePlayListAdvertisingTempate).then(res => {
                console.log(res.payload);
                this.list = res.payload;
            }).catch(res => {
                Toast({ message: res.message, position: 'middle', duration: 3000 })
            })
        },
        getDevicePlayListData(value) {
            this.isLoading = true;
            var url;
            if (this.$route.query.type == "1") {
                url = "/api/ad/list/device.shtml";
                this.devicePlayListData = {
                    page: this.page,
                    size: this.size,
                    "group-id": "",
                    "slot-id": value,
                    "device-id": this.$route.query.id,
                    // "type": "1",
                }
            } else {
                url = "/api/ad/list/group.shtml";
                this.devicePlayListData = {
                    page: this.page,
                    size: this.size,
                    "group-id": this.$route.query.id,
                    "slot-id": value,
                    "device-id": "",
                    // "type": "1",
                }
            }
            this.$esellApi.send(url, this.devicePlayListData).then(res => {
                this.isLoading = false;
                if (this.page && this.page == 1) {
                    if (res.payload.data.length > 0) {
                        this.list.forEach(function(element) {
                            if (element.value == value) {
                                element.data = res.payload.data;
                                this.list.splice(this.list.length)//必须操作不然子组件监听不到list变化
                            }
                        }, this);
                    } else {
                        Toast({ message: "该广告位暂时没有广告播放", position: 'middle', duration: 3000 })
                    }
                } else {//为什么这么写我也不知道。。
                    if (res.payload.data.length > 0) {

                        this.list = this.list.concat(res.payload.data);
                        this.list.forEach(function(element) {
                            if (element.value == value) {
                                element.data = res.payload.data;
                                this.list.splice(this.list.length)
                            }
                        }, this);
                    }
                }
            }).catch(res => {
                this.isLoading = false;
                Toast({ message: res.message, position: 'middle', duration: 3000 })
            })
        },
        CollapseItemClick(value) {
            this.getDevicePlayListDataValue = value;
            this.getDevicePlayListData(value);
        },
        clickItem(data) {
            this.$router.push({ path: "/dev_detail", query: { "id": data.id } })
        },
        // 发布广告
        addAdv() {
            this.$router.push({ name: 'AddAdv' })
        },
        // remove(data) {
        //     MessageBox.confirm('确定执行此操作?').then(action => {
        //         console.log(data.id)
        //         console.log("quren")
        //         this.$esellApi.send("/device/delete.shtml", {
        //             id: data.id
        //         }).then(res => {
        //             console.log(res.message);
        //             Toast({
        //                 message: '删除操作成功',
        //                 iconClass: 'icon icon-success'
        //             });
        //         }).catch(res => {
        //             // this.popupValue = true;
        //             Toast({
        //                 message: "取消操作",
        //                 iconClass: 'icon icon-success'
        //             });
        //         });
        //     }).catch(() => {
        //         this.popupValue = true;
        //         this.slots = "aaaaa";
        //     });
        // },
        scrollToEnd() {
            this.canAjax = true;
        },
        moveIng(data, y, maxY) {
            if (data.y < 0) {
                if (this.canAjax) {
                    this.canAjax = false;
                    if (this.total > this.page * this.size) {
                        this.page++;
                        this.getDevicePlayListData(this.getDevicePlayListDataValue)
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
                    console.log(2);
                    this.canAjax = false;
                    this.getDevicePlayListData(this.getDevicePlayListDataValue)
                }
            }
        },
    },
    watch: {
        // list: {
        //     handler(newVal, oldVal) {
        //     },
        //     deep: true
        // }
    }
}

</script>
<style lang='scss' scoped>
.play-list {
    height: 100%;
    width: 100%;
}
</style>