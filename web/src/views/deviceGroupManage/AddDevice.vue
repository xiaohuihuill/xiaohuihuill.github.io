<template>
    <div class="device-manage">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/devgroup_mag" class="blue">设备组管理</router-link>
                <span>></span>
                <span>添加设备</span>
            </span>
        </div>
        <div class="bottom">
            <div class="device-manage-condition">
                <div class="condition">
                    <div class="condition-info clearfix">
                        <div class="condition-content clearfix fl">
                            <div class="popularization-plan clearfix fl">
                                <div class="popularization-plan-info fl" style="width: 77px;">设备名称</div>
                                <div class="popularization-plan-input fl" style="width:71%">
                                    <el-input v-model="deviceName" placeholder="请填写设备名称" style="min-width:513px;"></el-input>
                                </div>
                            </div>
                        </div>
                        <div class="condition-search fl">
                            <a href="javascript:;" class="yxf-but"  @click="search">查询</a>
                        </div>
                    </div>
                    <div class="row3 clearfix" v-on:click.prevent>
                        <div :class="[{'isActive':index==show},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in type" :key="index">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                    <Table @batchStartUsing="batchStartUsing" @addDeviceGroup="addDeviceGroup" :action="action" :tableInfo="tableInfo" :tableData="tableData" :page="page" :pagesize="pagesize" :total="total" :formTheadOptions="formTheadOptions" :checkboxVal="checkboxVal" :deviceInfoList="deviceInfoList"  :showcontrol="true"  @sizeChange="sizeChange" @pageChange="pageChange" ></Table>
                    <div style="margin-top:20px;">
                        <a href="javascript:;" class="yxf-but" data-butflag="1522750646060" @click="addGroup">保存设备组</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Table from "../../components/table/fluidTable";
export default {
    name: "device-manage",
    components: {
        Table
    },
    data() {
        return {
            action: [
                { name: "加入设备组", dataButFlag: "1522750646060", callback: "addDeviceGroup" },
            ],
            deviceNaem:'',
            tableInfo: [
                {
                label: "设备编号",
                status: true,
                prop: "uuid",
                },
                {
                label: "设备名称",
                status: true,
                prop: "name"
                },
                {
                label: "模板名称",
                status: true,
                prop: "template-name",
                init:'——'
                },
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
            formTheadOptions: ["设备编号", "设备名称", "模板名称",'状态','地址'], // 可选择表头
            checkboxVal: ["设备编号", "设备名称", "归属模板", "模板名称", '状态','地址'],
            deviceStatus:{'UNK':'未知','ONL':'在线','OFL':'离线','N':'已失效','INA':'未激活'},
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
            gtroupId:'',//设备组ID
            checkedList:[],//保存已选中的设备
        };
    },
    created() {
        this.gtroupId=this.$route.query.num;
        this.getInfor({'page':this.page,'size':this.pagesize,'not-bind':2});
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        // 查询
        search(){
                this.getInfor({'name':this.deviceName,'page':this.page,'size':this.pagesize,'not-bind':2});
        },
        // 切换设备状态
        makeActive(str, index) {
            this.show = index;
            this.showType= str;
            this.getInfor({'name':this.deviceName,'status':this.showType,'page':this.page,'size':this.pagesize,'not-bind':2});
        },
        batchStartUsing(data){
            this.checkedList=[];
            for(let i=0; i<data.length;i++){
                this.checkedList[i]=(data[i].id)
            }
        },
        // 批量保存
        addGroup(){
            if(this.checkedList.length>0){
                this.$esellApi.send(
                    "/device/in/group/batch.shtml",
                    {'device-ids':this.checkedList,'group-id':this.gtroupId},
                    res => {
                    this.$message({
                            type: 'success',
                            message: '加入成功'
                        });
                        this.getInfor({'name':this.deviceName,'status':this.showType,'page':this.page,'size':this.pagesize,'not-bind':2});
                    },
                    res => {
                    this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                );
            }else{
                this.$message({
                    type: 'error',
                    message: '请先选择需要加入的设备'
                });   
            }
        },
        addDeviceGroup(data){
            this.$esellApi.send(
                // "/device/in/group.shtml",
                //共用一个接口，便于权限控制
                "/device/in/group/batch.shtml",
                {'device-ids':[data.id],'group-id':this.gtroupId},
                res => {
                   this.$message({
                        type: 'success',
                        message: '加入成功'
                    });
                    this.getInfor({'name':this.deviceName,'status':this.showType,'page':this.page,'size':this.pagesize,'not-bind':2});
                },
                res => {
                    this.$message({
                        type: 'error',
                        message: res.message
                    });
                }
            );
        },
         // 每页大小改变
        sizeChange(val){
            this.pagesize=val;
           this.getInfor({'name':this.deviceName,'status':this.showType,'page':this.page,'size':this.pagesize,'not-bind':2});
        },
        // 页码改变
        pageChange(val){
            this.page=val;
             this.getInfor({'name':this.deviceName,'status':this.showType,'page':this.page,'size':this.pagesize,'not-bind':2});
        },
        getInfor(data) {
            this.$esellApi.send(
                "/device/list.shtml",
                data,
                res => {
                    this.total = res.payload.total;
                    var data = res.payload.data;
                    for (var i = 0; i < data.length; i++) {
                        if (this.deviceStatus[data[i].status]) {
                            data[i].status = this.deviceStatus[data[i].status]
                        } else {
                            data[i].status = "未知";
                        }
                    }
                    this.tableData = data;
                    this.$esellApi.checkPermissions(200);
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
.device-manage {
    width: 100%;
    height: 100%;
    .top {
        line-height: 56px;
        margin-left: 20px;
        span {
            font-size: 12px;
        }
    }
    .bottom {
        background-color: #fff;
        padding: 20px;
        .condition {
            .condition-info {
                height: 30px;
                padding: 20px;
                background: #f5f5f5;
            }
            .condition-content {
                .popularization-plan {
                    line-height: 30px;
                    .popularization-plan-info {}
                    .popularization-plan-input {}
                }
            }
            .condition-search {
                margin-left: 77px;
                a {
                    margin-right: 6px;
                }
            }
        }
    }
}
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


