webpackJsonp([6],{"/KUA":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("GQaK");e.default={props:{list:""},data:function(){return{startX:0,startY:0,disX:0,disY:0,deleteSlider:"",canMove:!0,checked:0}},created:function(){var t=this;this.$nextTick(function(){t.scroll=new s.a(t.$refs.wrapper,{})})},watch:{list:function(){this.deleteSlider="transform:translateX(0px)"}},methods:{touchStart:function(t,e){1==(t=t||event).touches.length&&(this.startX=t.touches[0].clientX,this.startY=t.touches[0].clientY,this.checked=e)},touchMove:function(t){t=t||event;var e=this.$refs.remove[this.checked].offsetWidth;1==t.touches.length&&(this.moveX=t.touches[0].clientX,this.moveY=t.touches[0].clientY,this.disX=this.startX-this.moveX,this.disY=this.startY-this.moveY,this.disX<0||0==this.disX?this.deleteSlider="transform:translateX(0px)":this.disX>0&&(this.disX>Math.abs(this.disY)&&Math.abs(this.disY)<60?(this.canMove=!0,this.deleteSlider="transform:translateX(-"+5*this.disX+"px)",5*this.disX>=e&&(this.deleteSlider="transform:translateX(-"+e+"px)")):this.canMove=!1))},touchEnd:function(t){t=t||event;var e=this.$refs.remove[this.checked].offsetWidth;if(1==t.changedTouches.length){var i=t.changedTouches[0].clientX,s=t.changedTouches[0].clientY;this.disX=this.startX-i,this.disY=this.startY-s,5*this.disX<e/2?this.deleteSlider="transform:translateX(0px)":this.canMove&&5*this.disX>e/2?this.deleteSlider="transform:translateX(-"+e+"px)":this.deleteSlider="transform:translateX(0px)"}},remove:function(t,e,i,s){this.deleteSlider="transform:translateX(0px)",this.$emit("remove",t,e,i,s)},clickItem:function(t){this.$emit("clickItem",t)}}}},"4rt2":function(t,e,i){var s=i("VU/8")(i("TKcW"),i("8qqm"),function(t){i("W/e6")},null,null);t.exports=s.exports},"5kMc":function(t,e){},"8qqm":function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"select"},[i("div",{staticClass:"select_list cf"},t._l(t.list,function(e,s){return i("div",{key:s,staticClass:"select_item",class:s==t.checkedType?"active":"",on:{click:function(e){t.clickItem(s)}}},[t._v("\n            "+t._s(e.name)+"\n        ")])}))])},staticRenderFns:[]}},CpoG:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"wrapper",staticClass:"delete imglist_wrapper"},[i("div",{staticClass:"content"},t._l(t.list,function(e,s){return i("div",{key:s,staticClass:"slider cf",style:t.checked==s?t.deleteSlider:""},[i("div",{staticClass:"infor",on:{click:function(i){t.clickItem(e)},touchstart:function(e){t.touchStart(e,s)},touchmove:t.touchMove,touchend:t.touchEnd}},[i("div",{staticClass:"img_content"},[i("img",{attrs:{src:e.url}}),t._v(" "),i("mt-progress",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"item.open"}],attrs:{value:e.barwidth,"bar-height":5}})],1),t._v(" "),i("div",{staticClass:"text_content"},[i("span",[t._v("播放时长:")]),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.duration,expression:"item.duration"}],attrs:{type:"text",placeholder:"请输入播放时长"},domProps:{value:e.duration},on:{input:function(i){i.target.composing||t.$set(e,"duration",i.target.value)}}}),t._v(" "),i("span",[t._v("秒")])])]),t._v(" "),i("div",{ref:"remove",refInFor:!0,staticClass:"remove",on:{click:function(i){t.remove(e,e.fileId,s,e.id)}}},[t._v("\n                删除\n            ")])])}))])},staticRenderFns:[]}},KVds:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("4rt2"),a=i.n(s),o=i("2/Wp"),n=i.n(o),l=i("Q/2R"),r=i.n(l),c=i("f9q1"),d=i.n(c),p=i("HrMK"),h=i.n(p),u=i("Au9i"),v=(i.n(u),i("pZhx")),m=i.n(v),f=i("f744"),y="无法确定需发布的设备";e.default={mixins:[f.a],components:{Select:a.a,DatetimePicker:u.DatetimePicker,SelectPick:n.a,ImgList:d.a,Scroll:h.a,SelectContent:r.a,Infor:m.a},data:function(){return{planInfor:[{flex:1,values:[],className:"slot1",textAlign:"center",defaultIndex:0}],groupInfor:[{flex:1,values:[],className:"slot1",textAlign:"center",defaultIndex:0}],slotInfor:[{flex:1,values:[],className:"slot1",textAlign:"center",defaultIndex:0}],pickList:[],pickChecked:"",pickShow:!1,pickType:"",pls:"选择一个设备组",val:"",advName:"未命名",selectList:[{name:"七天"},{name:"一个月"},{name:"三个月"},{name:"六个月"},{name:"其他时间"}],selectType:0,checkedSlotType:0,initTime:"",startTime:"",endTime:"",slotType:[{name:"普通广告"}],showPlan:!1,showGroup:!1,planName:"",groupName:"",slotName:"",planInt:"请选择推广计划",groupInt:"请选择设备组",slotInt:"请选择广告位",checkedGroup:"",checkedPlan:"",checkedSlot:"",plupload:"",upIdArr:[],upInfor:[],payloadInfor:[],inforIndex:-1,uploadType:1,scroll:"",slotShowTime:"15",textSlotVal:"",refreshScroll:[1,2],slotId:"",isGroup:1,deviceName:"",deviceId:"",tip:y,contentId:"",valueKey:"lable",multi:"",position:"top",content:"",showPopup:!1,modal:!0,duration:"3000",type:"error",footerType:"1"}},created:function(){this.getPlanInfor(),this.getGroupInfor(),this.initTime=new Date,this.planName=this.$route.query.planName,this.checkedPlan=this.$route.query.checkedPlan?this.$route.query.checkedPlan:"",1==this.$route.query.type?(this.isGroup=2,this.deviceId=this.$route.query.num,this.checkedSlot=this.$route.query.slotNum,this.slotName=this.$route.query.slotName,this.deviceName=this.$route.query.name?this.$route.query.name:y,this.getSlotInfor({"device-id":this.deviceId})):2==this.$route.query.type&&(this.isGroup=1,this.checkedGroup=this.$route.query.num,this.groupName=this.$route.query.name,this.checkedSlot=this.$route.query.slotNum,this.slotName=this.$route.query.slotName,this.getSlotInfor({"group-id":this.checkedGroup}))},methods:{save:function(){var t=this,e=/^[0-9]+$/,i=[];if(!this.planName)return this.content="请选择推广计划",void(this.showPopup=!this.showPopup);if(this.advName.trim().length<1)return this.content="广告名称不能为空",void(this.showPopup=!this.showPopup);if("2"==this.$route.query.type&&!this.checkedGroup)return this.content="请选择设备组",void(this.showPopup=!this.showPopup);if(!this.checkedSlot||!this.slotName)return this.content="请选择广告位",void(this.showPopup=!this.showPopup);if(1==this.uploadType){if(this.upInfor.length<1)return this.content="请上传素材",void(this.showPopup=!this.showPopup);for(var s=0;s<this.upInfor.length;s++){if(!e.test(this.upInfor[s].duration))return this.content="第"+(s+1)+"个素材时长不为正整数",void(this.showPopup=!this.showPopup);var a={};a.id=this.upInfor[s].id,a.duration=this.upInfor[s].duration,a.type=this.upInfor[s].type,a.name=this.advName,i.push(a)}}else if(2==this.uploadType){if(this.textSlotVal.trim().length<1)return this.content="文字内容不能为空",void(this.showPopup=!this.showPopup);if(!e.test(this.slotShowTime))return this.content="第1个素材时长不为正整数",void(this.showPopup=!this.showPopup);i=[{duration:this.slotShowTime,type:"CONTENT",name:this.advName,content:{content:""+this.textSlotVal,bg_color:"#999",font_color:"#333",font_size:30,font_norma:"1"}}]}1==this.isGroup?this.$esellApi.send("/api/ad/add.shtml",{"start-time":this.startTime,"end-time":this.endTime,type:this.checkedSlotType+1,"campaign-id":this.checkedPlan,"ad-groups":[{"group-id":this.checkedGroup,"slot-id":this.checkedSlot}],materials:i}).then(function(e){t.$router.push({name:"advertising"})}).catch(function(t){}):2==this.isGroup&&this.$esellApi.send("/api/ad/add.shtml",{"start-time":this.startTime,"end-time":this.endTime,type:this.checkedSlotType+1,"campaign-id":this.checkedPlan,"ad-devices":[{"device-id":this.deviceId,"slot-id":this.checkedSlot}],materials:i}).then(function(e){t.$router.push({name:"advertising"})}).catch(function(t){})},setStartTime:function(t){this.startTime=this.dataType(t)},setEndTime:function(t){this.endTime=this.dataType(t)},cancle:function(){this.pickShow=!1},setGroup:function(t){this.pickShow=!1,1==this.pickType?(this.planName=t[0].label,this.checkedPlan=t[0].value):2==this.pickType?(this.groupName=t[0].label,this.checkedGroup=t[0].value,this.slotName="",this.getSlotInfor({"group-id":t[0].value})):3==this.pickType&&(this.slotName=t[0].name,this.checkedSlot=t[0].value)},checkPlan:function(){this.pickShow=!0,this.pickType=1,this.pickChecked=this.planName,this.pickList=this.planInfor,this.valueKey="label"},clearPlan:function(){this.planName="",this.checkedPlan="",this.pickShow=!1},checkGroup:function(){this.pickShow=!0,this.pickType=2,this.pickChecked=this.groupName,this.pickList=this.groupInfor,this.valueKey="label"},clearGroup:function(){this.groupName="",this.slotName="",this.checkedGroup="",this.checkedSlot="",this.pickShow=!1},checkSlot:function(){this.pickShow=!0,this.pickType=3,this.pickChecked=this.slotName,this.pickList=this.slotInfor,this.valueKey="name"},clearSlot:function(){this.slotName="",this.checkedSlot="",this.pickShow=!1},clickItem:function(t){this.selectType=t,this.startTime=this.dataType(new Date),0==t?this.endTime=this.getSevenDay():1==t?this.endTime=this.getNextMonth(this.dataType(new Date),1):2==t?this.endTime=this.getNextMonth(this.dataType(new Date),3):3==t?this.endTime=this.getNextMonth(this.dataType(new Date),6):4==t&&(this.endTime=this.startTime)},checkStartTime:function(){this.$refs.startTimeEle.open()},checkEndTime:function(){this.$refs.endTimeEle.open()},changeSlotType:function(t){this.checkedSlotType=t},dataType:function(t){var e=t.getFullYear(),i=t.getMonth()+1;i=i<10?"0"+i:i;var s=t.getDate();s=s<10?"0"+s:s;var a=t.getHours();a=a<10?"0"+a:a;var o=t.getMinutes();o=o<10?"0"+o:o;var n=t.getSeconds();return e+"-"+i+"-"+s+" "+a+":"+o+":"+(n=n<10?"0"+n:n)},getNextMonth:function(t,e){var i=t.split("-"),s=i[0],a=i[1],o=i[2],n=new Date(s,a,0);n=n.getDate();var l=s,r=parseInt(a)+e;r>12&&(l=parseInt(l)+1,r-=12);var c=o,d=new Date(l,r,0);return c>(d=d.getDate())&&(c=d),r<10&&(r="0"+r),l+"-"+r+"-"+c},getSevenDay:function(){var t=(new Date).getTime();return t=new Date(t+6048e5),t=this.dataType(t)},getFileName:function(t){return t.replace(/\.(jpg|jpeg|png|bmp|mp4|avi|flv|wma|wmv|JPG)$/,"")},removeImg:function(t,e,i,s){var a,o=this,n=this;this.plupload.files;t["material-library"]?this.upInfor.find(function(t,e){t.id==s&&o.upInfor.splice(e,1)}):$.each(this.plupload.files,function(s,o){if(o){if(o.id==e){if(a=s,!n.upInfor.length==n.payloadInfor.length)for(var l=0;l<n.upInfor.length;l++)for(var r in n.payloadInfor)n.payloadInfor[n.upInfor[l].fileId]||delete n.payloadInfor[n.upInfor[l].fileId];if(!t.status)return n.plupload.removeFile(n.plupload.files[a]),n.upInfor.splice(i,1),void n.payloadInfor.splice(a,1);n.upInfor.splice(i,1)}n.inforIndex=-1}})},addText:function(){this.uploadType=2},addUpload:function(){this.uploadType=1,this.$refs.upWrapper.click()},getPlanInfor:function(){var t=this;this.$esellApi.send("/api/campaign/options.shtml",{}).then(function(e){t.planInfor[0].values=e.payload}).catch(function(t){})},getGroupInfor:function(){var t=this;this.$esellApi.send("/api/group/options.shtml",{}).then(function(e){t.groupInfor[0].values=e.payload}).catch(function(t){})},getSlotInfor:function(t){var e=this;this.$esellApi.send("/api/slot/options.shtml",t).then(function(t){t.payload?(e.slotInfor[0].values=t.payload,e.slotName=t.payload[0].name,e.checkedSlot=t.payload[0].value):e.slotInfor[0].values=[{value:"-1",label:"暂无数据"}]}).catch(function(t){})}},watch:{},filters:{}}},L9RB:function(t,e){},TKcW:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={components:{},props:{list:"",selectType:""},data:function(){return{checkedType:"0"}},methods:{clickItem:function(t){this.checkedType=t,this.$emit("clickItem",t)}},watch:{selectType:function(){this.checkedType=this.selectType}},created:function(){this.checkedType=this.selectType}}},TgPP:function(t,e,i){var s=i("VU/8")(i("KVds"),i("y0dq"),function(t){i("L9RB")},null,null);t.exports=s.exports},"W/e6":function(t,e){},f744:function(t,e,i){"use strict";i.d(e,"a",function(){return s}),i.d(e,"b",function(){return a});var s={created:function(){this.startTime=this.dataType(new Date),this.getSevenDay(),0==this.selectType?this.endTime=this.getSevenDay():1==this.selectType?this.endTime=this.getNextMonth(this.dataType(new Date),1):2==this.selectType?this.endTime=this.getNextMonth(this.dataType(new Date),3):1==this.selectType&&(this.endTime=this.getNextMonth(this.dataType(new Date),6)),this.$nextTick(function(){var t=this;t.plupload=new plupload.Uploader({browse_button:"upload",multi_selection:!0,runtimes:"html5,flash,html4",flash_swf_url:"https://cdn.bootcss.com/plupload/2.3.6/Moxie.swf",url:"http://oss.aliyuncs.com",filters:{max_file_size:"1gb",prevent_duplicates:!1},init:{FilesAdded:function(e,i){if(t.refreshScroll.reverse(),t.upInfor.length+i.length>5)e.files.splice(t.upInfor.length);else{for(var s=0;s<i.length;s++){if(i[s].type.indexOf("video/")<0&&i[s].type.indexOf("image/")<0)return t.content="只支持上传图片或视频",void(t.showPopup=!t.showPopup);!i[s].type.indexOf("video/")<0?t.multi="VDO":!i[s].type.indexOf("image/")<0&&(t.multi="IMG")}var a=[];t.upIdArr=[],i.map(function(t,e){var i={};i.name=t.name,a.push(i)});for(var o=0;o<i.length;o++){var n={};n.fileId=i[o].id,n.open=!0,n.barwidth=0,n.status=!1,n["material-library"]=!1,t.upIdArr.push(i[o].id),t.upInfor.push(n)}t.$esellApi.send("/media/callback/batch/add.shtml",a).then(function(e){if("OK"==e.message){for(var i=0;i<e.payload.length;i++)t.payloadInfor[t.upIdArr[i]]=e.payload[i];t.plupload.start()}}).catch(function(t){})}},UploadProgress:function(e,i){if(t.inforIndex<0)for(var s=0;s<t.upInfor.length;s++)t.upInfor[s].fileId==i.id&&(t.inforIndex=s);t.upInfor[t.inforIndex].barwidth=i.percent},BeforeUpload:function(e,i){t.plupload.setOption({url:t.payloadInfor[i.id].host,multipart_params:{key:""+t.payloadInfor[i.id].key,policy:t.payloadInfor[i.id].policy,OSSAccessKeyId:t.payloadInfor[i.id]["access-id"],success_action_status:"200",callback:t.payloadInfor[i.id].callback,signature:t.payloadInfor[i.id].sign}})},FileUploaded:function(e,i,s){var a=t.upInfor[t.inforIndex];if("200"==s.status){s=JSON.parse(s.response);a.open=!1,a.duration=s.payload.duration,a.url=s.payload.coverUrl,a.id=s.payload.id,a.name=t.getFileName(t.payloadInfor[i.id].name),a.status=!0,i.type.indexOf("video")>=0?(s.payload.coverUrl?a["cover-url"]=s.payload.coverUrl:a["cover-url"]="http://file1.yixinfa.cn/dev/180313/fdfa2242540744efa64aed672e838765.jpg",a.type="2"):a.type="1"}t.inforIndex=-1,t.upInfor.splice(t.upInfor.length)}},Error:function(e,i){-600==i.code?t.message("error","选择的文件太大"):-601==i.code?t.message("error","文件类型不符合要求"):-602==i.code?t.message("error","不允许有重复文件"):t.message("error","服务器错误，请刷新页面")}}),t.plupload.init()})}},a={data:function(){return{position:"top",content:"",showPopup:!1,modal:!0,duration:"3000",type:"error"}},created:function(){this.startTime=this.dataType(new Date),this.getSevenDay(),0==this.selectType?this.endTime=this.getSevenDay():1==this.selectType?this.endTime=this.getNextMonth(this.dataType(new Date),1):2==this.selectType?this.endTime=this.getNextMonth(this.dataType(new Date),3):1==this.selectType&&(this.endTime=this.getNextMonth(this.dataType(new Date),6)),this.$nextTick(function(){var t=this;t.plupload=new plupload.Uploader({browse_button:"upload",multi_selection:!1,runtimes:"html5,flash,html4",flash_swf_url:"https://cdn.bootcss.com/plupload/2.3.6/Moxie.swf",url:"http://oss.aliyuncs.com",filters:{max_file_size:"1gb",prevent_duplicates:!1},init:{FilesAdded:function(e,i){for(var s=0;s<i.length;s++){if(i[s].type.indexOf("video/")<0&&i[s].type.indexOf("image/")<0)return t.content="只支持上传图片或视频",void(t.showPopup=!t.showPopup);!i[s].type.indexOf("video/")<0?t.multi="VDO":!i[s].type.indexOf("image/")<0&&(t.multi="IMG")}t.refreshScroll.reverse();var a=[];t.upIdArr=[],i.map(function(t,e){var i={};i.name=t.name,a.push(i)});for(var o=0;o<i.length;o++){var n={};n.fileId=i[o].id,n.open=!0,n.barwidth=0,n.status=!1,n["material-library"]=!1,t.upIdArr.push(i[o].id),t.upInfor.push(n)}t.$esellApi.send("/media/callback/batch/add.shtml",a).then(function(e){if("OK"==e.message){for(var i=0;i<e.payload.length;i++)t.payloadInfor[t.upIdArr[i]]=e.payload[i];t.plupload.start()}}).catch(function(t){})},UploadProgress:function(e,i){if(t.inforIndex<0)for(var s=0;s<t.upInfor.length;s++)t.upInfor[s].fileId==i.id&&(t.inforIndex=s);t.upInfor[t.inforIndex].barwidth=i.percent},BeforeUpload:function(e,i){t.plupload.setOption({url:t.payloadInfor[i.id].host,multipart_params:{key:""+t.payloadInfor[i.id].key,policy:t.payloadInfor[i.id].policy,OSSAccessKeyId:t.payloadInfor[i.id]["access-id"],success_action_status:"200",callback:t.payloadInfor[i.id].callback,signature:t.payloadInfor[i.id].sign}})},FileUploaded:function(e,i,s){var a=t.upInfor[t.inforIndex];if("200"==s.status){s=JSON.parse(s.response);a.open=!1,a.duration=s.payload.duration,a.url=s.payload.coverUrl,a.id=s.payload.id,a.name=t.getFileName(t.payloadInfor[i.id].name),a.status=!0,i.type.indexOf("video")>=0?(s.payload.coverUrl?a["cover-url"]=s.payload.coverUrl:a["cover-url"]="http://file1.yixinfa.cn/dev/180313/fdfa2242540744efa64aed672e838765.jpg",a.type="VDO"):a.type="IMG"}t.inforIndex=-1,t.isText?t.upInfor.splice(1,1):t.upInfor.splice(0,1)}},Error:function(e,i){-600==i.code?t.message("error","选择的文件太大"):-601==i.code?t.message("error","文件类型不符合要求"):-602==i.code?t.message("error","不允许有重复文件"):t.message("error","服务器错误，请刷新页面")}}),t.plupload.init()})}}},f9q1:function(t,e,i){var s=i("VU/8")(i("/KUA"),i("CpoG"),function(t){i("5kMc")},null,null);t.exports=s.exports},y0dq:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{ref:"addAdv",staticClass:"addAdv"},[i("Scroll",{attrs:{data:t.refreshScroll}},[i("div",{staticClass:"addAdv_content"},[i("div",{staticClass:"title"},[i("span",[t._v("设置广告信息")])]),t._v(" "),i("div",{staticClass:"addAdv_wrapper"},[i("div",{staticClass:"item"},[i("div",{staticClass:"item_left"},[i("span",[t._v("*")]),t._v(" 推广计划")]),t._v(" "),i("div",{staticClass:"item_right plan_name"},[i("SelectContent",{attrs:{value:t.planName,placeholder:t.planInt},on:{showItem:t.checkPlan,clearItem:t.clearPlan}})],1)]),t._v(" "),i("div",{staticClass:"item"},[i("div",{staticClass:"item_left"},[i("span",[t._v("*")]),t._v(" 广告名称")]),t._v(" "),i("div",{staticClass:"item_right"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.advName,expression:"advName"}],attrs:{type:"text"},domProps:{value:t.advName},on:{input:function(e){e.target.composing||(t.advName=e.target.value)}}})])]),t._v(" "),i("div",{staticClass:"item"},[i("div",{staticClass:"item_left"},[i("span",[t._v("*")]),t._v(" 投放时间")]),t._v(" "),i("div",{staticClass:"item_right"},[i("Select",{attrs:{list:t.selectList,selectType:t.selectType},on:{clickItem:t.clickItem}})],1)]),t._v(" "),i("div",{staticClass:"item"},[i("div",{staticClass:"item_left pl24"},[t._v("\n                        开始时间\n                    ")]),t._v(" "),i("div",{staticClass:"item_right"},[4==t.selectType?i("div",{on:{click:t.checkStartTime}},[t._v("\n                            "+t._s(t.startTime)+"\n                        ")]):i("div",{staticClass:"time"},[t._v("\n                            "+t._s(t.startTime)+"\n                        ")])])]),t._v(" "),i("div",{staticClass:"item"},[i("div",{staticClass:"item_left pl24"},[t._v("\n                        结束时间\n                    ")]),t._v(" "),i("div",{staticClass:"item_right"},[4==t.selectType?i("div",{on:{click:t.checkEndTime}},[t._v("\n                            "+t._s(t.endTime)+"\n                        ")]):i("div",{staticClass:"time"},[t._v("\n                            "+t._s(t.endTime)+"\n                        ")])])]),t._v(" "),i("div",{staticClass:"item no_border"},[i("div",{staticClass:"item_left"},[i("span",[t._v("*")]),t._v(" 广告类型")]),t._v(" "),i("div",{staticClass:"item_right"},[i("Select",{attrs:{list:t.slotType,selectType:t.checkedSlotType},on:{clickItem:t.changeSlotType}})],1)])]),t._v(" "),i("div",{staticClass:"title"},[i("span",[t._v("选择投放广告位")])]),t._v(" "),i("div",{staticClass:"addAdv_wrapper"},[i("div",{staticClass:"item no_border"},[i("div",{staticClass:"item_left adv_position"},[i("span",[t._v("*")]),t._v(" 广告位置\n                    ")]),t._v(" "),1==t.isGroup?i("div",{staticClass:"item_right"},[i("div",{staticClass:"item_gtoup"},[i("SelectContent",{attrs:{value:t.groupName,placeholder:t.groupInt},on:{showItem:t.checkGroup,clearItem:t.clearGroup}})],1),t._v(" "),i("div",{staticClass:"item_slot"},[t.groupName?i("SelectContent",{attrs:{value:t.slotName,placeholder:t.slotInt},on:{showItem:t.checkSlot,clearItem:t.clearSlot}}):i("div",{staticClass:"deffault"},[t._v("\n                                未选设备组，无法选择广告位\n                            ")])],1)]):i("div",{staticClass:"item_right"},[i("div",{staticClass:"item_gtoup"},[t._v("\n                            "+t._s(t.deviceName)+"\n                        ")]),t._v(" "),i("div",{staticClass:"item_slot"},[t.deviceName!=t.tip&&2==t.isGroup?i("SelectContent",{attrs:{value:t.slotName,placeholder:t.slotInt},on:{showItem:t.checkSlot,clearItem:t.clearSlot}}):i("div",{staticClass:"deffault"},[t._v("\n                                未选择设备，无法选择广告位\n                            ")])],1)])])]),t._v(" "),i("div",{staticClass:"title"},[i("span",[t._v("上传素材")])]),t._v(" "),i("div",{staticClass:"addAdv_wrapper upload_wrapper"},[i("div",{staticClass:"item no_border"},[i("div",{staticClass:"item_left"},[i("span",[t._v("*")]),t._v(" 广告素材\n                    ")]),t._v(" "),i("div",{staticClass:"item_right"},[i("div",{staticClass:"upload_box"},[i("div",{staticClass:"upload_img",on:{click:t.addUpload}},[i("i",{staticClass:"iF"},[t._v("")]),t._v(" "),i("p",[t._v("上传素材")])]),t._v(" "),i("button",{ref:"upWrapper",attrs:{id:"upload"}}),t._v(" "),i("div",{staticClass:"upload_text",class:2==t.uploadType?"advtive_text":"",on:{click:t.addText}},[i("i",{staticClass:"iF"},[t._v("")]),t._v(" "),i("p",[t._v("上传文字")])])])])]),t._v(" "),i("div",{staticClass:"slot_box"},[t.upInfor.length>0?i("div",{directives:[{name:"show",rawName:"v-show",value:1==t.uploadType,expression:"uploadType==1"}],staticClass:"img_lissst"},[i("ImgList",{attrs:{list:t.upInfor},on:{remove:t.removeImg,clickItem:t.clickItem}})],1):i("div",{directives:[{name:"show",rawName:"v-show",value:1==t.uploadType,expression:"uploadType==1"}],staticClass:"initText"},[t._v("\n                        您暂未上传素材\n                    ")]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:2==t.uploadType,expression:"uploadType==2"}],staticClass:"item no_border "},[i("div",{staticClass:"item_left"},[i("span",[t._v("*")]),t._v(" 文字内容\n                        ")]),t._v(" "),i("div",{staticClass:"item_right"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.textSlotVal,expression:"textSlotVal"}],attrs:{type:"text",placeholder:"请输入文字内容"},domProps:{value:t.textSlotVal},on:{input:function(e){e.target.composing||(t.textSlotVal=e.target.value)}}})])]),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:2==t.uploadType,expression:"uploadType==2"}],staticClass:"item no_border "},[i("div",{staticClass:"item_left"},[i("span",[t._v("*")]),t._v(" 播放时长\n                        ")]),t._v(" "),i("div",{staticClass:"item_right"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.slotShowTime,expression:"slotShowTime"}],attrs:{type:"text",placeholder:"请输入播放时长"},domProps:{value:t.slotShowTime},on:{input:function(e){e.target.composing||(t.slotShowTime=e.target.value)}}}),t._v(" 秒\n                        ")])])])])])]),t._v(" "),i("div",{staticClass:"saveAdv_wrapper"},[i("div",{staticClass:"save_adv",on:{click:t.save}},[t._v("\n            发布\n        ")])]),t._v(" "),i("mt-datetime-picker",{ref:"startTimeEle",attrs:{type:"datetime",startDate:t.initTime},on:{confirm:t.setStartTime}}),t._v(" "),i("mt-datetime-picker",{ref:"endTimeEle",attrs:{type:"datetime",startDate:t.initTime},on:{confirm:t.setEndTime}}),t._v(" "),i("SelectPick",{attrs:{valueKey:t.valueKey,checked:t.pickChecked,list:t.pickList,isShow:t.pickShow},on:{confirm:t.setGroup,cancle:t.cancle}}),t._v(" "),i("Infor",{attrs:{position:t.position,duration:t.duration,type:t.type,content:t.content,modal:t.modal,showPopup:t.showPopup}})],1)},staticRenderFns:[]}}});