<template>
    <div class="app-container">
        <el-table :data="tableData" :key='key' border fit highlight-current-row style="width: 100%" id="tableExcel">
            <el-table-column :prop="fruit" :key='fruit' v-for='(fruit,index) in formThead' :label="fruit" :sortable="fruit=='展现量'||fruit=='广告数'">
                <template slot-scope="scope">
                    {{scope.row[fruit]}}
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
const defaultFormThead = ['推广计划名称', '广告数', "展现量", "状态"] // 默认选中项
export default {
    data() {
        return {
            isShow: false,
            ishide: true,
            // 列表数据
            tableData: [
                {
                    "type": 'A',
                    "推广计划名称": '默认推广计划',
                    "广告数": '31',
                    "展现量": '121',
                    "状态": '推广',
                },
                {
                    "type": 'A',
                    "推广计划名称": '默认推广计划',
                    "广告数": '32',
                    "展现量": '1212',
                    "状态": '推广',
                },
                {
                    "type": 'A',
                    "推广计划名称": '默认推广计划',
                    "广告数": '33',
                    "展现量": '121212',
                    "状态": '推广',
                }],
            key: 1, // table key
            formTheadOptions: ['推广计划名称', '广告数', "展现量", "状态"], // 可选择表头
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
        console.log(this.checkboxVal);
        this.$esellApi.checkPermissions();
    },
    methods: {
        viewTheTrend(id) {
            this.$router.push({ path: "/statement_statistics/promotion_plan_view_the_trend" })
        },
        toggle() {
            this.isShow = !this.isShow;
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
