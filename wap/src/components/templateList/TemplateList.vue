<template>
    <div class="template-list">
        <div ref="scroll_wrapper" class="scroll" style="height:100%;width:100%;">
            <div class="content">
                <div class="slider cf" v-for="(item,index) in list" :key="index" :style="checked==index?deleteSlider:''">
                    <div @click="clickItem(item)" class="infor">
                        <div class="infor-left">
                            <div class="picture">
                                <img src="" alt="">
                            </div>
                        </div>
                        <div class="infor-right" style="overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">
                            <div style="overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">模板名称：
                                <span>{{item.name}}</span>
                            </div>
                            <p>分辨率
                                <span>{{item.width}}*{{item.height}}</span>
                            </p>
                            <p v-if="type='1'">
                                <!--默认模板，不能删除-->
                            </p>
                            <p v-else>
                                <i class="iF" @click="remove(item.id)">&#xe6bb;</i>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';
export default {
    name: 'templateList',
    props: {
        list: "",
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
    data() {
        return {
            startX: 0, //X轴触摸位置
            startY: 0, //Y轴触摸位置
            disX: 0, //X轴偏移距离
            disY: 0, //Y轴偏移移动距离
            deleteSlider: "", //滑动时的效果,使用v-bind:style="deleteSlider"
            canMove: true, //判断是否可以显示删除按钮
            checked: 0,
        };
    },
    mounted() {
        setTimeout(() => {
            this._initScroll()
        }, 5)
    },
    methods: {
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
        list() {
            setTimeout(() => {
                this.refresh();
            }, this.refreshDelay)
        }
    }
}

</script>
<style lang='scss' scoped>
@import "./../../sass/base.scss";
.template-list {
    height: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    .scroll {
        height: 100%;
        width: 100%;
        overflow: hidden;
        .infor {
            display: flex;
            padding: .4rem .22rem;
            box-sizing: border-box;
            height: 2.8rem;
            width: 100%;
            border-bottom: 1px solid $sublineColor;
            &-left {
                width: 3.6rem;
                height: 2rem;
                .picture {
                    width: 3.6rem;
                    height: 2rem;
                    img {
                        height: 100%;
                        width: 100%;
                    }
                }
            }
            &-right {
                padding-left: 0.15rem;
                flex: 1;
                box-sizing: border-box;
                font-size: .3rem;
                p:nth-child(1) {
                    margin-top: .1rem;
                    font-size: .3rem;
                }
                p:nth-child(2) {
                    margin-top: .1rem;
                    font-size: .28rem;
                    color: $contenTextColor;
                }
                p:nth-child(3) {
                    font-size: .26rem;
                    margin-top: .6rem;
                    color: $shallowColor;
                }
            }
        }
    }
}
</style>