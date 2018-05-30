<template>
   <div class="select">
       <div class="select_list cf">
           <div class="select_item" :class="index==checkedType?'active':''" v-for="(item,index) in list" :key="index" @click="clickItem(index)">
               {{item.name}}
           </div>
       </div>
   </div>
</template>

<script>
export default {
    components: {
    },
    props: {
        list: '',
        selectType: '',
    },
    data() {
        return {
            checkedType:'0',//被选中的值
        };
    },
    methods: {
        clickItem(data){
            this.checkedType=data;
            this.$emit("clickItem",data);
        }
    },
    watch:{
       selectType:function(){
           this.checkedType=this.selectType;
       } 
    },
    created(){
        this.checkedType=this.selectType;
    },
}

</script>
<style lang='scss'>
@import "./../../sass/base.scss";
.select{
    .select_list{
        .select_item{
            float: left;
            width: 1.6rem;
            height: 0.6rem;
            text-align: center;
            line-height: 0.6rem;
            color: $contenTextColor;
            background: $bgColor;
            margin-right: 0.24rem;
            margin-bottom: 0.27rem;
            border-radius: 0.04rem;
            font-size: 0.3rem;
        }
        .select_item:nth-child(3n){
            margin-right: 0;
        }
        .active{
            background: $impColor;
            color: $white;
        }
    }
}
</style>