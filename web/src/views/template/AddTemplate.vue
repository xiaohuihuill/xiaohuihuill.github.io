<template>
    <div class="tempalte-manager">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/temp_mag" class="blue">布局管理</router-link>
                <span>></span>
                <span>添加布局</span>
            </span>
        </div>
        <div class="bottom">
            <div class="advertising" v-show="isShow">
                <div class="importance-hint">
                    <div class="hint yxf-color">重要提示&nbsp;:</div>
                    <div class="hint-one">
                        <span>1、请选择您常用的模板样式，一旦选定不可轻易修改，否则会导致广告投放异常</span>
                    </div>
                    <div class="hint-line"></div>
                </div>
                <!--all-device-->
                <div class="tempalte-type" style="margin-top:20px;">
                    <div class="simple-template-quantity" v-if="activeName=='portrait-screen-template'">
                        <span>竖屏布局
                            <span>4</span>&nbsp;个</span>
                    </div>
                    <div>
                        <el-tabs v-model="activeName" @tab-click="handleClick">
                            <el-tab-pane label="横屏布局" name="landscape-template">
                                <div class="simple-template-type">
                                    <div class="simple-template-landscape fl">
                                        <div class="simple-template-landscape-image">
                                            <a href="javascript:;">
                                                <img src="./../../assets/images/template_manage.jpg" alt="">
                                            </a>
                                        </div>
                                        <div class="simple-template-landscape-info">
                                            <div class="template-name">
                                                <span>布局名称:</span>
                                                <span>全屏-横屏</span>
                                            </div>
                                            <p>分辨率:
                                                <span>1920*1080</span>
                                            </p>
                                            <p>广告位:
                                                <span>1920*1080</span>
                                            </p>
                                        </div>
                                        <div class="simple-template-landscape-options">默认布局，不可编辑删除</div>
                                    </div>
                                    <div class="simple-template-landscape fl">
                                        <div class="simple-template-landscape-image">
                                            <a href="javascript:;">
                                                <img src="./../../assets/images/template_manage.jpg" alt="">
                                            </a>
                                        </div>
                                        <div class="simple-template-landscape-info">
                                            <div class="template-name">
                                                <span>布局名称:</span>
                                                <span>全屏-横屏</span>
                                            </div>
                                            <p>分辨率:
                                                <span>1920*1080</span>
                                            </p>
                                            <p>广告位:
                                                <span>1920*1080</span>
                                            </p>
                                        </div>
                                        <div class="simple-template-landscape-options">默认布局，不可编辑删除</div>
                                    </div>
                                    <div class="simple-template-landscape fl">
                                        <div class="simple-template-landscape-image">
                                            <a href="javascript:;">
                                                <img src="./../../assets/images/template_manage.jpg" alt="">
                                            </a>
                                        </div>
                                        <div class="simple-template-landscape-info">
                                            <div class="template-name">
                                                <span>布局名称:</span>
                                                <span>全屏-横屏</span>
                                            </div>
                                            <p>分辨率:
                                                <span>1920*1080</span>
                                            </p>
                                            <p>广告位:
                                                <span>1920*1080</span>
                                            </p>
                                        </div>
                                        <div class="simple-template-landscape-options">默认布局，不可编辑删除</div>
                                    </div>
                                    <div class="simple-template-landscape fl">
                                        <div class="simple-template-landscape-image">
                                            <a href="javascript:;">
                                                <img src="./../../assets/images/template_manage.jpg" alt="">
                                            </a>
                                        </div>
                                        <div class="simple-template-landscape-info">
                                            <div class="template-name">
                                                <span>布局名称:</span>
                                                <span>全屏-横屏</span>
                                            </div>
                                            <div class="template-info">
                                                <p>分辨率:
                                                    <span>1920*1080</span>
                                                </p>
                                                <p>广告位:
                                                    <span>1920*1080</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="simple-template-landscape-options">默认布局，不可编辑删除</div>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <!--竖屏布局-->
                            <el-tab-pane label="竖屏布局" name="portrait-screen-template">竖屏布局</el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="paging" v-if="ishide" style="text-align: center;margin-top:20px;">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="pagesize" :page-sizes='[4,12]' layout="total, sizes, prev, pager, next, jumper" :total="100">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "tempalte-manager",
    data() {
        return {
            isShow: true,
            all: 40,
            ishide: true,
            active: "all",
            area: "",
            bg: "mine-system-layout",
            activeName: "landscape-template"
        };
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        posterSwitch(str) {
            if (str === "mine-system-layout") {
                this.isShow = true;
            } else {
                this.isShow = false;
            }
            this.bg = str;
            console.log(str);
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleRowHandle(row, event, column) {
            console.log(row);
            // console.log(event);
            console.log(column);
        },
        makeActive(str) {
            this.active = str;
            console.log(str);
        },
    },
    watch: {
        area: function(newVal, oldVal) {
            console.log(newVal);
        }
    },
};
</script>
<style lang="scss" scoped>
@import "../../sass/templateManage.scss";
.tempalte-type {
    position: relative;
}

.simple-template-quantity {
    position: absolute;
    top: 10px;
    right: 0;
}

div.active {
    transition: all 0.6s;
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

