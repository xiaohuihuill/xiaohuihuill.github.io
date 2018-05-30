<!--编辑设备-->
<template>
    <div class="manual-add-device edit_device">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/dev_mag" class="blue">设备管理</router-link>
                <span>></span>
                <span>编辑设备</span>
            </span>
        </div>
        <div class="bottom">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
                <el-form-item label="设备编号">
                    <el-input style="max-width:513px;" v-model="ruleForm.uuid" placeholder="请填写设备编号" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="设备名称" prop="name">
                    <el-input style="max-width:513px;" v-model="ruleForm.name" placeholder="请填写设备名称"></el-input>
                </el-form-item>
                <div class="material-name clearfix" style="margin-top:20px;height:30px;line-height:30px;">
                    <span class="material-name-left fl" style="min-width:100px;">
                        所在地区</span>
                    <span class="material-name-right fl">
                        <el-cascader clearable style="min-width:513px;" placeholder="请选择省市区" :options="provinceList" filterable v-model="ruleForm.province"></el-cascader>
                    </span>
                </div>
                <div class="material-name clearfix" style="margin-top:20px;height:30px;line-height:30px;">
                    <span class="material-name-left fl" style="min-width:100px;">
                        详细地址</span>
                    <span class="material-name-right fl">
                        <el-input style="min-width:513px;" v-model="ruleForm.address" placeholder="请填写详细地址"></el-input>
                    </span>
                </div>
                <div class="material-name clearfix" style="margin-top:20px;height:30px;line-height:30px;">
                    <span class="material-name-left fl" style="min-width:100px;">
                        开放设备</span>
                    <span class="material-name-right fl">
                        <el-select clearable v-model="ruleForm.publicDevice" placeholder="请选择开放设备" style="min-width:513px;">
                            <el-option v-for="item in devicePublicStatus" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </span>
                </div>
                <div class="material-name clearfix" style="margin-top:20px;height:30px;line-height:30px;">
                    <span class="material-name-left fl" style="min-width:100px;">
                        添加到设备组</span>
                    <span class="material-name-right fl">
                        <el-select clearable v-model="ruleForm.deviceGroup" placeholder="请选择设备组" style="min-width:513px;">
                            <el-option v-for="item in deviceGroupList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </span>
                </div>
                <div class="material-name clearfix" style="margin-top:20px;height:30px;line-height:30px;">
                    <span class="material-name-left fl" style="min-width:100px;">
                        公司名称</span>
                    <span class="material-name-right fl">
                        <el-input style="min-width:513px;" v-model="ruleForm.companyName" placeholder="请填写公司名称"></el-input>
                    </span>
                </div>
                <div class="material-name clearfix" style="margin-top:20px;height:30px;line-height:30px;">
                    <span class="material-name-left fl" style="min-width:100px;">
                        申请人</span>
                    <span class="material-name-right fl">
                        <el-input style="min-width:513px;" v-model="ruleForm.proposer" placeholder="请填写申请人"></el-input>
                    </span>
                </div>
                <div class="material-name clearfix" style="margin-top:20px;height:30px;line-height:30px;">
                    <span class="material-name-left fl" style="min-width:100px;">
                        联系人电话</span>
                    <span class="material-name-right fl">
                        <el-input style="min-width:513px;" v-model="ruleForm.linkman" placeholder="请填写联系人电话"></el-input>
                    </span>
                </div>
                <div class="material-name clearfix" style="margin-top:20px;height:30px;line-height:30px;">
                    <span class="material-name-left fl" style="min-width:100px;">
                        安装人</span>
                    <span class="material-name-right fl">
                        <el-input style="min-width:513px;" v-model="ruleForm.install" placeholder="请填写安装人"></el-input>
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
                <div class="template-show addtemplate_wrapper" v-show="tempChecked">
                    <div class="template-show-info template_box">
                        <div class="simple-template-landscape-image template_center">
                            <div data-v-9caab684="" id="template_wrapper" class="mid pr center_main" v-html="item.content" v-for="(item,index) in tempList" :key="index" v-if="item.id==tempChecked">
                            </div>
                        </div>
                    </div>
                </div>
                <el-form-item style="margin-top:20px;">
                    <a class="yxf-but" style="margin-left:6px;" @click="cdup">返 回</a>
                    <a class="yxf-but" @click="resetForm('ruleForm')" style="margin-left:6px;">重 置</a>
                    <el-button type="primary" @click="submitForm('ruleForm')">保存设置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'manual-add-device',
    data() {
        const checkName = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入设备名称'));
            } else {
                callback();
            }
        }
        return {
            ruleForm: {
                uuid: "",
                name: "",
                deviceGroup: "",
                publicDevice: "",
                province: [],
                companyName: "",
                proposer: "",
                linkman: "",
                install: "",
                address: "",
            },
            rules: {
                name: [
                    { required: true, trigger: 'blur', validator: checkName },
                ],
            },
            page:1,
            size:10,
            listCount:0,
            list: null,
            all: 40,
            ishide: true,
            active: "all",
            area: '',
            checked: true,
            Index: "0",
            value2: "",
            deviceGroupList: [],
            devicePublicStatus: [
                {
                    value: 'Y',
                    label: '开放'
                }, {
                    value: 'N',
                    label: '不开放'
                },
            ],
            provinceList: [],//省份列表
            tempList: [],//模板列表信息
            tempChecked: '',//选中的模板
            deviceId: '',//保存从父组件传入的设备ID
            intGroup: [],//获取设备信息时后台返回的设备组信息
            init: {},
        }
    },
    created() {
        // 发送请求拿到页面表格数值赋值给list
        if (!this.$route.params.id) {
            this.$router.go(-1);
            return;
        } else {
            this.getInfor({ 'id': this.$route.params.id })
            this.getTempInfor();
        }
        this.deviceId = this.$route.params.id
        this.provinceList = this.$route.params.province;
        this.deviceGroupList = this.$route.params.groupInfor;

    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        aaa() {
            console.log(this.$refs.one);
        },
        change(val) {
            console.log(11111, val)
        },
        cdup() {
            this.$router.go(-1);
        },
        // 获取模板信息
        getTempInfor() {
            this.listCount = 0;
            this.page = 1,
            this.tempList = [];
            this.repeating();
        },
        repeating(){
            let that = this;
            this.$esellApi.send(
                "/template/templatePaging.shtml",
                {
                    page: this.page,
                    size: this.size
                },
                res => {
                    for(let index in res.payload.data){
                        that.tempList.push(res.payload.data[index]);
                    }
                    that.listCount += res.payload.size;
                    this.page++;
                    if(that.listCount < res.payload.total){
                        setTimeout(() => {
                            that.repeating();
                        }, 50);
                    }
                },
                res => {
                    this.$message({
                        type: "error",
                        message: res.message,
                    });
                }
            );
        },
        // 获取设备信息
        getInfor(data) {
            this.$esellApi.send(
                "/device/show.shtml",
                data,
                res => {
                    this.ruleForm.uuid = res.payload.uuid;
                    this.ruleForm.name = res.payload.name;
                    this.ruleForm.address = res.payload.address;
                    this.ruleForm.province = res.payload['district-codes'];
                    this.ruleForm.publicDevice = res.payload.open;
                    this.ruleForm.proposer = res.payload.applicant;
                    this.ruleForm.linkman = res.payload.phone;
                    this.ruleForm.install = res.payload.installer;
                    this.ruleForm.deviceGroup = res.payload['group-name'];
                    this.tempChecked = res.payload['template-id'];
                    this.intGroup[res.payload['group-name']] = res.payload['group-id'];
                    this.init = {
                        'uuid': res.payload.uuid,
                        'name': res.payload.name,
                        'deviceGroup': res.payload['group-name'],
                        'publicDevice': res.payload.open,
                        'province': res.payload['district-codes'],
                        'companyName': "",
                        'proposer': res.payload.applicant,
                        'linkman': res.payload.phone,
                        'install': res.payload.installer,
                        'address': res.payload.address,
                    }
                },
                res => {
                    this.$message({
                        type: "error",
                        message: res.message,
                    });
                }
            );
        },
        // 提交方法
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$esellApi.send(
                        "/device/update.shtml",
                        {
                            'id': this.deviceId,
                            'name': this.ruleForm.name,
                            'district-code': this.ruleForm.province ? this.ruleForm.province[this.ruleForm.province.length - 1] : '',
                            'address': this.ruleForm.address,
                            'group-id': this.intGroup[this.ruleForm.deviceGroup] ? this.intGroup[this.ruleForm.deviceGroup] : this.ruleForm.deviceGroup,
                            'open': this.ruleForm.publicDevice,
                            'applicant': this.ruleForm.proposer,
                            'phone': this.ruleForm.linkman,
                            'installer': this.ruleForm.install,
                            'template-id': this.tempChecked,
                        },
                        res => {
                            this.$router.push({ path: "/dev_mag" });
                        },
                        res => {
                            this.message("error", res.message)
                        }
                    );
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置方法
        resetForm(formName) {
            this.ruleForm = this.init;
        }
    },
    watch: {
        area: function(newVal, oldVal) {
            console.log(newVal);
        }
    }
}
</script>
<style lang="scss" >
@import '../../sass/manualAddDevice.scss';
@import "../../sass/showTemplate.scss";
.edit_device {
    .new-device-group-screen-type {
        margin-top: 14px;
        .new-device-group-screen-type-title {
            width: 100px;
        }
        .new-device-group-screen-type-info {
            span:nth-child(1) {
                margin-right: 2px;
            }
            span:nth-child(2) {
                margin: 0 28px;
            }
        }
    }
    .new-device-group-select-template {
        .el-radio {
            margin-left: 0;
            margin-right: 15px;
            margin-bottom: 12px;
        }
        .system-template-select {
            span {
                margin-left: 20px;
            }
            span:first-child {
                margin-left: 20px;
            }
            .el-radio {
                margin-right: 15px;
            }
        }
        .custom-template-select {
            margin-top: 14px;
        }
    }
    .template-show {
        margin-top: 20px;
        margin-left: 100px;
        box-sizing: border-box;
        .template-show-info {
            width: 400px;
            position: relative;
        }
    }
}
</style>

