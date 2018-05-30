<template>
    <div class="device">
        <Loading v-show="isLoading"></Loading>
        <div class="adv_inner">
            <div class="search">
                <Search :placeholder="placeholder" :intVal="intSearchVal" @searchVal="searchVal" @search="toSearch" @cancle="cancle"></Search>
            </div>
            <div class="dev_box">
                <div class="devices_text" @click="addDevice()">
                    <i class="iF">&#xe648;</i>
                    <p>手动添加设备</p>
                </div>
                <div class="devices_text devices_text_s" id="scanQRCode0" v-on:click="sys_click()">
                    <i class="iF">&#xe64d;</i>
                    <p>扫一扫添加设备</p>
                </div>
                <div class="devices_text" @click="deviceGroupManage()">
                    <i class="iF">&#xe624;</i>
                    <p>设备组管理</p>
                </div>
            </div>
        </div>
        <div class="navbar">
            <mt-navbar v-model="selected">
                <mt-tab-item id="1">全部设备</mt-tab-item>
                <mt-tab-item id="2">在线设备</mt-tab-item>
                <mt-tab-item id="3">离线设备</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <device-list :list="list" @scroll="moveIng" @scrollToEnd="scrollToEnd" @remove="remove" @clickItem="clickItem" v-if="list.length>0">
                    </device-list>
                    <div v-else class="img_wrapper">
                        <ImgContent emptyInfor="暂无设备" addSomething="添加设备" @add="nullAddDevice1"></ImgContent>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <device-list :list="list" @scroll="moveIng" @scrollToEnd="scrollToEnd" @remove="remove" @clickItem="clickItem" v-if="list.length>0">
                    </device-list>
                    <div v-else class="img_wrapper">
                        <ImgContent emptyInfor="暂无设备" addSomething="添加设备" @add="nullAddDevice1"></ImgContent>
                    </div>
                    <!--<delete @remove="remove" :list="list"></delete>-->
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <device-list :list="list" @scroll="moveIng" @scrollToEnd="scrollToEnd" @remove="remove" @clickItem="clickItem" v-if="list.length>0">
                    </device-list>
                    <div v-else class="img_wrapper">
                        <ImgContent emptyInfor="暂无设备" addSomething="添加设备" @add="nullAddDevice1"></ImgContent>
                    </div>
                    <!--<delete @remove="remove" :list="list"></delete>-->
                </mt-tab-container-item>0
            </mt-tab-container>
        </div>
        <mt-popup v-model="popupValue" position="top">{{slots}}</mt-popup>
    </div>
</template>
<script>
import Loading from '@/components/loading/loading';
import ImgContent from '@/components/imgContent/imgContent';
import Search from '@/components/search/search';
import wx from 'weixin-js-sdk'
import { Navbar, TabItem } from 'mint-ui';
import { Popup, Toast, MessageBox } from 'mint-ui';
import DeviceList from '@/components/deviceList/DeviceList';
export default {
    components: {
        Loading,
        Search,
        Navbar,
        TabItem,
        MessageBox,
        Toast,
        Popup,
        DeviceList,
        ImgContent,

    },
    data() {
        return {
            isLoading: false,
            searchValue: "",
            intSearchVal: "",
            placeholder: "请输入搜索的设备名称",//传入搜索框的
            data: "",//接受配置信息，后台给的
            popupValue: false,
            slots: '',
            selected: this.$route.query.selected ? this.$route.query.selected : "1",
            list: [],//全部
            canAjax: true,
            page: 1,
            size: 10,
            status: this.$route.query.status ? this.$route.query.status : "",//广告状态''-全部广告，'OFL'-在线广告，'ONL'-离线广告
        };
    },
    created() {
        this.getDeviceListData();
    },
    mounted() {
        // var a =location.href.split('#')[0];
        // alert(a);
    },
    methods: {
        sys_click() {
            var data, url;
            var a = location.href;
            if (location.href.match("dev-")) {
                url = "http://dev-wap.yixinfa.cn/wxapi?newwap=";
            } else {
                url = "http://wap.yixinfa.cn/wxapi?newwap="
            }
            $.getJSON(url + a, function(data) {
                data = data;
                wx.config({
                    // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    debug: false,
                    // 必填，公众号的唯一标识
                    appId: data.appId,
                    // 必填，生成签名的时间戳
                    timestamp: "" + data.timestamp,
                    // 必填，生成签名的随机串
                    nonceStr: data.nonceStr,
                    // 必填，签名
                    signature: data.signature,
                    // 必填，需要使用的JS接口列表，所有JS接口列表
                    jsApiList: ['checkJsApi',
                        'scanQRCode',
                    ]
                });
            });
            wx.ready(function() {
                wx.checkJsApi({
                    jsApiList: ['scanQRCode'],
                    success: function(res) {
                    }
                });
                wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ["qrCode"], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function(res) {
                        var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                        window.location.href = result;//因为我这边是扫描后有个链接，然后跳转到该页面
                    }
                });
            });
            wx.error(function(res) {
                // alert("出错了：" + res.errMsg);//这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
            });
        },
        toSearch(val) {
            if (this.searchValue) {
                this.getDeviceListData();
            }
        },
        searchVal(val) {
            this.searchValue = val;
            this.intSearchVal = val;
        },
        cancle() {
            this.searchValue = "";
            this.intSearchVal = "";
            this.list = this.list;
        },
        getDeviceListData() {
            this.isLoading = true;
            this.$esellApi.send("/api/device/list.shtml", {
                page: this.page,
                size: this.size,
                status: this.status,
                name: this.searchValue
            }).then(res => {
                this.isLoading = false;
                this.total = res.payload.total;
                if (this.page && this.page == 1) {
                    this.list = res.payload.data;
                } else {
                    this.list = this.list.concat(res.payload.data);
                }
            }).catch(res => {
                Toast({ message: res.message, position: 'middel', duration: 3000 });
            })
        },
        nullAddDevice1() {
            this.$router.push({ path: "/add_dev" })
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
            console.log(data.id)
            this.$router.push({ path: "/dev_detail", query: { "id": data.id, "type": "1", "name": data.name } })
        },
        // 删除当前设备广告
        remove(data) {
            MessageBox.confirm('确定执行此操作?').then(action => {
                this.$esellApi.send("/device/delete.shtml", {
                    id: data.id
                }).then(res => {
                    this.list.forEach(function(element, index) {
                        if (element.id == data.id) {
                            this.list.splice(index, 1);
                        }
                    }, this);
                    Toast({ message: "删除成功", position: 'middel', duration: 3000 });
                }).catch(res => {
                    Toast({ message: res.message, position: 'middel', duration: 3000 });
                });
            }).catch(() => {
            });
        },
        scrollToEnd() {
            this.canAjax = true;
        },
        moveIng(data, y, maxY) {
            console.log(y);
            console.log(maxY);
            if (Math.abs(y) - Math.abs(maxY) > 20) {
                if (this.canAjax) {
                    this.canAjax = false;
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
                    this.page = 1;
                    this.getDeviceListData()
                    console.log("下拉刷新")
                }

            }
        },
    },
    watch: {
        selected: function(newVal, oldVal) {
            if (newVal == "1") this.status = ""
            if (newVal == "2") this.status = "ONL"
            if (newVal == "3") this.status = "OFL"
            this.page = 1;
            this.getDeviceListData()
        }
    }
}

</script>
<style lang='scss' scoped>
@import './../../sass/device.scss';
.mint-tab-container {
    height: calc(100% - 0.8rem);
    .mint-tab-container-wrap {
        height: 100%;
        .mint-tab-container-item {
            height: 100%;
        }
    }
}

.mint-tab-container-wrap {
    height: 100%;
}












/**
  *放置input的div盒子
  *1.此处应我的项目需要，加了些特别的设置，如字体、背景色等，按需添加；
  *2.内层input不加边框，看起来效果会自然一点，所以外层div设置了边框和圆角
*/

.box {
    background-color: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 6px;
    font-size: 14px;
    text-align: center;
    width: 7.06rem;
    margin: 0 auto;
}












/**
  *label标签样式 放在.box下，不至于影响其他的label
  *采取绝对定位，位置根据需求确定
*/

.box label {
    z-index: 2;
    position: absolute;
    left: 50%;
    margin-left: -8%;
    color: #B2B2B2;
    top: 4.8rem;
    font-weight: normal;
}












/**
  *input标签样式
  *宽度适应外层div
  *隐藏边框
  *这里有个小技巧，height与line-height值相等，可保证文字垂直居中；但我发现文字比图标略偏下，进行了微调；
*/

.box input {
    text-indent: 10px;
    height: 0.54rem;
    width: 100%;
    line-height: 0.54rem;
    border: none;
    outline: none;
}


















































































/**
  *图标样式
  *绝对定位，自定义颜色
*/

.box i {
    position: absolute;
    top: 4.8rem;
    left: 50%;
    margin-left: -15%;
    color: #B2B2B2;
}
</style>