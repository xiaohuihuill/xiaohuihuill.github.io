<template>
    <div class="to_audit">
        <div class="details_wrapper">   
            <SlotDelails :type="delailsType" :src="src" :text="text"></SlotDelails>
        </div>
        <Footer :list="footerList" @remove="failAdv" :type="footerType"  @edit="passAdv"></Footer>
    </div>
</template>

<script>
import SlotDelails from '@/components/slotDelails/slotDelails';
import Footer from '@/components/footer/advListFooter';
export default {
    data () {
        return {
            footerList:{
                'left':'审核不通过',
                'right':'审核通过',
            },   
            footerType:'3',//footer的类型
            delailsType:'1',//广告详情的类型
            src:'',//图片广告的SRC
            text:'',//文字广告的文字内容
            slotId:'',//广告ID
        };
    },
    created(){
        this.src=this.$route.query.src;
        this.delailsType=this.$route.query.type;
        this.text=this.$route.query.content;
        this.slotId=this.$route.query.num;
    },
    components: {
        SlotDelails,
        Footer,
    },
    methods: {
        // 审核不通过
        failAdv(){
            this.$esellApi.send("/api/ad/audit/fail.shtml", {
                 'id':this.slotId,
             }).then(res => {
                 this.$router.push({name:'audit'})
             }).catch(res => {
                 console.log(res);
             })
        },
        // 审核通过
        passAdv(){
            this.$esellApi.send("/api/ad/audit/pass.shtml", {
                'id':this.slotId,
            }).then(res => {
                this.$router.push({name:'audit'})
            }).catch(res => {
                console.log(res);
            })
        },
    },

}

</script>
<style lang='scss'>
.to_audit{
    width: 100%;
    max-height: 6.56rem;
    .details_wrapper{

    }
}
</style>