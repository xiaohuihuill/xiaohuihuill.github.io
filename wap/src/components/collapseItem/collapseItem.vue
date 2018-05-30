<template>
    <div class="card is-fullwidth collapse-item" :class="{ 'is-active': isOpen }">
        <header class="card-header" @click="toggle">
            <div class="card-header-title">{{ title }} - {{specification}}</div>
            <span class="card-header-icon">
                <i class="iF" v-if="!isOpen">&#xe64e;</i>
                <i class="iF" v-else>&#xe662;</i>
            </span>
        </header>
        <transition name="">
            <div class="card-content" v-show="isOpen">
                <div class="card-content-list">
                    <div ref="scroll_wrapper" class="scroll">
                        <div class="content">
                            <div class="slider cf" v-for="(item,index) in list" :key="index" :style="checked==index?deleteSlider:''">
                                <div class="infor">
                                    <div class="infor_lfet">
                                        <img :src="item['cover-url-m']?item['cover-url-m']:(item['cover-url']?item['cover-url']:'')" alt="">
                                    </div>
                                    <div class="infor_center">
                                        <h5>{{item.name}}</h5>
                                        <div class="center_item">
                                            <span>开始时间:</span>
                                            <span>{{item['start-time']}}</span>
                                        </div>
                                        <div class="center_item">
                                            <span>结束时间:</span>
                                            <span>{{item['end-time']}}</span>
                                        </div>
                                        <div class="center_item">
                                            <span>播放时间:</span>
                                            <span>{{item.duration}}</span>
                                        </div>
                                    </div>
                                    <!--<div class="infor_right">
                                                    <div>
                                                        <i class="iF">&#xe61e;</i>
                                                    </div>
                                                </div>-->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    props: {
        title: String,
        specification: String,
        list: {
            type: Array,
            default: function() {
                return []
            }
        },
        actived: {
            type: Boolean,
            default: false,
        },
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: null
        },
        listenScroll: {
            type: Boolean,
            default: true
        },
        pullup: {
            type: Boolean,
            default: true
        },
        beforeScroll: {
            type: Boolean,
            default: true
        },
        refreshDelay: {
            type: Number,
            default: 20
        }
    },
    created() {
        console.log(this.list)
    },
    data() {
        return {
            isOpen: this.actived,
            startX: 0, //X轴触摸位置
            startY: 0, //Y轴触摸位置
            disX: 0, //X轴偏移距离
            disY: 0, //Y轴偏移移动距离
            deleteSlider: "", //滑动时的效果,使用v-bind:style="deleteSlider"
            canMove: true, //判断是否可以显示删除按钮
            checked: 0,
        };
    },
    computed: {
        index() {
            return this.$parent.$collapseItems.indexOf(this);
        },
    },
    mounted() {
        setTimeout(() => {
            this._initScroll()
        }, 5)
    },
    methods: {
        toggle() {
            this.isOpen = !this.isOpen;
            this.$parent.setActiveIndex(this.index);
            this.$emit("click");
        },
        _initScroll() {
            if (!this.$refs.scroll_wrapper) {
                return
            }
            this.scroll = new BScroll(this.$refs.scroll_wrapper, {
                probeType: this.probeType,
                click: this.click
            })
            if (this.listenScroll) {
                let that = this
                this.scroll.on('scroll', (pos) => {
                    that.$emit('scroll', pos, this.scroll.y, this.scroll.maxScrollY)
                })
            }
            if (this.pullup) {
                this.scroll.on('scrollEnd', () => {
                    this.$emit('scrollToEnd', this.scroll.y, this.scroll.maxScrollY)
                })
            }
            if (this.beforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforeScroll')
                })
            }
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        },
        touchStart(ev, index) {
            ev = ev || event;
            //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
            if (ev.touches.length == 1) {
                // 记录开始位置
                this.startX = ev.touches[0].clientX;
                this.startY = ev.touches[0].clientY;
                this.checked = index;
            }
        },
        touchMove(ev) {
            ev = ev || event;
            //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
            let wd = this.$refs.remove[this.checked].offsetWidth;
            if (ev.touches.length == 1) {
                // 滑动时距离浏览器左侧实时距离
                this.moveX = ev.touches[0].clientX;
                this.moveY = ev.touches[0].clientY;
                //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                this.disX = this.startX - this.moveX;
                this.disY = this.startY - this.moveY;
                // 如果是向右滑动或者不滑动，不改变滑块的位置
                if (this.disX < 0 || this.disX == 0) {
                    this.deleteSlider = "transform:translateX(0px)";
                    // 大于0，表示左滑了，此时滑块开始滑动
                } else if (this.disX > 0) {
                    if (this.disX > Math.abs(this.disY) && Math.abs(this.disY) < 60) {
                        this.canMove = true;
                        //具体滑动距离我取的是 手指偏移距离*5。
                        this.deleteSlider =
                            "transform:translateX(-" + this.disX * 5 + "px)";
                        // 最大也只能等于删除按钮宽度
                        if (this.disX * 5 >= wd) {
                            this.deleteSlider = "transform:translateX(-" + wd + "px)";
                        }
                    } else {
                        this.canMove = false;
                    }
                }
            }
        },
        touchEnd(ev) {
            ev = ev || event;
            let wd = this.$refs.remove[this.checked].offsetWidth;
            if (ev.changedTouches.length == 1) {
                let endX = ev.changedTouches[0].clientX;
                let endY = ev.changedTouches[0].clientY;
                this.disX = this.startX - endX;
                this.disY = this.startY - endY;
                //如果距离小于删除按钮一半,强行回到起点
                if (this.disX * 5 < wd / 2) {
                    this.deleteSlider = "transform:translateX(0px)";
                } else if (this.canMove && this.disX * 5 > wd / 2) {
                    //大于一半 滑动到最大值
                    this.deleteSlider = "transform:translateX(-" + wd + "px)";
                } else {
                    this.deleteSlider = "transform:translateX(0px)";
                }
            }
        },
        remove(data) {
            this.$emit("remove", data);
        },
        clickItem(data) {
            this.$emit("clickItem", data);
        },
    },
    watch: {
        isActive(val) {
            this.isOpen = val;
        },
        list(){
            this.deleteSlider = "transform:translateX(0px)";
            setTimeout(() => {
                this.refresh();
            }, this.refreshDelay)
        },
    },
};
</script>
<style lang="scss" scoped>
@import './../../sass/base.scss';
.card {
    width: 100%;
    .card-header {
        display: flex;
        justify-content: space-between;
        height: .87rem;
        width: 100%;
        line-height: .87rem;
        background-color: $white;
        border-bottom: 1px solid $sublineColor;
        box-sizing: border-box;
        padding: 0 .22rem;
        .card-header-title{
            font-size: 0.3rem;
            color: $contenTextColor;
        }
    }
}

.card-content {
    height: 100%;
    width: 100%;
    .card-content-list {
        height: calc(100% - 0.87rem); // padding-bottom: 1rem;
        box-sizing: border-box;
        overflow: hidden;
        .scroll {
            height: 100%;
            width: 100%;
            .content {
                position: relative;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                background: #fff;
                z-index: 1; //    设置过渡动画
                .slider {
                    box-sizing: border-box;
                    width: calc(100% + 1.5rem);
                    position: relative;
                    user-select: none;
                    transition: all 0.3s;
                    .infor {
                        float: left;
                        box-sizing: border-box;
                        height: 2.39rem;
                        width: calc(100% - 0.22rem - 1.5rem);
                        display: -webkit-box;
                        display: -ms-flexbox;
                        display: flex;
                        border-bottom: 1px solid #dedede;
                        margin-left: 0.22rem;
                        padding-top: 0.25rem;
                        position: relative;
                        z-index: 10; //    设置过渡动画
                        transition: 0.3s;
                        .infor_lfet {
                            display: inline-block;
                            width: 1.9rem;
                            height: 1.9rem;
                            line-height: 1.9rem;
                            overflow: hidden;
                            margin-right: 0.18rem;
                            text-align: center;
                            box-sizing: border-box;
                            display: table-cell; //主要是这个属性
                            vertical-align: middle;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .infor_center {
                            flex: 1;
                            color: $contenTextColor;
                            font-size: 0.28rem;
                            overflow: hidden;
                            margin-left: .22rem;
                            h5 {
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                font-size: 0.32rem;
                                color: $impTextColor;
                                font-weight: 400;
                                margin-top: 0.06rem;
                            }
                            .center_item {
                                margin-top: 0.05rem;
                            }
                        }
                        .infor_right {
                            width: 0.4rem;
                            margin-right: 0.2rem;
                            line-height: 1.57rem;
                            color: $sublineColor;
                        }
                    }
                    .remove {
                        float: left;
                        width: 1.5rem;
                        height: 2.39rem;
                        background: #ea414a;
                        right: 0;
                        top: 0;
                        color: #fff;
                        text-align: center;
                        font-size: 0.3rem;
                        line-height: 2.39rem;
                        box-sizing: border-box;
                        z-index: -10;
                    }
                }
                .slider::after {
                    clear: both;
                    content: "";
                    display: table;
                }
            }
        }
    }
}
</style>
