<template>
    <div class="bottom addAdv">
        <!--first step-->
        <div class="issue-common-advertising">
            <div class="issue-common-advertising-title clearfix">
                <span class="fl">发布广告</span>
            </div>
        </div>
        <div :style="'width:'+tempInfor.width/2+'px; height:'+tempInfor.height/2+'px;'">
            <div class="title_box cf">
                <div class="templateName">{{tempInfor.name}}</div>
                <div class="prve">
                   <a href="javascript:;" class="yxf-but" @click="toMainTemp">返回主模板</a>
                </div>
            </div>
            <div class="template-show advtemplate_wrapper">
                <div class="template-show-info template_box">
                    <div class="simple-template-landscape-image template_center">
                        <div data-v-9caab684="" id="template_wrapper" class="mid pr center_main" v-html="tempInfor.content" :style="'width:'+tempInfor.width/2+'px;height:'+tempInfor.height/2+'px;'">
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--<div class="issue-urgency-advertising">
            <div class="issue-urgency-advertising-title clearfix">
                <span class="fl">发布紧急广告</span>
            </div>
        </div>
        <div class="submit" style="margin-left:20px;">
            <a href="javascript:;" class="yxf-but">发布紧急广告</a>
        </div>-->
    </div>
</template>
<script>
export default {
    props: {
        tempInfor: '',//保存模板信息
        id: '',//设备或者设备组ID
        type: '',//区分设备还是设备组   1----设备   2----设备组
        name: '',//设备的名称       设备的UUID
    },
    data() {
        return {
            temp:'',
        };
    },
    created() {
        var that = this;
        this.$nextTick(function() {
            $('.addAdv').on('click', '.addAdv', function() {
                var num = $(this).parents('.slot_wrapper').attr('data-sign');
                if (that.type == 2) {
                    that.$router.push({ path: "/adv_mag/new_adv", query: { 'type': "" + that.type, 'id': "" + that.id, 'tempId': "" + that.tempInfor.id, 'soltNum': "" + num } })
                } else {
                    that.$router.push({ path: "/adv_mag/new_adv", query: { 'type': "" + that.type, 'id': "" + that.id, 'tempId': "" + that.tempInfor.id, 'soltNum': "" + num, 'name': "" + that.name } })
                }
            });
            $('.submit').on('click', function() {
                if (that.type == 2) {
                    that.$router.push({ path: "/adv_mag/new_adv", query: { 'type': "" + that.type, 'id': "" + that.id, 'ad_type': "" + 2 } })
                } else {
                    that.$router.push({ path: "/adv_mag/new_adv", query: { 'type': "" + that.type, 'id': "" + that.id, 'ad_type': "" + 2, 'name': "" + that.name } })
                }

            })
            $('.addAdv').on('click', '.inter_wrapper', function() {
                let interTempId=parseFloat($(this).attr('data-inter-temp'));
                let interType=parseFloat($(this).attr('data-inter-type'));
                that.$emit('clickInter',interTempId,interType)
            })
        })
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        toMainTemp(){
            this.$emit('toMainTemp')   
        },
    },
};
</script>
<style lang="scss">
@import "../../sass/issueAdvertising.scss";
@import "../../sass/showDdvTemplate.scss";
</style>


