 <template>
    <div class="adv_plan_list">
        <Scroll :listenScroll="true" @scroll="moveIng" :data="list" :pullup="true" @scrollToEnd="scrollToEnd">
            <div class="content">
                <div class="slider cf" v-for="(item,index) in list" :key="index" :style="checked==index?deleteSlider:''">
                    <div @click="clickItem(item)" class="infor" @touchstart='touchStart($event,index,item)' @touchmove='touchMove($event,item)' @touchend='touchEnd($event,item)'>
                        <div class="infor_center">
                            <h5>{{item.name}}</h5>
                            <div class="center_item adv_num">
                                <span>广告数:</span>
                                <span>总数</span>
                                <span>({{item['ad-count']}})</span>
                                <!-- <span>投放</span>
                                                <span>(15)</span>
                                                <span>暂停</span>
                                                <span>(5)</span> -->
                            </div>
                            <div class="center_item">
                                <span>状态:</span>
                                <span class="green" v-if="item.status=='Y'">{{status[item.status]}}</span>
                                <span class="red" v-else>{{status[item.status]}}</span>
                            </div>
                        </div>
                        <div class="infor_right">
                            <div>
                                <i class="iF">&#xe61e;</i>
                            </div>
                        </div>
                    </div>
                    <div class="remove" ref='remove' @click="remove(item)">
                        删除
                    </div>
                </div>
            </div>
        </Scroll>
    </div>
</template>
<script>
import Scroll from "../scroll/Scroll";
import { Toast } from 'mint-ui';
export default {
    components: {
        Scroll,
        Toast
    },
    props: {
        list: '',
        status: '',
    },
    data() {
        return {
            startX: 0,   //X轴触摸位置
            startY: 0,   //Y轴触摸位置
            disX: 0,    //X轴偏移距离
            disY: 0,    //Y轴偏移移动距离
            deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
            canMove: true, //判断是否可以显示删除按钮
            checked: 0,
            canAjax: true,
        }
    },
    watch: {
        list: function() {
            this.deleteSlider = "transform:translateX(0px)";
        }
    },
    methods: {
        touchStart(ev, index, data) {
            if (data['default-value'] == "Y") {
                return
            }
            ev = ev || event
            //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
            if (ev.touches.length == 1) {
                // 记录开始位置
                this.startX = ev.touches[0].clientX;
                this.startY = ev.touches[0].clientY;
                this.checked = index;
            }
        },
        touchMove(ev, data) {
            ev = ev || event;
            //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
            let wd = this.$refs.remove[this.checked].offsetWidth;
            if (ev.touches.length == 1) {
                // 滑动时距离浏览器左侧实时距离
                this.moveX = ev.touches[0].clientX
                this.moveY = ev.touches[0].clientY
                //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                this.disX = this.startX - this.moveX;
                this.disY = this.startY - this.moveY;
                // 如果是向右滑动或者不滑动，不改变滑块的位置
                if (this.disX < 0 || this.disX == 0) {
                    this.deleteSlider = "transform:translateX(0px)";
                    // 大于0，表示左滑了，此时滑块开始滑动 
                } else if (this.disX > 0) {
                    if (data['default-value'] == "Y") {
                        this.deleteSlider = "transform:translateX(0px)";
                        Toast({
                            message: '默认数据，无法删除',
                            duration: 1000
                        });
                        return
                    }
                    if (this.disX > Math.abs(this.disY) && Math.abs(this.disY) < 60) {
                        this.canMove = true;
                        //具体滑动距离我取的是 手指偏移距离*5。
                        this.deleteSlider = "transform:translateX(-" + this.disX * 5 + "px)";
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
        touchEnd(ev, data) {
            ev = ev || event;
            let wd = this.$refs.remove[this.checked].offsetWidth;
            if (ev.changedTouches.length == 1) {
                let endX = ev.changedTouches[0].clientX;
                let endY = ev.changedTouches[0].clientY;
                this.disX = this.startX - endX;
                this.disY = this.startY - endY;
                //如果距离小于删除按钮一半,强行回到起点
                if ((this.disX * 5) < (wd / 2)) {
                    this.deleteSlider = "transform:translateX(0px)";
                } else if (this.canMove && (this.disX * 5) > (wd / 2)) {
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
            this.$emit('clickItem', data)
        },
        moveIng(data, y, maxY) {
            if (Math.abs(y) - Math.abs(maxY) > 20) {
                if (this.canAjax) {
                    this.canAjax = false;
                    this.$emit('loadMore');
                }
            } else if (y > 50) {
                if (this.canAjax) {
                    this.canAjax = false;
                    this.$emit('refresh')
                }
            }
        },
        scrollToEnd(y, maxY) {
            this.canAjax = true;
        },
    }
}
</script>
<style lang="scss">
@import "./../../sass/base.scss";
.adv_plan_list {
    height: 100%;
    width: 100%;
    .content {
        position: relative;
        width: 100%;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #fff;
        overflow: hidden;
        .slider {
            box-sizing: border-box;
            width: calc(100% + 1.5rem);
            width: -moz-calc(100% + 1.5rem);
            width: -webkit-calc(100% + 1.5rem);
            height: 2rem;
            position: relative;
            user-select: none;
            transition: all 0.3s;
            overflow: hidden;
            .infor {
                float: left;
                box-sizing: border-box;
                height: 2rem;
                width: calc(100% - 0.22rem - 1.5rem);
                width: -moz-calc(100% - 0.22rem - 1.5rem);
                width: -webkit-calc(100% - 0.22rem - 1.5rem);
                height: 2rem;
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                overflow: hidden;
                border-bottom: 1px solid #dedede;
                margin-left: 0.22rem;
                padding-top: 0.25rem;
                z-index: 100; //    设置过渡动画
                transition: 0.3s;
                .infor_lfet {
                    width: 1.9rem;
                    height: 1.9rem;
                    overflow: hidden;
                    margin-right: 0.18rem;
                    img {
                        max-width: 100%;
                        height: auto;
                    }
                }
                .infor_center {
                    flex: 1;
                    color: $contenTextColor;
                    font-size: 0.28rem;
                    overflow: hidden;
                    h5 {
                        font-size: 0.32rem;
                        color: #000;
                        font-weight: 400;
                        margin-top: 0.06rem;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }
                    .center_item {
                        margin-top: 0.05rem;
                        .green {
                            color: $green;
                        }
                        .red {
                            color: $impColor;
                        }
                    }
                    .adv_num {
                        color: $impTextColor;
                        span {
                            margin-left: 0.14rem;
                        }
                        span:first-child {
                            margin: 0;
                        }
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
                height: 2rem;
                background: #ea414a;
                color: #fff;
                text-align: center;
                font-size: .3rem;
                line-height: 2rem;
                box-sizing: border-box;
                z-index: -10;
            }
        }
        .slider::after {
            clear: both;
            content: '';
            display: table;
        }
    }
}
</style>