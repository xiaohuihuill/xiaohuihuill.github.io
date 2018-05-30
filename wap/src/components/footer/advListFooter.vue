 <template>
    <div class="adv_list_footer">
        <div class="footer_content" v-if="type==1">
            <div class="left" @click.stop="remove">
                <i class="iF">&#xe6bb;</i>
                <p>{{list.left}}</p>
            </div>
            <div class="center">
                <div class="btn_box"  @click.stop="addAdv" :style="'background:'+list.type.color">
                    <i class="iF" v-html="list.type.icon"></i>
                    <p>{{list.type.text}}</p>
                </div>
            </div>
            <div class="right" @click.stop="edit">
                <i class="iF" >&#xe6b9;</i>
                <p>{{list.right}}</p>
            </div>
        </div>
        <div class="footer_type2" v-else-if="type==2">
            <div class="left" @click.stop="remove">
                <i class="iF">&#xe6bb;</i>
                <p>{{list.left}}</p>
            </div>
            <div class="right" @click.stop="edit">
                <i class="iF">&#xe6b9;</i>
                <p>{{list.right}}</p>
            </div>
        </div>
        <div class="footer_type3" v-else-if="type==3">
            <div class="left" @click.stop="remove">
                <span>{{list.left}}</span>
            </div>
            <div class="right" @click.stop="edit">
                <span>{{list.right}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        list:{}, 
        type:'', 
    },
    data() {
        return {
        }
    },
    created() {
        console.log(this.type,111111)
    },
    mounted() {
    },
    methods: {
        remove(){
            this.$emit('remove');
        },
        addAdv(){
            this.$emit('add');
        },
        edit(){
            this.$emit('edit');
        }
    }
}
</script>
<style lang="scss" scoped>
@import "./../../sass/base.scss";
.adv_list_footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 1rem;
    .footer_content{
        width: 100%;
        height: 1rem;
        background: $white;
        display: flex;
        padding-top: 0.1rem;
        box-sizing: border-box;
        position: relative;
        .left,.right{
            width: 2rem;
            height: 100%;
            text-align: center;
            i{
                font-size: 0.4rem;
                color:$contenTextColor;
            }
            p{
                color: $shallowColor;
                margin-top: 0.06rem;
            }
        }
        .left{
            margin-left: 0.4rem;
        }
        .right{
            margin-right: 0.4rem;
        }
        .center{
            flex: 1;
            position: relative;
            .btn_box{
                padding-top: 0.1rem;
                box-sizing: border-box;
                width: 1.6rem;
                height: 1.1rem;
                position: absolute;
                bottom: 0.1rem;
                left:25%;
                background: $impColor;
                color: $white;
                z-index: 99;
                border-radius: 0.04rem;
                text-align: center;
                box-shadow:-4px 0px 6px $sublineColor, 4px 6px 12px $sublineColor;
                i{
                    font-size: 0.48rem;
                    color:$white;
                }
            }
        }
    }
    .footer_type2{
        width: 100%;
        height: 1rem;
        background: $white;
        display: flex;
        position: relative; 
        border-top: 1px solid $sublineColor;
        .left,.right{
            width: 50%;
            height: 100%;
            text-align: center;
            padding-top: 0.1rem;
            box-sizing: border-box;
            i{
                font-size: 0.4rem;
                color:$contenTextColor;
            }
            p{
                color: $shallowColor;
                margin-top: 0.06rem;
            }
        }
        .right{
            border-left: 1px solid $sublineColor;
        }
    }
    .footer_type3{
        width: 100%;
        height: 1rem;
        background: $white;
        display: flex;
        position: relative; 
        border-top: 1px solid $sublineColor;
        .left,.right{
            width: 50%;
            height: 100%;
            text-align: center;
            padding-top: 0.1rem;
            box-sizing: border-box;
            span{
                display: inline-block;
                width: 96%;
                height: 0.8rem;
                margin: 0 auto;
                color: $contenTextColor;
                line-height: 0.8rem;
                font-size: 0.36rem;
            }
        }
        .right{
            span{
                background: $impColor;
                border-radius: 0.04rem;
                color: $white;
                margin-top: 0;
                box-shadow:1px 3px 20px $shallowColor;
            }
        }
    }
}
</style>