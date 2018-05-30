<template>
  <div>
    <div class="upload" style="margin-top:20px;">
      <div class="clearfix">
        <div class="fl upload-type" style="height:100px;line-height:100px;">
          <span>上传素材</span>
        </div>
        <div class="img-upload-box cf fl clearfix" style="margin-left:5px;" id='container'>
          <div class="add-upload item fl" id="addupload">
            <i class="iF">&#xe6ad;</i><br>
            <p>上传新素材</p>
          </div>
          <div class="add-upload item fl" @click="uploadTextFunction">
            <i class="iF">&#xe6ae;</i><br>
            <p>上传文字</p>
          </div>
          <div class="add-upload item fl" @click="uploadURLFunction">
            <i class="iF">&#xe6bc;</i><br>
            <p>上传网址</p>
          </div>
          <div class="from-library item fl" @click="materialLibrarySelect">
            <i class="iF">&#xe6a4;</i><br>
            <p>素材库选择</p>
          </div>
          <div class="fl hint" style="margin-left:10px;" @click="uploadFileFormat=true">
            <i style="font-size:16px;margin-left:6px;">?</i>
          </div>
        </div>
      </div>
      <div class="clearfix" style="margin-top:20px;" v-if="infor.length>0">
        <div class="fl">
          <div style="height:100px;line-height:100px;">素材预览</div>
          <div style="margin-top:16px;">广告名称</div>
          <div style="margin-top:25px;">播放时长</div>
        </div>
        <div class="clearfix fl" style="margin-left:20px;max-width:800px">
          <!--循环他-->
          <div class="fl uploadFile" style="margin-right:25px;margin-bottom:25px;" v-for="(item,index) in infor" :key="index">
            <div class="uploadFilePicture" :ref="item.id">
              <!--item['type']-区分是为了后期好对应操作-->
              <!--1图片-->
              <!--2视频-->
              <!--3文字-->
              <!--4url-->
              <div class="picture" style="width:100px;height:100px;" v-if="item['type']=='1'">
                <img style="width:100%;height:100%" :src="item.url">
              </div>
              <div class="picture" style="width:100px;height:100px;" v-else-if="item['type']=='2'">
                <img style="width:100%;height:100%" :src="item['cover-url']">
              </div>
              <div class="picture" style="width:100px;height:100px;" v-else-if="item['type']=='3'">
                <img style="width:100%;height:100%" src="http://file1.yixinfa.cn/dev/180328/2e7ebf22d83e4cce9788d9176e9b6865.jpg">
              </div>
              <div class="picture" style="width:100px;height:100px;" v-else-if="item['type']=='4'">
                <img style="width:100%;height:100%" src="http://file1.yixinfa.cn/dev/180417/006cebb2107f4eb5a3e88053c922ab7b.png">
              </div>
              <div class="picture" style="width:100px;height:100px;" v-else>
                <img style="width:100%;height:100%" :src="item['cover-url']">
              </div>
              <div class="delete" @click="removeEle(item,item['fileId'],index,item.id)">X</div>
              <div class="progress" v-show="item.open">
                <el-progress text-inside="false" :stroke-width="18" :percentage="item.barwidth"></el-progress>
              </div>
            </div>

            <div style="margin-top:10px;">
              <!--change方法是为了触发watch监听这个双向绑定-->
              <el-input v-model="item['name']" style="width:100px;" @change="nameChange"></el-input>
            </div>
            <div style="margin-top:10px;">
              <!--change方法是为了触发watch监听这个双向绑定-->
              <el-input v-model="item['duration']" style="width:80px;" @change="durationChange"></el-input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--上传类型弹框-->
    <el-dialog title="可上传以下类型和格式的文件" :visible.sync="uploadFileFormat">
      <div class="select-device-group-dialog">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="type" label="类型" width="150">
          </el-table-column>
          <el-table-column prop="format" label="格式">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <a href="javascript:;" @click="uploadFileFormat = false" class="yxf-but" style="margin-right:10px;">取 消</a>
        <a href="javascript:;" @click="uploadFileFormat = false" class="yxf-but">确 定</a>
      </span>
    </el-dialog>

    <!--上传文字弹框-->
    <el-dialog title="上传文字" :visible.sync="uploadText">
      <div class="select-device-group-dialog">
        <div style="margin-bottom:20px;">
          <span style="min-width:77px;">文字内容</span>
          <span style="margin-left:20px;">
            <el-input style="width:513px;" v-model="uploadTextInfo.content" placeholder="请填写文字内容"></el-input>
          </span>
        </div>
        <div class="clearfix" style="margin-bottom:20px;">
          <div class="fl">
            <el-tooltip content="背景颜色" placement="top">
              <div>
                <el-color-picker v-model="uploadTextInfo.bg_color"></el-color-picker>
              </div>
            </el-tooltip>
          </div>
          <div class="fl" style="margin-left:20px;">
            <el-tooltip content="字体颜色" placement="top">
              <div>
                <el-color-picker v-model="uploadTextInfo.font_color"></el-color-picker>
              </div>
            </el-tooltip>
          </div>
          <div class="fl" style="margin-left:20px;">
            <el-tooltip content="字体大小" placement="top">
              <el-input-number :min="12" :max="50" size="small" :step="2" v-model="uploadTextInfo.font_size"></el-input-number>
            </el-tooltip>
          </div>
          <!--<div class="fl" style="margin-left:20px;" @click="triggerDirection('1')">
                                          <el-tooltip content="字体方向横" placement="top">
                                            <div style="width:30px;height:30px;border:1px solid #e5e5e5;border-radius:4px;box-sizing:border-box;text-align:center;line-height:28px;" @click="across" class="iF">&#xe6b3;</div>
                                          </el-tooltip>
                                        </div>-->
          <!--<div class="fl" style="margin-left:20px;" @click="triggerDirection('2')">
                                          <el-tooltip content="字体方向竖" placement="top">
                                            <div style="width:30px;height:30px;border:1px solid #e5e5e5;border-radius:4px;box-sizing:border-box;text-align:center;line-height:28px;" @click="vertical" class="iF">&#xe6b4;</div>
                                          </el-tooltip>
                                        </div>-->
          <div class="fl" style="margin-left:20px;">
            <el-tooltip content="撤销设置" placement="top">
              <div style="width:30px;height:30px;border:1px solid #e5e5e5;border-radius:4px;box-sizing:border-box;text-align:center;line-height:28px;" @click="revocation" class="iF">&#xe6b2;</div>
            </el-tooltip>
          </div>
        </div>
        <div style="text-align:center;height:128px;width:100%;color:#333;background:#999;font-size:30px;line-height:128px;">
          <div class="textPreview" style="overflow:hidden;">
            <span style="display:inline-block;white-space:nowrap;">{{uploadTextInfo.content}}</span>
          </div>
        </div>
        <div style="margin-top:20px;">
          <div style="text-align:center;margin:20px 0;">
            <a href="javascript:;" @click="finishUploadText" class="yxf-but">完成设置</a>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="set-hint" style="margin-top:20px;color:#666">
        <div class="set-hint-title">设置提示:</div>
        <div>1、点击颜色框选择字体颜色和背景颜色，可直接查看效果</div>
        <!--<div>2、点击默认颜色，将恢复系统默认字体颜色</div>
                                        <div>3、点击默认背景，将恢复系统默认背景颜色白色，同时删除背景图片</div>-->
        <div>2、点击撤销样式，将全部恢复默认设置</div>
      </div>
    </el-dialog>
    <!--上传网址-->
    <el-dialog title="上传网址" :visible.sync="uploadURL">
      <div class="upload-url">
        <div class="clearfix" style="width:100%">
          <span class="fl" style="width:77px;height:30px;line-height:30px;">填写网址</span>
          <span class="fl" style="width:12%">
            <el-select v-model="urlPrefix" placeholder="请选择" clearable>
              <el-option v-for="item in urlList" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
          <span class="fl" style="width:32%">
            <el-input v-model="browserUrl" placeholder="请填写网址"></el-input>
          </span>
        </div>
      </div>
      <div class="upload-url-content" style="margin-top:10px;">
        <div class="clearfix" style="width:100%">
          <span class="fl" style="width:77px;height:30px;line-height:30px;">网址内容</span>
          <span class="fl" style="width:32%;height:30px;line-height:30px;margin-left:10px;">
            <span v-if="urlPrefix==''"></span>
            <span v-else-if="urlPrefix=='1'">http://</span>
            <span v-else>https://</span>{{browserUrl}}
          </span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <a href="javascript:;" @click="uploadURL = false" class="yxf-but" style="margin-right:10px;">取 消</a>
        <a href="javascript:;" @click="uploadBrowserUrl" class="yxf-but">确 定</a>
      </span>
    </el-dialog>
    <!--素材库选择弹框-->
    <el-dialog title="素材库选择" :visible.sync="materialLibrarySelectShowOrHide" size="small" custom-class="large-size">
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
        <a href="javascript:;" @click="materialLibrarySelectClose" class="yxf-but" style="margin-right:10px;">取 消</a>
        <a href="javascript:;" @click="materialLibrarySelectAffirm" class="yxf-but">确 定</a>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "",
  props: {
    materials: [],
  },
  data() {
    return {

      wutuURL: "http://file1.yixinfa.cn/dev/180328/2e7ebf22d83e4cce9788d9176e9b6865.jpg",

      addUploadArr: [],//素材库往页面添加。
      addUploadTextArr: {},//上传文字往页面添加
      ishide: true,
      pageIndex: 1, //素材库的页数
      pagesize: 4, //素材库一次要多少条
      total: "", //素材库总条数
      type: "",
      index: 0, //上传需要的index值
      index1: 0, //上传记录该数组对象个数的index值
      obj: {},
      materialLibraryContent:"",
      uploadTextInfo: {
        content: '',//上传文字内容
        bg_color: "",
        font_color: "",
        font_size: "",
        font_norma: "",
      }, // 上传文字参数

      urlList: [
        {
          value: '1',
          label: 'http://'
        },
        {
          value: '2',
          label: 'https://'
        },
      ],
      urlPrefix: "",
      browserUrl: "",
      addUploadUrlArr: "",

      typeIndex: 0, //素材库选择类型的id
      uploadText: false, //上传文字弹出框
      uploadURL: false,//上传网址
      uploadFileFormat: false, //字体弹出框
      materialLibrarySelectShowOrHide: false, //素材框选择
      infor: this.materials ? this.materials : [],
      idArr: [],
      payloadInfor: [],
      inforIndex: -1,
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
      list: [],
    };
  },

  methods: {
    nameChange() {
      this.aaa();
    },
    durationChange() {
      this.aaa();
    },
    aaa() {//解决
      console.log("触发了watch");
      var arr = [];//传到父组件的素材数组（里面是对象）
      for (var i = 0; i < this.infor.length; i++) {
        var obj = {}
        obj.name = this.infor[i]['name']
        obj.id = this.infor[i]['id']
        obj.duration = this.infor[i]['duration']
        arr.push(obj);
      }
      this.$emit("addMaterials", arr);
    },
    //--------------------------------------------------素材库begin------------------------------------------------------
    materialLibrarySelect() {
      this.materialLibrarySelectShowOrHide = true;
      this.getMaterialLibraryData();
    },
    materialLibrarySelectClose() {
      this.materialLibrarySelectShowOrHide = false;
    },
    // 元素单选
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
    materialLibrarySelectAffirm() {
      var _self = this;
      this.materialLibrarySelectShowOrHide = false;
      for (var i = 0, z = this.addUploadArr.length; i < z; i++) {
        if (this.addUploadArr[i].checked == false) {
          _self.addUploadArr.splice(i, 1);
        }
      }
      for (var i = 0; i < this.addUploadArr.length; i++) {
        this.addUploadArr[i]["name"] = this.getFileName(this.addUploadArr[i].name);
        this.addUploadArr[i]["material-library"] = true;
        if (this.addUploadArr[i].type.indexOf("VDO") >= 0) {
          if (this.addUploadArr[i]["cover-url"]) {
            this.addUploadArr[i]["cover-url"] = this.addUploadArr[i]["cover-url"];
          } else {
            this.addUploadArr[i]["cover-url"] = this.wutuURL
          }
          this.addUploadArr[i]["type"] = "2";
        } else if (this.addUploadArr[i].type.indexOf("IMG") >= 0) {
          this.addUploadArr[i]["type"] = "1";
        } else if (this.addUploadArr[i].type.indexOf("CONTENT") >= 0) {
          this.addUploadArr[i]["type"] = "3";
        }
        this.infor.push(this.addUploadArr[i]);
      }
      this.addUploadArr = [];
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
    //--------------------------------------------------素材库end------------------------------------------------------
    //--------------------------------------------------上传文字begin------------------------------------------------------
    triggerDirection(str) {
      this.uploadTextInfo.direction = str;
    },
    uploadTextFunction() {
      console.log("打开上传文字窗口");
      this.uploadText = true;
      this.uploadTextInfo = {
        content: "文字预览",
        bg_color: "#999",
        font_color: "#333",
        font_size: 30,
        font_norma: "1"
      };
    },
    // 撤销
    revocation() {
      this.uploadTextInfo = {
        content: "文字预览",
        bg_color: "#999",
        font_color: "#333",
        font_size: 30,
        font_norma: "1"
      };
      this.across();
    },
    // 完成字体设置
    finishUploadText() {
      this.uploadText = false;
      this.$esellApi.send("/media/content/add.shtml", {
        name: this.uploadTextInfo.content,
        content: this.uploadTextInfo,
        duration: 15//时长
      }, res => {
        var a = res.payload.id;
        this.addUploadTextArr = {};//上传文字往页面添加
        this.addUploadTextArr.name = this.uploadTextInfo.content;
        this.addUploadTextArr.id = res.payload.id
        this.addUploadTextArr.color = this.uploadTextInfo.font_color
        this.addUploadTextArr.backgroud = this.uploadTextInfo.bg_color
        this.addUploadTextArr["material-library"] = true
        this.addUploadTextArr["type"] = '3',
          this.addUploadTextArr["duration"] = '15',
          this.infor.push(this.addUploadTextArr);
        this.revocation();
      }, res => {
        this.message("error", res.message)
      })
    },
    // 横
    across() {
      $(".textPreview")
        .parent()
        .css({ height: "128px", width: "100%", "text-align": "center" });
      $(".textPreview").css({ padding: "0" });
      $(".textPreview span").css({ display: "inline-block", width: "100%" });
    },
    // 竖
    vertical() {
      var h = $('.textPreview').height()
      console.log($('.textPreview').height());
      $(".textPreview").css({
        "padding-left": "52%",
        "padding-top": "20px",
        "padding-bottom": "20px",
        "height": h + "px"
      });
      $(".textPreview span").css({
        display: "block",
        width: this.uploadTextInfo.font_size,
        "line-height": this.uploadTextInfo.font_size + "px",
        "margin-left": "50%",
        "margin-left": -this.uploadTextInfo.font_size + "px"
      });
      $(".textPreview")
        .parent()
        .css({ height: $(".textPreview span").height() + 40 });
    },
    //-----------.----------!!!!!-------------------.----------上传文字end-------.----!!!!-------------------------------------------
    makeActive(str, index) {
      // 发送请求
      this.type = str;
      this.typeIndex = index;
      this.getMaterialLibraryData();
    },
    //------.---------!!!!----------------.-------------上传网址begin-------.------!!!!----------------------------
    uploadURLFunction() {
      this.uploadURL = true;
    },
    uploadBrowserUrl() {
      this.uploadURL = false;
      var url;
      if (this.urlPrefix) {
        if (this.urlPrefix == '1') {
          url = "http://" + this.browserUrl;
        } else {
          url = "https://" + this.browserUrl;
        }
      } else {
        url = "http://" + this.browserUrl;
      };
      if (!this.browserUrl) {
        this.message("warning", "请先填写网址");
        return;
      }
      this.$esellApi.send("/media/web/add.shtml", {
        name: this.browserUrl,
        content: url,
        duration: "15"
      }, res => {
        console.log(res);
        this.addUploadUrlArr = {};//上传网址往页面添加
        this.addUploadUrlArr.name = this.browserUrl;
        this.addUploadUrlArr.id = res.payload.id
        this.addUploadUrlArr["material-library"] = true

        this.addUploadUrlArr["type"] = '4',
          this.addUploadUrlArr["duration"] = '15',
          this.infor.push(this.addUploadUrlArr);
      }, res => {
        this.message("error", res.message)
      })
    },
    //---------.---------!!!!------------------.-----------上传网址end-------.-----!!!!--------------------------

    //-------------.-------!!!!------------------.--------------上传素材begin---.-----!!!!----------------------------------------------
    getNameImg(filename) {
      var reg = /\.(jpg|jpeg|png|bmp|mp4|avi|flv|wma|wmv|JPG)$/;
      var name_arr = filename.split(reg);
      return name_arr[1];
    },
    getFileName(str) {
      var reg = /\.(jpg|jpeg|png|bmp|mp4|avi|flv|wma|wmv|JPG)$/;
      return str.replace(reg, "");
    },
    // 上传用到的删除页面的元素
    removeEle(item, id, data, serverId) {
      this.$confirm("此操作将影响您的上传素材, 建议请勿删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("点击了删除")
          var that = this;
          var index;
          var list = that.plupload.files;
          console.log(item);
          if (!item['material-library']) {
            console.log("根据上传列表删除")
            $.each(list, function(o, val) {
              if (val.id == id) {
                index = o;
                if (!that.infor.length == that.payloadInfor.length) {
                  for (let i = 0; i < that.infor.length; i++) {
                    for (let k in that.payloadInfor) {
                      if (!that.payloadInfor[that.infor[i].fileId]) {
                        delete that.payloadInfor[that.infor[i].fileId];
                      }
                    }
                  }
                }
                if (item.status) {
                  that.infor.splice(data, 1);
                } else {
                  that.plupload.removeFile(that.plupload.files[index]);
                  that.infor.splice(data, 1);
                  that.payloadInfor.splice(index, 1);
                }
              }
              that.inforIndex = -1;
            });
          } else {
            this.infor.find((item, index) => {
              console.log("根据id删除")
              if (item.id == serverId) {
                this.infor.splice(index, 1)
              };
            })
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => { });
    },
    //--------------------------------------------------上传素材end------------------------------------------------------
  },
  created() {
    console.log("UPLOAD", this.materials)
    console.log('this.addMaterials', this.addMaterials);
    // 初始化上传
    this.$nextTick(function() {
      const that = this;
      that.plupload = new plupload.Uploader({
        file_data_name: "file",
        browse_button: "addupload",
        multi_selection: true, //允许多个上传
        runtimes: "html5,flash,html4",
        // 记得改路径
        flash_swf_url: "https://cdn.bootcss.com/plupload/2.3.6/Moxie.swf",
        url: "http://oss.aliyuncs.com",
        filters: {
          mime_types: [
            {
              title: "Image files",
              extensions: "jpg,jpeg,bmp,png,gif",
              mimeTypes: "image/*"
            },
            {
              title: "Video files",
              extensions: "mp4,avi,flv,wmv,mov",
              mimeTypes: "video/*"
            }
            // { title: "Other files", extensions: "", mimeTypes: '*/*' }
          ],
          max_file_size: "1gb", //最大上传
          prevent_duplicates: false //不允许选取重复文件
        },
        init: {
          //  添加文件
          FilesAdded: function(up, files) {
            var arr = [];
            that.idArr = [];
            files.map(function(v, i) {
              var obj = {};
              obj["name"] = v.name;
              arr.push(obj);
            });
            for (var i = 0; i < files.length; i++) {
              var obj = {};
              obj["fileId"] = files[i].id;
              obj["open"] = true;
              obj["barwidth"] = 0;
              obj["status"] = false;
              obj["material-library"] = false
              that.idArr.push(files[i].id);
              that.infor.push(obj);
            }
            that.$esellApi.send(
              "/media/callback/batch/add.shtml",
              arr,
              res => {
                if (res.message == "OK") {
                  for (let i = 0; i < res.payload.length; i++) {
                    that.payloadInfor[that.idArr[i]] = res.payload[i];
                  }
                  that.plupload.start();
                }
              },
              res => {
                that.message("error", res.message)
              }
            );
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", that.plupload);
          },
          // 上传的进度条
          UploadProgress: function(up, file) {
            if (that.inforIndex < 0) {
              for (let i = 0; i < that.infor.length; i++) {
                if (that.infor[i].fileId == file.id) {
                  that.inforIndex = i
                }
              }
            }
            that.infor[that.inforIndex].barwidth = file.percent;
          },
          // 准备开始上传开始到阿里云的方法
          BeforeUpload: function(up, file) {
            that.plupload.setOption({
              url: that.payloadInfor[file.id].host,
              multipart_params: {
                key: "" + that.payloadInfor[file.id].key,
                policy: that.payloadInfor[file.id].policy,
                OSSAccessKeyId: that.payloadInfor[file.id]["access-id"],
                success_action_status: "200", //让服务端返回200,不然，默认会返回204
                callback: that.payloadInfor[file.id].callback,
                signature: that.payloadInfor[file.id].sign
              }
            });
          },
          // 单个上传成功
          FileUploaded: function(up, file, info) {
            if (info.status == "200") {
              var info = JSON.parse(info.response);
              that.infor[that.inforIndex].open = false;
              that.infor[that.inforIndex].duration = info.payload["duration"];
              that.infor[that.inforIndex].url = info.payload["coverUrl"];
              that.infor[that.inforIndex].id = info.payload["id"];
              that.infor[that.inforIndex]["name"] = that.getFileName(that.payloadInfor[file.id].name);
              that.infor[that.inforIndex]["status"] = true;
              if (file.type.indexOf("video") >= 0) {
                if (info.payload["coverUrl"]) {
                  that.infor[that.inforIndex]["cover-url"] = info.payload["coverUrl"];
                } else {
                  that.infor[that.inforIndex]["cover-url"] = 'http://file1.yixinfa.cn/dev/180313/fdfa2242540744efa64aed672e838765.jpg'
                }
                that.infor[that.inforIndex]["type"] = "2";
              } else {
                that.infor[that.inforIndex]["type"] = "1";
              }
            }
            that.inforIndex = -1;
            console.log(1212211, that.infor);
          }
        },
        // 全部上传成功
        UploadComplete: function(up, files) {
        },
        Error: function(up, err) {
          if (err.code == -600) {
            that.message("error", "选择的文件太大");
          } else if (err.code == -601) {
            that.message("error", "文件类型不符合要求");
          } else if (err.code == -602) {
            that.message("error", "不允许有重复文件");
          } else {
            that.message("error", "服务器错误，请刷新页面");
          }
        }
      });
      // 实例化（初始）
      that.plupload.init();
    });
  },
  watch: {
    materialLibrarySelectShowOrHide: {
      handler(val, oldVal) {
        if (!val) {
          this.addUploadArr = [];
        }
      },
      deep: true
    },
    materials: {
      handler(val, oldVal) {
        console.log("UPLOAD", val);

      },
      deep: true
    },
    uploadTextInfo: {
      handler(val, oldVal) {
        $(".textPreview").css({
          color: val.font_color,
          "background-color": val.bg_color,
          "font-size": val.font_size
        });
      },
      deep: true
    },
    infor: {
      handler(val, oldVal) {
        console.log("上传监听最新的val", val);
        this.aaa()
      },
      deep: true
    }
  },
};
</script>
<style lang="scss" scoped>
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

