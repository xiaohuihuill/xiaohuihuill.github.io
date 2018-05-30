<template>
    <div class="device-manage">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/devgroup_mag" class="blue">设备组管理</router-link>
                <span>></span>
                <span>截屏管理</span>
            </span>
        </div>
        <div class="bottom">
            <div class="device-manage-condition">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">设备组名称</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="advertisingManageData.input1" placeholder="请填写设备组名称" style="100%;"></el-input>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">设备</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-select v-model="advertisingManageData.value1" placeholder="请选择设备" style="width:100%">
                                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">时间</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-date-picker v-model="advertisingManageData.date1" type="datetime" placeholder="请选择开始时间" style="width:100%;">
                                    </el-date-picker>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">到</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-date-picker v-model="advertisingManageData.date2" type="datetime" placeholder="请选择结束时间" style="width:100%;">
                                    </el-date-picker>
                                </div>
                            </div>

                        </div>
                        <div class="condition-search">
                            <a href="javascript:;" class="yxf-but">查询</a>
                            <a href="javascript:;" class="yxf-but" @click="cleanCondition">清空条件</a>
                        </div>
                    </div>
                    <div class="advertising-operation">
                        <a href="javascript:;" class="yxf-but advertising-operation-suspend">全选</a>
                        <a href="javascript:;" class="yxf-but advertising-operation-delete">批量删除</a>
                    </div>
                    <div>
                        <div class="row3 clearfix" v-on:click.prevent>
                            设备名称:设备1
                        </div>
                        <div class="home-fenyeCon">
                            <div class="all-material clearfix">
                                <div class="material-file fl clearfix" v-for="(item, index) in list" :key="index">
                                    <div class="file-type">
                                        <img src="./../../assets/images/material_manage/file.png" alt="">
                                    </div>
                                    <div class="file-name clearfix">
                                        <div class="file-name-left fl">
                                            <el-checkbox v-model="checked"></el-checkbox>
                                        </div>
                                        <div class="file-name-right fl">时间:{{item.date}}
                                        </div>
                                    </div>
                                    <div class="file-operation-file clearfix">
                                        <div class="edit blue fl" @click="edit(index)">浏览</div>
                                        <div class="delete blue fl" @click="delete1(index)">删除</div>
                                    </div>
                                </div>
                            </div>
                            <div class="paging" v-if="ishide">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="pagesize" :page-sizes='[30,50]' layout="total, sizes, prev, pager, next, jumper" :total="100">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import Table from './table2/Table.vue'
export default {
    name: "device-manage",
    components: {
        Table
    },
    data() {
        return {
            is: true,
            bg: "advertising",
            list:null,
            advertisingManageData: {
                input1: "",
                input2: "",
                date1: "",
                date2: "",
                value1: "",
                value2: "",
                value3: "",
            },
            isShow: true,
            active: 'all-advertising',
            isActive: true,
            Index: "0",
            type: [{
                type: "all-advertising",
                name: "全部设备",
                num: 100
            }, {
                type: "put-in",
                name: "在线设备",
                num: 20
            }, {
                type: "stay-play",
                name: "离线设备",
                num: 10
            }, {
                type: "stay-audit",
                name: "已过期设备",
                num: 30
            }],
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }]
        };
    },
    created() {
        this.list = [{
            "id": "1",
            "type": "file",
            "img": "1",
            "date": "2016-05-03 16:28:03",
            "file-type": "",
            "img": "./../../assets/images/material_manage/file.png"
        },
        {
            "id": "2",
            "type": "img",
            "img": "1",
            "date": "2016-05-03 16:28:03",
            "file-name": "",
            "file-type": "",
            "img": "./../../assets/images/material_manage/pdf.png"
        }, {
            "id": "3",
            "type": "video",
            "img": "1",
             "date": "2016-05-03 16:28:03",
            "file-name": "",
            "file-type": "",
            "img": "./../../assets/images/material_manage/txt.png"
        }]
        console.log(this.advertisingManagerData);
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        cleanCondition() {
            this.advertisingManageData = {
                input: "",
                date1: "",
                date2: "",
                value: ''
            }
        },
        makeActive(str, index) {
            this.Index = index;
            this.active = str;
            console.log(str);
        },
        addadvertising() {
            console.log(this.$router);
            this.$router.push({ path: "/new_adv" });
        },
        advertisingSwitch(str) {
            if (str == 'advertising') {
                this.isShow = true
            } else {
                this.isShow = false
            }
            this.bg = str;
            console.log(str);
        },
         // 剪切
        shear(id) {
            console.log(id);
        },
        // 复制
        copy(id) {
            console.log(id);
        },
        // 修改
        edit(id) {
            console.log(id);
        },
        // 删除  不能用delete(关键词)
        delete1(id) {
            console.log(id);
            // 提示可直接使用
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 成功操作
                this.list.forEach((v, i) => {
                    if (i == id) {
                        this.list.splice(id, 1);
                    }
                })
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                // 失败操作
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
    },
    watch: {

    },
    destroyed() {
    },
    updated() {

    },
    computed: {
    
    }
}
}
</script>
<style lang="scss" scoped>
@import "../../sass/screenShotManage.scss";
div.active {
    transition: all .6s;
    color: $white !important;
    background-color: $impColor !important;
}

div.isActive {
    color: $impColor !important;
    background-color: $white !important;
    border: 1px solid $sublineColor;
    border-top: none; // border-top: 2px solid $impColor;
    border-bottom: none; // line-height: 38px!important;
    box-sizing: border-box;
    position: relative;
}

div.isActive::before {
    content: "";
    height: 2px;
    width: 100%;
    background-color: $impColor;
    position: absolute;
    top: -1px;
    left: 0;
}
</style>


