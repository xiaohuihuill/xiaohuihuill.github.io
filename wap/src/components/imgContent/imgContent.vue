<template>
    <div class="img_content">
        <div>
            <img src="../../assets/img/empty.png" v-if="type=='empty'">
            <img src="../../assets/img/error.png" v-else-if="type=='error'">
            <img src="../../assets/img/disable.png" v-else-if="type=='disable'">
        </div>
        <div class="text_wrapper">
            <div>
                {{emptyInfor}}
            </div>
            <div class="add_click">
                <a href="javascript:;">{{gotoFrom}}</a>
                <span @click="add">{{addSomething}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        gotoFrom: {
            type: String,
            default: '快去',
        },// 默认值
        type: {
            type: String,
            default: 'empty',
        },  //disable无权限   error错误页面    empty暂无数据 
        emptyInfor: {
            type: String,
            default: "没有数据"
        },
        addSomething: {
            type: String,
            default: "试试去发布"
        }
    },
    data() {
        return {
        };
    },
    methods: {
        add() {
            this.$emit('add')
        }
    }
}

</script>
<style lang='scss'>
.img_content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .text_wrapper {
        padding-top: 0.2rem;
        text-align: center;
        color: #666;
        font-size: 0.28rem;
        .add_click {
            margin-top: 0.06rem;
            span {
                color: #FD616D;
                cursor: pointer;
                padding: 0.08rem
            }
        }
    }
}
</style>