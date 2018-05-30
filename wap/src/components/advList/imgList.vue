 <template>
    <div class="delete imglist_wrapper" ref="wrapper">
        <div class="content">
            <div class="slider cf" v-for="(item,index) in list" :key="index" :style="checked==index?deleteSlider:''">
                <div @click="clickItem(item)"  class="infor" @touchstart='touchStart($event,index)' @touchmove='touchMove' @touchend='touchEnd'>
                  <div class="img_content">
                            <img :src="item.url">
                            <mt-progress :value="item.barwidth"  :bar-height="5" v-show="item.open">
                            </mt-progress>
                        </div>
                        <div class="text_content">
                            <span>播放时长:</span>
                            <input type="text" v-model="item.duration" placeholder="请输入播放时长">
                            <span>秒</span>
                        </div>
                </div>
                <div class="remove" ref='remove' @click="remove(item,item.fileId,index,item.id)">
                    删除
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll';

export default {
    props: {
        list:'',
    },
    data() {
        return {
            startX: 0,   //X轴触摸位置
            startY: 0,   //Y轴触摸位置
            disX: 0,    //X轴偏移距离
            disY: 0,    //Y轴偏移移动距离
            deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider"
            canMove:true, //判断是否可以显示删除按钮
            checked:0,
        }
    },
    created(){
        this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.wrapper, {})
        })  
    },
    watch:{
        list:function(){
            this.deleteSlider = "transform:translateX(0px)"; 
        }
    },
    methods: {
        touchStart(ev,index) {
            ev = ev || event
            //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
            if (ev.touches.length == 1) {
                // 记录开始位置
                this.startX = ev.touches[0].clientX;
                this.startY = ev.touches[0].clientY;
                this.checked =index;
            }
        },
        touchMove(ev) {
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
                    if(this.disX>Math.abs(this.disY)&&Math.abs(this.disY)<60){
                        this.canMove=true;
                        //具体滑动距离我取的是 手指偏移距离*5。
                        this.deleteSlider = "transform:translateX(-" + this.disX * 5 + "px)";
                        // 最大也只能等于删除按钮宽度 
                        if (this.disX * 5 >= wd) {
                            this.deleteSlider = "transform:translateX(-" + wd + "px)";
                        }
                    }else{
                        this.canMove=false;
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
                if ((this.disX * 5) < (wd / 2)) {
                    this.deleteSlider = "transform:translateX(0px)";
                } else if(this.canMove && (this.disX * 5) > (wd / 2)) {
                    //大于一半 滑动到最大值
                    this.deleteSlider = "transform:translateX(-" + wd + "px)";
                }else{
                    this.deleteSlider = "transform:translateX(0px)";
                }
            }
        },
        remove(item,fileId,index,id) {
            this.deleteSlider = "transform:translateX(0px)";
            this.$emit("remove",item,fileId,index,id)
        },
        clickItem(data){
            this.$emit('clickItem',data)
        }
    }
}
</script>
<style lang="scss">
@import "./../../sass/base.scss";
.imglist_wrapper{
    max-height: 10rem;
    .content {
        position: relative;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #fff;
        z-index: 1; //    设置过渡动画
        width: 100%;
        overflow: hidden;
        .slider {
            box-sizing: border-box;
            width: calc(100% + 1.5rem);
            position: relative;
            user-select: none;
            transition: all 0.3s;
            .infor{
                float: left;
                box-sizing: border-box;
                height: 1.8rem;
                width:calc(100% - 0.22rem - 1.5rem);
                display: -webkit-box;
                display: -ms-flexbox;
                display: flex;
                border-bottom: 1px solid #dedede;
                margin-left: 0.22rem;
                padding-top: 0.2rem;
                position: relative;
                z-index: 10; //    设置过渡动画
                transition: 0.3s;   
                .img_content{
                    width: 1.6rem;
                    height: 1.6rem;
                    position: relative;
                    overflow: hidden;
                    img{
                        max-width: 100%;;
                    }
                    .mt-progress{
                        height: 0.1rem;
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        width: 100%;
                        .mt-progress-progress{
                            background: $impColor;
                        }
                    }
                }
                    .text_content{
                        flex: 1;
                        padding-left: 0.6rem;
                        padding-top: 0.4rem;
                        input{
                            width: 1.4rem;
                            height: 0.8rem;
                            padding: 0.12rem 0.16rem;
                            border-bottom:1px solid $sublineColor;
                            text-align: center;
                        }
                    }
            } 
            .remove {
                float: left;
                width: 1.5rem;
                height: 1.8rem;
                background: #ea414a;
                right: 0;
                top: 0;
                color: #fff;
                text-align: center;
                font-size: .3rem;
                line-height:1.8rem;
                box-sizing: border-box;
                z-index: -10;
            }    
        }
        .slider::after{
            clear: both;
            content: '';
            display: table;
        }
    }
}

</style>