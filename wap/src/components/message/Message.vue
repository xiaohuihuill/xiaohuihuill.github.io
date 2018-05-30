<template>
    <div class="message">
        <mt-popup v-model="isShow" :position="position" :modal="modal">
            <div class="message_wrapper">
                <div class="icon_box" :style="'background:'+bgType[type]">
                    <i class="iF">&#xe653;</i>
                </div>
                <div class="text_content">
                    {{content}}
                </div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { Popup } from 'mint-ui';
export default {
    props: {
        position: '',//消息框的位置
        modal: '',//是否开启遮罩层
        content: '',//消息框的内容
        showPopup: '',//触发消息框
        duration: '',//消息框的显示时间
        type: '',//消息框类型, success---成功   error ----失败
    },
    data() {
        return {
            isShow: false,
            timer: '',
            bgType: { 'success': '#48bb0f', 'error': '#ff5663' }
        };
    },
    components: {
        Popup,
    },
    methods: {},
    watch: {
        showPopup: function() {
            let that = this;
            this.isShow = true;
            clearTimeout(this.timer);
            this.timer = setTimeout(function() {
                that.isShow = false;
            }, this.duration)
        }
    }
}

</script>
<style lang='scss'>
.message {
    .v-modal {
        opacity: 0;
    }
    .mint-popup {
        width: 100%;
        background-color: #fff;
        color: #333;
        text-align: center;
        font-size: 0.3rem;
        letter-spacing: 0.02rem;
        border-radius: 0.04rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        .message_wrapper {
            display: flex;
            .icon_box {
                width: 1rem;
                text-align: center;
                padding: 0.12rem;
                i {
                    font-size: 0.4rem;
                    transform: rotate(45deg);
                    display: inline-block;
                    font-weight: 900;
                    color: #fff;
                }
            }
            .text_content {
                flex: 1;
                padding: 0.12rem;
            }
        }
        .tips {
            font-size: 0.26rem;
        }
    }
}
</style>