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

       <!-- <AddAdvs @clickInter="changeTemp" @toMainTemp="toMainTemp" :tempInfor="tempInfor" :id="deviceId" :type="1" :name="name"> </AddAdvs>  -->
        <div>
            <el-button v-for="(item, index) in screenList" :key="index" @click="issueScreenAd(item['screen-number'])">发布屏{{index+1}}广告</el-button>
        </div>

<br/>
<br/>
        <!-- <Table 
            @removeAd="removeAd" 
            :action="action" 
            :tableInfo="tableInfo" 
            :tableData="tableData" 
            :page="page" 
            :pagesize="pagesize" 
            :total="total" 
            :showcontrol="true"
            @sizeChange="sizeChange" 
            @pageChange="pageChange" 
            @closeDialog="closeDialog"
        ></Table> -->

    <el-dialog title="选择素材" :visible.sync="isOpen" size="small" :closeOnClickModal="false" :closeOnPressEscape="false" custom-class="large-size">
      <div class="select-device-group-dialog">
        <div class="clearfix" style="background:#f5f5f5;padding:20px;height:30px;line-height:30px;">
          <div class="fl" style="min-width:77px;">
            <span>素材名称</span>
          </div>
          <span class="fl">
            <el-input style="min-width:313px;" v-model="materialLibraryContent" placeholder="请填写素材名称"></el-input>
          </span>
          <a href="javascript:;" class="yxf-but fl" style="margin-left:47px;" @click="materialLibrarySearch">查询</a>
        </div>
        <div style="margin:20px 0;">
          <a href="javascript:;" class="yxf-but" @click="checkAll">全选</a>
        </div>
        <div>
          <div class="row3 clearfix">
            <div :class="[{'isActive':index==typeIndex},item.type]" @click="makeActive(item.type,index)" class="fl bg" v-for="(item,index) in materialLibrarySelectType" :key="index">
              <span>{{item.name}}</span>
            </div>
          </div>
          <div class="home-fenyeCon">
            <div class="all-material clearfix">
              <div class="material-file fl clearfix" v-for="(item, index) in list" :key="index" @click="checkEle(index)">
                <div class="file-type" v-if="item.type=='IMG'">
                  <img :src="item['cover-url']||item.url" alt="">
                </div>
                <div class="file-type" v-else-if="item.type=='CONTENT'">
                  <img src='http://file1.yixinfa.cn/dev/180328/2e7ebf22d83e4cce9788d9176e9b6865.jpg' alt="">
                </div>
                <div class="file-type" v-else-if="item.type=='URL'">
                  <img src='http://file1.yixinfa.cn/dev/180417/006cebb2107f4eb5a3e88053c922ab7b.png/100' alt="">
                </div>
                <div class="file-type" v-else>
                  <img :src="item['cover-url']" alt="">
                </div>
                <div class="file-name clearfix" style="">
                  <div class="file-name-left fl">
                    <el-checkbox v-model="item.checked"></el-checkbox>
                  </div>
                  <div class="file-name-right fl" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{item["name"]}}
                    <span>{{item["file-type"]}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="paging" v-if="ishide" style="margin-top:20px;text-align: center;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="pagesize" :page-sizes='[4,8,16]' layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <a href="javascript:;" @click="isOpen = false" class="yxf-but" style="margin-right:10px;">取 消</a>
        <a href="javascript:;" @click="materialLibrarySelectAffirm" class="yxf-but">确 定</a>
      </span>
    </el-dialog>
    

    </div>
</template>
<script>
import AddAdvs from "../addAdv/addAdv";
import Table from "../../components/table/fluidTable";
import Upload from "@/components/upload/Upload.vue"
export default {
    components: {
        AddAdvs,
        Table,
        Upload,
    },
    data() {
        return {
            screenList:[1,2],
            addUploadArr: [],//素材库往页面添加。
            pageIndex: 1, //素材库的页数
            pagesize: 4, //素材库一次要多少条
            total: 99, //当前信息的总条数
            ishide: true,
            deviceStatus: { 'UNK': '未知', 'ONL': '在线', 'OFL': '离线', 'N': '已失效', 'INA': '未激活' },
            tempInfor:"",//保存模板信息
            deviceId:"",
            name:'',//设备名称
            isRef:false,//是否为互动按钮互相跳转
            isOpen:false,
            infor: [], 
            list: [],
            isActive: true,
            screenNumber: 1,
            advertisingManageData: {
                uuid: "",
                name: "",
                deviceGroup: "",
                publicDevice: "",
                province: "",
                companyName: "",
                proposer: "",
                linkman: "",
                install: "",
            },
            // 上传格式提示
            // tableData: [
            //     {
            //     type: "图片",
            //     format: "大小建议不超过5M，支持JPG，JPEG，PNG，BMP 格式"
            //     },
            //     {
            //     type: "视频",
            //     format: "大小建议不超过1G，支持MP4，FLV，AVI，WMV，MOV格式"
            //     }],
            // 上传格式提示
            tableData: [
                {
                type: "图片",
                format: "大小建议不超过5M，支持JPG，JPEG，PNG，BMP 格式"
                },
                {
                type: "视频",
                format: "大小建议不超过1G，支持MP4，FLV，AVI，WMV，MOV格式"
                }],
            materialLibrarySelectType: [
                {
                type: "",
                name: "全部素材"
                },
                {
                type: "IMG",
                name: "图片"
                },
                {
                type: "VDO",
                name: "视频"
                }],
            tableInfo: [
                {
                    label: "名称",
                    status: true,
                    prop: "name",
                },
                {
                    label: "屏幕编号",
                    status: true,
                    prop: "screen-no",
                },
                {
                    label: "设备编号",
                    status: true,
                    prop: "uuid",
                },
                {
                    label: "创建时间",
                    status: true,
                    prop: "create-time",
                },
            ],
            tableData: [
                {
                    name: '测试1',
                    uuid: '234215',
                    'screen-no': 1,
                    'create-time': '2018-10-15',
                },
                {
                    name: '测试1',
                    uuid: '234215',
                    'screen-no': 1,
                    'create-time': '2018-10-15',
                }
            ],
            action: [
                { name: "删除", callback: "removeAd"},
            ],
        };
    },
    created() {
    },
    mounted() {
        this.$esellApi.checkPermissions();
        this.getMaterialLibraryData();
        this.initScreenList();
    },
    methods: {
        // 状态查询
        makeActive(str, index) {
            // 发送请求
            this.type = str;
            this.typeIndex = index;
            this.getMaterialLibraryData();
        },
        // 查询
        serch() {
            this.getInfor({
                'page': this.page,
                'size': this.pagesize,
                'uuid': this.advertisingManageData.uuid,
                'group-id': this.advertisingManageData.deviceGroup,
                'name': this.advertisingManageData.name,
                'open': this.advertisingManageData.publicDevice,
                'district-code': this.advertisingManageData.province[this.advertisingManageData.province.length - 1],
                'applicant': this.advertisingManageData.proposer,
                'phone': this.advertisingManageData.linkman,
                'installer': this.advertisingManageData.install,
            });
        },
        // 重置查询条件
        cleanCondition() {
            this.advertisingManageData = {
                uuid: "",
                name: "",
                deviceGroup: "",
                publicDevice: "",
                province: [],
                companyName: "",
                proposer: "",
                linkman: "",
                install: "",
            }
        },
        issueScreenAd (num) {
            this.isOpen = true;
            this.screenNumber = num;
            this.getMaterialLibraryData();
        },
        removeAd (data) {
            console.log(data);
            this.isOpen = true;
        },// 元素单选
        checkEle(index) {
            var _self = this;
            this.list[index].checked = !this.list[index].checked;
            if (this.list[index].checked) {
                this.addUploadArr.push(this.list[index]);
            }
            this.addUploadArr = [...new Set(this.addUploadArr)];
            this.addUploadArr.forEach(function(ele, i) {
                console.log(ele.checked);
                if (ele.checked == false) {
                console.log(2, _self.addUploadArr)
                _self.addUploadArr.splice(i, 1)
                }
            })
        },
        getInfor(data) {
            this.$esellApi.send(
                "/device/list.shtml",
                data,
                res => {
                    this.total = res.payload.total;
                    var data = res.payload.data;
                    for (var i = 0; i < data.length; i++) {
                        if (this.deviceStatus[data[i].status]) {
                            data[i].status = this.deviceStatus[data[i].status]
                        } else {
                            data[i].status = "未知";
                        }
                    }
                    this.tableData = data;
                    this.$esellApi.checkPermissions(200);
                },
                res => {
                    this.$message({
                        type: "error",
                        message: res.message,
                    });
                }
            );
        },
        // 全选
        checkAll() {
            var _self = this;
            if (this.list.every(ele => ele.checked == true)) {
                this.list.forEach((ele, index) => {
                ele.checked = false;
                _self.addUploadArr = [];
                });
            } else {
                this.list.forEach((ele, index) => {
                if (this.list[index].checked == false) {
                    ele.checked = true;
                    _self.addUploadArr.push(this.list[index]);
                    _self.addUploadArr = [...new Set(this.addUploadArr)];
                }
                });
            }
        },
        clearInfo() {
        this.infor = [];
        },
        handleSizeChange(val) {
        this.pagesize = val;
        this.getMaterialLibraryData();
        },
        handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageIndex = val;
        this.getMaterialLibraryData();
        },
        getMaterialLibraryData() {
            this.$esellApi.send(
                "/media/list.shtml",
                {
                page: this.pageIndex,
                size: this.pagesize,
                type: this.type
                },
                res => {
                    this.list = res.payload.data;
                    this.total = res.payload.total;
                },
                res => {
                this.$message({
                    type: "error",
                    message: res.message
                });
                }
            );
        },
        materialLibrarySearch() {
            this.$esellApi.send("/media/list.shtml", {
                "page":this.pageIndex,
                "size":this.pagesize,
                "type":"",
                "name":this.materialLibraryContent
            }, res => {
                this.list = res.payload.data;
                this.total = res.payload.total;
            }, res => {
            this.message("error", res.message)
            })
        },
        getNameImg(filename) {
        var reg = /\.(jpg|jpeg|png|bmp|mp4|avi|flv|wma|wmv|JPG)$/;
        var name_arr = filename.split(reg);
        return name_arr[1];
        },
        getFileName(str) {
        var reg = /\.(jpg|jpeg|png|bmp|mp4|avi|flv|wma|wmv|JPG)$/;
        return str.replace(reg, "");
        },
        materialLibrarySelectAffirm() {
            var _self = this;
            this.materialLibrarySelectShowOrHide = false;
            for (var i = 0, z = this.addUploadArr.length; i < z; i++) {
                if (this.addUploadArr[i].checked == false) {
                _self.addUploadArr.splice(i, 1);
                }
            }

            this.infor = [];

            for (var j = 0; j < this.addUploadArr.length; j++) {
                let uploadArr = this.addUploadArr[j];

                uploadArr["name"] = this.getFileName(uploadArr.name);
                uploadArr["material-library"] = true;
                if (uploadArr.type.indexOf("VDO") >= 0) {
                if (uploadArr["cover-url"]) {
                    uploadArr["cover-url"] = uploadArr["cover-url"];
                } else {
                    uploadArr["cover-url"] = this.wutuURL
                }
                uploadArr.type = "2";
                } else if (this.addUploadArr[j].type.indexOf("IMG") >= 0) {
                uploadArr.type = "1";
                } else if (this.addUploadArr[j].type.indexOf("CONTENT") >= 0) {
                uploadArr.type = "3";
                }
                this.infor.push(uploadArr);
            }
            this.addUploadArr = [];
            // console.log(this.infor)
            let mediaIds = this.infor.map(function(e,i){return e.id});
            console.log(mediaIds)
            this.commitIssue();
        },
        commitIssue() {
            
            let mediaIds = this.infor.map(function(e,i){return e.id});
            if(!mediaIds || mediaIds.length == 0){
                this.message("error", '请重新选择素材！')
                return;
            }
            let deviceId = this.$route.query.num;
            let screenNumber = this.screenNumber;

            this.$esellApi.send("/demoAD/save.shtml", {
                "mediaIds":mediaIds,
                "deviceId":deviceId,
                "screenNumber":screenNumber,
            }, res => {
                this.message('success', '操作成功！');
                this.isOpen = false;
            }, res => {
                this.message("error", res.message)
            })
        },
        initScreenList() {
            let deviceId = this.$route.query.num;
            this.$esellApi.send("/demoAD/screenList.shtml", {
                "deviceId":deviceId,
            }, res => {
                this.screenList = res.payload.length ==0 ? [{"screenNumber": 1}] : res.payload;
            }, res => {
                this.message("error", res.message)
            })
        }
    },
};
</script>
<style lang="scss" scoped>
@import "../../sass/issueAdvertising.scss";

div.active {
    transition: all .6s;
    color: $white !important;
    background-color: $impColor !important;
}

div.isActive {
    color: $impColor !important;
    background-color: $white !important;
    border: 1px solid $sublineColor;
    border-top: none; // border-top: 2px solid $impColor;
    border-bottom: none; // line-height: 38px!important;
    box-sizing: border-box;
    position: relative;
}

div.isActive::before {
    content: "";
    height: 2px;
    width: 100%;
    background-color: $impColor;
    position: absolute;
    top: -1px;
    left: 0;
}

.img-upload-box {
  .item {
    width: 100px;
    height: 100px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    margin-left: 15px;
    text-align: center;
    padding-top: 25px;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.5s;
    i {
      font-size: 32px;
    }
  }
  .item:hover {
    color: #ff635c;
    border-color: #ff635c;
    border-radius: 0;
  }
  .add-upload {}
  .from-library {}
  .hint {
    width: 20px;
    height: 20px;
    border: 1px solid #e5e5e5;
    border-radius: 50%;
    cursor: pointer;
    i {
      font-size: 16px;
      margin-left: 6px;
      color: #999;
    }
  }
}

.row3 {
  box-sizing: border-box;
  .bg {
    text-align: center;
    width: 120px;
    height: 34px;
    cursor: pointer;
    line-height: 34px;
    border: 1px solid #e5e5e5;
    border-bottom: none;
    border-right: none;
    box-sizing: border-box;
  }
  .bg:last-child {
    border-right: 1px solid #e5e5e5;
  }
}

div.isActive {
  color: #ff635c !important;
  box-sizing: border-box;
  position: relative;
  transition: all 0s 0.1s;
  height: 34px !important;
  line-height: 34px !important;
}

div.isActive::before {
  content: "";
  height: 2px;
  width: 100%;
  background-color: #ff635c;
  position: absolute;
  top: -1px;
  left: 0;
}

.home-fenyeCon {
  border: 1px solid #e5e5e5;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;
  .material-file {
    width: 25%;
    margin: 0 auto;
    .file-type {
      width: 128px;
      height: 128px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .file-name {
      width: 128px;
      margin-top: 10px;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .file-name-left {
        width: 20px;
      }
      .file-name-right {
        width: 100px;
      }
    }
  }
}

.el-input-number--small {
  width: 100px;
}

.uploadFile {
  .uploadFilePicture {
    height: 100px;
    width: 100px;
    position: relative;
    .picture {}
    .delete {
      display: none;
      position: absolute;
      top: 0;
      right: 0;
      background: rgba(0, 0, 0, .6);
      height: 20px;
      width: 20px;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
      color: #fff;
    }
    .progress {
      position: relative;
      top: -18px;
    }
  }
  .uploadFilePicture:hover .delete {
    display: block;
  }
}
</style>


