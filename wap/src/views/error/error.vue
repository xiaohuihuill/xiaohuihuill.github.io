<template>
    <div class="error">
        <div class="img_wrapper">
            <ImgContent type="error" emptyInfor="出现未知错误" addSomething="首页试试" @add="addAdv"></ImgContent>
        </div>  
    </div>
</template>

<script>
import ImgContent from '@/components/imgContent/imgContent'
export default {
    name: '',
    data() {
        return {
        };
    },
    components: {
        ImgContent,
    },
    methods: {
        addAdv(){
            this.$router.push({ path: "/login" })
        },
    }
}
</script>
<style lang='scss' scoped>
.error {
    width: 100%;
    height: 100%;
    .img_wrapper{
        width: 3rem;
        position: absolute;
        top: calc(40% - 1.5rem);
        left: calc(50% - 1.5rem);
    }
}
</style>