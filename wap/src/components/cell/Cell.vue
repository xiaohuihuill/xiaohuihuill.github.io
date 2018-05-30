<template>
    <div class="vue-cell" @click="click">
        <div>{{title}} ({{specification}})</div>
        <div>
            <i class="iF">&#xe61e;</i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cell',
    props: {
        title: "",
        specification:"",
    },
    data() {
        return {
        };
    },
    methods: {
        click() {
            this.$emit("click")
        }
    }
}

</script>
<style lang='scss' scoped>
@import "./../../sass/base.scss";
.vue-cell {
    display: flex;
    width: 100%;
    height: .8rem;
    line-height: .8rem;
    padding-left: .2rem;
    padding-right: .4rem;
    box-sizing: border-box;
    border-bottom: 1px solid $sublineColor;
    justify-content: space-between;
    background: $white;
    div:first-child {
        font-size: .3rem;
        color: $contenTextColor;
    }
    div:last-child {
        color: $shallowColor;
    }
}

.vue-cell:last-child {
    margin: 0;
    padding: 0 .4rem 0 .2rem;
}
</style>