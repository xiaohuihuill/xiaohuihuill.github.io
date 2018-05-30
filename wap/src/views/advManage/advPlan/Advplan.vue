<template>
    <div class="advPlan">
        <Loading v-show="isLoading"></Loading>
        <AdvPlanList :status="status" :list="list" @remove="remove" @clickItem="clickItem" @loadMore="loadMore" @refresh="refresh" v-if="list.length>0"></AdvPlanList>  
        <div v-else>空数据</div>
        <div class="advPlanFooter">
            <div class="add_btn" @click="addPlan">
                新增推广计划
            </div>
        </div>
    </div>
</template>

<script>
import AdvPlanList from '@/components/advList/advPlanList';
import Scroll from "@/components/scroll/Scroll";
import Loading from '@/components/loading/loading';
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
    components: {
        AdvPlanList,
        Scroll,
        MessageBox,
        Loading,
        Toast
    },
    data() {
        return {
            list: [],
            page: 1, //保存当前页码
            size: 10,//保存每次加载的条数
            total:9,
            status:{'Y':'启用','N':'暂停'},
            isLoading:true,
        };
    },
    methods: {
        remove(data){
            if(data['default-value']=="Y"){
                Toast({
                    message: '默认数据，无法删除',
                    duration: 1000
                });
                return
            }
            MessageBox.confirm('您确定要将此推广计划删除？').then(action => {
                this.$esellApi.send("/api/campaign/delete.shtml", {
                    "id":data.id,
                }).then(res => {
                    this.getAdvInfor(true);
                }).catch(res => {
                    console.log(res);
                })
            }).catch(action => {
            }) ;
        },
        clickItem(data){
            this.$router.push({name:'AdvListItem',query:{'num':data.id,'name':data.name,"default":data['default-value']}})
        },
         // 加载更多
        loadMore(){
            if(!(Math.ceil(this.total/this.size)>=this.page)){
                Toast({
                    message: '已经是最后一页的数据了',
                    duration: 1000
                });
            }else{
                this.page+=1;
                this.isLoading=true;
                this.getAdvInfor();
            }
        },
        // 刷新
        refresh(){
            this.page=1;
            this.isLoading=true;
            this.getAdvInfor(true);
        },
        // 新增推广计划
        addPlan(){
            this.$router.push({name:'AddAdvPlan',query:{'num':-1}})
        },
        getAdvInfor(type) {
            this.$esellApi.send("/api/campaign/list.shtml", {
                page: this.page,
                size: this.size,
            }).then(res => {
                this.isLoading=false;
                this.total=res.payload.total;
                if(type){
                    this.list = res.payload.data;
                }else {
                    this.list=this.list.concat(res.payload.data);
                }
            }).catch(res => {
                this.isLoading=false;
                console.log(res);
            })
        },
    },
    watch:{
    },
    created(){
        this.getAdvInfor();
    }
}

</script>
<style lang='scss'>
@import "../../../sass/base.scss";
.advPlan{
    width: 100%;
    height: calc(100% - 1rem);
    height: -moz-calc(100% - 1rem);
    height: -webkit-calc(100% - 1rem);
    .delete{
        width: 100%;
        height: 100%;;
    }
    .advPlanFooter{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1rem;
        background: $white;
        border-top: 1px solid $sublineColor;
        z-index: 99;
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