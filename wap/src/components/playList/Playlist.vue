 <template>
    <div class="device-list">
        <div ref="scroll_wrapper" class="scroll">
            <div class="content">
                <div class="slider cf" v-for="(item,index) in list" :key="index" :style="checked==index?deleteSlider:''">
                    <div @click="clickItem(item)" class="infor" @touchstart='touchStart($event,index)' @touchmove='touchMove' @touchend='touchEnd'>
                        <div class="infor_lfet" v-if="item.status=='OFL'">
                            <div>
                                <i class="iF" style="color:#48bb0f">&#xe619;</i>
                            </div>
                            <div>
                                <span>在线</span>
                            </div>
                        </div>
                        <div class="infor_lfet" v-else-if="item.status=='ONL'">
                            <div>
                                <i class="iF" style="color:#ff5663">&#xe61a;</i>
                            </div>
                            <div>
                                <span>离线</span>
                            </div>
                        </div>
                        <div class="infor_lfet" v-else>
                            <div>
                                <i class="iF">&#xe626;</i>
                            </div>
                            <div>
                                <span>未知</span>
                            </div>
                        </div>
                        <div class="infor_center">
                            <h5>{{item.name}}</h5>
                            <div class="center_item">
                                <span>设备编号:</span>
                                <span>{{item['uuid']}}</span>
                            </div>
                            <div class="center_item">
                                <span>添加时间:</span>
                                <span>{{item['create-time']}}</span>
                            </div>
                            <div class="center_item">
                                <span>屏幕类型:</span>
                                <span>{{item.status}}</span>
                            </div>
                        </div>
                        <div class="infor_right">
                            <div>
                                <i class="iF">&#xe61e;</i>
                            </div>
                        </div>
                    </div>
                    <!--<div class="remove" ref='remove' @click="remove(item)">
                        删除
                    </div>-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import BScroll from 'better-scroll';
import BScroll from 'better-scroll';
export default {
    props: {
        list: {
            type: Array,
            default: [],
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
        data() {
            setTimeout(() => {
                this.refresh();
            }, this.refreshDelay)
        }
    }
};
</script>
<style lang="scss">
@import "./../../sass/base.scss";
.device-list {
    height: 100%;
    padding-bottom: 1rem;
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
                        width: 1.9rem;
                        height: 1.9rem;
                        overflow: hidden;
                        margin-right: 0.18rem;
                        text-align: center;
                        padding-top: .3rem;
                        box-sizing: border-box;
                        div:first-child {
                            i {
                                font-size: .8rem;
                            }
                        }
                        div:last-child {

                            span {
                                font-size: .3rem;
                            }
                        }
                    }
                    .infor_center {
                        flex: 1;
                        color: $contenTextColor;
                        font-size: 0.28rem;
                        overflow: hidden;
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

// .wrapper {
//     height: 10rem;
// }
</style>