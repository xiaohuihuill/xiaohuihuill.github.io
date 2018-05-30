<template>
    <div class="template-manage" style="height:100%;width:100%;">
        <Loading v-show="isLoading"></Loading>
        <TemplateList :list="list" @scroll="moveIng" @scrollToEnd="scrollToEnd" @remove="remove" @clickItem="clickItem" v-if="list.length>0">
        </TemplateList>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'
import Loading from '@/components/loading/loading';
import TemplateList from '@/components/templateList/TemplateList';
export default {
    name: "templateManage",
    components: {
        TemplateList,
        Loading,
        Toast
    },
    data() {
        return {
            isLoading: false,
            list: [],
            page: 1,
            size: 6,
        };
    },
    created() {
        this.getTemplateListData();
    },
    methods: {
        getTemplateListData(type) {
            this.isLoading = true;
            this.$esellApi.send("/api/template/list.shtml", {
                page: this.page,
                size: this.size
            }).then(res => {
                this.isLoading = false;
                if (this.page && this.page == 1 || type) {
                    this.list = res.payload.data;
                } else {
                    this.list = this.list.concat(res.payload.data);
                }
                this.total = res.payload.total;
            }).catch(res => {
                this.isLoading = false;
            })
        },
        addDevice() {
            this.$router.push({ path: "/add_dev" })
        },
        //设备组管理
        deviceGroupManage() {
            this.$router.push({ path: "/dev_group" })
        },
        // 点击了设备详情
        clickItem(data) {
        },
        // 删除当前设备广告
        remove(data) {
            MessageBox.confirm('确定执行此操作?').then(action => {
                this.$esellApi.send("/api/template/delete.shtml", {
                    id: data.id
                }).then(res => {

                    Toast({
                        message: '删除操作成功',
                        iconClass: 'icon icon-success'
                    });
                }).catch(res => {
                    // this.popupValue = true;
                    Toast({
                        message: "取消操作",
                        iconClass: 'icon icon-success'
                    });
                });
            }).catch(() => {
                this.popupValue = true;
                this.slots = "aaaaa";
            });
        },
        scrollToEnd() {
            this.canAjax = true;
        },
        moveIng(data, y, maxY) {
            if (Math.abs(y) - Math.abs(maxY) > 20) {
                if (this.canAjax) {
                    this.canAjax = false;
                    if (this.total > (this.page * this.size)) {
                        this.page++;
                        this.getTemplateListData();
                    } else {
                        this.page = this.page
                        Toast({
                            message: '已经是最后一页的数据了',
                            position: 'middle',
                            duration: 3000
                        })
                    }
                }
            } else if (data.y > 50) {
                if (this.canAjax) {
                    this.canAjax = false;
                    this.page = 1;
                    this.getTemplateListData(true)
                }
            }
        },
    }
}

</script>
<style lang='scss' scoped>

</style>