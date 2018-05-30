<template>
 <div class="add_adv_plan">
      <div class="plan_box">
        <div class="plan_title">
            <span>*</span> 推广计划名称
        </div>
        <div class="plan_name">
            <input type="text" v-model="planName" placeholder="请输入推广计划名称">
        </div>
    </div>
    <div class="advPlanFooter">
        <div class="add_btn" @click="savePlan">
            保存
        </div>
    </div>
    <Infor :position="position" :duration="duration" :type="type" :content="content" :modal="modal" :showPopup="showPopup"></Infor>
 </div>
</template>

<script>
import Infor from "@/components/message/Message";
export default {
    components: {
        Infor,
    },
    data () {
        return {
            planName:'',
            position:'top',
            content:'操作失败',
            showPopup:false,
            modal:true,
            duration:'3000',
            type:'error',
            planId:'',//保存路由里传入的推广计划ID
        };
    },
    methods: {
        // 保存推广计划
        savePlan(){
            if(this.planId<0){
                this.$esellApi.send("/api/campaign/add.shtml", {
                    'name': this.planName,
                }).then(res => {
                    this.$router.push({'name':'AdvPlan'})
                }).catch(res => {
                    this.content=res.message
                    this.showPopup=!this.showPopup;
                }) 
            }else{
                this.$esellApi.send("/api/campaign/update.shtml", {
                    'name': this.planName,
                    'id':this.planId,
                }).then(res => {
                    this.$router.push({'name':'AdvPlan'})
                }).catch(res => {
                    this.content=res.message
                    this.showPopup=!this.showPopup;
                }) 
            }
        },
    },
    created(){
        this.planName=this.$route.query.name;
        this.planId=this.$route.query.num;
    }
}

</script>
<style lang='scss'>
@import "../../../sass/base.scss";
@import "../../../assets/fonts/iconfont.css";
.add_adv_plan{
    *{
        box-sizing: border-box;
    }
    .plan_box{
        width: 100%;
        display: flex;
        padding-top: 0.12rem;
        box-sizing: border-box;
        border-bottom: 1px solid #dedede;
        position: relative;
        background: $white;
        padding: 0 0.22rem;
        font-size: 0.3rem;
        .plan_title{
            width: 2.1rem;
            min-width: 1.8rem;
            color: #666666;
            line-height: 2.4;
            height: 0.76rem;
            span{
                color: $impColor;
            }
        }
        .plan_name{
            flex: 1;
            line-height: 2.4;
            color: #666666;
            font-size: 0.28rem;
            input{
                color: #333333;
                font-size: 0.28rem;
                width: 4.2rem;
                height: 0.7rem;
                text-align: center;
                border-bottom: 1px solid #dedede;
            }
        }
    }
    .advPlanFooter{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1rem;
        background: $white;
        border-top: 1px solid $sublineColor;
        .add_btn{
            width: 96%;
            margin: 0 auto;
            margin-top: 0.1rem;
            height: 0.8rem;
            text-align: center;
            line-height: 0.8rem;
            background: $impColor;
            color: $white;
            font-size: 0.32rem;
            letter-spacing: 0.01rem;
            border-radius: 0.04rem;
            cursor: pointer;
        }
    }
}
</style>