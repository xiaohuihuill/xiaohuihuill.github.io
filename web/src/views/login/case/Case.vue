<template>
    <div class="case">
        <div class="banner">
            <div class="text">
                <h5>信息发布可以这么简单</h5>
                <p>无论您是用于哪种商用场所（购物中心、零售店、咖啡店、金融机构、企业前台等等），</p>
                <p>您都可以用{{this.$store.getters.getText}}为您提供工具，创建属于自己的信息发布平台。</p>
            </div>
        </div>
        <div class="exhibition">
            <h3>案例场景展示</h3>
            <div class="content">
                <div class="enterprise dispaly">
                    <div class="enterprise-img size"></div>
                    <p>企业</p>
                </div>
                <div class="cinema dispaly">
                    <div class="cinema-img size"></div>
                    <p>影院</p>
                </div>
                <div class="restaurant dispaly">
                    <div class="restaurant-img size"></div>
                    <p>餐厅</p>
                </div>
                <div class="si-shop dispaly">
                    <div class="si-shop-img size"></div>
                    <p>4S店</p>
                </div>
                <div class="gallery dispaly">
                    <div class="gallery-img size"></div>
                    <p>展厅</p>
                </div>
                <div class="market dispaly">
                    <div class="market-img size"></div>
                    <p>商场</p>
                </div>
                <div class="supermarket dispaly">
                    <div class="supermarket-img size"></div>
                    <p>超市</p>
                </div>
                <div class="hotel dispaly">
                    <div class="hotel-img size"></div>
                    <p>酒店</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'case',
    data() {
        return {
            isCollapse: true,
        }
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
    }
}
</script>
<style lang="scss" scoped>
@import "../../../sass/case.scss";
</style>