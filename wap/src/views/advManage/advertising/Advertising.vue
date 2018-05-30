<template>
    <div class="adv">
        <Loading v-show="isLoading"></Loading>
        <Search :placeholder="placeholder" :intVal="intSearchVal" @searchVal="searchVal" @search="toSearch" @cancle="cancle"></Search>
        <div class="adv_box">
            <div class="adv_box_item" @click="addAdv">
                <i class="iF">&#xe69f;</i>
                <p>发布广告</p>
            </div>
            <div class="adv_box_item" @click="advPlan">
                <i class="iF">&#xe63d;</i>
                <p>推广计划管理</p>
            </div>
        </div>
        <div class="adv_navbar">
            <mt-navbar v-model="selectedAdv">
                <mt-tab-item id="0">全部广告</mt-tab-item>
                <mt-tab-item id="3-4">投放中</mt-tab-item>
                <mt-tab-item id="5">暂停中</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model=" selectedAdv">
                <mt-tab-container-item id="0">
                    <AdvList :list="listAll" @remove="remove" @clickItem="clickItem" @loadMore="loadMore" @refresh="refresh" v-if="listAll.length>0">
                    </AdvList>  
                    <div v-else class="img_wrapper">
                       <ImgContent  emptyInfor="暂无广告" addSomething="发布广告" @add="addAdv"></ImgContent>
                    </div>  
                </mt-tab-container-item>
                <mt-tab-container-item id="3-4">
                <AdvList :list='listEnable' @remove='remove' @clickItem="clickItem"  @refresh="refresh" @loadMore="loadMore" v-if="listEnable.length>0">
                </AdvList> 
                <div v-else class="img_wrapper">
                    <ImgContent emptyInfor="暂无广告" addSomething="发布广告" @add="addAdv"></ImgContent>
                </div>     
                </mt-tab-container-item>
                <mt-tab-container-item id="5">
                    <AdvList :list="listDisable" @remove="remove" @clickItem="clickItem" @loadMore="loadMore" @refresh="refresh" v-if="listDisable.length>0">
                    </AdvList>  
                     <div v-else class="img_wrapper">
                       <ImgContent emptyInfor="暂无广告" addSomething="发布广告" @add="addAdv"></ImgContent>
                    </div>  
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>

<script>
import Search from '@/components/search/search';
import Loading from '@/components/loading/loading';
import ImgContent from '@/components/imgContent/imgContent';
import AdvList from '@/components/advList/AdvList';
import { Navbar, TabItem, MessageBox,Toast } from 'mint-ui';
import searchVue from '../../../components/search/search.vue';
export default {
    components: {
        Search,
        Loading,
        AdvList,
        Navbar,
        TabItem,
        MessageBox,
        Toast,
        ImgContent,
    },
    data() {
        return {
            search:'',
            selectedAdv:'',
            active:'',
            listInfor:['soltId','name','creatTime','plan','status','url'],
            listAll: [],//保存全部广告数据列表
            listEnable: [],//保存投放中广告数据列表
            listDisable: [],//保存投放中广告数据列表
            page: 1, //保存当前页码
            size: 10,//保存每次加载的条数
            total:9,
            placeholder:"请输入搜索的广告名称",//传入搜索框的
            searchValue:"",//搜索框的输入值
            intSearchVal:"",
            isPull:false,
            isLoading:true,
        };
    },
    methods: {
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
        // 删除广告
        remove(data){
            MessageBox.confirm('您确定要删除此广告?删除后不可恢复!','温馨提示').then(action => {
                this.$esellApi.send("/api/ad/delete/batch.shtml", {
                    'ids': [data.id],
                }).then(res => {
                    this.getAdvInfor(true);
                    Toast({ message: "删除成功", position: 'middel', duration: 3000 });
                }).catch(res => {
                    this.content=res.message
                    this.showPopup=!this.showPopup;
                }) 
            }).catch(action => {
            }) ;
        },
        // 发布广告
        addAdv(){
            this.$router.push({name:'AddAdv'})
        },
        // 推广计划
        advPlan(){
            this.$router.push({name:'AdvPlan'})
        },
        // 广告被点击
        clickItem(data){
            let type="";
            let textContent="";
            let nameInfor="";
            console.log(data);
            // return;
            if(data['group-names']){
                if(data['group-names'].length>0){
                    nameInfor= data['group-names'][0]
                }
            }else if(data['device-names']){
                 if(data['device-names'].length>0){
                    nameInfor= data['device-names'][0]
                }
            }
            console.log(data)
            if(data['material-type']=="CONTENT"){
                type=2;
                textContent=eval('(' + data['material-content'] + ')').content;
                this.$router.push({name:'AdvDetails',query:{'num':data.id,"type":type,"content":textContent,'status':data.status,'name':nameInfor}})
            }else{
                type=1;
                this.$router.push({name:'AdvDetails',query:{'num':data.id,'src':data['cover-url-m'],"type":type,'status':data.status,'name':nameInfor}})
            }

        },
        // 加载更多
        loadMore(){
           if(!(Math.ceil(this.total/this.size)>=this.page)){
                Toast({
                    message: '已经是最后一页的数据了',
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
        getAdvInfor(type) {
            this.$esellApi.send("/api/ad/list/campaign.shtml", {
                "page": this.page,
                "size": this.size,
                "ad-status":this.selectedAdv,
                "name": this.searchValue,
            }).then(res => {
                this.isLoading=false;
                this.total=res.payload.total;
                if(this.selectedAdv=="0"){
                    if(type){
                        this.listAll = res.payload.data;
                    }else{
                        this.listAll = this.listAll.concat(res.payload.data);
                    }
                }else if(this.selectedAdv=="3-4"){
                    if(type){
                       this.listEnable = res.payload.data;
                    }else{
                        this.listEnable = this.listEnable.concat(res.payload.data);
                    }
                }else if(this.selectedAdv=="5"){
                    if(type){
                        this.listDisable = res.payload.data;
                    }else{
                        this.listDisable = this.listDisable.concat(res.payload.data);
                    }
                }
            }).catch(res => {
                this.isLoading=false;
                Toast({
                    message: res.message,
                    duration: 1000
                });
            })
        },
    },
    watch:{
        selectedAdv:function(val,val1){
            this.intSearchVal="";
            this.searchValue="";
            if((this.selectedAdv=="0"&&this.listAll.length==0)||this.isPull){
                this.getAdvInfor()
                this.isPull=false;
            }else if((this.selectedAdv=="3-4"&&this.listEnable.length==0)||this.isPull){
                this.getAdvInfor();
                this.isPull=false;
            }else if((this.selectedAdv=="5"&&this.listDisable.length==0)||this.isPull){
                this.getAdvInfor()
                this.isPull=false;
            }
        }
    },
    created(){
        if(this.$route.query.status){
            if(this.$route.query.status==1){
                this.selectedAdv="0"
            }else if(this.$route.query.status==2){
                this.selectedAdv="3-4"
            }
        }else{
            this.selectedAdv="0"  
        }
        // this.getAdvInfor();
    }
}

</script>
<style lang='scss'>
@import '../../../sass/advertising'
</style>