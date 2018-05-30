<template>
    <div class="device-group-manager">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span>市场应用</span>
            </span>
        </div>
        <div class="bottom">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="设备续费" name="personal-info">
                    <div>
                        <div>
                            <router-link to="/market_application/renew">
                                <a href="javascript:;" class="yxf-but" style="margin-right:6px;">续费</a>
                            </router-link>
                            <a href="javascript:;" class="yxf-but">续费已过期设备</a>
                        </div>
                        <div style="margin-top:20px">
                            <el-table :data="tableData" style="width: 100%" border>
                                <el-table-column type="selection" width="48" align="center" @selection-change="changeFun">
                                </el-table-column>
                                <el-table-column prop="deviceNumber" label="设备号">
                                </el-table-column>
                                <el-table-column prop="deviceName" label="设备名称">
                                </el-table-column>
                                <el-table-column prop="deviceEndTime" label="设备到期时间">
                                </el-table-column>
                                <el-table-column prop="deviceState" label="设备状态">
                                </el-table-column>
                                <el-table-column label="操作" width="120">
                                    <template slot-scope="scope">
                                        <div class="file-operation-other clearfix">
                                            <a class="blue fl" @click="Renew(scope.row)">续费</a>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-tab-pane>
                <!--<el-tab-pane label="服务订购" name="change-password">服务订购</el-tab-pane>-->
                <!--<el-tab-pane label="我的订单" name="recharge">我的订单</el-tab-pane>-->
            </el-tabs>
        </div>
    </div>
</template>
<script>

export default {
    name: 'device-manager',
    data() {
        return {
            all: 40,
            ishide: true,
            active: "all",
            activeName: "personal-info",
            color: '',
            tableData: [{
                "deviceNumber": "10002133321",
                "deviceName": "设备1",
                "deviceEndTime": "2020-01-01 00:00:00",
                "deviceState": "未过期"
            }, {
                "deviceNumber": "10002133321",
                "deviceName": "设备12",
                "deviceEndTime": "2017-01-01 00:00:00",
                "deviceState": "已过期"
            }],
            // tableData:'',
        }
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        Renew(row) {
            this.$router.push({path:'/market_application/renew'})
        },
    },
    watch: {
    }
}
</script>
<style lang="scss" scoped>
@import '../../sass/advertisingManage.scss';
div.all .all,
div.onLine .onLine,
div.offLine .offLine {
    color: #fff;
    background-color: #ec414a;
}
</style>

