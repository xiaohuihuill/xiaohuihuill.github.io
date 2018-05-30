<template>
    <div class="app-container">
        <!--<div>{{poparizationPlanManageAdvertisingState}}</div>-->
        <!--控制动态表格-->
        <el-popover ref="popover5" placement="left" width="80">
            <div class="filter-container" style="width:80px;">
                <h3>显示列</h3>
                <el-checkbox-group v-model="checkboxVal">
                    <div style="margin:10px 0;" v-for="(item,index) in formTheadOptions" :key="item">
                        <el-checkbox :label='item'>{{item}}</el-checkbox>
                    </div>
                </el-checkbox-group>
            </div>
        </el-popover>
        <!--控制动态表格按钮-->
        <a href="javascript:;" class="yxf-but controllerColumn" v-popover:popover5>设置列表</a>
        <!--动态表格数据-->
        <el-table :data="tableData" :key='key' border fit highlight-current-row style="width: 100%" @cell-click='preview' @select-all='selectAll' @select="changeFun">
            <el-table-column type="selection" width="48" align="center">
            </el-table-column>
            <el-table-column :porp='fruit' :key='fruit' v-for='(fruit,index) in formThead' :label="fruit" :align="fruit=='预览图'?'center':''">
                <template slot-scope="scope">
                    <div v-html='scope.row[fruit]||"——"' :class="[scope.row[fruit]=='审核通过'?'yes':'',scope.row[fruit]=='审核不通过'?'no':'']"></div>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div class="file-operation-other clearfix">
                        <a class="blue fl" @click="lowerIncidence(scope.row)">下发情况</a>
                        <a class="blue start fl" @click="copy(scope.row)">启用</a>
                        <a class="blue pause fl" @click="edit(scope.row)">暂停</a>
                        <a class="blue edit fl" @click="edit(scope.row)">编辑</a>
                        <a class="blue delete fl" @click="delete1(scope.row)">删除</a>
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
const defaultFormThead = ['广告名称', '预览图', '展现量', '投放设备组', '投放设备', '广告位规格', '投放时间段', '状态'] // 默认选中项
export default {
    props: ['poparizationPlanManageAdvertisingState'],
    data() {
        return {
            multipleSelection: '',
            isShow: false,
            ishide: true,
            isActive: true,
            // 列表数据
            tableData: [
                {
                    "type": 'A',
                    "广告名称": '广告1',
                    "预览图": '<img style="width:60px;height:60px" src="http://yixinfa-prod.oss-cn-shenzhen.aliyuncs.com/user/1/201712/fnkPywTcDEF8pJkM4nera5Rb6jtZmKry.jpg">',
                    "展现量": '',
                    "投放设备组": "默认的",
                    "投放设备": "测试机",
                    "广告位规格": "1920*1080",
                    "投放时间段": "2017-2019",
                    "状态": "审核通过",
                },
                {
                    "type": 'A',
                    "广告名称": '广告2',
                    "预览图": '<img style="width:60px;height:60px" src="http://yixinfa-prod.oss-cn-shenzhen.aliyuncs.com/user/1/201712/fnkPywTcDEF8pJkM4nera5Rb6jtZmKry.jpg">',
                    "展现量": '',
                    "投放设备组": "默认的",
                    "投放设备": "测试机",
                    "广告位规格": "1920*1080",
                    "投放时间段": "2017-2019",
                    "状态": "审核不通过",
                },
                {
                    "type": 'B',
                    "广告名称": '广告3',
                    "预览图": '<img style="width:60px;height:60px" src="http://yixinfa-prod.oss-cn-shenzhen.aliyuncs.com/user/1/201712/fnkPywTcDEF8pJkM4nera5Rb6jtZmKry.jpg">',
                    "展现量": '',
                    "投放设备组": "默认的",
                    "投放设备": "测试机",
                    "广告位规格": "1920*1080",
                    "投放时间段": "2017-2019",
                    "状态": "审核不通过",
                },
                {
                    "type": 'B',
                    "广告名称": '广告4',
                    "预览图": '<img style="width:60px;height:60px" src="http://yixinfa-prod.oss-cn-shenzhen.aliyuncs.com/user/1/201712/fnkPywTcDEF8pJkM4nera5Rb6jtZmKry.jpg">',
                    "展现量": '',
                    "投放设备组": "默认的",
                    "投放设备": "测试机",
                    "广告位规格": "1920*1080",
                    "投放时间段": "2017-2019",
                    "状态": "审核不通过",
                },
                {
                    "type": 'B',
                    "广告名称": '广告5',
                    "预览图": '<img style="width:60px;height:60px" src="http://yixinfa-prod.oss-cn-shenzhen.aliyuncs.com/user/1/201712/fnkPywTcDEF8pJkM4nera5Rb6jtZmKry.jpg">',
                    "展现量": '',
                    "投放设备组": "默认的",
                    "投放设备": "测试机",
                    "广告位规格": "1920*1080",
                    "投放时间段": "2017-2019",
                    "状态": "审核不通过",
                },
            ],
            key: 1, // table key
            formTheadOptions: ['广告名称', '预览图', '展现量', '投放设备组', '投放设备', '广告位规格', '投放时间段', '状态'], // 可选择表头
            checkboxVal: defaultFormThead, // checkboxVal
            formThead: defaultFormThead // 默认表头
        }
    },
    watch: {
        checkboxVal(valArr) {
            this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
            this.key = this.key + 1// 为了保证table 每次都会重渲 （牺牲性能保证效果，当然也可以不用）
        }
    },
    mounted() {
        console.log(this.poparizationPlanManageAdvertisingState);
        console.log(this.checkboxVal);
        this.$esellApi.checkPermissions();
    },
    methods: {
        changeFun(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection)
            this.$emit("batchStartUsing", this.multipleSelection)
        },
        selectAll(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection)
            this.$emit("batchStartUsing", this.multipleSelection)
        },
        preview(row, column, cell, event) {
            if (column.label === "预览图") {
                // 拿到点击的图片地址
                var src = $(cell).find("img")[0].src;
                console.log(src);
            }
        },
        toggle() {
            this.isShow = !this.isShow;
        },
        //下发情况
        lowerIncidence() {
            this.$router.push({ path: '/adv_mag/pop_plan_mag/lower_incidence' })
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
            this.$router.push({ path: '/adv_mag/new_adv' })
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
    top: -85px;
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
