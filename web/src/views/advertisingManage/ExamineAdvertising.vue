<!--素材管理-->
<template>
    <div class="examine-advertising">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span to="/adv_mag" class="blue">广告管理</span>
                <span>></span>
                <span>查看广告</span>
            </span>
        </div>
        <div class="bottom">
            <div class="condition">
                <div class="condition-info">
                    <div class="condition-content clearfix" style="width:100%">
                        <div class="popularization-plan clearfix fl" style="width:32.33%;margin-right:1%">
                            <div class="popularization-plan-info fl" style="width: 77px;">推广计划</div>
                            <div class="popularization-plan-input fl" style="width:71%">
                                <el-select v-model="advertisingManageData.value1" placeholder="请选择推广计划" style="width:100%;">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="popularization-plan clearfix fl" style="width:32.33%">
                            <div class="popularization-plan-info fl" style="width: 77px;">投放设备组</div>
                            <div class="popularization-plan-input fl" style="width:71%">
                                <el-select v-model="advertisingManageData.value2" placeholder="请选择设备组" style="width:100%">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </div>
                    <div class="condition-search">
                        <a href="javascript:;" class="yxf-but">查询</a>
                        <a href="javascript:;" class="yxf-but" @click="cleanCondition">清空条件</a>
                    </div>
                </div>
            </div>

            <div style="margin-top:20px;">
                <a href="javascript:;" class="yxf-but">新增广告</a>
                <a href="javascript:;" class="yxf-but">批量启用</a>
                <a href="javascript:;" class="yxf-but">批量暂停</a>
                <a href="javascript:;" class="yxf-but">批量删除</a>
                <a href="javascript:;" class="yxf-but">批量移动到</a>
                <a href="javascript:;" class="yxf-but">设置排序</a>
            </div>

            <div style="margin-top:20px;">
                <Table></Table>
            </div>
        </div>
    </div>
</template>
<script>
import Table from './table2/dragTable.vue'
export default {
    name: 'examine-advertising',
    components: {
        Table
    },
    data() {
        return {
            list: null,
            all: 40,
            ishide: true,
            active: "all",
            area: '',
            checked: true,
            Index: "0",
            advertisingManageData: {
                value1: "",
                value2: "",
            }
        }
    },
    created() {
        // 发送请求拿到页面表格数值赋值给list
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleRowHandle(row, event, column) {
            console.log(row);
            // console.log(event);
            console.log(column);
        },
        // tab跳转获取参数
        makeActive(str, index) {
            this.Index = index;
            this.active = str;
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
        }
    },
    watch: {
    }
}
</script>
<style lang="scss" scoped>
@import '../../sass/examineAdvertising.scss';
div.isActive {
    color: $impColor !important;
    background-color: $white !important;
    border: 1px solid $sublineColor;
    border-top: 2px solid $impColor;
    border-bottom: none;
    line-height: 38px!important;
    box-sizing: border-box;
    position: relative;
    top: -1px;
}

.row3 {
    .all {
        border-left: none!important;
    }
}
</style>

