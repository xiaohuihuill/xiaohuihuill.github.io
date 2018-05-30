<!--  -->
<template>
    <div class="login">
        <div class="head">
            <div class="head-tubiao" v-if="env.indexOf('neubp.yixinfa.cn')==-1">
                <i class="iF">&#xe67c;</i>
                <i class="iF">&#xe671;</i>
            </div>
            <div v-else style="color:#ff5663;font-size:0.4rem;font-weight:700;text-align:center">
                云信息发布系统
            </div>
            <div class="head-info">让信息发布更简单</div>
        </div>
        <div class="main">
            <div class="account-number">
                <i class="iF">&#xe620;</i>
                <input type="text" placeholder="请输入用户名" v-model="username">
            </div>
            <div class="password">
                <i class="iF">&#xe627;</i>
                <input type="password" placeholder="请输入密码" v-model="password">
            </div>
            <div class="message">{{message}}</div>
            <div class="binding-information" v-show="isWeChat">
                <!--v-show="isWeChat"-->
                <div class="binding-information-info">
                    <span @click="bindingInformation"><input name="checkbox" style="vertical-align: text-bottom" value="" type="checkbox"></span>
                    <span>绑定微信</span>
                    <a href="javascript:;" style="margin-right:20px; float:right" @click="bindingRule">绑定说明</a>
                </div>
            </div>
            <div class="hint">
            </div>
            <div class="register" @click="login">登录</div>
        </div>
        <div class="binding-rule" @click="hideMarks" v-if="Marks">
            <div class="marks">
            </div>
            <div class="binding-rule-info">
                <p>1.每个微信只能绑定一个易信发账户；</p>
                <p>2.微信绑定易信发账户后，下次系统无须再登录；</p>
                <p>3.多个微信用户重复绑定同一个易信发账户时，以最后绑定的微信用户为准；</p>
                <p>4.用户在系统中点击“退出登录”按钮后将解除绑定关系；</p>
                <div></div>
            </div>
        </div>
    </div>
</template>
<script>
import { Toast } from "mint-ui"
import { getQueryParam, isWeChat } from "@/common/base"
import { debug } from 'util';
export default {
    name: "login",
    components: {
        Toast,
    },
    data() {
        return {
            env: window.location.host,
            Marks: false,
            bind: 0,
            username: '',
            password: '',
            message: "",
            isWeChat: false,
        };
    },
    mounted() {
        this.isWeChat = isWeChat();
        this.$nextTick(function() {
            $('body').height($('body')[0].clientHeight);
        })
    },
    methods: {
        hideMarks() {
            this.Marks = false;
        },
        bindingRule() {
            this.Marks = true;
            // alert("1.每个微信只能绑定一个易信发账户；\n2.微信绑定易信发账户后，下次系统无须再登录；\n3.多个微信用户重复绑定同一个易信发账户时，以最后绑定的微信用户为准；\n4.用户在系统中点击“退出登录”按钮后将解除绑定关系；");
        },
        login() {
            // if (localStorage.getItem("token")) {
            //     localStorage.removeItem("token")
            // };
            if (localStorage.getItem("UserFirstName")) {
                localStorage.removeItem("UserFirstName")
            }
            if (!this.username) {
                Toast({ message: "用户名不能为空", position: 'middel', duration: 3000 });
                return;
            }
            if (!this.password) {
                Toast({ message: "密码不能为空", position: 'middel', duration: 3000 });
                return;
            }
            this.$esellApi.login("/wx/user/login/commit.shtml",
                this.username, this.password, this.bind)
                .then(res => {
                    localStorage.setItem("token", res.payload.token);
                    this.$router.push({ path: "/device" })
                    var UserFirstName = this.username.charAt(0).toUpperCase();
                    localStorage.setItem("UserFirstName", UserFirstName);
                    localStorage.setItem("UserName", this.username);
                    let callback = localStorage.getItem('lastAccessPage')
                    localStorage.removeItem('lastAccessPage');
                    if (callback) location.href = decodeURIComponent(callback);
                }).catch(res => {
                    Toast({ message: res.message, position: 'middel', duration: 3000 });
                })
            // this.$esellApi.login("/account/login.shtml",
            //     this.username, this.password)
            //     .then(res => {
            //         var UserFirstName = this.username.charAt(0).toUpperCase();
            //         localStorage.setItem("UserFirstName", UserFirstName);
            //         localStorage.setItem("UserName", this.username);
            //         this.$router.push({ path: "/device" })
            //     }).catch(res => {
            //         Toast({ message: res.message, position: 'middel', duration: 3000 });
            //     })
        },
        bindingInformation() {
            this.bind = !this.bind;
        }
    }
}
</script>
<style lang='scss' scoped>
@import '../../sass/login.scss';
#labelId {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    background-color: rgb(0, 150, 136);
    position: relative;
}

#labelId:after {
    content: '\00a0';
    display: inline-block;
    border: 4px solid #fff;
    border-top-width: 0;
    border-right-width: 0;
    width: 18px;
    height: 10px;
    -webkit-transform: rotate(-50deg);
    position: absolute;
    top: 6px;
    left: 4px;
}

.binding-rule {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .3);
    .shade {}
    .binding-rule-info {
        padding: 0.3rem;
        width: 60%;
        box-sizing: border-box;
        background: #fff;
        position: absolute;
        left: 20%;
        top: 28%;
        color: #999999;
        font-size: .22rem;
        border-radius: .08rem;
        box-shadow: 3px 3px 10px #e5e5e5;
        opacity: 1;
        transition: all 0.3s;
    }
}
</style>