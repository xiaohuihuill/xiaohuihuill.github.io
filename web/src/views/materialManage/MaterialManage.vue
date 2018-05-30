<!--素材管理-->
<template>
    <div class="material-manage">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span>素材管理</span>
            </span>
        </div>
        <div class="bottom">
            <div class="row1 clearfix">
                <div class="material-name clearfix fl">
                    <span class="material-name-left fl">素材名称</span>
                    <span class="material-name-right fl">
                        <el-input style="min-width:513px;" v-model="getMaterialManageListData1.name" placeholder="请填写素材名称"></el-input>
                    </span>
                </div>
                <div class="material-search fl">
                    <a href="javascript:;" class="yxf-but" @click="searchMaterialManage" data-butflag="1522753311596">查询</a>
                    <a href="javascript:;" class="yxf-but" @click="clearMaterialManageData">清空条件</a>
                </div>
            </div>
            <div class="material-manage-file-select">
                <a href="javascript:;" class="yxf-but" @click="addMaterial" data-butflag="1523243388938">新增素材</a>
                <a href="javascript:;" class="yxf-but" @click="checkAll">全选</a>
                <!--<a href="javascript:;" class="yxf-but" @click="batchDelete" data-butflag="1523245340195">批量删除</a>-->
            </div>
            <!--all-device-->
            <div class="row3 clearfix" v-on:click.prevent>
                <div :class="[{'isActive':index==Index},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type" :key="index">
                    <span>{{item.name}}</span>
                </div>
            </div>
            <div class="home-fenyeCon">
                <div class="all-material clearfix" v-loading="loading">
                    <div class="material-file fl clearfix" v-for="(item, index) in list" :key="index">
                        <div @click.prevent="checkEle(index)">
                            <div class="file-type" style="position:relative" v-if="item.type=='IMG'">
                                <img :src="item['cover-url']||item.url" alt="">
                                <div class="file-remove" data-butflag="1523245340195" @click.stop="delete1(item,index)">X</div>
                                <div class="file-preview" @click.stop="preview(item,index)">预览</div>
                            </div>
                            <div class="file-type" style="position:relative" v-else-if="item.type=='CONTENT'">
                                <img src="http://file1.yixinfa.cn/dev/180328/2e7ebf22d83e4cce9788d9176e9b6865.jpg" alt="">
                                <div class="file-remove" data-butflag="1523245340195" @click.stop="delete1(item,index)">X</div>
                            </div>
                             <div class="file-type" style="position:relative" v-else-if="item.type=='WEB'">
                                <img src="http://file1.yixinfa.cn/dev/180417/006cebb2107f4eb5a3e88053c922ab7b.png/100" alt="">
                                <div class="file-remove" data-butflag="1523245340195" @click.stop="delete1(item,index)">X</div>
                            </div>
                            <div class="file-type" style="position:relative" v-else>
                                <img :src="item['cover-url']" alt="">
                                <div class="file-remove" data-butflag="1523245340195" @click.stop="delete1(item,index)">X</div>
                                <div class="file-preview" @click.stop="preview(item,index)">预览</div>
                            </div>
                            <div class="file-name clearfix">
                                <div class="file-name-left fl">
                                    <el-checkbox v-model="item.checked"></el-checkbox>
                                </div>
                                <div class="file-name-right fl">{{item["name"]}}
                                    <span>{{item["file-type"]}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="paging" v-if="ishide">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="getMaterialManageListData1.size" :page-sizes='[12,24]' layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!--弹出框新建文件夹-->
        <el-dialog title="新建文件夹" :visible.sync="newFolder" size="tiny">
            <div class="">
                <span style="min-width:90px;">文件夹名称</span>
                <span style="width:80%">
                    <el-input style="width:60%" v-model="value111" placeholder="请输入文件夹名称"></el-input>
                </span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="newFolder = false">取 消</el-button>
                <el-button type="primary" @click="newFolder = false">确 定</el-button>
            </span>
        </el-dialog>
        <!--弹出框预览图-->
        <el-dialog title="预览" :visible.sync="previewShowOrHide" width="30%" :before-close="handleClose">
            <div style="width:500px;height:100%;margin:0 auto;" v-if="previewType=='IMG'">
                <img :src='url' alt="" style="width:100%;height:100%">
            </div>
            <div style="width:500px;height:100%;margin:0 auto;" v-else>
                <video :src='url' controls="controls" style="width:100%;height:100%">
                    您的版本太低浏览器无法预览。
                </video>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'material-manage',
    data() {
        return {
            // newFolder: false,//弹出框新建文件夹
            deleteArr: [],
            keepArr: [],
            list: [],
            ishide: true,
            loading: false,
            active: "all",
            Index: "0",
            type: [{
                "type": "",
                "name": "全部素材",
                "num": 100
            }, {
                "type": "IMG",
                "name": "图片",
                "num": 20
            }, {
                "type": "VDO",
                "name": "视频",
                "num": 10
            }],
            getMaterialManageListData1: {
                page: 1,
                size: 12,
                type: "",
                name: "",
            },
            total: '',
            url: "",//预览图的url
            previewShowOrHide: false,
            previewType: "IMG",
        }
    },
    created() {
        this.getMaterialManageListData();
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        getMaterialManageListData() {
            this.loading = true;
            this.$esellApi.send("/media/list.shtml", this.getMaterialManageListData1, res => {
                this.list = res.payload.data;
                this.total = res.payload.total;
                this.loading = false;
                console.log("正确的素材管理列表数据", res.payload.data);
            }, res => {
                console.log("错误的素材管理列表数据", res.payload.data);
                this.message("error", res.message)
            })
        },
        searchMaterialManage() {
            this.getMaterialManageListData();
        },
        clearMaterialManageData() {
            this.getMaterialManageListData1 = {
                name: "",
            }
        },
        addMaterial() {
            this.$router.push({ path: "/material_mag/add_material" })
        },
        // tab跳转获取参数
        makeActive(str, index) {
            this.Index = index;
            this.active = str;
            this.getMaterialManageListData1.type = str;
            this.getMaterialManageListData();
        },
        // 批量删除
        batchDelete() {
            var _self = this;
            // this.deleteArr = []
            // this.keepArr.forEach(function(ele, i) {
            //     if (ele.checked == true) {
            //         _self.deleteArr.push(ele.id);
            //     }
            // })
            console.log(1111111,this.keepArr);
            if (this.keepArr.length > 0) {
                this.$confirm('此操作将永久删除素材, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$esellApi.send("/media/batch/delete.shtml", {
                        ids: this.keepArr
                    }, res => {
                        this.getMaterialManageListData();
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                    }, res => {
                        this.$message({
                            type: 'success',
                            message: res.message
                        });
                    })
                }).catch(() => {
                    // 失败操作
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            } else {
                this.$message({
                    type: 'warning',
                    message: '请先选择要删除的素材'
                });
            }
        },
        // 删除  不能用delete(关键词)
        delete1(row) {
            // 提示可直接使用
            this.$confirm('此操作将永久删除素材, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                // 成功操作
                this.$esellApi.send("/media/delete.shtml", {
                    id: row.id
                }, res => {
                    this.getMaterialManageListData();
                }, res => {
                    this.$message({
                        type: 'success',
                        message: res.message
                    });
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
        // 元素单选
        checkEle(index) {
            var _self = this;
            this.list[index].checked = !this.list[index].checked;
            if (this.list[index].checked) {
                this.keepArr.push(this.list[index]);
            }
            this.keepArr = [...new Set(this.keepArr)];
            this.keepArr.forEach(function(ele, i) {
                if (ele.checked == false) {
                    _self.keepArr.splice(i, 1)
                }
            })
            console.log(this.keepArr);
        },
        // 全选
        checkAll() {
            var _self = this;
            if (this.list.every((ele) => ele.checked == true)) {
                this.list.forEach((ele, index) => {
                    ele.checked = false
                    _self.keepArr = [];
                });
            } else {
                this.list.forEach((ele, index) => {
                    if (this.list[index].checked == false) {
                        ele.checked = true;
                        _self.keepArr.push(this.list[index].id);
                        _self.keepArr = [...new Set(this.keepArr)];
                    }
                });
            }
        },
        // 更改每次需要的个数
        handleSizeChange(val) {
            this.getMaterialManageListData1.size = val;
            console.log(`每页 ${val} 条`);
            this.getMaterialManageListData();
        },
        // 更改每次需要的页数
        handleCurrentChange(val) {
            this.getMaterialManageListData1.page = val;
            console.log(`当前页: ${val}`);
            this.getMaterialManageListData();
        },
        // 预览
        preview(item, id) {
            if (item.type=="WEB"){
                window.open("http://www.baidu.com")
            } else {
                console.log(item);
                this.url = item.url;
                this.previewType = item.type;
                this.previewShowOrHide = true;
            }

        }

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

div.active {
    transition: all .6s;
    color: $white !important;
    background-color: $impColor !important;
}

div.isActive {
    color: $impColor !important;
    box-sizing: border-box;
    position: relative;
    transition: all 0s .1s;
    height: 34px!important;
    line-height: 34px!important;
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

