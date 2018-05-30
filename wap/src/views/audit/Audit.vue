<template>
    <div class="audit">
        <Loading v-show="isLoading"></Loading>
        <Search :placeholder="placeholder" :intVal="intSearchVal" @searchVal="searchVal" @search="toSearch" @cancle="cancle"></Search>
        <div class="audit_navbar">
            <mt-navbar v-model=" selectedAdv">
                <mt-tab-item id="1-2">全部广告</mt-tab-item>
                <mt-tab-item id="1">未审核</mt-tab-item>
                <mt-tab-item id="2">审核不通过</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model=" selectedAdv">
                <mt-tab-container-item id="1-2">
                    <AdvList :list="listAll" @remove="remove" @clickItem="clickItem" @loadMore="loadMore" @refresh="refresh" v-if="listAll.length>0">
                    </AdvList>  
                    <div v-else class="img_wrapper">
                        <ImgContent emptyInfor="暂无广告" addSomething="发布广告" @add="addAdv"></ImgContent>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="1">
                    <AdvList :list="listEnable" @remove="remove" @clickItem="clickItem" @loadMore="loadMore" @refresh="refresh" v-if="listEnable.length>0">
                    </AdvList>  
                    <div v-else class="img_wrapper">
                        <ImgContent emptyInfor="暂无广告" addSomething="发布广告" @add="addAdv"></ImgContent>
                    </div>   
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <AdvList :list="listDisable" @remove="remove" @clickItem="clickItem" @loadMore="loadMore" @refresh="refresh" v-if="listDisable.length>0">
                    </AdvList>  
                    <div v-else class="img_wrapper">
                        <ImgContent emptyInfor="暂无广告" addSomething="发布广告" @add="addAdv"></ImgContent>
                    </div>   
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
        <Infor :position="position" :duration="duration" :type="type" :content="content" :modal="modal" :showPopup="showPopup"></Infor>
    </div>
</template>

<script>
import Search from '@/components/search/search';
import Loading from '@/components/loading/loading';
import AdvList from '@/components/advList/AdvList';
import Infor from "@/components/message/Message";
import ImgContent from '@/components/imgContent/imgContent';
import {messageMixin} from '@/common/base.js';
import { Toast } from 'mint-ui';
const statusAll='1-2'
const statusEnable='1'
const statusDisable='2'
export default {
    mixins: [messageMixin],
    components: {
        Search,
        AdvList,
        Infor,
        Loading,
        Toast,
        ImgContent,
    },
    data() {
        return {
            listAll: [],//保存全部广告数据列表
            listEnable: [],//保存未审核广告数据列表
            listDisable: [],//保存审核不通过广告数据列表
            page: 1, //保存当前页码
            size: 10,//保存每次加载的条数
            total:9,//总条数
            selectedAdv:'',
            placeholder:"请输入搜索的广告名称",//传入搜索框的sss
            searchValue:"",//搜索框的输入值
            isPull:false,
            intSearchVal:"",
            isLoading:true,
        };
    },
    methods:{  
        toSearch(val){
            if(this.searchValue){
                this.getAdvInfor();
            }
        },
        searchVal(val){
            this.searchValue=val;
            this.intSearchVal=val;
        },
        cancle(){
            this.searchValue="";
            this.intSearchVal="";
            this.isPull=true;
            this.getAdvInfor();
        },
        // 发布广告
        addAdv(){
            this.$router.push({name:'AddAdv'})
        },
        // 广告被点击
        clickItem(data){
            let type="";
            let textContent="";
            if(data['material-type']=="CONTENT"){
                type=2;
                textContent=eval('(' + data['material-content'] + ')').content;
                this.$router.push({name:'ToAudit',query:{"type":type,"content":textContent,'num':data.id}})
            }else{
                type=1;
                this.$router.push({name:'ToAudit',query:{"type":type,"src":data['cover-url'],'num':data.id}})
            }
        }, 
        // 删除
        remove(data){
            this.$esellApi.send("/api/ad/delete/batch.shtml", {
                 'ids':[data.id],
             }).then(res => {
                this.getAdvInfor(true);
             }).catch(res => {
                this.content=res.message
                this.showPopup=!this.showPopup;
             })
        },
         // 加载更多
        loadMore(){
            if(!(Math.ceil(this.total/this.size)>=this.page)){
                Toast({
                    message: '没有更多了',
                    duration: 1000
                });
            }else{
                this.page+=1;
                this.isLoading=true;
                this.getAdvInfor();
            }
        },
        // 刷新
        refresh(){
            this.page=1;
            this.isLoading=true;
            this.getAdvInfor(true);
        },
        // 获取审核广告列表
        getAdvInfor(type) {
            this.$esellApi.send("/api/ad/list/audit.shtml", {
                "page": this.page,
                "size": this.size,
                "ad-status":this.selectedAdv,
                "name": this.searchValue,
            }).then(res => {
                this.isLoading=false;
                this.total=res.payload.total;
               if(this.selectedAdv==statusAll){
                   if(type){
                       this.listAll = res.payload.data;
                   }else{
                       this.listAll = this.listAll.concat(res.payload.data);
                   }
                }else if(this.selectedAdv==statusEnable){
                    if(type){
                       this.listEnable = res.payload.data;
                    }else{
                        this.listEnable = this.listEnable.concat(res.payload.data);
                    }
                }else if(this.selectedAdv==statusDisable){
                    if(type){
                        this.listDisable = res.payload.data;
                    }else{
                        this.listDisable = this.listDisable.concat(res.payload.data);
                    }
                }
            }).catch(res => {
                this.isLoading=false;
                this.content=res.message
                this.showPopup=!this.showPopup;
            })
        },
    },
    created(){
        if(this.$route.query.status){
            if(this.$route.query.status==1){
                this.selectedAdv="1"
            }else if(this.$route.query.status==2){
                this.selectedAdv="2"
            }
        }else{
            this.selectedAdv="1-2"  
        }
    },
    watch:{
        selectedAdv:function(){
            this.intSearchVal="";
            this.searchValue="";
            if((this.selectedAdv==statusAll&&this.listAll.length==0)||this.isPull){
                this.getAdvInfor();
                this.isPull=false;
            }else if((this.selectedAdv==statusEnable&&this.listEnable.length==0)||this.isPull){
                this.getAdvInfor();
                this.isPull=false;
            }else if((this.selectedAdv==statusDisable&&this.listDisable.length==0)||this.isPull){
                this.getAdvInfor();
                this.isPull=false;
            }
        }
    }
}

</script>
<style lang='scss'>
@import '../../sass/audit'
</style>