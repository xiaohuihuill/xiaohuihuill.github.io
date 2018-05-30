<template>
    <div class="user">
        <div class="user-info">
            <!--账号昵称-->
            <div class="account-number">
                <div class="account-number-icon">
                    {{accountNumberfirstCharacter}}
                </div>
                <div class="account-number-info">
                    <div class="account-number-zhanghao">
                        <span>账号：</span>
                        <span>{{accountNumberZhanghao}}</span>
                    </div>
                    <!--<div class="account-number-nicheng">
                                <span>昵称：</span>
                                <span>{{accountNumber.name}}</span>
                            </div>-->
                </div>
            </div>
            <!--布局管理-->
            <div class="layout-manage" @click="toTemplateManage">
                <div class="layout-manage-icon">
                    <i class="iF">&#xe615;</i>
                </div>
                <div class="layout-manage-info">
                    <div class="layout-manage-info-left">布局管理</div>
                    <div class="layout-manage-info-right">
                        <i class="iF">&#xe61e;</i>
                    </div>
                </div>
            </div>
            <!--广告设备管理-->
            <div class="adv-dev-manage">
                <div class="adv-manage">
                    <div class="all-adv br" @click="toAdvertisingList('1')">
                        <div>
                            <span>全部广告</span>
                        </div>
                        <div>
                            <span>{{advertising[0]}}</span>
                        </div>
                    </div>
                    <div class="all-adv br" @click="toAdvertisingList('2')">
                        <div>
                            <span>投放中</span>
                        </div>
                        <div>
                            <span>{{advertising[1]}}</span>
                        </div>
                    </div>
                    <div class="all-adv br" @click="toAuditList('1')">
                        <div>
                            <span>未审核</span>
                        </div>
                        <div>
                            <span>{{advertising[3]}}</span>
                        </div>
                    </div>
                    <div class="all-adv" @click="toAuditList('2')">
                        <div>
                            <span>审核不通过</span>
                        </div>
                        <div>
                            <span>{{advertising[4]}}</span>
                        </div>
                    </div>
                </div>
                <div class="dev-manage">
                    <div class="all-dev br" @click="toAllDevice">
                        <div>
                            <span>全部设备</span>
                        </div>
                        <div>
                            <span>{{device[0]}}</span>
                        </div>
                    </div>
                    <div class="all-dev br" @click="toDeviceList('ONL','2')">
                        <div>
                            <span>在线设备</span>
                        </div>
                        <div>
                            <span>{{device[1]}}</span>
                        </div>
                    </div>
                    <div class="all-dev  br" @click="toDeviceList('OFL','3')">
                        <div>
                            <span>离线设备</span>
                        </div>
                        <div>
                            <span>{{device[2]}}</span>
                        </div>
                    </div>
                    <div class="all-dev ">
                        <div>
                            <span>更多</span>
                        </div>
                        <div class="more">
                            <i class="iF">...</i>
                        </div>
                    </div>
                </div>
            </div>
            <!--退出登录-->
            <div class="exit" @click="exit">
                <span>退出登录</span>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { getQueryParam, isWeChat } from "@/common/base"
import { MessageBox } from 'mint-ui';
export default {
    name: "user",
    components: {
        MessageBox
    },
    data() {
        return {
            content: '操作失败',//pop的内容
            showPopup: false,//pop显示或隐藏
            //pop多久自动关闭
            confirmTitle: "退出登录",//弹出框的标题
            confirmShow: false,//弹出框显示隐藏
            accountNumberZhanghao: "",
            advertising: [],
            device: [],
            accountNumberfirstCharacter: "",
        };
    },
    created() {
        this.$nextTick(function() {
            this.getAdvertisingAndDeviceNumber();
            this.accountNumberfirstCharacter = localStorage.getItem("UserFirstName");
            this.accountNumberZhanghao = localStorage.getItem("UserName");
        })
    },
    methods: {
        getAdvertisingAndDeviceNumber() {
            this.$esellApi.send('/api/home/user.shtml', {
            }).then(res => {
                // this.accountNumber.zhanghao = res.payload.name;
                this.advertising = res.payload.ad;
                this.device = res.payload.device;
            }).catch(res => {
                Toast({
                    message: res.message,
                    position: 'middle',
                    duration: 3000
                })
            })
        },
        toAdvertisingList(status) {
            this.$router.push({ path: "/advertising", query: { status: status } })
        },
        toAuditList(status) {
            this.$router.push({ path: "/audit", query: { status: status } })
        },
        toDeviceList(status, selected) {
            this.$router.push({ path: "/device", query: { status: status, selected: "" + selected, selectedFooter: 'shebei' } })
        },
        toAllDevice() {
            this.$router.push({ path: "/device", query: { selectedFooter: 'shebei' } })
        },
        exit() {
            MessageBox.confirm('确定执行此操作?').then(action => {
                console.log("quren")
                this.$esellApi.send("/wx/user/logout/commit.shtml", {
                }).then(res => {
                    console.log(res.message);
                    Toast({
                        message: '退出成功',
                        iconClass: 'icon icon-success'
                    });
                    localStorage.removeItem("token");
                    localStorage.removeItem("UserFirstName");
                    localStorage.removeItem("UserName");
                    if(isWeChat()){
                        window.location.href = (this.$esellApi.getHost() + this.$esellApi.getAuthPage());
                    }else{
                        this.$router.push({ path: "/login" })
                    }
                }).catch(res => {
                    Toast({
                        message: '取消操作',
                        position: 'middle',
                        duration: 3000
                    })
                });
            }).catch(() => {
            });
        },
        toTemplateManage() {
            this.$router.push({ path: "/tmp_manage" })
        },
    }
}

</script>
<style lang='scss' scoped>
@import "./../../sass/user.scss";
.br {
    border-right: 1px solid $sublineColor;
}
</style>