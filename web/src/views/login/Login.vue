<template>
    <div class="login">
        <div class="header">
            <img :src="this.$store.getters.getIMG" :alt="this.$store.getters.getText">
        </div>

        <!-- 官方版 -->
        <div v-if="this.$store.getters.isNewbp">
            <div class="nav">
                <div v-bind:class="active" v-on:click.prevent>
                    <a href="javascript:;" class="summarize" v-on:click="makeActive('summarize',1)">平台概览</a>
                    <a href="javascript:;" class="case" v-on:click="makeActive('case',2)">案例场景</a>
                    <a href="javascript:;" class="expenses" v-on:click="makeActive('expenses',3)">套餐资费</a>
                </div>
            </div>
            <!--<router-view :message="message"></router-view>-->
            <div v-show="atPresent=='1'">
                <div class="summarize">
                    <div class="banner">
                        <div class="inner clearfix">
                            <div class="banner-text fl">
                                <!--{{info}}-->
                                <h3>专业的云信息发布系统</h3>
                                <h5>高效快捷，指定投放</h5>
                                <p>专门为有液晶广告屏的媒体方，中小型企业，商家提供的一套云信息发布系统 。 {{this.$store.getters.getText}}信息发布系统是集实用性，自主性于一体，融合了快速接入广告屏技术， 数字流媒体播放技术，网络传输技术和分布式大数据计算，提供一个集中、灵 活、高效的数字媒体播放和信息发布的统一管理平台。功能丰富、 操作简便、 技术领先，{{this.$store.getters.getText}}，让信息发布更简单。</p>
                            </div>
                            <div class="form fr">
                                <Form :message="isCollapse" @goodsCountEvent="goodsCount"></Form>
                            </div>
                        </div>
                    </div>
                    <!--核心优势-->
                    <div class="yxf-advantage" id="yxf-advantage" style="width:100%;">
                        <!--title优势-->
                        <div style="width:1200px;margin:0 auto;">
                            <div class="yxf-advantage-titel">
                                <h3 id="yxf-advantage-first-line">核心优势</h3>
                                <div class="line clearfix" id="yxf-advantage-second-line">
                                    <div class="one fl"></div>
                                    <div class="two fl"></div>
                                </div>
                            </div>
                            <div class="clearfix yxf-advantage-youshi">
                                <div class="yxf-advantage-one fl" style="width:20%" id="yxf-advantage-thrid-line">
                                    <div id="box-upslope"></div>
                                    <h4>低成本</h4>
                                    <p>
                                        <i class="iF iF-dot"></i>省钱</p>
                                    <p>
                                        <i class="iF iF-dot"></i>省力</p>
                                    <p>
                                        <i class="iF iF-dot"></i>省时间</p>
                                </div>
                                <div class="yxf-advantage-two fl" style="width:20%" id="yxf-advantage-four-line">
                                    <div></div>
                                    <h4>方便极简</h4>
                                    <p>
                                        <i class="iF iF-dot"></i>PC/移动端管理</p>
                                    <p>
                                        <i class="iF iF-dot"></i>远程控制</p>
                                    <p>
                                        <i class="iF iF-dot"></i>自定义分屏</p>
                                </div>
                                <div class="yxf-advantage-three fl" style="width:20%" id="yxf-advantage-five-line">
                                    <div></div>
                                    <h4>大数据</h4>
                                    <p>
                                        <i class="iF iF-dot"></i>多维度数据报表</p>
                                    <p>
                                        <i class="iF iF-dot"></i>轻松监控广告数据</p>
                                    <p>
                                        <i class="iF iF-dot"></i>一目了然</p>
                                </div>
                                <div class="yxf-advantage-four fl" style="width:20%" id="yxf-advantage-six-line">
                                    <div></div>
                                    <h4>安全可靠</h4>
                                    <p>
                                        <i class="iF iF-dot"></i>无限量云存储</p>
                                    <p>
                                        <i class="iF iF-dot"></i>物联网云技术</p>
                                    <p>
                                        <i class="iF iF-dot"></i>分布式软件架构</p>
                                </div>
                                <div class="yxf-advantage-five fl" style="width:20%" id="yxf-advantage-serven-line">
                                    <div></div>
                                    <h4>闲时变现</h4>
                                    <p>
                                        <i class="iF iF-dot"></i>设备可设置为公有</p>
                                    <p>
                                        <i class="iF iF-dot"></i>请求来自易售的广告</p>
                                    <p>
                                        <i class="iF iF-dot"></i>轻松变现</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--成本-->
                    <div class="yxf-costing" id="costing" style="width:100%;">
                        <div style="width:1200px;margin:0 auto;" class="clearfix">
                            <div class="yxf-costing-info fl" style="width:50%" id="yxf-costing-info">
                                <div class="slideInUp1">
                                    <h3 id="costing-first-line">{{this.$store.getters.getText}}帮您大幅度降低媒体运营成本</h3>
                                    <h5 id="costing-second-line">高性价比，&nbsp;0&nbsp;成本运维</h5>
                                    <div class="visible-lg">
                                        <p id="costing-third-line">省钱：使用{{this.$store.getters.getText}}，每年中断设备至少可
                                            <span class="color">节省500元</span>
                                        </p>
                                        <p id="costing-four-line">
                                            <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;</i>无需企业自建服务器，
                                            <span class="color">省1万</span>
                                        </p>
                                        <p id="costing-five-line">
                                            <i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;·&nbsp;</i>无需技术人员维护，
                                            <span class="color">省10万</span>
                                        </p>
                                        <p id="costing-six-line">省力：云平台，助您彻底摆脱部署，运维和升级困扰，云端管理、免费升级</p>
                                        <p id="costing-senver-line">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;化繁为简，功能直观，系统操作简单，上手容易，会上网就会用{{this.$store.getters.getText}}</p>
                                        <p id="costing-eight-line">省心：有问题找易售，
                                            <span class="color">7x24小时</span>电话服务，随时为客户提供解忧排难</p>
                                    </div>
                                </div>
                            </div>
                            <div class="yxf-costing-map fl" style="width:50%" id="yxf-costing-map">
                                <div>
                                    <img class="img" src="../../assets/images/imgs/smallone1.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--操作-->
                    <div class="yxf-operation" id="yxf-operation">
                        <h3 id="yxf-operation-first-line">操作方便快捷，双平台联动</h3>
                        <div class="container-fluid" style="width:1200px;margin:0 auto;">
                            <div class="row clearfix" style="width:100%">
                                <div class="yxf-operation-left fl" style="width:50%" id="yxf-operation-left">
                                    <img class="img" src="../../assets/images/imgs/smalltwo1.png" alt="">
                                    <p id="yxf-operation-second-line">支持PC/微信公众号双平台操作</p>
                                    <p id="yxf-operation-third-line">无需下载APP</p>
                                </div>
                                <div class="yxf-operation-right fl" style="width:50%" id="yxf-operation-right">
                                    <img class="img" src="../../assets/images/imgs/smallthree1.png" alt="">
                                    <p id="yxf-operation-four-line">手机扫一扫快速添加设备</p>
                                    <p id="yxf-operation-five-line">也可PC端手动极速添加</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--模板-->
                    <div class="yxf-template" id="yxf-template" style="width:100%">
                        <div class="row clearfix" style="width:1200px;margin:0 auto">
                            <div class="yxf-template-left fl" style="width:50%">
                                <img class="img" src="../../assets/images/imgs/smallfour1.png" alt="">
                            </div>
                            <div class="yxf-template-right fl" id="yxf-template-right" style="width:50%">
                                <h3 id="yxf-template-first-line">系统自带多种分屏模板，</h3>
                                <h3 id="yxf-template-second-line">也可自定义设置模板</h3>
                                <p class="color" id="yxf-template-third-line">预设模板
                                    <i>&nbsp;·&nbsp;</i>一键调用：</p>
                                <p id="yxf-template-four-line">软件自带丰富模板，一键调用实现广告快速发布</p>
                                <p class="color" id="yxf-template-five-line">自定义模板
                                    <i>&nbsp;·&nbsp;</i>随心编辑：</p>
                                <p id="yxf-template-six-line">满足多样性需求，所见即所得，轻松实现自定义展示效果</p>
                            </div>
                        </div>
                    </div>
                    <!--素材-->
                    <div class="yxf-material" id="yxf-material" style="width:100%">
                        <div class="row clearfix" style="width:1200px;margin:0 auto;">
                            <div class="yxf-material-info fl" style="width:50%" id="yxf-material-info">
                                <h3 id="yxf-material-first-line">素材库持续更新，海量素材供您随心调用</h3>
                                <p id="yxf-material-second-line">海量素材陆续上线中，丰富行业模板满足客户多种需求，告别</p>
                                <p id="yxf-material-thrid-line">美工时代，人人都是设计师</p>
                            </div>
                            <div class="yxf-material-map fl" style="width:50%">
                                <img class="img" src="../../assets/images/imgs/smallfive1.png" alt="">
                            </div>
                        </div>
                    </div>
                    <!--设备监控-->
                    <div class="yxf-equipment-monitoring" id="yxf-equipment-monitoring" style="width:100%">
                        <div class="row clearfix" style="width:1200px;margin:0 auto">
                            <div class="yxf-equipment-monitoring-left fl" id="yxf-equipment-monitoring-left" style="width:50%">
                                <img class="img" src="../../assets/images/imgs/smallsix1.png" alt="">
                            </div>
                            <div class="yxf-equipment-monitoring-right fl" id="yxf-equipment-monitoring-right" style="width:50%">
                                <h3 id="yxf-equipment-monitoring-first-line">远程设备监控，异常及时报警</h3>
                                <p class="color" id="yxf-equipment-monitoring-second-line">远程设备监控：</p>
                                <p id="yxf-equipment-monitoring-thrid-line">无需繁琐内容制作，软件自带丰富模板，只需点击模板广告位</p>
                                <p id="yxf-equipment-monitoring-four-line">上传对应素材</p>
                                <p class="color" id="yxf-equipment-monitoring-five-line">屏幕定时截图：</p>
                                <p id="yxf-equipment-monitoring-six-line">实时监测播放状态，投播进程清晰可见</p>
                            </div>
                        </div>
                    </div>
                    <!--变现-->
                    <div class="yxf-realization" id="yxf-realization" style="width:100%">
                        <div class="row clearfix" style="width:1200px;margin:0 auto">
                            <div class="yxf-realization-info fl" id="yxf-realization-info" style="width:50%">
                                <h3 id="yxf-realization-first-line">{{this.$store.getters.getText}}给您带来广告主，</h3>
                                <h3 id="yxf-realization-second-line">让闲置的屏幕资源轻松变现</h3>
                                <p id="yxf-realization-thrid-line">只要将设备设置成公有设备</p>
                                <p id="yxf-realization-four-line">提供空闲时间段，即可请求播放来自易售的广告</p>
                                <p id="yxf-realization-five-line">广告一键审核，广告收益一目了然，轻松提现</p>
                            </div>
                            <div class="yxf-realization-map fl" style="width:50%">
                                <img class="img" src="../../assets/images/imgs/smallserven1.png" alt="">
                            </div>
                        </div>
                    </div>
                    <!--大数据-->
                    <div class="yxf-big-data" id="yxf-big-data" style="width:100%">
                        <div class="row clearfix" style="width:1200px;margin:0 auto">
                            <div class="yxf-big-data-left fl" style="width:50%">
                                <img class="img" src="../../assets/images/imgs/smalleight1.png" alt="">
                            </div>
                            <div class="yxf-big-data-right fl" id="yxf-big-data-right" style="width:50%">
                                <h3 id="yxf-big-data-first-line">大数据处理，报表清晰，</h3>
                                <h3 id="yxf-big-data-first-line">一切尽在掌握</h3>
                                <p id="yxf-big-data-second-line">专业的广告展现量数据统计形式，让用户清晰明了的查看各个</p>
                                <p id="yxf-big-data-thrid-line">时段的广告数据展现量，支持数据展现量报表下载，支持用户</p>
                                <p id="yxf-big-data-four-line">查看操作日志</p>
                            </div>
                        </div>
                    </div>
                    <!--安全可靠-->
                    <div class="yxf-safe-and-reliable visible-lg" id="yxf-safe-and-reliable">
                        <div class="yxf-safe-and-reliable-titel">
                            <h3 id="yxf-safe-and-reliable-first-line">{{this.$store.getters.getText}}全方位安全可靠</h3>
                            <div class="line clearfix" id="yxf-safe-and-reliable-second-line">
                                <div class="one fl"></div>
                                <div class="two fl"></div>
                            </div>
                        </div>
                        <div class="container-fluid visible-lg" id="yxf-safe-and-reliable-all-ele" style="width:100%">
                            <div class="row clearfix" style="margin:0 auto;width:1200px;text-align:center">
                                <div class="yxf-safe-and-reliable-one fl" id="yxf-safe-and-reliable-third-line" style="width:33.33%">
                                    <div></div>
                                    <h4>终端安全</h4>
                                    <p>权限认证，通道加密，数据指纹</p>
                                    <p>保证终端安全播放</p>
                                </div>
                                <div class="yxf-safe-and-reliable-two fl" id="yxf-safe-and-reliable-four-line" style="width:33.33%">
                                    <div></div>
                                    <h4>数据安全</h4>
                                    <p>
                                        云服务器可存储海量数据</p>
                                    <p>
                                        数据安全，不担心丢失</p>
                                </div>
                                <div class="yxf-safe-and-reliable-three fl" id="yxf-safe-and-reliable-five-line" style="width:33.33%">
                                    <div></div>
                                    <h4>架构安全</h4>
                                    <p>
                                        服务器架构-读写模块分离</p>
                                    <p>
                                        确保系统高效运行流畅</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="atPresent=='2'">
                <div class="case">
                    <div class="banner">
                        <div class="text">
                            <h5>信息发布可以这么简单</h5>
                            <p>无论您是用于哪种商用场所（购物中心、零售店、咖啡店、金融机构、企业前台等等），</p>
                            <p>您都可以用{{this.$store.getters.getText}}为您提供工具，创建属于自己的信息发布平台。</p>
                        </div>
                    </div>
                    <div class="exhibition">
                        <h3>案例场景展示</h3>
                        <div class="content clearfix">
                            <div class="enterprise dispaly fl">
                                <div class="enterprise-img size"></div>
                                <p>企业</p>
                            </div>
                            <div class="cinema dispaly fl">
                                <div class="cinema-img size"></div>
                                <p>影院</p>
                            </div>
                            <div class="restaurant dispaly fl">
                                <div class="restaurant-img size"></div>
                                <p>餐厅</p>
                            </div>
                            <div class="si-shop dispaly fl">
                                <div class="si-shop-img size"></div>
                                <p>4S店</p>
                            </div>
                            <div class="gallery dispaly fl">
                                <div class="gallery-img size"></div>
                                <p>展厅</p>
                            </div>
                            <div class="market dispaly fl">
                                <div class="market-img size"></div>
                                <p>商场</p>
                            </div>
                            <div class="supermarket dispaly fl">
                                <div class="supermarket-img size"></div>
                                <p>超市</p>
                            </div>
                            <div class="hotel dispaly fl">
                                <div class="hotel-img size"></div>
                                <p>酒店</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="atPresent=='3'">
                <div class="expenses">
                    <div class="banner">
                        <div class="content">
                            <h3>个人版</h3>
                            <h4>轻松加入，快速投放</h4>
                            <div class="taocan clearfix">
                                <div class="fl taocan-month">
                                    <div class="month">
                                        <h5>包月超值云套餐</h5>
                                        <ul>
                                            <li>1GB存储空间</li>
                                            <li class="left">台终端设备</li>
                                        </ul>
                                        <p>低至：15元 / 月</p>
                                    </div>
                                </div>
                                <div class="fl taocan-half-a-year">
                                    <div class="half-a-year">
                                        <h5>半年超值云套餐</h5>
                                        <ul>
                                            <li>1GB存储空间</li>
                                            <li class="left">台终端设备</li>
                                        </ul>
                                        <p>低至：80元 / 半年</p>
                                    </div>
                                </div>
                                <div class="fl taocan-one-year">
                                    <div class="one-year">
                                        <h5>全年超值云套餐</h5>
                                        <ul>
                                            <li>1GB存储空间</li>
                                            <li class="left">台终端设备</li>
                                        </ul>
                                        <p>低至：120元 / 年</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer">
                <p>关键词搜索：{{this.$store.getters.getText}} 技术支持：深圳市易售科技有限公司 联系QQ：254348970</p>
            </div>
        </div>
        <!-- 中性版 -->
        <div v-else>
            <div style="padding-top:150px;">
                <Form style="border: 2px solid #aaa; border-radius:5px;box-shadow:inset 2px 2px 2px #FF0000;"></Form>
            </div>
        </div>
    </div>
</template>
<script>
import Form from "./form/Form.vue"
export default {
    name: 'login',
    components: { Form },
    data() {
        return {
            isActive1: false,
            active: 'summarize',
            atPresent: '1',
        }
    },
    created() {
        const token = localStorage.getItem("token");
        if(token){
            this.$router.push({ path: "/home" })
        }
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    beforeCreate() {
        console.log("创建login页面完成");
    },
    methods: {
        makeActive: function(str, index) {
            this.active = str;
            this.atPresent = index;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../sass/login.scss';
div.summarize .summarize,
div.case .case,
div.expenses .expenses {
    border-bottom: 2px solid #eb4243;
}
</style>

