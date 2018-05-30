export const addAdvMinxin = {
    created(){
        this.startTime=this.dataType(new Date);
        this.getSevenDay();
        if(this.selectType==0){
            this.endTime=this. getSevenDay();
        }else if(this.selectType==1){
            this.endTime=this.getNextMonth(this.dataType(new Date),1);
        }else if(this.selectType==2){
            this.endTime=this.getNextMonth(this.dataType(new Date),3);
        }else if(this.selectType==1){
            this.endTime=this.getNextMonth(this.dataType(new Date),6);
        }
        this.$nextTick(function() {
            const that = this;
            that.plupload = new plupload.Uploader({
                // file_data_name: "file",
                browse_button: "upload",
                multi_selection: true,
                runtimes: "html5,flash,html4",
                // 记得改路径
                flash_swf_url: "https://cdn.bootcss.com/plupload/2.3.6/Moxie.swf",
                url: "http://oss.aliyuncs.com",
                filters: {
                    max_file_size: "1gb", //最大上传
                    prevent_duplicates: false //不允许选取重复文件
                },
                init: {
                    //  添加文件
                    FilesAdded: function(up, files) {
                        console.log(files)
                        that.refreshScroll.reverse();
                        if(that.upInfor.length+files.length>5){
                            up.files.splice(that.upInfor.length)
                            return
                        }
                        for(let i=0;i<files.length;i++){
                            if(files[i].type.indexOf("video/")<0&&files[i].type.indexOf("image/")<0){
                                that.content="只支持上传图片或视频"
                                that.showPopup=!that.showPopup;
                                return
                            }else if(!files[i].type.indexOf("video/")<0){
                                that.multi="VDO"
                            }else if(!files[i].type.indexOf("image/")<0){
                                that.multi="IMG"
                            }
                        }
                        let uploadName = [];
                        that.upIdArr = [];
                        files.map(function(v, i) {
                            let obj = {};
                            obj["name"] = v.name;
                            uploadName.push(obj);
                        });
                        for (var i = 0; i < files.length; i++) {
                            var obj = {};
                            obj["fileId"] = files[i].id;
                            obj["open"] = true;
                            obj["barwidth"] = 0;
                            obj["status"] = false;
                            obj["material-library"] = false
                            that.upIdArr.push(files[i].id);
                            that.upInfor.push(obj);
                        }
                        that.$esellApi.send("/media/callback/batch/add.shtml", uploadName).then(res => {
                            if (res.message == "OK") {
                                for (let i = 0; i < res.payload.length; i++) {
                                    that.payloadInfor[that.upIdArr[i]] = res.payload[i];
                                }
                                that.plupload.start();
                            }
                        }).catch(res => {
                            console.log(res);
                        })
                    },
                    // 上传的进度条
                    UploadProgress: function(up, file) {
                        if (that.inforIndex < 0) {
                            for (let i = 0; i < that.upInfor.length; i++) {
                                if (that.upInfor[i].fileId == file.id) {
                                that.inforIndex = i
                                }
                            }
                        }
                        that.upInfor[that.inforIndex].barwidth = file.percent;
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
                        let item=that.upInfor[that.inforIndex];
                        if (info.status == "200") {
                            var info = JSON.parse(info.response);
                            item.open = false;
                            item.duration = info.payload.duration;
                            item.url = info.payload.coverUrl;
                            item.id = info.payload.id;
                            item.name = that.getFileName(that.payloadInfor[file.id].name);
                            item.status = true;
                            if (file.type.indexOf("video") >= 0) {
                                if (info.payload["coverUrl"]) {
                                item["cover-url"] = info.payload["coverUrl"];
                                } else {
                                item["cover-url"] = 'http://file1.yixinfa.cn/dev/180313/fdfa2242540744efa64aed672e838765.jpg'
                                }
                                item.type = "2";
                            } else {
                                item.type = "1";
                            }
                        }
                        that.inforIndex = -1;
                        that.upInfor.splice(that.upInfor.length);
                    }
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
        })
    },
  }
  export const editAdvMinxin = {
    data(){
        return {
            position:'top',
            content:'',
            showPopup:false,
            modal:true,
            duration:'3000',
            type:'error',
        }
    },
    created(){
        this.startTime=this.dataType(new Date);
        this.getSevenDay();
        if(this.selectType==0){
            this.endTime=this. getSevenDay();
        }else if(this.selectType==1){
            this.endTime=this.getNextMonth(this.dataType(new Date),1);
        }else if(this.selectType==2){
            this.endTime=this.getNextMonth(this.dataType(new Date),3);
        }else if(this.selectType==1){
            this.endTime=this.getNextMonth(this.dataType(new Date),6);
        }
        this.$nextTick(function() {
            const that = this;
            that.plupload = new plupload.Uploader({
                // file_data_name: "file",
                browse_button: "upload",
                multi_selection: false,
                runtimes: "html5,flash,html4",
                // 记得改路径
                flash_swf_url: "https://cdn.bootcss.com/plupload/2.3.6/Moxie.swf",
                url: "http://oss.aliyuncs.com",
                filters: {
                    max_file_size: "1gb", //最大上传
                    prevent_duplicates: false //不允许选取重复文件
                },
                init: {
                    //  添加文件
                    FilesAdded: function(up, files) {
                        for(let i=0;i<files.length;i++){
                            if(files[i].type.indexOf("video/")<0&&files[i].type.indexOf("image/")<0){
                                that.content="只支持上传图片或视频"
                                that.showPopup=!that.showPopup;
                                return
                            }else if(!files[i].type.indexOf("video/")<0){
                                that.multi="VDO"
                            }else if(!files[i].type.indexOf("image/")<0){
                                that.multi="IMG"
                            }
                        }
                        that.refreshScroll.reverse();
                        let uploadName = [];
                        that.upIdArr = [];
                        files.map(function(v, i) {
                            let obj = {};
                            obj["name"] = v.name;
                            uploadName.push(obj);
                        });
                        for (var i = 0; i < files.length; i++) {
                            var obj = {};
                            obj["fileId"] = files[i].id;
                            obj["open"] = true;
                            obj["barwidth"] = 0;
                            obj["status"] = false;
                            obj["material-library"] = false
                            that.upIdArr.push(files[i].id);
                            that.upInfor.push(obj);
                        }
                        console.log(that.upInfor)
                        that.$esellApi.send("/media/callback/batch/add.shtml", uploadName).then(res => {
                            if (res.message == "OK") {
                                for (let i = 0; i < res.payload.length; i++) {
                                    that.payloadInfor[that.upIdArr[i]] = res.payload[i];
                                }
                                that.plupload.start();
                            }
                        }).catch(res => {
                            console.log(res);
                        })
                    },
                    // 上传的进度条
                    UploadProgress: function(up, file) {
                        if (that.inforIndex < 0) {
                            for (let i = 0; i < that.upInfor.length; i++) {
                                if (that.upInfor[i].fileId == file.id) {
                                that.inforIndex = i
                                }
                            }
                        }
                        that.upInfor[that.inforIndex].barwidth = file.percent;
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
                        let item=that.upInfor[that.inforIndex];
                        if (info.status == "200") {
                            var info = JSON.parse(info.response);
                            item.open = false;
                            item.duration = info.payload.duration;
                            item.url = info.payload.coverUrl;
                            item.id = info.payload.id;
                            item.name = that.getFileName(that.payloadInfor[file.id].name);
                            item.status = true;
                            if (file.type.indexOf("video") >= 0) {
                                if (info.payload["coverUrl"]) {
                                item["cover-url"] = info.payload["coverUrl"];
                                } else {
                                item["cover-url"] = 'http://file1.yixinfa.cn/dev/180313/fdfa2242540744efa64aed672e838765.jpg'
                                }
                                item.type = "VDO";
                            } else {
                                item.type = "IMG";
                            }
                        }
                        that.inforIndex = -1;
                        if(that.isText){
                            that.upInfor.splice(1,1);
                        }else{
                            that.upInfor.splice(0,1)
                        }
                    }
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
        })
    },
  }
  