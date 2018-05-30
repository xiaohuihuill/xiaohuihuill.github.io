<template>
    <div class="login">
        <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
            <h5>账户登录</h5>
            <el-form-item prop="username">
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input name="password" type="password" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码" />
                <span class='show-pwd' @click='showPwd'>
                </span>
            </el-form-item>
            <!--<el-form-item prop="code">
                                                        <el-input name="code" style="width:40%" type="text" @keyup.enter.native.prevent="handleLogin" v-model="loginForm.code" autoComplete="on" placeholder="请输入验证码" />
                                                        <span class="code"><img src="/login/get_code" alt=""></span>
                                                    </el-form-item>-->
            <!--<button class="login-login"  style="width:100%;margin-bottom:30px;background:#ec4243;color:#fff;" :loading="loading" @click.native.prevent="handleLogin">登录</button>-->
            <a class="login-login" style="" :loading="loading" @click="handleLogin">登录</a>
        </el-form>
    </div>
</template>
<script>
import { esell } from '@/assets/common/esellapi.js'
import { isvalidUsername } from '@/utils/validate'
export default {
    name: 'login',
    props: ['message'],
    data() {
        const validateUsername = (rule, value, callback) => {
            console.log(value)
            if (value == "") {
                callback(new Error('请先输入账号'));
            } else {
                callback();
            }
        }
        const validatePassword = (rule, value, callback) => {
            // if (value.length < 6) {
            //     callback(new Error('密码不能小于6位'));
            // } else {
            //     callback();
            // }
             if (value == "") {
                callback(new Error('请先输入密码'));
            } else {
                callback();
            }
        }
        const validateCode = (rule, value, callback) => {
            if (value.length < 1) {
                callback(new Error('验证码不能为空'));
            } else {
                callback();
            }
        }
        return {
            loginForm: {
                username: '',
                password: '',
                // code: '',
                username1: ""
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }],
                // code: [{ required: true, trigger: 'blur', validator: validateCode }]
            },
            loading: false,
            showDialog: false,
        }
    },
    created() {
        // this.$emit('goodsCountEvent', this.loginForm);
        // console.log(this.message);
        var _this = this;
        setTimeout(function() {
            $("input[type=password]").on("keyup", function(e) {
                if (e.keyCode == 13) {
                    _this.handleLogin();
                }
            })
        }, 0)
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        handleLogin() {
            this.loading = true;
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    if (localStorage.getItem("token")) {
                        localStorage.removeItem("token")
                    };
                    const esellapi = new esell();
                    // 1.发送请求
                    // this.$store.dispatch('asynsStorage', "我要吃肉");
                    esellapi.login("/account/login.shtml", this.loginForm.username, this.loginForm.password, (res) => {
                        this.$router.push({ path: '/home' });
                    }, (res) => {
                        this.$notify.error({
                            title: '错误',
                            message: res.message,
                            offset: 100,
                        });
                    })
                    // this.$router.push({ path: '/home' });
                } else {
                    // this.$notify.error({
                    //     title: '错误',
                    //     message: "效验不通过",
                    //     offset: 100
                    // });
                    // return false;
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.login {
    width: 360px;
    margin: 0 auto;
    padding-top: 80px;
    padding: 80px 30px 30px;
    box-sizing: border-box;
    h5 {
        font-size: 20px;
        color: #ff635c;
        line-height: 41px;
        position: relative;
        text-align: center;
        font-weight: normal;
        margin-bottom: 20px;
    }
    h5:before {
        content: "";
        width: 100%;
        border: 2px #ff635c solid;
        position: absolute;
        left: 0;
        bottom: 0;
        box-sizing: border-box;
    }
    .login-login {
        margin-top: 20px;
        display: inline-block;
        white-space: nowrap;
        cursor: pointer;
        border: 1px solid #ff635c;
        padding: 10px 15px;
        border-radius: 4px;
        width: 100%;
        margin-bottom: 30px;
        background: #ff635c;
        color: #fff;
        box-sizing: border-box;
        text-align: center;
    }
    .login .el-form-item {
        margin-top: 30px;
    }
}
</style>
