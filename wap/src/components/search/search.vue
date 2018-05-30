<template>
   <div class="search_wrapper">
        <mt-search
        v-model="searchValue"
        cancel-text="取消"
        :placeholder="placeholder">
        </mt-search>
    </div>
</template>
<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: '请输入关键字'
        },
        intVal:{
            type: String,
            default: '请输入关键字'
        }
    },
    data() {
        return {
           searchValue:'',//保存输入的搜索值
        };
    },
    watch:{
        searchValue(){
            if(this.searchValue){
                this.$emit('searchVal',this.searchValue);
            }
        },
        intVal(){
            this.searchValue=this.intVal;
            if(this.intVal==""){
                $('.search_wrapper .mint-searchbar-cancel').click();
            }
        }
    },
    mounted(){
        let that=this;
        $('.search_wrapper').on('keypress',".mint-searchbar-core",function(e){
            if(e.keyCode==13){
               $('.search_wrapper .mint-searchbar-core').blur();
               that.$emit('search',that.searchValue);
            }
        })
        $('.search_wrapper').on('click',".mintui-search",function(e){
            that.$emit('search',that.searchValue)
            $('.search_wrapper .mint-searchbar-core').blur();
        })
        $('.search_wrapper').on('click',".mint-searchbar-cancel",function(e){
            that.$emit('cancle',that.searchValue) 
        })
    },
    methods: {
    }
}

</script>
<style lang='scss'>
@import "./../../sass/base.scss";
.search_wrapper{
    height: 1.04rem;
    background: $impColor;
    padding-top: 0.25rem;
    box-sizing: border-box;
    .mint-search{
        height: 0.64rem;
    }
    .mint-search-list{
        display: none;
    }
    .mint-searchbar-cancel{
        box-sizing: border-box;
        padding:0.2rem  0.1rem;
        margin-left: 0.06rem;
    }
    .mint-searchbar{
        background: $impColor;
        height: 100%;
        .mint-searchbar-inner{
            background: #ff7782;
            height: 0.7rem;
            .mintui-search{
                font-size: 0.5rem;
            }
            .mint-searchbar-core{
                background: #ff7782;
                color: $defaultText;
                font-size: 0.28rem;
                margin-left: 0.1rem;
            }
            input::-webkit-input-placeholder{
                color: #fff;
            }
            input:-moz-placeholder{
                color: #fff;
            }
            input::-moz-placeholder{
                color: #fff;
            }
            input:-ms-input-placeholder{
                color: #fff;
            }
        }
        .mint-searchbar-cancel {
                font-size: 0.32res;
                color: #fff;
            }
    }
}
</style>