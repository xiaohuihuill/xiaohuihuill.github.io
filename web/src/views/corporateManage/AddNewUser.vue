<!--素材管理-->
<template>
    <div class="material-manage">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/user_mag" class="blue">公司管理</router-link>
                <span>></span>
                <span>增加新用户</span>
            </span>
        </div>
        <div class="bottom">
            <div class="row1">
                <div class="material-name clearfix">
                    <span class="material-name-left fl">用户账号</span>
                    <span class="material-name-right fl">
                        <el-input style="min-width:513px;" v-model="addNewUser['user-name']" placeholder="请填写用户账号"></el-input>
                    </span>
                </div>
                <div class="material-name clearfix" style="margin-top:20px;">
                    <span class="material-name-left fl">用户密码</span>
                    <span class="material-name-right fl">
                        <el-input type="password" style="min-width:513px;" v-model="addNewUser['password']" placeholder="请填写用户密码"></el-input>
                    </span>
                </div>
                <div class="material-name clearfix " style="margin-top:20px;">
                    <span class="material-name-left fl">真实姓名</span>
                    <span class="material-name-right fl">
                        <el-input style="min-width:513px;" v-model="addNewUser['name']" placeholder="请填写真实姓名"></el-input>
                    </span>
                </div>
                <div class="material-name clearfix " style="margin-top:20px;">
                    <span class="material-name-left fl">公司名称</span>
                    <span class="material-name-right fl">
                        <el-input style="min-width:513px;" v-model="addNewUser['company-name']" placeholder="请填写公司名称"></el-input>
                    </span>
                </div>
                <div class="material-name clearfix" style="margin-top:20px;margin-bottom:40px;">
                    <span class="material-name-left fl">用户描述</span>
                    <span class="material-name-right fl">
                        <el-input type="textarea" v-model="addNewUser['comment']" style="min-width:513px;"></el-input>
                    </span>
                </div>
                <div class="material-search" style="margin-left:68px;">
                    <a href="javascript:;" class="yxf-but" @click="cdup">返 回</a>
                    <a href="javascript:;" class="yxf-but" @click="save">保 存</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'material-manage',
    data() {
        return {
            list: null,
            all: 40,
            ishide: true,
            addNewUser: {
                "user-name": '', //用户账号
                "password": '', //用户密码
                "name": '', //真实姓名
                "comment": '', //用户描述
                "company-name": ""//公司名称
            },
            active: "all",
            area: '',
            checked: true,
            Index: "0",
            value2: "",
            options: [],
        }
    },
    created() {
        // 发送请求拿到页面表格数值赋值给list
        this.getOptionsList();
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        getOptionsList() {
            this.$esellApi.send(
                "/role/options.shtml",
                {},
                res => {
                    console.log(res);
                    this.options = res.payload;
                },
                res => {
                    this.message("error", res.message)
                }
            );
        },
        cdup() {
            this.$router.go(-1);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // tab跳转获取参数
        makeActive(str, index) {
            this.Index = index;
            this.active = str;
            console.log(str);
        },
        save() {
            if (this.addNewUser["user-name"] == '') {
                this.message("error", "用户账号不能为空")
                return
            }
            if (this.addNewUser["password"] == '') {
                this.message("error", "用户密码不能为空")
                return
            }
            // if (this.addNewUser["role-id"] == '') {
            //     this.message("error", "请先选择角色")
            //     return
            // }
            if (this.addNewUser["corporate-name"] == '') {
                this.message("error", "公司名称不能为空")
                return
            }
            console.log(this.addNewUser)
            this.addNewUser.password = md5(this.addNewUser.password)
            this.$esellApi.send("/company/proxy/add.shtml", this.addNewUser, res => {
                this.$router.push({ path: "/corporate_manage" });
                this.message("success", "新增成功")
            }, res => {
                this.message("error", res.message)
            })
        },
    },
    watch: {
        area: function(newVal, oldVal) {
            console.log(newVal);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../sass/materialManage.scss';
</style>

