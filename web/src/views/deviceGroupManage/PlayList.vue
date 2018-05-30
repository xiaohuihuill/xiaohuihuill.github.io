<template>
    <div class="play-list">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/devgroup_mag" class="blue">设备组管理</router-link>
                <span>></span>
                <span>播放列表</span>
            </span>
        </div>
        <div class="bottom">
            <div class="play-list-name clearfix">
                <span class="play-list-name-title fl">设备组&nbsp;:&nbsp;</span>
                <span class="play-list-name-input fl">
                    {{mes}}
                </span>
            </div>
            <div class="" style="margin-top:18px;">
                <span>屏幕1</span>
            </div>
            <div class="adveritising">
                <div class="template-show">
                    <div class="template-show-info">
                        <div class="template-show-shade"></div>
                        <div class="template">
                            <div class="template-resolution">
                                <span>1920*1080</span>
                            </div>
                            <div style="margin-top:10px;">
                                <div class="template-set-jurisdiction">
                                    <router-link to="/devgroup_mag/play_list/examine_play_list">
                                        <a href="javascript:;">
                                            <div>
                                                <i class="iF">&#xe6ad</i>
                                            </div>
                                            <span>查看播放列表</span>
                                        </a>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--操作-->
            <div class="play-list-operation">
                <a href="javascript:;" class="yxf-but" @click="cdup">返回列表</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'play-list',
    data() {
        return {
            mes: "默认设备组",
            all: 40,
            value1: 0,
            value2: 0,
            radio: "1",
            radio1: "1",
            ishide: true,
            active: "all",
            area: '',
            activeName: 'first',
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            value: '',
            tableData: [{
                date: '1',
                name: '2018-01-01',
                address: '8:00'
            }, {
                date: '2',
                name: '2018-01-01',
                address: '8:00'
            }, {
                date: '3',
                name: '2018-01-01',
                address: '8:00'
            }, {
                date: '4',
                name: '2018-01-01',
                address: '8:00'
            }]
        }
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        cdup() {
            this.$router.go(-1);
        },
        edit(row) {
        },
        delete1(row) {

        },
        mute() {
            this.value1 = 0;
        },
        handleClick(tab, event) {
        },
        examinePlayList() {
            this.$router.push({ path: "/devgroup_mag/play_list/examine_play_list" })
        }
    },
    watch: {
        area: function(newVal, oldVal) {
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../sass/playList.scss';
div.all .all,
div.onLine .onLine,
div.offLine .offLine {
    color: #fff;
    background-color: #ec414a;
}
</style>

