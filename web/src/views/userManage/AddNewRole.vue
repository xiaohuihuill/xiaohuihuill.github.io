<!--角色管理-->
<template>
    <div class="material-manage">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/user_mag" class="blue">用户管理</router-link>
                <span>></span>
                <router-link to="/user_mag/role_mag" class="blue">角色管理</router-link>
                <span>></span>
                <span>增加新角色</span>
            </span>
        </div>
        <div class="bottom">
            <div class="row1">
                <div class="material-name clearfix">
                    <span class="material-name-left fl">角色名称</span>
                    <span class="material-name-right fl">
                        <el-input style="min-width:513px;" v-model="roleName" placeholder="请填写角色名称"></el-input>
                    </span>
                </div>
            </div>
            <div class="tabs clearfix">
                <div class="tabs-advertising">
                    <div class="fl mine-poster" :class="{'active':bg=='P'}" @click="posterSwitch('P')">PC 版</div>
                    <!--<div class="fl poster-library" :class="{'active':bg=='M'}" @click="posterSwitch('M')">手机版</div>-->
                </div>
            </div>
            <div class="advertising" v-show="isShow" style="margin-top:20px;">
                <div>
                    <div v-for="(item,index) in jurisdictionList" :key="index">
                        <div class="clearfix" style="margin-left:72px;margin-top:10px;position: relative">
                            <div v-if="item.name =='系统首页'" class="homePage" style="position: absolute;top:0;left:-60px;">
                                <span>选择权限</span>
                            </div>
                            <span class="fl" style="min-width:100px;">
                                <el-checkbox :indeterminate="isIndeterminate" v-model="item.checkAll" @change="handleCheckAllChange($event,index)">{{item.name}}</el-checkbox>
                            </span>
                            <span class="fl">
                                <el-checkbox-group v-model="item.checkedCities" @change="handleCheckedCitiesChange(item.checkedCities,index)">
                                    <el-checkbox style="margin-left:40px;" v-for="city in item.permissions" :label="city" :key="city">{{city.name}}</el-checkbox>
                                </el-checkbox-group>
                            </span>
                        </div>
                    </div>
                    <div style="margin-top:20px;">
                        <a href="javascrip:;" class="yxf-but" style="margin-right:6px;" @click="cdup">
                            返回
                        </a>
                        <a href="javascrip:;" class="yxf-but" @click="addNewUser">
                            完成
                        </a>
                    </div>
                </div>
            </div>
            <div class="advertising-group" v-show="!isShow" style="margin-top:20px;">
                2
            </div>
        </div>
    </div>
</template>
<script>
// const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
    name: 'material-manage',
    data() {
        return {
            jurisdictionList: null,//权限列表
            type: "P",//p-pc版，m-移动版
            roleName: '',//角色名字
            checked: false,
            bg: "P",
            isShow: true,
        }
    },
    created() {
        // 发送请求拿到页面表格数值赋值给list
        // console.log(this.$route.query)
        // this.GetPageRolePermissions();
    },
    mounted() {
        this.$esellApi.checkPermissions();
        this.$nextTick(function() {
            if (this.$route.query) {
                if (this.$route.query.name) {
                    this.roleName = this.$route.query.name;
                }
            }
        })
    },
    methods: {
        // 进入页面获取页面角色权限
        GetPageRolePermissions() {
            this.$esellApi.send("/role/permission.shtml", {
                "type": this.type,
                "id": this.$route.query.id
            }, (res) => {
                console.log(res.payload);
                res.payload.forEach(function(val, i) {
                    val.checkAll = false;
                    val.checkedCities = [];
                    val.isIndeterminate = true;
                    val.allCheckedArray = [];
                })
                this.jurisdictionList = res.payload;
            }, (res) => {
                this.message('error', res.message);
            })
        },
        // 增加新角色
        addNewUser() {
            if (this.roleName == "") {
                this.message("warning", "请输入角色名字", function() { });
                return;
            }
            console.log(this.jurisdictionList);
            var arr = [];
            if (this.checked) {
                arr.push(1)
            }
            this.jurisdictionList.forEach(function(v, i) {
                arr = arr.concat(v.allCheckedArray)
            })
            this.$esellApi.send("/role/add.shtml", {
                "name": this.roleName,//角色名称
                "permissions": arr//权限列表
            }, (res) => {
                this.$router.push({ path: "/user_mag/role_mag" })
            }, (res) => {
                this.message('error', res.message);
            })
        },
        posterSwitch(str) {
            if (str === 'mine-poster') {
                this.isShow = true
            } else {
                this.isShow = false
            }
            this.bg = str;
            console.log(str);
        },
        // 全选Checked
        handleCheckAllChange(event, i) {
            var item = this.jurisdictionList[i];
            // console.log(item);
            item.allCheckedArray = [];
            var jurisdictionListId = item.id;//当前选中选项的名字
            if (event.target.checked) {
                item.checkedCities = item.permissions;
                item.permissions.forEach(function(ele, index) {
                    item.allCheckedArray.push(ele.id)
                })
                item.allCheckedArray.push(jurisdictionListId);
            } else {
                item.checkedCities = [];
            }
            item.isIndeterminate = false;
            item.allCheckedArray = this.unique(item.allCheckedArray);
            console.log(this.jurisdictionList)
        },
        // 去除重复的元素
        unique(arr) {
            let resultarr = [...new Set(arr)];
            return resultarr;
        },
        // 单个Checked
        handleCheckedCitiesChange(value, i) {
            // console.log(value,i)
            var item = this.jurisdictionList[i];
            item.allCheckedArray = [];
            let checkedCount = value.length;
            item.checkAll = checkedCount > 0;
            value.forEach(function(ele, index) {
                item.allCheckedArray.push(ele.id)
                if (index === value.length - 1) {
                    item.allCheckedArray.push(ele["parent-id"])
                }
            });
            item.allCheckedArray = this.unique(item.allCheckedArray);
        },
        cdup() {
            this.$router.go(-1);
        }
    },
    watch: {
    }
}
</script>
<style lang="scss" scoped>
@import "../../sass/addNewRole.scss";
div.active {
    transition: all .6s;
    color: #fff !important;
    background-color: #ff635c!important;
}
</style>

