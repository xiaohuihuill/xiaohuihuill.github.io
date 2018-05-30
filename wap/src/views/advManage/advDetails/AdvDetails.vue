<template>
 <div class="adv_details">
    <div class="details_wrapper">   
        <SlotDelails :type="delailsType" :src="imgSrc" :text="text"></SlotDelails>
    </div>
    <Footer :list="footerList" @remove="removeAdv" :type="footerType" @add="enAdv" @edit="editAdv"></Footer>
    <Infor :position="position" :duration="duration" :type="type" :content="content" :modal="modal" :showPopup="showPopup"></Infor>
 </div>
</template>
<script>
import SlotDelails from '@/components/slotDelails/slotDelails';
import Footer from '@/components/footer/advListFooter';
import Infor from "@/components/message/Message";
import {messageMixin} from '@/common/base.js';
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
export default {
    mixins: [messageMixin],
    data () {
        return {
            footerList:{
                'type':{
                    'icon':'&#xe69f;',
                    'text':'启用广告',
                    'color':'#48bb0f;',
                },
                'left':'删除广告',
                'right':'编辑广告',
            },  
            footerType:'1',
            imgSrc:'',//图片广告的SRC
            slotId:'',
            type:'error',
            statusType:'',//广告状态
            text:'',//文字广告的文字内容
            delailsType:'1',//广告详情的类型
        }
    },

    components: {
        Footer,
        MessageBox,
        Infor,
        Toast,
        SlotDelails,
    },
    computed: {
    },
    methods: {
        // 删除推广计划
        removeAdv(){
            MessageBox.confirm('您确定要删除此广告?删除后不可恢复!','温馨提示').then(action => {
                this.$esellApi.send("/api/ad/delete/batch.shtml", {
                    'ids': [this.slotId],
                }).then(res => {
                    this.$router.push({name:'advertising'})
                }).catch(res => {
                    this.content=res.message
                    this.showPopup=!this.showPopup;
                }) 
            }).catch(action => {
            }) ;
        },
        // 启用广告或暂停广告
        enAdv(){
            MessageBox.confirm('您的此操作将更改当前广告状态','温馨提示').then(action => {
                let url;
                if(this.statusType==3||this.statusType==4){
                    url='/api/ad/device/batch/disable.shtml'
                }else if(this.statusType==5){
                    url='/api/ad/device/batch/enable.shtml'
                }
                this.$esellApi.send(url, {
                    'ids': [this.slotId],
                }).then(res => {
                    if(this.statusType==3||this.statusType==4){
                       this.footerList.type={
                            'icon':'&#xe645;',
                            'text':'启用广告',
                            'color':'#48bb0f;',
                       }
                       this.statusType=5
                    }else if(this.statusType==5){
                        this.footerList.type={
                            'icon':'&#xe645;',
                            'text':'暂停广告',
                            'color':'#ff5663;',
                       }
                       this.statusType=3
                    }
                }).catch(res => {
                    this.content=res.message
                    this.showPopup=!this.showPopup;
                }) 
            }).catch(action => {
            }) ;
        },
        // 编辑广告 
        editAdv(){
            if(this.$route.query.name){
                this.$router.push({name:'EditAdv',query:{'num':this.slotId,'name':this.$route.query.name}})
            }else{
                this.type="error"
                this.content="不属于任何设备或设备组，无法编辑"
                this.showPopup=!this.showPopup;
            }
        },
    },
    created(){
        this.imgSrc=this.$route.query.src;
        this.slotId=this.$route.query.num;
        this.statusType=this.$route.query.status;
        this.delailsType=this.$route.query.type;
        this.text=this.$route.query.content;
        if(this.statusType==3||this.statusType==4){
            this.footerType=1;
            this.footerList={
                'type':{
                    'icon':'&#xe645;',
                    'text':'暂停广告',
                    'color':'#ff5663;',
                },
                'left':'删除广告',
                'right':'编辑广告',
            }  
        }else if(this.statusType==5){
            this.footerType=1;
            this.footerList={
                'type':{
                    'icon':'&#xe645;',
                    'text':'启用广告',
                    'color':'#48bb0f;',
                },
                'left':'删除广告',
                'right':'编辑广告',
            }  
        }else if(this.statusType==1||this.statusType==2||this.statusType==6||this.statusType==7){
            this.footerType=2;
            this.footerList={
                'left':'删除广告',
                'right':'编辑广告',
            }  
        }
    }
}

</script>
<style lang='scss'>
.adv_details{
    max-height: 12rem;
    overflow: hidden;
}
</style>