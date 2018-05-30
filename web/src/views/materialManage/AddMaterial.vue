<template>
    <div class="device-group-manager">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <router-link to="/material_mag" class="blue">素材管理</router-link>
                <span>></span>
                <span>新增素材</span>
            </span>
        </div>
        <div class="bottom">
            <div class="upload">
                <div style="margin-bottom:14px;">
                    <div>
                    </div>
                </div>
                <div class="clearfix">
                    <div class="fl upload-type" style="height:100px;line-height:100px;">
                        <span>上传素材</span>
                    </div>
                    <div class="img-upload-box cf fl clearfix" style="margin-left:5px;">
                        <div class="add-upload item fl" id="addupload">
                            <i class="iF">&#xe6ad;</i><br>
                            <p>上传素材</p>
                        </div>
                        <div class="fl hint" style="margin-left:10px;" @click="uploadFileFormat=true">
                            <i style="font-size:16px;margin-left:6px;">?</i>
                        </div>
                    </div>
                </div>
                <div class="clearfix" style="margin-top:20px;" v-if="infor.length>0">
                    <div class="fl">
                        <div style="height:100px;line-height:100px;">素材预览</div>
                        <div style="margin-top:16px;">素材名称</div>
                    </div>
                    <div class="clearfix fl" style="margin-left:20px;max-width:800px">
                        <!--循环他-->
                        <div class="fl uploadFile" style="margin-right:25px;margin-bottom:25px;" v-for="(item,index) in infor" :key="index">
                            <div class="uploadFilePicture" :ref="item.id">
                                <div class="picture" style="width:100px;height:100px;" v-if="item['type']=='1'">
                                    <img style="width:100%;height:100%" :src="item.url">
                                </div>
                                <div class="picture" style="width:100px;height:100px;" v-else>
                                    <img style="width:100%;height:100%" :src="item['cover-url']">
                                </div>
                                <div class="delete" @click="removeEle(item,item['fileId'],index,item.id)">X</div>
                                <div class="progress a" v-show="item.open" style="display:block">
                                    <el-progress text-inside="false" :stroke-width="18" :percentage="item.barwidth"></el-progress>
                                </div>
                            </div>
                            <div style="margin-top:10px;">
                                <el-input v-model="item['name']" style="width:100px;"></el-input>
                            </div>
                        </div>
                    </div>
                </div>
                <!--操作-->
                <div class="operation" style="margin-top:20px;">
                    <a href="javascript:;" class="yxf-but" @click="cdup">返回列表</a>
                    <!--<a href="javascript:;" class="yxf-but" style="margin-left:6px;">提 交</a>-->
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
        </div>
    </div>
</template>
<script>
export default {
    name: 'add-material',
    data() {
        return {
            uploadText: false,//上传文字弹出框
            tableData: [{
                type: '图片',
                format: '大小建议不超过5M，支持JPG，JPEG，PNG，BMP格式'
            }, {
                type: '视频',
                format: "大小建议不超过1G，支持MP4，FLV，AVI，WMV，MOV格式"
            }],
            errorNum: 0,
            ishide: true,
            pageIndex: 1,//素材库的页数
            pagesize: 8,//素材库一次要多少条
            total: '',//素材库总条数
            type: "",
            index: 0,//上传需要的index值
            index1: 0,//上传记录该数组对象个数的index值
            obj: {},
            uploadTextInfo: {
                textContent12: "文字预览",
                color1: '#000',
                color2: '#999',
                size: 30,
            },// 上传文字参数
            typeIndex: 0,//素材库选择类型的id
            uploadText: false,//上传文字弹出框
            uploadFileFormat: false,//字体弹出框
            materialLibrarySelectShowOrHide: false,//素材框选择
            payload: [],
            files: [],
            infor: [],
            idArr: [],
            payloadInfor: [],
            inforIndex: -1,
        }
    },
    mounted() {
        this.$esellApi.checkPermissions();
    },
    methods: {
        // 上传用到的删除页面的元素
        removeEle(item, id, data) {
            this.$confirm("此操作将影响您的上传素材, 建议请勿删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    var that = this;
                    var index;
                    var list = that.plupload.files;
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
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => { });
        },
        cdup() {
            this.$router.go(-1);
        },
        getNameImg(filename) {
            var reg = /\.(jpg|jpeg|png|bmp|mp4|avi|flv|wma|JPG)$/
            var name_arr = filename.split(reg);
            return name_arr[1]
        },
        getFileName(str) {
            var reg = /\.(jpg|jpeg|png|bmp|mp4|avi|flv|wma|JPG)$/
            return str.replace(reg, '');
        },
    },
    watch: {
    },
    created() {
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
                            extensions: "mp4,avi,flv,wma",
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
                        console.log(1111);
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
                                 this.message("error", res.message)
                            }
                        );
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
                        console.log(info)
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
}
</script>
<style lang="scss" scoped>
@import '../../sass/advertisingManage.scss';
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
    transition: all 0s .1s;
    height: 34px!important;
    line-height: 34px!important;
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

