<template>
    <div class="page-loadmore">
        <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
            <mt-loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
                <slot></slot>
                <div slot="top" class="mint-loadmore-top">
                    <span v-show="topStatus !== 'loading'">下拉刷新</span>
                    <span v-show="topStatus === 'loading'">
                        <span v-show="topStatus === 'drop'">释放更新</span>
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
                </div>
                <div slot="bottom" class="mint-loadmore-bottom">
                    <span v-show="bottomStatus !== 'loading'">上拉加载</span>
                    <span v-show="bottomStatus === 'loading'">
                        <span v-show="bottomStatus === 'drop'">释放更新</span>
                        <mt-spinner type="snake"></mt-spinner>
                    </span>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>
    <script type="text/babel">
export default {
    name: "c_loadMore",
    data() {
        return {
            list: [],
            allLoaded: false,
            bottomStatus: '',
            wrapperHeight: 0,
            topStatus: '',
            //wrapperHeight: 0,
            translate: 0,
            moveTranslate: 0,
        };
    },
    methods: {
        //上拉加载更多
        loadBottom() {
            this.$emit("loadBottom");
        },
        //下拉刷新
        loadTop() {
            this.$emit("loadTop");
        },
        handleTopChange(status) {
            console.log(111, status)
            this.moveTranslate = 1;
            this.topStatus = status;
        },
        handleBottomChange(status) {
            console.log(222, status)
            this.bottomStatus = status;
        },
        onTopLoaded() {
            this.$refs.loadmore.onTopLoaded();
        },
        onBottomLoaded() {
            this.$refs.loadmore.onBottomLoaded();
        },
        setAllLoaded(val) {
            this.allLoaded = val;
        },
        translateChange(translate) {
            const translateNum = +translate;
            this.translate = translateNum.toFixed(2);
            this.moveTranslate = (1 + translateNum / 70).toFixed(2);
        },
    },
    created() {
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
};
</script>


  <style scoped>
.loading-background,
.mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
}

.mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
}

.page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
}

.page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px
}

.page-loadmore-desc:last-of-type,
.page-loadmore-listitem {
    border-bottom: 1px solid #eee
}

.page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    text-align: center
}

.page-loadmore-listitem:first-child {
    border-top: 1px solid #eee
}

.page-loadmore-wrapper {
    overflow: scroll
}

.mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
}
</style>