<template>
    <div class="play-list">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/devgroup_mag" class="blue">设备组管理</router-link>
                <span>></span>
                <router-link to="/devgroup_mag/examine_play_list" class="blue">播放列表</router-link>
                <span>></span>
                <span>设置定时播放</span>
            </span>
        </div>
        <div class="bottom">
            <div>设置 广告1 从2018-01-01 14:34:40 到 2018-01-01 14:34:41 的定时播放时间</div>
            <div style="margin-top:20px;">
                <a href="javascript:;" class="yxf-but" @click="newSetTimingPlay">新增定时播放时间</a>
            </div>
            <div style="margin:20px 0;">
                <el-table :data="list" border fit highlight-current-row>
                    <el-table-column width="80px" align="center" label="编号">
                        <template slot-scope="scope">
                            <span>{{scope.row.number}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column min-width="100px" label="日期">
                        <template slot-scope="scope">
                            <span>{{scope.row.date}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="120px" align="center" label="开始时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.startTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="120px" label="结束时间">
                        <template slot-scope="scope">
                            <span>{{scope.row.endTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column width="120px" label="播放次数">
                        <template slot-scope="scope">
                            <span>{{scope.row.playCount}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="left" label="操作" min-width="300">
                        <template slot-scope="scope">
                            <div class="operation">
                                <a class="blue fl" @click="edit(scope.row)">编辑</a>
                                <a class="blue fl" style="margin-left:10px;" @click="delete1(scope.row)">删除</a>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--操作-->
            <div class="play-list-operation">
                <a href="javascript:;" class="yxf-but" @click="cdup">返回</a>
                <a href="javascript:;" class="yxf-but" @click="cdup" style="margin-left:10px;">保存</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'play-list',
    data() {
        return {
            all: 40,
            value1: 0,
            value2: 0,
            ishide: true,
        }
    },
    created() {
        this.list = [{
            number: "1",
            date: "每周一每周二",
            startTime: "8:00:00",
            endTime: "9:00:00",
            playCount: "60",
        }, {
            number: "2",
            date: "每周三每周四",
            startTime: "8:00:00",
            endTime: "9:00:00",
            playCount: "50",
        }];
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        aa() {
            alert("ada");
        },
        newSetTimingPlay() {
            this.$router.push({ path: "/devgroup_mag/play_list/set_timing_play/new_set_timing_play" });
        },
        cdup() {
            this.$router.go(-1);
        },
        edit(row) {
            this.$router.push({ path: "/devgroup_mag/play_list/set_timing_play/edit_set_timing_play" });

        },
        delete1(row) {

        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
    },
    watch: {
        area: function(newVal, oldVal) {
            console.log(newVal);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../sass/playList.scss';
</style>

