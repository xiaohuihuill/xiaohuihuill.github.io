<template>
    <div class="device-group-manager">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span>个人中心</span>
            </span>
        </div>
        <div class="bottom">

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="修改密码" name="change-password">
                    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="77px" class="demo-ruleForm">
                        <el-form-item label="填写旧密码" prop="laoPass">
                            <el-input type="password" style="max-width:513px;" v-model="ruleForm2.laoPass" auto-complete="off" placeholder="请填写旧密码"></el-input>
                        </el-form-item>
                        <el-form-item label="填写新密码" prop="pass">
                            <el-input type="password" style="max-width:513px;" v-model="ruleForm2.pass" auto-complete="off" placeholder="请填写新密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确认新密码" prop="checkPass">
                            <el-input type="password" style="max-width:513px;" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请填写新密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                             <a href="javascript:;" class="yxf-but" style="margin-left:0px" @click="resetForm('ruleForm2')">重置</a>
                             <a href="javascript:;" class="yxf-but" style="margin-left:10px" @click="submitForm('ruleForm2')">提交</a>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>

export default {
    name: 'device-manager',

    data() {
        // 旧密码
        var laoPass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请填写旧密码"));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback();
                } else {
                    callback();
                }
            }, 0);
        };
        // 新密码
        var validatePass = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请填写新密码"));
            } else {
                if (this.ruleForm2.checkPass !== "") {
                    this.$refs.ruleForm2.validateField("checkPass");
                }
                callback();
            }
        };
        // 确认新密码
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次填写新密码"));
            } else if (value !== this.ruleForm2.pass) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            all: 40,
            ishide: true,
            active: "all",
            activeName: "change-password",
            ruleForm2: {
                pass: "",
                checkPass: "",
                laoPass: ""
            },
            rules2: {
                laoPass: [{ validator: laoPass, trigger: "blur" }],
                pass: [{ validator: validatePass, trigger: "blur" }],
                checkPass: [{ validator: validatePass2, trigger: "blur" }]
            }
        }
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.ruleForm2)
                    this.$esellApi.send("/user/password/modify.shtml", {
                        "old-password": md5(this.ruleForm2.laoPass),
                        "new-password": md5(this.ruleForm2.pass),
                    }, res => {
                        console.log("正确的请求", res)
                        this.$router.push({ path: "/user_mag" })
                    }, res => {
                        this.message("error", res.message)
                    })
                } else {
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    watch: {
    }
}

</script>
<style lang="scss" scoped>
@import '../../sass/advertisingManage.scss';
div.all .all,
div.onLine .onLine,
div.offLine .offLine {
    color: #fff;
    background-color: #ec420a;
}
</style>

