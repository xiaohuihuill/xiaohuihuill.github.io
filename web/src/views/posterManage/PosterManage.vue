<template>
    <div class="poster-manage">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span>海报管理</span>
            </span>
        </div>
        <div class="bottom">
            <div class="tabs clearfix">
                <div class="tabs-advertising">
                    <div class="fl mine-poster" :class="{'active':bg=='mine-poster'}" @click="posterSwitch('mine-poster')">我的海报</div>
                    <div class="fl poster-library" :class="{'active':bg=='poster-library'}" @click="posterSwitch('poster-library')">海报库</div>
                </div>
            </div>
            <div class="advertising" v-show="isShow" style="margin-top:20px;">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix fl" style="margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">海报名称</div>
                                <div class="popularization-plan-input fl" style="min-width:513px">
                                    <el-input placeholder="请填写海报名称"></el-input>
                                </div>
                            </div>
                            <div class="condition-search fl">
                                <a href="javascript:;" class="yxf-but">查询</a>
                                <a href="javascript:;" class="yxf-but" @click="cleanCondition">清空条件</a>
                            </div>
                        </div>
                    </div>
                    <div style="margin:20px 0;">
                        <a href="javascript:;" class="yxf-but" style="margin-right:6px;">全选</a>
                        <a href="javascript:;" class="yxf-but" @click="cleanCondition">批量删除</a>
                    </div>
                    <div class="home-fenyeCon">
                        <div class="all-material clearfix">
                            <div class="material-file fl clearfix">
                                <div class="file-type" style="cursor:pointer;box-sizing:border-box;border-radius:4px;border:1px solid #e5e5e5;text-align: center;padding:35px 20px 20px;">
                                    <i class="iF" style="font-size:34px">&#xe6ad;</i>
                                    <p> 制作新的海报</p>
                                </div>
                            </div>
                            <div class="material-file fl clearfix" v-for="(item, index) in list" :key="index">
                                <div class="file-type">
                                    <!--<img :src="item.img" alt="">-->
                                    <img src="./../../assets/images/material_manage/file.png" alt="">
                                </div>
                                <div class="file-name clearfix">
                                    <div class="file-name-left fl">
                                        <el-checkbox v-model="checked"></el-checkbox>
                                    </div>
                                    <div class="file-name-right fl">{{item["file-name"]}}
                                        <span>{{item["file-type"]}}</span>
                                    </div>
                                </div>
                                <div class="file-operation-file clearfix" v-if="item.type=='file'">
                                    <div class="edit blue fl" @click="edit(index)">编辑</div>
                                    <div class="delete blue fl" @click="delete1(index)">删除</div>
                                </div>
                                <div class="file-operation-other clearfix" v-else>
                                    <div class="shear blue fl" @click="shear(index)">剪切</div>
                                    <div class="copy blue fl" @click="copy(index)">复制</div>
                                    <div class="edit blue fl" @click="edit(index)">编辑</div>
                                    <div class="delete1 blue fl" @click="delete1(index)">删除</div>
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
            <div class="advertising-group" v-show="!isShow" style="margin-top:20px;">
                <div class="condition">
                    <div class="condition-info">
                        <div class="condition-content clearfix" style="width:100%">
                            <div class="popularization-plan clearfix" style="margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">行业模板</div>
                                <div class="popularization-plan-input fl">
                                    <span>全部</span>
                                    <i>|</i>
                                    <span>服装百货</span>
                                    <i>|</i>
                                    <span>餐饮</span>
                                </div>
                            </div>
                            <div class="popularization-plan clearfix" style="margin-right:1%">
                                <div class="popularization-plan-info fl" style="width: 77px;">使用场景</div>
                                <div class="popularization-plan-input fl">
                                    <span>全部</span>
                                    <i>|</i>
                                    <span>优惠促销</span>
                                    <i>|</i>
                                    <span>企业展示</span>
                                    <i>|</i>
                                    <span>单品推荐</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="material-hint">
                        <span>点击海报模板开始制作，共有({{count}})个素材</span>
                    </div>
                    <div style="margin-top:20px;position:relative">
                        <div class="material-hint">
                            <span>点击海报模板开始制作，共有({{count}})个素材</span>
                        </div>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="横屏管理" name="landscape">
                                <div class="clearfix" style="margin-top:5px">
                                    <div style="width:25%;padding:8px;box-sizing:border-box" class="fl">
                                        <a href="javascript:;"> <img style="width:100%" src="./../../assets/images/poster_manage/poster_manage.jpg" alt=""></a>
                                        <div style="margin-top:6px;" class="clearfix">
                                            <span class="fl">菜品推荐</span>
                                            <span class="fr blue" @click="makePoster()">开始制作</span>
                                        </div>
                                    </div>
                                    <div style="width:25%;padding:8px;box-sizing:border-box" class="fl">
                                        <a href="javascript:;"> <img style="width:100%" src="./../../assets/images/poster_manage/poster_manage.jpg" alt=""></a>
                                        <div style="margin-top:6px;" class="clearfix">
                                            <span class="fl">菜品推荐</span>
                                            <span class="fr blue" @click="makePoster()">开始制作</span>
                                        </div>
                                    </div>
                                    <div style="width:25%;padding:8px;box-sizing:border-box" class="fl">
                                        <a href="javascript:;"> <img style="width:100%" src="./../../assets/images/poster_manage/poster_manage.jpg" alt=""></a>
                                        <div style="margin-top:6px;" class="clearfix">
                                            <span class="fl">菜品推荐</span>
                                            <span class="fr blue" @click="makePoster()">开始制作</span>
                                        </div>
                                    </div>
                                    <div style="width:25%;padding:8px;box-sizing:border-box" class="fl">
                                        <a href="javascript:;"> <img style="width:100%" src="./../../assets/images/poster_manage/poster_manage.jpg" alt=""></a>
                                        <div style="margin-top:6px;" class="clearfix">
                                            <span class="fl">菜品推荐</span>
                                            <span class="fr blue" @click="makePoster()">开始制作</span>
                                        </div>
                                    </div>
                                    <div style="width:25%;padding:8px;box-sizing:border-box" class="fl">
                                        <a href="javascript:;"> <img style="width:100%" src="./../../assets/images/poster_manage/poster_manage.jpg" alt=""></a>
                                        <div style="margin-top:6px;" class="clearfix">
                                            <span class="fl">菜品推荐</span>
                                            <span class="fr blue" @click="makePoster()">开始制作</span>
                                        </div>
                                    </div>
                                    <div style="width:25%;padding:8px;box-sizing:border-box" class="fl">
                                        <a href="javascript:;"> <img style="width:100%" src="./../../assets/images/poster_manage/poster_manage.jpg" alt=""></a>
                                        <div style="margin-top:6px;" class="clearfix">
                                            <span class="fl">菜品推荐</span>
                                            <span class="fr blue" @click="makePoster()">开始制作</span>
                                        </div>
                                    </div>
                                    <div style="width:25%;padding:8px;box-sizing:border-box" class="fl">
                                        <a href="javascript:;"> <img style="width:100%" src="./../../assets/images/poster_manage/poster_manage.jpg" alt=""></a>
                                        <div style="margin-top:6px;" class="clearfix">
                                            <span class="fl">菜品推荐</span>
                                            <span class="fr blue" @click="makePoster()">开始制作</span>
                                        </div>
                                    </div>
                                    <div style="width:25%;padding:8px;box-sizing:border-box" class="fl">
                                        <a href="javascript:;"> <img style="width:100%" src="./../../assets/images/poster_manage/poster_manage.jpg" alt=""></a>
                                        <div style="margin-top:6px;" class="clearfix">
                                            <span class="fl">菜品推荐</span>
                                            <span class="fr blue" @click="makePoster()">开始制作</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="paging" v-if="ishide" style="text-align: center;margin-top:20px;">
                                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="pagesize" :page-sizes='[8]' layout="total, sizes, prev, pager, next, jumper" :total="100">
                                    </el-pagination>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="竖屏管理" name="portrait-screen">竖屏管理</el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "poster-manage",
    data() {
        return {
            activeName: 'landscape',
            ishide: "true",
            is: true,
            count: 8,
            bg: "mine-poster",
            radio2: 3,
            radio3: 3,
            advertisingManageData: {
                input1: "",
                date1: "",
                date2: "",
                value1: "",
                value2: "",
                value3: "",
            },
            isShow: true,
            isActive: true,
            Index: "0",
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
            }],
        };
    },
    created() {
        console.log(this.advertisingManagerData);
        // 发送请求拿到页面表格数值赋值给list
        this.list = [{
            "id": "1",
            "type": "file",
            "img": "1",
            "date": "2016-05-03",
            "file-name": "文件夹1",
            "file-type": "",
            "img": "./../../assets/images/material_manage/file.png"
        },
        {
            "id": "2",
            "type": "img",
            "img": "1",
            "date": "2016-05-03",
            "file-name": "pdf1",
            "file-type": ".png",
            "img": "./../../assets/images/material_manage/pdf.png"
        }, {
            "id": "3",
            "type": "video",
            "img": "1",
            "date": "2016-05-03",
            "file-name": "txt333",
            "file-type": ".txt",
            "img": "./../../assets/images/material_manage/txt.png"
        }]
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        cleanCondition() {
            this.advertisingManageData = {
                input1: "",
                date1: "",
                date2: "",
                value1: "",
                value2: "",
                value3: "",
            }
        },
        makeActive(str, index) {
            // 发送请求
            this.Index = index;
            console.log(str);
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
        makePoster() {
            // 需要对应模板的参数
            this.$router.push({ path: '/poster_mag/make_poster' });
        }
    },
    watch: {

    },
    destroyed() {
    },
    updated() {

    },
    computed: {
     
    }
};
</script>
<style lang="scss" scoped>
@import "../../sass/posterManage.scss";
div.active {
    transition: all .6s;
    color: $white !important;
    background-color: $impColor !important;
}

.material-hint {
    position: absolute;
    top: 10px;
    right: 0;
    color: #666;
}
</style>


