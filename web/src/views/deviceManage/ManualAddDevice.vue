<!--手动添加设备-->
<template>
    <div class="manual-add-device">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/dev_mag" class="blue">设备管理</router-link>
                <span>></span>
                <span>手动添加设备</span>
            </span>
        </div>
        <div class="bottom">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
                <el-form-item label="设备编号" prop="uuid">
                    <el-input style="max-width:513px;" v-model="ruleForm.uuid" placeholder="请填写设备编号"></el-input>
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
                <el-form-item style="margin-top:20px;">
                    <a class="yxf-but" style="margin-left:6px;" @click="cdup">返 回</a>
                    <a class="yxf-but" @click="resetForm('ruleForm')" style="margin-left:6px;">重 置</a>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'manual-add-device',
    data() {
        const checkUuid = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入正确的设备号'));
            } else {
                callback();
            }
        }
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
                proposer: '',
                linkman: "",
                install:"",
                address:"",
            },
            rules: {
                uuid: [
                    { required: true, trigger: 'blur', validator: checkUuid },
                ],
                name: [
                    { required: true, trigger: 'blur', validator: checkName },
                ],
            },
            list: null,
            all: 40,
            ishide: true,
            active: "all",
            area: '',
            checked: true,
            Index: "0",
            value2: "",
            deviceGroupList:[],
            devicePublicStatus: [
                {
                    value: 'Y',
                    label: '开放'
                }, {
                    value: 'N',
                    label: '不开放'
                },
            ],
            provinceList:[],
        }
    },
    created() {
        // 发送请求拿到页面表格数值赋值给list
        this.provinceList=this.$route.params.province;
        this.deviceGroupList=this.$route.params.groupInfor;
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        cdup() {
            this.$router.go(-1);
        },
        // 提交方法
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$esellApi.send(
                        "/device/add.shtml",
                        {
                            'uuid':this.ruleForm.uuid,
                            'name':this.ruleForm.name,
                            'district-code':this.ruleForm.province[this.ruleForm.province.length-1],
                            'address':this.ruleForm.address,
                            'group-id':this.ruleForm.deviceGroup,
                            'open':this.ruleForm.publicDevice,
                            'applicant':this.ruleForm.proposer,
                            'phone':this.ruleForm.linkman,
                            'installer':this.ruleForm.install,
                        },
                        res => {
                            this.$router.go(-1);
                        },
                        res => {
                            this.$message({
                            type: 'error',
                            message:res.message
                            });
                        }
                    );
                } else {
                    this.$message({
                        type: 'error',
                        message:'请填写必填字段'
                    });
                    return false;
                }
            });
        },
        // 重置方法
        resetForm(formName) {
            this.ruleForm = {
                uuid: "",
                name: "",
                deviceGroup: "",
                publicDevice: "",
                province: [],
                companyName: "",
                proposer: "",
                linkman: "",
                install:"",
                address:"",
            }
        },
    },
    watch: {
        area: function(newVal, oldVal) {
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../sass/manualAddDevice.scss';
</style>

