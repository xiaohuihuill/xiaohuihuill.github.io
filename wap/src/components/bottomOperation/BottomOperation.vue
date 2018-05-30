<template>
    <div class="bottom-operation" @click="click">
        <a>{{message}}</a>
    </div>
</template>

<script>
export default {
    name: "BottomOperation",
    props: {
        message: {
            type: String,
            default: "",
        }
    },
    data() {
        return {
        };
    },
    methods: {
        click() {
            this.$emit("click");
        }
    }
}

</script>
<style lang='scss' scoped>
@import './../../sass/base.scss';
.bottom-operation {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    height: 1rem;
    width: 100%;
    padding: 0.1rem;
    background-color: $white;
    box-sizing: border-box;
    a {
        display: block;
        color: $white;
        background: $impColor;
        text-align: center;
        font-size: .3rem;
        border-radius: .05rem;
        height: 0.8rem;
        line-height: 0.8rem;
    }
}
</style>