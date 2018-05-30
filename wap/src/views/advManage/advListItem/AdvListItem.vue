<template>
    <div class="advListItem">
        <Loading v-show="isLoading"></Loading>
        <div class="adv_title">
            <span>{{planName}}</span>
        </div>
        <AdvList :list="list" @remove="remove" @clickItem="clickItem" @loadMore="loadMore" @refresh="refresh" v-if="list.length>0">
        </AdvList>
        <Footer :list="footerList" :type="footerType" @remove="removePlan" @add="addAdv" @edit="editPlan"></Footer>
        <Infor :position="position" :duration="duration" :type="type" :content="content" :modal="modal" :showPopup="showPopup"></Infor>
    </div>
</template>

<script>
import Scroll from "@/components/scroll/Scroll";
import Loading from '@/components/loading/loading';
import AdvList from '@/components/advList/AdvList';
import Footer from '@/components/footer/advListFooter';
import Infor from "@/components/message/Message";
import { MessageBox, Toast } from 'mint-ui';
export default {
    components: {
        AdvList,
        Scroll,
        Footer,
        MessageBox,
        Infor,
        Loading,
        Toast
    },
    data() {
        return {
            list: [],//保存数据列表
            page: 1, //保存当前页码
            size: 10,//保存每次加载的条数
            total: 9,
            footerList: {
                'type': {
                    'icon': '&#xe69f;',
                    'text': '发布广告',
                    'color': '#ff5663;',
                },
                'left': '删除计划',
                'right': '编辑计划'
            },
            planId: '',//保存推广计划ID
            planName: '',//保存推广计划名字
            position: 'top',
            content: '',
            showPopup: false,
            modal: true,
            duration: '3000',
            type: 'error',
            footerType: '1',
            isLoading: true,
        };
    },
    methods: {
        clickItem(data) {
            let type = "";
            let textContent = "";
            let nameInfor = "";
            if (data['group-names']) {
                if (data['group-names'].length > 0) {
                    nameInfor = data['group-names'][0]
                }
            } else if (data['device-names']) {
                if (data['device-names'].length > 0) {
                    nameInfor = data['device-names'][0]
                }
            }
            if (data['material-type'] == "CONTENT") {
                type = 2;
                textContent = eval('(' + data['material-content'] + ')').content;
                this.$router.push({ name: 'AdvDetails', query: { 'num': data.id, "type": type, "content": textContent, 'status': data.status, 'name': nameInfor } })
            } else {
                type = 1;
                this.$router.push({ name: 'AdvDetails', query: { 'num': data.id, 'src': data['cover-url-m'], "type": type, 'status': data.status, 'name': nameInfor } })
            }
        },
        // 加载更多
        loadMore() {
            if (Math.ceil(this.total / this.size) >= this.page) {
                Toast({
                    message: '已经是最后一页的数据了',
                    duration: 1000
                });
            } else {
                this.page += 1;
                this.isLoading = true;
                this.getAdvInfor();
            }
        },
        // 刷新
        refresh() {
            this.page = 1;
            this.isLoading = true;
            this.getAdvInfor(true);
        },
        // 删除
        remove(data) {
            MessageBox.confirm('您确定要删除此广告?删除后不可恢复!', '温馨提示').then(action => {
                this.$esellApi.send("/api/ad/delete/batch.shtml", {
                    'ids': [data.id],
                }).then(res => {
                    this.$router.push({ name: 'AdvPlan' })
                }).catch(res => {
                    this.content = res.message
                    this.showPopup = !this.showPopup;
                })
            }).catch(action => {
            });
        },
        // 删除推广计划
        removePlan() {
            if (this.$route.query.default == "Y") {
                Toast({ message: "系统默认的推广计划无法删除", position: 'middel', duration: 3000 });
                return;
            }
            MessageBox.confirm('您确定要将此推广计划删除？').then(action => {
                this.$esellApi.send("/api/campaign/delete.shtml", {
                    'id': this.planId,
                }).then(res => {
                    this.$router.push({ name: 'AdvPlan' })
                }).catch(res => {
                    this.content = res.message
                    this.showPopup = !this.showPopup;
                })
            }).catch(action => {
            });
        },
        // 发布广告
        addAdv() {
            this.$router.push({ name: 'AddAdv', query: { 'checkedPlan': this.planId, 'planName': this.planName } })
        },
        // 编辑推广计划
        editPlan() {
            if (this.$route.query.default != "Y") {
                this.$router.push({ name: 'AddAdvPlan', query: { 'num': this.planId, 'name': this.planName } })
            } else {
                Toast({ message: "系统默认的推广计划无法编辑", position: 'middel', duration: 3000 });
            }
        },
        // 获取当前信息
        getAdvInfor(type) {
            this.$esellApi.send("/api/ad/list/campaign.shtml", {
                "page": this.page,
                "size": this.size,
                "campaign-id": this.planId,
            }).then(res => {
                this.isLoading = false;
                this.total = res.payload.total;
                if (type) {
                    this.list = res.payload.data;
                } else {
                    this.list = this.list.concat(res.payload.data);
                }
            }).catch(res => {
                this.isLoading = false;
                console.log(res);
            })
        },
    },
    watch: {
    },
    created() {
        this.planId = this.$route.query.num;
        this.planName = this.$route.query.name;
        this.getAdvInfor();
    }
}

</script>
<style lang='scss'>
.advListItem {
    // height: cale(100% - 1rem);
    height: 100%;
    padding-bottom: 1rem;
    box-sizing: border-box;
    .adv_title {
        width: 100%;
        height: 0.9rem;
        background: #fff;
        border-bottom: 1px solid #dedede;
        span {
            display: inline-block;
            width: 100%;
            height: 100%;
            line-height: 0.9rem;
            box-sizing: border-box;
            padding-left: 0.22rem;
            font-size: 0.3rem;
            color: #666;
        }
    }
    .adv_list {
        padding: 0;
    }
}
</style>