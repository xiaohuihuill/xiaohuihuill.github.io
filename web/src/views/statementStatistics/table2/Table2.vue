<template>
    <div class="app-container">
        <el-table :data="tableData" :key='key' border fit highlight-current-row style="width: 100%" @cell-click='selectApi'>
            <el-table-column :porp='fruit' :key='fruit' v-for='(fruit,index) in formThead' :label="fruit" :sortable="fruit=='展现量'">
                <template slot-scope="scope">
                    <div v-html="scope.row[fruit]"></div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div>
                        <a href="javascript:;" class="blue" @click="viewTheTrend(scope.row)">查看趋势</a>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="paging" v-if="ishide" style="text-align: center;margin-top:20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="pagesize" :page-sizes='[10,20]' layout="total, sizes, prev, pager, next, jumper" :total="100">
            </el-pagination>
        </div>
    </div>
</template>
<script>
const defaultFormThead = ['推广计划名称', '预览图', "展现量", "状态"] // 默认选中项
export default {
    data() {
        return {
            isShow: false,
            ishide: true,
            // 列表数据
            tableData: [
                {
                    "推广计划名称": '默认推广计划',
                    "预览图": "",
                    "展现量": ' <a href="javascript:;" class="blue">1212121</a>',
                    "状态": '推广',
                },
                {
                    "推广计划名称": '默认推广计划',
                    "预览图": "",
                    "展现量": ' <a href="javascript:;" class="blue">1212121</a>',
                    "状态": '推广',
                },
                {
                    "推广计划名称": '默认推广计划',
                    "预览图": "",
                    "展现量": '<a href="javascript:;" class="blue">1212121</a>',
                    "状态": '推广',
                }],
            key: 1, // table key
            formTheadOptions: ['推广计划名称', '预览图', "展现量", "状态"], // 可选择表头
            checkboxVal: defaultFormThead, // checkboxVal
            formThead: defaultFormThead // 默认表头
        }
    },
    watch: {
        checkboxVal(valArr) {
            this.$esellApi.checkPermissions();
            this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
            this.key = this.key + 1// 为了保证table 每次都会重渲 （牺牲性能保证效果，当然也可以不用）
        }
    },
    mounted() {
        this.$esellApi.checkPermissions();
        console.log(this.checkboxVal);
    },
    methods: {
        // 展现量路由跳转
        selectApi(row, column, cell, event) {
            if (column.label === "展现量") {
                console.log(row);
                this.$router.push({ path: "/statement_statistics/adv_impressions" })
            }
        },
        // 广告趋势
        viewTheTrend(id) {
            this.$router.push({ path: "/statement_statistics/adv_view_the_trend" })
        },
    }
}
</script>
<style scoped lang="scss">
.app-container {
    position: relative;
}

.file-operation-file {
    padding: 0 30px;
    div {
        font-size: 13px;
        color: #6baef3;
    }
    .edit {}
    .delete {
        margin-left: 5px;
    }
}

.file-operation-other {
    div {
        cursor: pointer;
        margin-left: 14px;
        font-size: 13px;
        color: #6baef3;
    }
    .shear {}
    .copy {}
    .edit {}
    .delete1 {}
}

.controllerColumn {
    position: absolute;
    top: -95px;
    right: 0;
    z-index: 2;
}

.file-operation-othe {
    a {
        margin-right: 6px;
    }
    a:last-child {
        margin-right: 0;
    }
}

.blue {
    margin-right: 10px;
}
</style>
