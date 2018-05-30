<template>
    <div class="examine-device">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/devgroup_mag" class="blue">设备组管理</router-link>
                <span>></span>
                <span>查看设备</span>
            </span>
        </div>
        <div class="bottom">
            <div class="row1 clearfix">
                <div class="material-name clearfix fl">
                    <span class="material-name-left fl">设备名称</span>
                    <span class="material-name-right fl">
                        <el-input style="min-width:513px;" v-model="deviceName" placeholder="请填写设备名称"></el-input>
                    </span>
                </div>
                <div class="material-search fl">
                    <a href="javascript:;" class="yxf-but" @click="search">查询</a>
                </div>
            </div>
           <div class="row3 clearfix" v-on:click.prevent>
                <div :class="[{'isActive':index==show},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type" :key="index">
                    <span>{{item.name}}</span>
                </div>
            </div>
            <Table @batchStartUsing="batchStartUsing" @remove="remove" :action="action" :tableInfo="tableInfo" :tableData="tableData" :page="page" :pagesize="pagesize" :total="total" :formTheadOptions="formTheadOptions" :showcontrol="true" :checkboxVal="checkboxVal" :deviceInfoList="deviceInfoList"  @sizeChange="sizeChange" @pageChange="pageChange" ></Table>
        </div>
    </div>
</template>
<script>
import Table from "../../components/table/fluidTable";
export default {
    name: "examine-device",
    components: {
        Table
    },
    data() {
        return {
            groupId:'',//设备组ID
            action: [
                { name: "删除", callback: "remove" },
            ],
            tableInfo: [
                {
                label: "设备编号",
                status: true,
                prop: "uuid",
                },
                {
                label: "设备名称",
                status: true,
                prop: "name",
                init:'——'
                },
                {
                label: "设备模板",
                status: true,
                prop: "template-name",
                init:'——'
                },
                {
                label: "所属设备组",
                status: true,
                prop: "group-name",
                init:'——'
                },
                // {
                // label: "推送情况",
                // status: true,
                // prop: "push-status"
                // },
                {
                label: "状态",
                status: true,
                prop: "status",
                type: true,
                class: "green"
                },
                {
                label: "地址",
                status: true,
                prop: "address",
                init:'——'
                },
            ],
            tableData: [], //保存列表信息,
            formTheadOptions: ["设备编号", "设备名称", "设备模板", "所属设备组",'推送情况','在线状态','地址'], // 可选择表头
            checkboxVal: ["设备编号", "设备名称", "归属模板", "设备模板", "所属设备组",'推送情况','在线状态','地址'], deviceStatus:{'UNK':'未知','ONL':'在线','OFL':'离线','N':'已失效','INA':'未激活'},
            page: 1, //当前页
            pagesize: 10, //当前页的条数
            total: 99, //当前信息的总条数
            type: [
                {
                    type: "",
                    name: "全部设备",
                }, 
                {
                    type: "ONL",
                    name: "在线设备",
                }, 
                {
                    type: "OFL",
                    name: "离线设备",
                }
            ],
            show:'0',//保存当前显示的设备状态
            showType:'',//保存当前显示的设备状态值
            deviceName:'',//设备名称
        };
    },
    created() {
        this.groupId=this.$route.query.num;
        this.getInfor({'id':this.groupId,'page':this.page,'size':this.pagesize});
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        // 查询按钮
        search(){
            this.getInfor({
                'id':this.groupId,
                'page':this.page,
                'size':this.pagesize,
                'name':this.deviceName,
                'status':this.showType
            });
        },
        // 设备状态筛选
        makeActive(data,index){
            this.show=index;
            this.showType=data;
            this.getInfor({'id':this.groupId,'page':this.page,'size':this.pagesize,'status':this.showType});
        },
        // 每页大小改变
        sizeChange(val){
            this.pagesize=val;
            this.getInfor({'id':this.groupId,'page':this.page,'size':this.pagesize,'status':this.showType})
        },
        // 页码改变
        pageChange(val){
            this.page=val;
            this.getInfor({'id':this.groupId,'page':this.page,'size':this.pagesize,'status':this.showType})
        },
        // 移除设备组
        remove(data){
            this.$confirm('此操作将把设备从设备组移出, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$esellApi.send(
                        "/device/out/group.shtml",
                        {
                            'device-id': data.id
                        },
                        res => {
                            this.getInfor({'id':this.groupId,'page':this.page,'size':this.pagesize,'status':this.showType})
                            this.$message({
                                type: 'success',
                                message: '移出成功'
                            });
                            },
                        res => {
                            this.$message({
                                type: 'error',
                                message: res.message
                            });
                        }
                    );
                }).catch(() => {
            });
        },
        // 获取设备组下的设备列表
        getInfor(data) {
            this.$esellApi.send(
                "/group/sons.shtml",
               data,
                res => {
                   this.total = res.payload.total;
                    var data = res.payload.data||[];
                    for (var i = 0; i < data.length; i++) {
                        if (this.deviceStatus[data[i].status]) {
                            data[i].status = this.deviceStatus[data[i].status]
                        } else {
                            data[i].status = "未知";
                        }
                    }
                    this.tableData = data;
                },
                res => {
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                }
            );
        },
    },
};
</script>
<style lang="scss" scoped>
@import "../../sass/examineDevice.scss";
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

.row3 {
    .all-advertising {
        border-left-color: transparent!important;
    }
}

.material-hint {
    position: absolute;
    top: 10px;
    right: 0;
}

.row3 {
    background: $bgColor;
    box-sizing: border-box;
    border: 1px solid $sublineColor;
    border-bottom: none;
    .bg {
        text-align: center;
        width: 140px;
        height: 44px;
        cursor: pointer;
        line-height: 44px;
    }
    .pdf {
        border-right: 1px solid $sublineColor;
    }
}
</style>


