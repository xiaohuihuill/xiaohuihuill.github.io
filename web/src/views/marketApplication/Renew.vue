<template>
    <div class="renew">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/market_application" class="blue">市场应用</router-link>
                <span>></span>
                <span>续费</span>
            </span>
        </div>
        <div class="bottom">
            <div>即将为设备号
                <span>10000000123</span>&nbsp;,&nbsp;
                <span>112121312132321</span>设备续费</div>
            <div style="margin-top:14px;">请选择续费时间</div>

            <div style="margin-top:14px;">
                <div class="clearfix">
                    <div v-for="(item,index) in list" :key="index" class="fl lifelong" :class="{'isActive':index==Index}" @click="selectRenewTime(item.type,item.cost,index)">
                        <i></i>
                        <span>{{item.name}} &nbsp; &nbsp;{{item.cost}}元/台</span>
                    </div>
                </div>
            </div>
            <div style="margin-top:14px;">
                <span style="margin-right:10px;">续费金额</span>
                <span class="yxf-color">{{cost}}元</span>
            </div>
            <div style="margin-top:14px;">
                <span style="margin-right:10px;">支付方式</span>
                <span>
                    <span style="margin-right:10px;">
                        <el-radio class="radio" v-model="radio" label="1">支付宝</el-radio>
                    </span>
                    <span>
                        <el-radio class="radio" v-model="radio" label="2">微信</el-radio>
                    </span>
                </span>
            </div>
            <div style="margin-top:20px;">
                <a class="yxf-but" style="margin-right:6px;" @click="cdup">返回</a>
                <a class="yxf-but">生成订单</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'renew',
    data() {
        return {
            Index: "0",
            bg: "lifelong",
            list: [],
            cost: 200,
            radio:'1',
        }
    },
    mounted() {
        this.list = [{
            type: "lifelong",
            name: "终身",
            cost: 200
        }, {
            type: "oneYear",
            name: "一年",
            cost: 120
        }, {
            type: "halfAYear",
            name: "半年",
            cost: 80
        }, {
            type: "oneMonth",
            name: "一个月",
            cost: 15
        }]
        this.$esellApi.checkPermissions();
    },
    methods: {
        cdup() {
            this.$router.go(-1);
        },
        selectRenewTime(str, cost, index) {
            this.Index = index;
            this.cost = cost;
            console.log(str);
        }
    },
    watch: {
    }
}
</script>
<style lang="scss" scoped>
@import '../../sass/renew.scss';

.bottom .lifelong.isActive {
    border: 1px solid #ff635c;
    color: #ff635c;
}

// 三角
div .isActive:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    height: 0px;
    width: 0px;
    border-top: solid 40px #ff635c;
    border-left: solid 40px transparent;
}

// 勾
i {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 1;
    display: inline-block;
    width: 8px;
    height: 2px;
    background: #fff;
    line-height: 0;
    font-size: 0;
    vertical-align: middle;
    -webkit-transform: rotate(45deg);
}

i:after {
    content: '';
    display: block;
    width: 16px;
    height: 2px;
    background: #fff;
    -webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
}
</style>

