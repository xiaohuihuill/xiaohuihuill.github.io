<template>
    <div class="expenses">
        <div class="banner">
            <div class="content">
                <h3>个人版</h3>
                <h4>轻松加入，快速投放</h4>
                <div class="taocan">
                    <div class="month dispaly">
                        <h5>包月超值云套餐</h5>
                        <ul>
                            <li>1GB存储空间</li>
                            <li class="left">台终端设备</li>
                        </ul>
                        <p>低至：15元 / 月</p>
                    </div>
                    <div class="half-a-year dispaly">
                        <h5>半年超值云套餐</h5>
                        <ul>
                            <li>1GB存储空间</li>
                            <li class="left">台终端设备</li>
                        </ul>
                        <p>低至：80元 / 半年</p>
                    </div>
                    <div class="one-year  dispaly">
                        <h5>全年超值云套餐</h5>
                        <ul>
                            <li>1GB存储空间</li>
                            <li class="left">台终端设备</li>
                        </ul>
                        <p>低至：120元 / 年</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'expenses',
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
@import '../../../sass/expenses.scss';
</style>