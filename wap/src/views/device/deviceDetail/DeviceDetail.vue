<template>
    <div class="device-detail">
        <div v-if="list.length>0">
            <div v-if="this.$route.query.type!='2'" class="issueAdvertising">设备发布广告</div>
            <div v-else class="issueAdvertising">设备组发布广告</div>
            <div class="device-detail-info">
                <div class="advitising-type">普通广告</div>
                <div class="advitising-picture">
                    发布广告
                </div>
                <div class="tem-name diandiandian">
                    {{AdverisingTemplate.name}}
                </div>
            </div>
            <div class="addAdv" style="margin-top:.2rem;">
                <div class="addAdv-name">发布广告</div>
                <cell :title="item.name" :specification="item.label"  @click="addAdv(item)" v-for="(item,index) in list" :key="index"></cell>
            </div>
        </div>
        <div v-else class="img_wrapper">
            <ImgContent emptyInfor="暂无广告位" gotoFrom="" addSomething=""></ImgContent>
        </div>
        <!--<div class="issue-instancy-advertising" @click="issueAdvertising('2')">发布紧急广告</div>-->
        <mt-tabbar fixed v-if="this.$route.query.type!='2'">
            <router-link :to="{path:'/dev_detail/playList',query:{id:this.$route.query.id,type:'1'}}" class="bofangliebiao">
                <mt-tab-item id="shebei">
                    <i class="iF">&#xe60c;</i>
                    <div>播放列表</div>
                </mt-tab-item>
            </router-link>
            <router-link :to="{path:'/dev_detail/dev_detail_info', query:{id:this.$route.query.id,type:'1'}}" class="shebeixiangqing">
                <mt-tab-item id="guanggao">
                    <i class="iF">&#xe62b;</i>
                    <div>设备详情</div>
                </mt-tab-item>
            </router-link>
            <router-link :to="{path:'/dev_detail/edit_dev_info', query:{id:this.$route.query.id,type:'1'}}" class="bianjixinxi">
                <mt-tab-item id="shenhe">
                    <i class="iF">&#xe607;</i>
                    <div>编辑信息</div>
                </mt-tab-item>
            </router-link>
            <router-link :to="{path:'/dev_detail/remote_control', query:{id:this.$route.query.id,type:'1'}}" class="yuanchengkongzhi">
                <mt-tab-item id="wode">
                    <i class="iF">&#xe61c;</i>
                    <div>远程控制</div>
                </mt-tab-item>
            </router-link>
        </mt-tabbar>
    </div>
</template>
<script>
import ImgContent from '@/components/imgContent/imgContent';
import SelectContent from '@/components/select/SelectContent';
import Cell from "@/components/cell/Cell"
import { Toast } from "mint-ui"
export default {
    name: "device-detail",
    components: {
        Cell,
        SelectContent,
        ImgContent
    },
    data() {
        return {
            title1: "abc",
            list: "",
            AdverisingTemplate: "",
            data: "",
        };
    },
    created() {
        if (this.$route.query.type != '2') {
            this.data = {
                "device-id": this.$route.query.id,
                "group-id": "",
                "template-id": "",
            }
        } else {
            this.data = {
                "group-id": this.$route.query.id,
                "device-id": "",
                "template-id": "",
            }
        }
        this.getAdverisingList();
        this.getAdverisingTemplate();
    },
    methods: {
        getAdverisingTemplate() {
            this.$esellApi.send('/api/template/detail.shtml', this.data).then(res => {
                this.AdverisingTemplate = res.payload
            }).catch(res => {
                Toast({ message: res.message, position: 'middle', duration: 2000 })
            })
        },
        getAdverisingList() {
            this.$esellApi.send('/api/slot/options.shtml', this.data).then(res => {
                this.list = res.payload;
            }).catch(res => {
                Toast({ message: res.message, position: 'middle', duration: 2000 })
            })
        },
        // issueAdvertising() {
        //     this.$router.push({ path: "/issue_adv" })
        // },
        addAdv(data) {
            this.$router.push({ path: "/addAdv", query: { type: this.$route.query.type, num: this.$route.query.id, slotNum: data.value, "name": this.$route.query.name, slotName: data.name } });
        },
        // 没有广告跳到发布广告
        addAdv1() {
            this.$router.push({ name: 'AddAdv' })
        },
    }
}

</script>
<style lang='scss' scoped>
@import './../../../sass/deviceDetail.scss'
</style>