 <template>
    <div class="device-group-footer">
        <div class="footer_content">
            <div class="left" @click.stop="deviceGroupPlayList">
                <i class="iF">&#xe6b7;</i>
                <p>播放列表</p>
            </div>
            <div class="left" @click.stop="deviceGroupAddDevice">
                <i class="iF">&#xe6b8;</i>
                <p>添加设备</p>
            </div>
            <div class="center">
                <div class="btn_box" @click.stop="deviceGroupAddAdv">
                    <i class="iF">&#xe69f;</i>
                    <p>发布广告</p>
                </div>
            </div>
            <div class="left" @click.stop="deviceGroupEditInfo">
                <i class="iF">&#xe6b9;</i>
                <p>编辑信息</p>
            </div>
            <div class="right" @click.stop="deviceGroupRemoteControl">
                <i class="iF">&#xe6ba;</i>
                <p>远程控制</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        list: {},
    },
    data() {
        return {
        }
    },
    created() {
    },
    mounted() {
    },
    methods: {
        deviceGroupPlayList() {
            this.$emit('deviceGroupPlayList');
        },
        deviceGroupAddDevice() {
            this.$emit('deviceGroupAddDevice');
        },
        deviceGroupAddAdv() {
            this.$emit('deviceGroupAddAdv');
        },
        deviceGroupEditInfo() {
            this.$emit('deviceGroupEditInfo');
        },
        deviceGroupRemoteControl() {
            this.$emit('deviceGroupRemoteControl');
        },
    }
}
</script>
<style lang="scss" scoped>
@import "./../../sass/base.scss";
.device-group-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 9999;
    width: 100%;
    height: 1rem;
    .footer_content {
        width: 100%;
        height: 1rem;
        background: $white;
        display: flex;
        padding-top: 0.1rem;
        box-sizing: border-box;
        position: relative;
        .left,
        .right {
            width: 1.4rem;
            height: 100%;
            text-align: center;
            i {
                font-size: 0.4rem;
                color: $contenTextColor;
            }
            p {
                color: $shallowColor;
                margin-top: 0.06rem;
            }
        }
        .center {
            flex: 1;
            width: 0.95rem;
            position: relative;
            .btn_box {
                padding-top: 0.1rem;
                box-sizing: border-box;
                width: 1.4rem;
                height: 1.1rem;
                position: absolute;
                left: 50%;
                bottom: 0.1rem;
                margin-left: -0.7rem;
                background: $impColor;
                color: $white;
                z-index: 99;
                border-radius: 0.04rem;
                text-align: center;
                box-shadow: -4px 0px 6px $sublineColor, 4px 6px 12px $sublineColor;
                i {
                    font-size: 0.48rem;
                    color: $white;
                }
            }
        }
    }
    .footer_type2 {
        width: 100%;
        height: 1rem;
        background: $white;
        display: flex;
        position: relative;
        border-top: 1px solid $sublineColor;
        .left,
        .right {
            width: 50%;
            height: 100%;
            text-align: center;
            padding-top: 0.1rem;
            box-sizing: border-box;
            i {
                font-size: 0.4rem;
                color: $contenTextColor;
            }
            p {
                color: $shallowColor;
                margin-top: 0.06rem;
            }
        }
        .right {
            border-left: 1px solid $sublineColor;
        }
    }
    .footer_type3 {
        width: 100%;
        height: 1rem;
        background: $white;
        display: flex;
        position: relative;
        border-top: 1px solid $sublineColor;
        .left,
        .right {
            width: 50%;
            height: 100%;
            text-align: center;
            padding-top: 0.1rem;
            box-sizing: border-box;
            span {
                display: inline-block;
                width: 96%;
                height: 0.8rem;
                margin: 0 auto;
                color: $contenTextColor;
                line-height: 0.8rem;
                font-size: 0.36rem;
            }
        }
        .right {
            span {
                background: $impColor;
                border-radius: 0.04rem;
                color: $white;
                margin-top: 0;
                box-shadow: 1px 3px 20px $shallowColor;
            }
        }
    }
}
</style>