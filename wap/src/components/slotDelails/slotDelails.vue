<template>
    <div class="slot_Details">
       <div class="details_type1" v-if="type==1">
           <img :src="src" v-if="src">
           <div v-else class="img_error">
               获取预览图失败   
           </div>
       </div>
       <div class="details_type2" v-else-if="type==2">
           <div class="text_content" v-html="text"></div>
       </div>
    </div>
</template>

<script>
export default {
    props:{
        type:'',//1---------图片视频类型   2------文字类型
        src:'',//图片类型的SRC
        text:"",//文字类型的内容
    },
    data () {
        return {
        };
    },

    components: {},
    methods: {}
}

</script>
<style lang='scss' scoped>
.slot_Details{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .details_type1{
        width: 100%;
        height: 100%;
        .img_error{
            width: 100%;
            box-sizing: border-box;
            text-align: center;
            background: rgb(153, 153, 153);
            padding: 1.5rem 0.2rem;
            font-size: 0.6rem;
            color: rgb(51, 51, 51);
        }
    }
    .details_type2{
        width: 100%;
        height: 100%;
        .text_content{
            box-sizing: border-box;
            width: 100%;
            text-align: center;
            background: rgb(153, 153, 153);
            padding: 1.5rem 0.2rem;
            font-size: 0.6rem;
            color: rgb(51, 51, 51);
        }
    }
}
</style>