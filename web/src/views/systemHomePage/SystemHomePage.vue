<!--系统首页-->
<template>
    <div class="yxf-home-page">
        <div class="top clearfix">
            <span class="fl">{{$t("SystemHomePage.YourPosition")}}&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <span>{{$t("SystemHomePage.SystemHomePage")}}</span>
            </span>
        </div>
        <!--line 1-->
        <!--<div class="yxf-home-page-noEquipment" v-if="isActive">
                                                                                                                                                        </div>-->
        <div class="yxf-home-page-equipment" v-if="isActive">
            <p>{{$t("SystemHomePage.deviceNumberLeft")}}
                <span class="yxf-color">{{Array2[0]}}</span>&nbsp;{{$t("SystemHomePage.deviceNumberRight")}}{{$t("SystemHomePage.now")}}&nbsp;
                <router-link to="/dev_mag" data-butflag="1522750564242" data-butmessage="无此权限" class="blue">{{$t("SystemHomePage.goToExamine")}}</router-link>{{$t("SystemHomePage.goTo")}}&nbsp;
                <router-link to="/adv_mag/new_adv" data-butflag="1522812102804" data-butmessage="无此权限" class="blue">{{$t("SystemHomePage.publishAdvertisement")}}</router-link>&nbsp;。
                <!--{{$t("SystemHomePage.yorCan")}}&nbsp;-->
                <!--<router-link to="/statement_statistics" class="blue">{{$t("SystemHomePage.reportFormStatistics")}}</router-link>{{$t("SystemHomePage.ExamineAdvertising")}}-->
            </p>
        </div>
        <!--line 2-->
        <div class="yxf-home-page-two">
            <div class="yxf-operation before">
                <div class="operation">{{$t("SystemHomePage.operation")}}</div>
            </div>
            <div class="yxf-operation-info">
                <div class="yxf-operation-download-info clearfix">
                    <!--软件下载-->
                    <div class="download clearfix fl">
                        <div class="download-left fl">1</div>
                        <div class="download-right fl">
                            <div class="download-right-info">
                                <span>{{$t("SystemHomePage.download")}}</span>
                            </div>
                            <div class="download-right-version clearfix">
                                <div class="fl">
                                    <!--<span class="blue">Android版&nbsp;2.9.7.0</span>-->
                                </div>
                                <div class="fl">
                                    <!--<span class="blue">Windows版&nbsp;2.3.0.1</span>-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--添加设备-->
                    <div class="add-equipment clearfix fl">
                        <div class="add-equipment-left fl">2</div>
                        <div class="add-equipment-right fl">
                            <div class="add-equipment-right-info">
                                <!--<span>添加设备</span>-->
                                <router-link to="/dev_mag/manual_add_dev" data-butflag="1522751852517" data-butmessage="无此权限" class="blue">{{$t("SystemHomePage.addDevice")}}</router-link>
                            </div>
                            <div class="add-equipment-right-content">
                                <div>
                                    <span>{{$t("SystemHomePage.addDeviceInfo")}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--发布广告-->
                    <div class="issue-advertising clearfix fl">
                        <div class="issue-advertising-left fl">3</div>
                        <div class="issue-advertising-right fl">
                            <div class="issue-advertising-right-info">
                                <router-link to="/adv_mag/new_adv" data-butflag="1522812102804" data-butmessage="无此权限" class="blue">{{$t("SystemHomePage.fabuguanggao")}}</router-link>
                            </div>
                            <div class="issue-advertising-right-content">
                                <div>
                                    <span>{{$t("SystemHomePage.fabuguanggaoInfo")}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--广告审核-->
                    <div class="advertising-aduit clearfix fl">
                        <div class="advertising-aduit-left fl">4</div>
                        <div class="advertising-aduit-right fl">
                            <div class="advertising-aduit-right-info">
                                <router-link to="/adv_audit" data-butflag="1522748946198" data-butmessage="无此权限" class="blue">{{$t("SystemHomePage.advertisingAudit")}}</router-link>
                            </div>
                            <div class="advertising-aduit-right-content">
                                <div>
                                    <span>{{$t("SystemHomePage.advertisingAuditInfo")}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--终端播放-->
                    <div class="play clearfix fl">
                        <div class="play-left fl">5</div>
                        <div class="play-right fl">
                            <div class="play-right-info">
                                <span>{{$t("SystemHomePage.play")}}</span>
                            </div>
                            <div class="play-right-content">
                                <div>
                                    <span>{{$t("SystemHomePage.playInfo")}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--line 3-->
        <div class="yxf-home-page-three">
            <div class="yxf-home-page-ad-statistics">
                <div class="yxf-home-page-statistics">
                    <div class="statistics before" style="height:19px;">{{$t("SystemHomePage.AdvertisingStatistics")}}</div>
                    <div class="yxf-home-page-quantity clearfix">
                        <div class="statistics-number fl">
                            <div>
                                <router-link data-butflag="1522748629616" data-butmessage="无此权限" :to="{ path:'/adv_mag/pop_plan_mag',query: {number: '0',status:''}}">
                                    <span class="blue">{{Array1[0]}}</span>
                                </router-link>
                                <p>{{$t("SystemHomePage.statisticsNumber")}}</p>
                            </div>
                        </div>
                        <div class="statistics-centre fl">
                            <div>
                                <router-link data-butflag="1522748629616" data-butmessage="无此权限" :to="{ path: '/adv_mag/pop_plan_mag', query: {  number: '1',status:'4'}}">
                                    <span class="blue">{{Array1[1]}}</span>
                                </router-link>
                                <p>{{$t("SystemHomePage.statisticsCentre")}}</p>
                            </div>
                        </div>
                        <div class="statistics-wait-play fl">
                            <div>
                                <router-link data-butflag="1522748629616" data-butmessage="无此权限" :to="{ path: '/adv_mag/pop_plan_mag', query: {  number: '2',status:'3'} }">
                                    <span class="blue">{{Array1[2]}}</span>
                                </router-link>
                                <p>{{$t("SystemHomePage.statisticsWaitPlay")}}</p>
                            </div>
                        </div>
                        <div class="statistics-wait-audit fl">
                            <div>
                                <router-link data-butflag="1522748629616" data-butmessage="无此权限" :to="{ path: '/adv_mag/pop_plan_mag', query: {  number: '3',status:'1'} }">
                                    <span class="blue">{{Array1[3]}}</span>
                                </router-link>
                                <p>{{$t("SystemHomePage.statisticsWaitAudit")}}</p>
                            </div>
                        </div>
                        <div class="statistics-audit-no-pass fl">
                            <div>
                                <router-link data-butflag="1522748629616" data-butmessage="无此权限" :to="{ path: '/adv_mag/pop_plan_mag', query: {  number: '4',status:'2'} }">
                                    <span class="blue">{{Array1[4]}}</span>
                                </router-link>
                                <p>{{$t("SystemHomePage.statisticsAuditNoPass")}}</p>
                            </div>
                        </div>
                        <div class="statistics-out-of-date fl">
                            <div>
                                <router-link data-butflag="1522748629616" data-butmessage="无此权限" :to="{ path: '/adv_mag/pop_plan_mag', query: {  number: '6',status:'6'} }">
                                    <span class="blue">{{Array1[5]}}</span>
                                </router-link>
                                <p>{{$t("SystemHomePage.statisticsOutOfDate")}}</p>
                            </div>
                        </div>
                        <!--<div class="statistics-more fl">
                            <div>
                                <i class="iF iF-more"></i>
                                <p>{{$t("SystemHomePage.statisticsMore")}}</p>
                            </div>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
        <!--line 4-->
        <div class="yxf-home-page-four">
            <div class="yxf-home-page-device-statistics">
                <div class="yxf-home-page-statistics">
                    <div class="statistics before">{{$t("SystemHomePage.EquipmentStatistics")}}</div>
                    <div class="yxf-home-page-device clearfix">
                        <div class="statistics-all-device fl">
                            <div>
                                <router-link data-butflag="1522750564242" data-butmessage="无此权限" :to="{ path: '/dev_mag', query: {number: '0'}}">
                                    <span class="blue">{{Array2[0]}}</span>
                                </router-link>
                                <p>{{$t("SystemHomePage.AllEquipment")}}</p>
                            </div>
                        </div>
                        <div class="statistics-on-line-device fl">
                            <div>
                                <router-link data-butflag="1522750564242" data-butmessage="无此权限" :to="{ path: '/dev_mag', query: {number: '1' }}">
                                    <span class="blue">{{Array2[1]}}</span>
                                </router-link>
                                <p>{{$t("SystemHomePage.OnlineEquipment")}}</p>
                            </div>
                        </div>
                        <div class="statistics-off-line-device fl">
                            <div>
                                <router-link data-butflag="1522750564242" data-butmessage="无此权限" :to="{path: '/dev_mag', query: {number: '2' }}">
                                    <span class="blue">{{Array2[2]}}</span>
                                </router-link>
                                <p>{{$t("SystemHomePage.offLineEquipment")}}</p>
                            </div>
                        </div>
                        <div class="statistics-off-line-device fl">
                            <div>
                                <router-link data-butflag="1522750564242" data-butmessage="无此权限" :to="{ path: '/dev_mag', query: { number: '3' } }">
                                    <span class="blue">{{Array2[3]}}</span>
                                </router-link>
                                <p>未激活</p>
                            </div>
                        </div>
                        <!--<div class="statistics-past-due-device fl">
                                            <div>
                                                <span>{{Array2[0]}}</span>
                                                <p>{{$t("SystemHomePage.ExpiredEquipment")}}</p>
                                            </div>
                                        </div>
                                        <div class="statistics-upcoming-device fl">
                                            <div>
                                                <span>{{Array2[0]}}</span>
                                                <p>{{$t("SystemHomePage.ForthcomingExpiredEquipment")}}</p>
                                            </div>
                                        </div>-->
                        <!--<div class="statistics-more fl">
                            <div>
                                <i class="iF iF-more"></i>
                                <p>{{$t("SystemHomePage.EquipmentStatisticsMore")}}</p>
                            </div>
                        </div>-->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'home-page',
    data() {
        return {
            toufangzhong: "aa",
            isActive: true,
            Array1: [],//广告统计
            Array2: []//设备统计
        }
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    created() {
        console.log("系统首页", this.$route.path)
        this.getHomePageListData();
    },
    methods: {
        getHomePageListData() {
            this.$esellApi.send("/account/home.shtml", {}, res => {
                console.log(res)
                this.Array1 = res.payload.ad;
                this.Array2 = res.payload.device;
            }, res => {
                this.message("error", res.message)
            })
        },
        statisticsNumber() {
            this.$router.push({ path: "/user_mag/add_new_user", query: { name: 'statisticsNumber' } });
        },
        open2() {
            this.$message({
                message: '恭喜你，这是一条成功消息',
                type: 'success'
            });
        },
    }
}
</script>
<style lang="scss" scoped>
@import '../../sass/systemHomePage.scss';
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 220px;
    min-height: 400px;
}

.el-breadcrumb__item__inner,
.el-breadcrumb__item__inner a {
    color: #ccc;
}

#draggable {
    width: 100px;
    height: 100px;
    padding: 0.5em;
    float: left;
    margin: 10px 10px 10px 0;
}

#droppable {
    width: 150px;
    height: 150px;
    padding: 0.5em;
    float: left;
    margin: 10px;
}
</style>

  

