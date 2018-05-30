<template>
    <div class="timing-inter-cut-table" style="margin-top:20px;">
        <div class="advertising-position-3 advertising-type">
            <el-row>
                <el-col :span="2" style="width:48px; margin-top:6px;">
                    <div class="grid-content bg-purple">插播时间</div>
                </el-col>
                <el-col :span="13" style="margin-left:20px;">
                    <div class="grid-content bg-purple-light">
                        <span>
                            <el-button @click="timerInsertPay_dialog = true">新增插播时间</el-button>
                        </span>
                        <div style="margin-top:20px;">
                            <el-table :data="insertDate" border style="width: 500px">
                                <el-table-column type="index" label="编号" width="50">
                                </el-table-column>
                                <el-table-column label="循环周期" width="90">
                                    <template slot-scope="scope">
                                        <span v-if="scope.row['action-type']=='everyday'">
                                            每天
                                        </span>
                                        <span v-if="scope.row['action-type']=='someday'">
                                            某天
                                        </span>
                                        <span v-if="scope.row['action-type']=='week'">
                                            <span v-for="(item,index) in scope.row['time-quantum']" :key="index">
                                                {{item.name}}&nbsp;
                                            </span>
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="start-time" label="开始时间" width="80">
                                </el-table-column>
                                <el-table-column prop="stop-time" label="结束时间" width="80">
                                </el-table-column>
                                <el-table-column prop="play_times" label="播放次数" width="80">
                                    <template slot-scope="scope">
                                        <span v-html="scope.row['play_times']== 0 ? '——' :scope.row['play_times'] "></span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template scope="scope">
                                        <a href="javascript:void(0);" @click="removeInsertDate(scope.row)">删除</a>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: '',
    props: {
        insertDate: {
            type: Array,
            default: function() {
                return []
            },
        }
    },
    data() {
        return {
            everyday: {
                'start-time': "",
                'stop-time': "",
            },
            week: {
                'start-time': "",
                'stop-time': "",
            },
            someday: {
                'start-time': "",
                'stop-time': "",
            },
            everydayNumber: 0,//每天的循环播放次数
            everydayRadio: "1",//每天的循环播放的类型，1表示时间类型，2表示播放次数（用字符串）
            somedayRadio: "1",
            weekRadio: "1",
            weekArr: [],
        };
    },
    methods: {
        removeInsertDate(row){
            this.$emit("removeInsertDate",row);
        }
    }
}

</script>
<style lang='scss' scoped>
.timing-inter-cut-table {
    height: 100%;
    width: 100%;
}
</style>