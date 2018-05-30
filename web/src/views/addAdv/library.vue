<template>
   <div class="library">
       
   </div>
</template>
<script>

export default {
    props: {
       type:'',//接受数据区分设备还是设备组    1----设备    2----设备组
    },
    data() {
        return {
        };
    },
    created() {
      
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
    },
};
</script>
<style lang="scss">
</style>


