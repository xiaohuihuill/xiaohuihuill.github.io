<template>
 <div class="loading">
    <mt-spinner type="snake" color="rgb(38, 162, 255)"></mt-spinner>    
 </div>
</template>

<script>
import { Spinner } from 'mint-ui';
export default {
    data () {
        return {
        };
    },
    components: {
        Spinner
    },
}

</script>
<style lang='scss' scoped>
.loading{
    width: 1rem;
    height: 1rem;
    position: absolute;
    top: calc(50% - 0.5rem);
    left: calc(50% - 0.5rem);
    z-index: 99999;
    text-align: center;
    //  width: 100%;
    // height: 100%;
    // position: absolute;
    // top: 0;
    // left: 0;
    // bottom: 0;
    // right: 0;
    // z-index: 99999;
    // background: rgba(0,0,0,0.3);
    // text-align: center;
}
</style>