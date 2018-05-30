<template>
    <div class="app-container">
        <!--控制动态表格-->
        <el-popover ref="popover5" placement="left" width="80">
            <div class="filter-container" style="width:80px;">
                <h3>显示列</h3>
                <el-checkbox-group v-model="checkboxVal">
                    <div style="margin:10px 0;" v-for="(item,index) in formTheadOptions" :key="item">
                        <el-checkbox :label='item'>{{item.ch}}</el-checkbox>
                    </div>
                </el-checkbox-group>
            </div>
        </el-popover>
        <!--控制动态表格按钮-->
        <a href="javascript:;" class="yxf-but controllerColumn" v-popover:popover5>设置列表</a>
        <!--动态表格数据-->
        <div style="width:100%;overflow-y:auto;">
            <el-table :data="tableData" :key='key' border fit highlight-current-row style="width:100%;" @cell-click='preview' @select-all='selectAll' @select="changeFun">
                <el-table-column type="selection" width="48" align="center">
                </el-table-column>
                <el-table-column :key='fruit.ch' v-for='(fruit,index) in formThead' :label="fruit.ch">
                    <template slot-scope="scope">
                        <div v-if="fruit.ch=='预览图'" width="80">
                            <div v-if="scope.row[fruit.en]">
                                <img :src='scope.row[fruit.en]' style="width:60px;height:60px;">
                                <img :src='scope.row[fruit.ec]' style="display:none">
                            </div>
                            <div v-else-if="scope.row[fruit.type]=='WEB'">
                                <img src='http://file1.yixinfa.cn/dev/180417/006cebb2107f4eb5a3e88053c922ab7b.png' style="width:60px;height:60px;">
                            </div>
                            <div v-else>
                                <img src='http://file1.yixinfa.cn/dev/180328/2e7ebf22d83e4cce9788d9176e9b6865.jpg' style="width:60px;height:60px;">
                            </div>
                        </div>
                        <div v-else-if="fruit.ch=='状态'" width="80">
                            <div v-if="scope.row[fruit.en]=='1'">
                                <div>待审核</div>
                            </div>
                            <div v-if="scope.row[fruit.en]=='2'">
                                <div>审核不通过</div>
                            </div>
                            <div v-if="scope.row[fruit.en]=='3'">
                                <div>待播放</div>
                            </div>
                            <div v-if="scope.row[fruit.en]=='4'">
                                <div>投放中</div>
                            </div>
                            <div v-if="scope.row[fruit.en]=='5'">
                                <div>暂停中</div>
                            </div>
                            <div v-if="scope.row[fruit.en]=='6'">
                                <div>已过期</div>
                            </div>
                            <div v-if="scope.row[fruit.en]=='7'">
                                <div>已删除</div>
                            </div>
                        </div>
                        <div v-else-if="fruit.ch=='投放时间'">
                            {{scope.row[fruit.en]}} - {{scope.row[fruit.ec]}}
                        </div>
                        <div v-else-if="fruit.ch=='广告位规格'">
                            <div v-if="scope.row[fruit.width]&&scope.row[fruit.height]!=''">{{scope.row[fruit.width]}} * {{scope.row[fruit.height]}}</div>
                            <div v-else>——</div>
                        </div>
                        <div v-else-if="fruit.ch=='投放设备组'">
                            <span v-if="scope.row[fruit.en]&&scope.row[fruit.en].length>0">
                                <span v-for="(item,index) in scope.row[fruit.en]" :key="index">
                                    {{item}}&nbsp;
                                </span>
                            </span>
                            <span v-else>——</span>
                        </div>
                        <div v-else-if="fruit.ch=='投放设备'">
                            <span v-if="scope.row[fruit.en]&&scope.row[fruit.en].length>0">
                                <span v-if="scope.row[fruit.en].length == 1">
                                    {{scope.row[fruit.en][0]}}
                                </span>
                                
                                <span v-if="scope.row[fruit.en].length > 1">
                                    {{scope.row[fruit.en][0]}} <a href="javascript:alert('功能正在优化中，敬请期待！')">...</a>
                                </span>

                            <!--                                 
                                <span v-for="(item,index) in scope.row[fruit.en]" :key="index">
                                    {{item}}&nbsp;
                                </span> -->
                            </span>
                            <span v-else>——</span>
                        </div>
                        <div v-else>
                            <div v-html="scope.row[fruit.en]||'——'"></div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <div class="file-operation-other clearfix">
                            <a class="blue fl" @click="auditPass(scope.row)" v-if="scope.row.status=='1'||scope.row.status=='2'" data-butflag="1522748976824">审核通过</a>
                            <a class="blue start fl" @click="auditNoPass(scope.row)" v-if="scope.row.status=='1'||scope.row.status=='4'||scope.row.status=='3'||scope.row.status=='5'" data-butflag="1522749041857">审核不通过</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paging" v-if="ishide" style="text-align: center;margin-top:20px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="pagesize" :page-sizes='[10,20]' layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <!--点击弹出预览图-->
        <el-dialog title="预览" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
            <video v-if="type=='VDO'" :src="src" controls="controls" style="width:100%;height:200px;">
                您的浏览器不支持 video 标签。
            </video>
            <img v-else :src='src' alt="" style="width:100%;height:200px;">
        </el-dialog>
    </div>
</template>
<script>
const defaultFormThead = [
    { ch: "广告名称", en: "name" },
    { ch: "预览图", en: "cover-url", ec: 'url' ,type:'material-type'},
    { ch: "投放设备组", en: "group-names" },
    { ch: "投放设备", en: "device-names" },
    { ch: "广告位规格", width: "width", height: "height" },
    { ch: "审核时间", en: "audit-time" },
    { ch: "状态", en: "status" },
    { ch: "投放时间", en: "start-time", ec: "end-time" },
];
export default {
    props: ["tableData", "total"],
    data() {
        return {
            type: "",
            src: "",
            dialogVisible: false,
            pageIndex: 1, //第几页页码
            pagesize: 10, //页码
            multipleSelection: [],
            isShow: false,
            ishide: true,
            // 列表数据
            tableData: [],
            key: 1, // table key
            formTheadOptions: defaultFormThead,
            checkboxVal: defaultFormThead, // checkboxVal
            formThead: defaultFormThead, // 默认表头
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
    },
    methods: {
        changeFun(val) {
            this.multipleSelection = val;
            this.$emit("batchStartUsing", this.multipleSelection)
        },
        selectAll(val) {
            this.multipleSelection = val;
            this.$emit("batchStartUsing", this.multipleSelection)
        },
        preview(row, column, cell, event) {
            if (column.label === "预览图") {
                // 拿到点击的图片地址
                if (row['material-type'] == "WEB") {
                    window.open(row['material-content']);
                } else {
                    this.type = row['material-type'];
                    this.src = $(cell).find("img")[1].src;
                    this.dialogVisible = true;
                }
            }
        },
        // 审核通过
        auditPass(row) {
            this.$emit("auditPass", row)
        },
        // 审核不通过
        auditNoPass(row) {
            this.$emit("auditNoPass", row)
        },
        // 每页多少数据
        handleSizeChange(val) {
            this.pagesize = val
            this.$emit("handleSizeChange", val)
        },
        // 页码
        handleCurrentChange(val) {
            this.pageIndex = val
            this.$emit("handleCurrentChange", val)
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
