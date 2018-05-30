<template>
    <div class="new-device-group">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/devgroup_mag" class="blue">设备组管理</router-link>
                <span>></span>
                <span>新建设备组</span>
            </span>
        </div>
        <div class="bottom">
            <div class="new-device-group-name clearfix">
                <span class="new-device-group-name-title fl">设备组名称</span>
                <span class="new-device-group-name-input fl">
                    <el-input v-model="deviceGroupName" placeholder="请填写设备组名称" style="width:50%"></el-input>
                </span>
            </div>
            <!--选择模板-->
            <div class="new-device-group-select-template" style="margin-top:10px">
                <div style="margin-top:10px;">
                    <div class="custom-template-select clearfix">
                            <span class="new-device-group-select-template-title fl" style="width:100px">选择模板</span>
                        <span class="fl" style="width:600px;">
                            <el-radio-group v-model="tempChecked" @change="change">
                                <el-radio :label="item.id" v-for="(item,index) in tempList" :key="index">{{item.name}}</el-radio>
                            </el-radio-group>
                        </span>
                    </div>
                </div>
            </div>
            <!--模板展示-->
             <div class="template-show grouptemplate_wrapper" v-show="tempChecked">
                <div class="template-show-info template_box">
                    <div class="simple-template-landscape-image template_center">
                        <div data-v-9caab684="" id="template_wrapper" class="mid pr center_main" v-html="item.content" v-for="(item,index) in tempList" :key="index" v-if="item.id==tempChecked"  :style="'width:'+item.width/2+'px;height:'+item.height/2+'px;'">
                        </div>
                    </div>
                </div>
            </div>
            <!--操作-->
            <div class="new-device-group-operation">
                <a href="javascript:;" class="yxf-but" @click="cdup">返回</a>
                <a href="javascript:;" class="yxf-but" @click="save">提交</a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'new-device-group',
    data() {
        return {
            tempList:[],//模板列表
            tempChecked:'',//展示选择的模板
            deviceGroupName:''//保存设备组名称
        }
    },
    methods: {
        cdup() {
            this.$router.go(-1);
        },
        handleClick(tab, event) {
        },
         // 获取模板信息
        getTempInfor() {
            this.$esellApi.send(
                "/template/options.shtml",
                {},
                res => {
                    this.tempList=res.payload;
                    this.tempChecked=res.payload[0].id;
                },
                res => {
                  this.message("error", res.message)
                }
            );
        },
        save(){
            let name=this.deviceGroupName.replace(/(^\s*)|(\s*$)/g, "");
            if(name!==""){
                this.$esellApi.send(
                    "/group/add.shtml",
                    {'name':name,'template-id':this.tempChecked},
                    res => {
                       this.$router.go(-1);
                    },
                    res => {
                         this.message("error", res.message)
                    }
                );
            }else{
                this.$message({
                    type: 'error',
                    message: '请输入设备组名称'
                }); 
            }
        }
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    created(){
        this.getTempInfor();
    }
}
</script>
<style lang="scss">
@import '../../sass/newDeviceGroup.scss';
@import "../../sass/showDeviceTemplate.scss";
// @import "../../sass/showTemplate.scss";
div.all .all,
div.onLine .onLine,
div.offLine .offLine {
    color: #fff;
    background-color: #ec414a;
}

#draggable {
    width: 150px;
    height: 150px;
    padding: 0.5em;
}
</style>

