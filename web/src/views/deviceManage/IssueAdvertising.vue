<template>
    <div class="issue-advertising">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/dev_mag" class="blue">设备管理</router-link>
                <span>></span>
                <span>发布广告</span>
            </span>
        </div>
       <AddAdvs @clickInter="changeTemp" @toMainTemp="toMainTemp" :tempInfor="tempInfor" :id="deviceId" :type="1" :name="name"> </AddAdvs> 
    </div>
</template>
<script>
import AddAdvs from "../addAdv/addAdv";
export default {
    components: {
        AddAdvs
    },
    data() {
        return {
            tempInfor:"",//保存模板信息
            deviceId:"",
            name:'',//设备名称
            isRef:false,//是否为互动按钮互相跳转
        };
    },
    created() {
        if(!this.isRef){
            this.deviceId=this.$route.query.num;
            this.name=this.$route.query.name;
            this.getInfor({'device-id':this.$route.query.num});
        }
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        cdup() {
            this.$router.go(-1);
        },
        // 返回主模板
        toMainTemp(){
            this.getInfor({'device-id':this.$route.query.num})
        },
        // 获取模板信息
        getInfor(data){
            this.$esellApi.send(
                "/template/detail.shtml",
                data,
                res => {
                    if(res.payload){
                        this.tempInfor= res.payload;
                    }else{
                        this.$message({
                        type: 'error',
                        message:'未读取到模板数据',
                        }); 
                    }
                },
                res => {
                    this.$message({
                        type: 'error',
                        message:res.message,
                    }); 
                }
            );
        },
        changeTemp(data,type){
            this.isRef=true;
            if(type==4){
                if(data<0){
                   this.$message({
                        type: 'error',
                        message:'当前互动按钮非模板类型'
                    }); 
                }else{
                   this.getInfor({'template-id':data});
                }
            }else{
                this.$message({
                    type: 'error',
                    message:'当前互动按钮非模板类型'
                });
            }
        }
    },
};
</script>
<style lang="scss" scoped>
@import "../../sass/issueAdvertising.scss";
</style>


