webpackJsonp([15],{"0m/L":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"Cell",props:{title:"",specification:""},data:function(){return{}},methods:{click:function(){this.$emit("click")}}}},"3gec":function(e,t){},KxKy:function(e,t){},WyLw:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"vue-cell",on:{click:e.click}},[i("div",[e._v(e._s(e.title)+" ("+e._s(e.specification)+")")]),e._v(" "),e._m(0)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("i",{staticClass:"iF"},[this._v("")])])}]}},c9nC:function(e,t,i){var s=i("VU/8")(i("g6ik"),i("p4Dv"),function(e){i("3gec")},"data-v-cd893d88",null);e.exports=s.exports},g6ik:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("2/Wp"),c=i.n(s),a=i("jNMf"),l=i.n(a),n=i("Au9i"),h=(i.n(n),i("RZmG")),o=i.n(h);t.default={name:"RemoteControl",components:{SelectPick:c.a,BottomOperation:o.a,Cell:l.a,Toast:n.Toast},data:function(){return{pickChecked:"",restartpickChecked:"",switchpickChecked:"",clearCachepickChecked:"",restartpickSelectedLable:"",switchpickSelectedLable:"",clearCachepickSelectedLable:"",restartpickSelectedValue:"",switchpickSelectedValue:"",clearCachepickSelectedValue:"",operation:"",pickShow:!1,pickList:[],pickType:"",restartpickList:[{flex:1,values:[{label:"是",value:1},{label:"否",value:2}],className:"slot1",textAlign:"center",defaultIndex:0}],switchpickList:[{flex:1,values:[{label:"是",value:"1"},{label:"否",value:"2"}],className:"slot1",textAlign:"center",defaultIndex:0}],clearCachepickList:[{flex:1,values:[{label:"是",value:"true"},{label:"否",value:"false"}],className:"slot1",textAlign:"center",defaultIndex:0}],duration:0,show:!1,info:"",volume:null,brightness:null,cacheTime:0,checkedGroup:"",slotInt:"",slots:"",showGroup:"",message:"完成设置",actionType:""}},created:function(){this.getTimingSwitch()},methods:{getTimingSwitch:function(){var e=this;this.$esellApi.send("/api/device/attrbute/get.shtml",{id:this.$route.query.id}).then(function(t){void 0!=t.payload?(e.volume=t.payload.volume,e.cacheTime=t.payload["cache-time"],e.actionType=t.payload["action-type"]?t.payload["action-type"]:"everyday",e.brightness=t.payload.brightness):e.actionType="everyday"}).catch(function(e){Object(n.Toast)({message:e.message,position:"middel",duration:2e3})})},completeSettings:function(){"1"==this.restartpickSelectedValue&&(this.operation="re"),"1"==this.switchpickSelectedValue&&(this.operation="sd"),this.$esellApi.send("/api/device/attrbute/save.shtml",{id:this.$route.query.id,volume:this.volume?this.volume:0,brightness:this.brightness?this.brightness:0,"cache-time":this.cacheTime?this.cacheTime:0,"clear-cache":this.clearCachepickSelectedValue?this.clearCachepickSelectedValue:"",operation:this.operation}).then(function(e){Object(n.Toast)({message:"设置成功",position:"middel",duration:3e3})}).catch(function(e){Object(n.Toast)({message:e.message,position:"middel",duration:3e3})})},restart:function(){this.pickShow=!0,this.pickList=this.restartpickList,this.pickChecked=this.restartpickChecked,this.pickType="restart"},switch1:function(){this.pickType="switch1",this.pickShow=!0,this.pickList=this.switchpickList,this.pickChecked=this.switchpickChecked},clearCache:function(){this.pickType="clearCache",this.pickShow=!0,this.pickList=this.clearCachepickList,this.pickChecked=this.clearCachepickChecked},cancle:function(){this.pickShow=!1},setGroup:function(e){this.pickShow=!1,"restart"==this.pickType?(this.restartpickSelectedLable=e[0].label,this.restartpickSelectedValue=e[0].value,"是"==this.switchpickSelectedLable&&"是"==this.restartpickSelectedLable&&(Object(n.Toast)({message:"立即重启或立即关机只能选择一个",position:"middel",duration:2e3}),this.switchpickSelectedValue="",this.switchpickSelectedLable="")):"switch1"==this.pickType?(this.switchpickSelectedLable=e[0].label,this.switchpickSelectedValue=e[0].value,"是"==this.switchpickSelectedLable&&"是"==this.restartpickSelectedLable&&(Object(n.Toast)({message:"立即重启或立即关机只能选择一个",position:"middel",duration:2e3}),this.restartpickSelectedValue="",this.restartpickSelectedLable="")):"clearCache"==this.pickType&&(this.clearCachepickSelectedLable=e[0].label,this.clearCachepickSelectedValue=e[0].value)},minusNum:function(){this.cacheTime--,-1==this.cacheTime&&(this.cacheTime=0)},addNum:function(){this.cacheTime++,this.cacheTime>7&&(this.cacheTime=7)},setTimingSwitch:function(){this.$router.push({path:"/set_timing_switch",query:{id:this.$route.query.id,type:this.$route.query.type,actiontype:this.actionType}})}}}},jNMf:function(e,t,i){var s=i("VU/8")(i("0m/L"),i("WyLw"),function(e){i("KxKy")},"data-v-cbc2619e",null);e.exports=s.exports},p4Dv:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"remote-control"},[i("div",{staticClass:"voice"},[i("div",[e._v("声音："+e._s(e.volume))]),e._v(" "),i("div",{staticClass:"voice-info"},[i("mt-range",{model:{value:e.volume,callback:function(t){e.volume=t},expression:"volume"}},[i("div",{staticClass:"voice-info-start",attrs:{slot:"start"},slot:"start"},[i("i",{staticClass:"iF"},[e._v("")])]),e._v(" "),i("div",{staticClass:"voice-info-end",attrs:{slot:"end"},slot:"end"},[i("i",{staticClass:"iF"},[e._v("")])])])],1)]),e._v(" "),i("div",{staticClass:"brightness"},[i("div",[e._v("亮度："+e._s(e.brightness))]),e._v(" "),i("div",{staticClass:"brightness-info"},[i("mt-range",{attrs:{max:225},model:{value:e.brightness,callback:function(t){e.brightness=t},expression:"brightness"}},[i("div",{staticClass:"brightness-info-start",attrs:{slot:"start"},slot:"start"},[i("i",{staticClass:"iF"},[e._v("")])]),e._v(" "),i("div",{staticClass:"brightness-info-end",attrs:{slot:"end"},slot:"end"},[i("i",{staticClass:"iF"},[e._v("")])])])],1)]),e._v(" "),i("div",{staticClass:"cacheTime"},[i("div",[e._v("缓存时间："+e._s(e.cacheTime)+" (天)")]),e._v(" "),i("div",{staticClass:"cacheTime-info"},[i("div",{staticClass:"cacheTime-info-left kuang",on:{click:e.minusNum}},[e._v("-")]),e._v(" "),i("div",{staticClass:"cacheTime-info-content"},[e._v(e._s(e.cacheTime))]),e._v(" "),i("div",{staticClass:"cacheTime-info-right kuang",on:{click:e.addNum}},[e._v("+")])])]),e._v(" "),i("div",{staticClass:"other"},[i("div",{staticClass:"other-set"},[e._v("其他设置")]),e._v(" "),i("div",{staticClass:"set-timing-switch",on:{click:e.setTimingSwitch}},[i("div",[e._v("设置定时开关机")]),e._v(" "),e._m(0)]),e._v(" "),i("div",{staticClass:"restart",on:{click:e.restart}},[i("div",[e._v("是否重启")]),e._v(" "),i("div",{staticClass:"restart-right"},[i("div",{staticStyle:{"padding-left":"2.5rem"}},[e._v(e._s(e.restartpickSelectedLable))]),e._v(" "),e._m(1)])]),e._v(" "),i("div",{staticClass:"switch",on:{click:e.switch1}},[i("div",[e._v("是否关机")]),e._v(" "),i("div",{staticClass:"switch-right"},[i("div",{staticStyle:{"padding-left":"2.5rem"}},[e._v(e._s(e.switchpickSelectedLable))]),e._v(" "),e._m(2)])]),e._v(" "),i("div",{staticClass:"clearCache",on:{click:e.clearCache}},[i("div",[e._v("清理缓存")]),e._v(" "),i("div",{staticClass:"clearCache-right"},[i("div",{staticStyle:{"padding-left":"2.5rem"}},[e._v(e._s(e.clearCachepickSelectedLable))]),e._v(" "),e._m(3)])])]),e._v(" "),i("bottom-operation",{attrs:{message:e.message},on:{click:e.completeSettings}}),e._v(" "),i("SelectPick",{attrs:{checked:e.pickChecked,list:e.pickList,isShow:e.pickShow},on:{confirm:e.setGroup,cancle:e.cancle}})],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("i",{staticClass:"iF",staticStyle:{color:"#999999"}},[this._v("")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("i",{staticClass:"iF",staticStyle:{color:"#999999"}},[this._v("")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("i",{staticClass:"iF",staticStyle:{color:"#999999"}},[this._v("")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",[t("i",{staticClass:"iF",staticStyle:{color:"#999999"}},[this._v("")])])}]}}});