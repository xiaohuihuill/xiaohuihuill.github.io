<!--  -->
<template>
 <div class="select_content">
    <div class="text_wrapper" @click.stop="showItem">
        <div v-if="value" class="h100">{{value}}</div> 
        <div v-else class="clear_right">{{placeholder}}</div>
        <!-- <div v-show="value"  class="clear_right" @click.stop="showItem">请输入</div> -->
    </div>
    <div class="clear" @click.self="clear"  v-if="value">
    ×
    </div>
    <div class="clear" @click.self="clear"  v-if="!value">
        <i class="iF">&#xe61e;</i>
    </div>
 </div>
</template>

<script>
export default {
    props: {
        placeholder:'',
        value:'',
    },
    data () {
        return {
        };
    },
    methods: {
        clear(){
            this.$emit('clearItem')
        },
        showItem(){
            this.$emit('showItem')
        }
    }
}

</script>
<style lang='scss'>
@import "../../sass/base.scss";
.select_content{
    width: 100%;
    height: 100%;
    color: $contenTextColor;
    position: relative;
    .clear{
        position: absolute;
        right: 0;
        top: 0rem;
        line-height: 1;
        height: 100%;
        padding: 0.15rem;
        padding-right: 0.35rem;
        cursor: pointer;
    }
    .h100{
        height: 100%;
        line-height: 2.7;
    }
}
</style>