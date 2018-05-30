<template>
 <div class="template_wrapper">
  <div class="template_box cf">
   <div class="template_left fl" >
    <span class="title active">组件库</span>
    <div class="module_list">
     <ul class="cf">
      <li class="item" data-num="1" @mouseenter="showItem(1)">
       <i class="iF">&#xe666;</i>
       <p>广告位</p>
      </li>
      <li class="item" data-num="2" @mouseenter="showItem(2)">
       <i class="iF">&#xe660;</i>
       <p>图片</p>
      </li>
      <li class="item" data-num="3" @mouseenter="showItem(3)">
       <i class="iF">&#xe665;</i>
       <p>视频</p>
      </li>
      <li class="item" data-num="4" @mouseenter="showItem(4)">
       <i class="iF">&#xe662;</i>
       <p>文本</p>
      </li>
      <li class="item" data-num="5" @mouseenter="showItem(5)">
       <i class="iF">&#xe667;</i>
       <p>天气</p>
      </li>
      <li class="item" data-num="6" @mouseenter="showItem(6)">
       <i class="iF">&#xe664;</i>
       <p>时钟</p>
      </li>
      <li class="item" data-num="7" @mouseenter="showItem(7)">
       <i class="iF">&#xe661;</i>
       <p>浏览器</p>
      </li>
      <li class="item" data-num="8" @mouseenter="showItem(8)">
       <i class="iF">&#xe6b0;</i>
       <p>互动按钮</p>
      </li>
     </ul>
    </div>
   </div>
   <div class="template_center fl">
    <div class="top">
     <ul class="cf center_parent">
      <li title="顶部对齐">
       <i class="gotop" @click="goTop"></i>
      </li>
      <li title="底部对齐">
       <i class="godown" @click="goDown"></i>
      </li>
      <li title="靠左对齐">
       <i class="goleft" @click="goLeft"></i>
      </li>
      <li title="靠右对齐">
       <i class="goright" @click="goRight"></i>
      </li>
      <li title="左右铺满">
       <i class="left_right" @click="colFull"></i>
      </li>
      <li title="上下铺满">
       <i class="top_down" @click="rowFull"></i>
      </li>
      <li title="全屏铺满">
       <i class="goall" @click="goFull"></i>
      </li>
      <li title="放置最上层">
       <i class="gomax" @click="goMax"></i>
      </li>
      <li title="放置最底层">
       <i class="gomin" @click="goMin"></i>
      </li>
      <li title="移除组件">
       <i class="goremove" @click="goRemove"></i>
      </li>
     </ul>
    </div>
    <div class="mid pr center_main" id="template_wrapper" :style="'width:'+intWidth+'px;height:'+intHeight+'px;'">
     <div v-for="(item, index) in slotArr" data-estype="slot" :data-type-num="item.number" :data-num="item.num" :data-slot="item.number" :data-sign="item.number + '{slotId}'"
          class="ui-widget-content slot_wrapper template_item" :class="['slot_wrapper_num'+item.number,{'select_template':slotSelect==item.number}]"
          :style="'top:'+item.top+'%;left:'+item.left+'%;z-index:'+item.zindex+';width:'+item.itemwidth+'px;height:'+item.itemheight+'px;'" @click="select(item.number,item.type)"  :key="index"  @mouseout.once="addDr($event),addRe($event)" @mouseup.once="addDr($event),addRe($event)">
      <div :id="'slot_box'+item.number" class="slot_box">
        <div class="slot_name">{{item.slotname}}</div>
       <div class="slot_bgimg">
       </div>
      </div>
      <div class="layout_corver">
       <div class="layout_txt_wrapper addAdv">
        <span class="iF layout_fs">&#xe69f;</span>
        <p>发布广告</p>
       </div>
       <div class="layout_txt_wrapper addAdvGroup">
        <span class="iF layout_fs">&#xe6ad;</span>
        <p>发布广告组</p>
       </div>
       <div class="layout_txt_wrapper can_control">
        <span class="iF layout_fs">&#xe66f;</span>
        <p>权限控制</p>
       </div>
       <div class="layout_txt_wrapper  not_control">
        <span class="iF layout_fs">&#xe670;</span>
        <p>无操作权限</p>
       </div>
       <div class="layout_txt_wrapper reserved ">
        <span class="iF layout_fs">&#xe670;</span>
        <p>为后面拓展操作预留</p>
       </div>
       <div class="layout_txt_wrapper reserved ">
        <span class="iF layout_fs">&#xe670;</span>
        <p>为后面拓展操作预留</p>
       </div>
      </div>
     </div>

     <div v-for="(item, index) in imgArr" data-estype="img" :data-type-num="item.number" :data-num="item.num" :data-img="item.number"
          class="ui-widget-content img_wrapper template_item" :class="['img_wrapper_num'+item.number,{'select_template':imgSelect==item.number}]"
          :style="'top:'+item.top+'%;left:'+item.left+'%;z-index:'+item.zindex+';width:'+item.itemwidth+'px;height:'+item.itemheight+'px;max-width:'+intWidth+'px;max-height:'+intHeight+'px;'"  @click="select(item.number,item.type)"  :key="index"  @mouseout.once="addDr($event),addRe($event)" @mouseup.once="addDr($event),addRe($event)">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="item.barwidth" v-show="item.showbar"></el-progress>
      <div :id="'img_box'+item.number" class="img_box">
       <div class="img_bgimg" v-show="!item.showbgimg">
       </div>
       <div class="up_img" v-if="item.showbgimg" >
            <img :src="item.imgsrc">
       </div>
      </div>    
     </div>

     <div v-for="(item, index) in videoArr" data-estype="video" :data-type-num="item.number" :data-num="item.num" :data-video="item.number"
          class="ui-widget-content video_wrapper template_item" :class="['video_wrapper_num'+item.number,{'select_template':videoSelect==item.number}]"
          :style="'top:'+item.top+'%;left:'+item.left+'%;z-index:'+item.zindex+';width:'+item.itemwidth+'px;height:'+item.itemheight+'px;'"  @click="select(item.number,item.type)"  :key="index"  @mouseout.once="addDr($event),addRe($event)" @mouseup.once="addDr($event),addRe($event)">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="item.barwidth" v-show="item.showbar"></el-progress> 
      <div :id="'video_box'+item.number" class="video_box">
       <div class="video_bgimg" v-show="!item.showbgimg">
       </div>
       <div class="up_img" v-if="item.showbgimg" >
            <img :src="item.imgsrc">
       </div>
      </div>
     </div>



     <div v-for="(item, index) in txtArr" data-estype="txt" :data-type-num="item.number" :data-num="item.num" :data-txt="item.number"
          class="ui-widget-content txt_wrapper template_item" :class="['txt_wrapper_num'+item.number,{'select_template':txtSelect==item.number}]"
          :style="'top:'+item.top+'%;left:'+item.left+'%;z-index:'+item.zindex+';width:'+item.itemwidth+'px;height:'+item.itemheight+'px;background:'+item.bgcolor"  @click="select(item.number,item.type)"  :key="index"  @mouseout.once="addDr($event),addRe($event)" @mouseup.once="addDr($event),addRe($event)">
      <div :id="'txt_box'+item.number" class="txt_box">
       <div @dblclick="txtChange(index)" class="txt" :style="'color:'+item.txtColor">{{item.val}}</div>
      </div>
      <div class="txt_write" v-show="item.show">
       <textarea  v-model="item.val"  :placeholder="请输入播放文字" @blur="setTxt(index)" :id="'text'+item.number"></textarea>
      </div>
     </div>





     <div v-for="(item, index) in weatherArr" data-estype="weather" :data-type-num="item.number" :data-num="item.num" :data-weather="item.number"
          class="ui-widget-content weather_wrapper template_item" :class="['weather_wrapper_num'+item.number,{'select_template':weatherSelect==item.number}]"
          :style="'top:'+item.top+'%;left:'+item.left+'%;z-index:'+item.zindex+';background:'+item.bgcolor"  @click="select(item.number,item.type)"  :key="index"  @mouseout.once="addDr($event)" @mouseup.once="addDr($event)" @mouseover="removeRe($event)">
      <div :id="'weather_box'+item.number" class="weather_box"  :style="'color:'+item.txtColor">
       <ul class="cf" v-show="!noWeather">
        <li v-for="(item1, index) in item.weather"  :key="index">
         <i class="iF" v-html="item1.icon"></i>
         <span> {{item1.txt}}</span>
        </li>
       </ul>
       <div v-show="noWeather" class="nodata">暂无天气数据</div>
      </div>
     </div>

    <div v-for="(item, index) in timeArr" data-estype="time" :data-type-num="item.number" :data-num="item.num" :data-time="item.number"
          class="ui-widget-content time_wrapper template_item" :class="['time_wrapper_num'+item.number,{'select_template':timeSelect==item.number}]"
           :style="'top:'+item.top+'%;left:'+item.left+'%;z-index:'+item.zindex+';background:'+item.bgcolor"  @click="select(item.number,item.type)"  :key="index"  @mouseout.once="addDr($event)" @mouseup.once="addDr($event)" @mouseover="removeRe($event)">
      <div :id="'time_box'+item.number" class="time_box" :style="'color:'+item.txtColor">
       {{time|data}}
      </div>
     </div>




     <div v-for="(item, index) in webArr" data-estype="web" :data-type-num="item.number" :data-num="item.num" :data-web="item.number"
          class="ui-widget-content web_wrapper template_item" :class="['web_wrapper_num'+item.number,{'select_template':webSelect==item.number}]"
          :style="'top:'+item.top+'%;left:'+item.left+'%;z-index:'+item.zindex+';width:'+item.itemwidth+'px;height:'+item.itemheight+'px;'"  @click="select(item.number,item.type)"  :key="index"  @mouseout.once="addDr($event),addRe($event)" @mouseup.once="addDr($event),addRe($event)">
      <div :id="'web_box'+item.number" class="web_box">
       <div class="web_bgimg" v-show="!item.webshow">
       </div>
        <iframe :src="item.weburl" frameborder="0" v-show="item.webshow" style="width: 96%;height: 90%;font-size:1200px;"></iframe>
      </div>
     </div>



    <div v-for="(item, index) in interArr" data-estype="inter" :data-type-num="item.number" :data-num="item.num" :data-inter="item.number" :data-inter-type="item.interType" :data-inter-temp="item.interTemp"
          class="ui-widget-content inter_wrapper template_item" :class="['inter_wrapper_num'+item.number,{'select_template':interSelect==item.number}]"
          :style="'top:'+item.top+'%;left:'+item.left+'%;z-index:'+item.zindex+';width:'+item.itemwidth+'px;height:'+item.itemheight+'px;max-width:'+intWidth+'px;max-height:'+intHeight+'px;'"  @click="select(item.number,item.type)"  :key="index" @mouseout.once="addDr($event),addRe($event)" @mouseup.once="addDr($event),addRe($event)">
      <el-progress :text-inside="true" :stroke-width="18" :percentage="item.barwidth" v-show="item.showbar"></el-progress>
      <div :id="'inter_box'+item.number" class="inter_box">
       <div class="inter_bgimg" v-show="!item.showbgimg">
         互动按钮
       </div>
       <div class="up_img" v-if="item.showbgimg" >
            <img :src="item.imgsrc">
       </div>
      </div>    
     </div>



    </div>
   </div>
   <div class="template_right fl pr">
     <div class="right_wrapper cf">
      <div class="right_item1">
        <div class="title">模板信息</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="name_box">
          <el-form-item label="模板名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请填写模板名称"></el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" :model="formInline" :rules="rulesInline" ref="formInline" class="demo-form-inline size_box">
          <el-form-item label="模板大小" prop="width">
            <el-input v-model="formInline.width" placeholder="宽度"></el-input>
          </el-form-item>
          <span class="txt_size">px</span>
          <el-form-item prop="height">
            <el-input v-model="formInline.height" placeholder="高度"></el-input>
          </el-form-item>
          <span class="txt_size">px</span>
          <el-form-item label="模板类型" class="type_box">
            <el-radio-group v-model="templateType">
              <span @click.prevent="changeTemp('横屏模板')" class="cf inline-wrapper">
                <el-radio label="横屏模板"></el-radio>
              </span>
              <span @click.prevent="changeTemp('竖屏模板')" class="cf inline-wrapper">
                <el-radio label="竖屏模板"></el-radio>
              </span>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="right_item2">
        <div class="title">组件信息</div>
        <el-form :inline="true" :model="formInline" :rules="rulesInline" ref="formInline" class="demo-form-inline position_box">
          <el-form-item label="X" prop="itemX">
            <el-input v-model="formInline.itemX" placeholder="左边距"></el-input>
          </el-form-item>
          <el-form-item label="Y" prop="itemY">
            <el-input v-model="formInline.itemY" placeholder="右边距"></el-input>
          </el-form-item>
          <el-form-item label="W" prop="itemW">
            <el-input v-model="formInline.itemW" placeholder="宽度"></el-input>
          </el-form-item>
          <el-form-item label="H" prop="itemH">
            <el-input v-model="formInline.itemH" placeholder="高度"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="right_item3">
        <div class="title">组件设置</div>
        <div class="wrapper">
        <div class="wrapper_item1" v-show="itemShow==1">
          <div class="slot_box cf">
          <span class="item_height_title">广告位名称</span>
          <el-input v-model="slotName" placeholder="广告位名称" @change="setSlotName"></el-input>
          </div>
        </div>
        <div class="wrapper_item2" v-show="itemShow==2">
          <div class="img_upload_box cf">
          <div class="add_upload item" @click="addImg">
            <i class="iF">&#xe6ad;</i><br>
            <p>上传新图片</p>
          </div>
          <div class="from_library item" @click="libraryClick('img','img',1)">
            <i class="iF">&#xe6a4;</i><br>
            <p>素材库选择</p>
          </div>
          <button id="imageClick"></button>
          </div>
        </div>
        <div class="wrapper_item3" v-show="itemShow==3">
          <div class="video_upload_box cf">
          <div class="video_upload item" @click="addVideo">
            <i class="iF">&#xe6ad;</i><br>
            <p>上传新视频</p>
          </div>
          <div class="from_library item" @click="libraryClick('video','video',1)">
            <i class="iF">&#xe6a4;</i><br>
            <p>素材库选择</p>
          </div>
          <button id="videoClick"></button>
          </div>
        </div>
        <div class="wrapper_item4" v-show="itemShow==4">
          <div class="txt_infor cf">
          <div class="txt_item">
            <span class="txt_font_color">字体颜色</span>
            <el-color-picker v-model="txtFontColor" @change="txtColor" color-format="rgb"></el-color-picker>
          </div>
          <div class="txt_item">
            <span class="txt_bg_color">背景颜色:</span>
            <el-color-picker v-model="bgColor" @change="txtBgColor" color-format="rgb" show-alpha="true"></el-color-picker>
          </div>
          <div class="speed_wrapper">
            <span class="txt_bg_color">文字状态</span>
            <el-select v-model="txtSpeed" placeholder="请选择" @change="speed" @visible-change="checkItem">
                <el-option
                v-for="item in speeds"
                :key="item.txtSpeed"
                :label="item.label"
                :value="item.txtSpeed">
                </el-option>
            </el-select>
          </div>
          <div class="orientation_wrapper" v-show="orienshow">
            <span class="txt_bg_color">滚动方向:</span>
            <el-select v-model="txtOrien" placeholder="请选择" @change="ort">
                <el-option
                v-for="item in orientation"
                :key="item.title"
                :label="item.label"
                :value="item.title">
                </el-option>
            </el-select>
          </div>
          </div>
        </div>
        <div class="wrapper_item5" v-show="itemShow==5">
          <div class="txt_infor cf">
            <div class="txt_item">
                <span class="txt_font_color">字体颜色</span>
                <el-color-picker v-model="txtFontColor" @change="txtColor" color-format="rgb"></el-color-picker>
            </div>
            <div class="txt_item">
                <span class="txt_bg_color">背景颜色</span>
                <el-color-picker v-model="bgColor" @change="txtBgColor" color-format="rgb" show-alpha="true"></el-color-picker>
            </div>
            <div class="weather_box">
                <span class="weather_title">天气元素:</span>
                <el-checkbox-group v-model="weatherList" @change="weather">
                    <el-checkbox label="城市"></el-checkbox>
                    <el-checkbox label="天气"></el-checkbox>
                    <el-checkbox label="温度"></el-checkbox>
                    <el-checkbox label="风向"></el-checkbox>
                </el-checkbox-group>
            </div>
          </div>
        </div>
        <div class="wrapper_item6" v-show="itemShow==6">
              <div class="txt_infor cf">
            <div class="txt_item">
                <span class="txt_font_color">字体颜色</span>
                <el-color-picker v-model="txtFontColor" @change="txtColor" color-format="rgb"></el-color-picker>
            </div>
            <div class="txt_item">
                <span class="txt_bg_color">背景颜色</span>
                <el-color-picker v-model="bgColor" @change="txtBgColor" color-format="rgb" show-alpha="true"></el-color-picker>
            </div>
          </div>
        </div>
        <div class="wrapper_item7" v-show="itemShow==7">
          <div class="web_box_item cf">
          <span class="item_height_title">网络地址</span>
          <el-input v-model="webUrl" placeholder="请输入url" @change="setWenUrl"></el-input>
          </div>
          <div class="web_btn">
            <a class="yxf-but" @click="showWeb">预览</a>
            <a class="yxf-but ml14" @click="hideWeb">重置</a>
          </div>
        </div>
        <div class="wrapper_item8" v-show="itemShow==8">
          <div class="inter_top cf">
            <div class="txt">按钮图标:</div>
            <div class="inter_btnbox">
              <a class="yxf-but" @click="addInterBtn">上传图片</a>
              <button id="interClick"></button>
              <a class="yxf-but" @click="libraryClick('inter','img',1)">素材库选择</a>
            </div>
          </div>
          <div class="inter_bottom cf">
           <div class="cf">
              <div class="txt">按钮类型:</div>
              <div class="inter_radio">
                <el-radio-group v-model="interType" @change="setInterType">
                <el-radio :label="1">图片</el-radio>
                <el-radio :label="2">视频</el-radio>
                <el-radio :label="3">网页</el-radio>
                <el-radio :label="4">模板</el-radio>
              </el-radio-group>
              </div>
           </div>
            <div class="btm_box cf">
              <div class="btm_item cf" v-show="interType==1">
                  <div class="add_upload item" @click="addInterImg">
                    <i class="iF">&#xe6ad;</i><br>
                    <p>上传新图片</p>
                  </div>
                  <div class="from_library item" @click="libraryClick('inter','img',2)">
                    <i class="iF">&#xe6a4;</i><br>
                    <p>素材库选择</p>
                  </div>
              </div>
              <button id="interImgClick"></button>
              <button id="interVideoClick"></button>
              <div class=" btm_item cf" v-show="interType==2">
                  <div class="cf">
                    <div class="add_upload item" @click="addInterVideo">
                      <i class="iF">&#xe6ad;</i><br>
                      <p>上传新视频</p>
                    </div>
                    <div class="from_library item" @click="libraryClick('inter','video',2)">
                      <i class="iF">&#xe6a4;</i><br>
                      <p>素材库选择</p>
                    </div>
                  </div>
              </div>
              <div class="btm_item cf" v-show="interType==3">
                 <div class="txt">网站连接:</div>
                 <div class="interUrl_box">
                   <el-input v-model="interUrl" @blur="setInterUrl" @click="clearInterUrl" icon="circle-close" placeholder="请输入跳转网址"></el-input>
                 </div>
              </div>
              <div class="btm_item cf" v-show="interType==4">
                 <div class="txt">模板跳转:</div>
                 <div class="interUrl_box">
                    <el-select v-model="checkedTemp" clearable placeholder="请选择需要跳转的模板" @change="setInterTemp">
                      <el-option v-for="item in tempList" :key="item.value" :label="item.name" :value="item.id">
                      </el-option>
                    </el-select>
                 </div>
              </div>
            </div>
          </div>
          <div class="img_list cf">
            <div class="item" v-for="(item,index) in interArr" :key="index" v-if="item.interShow&&showInterImg==index+1">
              <img :src="item.interSrc">
            </div>
          </div>
        </div>
        </div>
      </div>
      <div class="right_item4">
       <a class="yxf-but" @click="back">返回</a>
       <a class="yxf-but ml14" @click="saveTemp">保存</a>
      </div>
     </div>
   </div>
  </div>
  <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          size="5%"
          top="30%"
          :before-close="handleClose">
   <span>{{msg}}</span>
   <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
  <!--素材库选择弹框-->
  <div>
  <el-dialog title="素材库选择" :visible.sync="materialLibrarySelect" size="small" class="library">
     <div class="select-device-group-dialog">
        <div class="clearfix library_title">
            <div class="fl" style="min-width:77px;">
                <span>素材名称</span>
            </div>
            <span class="fl">
                <el-input style="min-width:313px;" v-model="textContent" placeholder="请填写素材名称"></el-input>
            </span>
            <a href="javascript:;" class="yxf-but fl" style="margin-left:77px;">查询</a>
        </div>
        <div style="padding:10px 0;">
            <div class="home-fenyeCon">
                <div class="all-material clearfix">
                    <div class="material-file fl clearfix library_item" v-for="(item, index) in list" :key="index" @click.prevent="checkLibrary(index)">
                        <div class="file-type">
                            <!-- <img src="./../../assets/images/material_manage/file.png" > -->
                            <div v-if = "item.type == 'IMG'">
                              <img :src="item.url">
                            </div>
                            <div v-else>
                              <img :src="item['cover-url'] || 'http://file1.yixinfa.cn/dev/180301/be3e46f82df444558384b66f288126c5'" @click="preview(item)">
                            </div>
                        </div>
                        <div class="file-name clearfix">
                            <div class="file-name-left fl">
                              <el-radio class="radio" v-model="libraryNum" :label="index">{{item["name"]}}</el-radio>
                              <div style="text-align: center">{{item["create-time"]}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="paging">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="size" :page-sizes='[8,16,24]' layout="total, sizes, prev, pager, next, jumper" :total="libraryTotal">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
    <span slot="footer" class="dialog-footer">
       <a href="javascript:;" @click="cancel" class="yxf-but">取 消</a>
       <a href="javascript:;" @click="save" class="yxf-but ml10">确 定</a>
    </span>
  </el-dialog> 
    <el-dialog title="预览" top="40%" :visible.sync="previewState" modal-append-to-body="false" size="tiny" class="preview">
     <video width="100%" :src="videoUrl" controls="ontrols"></video>
    </el-dialog>       
  </div> 
  <div >
    <el-dialog title="提示" top="40%" :visible.sync="loading" :before-close="closeCorver" modal-append-to-body="false" size="tiny">
      <div class="save_corver">
        <span class="txt">正在保存请稍后</span>
        <span  v-loading="loading"></span>  
      </div>
    </el-dialog>     
  </div>
 </div>
</template>
<script>
import {searchSubStr} from '../../assets/common/base'
export default {
  name: "template",
  data() {
    var checkWidth = (rule, value, callback) => {
      let tempW=parseFloat($('#template_wrapper').css('width'))*2;
        if (!value) {
          return callback(new Error('宽度不能为空'));
        }
        var that =this;
        value=parseFloat(value);
        clearTimeout(this.widthTimer)
        this.widthTimer=setTimeout(() => {
          if(value!=tempW){
            that.callbackfn(value,100,4096,that.setTempWidth,callback);
          }else{
            callback()
          }
        }, 800);
      };
    var checkHeight = (rule, value, callback) => {
       let tempH=parseFloat($('#template_wrapper').css('height'))*2;
        if (!value) {
          return callback(new Error('高度不能为空'));
        }
        var that =this;
        value=parseFloat(value);
        clearTimeout(this.heightTimer)
        this.heightTimer=setTimeout(() => {
          if(value!=tempH){
             that.callbackfn(value,100,4096,that.setTempHeight,callback);
          }else{
            callback()
          }
        }, 800);
      };
    var checkitemX = (rule, value, callback) => {
        let item=$(".select_template");   
        value=parseFloat(value);
        if (!value&&value!=0) { 
          if(item.length<1){
            callback()
            return 
          }else{
            return callback(new Error('请输入正整数'));
          }
        }
        if (item.length<1) {
          return callback(new Error('请选择需要修改的组件'));
        }
        var that =this;
        clearTimeout(this.itemLeftTimer)
        this.itemLeftTimer=setTimeout(() => {
          that.callbackfn(value,0,(this.formInline.width-this.formInline.itemW),that.setItemLeft,callback)
        }, 800);
      };
    var checkitemY = (rule, value, callback) => {
        let item=$(".select_template");
        value=parseFloat(value);
        if (!value&&value!=0) { 
          if(item.length<1){
            callback()
            return 
          }else{
            return callback(new Error('请输入正整数'));
          }
        }
        if (item.length<1) {
          return callback(new Error('请选择需要修改的组件'));
        }
        var that =this;
        clearTimeout(this.itemTopTimer)
        this.itemTopTimer=setTimeout(() => {
          that.callbackfn(value,0,(this.formInline.height-this.formInline.itemH),that.setItemTop,callback)
        }, 800);
      };
    var checkitemH = (rule, value, callback) => {
        let item=$(".select_template");
        if (!value) { 
          if(item.length<1){
            callback()
            return 
          }else{
           return callback(new Error('请输入正整数'));
          }
        }
        if (item.length<1) {
          return callback(new Error('请选择需要修改的组件'));
        }
        var that =this;
        value=parseFloat(value);

        clearTimeout(this.itemHeightTimer)
        this.itemHeightTimer=setTimeout(() => {
          that.callbackfn(value,20,this.formInline.height,that.setItemHeight,callback)
        }, 800);
      };
    var checkitemW = (rule, value, callback) => {
       let item=$(".select_template");
        if (!value) { 
          if(item.length<1){
            callback();
            return ;
          }else{
            return callback(new Error('请输入正整数'));
          }
        }
        if (item.length<1) {
          return callback(new Error('请选择需要修改的组件'));
        }
        var that =this;
        value=parseFloat(value);
        clearTimeout(this.itemWidthTimer);
        this.itemWidthTimer=setTimeout(() => {
          that.callbackfn(value,20,this.formInline.width,that.setItemWidth ,callback)
        }, 800);
      };
    var checkName=(rule,value,callback) => {
      if(value.replace(/(^\s*)|(\s*$)/g, "")==''){
        return callback(new Error('模板名称不能为空'));
      }else{
        callback();
        this.tempName=value;
      }
    };
    return {
      ruleForm: {
        name: '',
      },
      rules: {
        name: [
          { required: true,validator: checkName, trigger: 'change' },
        ],   
      },
      formInline:{
        width:1920,
        height:1080,
        itemW:'',
        itemH:'',
        itemX:'',
        itemY:'',
      },
      rulesInline:{
        width: [
          { validator: checkWidth, trigger: 'change' }
        ],   
        height: [
          { validator: checkHeight, trigger: 'change' }
        ],   
        itemW: [
          { validator: checkitemW,required: true, trigger: 'change' }
        ],   
        itemH: [
          { validator: checkitemH, required: true,trigger: 'change' }
        ],   
        itemX: [
          { validator: checkitemX,required: true, trigger: 'change' }
        ],   
        itemY: [
          { validator: checkitemY,required: true, trigger: 'change' }
        ],   
      },
      tempName:'',//保存模板名称
      changeActive: true, //标记被选中的组件是否可以切换样式
      childNum: "", //记录当前拖动元素的的值
      templateWidth: 1920, //当前模板真实宽度
      templateHeight: 1080, //当前模板真实高度
      intWidth: 960, //模板的初始宽度
      intHeight: 540, //记录模板的初始高度
      slotNum: 0, //记录广告模板的个数
      itemNum: 1, //组件的个数
      slotArr: [], //保存广告位模板信息
      imgArr: [], //保存图片位模板信息
      videoArr: [], //保存视频位模板信息
      txtArr: [], //保存文字的模板信息
      weatherArr: [], //保存天气模板信息
      timeArr: [], //保存时钟模板信息
      webArr: [], //保存浏览器模板信息
      interArr:[],//保存互动按钮模板信息
      slotSelect: -1, //保存广告位选中的模板
      imgSelect: -1, //保存图片位选中的模板
      videoSelect: -1, //保存视频位选中的模板
      txtSelect: -1, //保存文本位选中的模板
      weatherSelect: -1, //保存天气被选中的模板
      timeSelect: -1, //保存时钟被选中的模板
      webSelect: -1, //保存浏览器被选中的模板
      interSelect:-1,//保存互动按钮组件被选择
      canSelect: true, //选中切换
      ofx: "", //保存横向偏移
      ofy: "", //保存纵向偏移
      dialogVisible: false, //显示弹出层
      msg: "提示信息", //弹出层提示信息
      time: Date.now(), //当前时间
      isMin: -1, //最底层
      isMax: -1, //最上层
      oldel: "", //保存上一次的原则元素
      radio2: 1, //改变模板类型
      templateType:'横屏模板',
      widthTimer: "", //模板宽度定时器
      heightTimer: "", //模板高度定时器
      itemWidthTimer: "", //组件宽度定时器
      itemHeightTimer: "", //组件高度定时器
      itemLeftTimer: "", //组件左边距定时器
      itemTopTimer: "", //组件顶边距定时器
      changeTimer: "", //改变模板类型定时器
      oldLeft: "", //上一次的做边距
      oldTop: "", //上一次的顶部距离
      oldWidth: "", //上一次宽度
      oldHeight: "", //上一次高度
      slotName: "", //广告位名字
      itemShow: 1, //组件的展现
      txtFontColor: "#1A1515", //字体颜色
      bgColor: "rgba(255,255,255,1)", //字体组件背景颜色
      txtSpeed: "",
      closecall:"",
      loading:false,
      speeds: [
        { txtSpeed: "1", label: "静态" },
        { txtSpeed: "2", label: "滚动" },
        { txtSpeed: "3", label: "滚动-低速" },
        { txtSpeed: "4", label: "滚动-中速" },
        { txtSpeed: "5", label: "滚动-高速" }
      ],
      orientation: [
        { title: "1", label: "从左往右" },
        { title: "2", label: "从右往左" }
      ],
      txtOrien: "",
      orienshow: false,
      weatherList: ["城市", "天气", "温度", "风向"],
      noWeather: false,
      webUrl: "",
      seleWeb: false,
      itemChange: false,
      imguploader: "",
      imgupItem: "",
      payload: "",
      videouploader: "",
      videoupItem: "",
      interuoItem:"",
      firstSave:true,
      changeTempW:true,
      changeTempH:true,
      materialLibrarySelect: false,//是否显示素材框选择
      libraryType:'',//保存打开素材库的类型
      libraryNum:-1,//默认选择素材库第一个素材
      libraryInfor:'',//保存从素材库取到的素材的信息
      tempEle:'',//保存打开素材库时需要修改的元素
      eleType:'',//保存打开素材库时的组件类型
      list: [],//素材库数据
      previewState:false,//素材库预览
      videoUrl:'',//保存素材库视频预览URL
      page:'1',//保存素材库的页数
      size:'8',//保存素材库的每页条数
      libraryTotal:'',//保存素材库总条数
      canajax:true,//是否能发送保存模板的请求
      interType:1,//保存互动按钮类型
      tempList:'',//保存用户模板列表
      checkedTemp:'',//保存用户互动按钮选中的值
      interUrl:'',//保存用户输入的互动按钮跳转Url
      showInterImg:'',//显示第几个图片
      toLibrary:'',//表示从哪个地方打开素材库
      haveInter:'N',//表示当前模板是否包含互动按钮组件
    };
  },
  methods: {
    //  'number':$(element).length+1,
    //             'top':that.ofy/that.intHeight*100,
    //             'left':that.ofx/that.intWidth*100,
    //             'width':that.intWidth,
    //             'height':that.intHeight,
    //             'zindex':that.itemNum*50,
    //             'num':that.itemNum,
    //             'isSelsct':false,
    //             'type':type,
    //             'itemwidth':width,
    //             'itemheight':height,
    //             'show':false,
    //             'val':'双击修改文字',
    //             'slotname':'广告位'+(parseFloat($(element).length)+1),
    //             'weather':[{'txt':'深圳','icon':'&#xe669;'},{'txt':'多云转晴','icon':'&#xe667;'},{'txt':'31℃','icon':'&#xe66a;'},{'txt':'风向','icon':'&#xe66b;'}],
    //             'txtColor':'rgb(51,51,51)',
    //             'bgcolor':'rgba(255,255,255,1)',
    //             'txtspeed':0,
    //             'orienta':'',
    //             'weburl':'',
    //             'webshow':false,
    //             'showbar':false,
    //             'showbgimg':false,
    //             'barwidth':0,
    //             'imgsrc':'',
    //             'videosrc':'',
                // interType:1,
                // interSrc:'',
                // interUrl:'',
                // interTemp:'',
                // interBg:'',
                // interShow:false,
    iconClick(){
    },
    saveTemp(){
        if(this.ruleForm.name!=''&&searchSubStr(this.ruleForm.name,' ').length!=this.ruleForm.name.length){
          var that=this;
          var temhtml=$('.center_main').html();
          var tempName=this.ruleForm.name;
          var layout_type=this.templateType;
          var temWidth=parseFloat($('.center_main').css('width'))*2;
          var temHeight=parseFloat($('.center_main').css('height'))*2;
          var tempType='type';
          var tempWidth='width';
          var tempHeight='height';
          var tempTop='top';
          var tempLeft='left';
          var tempZindex='z-index';
          var tempSlotName='slotName';
          var tempAreaNo='area_no';
          var tempSrc='src';
          var tempFontColor='font-color';
          var tempBackground='background-color';
          var tempElement='element';
          var tempSpeed='speed';
          var tempTextContent='textContent';
          var tempDirection='direction';
          var tempInterTemp='interType';
          var tempInterVal='interTypeVal';
          var tempScreen='full-screen';
          var tempInterBg='interBg';
          var tempInterType='interType';
          var tempInterTypeVal='interTypeVal';
          if($('.center_main .ui-widget-content').length>0){
            var style=[];
            for(var i=0;i<$('.center_main .ui-widget-content').length;i++){
                var obj={};
                var typeNum=parseFloat($($('.center_main .ui-widget-content')[i]).attr('data-type-num'))-1;
                obj[tempType]=$($('.center_main .ui-widget-content')[i]).attr('data-estype');
                obj[tempTop]=parseFloat($($('.center_main .ui-widget-content')[i]).css('top'))*2;
                obj[tempLeft]=parseFloat($($('.center_main .ui-widget-content')[i]).css('left'))*2;
                obj[tempWidth]=parseFloat($($('.center_main .ui-widget-content')[i]).css('width')).toFixed()*2;
                obj[tempHeight]=parseFloat($($('.center_main .ui-widget-content')[i]).css('height')).toFixed()*2;
                obj[tempZindex]=parseFloat($($('.center_main .ui-widget-content')[i]).css('zIndex'));
                obj[tempAreaNo]=i+1;
                obj[tempScreen]=false;
                if($($('.center_main .ui-widget-content')[i]).hasClass('slot_wrapper')){
                    obj[tempSlotName]=this.slotArr[typeNum].slotname;
                }else if($($('.center_main .ui-widget-content')[i]).hasClass('img_wrapper')){
                    obj[tempSrc]=this.imgArr[typeNum].imgsrc;
                }else if($($('.center_main .ui-widget-content')[i]).hasClass('video_wrapper')){
                    obj[tempSrc]=this.videoArr[typeNum].videosrc;
                }else if($($('.center_main .ui-widget-content')[i]).hasClass('txt_wrapper')){
                    obj[tempSpeed]=!this.txtArr[typeNum].txtspeed?-1:this.txtArr[typeNum].txtspeed;
                    obj[tempDirection]=!this.txtArr[typeNum].orienta?-1:this.txtArr[typeNum].orienta;
                    obj[tempFontColor]=this.txtArr[typeNum].txtColor;
                    obj[tempBackground]=this.txtArr[typeNum].bgcolor;
                    obj[tempTextContent]=this.txtArr[typeNum].val;
                }else if($($('.center_main .ui-widget-content')[i]).hasClass('weather_wrapper')){
                    var str='';
                    let weatherChecked={'城市':'city','天气':'weather','温度':'temperature','风向':'wind'}
                    for(let j=0;j<this.weatherList.length;j++){
                      str+=weatherChecked[this.weatherList[j]]+',';
                    }
                    str=str.replace(/,+$/,"");
                    obj[tempElement]=str;
                    obj[tempFontColor]=this.weatherArr[typeNum].txtColor;
                    obj[tempBackground]=this.weatherArr[typeNum].bgcolor;
                }else  if($($('.center_main .ui-widget-content')[i]).hasClass('time_wrapper')){
                    obj[tempFontColor]=this.timeArr[typeNum].txtColor;
                    obj[tempBackground]=this.timeArr[typeNum].bgcolor;
                }else  if($($('.center_main .ui-widget-content')[i]).hasClass('web_wrapper')){
                    obj[tempSrc]=this.webArr[typeNum].weburl;
                }else if($($('.center_main .ui-widget-content')[i]).hasClass('inter_wrapper')){
                     obj[tempInterBg]=this.interArr[typeNum].imgsrc;
                     obj[tempInterType]=this.interArr[typeNum].interType;
                     if(this.interArr[typeNum].interType==1){
                       obj[tempInterTypeVal]=this.interArr[typeNum].interSrc;
                     }else if(this.interArr[typeNum].interType==2){
                       obj[tempInterTypeVal]=this.interArr[typeNum].videosrc;
                     }else if(this.interArr[typeNum].interType==3){
                       obj[tempInterTypeVal]=this.interArr[typeNum].interUrl;
                     }else if(this.interArr[typeNum].interType==4){
                       obj[tempInterTypeVal]=this.interArr[typeNum].interTemp;
                     }
                     this.haveInter='Y'
                }
                style.push(obj);
              }
              if(!this.canajax){
                return false
              }
              this.loading=true;
              this.$esellApi.send(
              "/template/add.shtml",
              {
                "width":temWidth,
                "height":temHeight,
                'content':temhtml,
                'screen_type':layout_type=="横屏模板"?1:2,
                'name':tempName,
                "components":style,
                "inter":this.haveInter,  
              },
              res => {
                this.canajax=true;
                if(res.code==0){
                  this.$router.push({ path:"/temp_mag" });
                }
              },
              res => {
                this.$message({
                  type: "error",
                  message: res.message,
                });
                this.canajax=true;
              }
            );
            }else{
              this.show('当前没有任何组件,无法保存');
            }
        }else{
          this.show('请输入模板名称');
        }
    },
    back(){
     this.$confirm('返回后将删除所有已添加组件，是否确定返回？')
          .then(_ => {
           this.$router.push({ path:"/temp_mag" });
          })
          .catch(_ => {}); 
    },
    closeCorver(done){
     this.$confirm('关闭后可能会保存失败，确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    handleSizeChange(val) {
      if(this.size!=val){
        this.size=val;
        this.getLibraryInfor();
      }
    },
    handleCurrentChange(val) {
      if(this.page!=val){
        this.page=val;
        this.getLibraryInfor();
      }
    },
    preview(data){
      this.previewState=true;
      this.videoUrl=data.url;
    },
    libraryClick(ele,type,data){
      let typeEle=$(".select_template");
      this.tempEle=typeEle;
      this.eleType=ele;
      this.toLibrary=data;
      this.libraryInfor='';
      this.libraryNum=-1;
      if(ele=="img"){
        var checkEle='img_wrapper';
      }else if(ele=="video"){
        var checkEle='video_wrapper';
      }else if(ele=='inter'){
        var checkEle='inter_wrapper';
      }
      if(typeEle.hasClass(checkEle)){
        this.showLibrary(type)
      }else{
        this.show('该组件不支持此功能')
      }
    },
    showLibrary(data){
      this.materialLibrarySelect=true;
      if(data=="img"){
        this.libraryType="IMG"
      }else if(data=="video"){
        this.libraryType="VDO"
      }
      this.getLibraryInfor();
    },
    cancel(){
      this.materialLibrarySelect = false;
    },
    save(){
      if(this.libraryNum>=0){
        if(this.toLibrary==1){
          this.materialLibrarySelect = false;
          if(this.eleType=="img"){
            this.imgArr[parseFloat($(this.tempEle[0]).attr('data-type-num'))-1].showbgimg=true;
            this.imgArr[parseFloat($(this.tempEle[0]).attr('data-type-num'))-1].imgsrc=this.libraryInfor.url;
          }else if(this.eleType=="video"){
            this.videoArr[parseFloat($(this.tempEle[0]).attr('data-type-num'))-1].showbgimg=true;
            this.videoArr[parseFloat($(this.tempEle[0]).attr('data-type-num'))-1].videosrc=this.libraryInfor.url;
            this.videoArr[parseFloat($(this.tempEle[0]).attr('data-type-num'))-1].imgsrc=this.libraryInfor['cover-url']||'http://file1.yixinfa.cn/dev/180323/d49f8bb9d7b44db2b6b7dcc6e27cd7ca.jpg';
          }else if(this.eleType=="inter"){
            this.interArr[parseFloat($(this.tempEle[0]).attr('data-type-num'))-1].showbgimg=true;
            this.interArr[parseFloat($(this.tempEle[0]).attr('data-type-num'))-1].imgsrc=this.libraryInfor.url;
          }
        }else if(this.toLibrary==2){
          this.materialLibrarySelect = false;
          this.interArr[parseFloat($(this.tempEle[0]).attr('data-type-num')) - 1].interType =this.interType;
          this.interArr[parseFloat($(this.tempEle[0]).attr('data-type-num')) -1].interShow=true;
          if(this.libraryType=="IMG"){
            this.interArr[parseFloat($(this.tempEle[0]).attr('data-type-num'))-1].interSrc=this.libraryInfor.url;
          }else{
            this.interArr[parseFloat($(this.tempEle[0]).attr('data-type-num'))-1].videosrc=this.libraryInfor.url;
            this.interArr[parseFloat($(this.tempEle[0]).attr('data-type-num'))-1].interSrc=this.libraryInfor['cover-url']||'http://file1.yixinfa.cn/dev/180323/d49f8bb9d7b44db2b6b7dcc6e27cd7ca.jpg';
          }
        }
      }else{
         this.show("请先选择需要的素材");
      }
    },
    getLibraryInfor(){
      this.$esellApi.send("/media/list.shtml",{"page":this.page,"size":this.size,"type":this.libraryType}, res => {
            this.list=res.payload.data;
            this.libraryTotal=res.payload.total;
          },res=>{
            this.$message({
              type: "error",
              message: res.message,
            });
          });
    },
    checkLibrary(index){
      this.libraryNum=index;
      this.libraryUrl=this.list[index].img;
      this.libraryInfor=this.list[index]
    },
    changeType(){
      this.interArr=[];
      this.slotArr=[];
      this.imgArr=[];
      this.videoArr=[];
      this.txtArr=[];
      this.weatherArr=[];
      this.timeArr=[];
      this.webArr=[];
    },
    callbackfn(value,min,max,fn,callback){
      let that=this;
      if(isNaN(value)){
        callback(new Error('请输入数字'));
      }else {
        let reg = /^[0-9]*$/;
          if (!reg.test(value)) {
            callback(new Error('请输入正整数'));
          } else {
            if (value < parseFloat(min)) {
              callback(new Error('最小为'+min));
            }else if(value > parseFloat(max)){
              callback(new Error('最大为'+max));
            } else {
              callback();
              fn();
            }
          }  
      }
    },
    addImg() {
      let item = $(".select_template");
      if (item.hasClass("img_wrapper")) {
        $("#imageClick").click();
      } else {
        this.show("请先选择你需要上传图片的组件");
      }
    },
    // 设置广告位名称
    setSlotName(){
      let item = $(".select_template");
      this.slotArr[parseFloat(item.attr("data-type-num")) - 1].slotname =this.slotName;
    },
    // 设置浏览器组件跳转地址
    setWenUrl(){
      let item = $(".select_template");
      this.webArr[parseFloat(item.attr("data-type-num")) - 1].weburl =this.webUrl;
    },
    // 互动按钮上传图片
    addInterImg(){
      let item = $(".select_template");
      if (item.hasClass("inter_wrapper")) {
        $("#interImgClick").click();
      } else {
        this.show("请先选择你需要上传图片的互动按钮组件");
      }
    },
    // 互动按钮上传视频
    addInterVideo(){
      let item = $(".select_template");
      if (item.hasClass("inter_wrapper")) {
        $("#interVideoClick").click();
      } else {
        this.show("请先选择你需要上传图片的互动按钮组件");
      }
    },
    // 互动按钮上传背景图
    addInterBtn(){
      let item = $(".select_template");
      if (item.hasClass("inter_wrapper")) {
        $("#interClick").click();
      } else {
        this.show("请先选择你需要上传图片的互动按钮组件");
      }
    },
    // 互动按钮设置类型
    setInterType(val){
      let item = $(".select_template");
      if(item.length>0){
        if(this.interArr[parseFloat(item.attr("data-type-num")) - 1].interType==val){
          this.interArr[parseFloat(item.attr("data-type-num")) - 1].interShow=true
          this.checkedTemp=this.interArr[parseFloat(item.attr("data-type-num")) - 1].interTemp;
        }else{
          this.interArr[parseFloat(item.attr("data-type-num")) - 1].interShow=false;
          return
        }
      }
    },
    // 设置互动按钮跳转的连接
    setInterUrl(){
      let item = $(".select_template");
      this.interArr[parseFloat(item.attr("data-type-num")) - 1].interUrl =this.interUrl;
      this.interArr[parseFloat(item.attr("data-type-num")) - 1].interType =this.interType;
      this.interArr[parseFloat(item.attr("data-type-num")) - 1].interSrc =''; 
    },
    // 清空互动按钮跳转的连接
    clearInterUrl(){
      let item = $(".select_template");
      this.interArr[parseFloat(item.attr("data-type-num")) - 1].interUrl =''
      this.interUrl=''
    },
    // 设置互动按钮跳转模板
    setInterTemp(val){
      let item = $(".select_template");
      this.interArr[parseFloat(item.attr("data-type-num")) - 1].interTemp =val;
      this.interArr[parseFloat(item.attr("data-type-num")) - 1].interType =this.interType;
      this.interArr[parseFloat(item.attr("data-type-num")) - 1].interSrc ='';
    },
    addDr(e) {
        const that =this;
      if($(e.target).hasClass("template_item")){
         var element = $(e.target);
      }else{
         var element = $(e.target).parents('.template_item');
      }
      $(element).draggable({
        containment: "#template_wrapper",
        scroll: false,
        snap: ".ui-widget-content",
        start: function() {
          var thatItem=that.selectArr(element.attr("data-estype"))[parseFloat(element.attr("data-type-num"))-1];
          var width = parseFloat(element.css("width"));
          var height = parseFloat(element.css("height"));
          thatItem.width = width;
          thatItem.height = height;
          that.canSelect = false;
        },
        stop: function(event, ui) {
          var thatItem=that.selectArr(element.attr("data-estype"))[parseFloat(element.attr("data-type-num"))-1];
          var slotTop = parseFloat($(this).css("top"));
          thatItem.top=slotTop/that.intHeight*100;
          var slotLeft = parseFloat($(this).css("left"));
          thatItem.left=slotLeft/that.intWidth*100;
          var that1 = $(this);
          setTimeout(function() {
            if (slotTop < 0) {
             thatItem.top = 0;
            } 
            else if (slotTop > that.intHeight - thatItem.height) {
            thatItem.top =(that.intHeight - thatItem.height) / that.intHeight * 100;
            }
            if (slotLeft < 0) {
              thatItem.left = 0;
            } else if (slotLeft > that.intWidth - thatItem.width) {
              thatItem.left =(that.intWidth - thatItem.width) / that.intWidth * 100;
            }
            if ($(element).hasClass(".select_template")) {
              that.isSelect = "";
            }
            that.canSelect = true;
            if ($(".select_template").length == 1 &&that1.hasClass("select_template")) {
              that.formInline.itemX = ( thatItem.left *that.intWidth*2 /100).toFixed();
              that.formInline.itemY = ( thatItem.top *that.intHeight*2 /100).toFixed();
            }
          }, 20);
        }
      });
    },
    removeRe(){
       $(".weather_wrapper").find('.ui-resizable-handle').remove()
       $(".time_wrapper").find('.ui-resizable-handle').remove()
    },
    addRe(e) {
        const that =this;
      if($(e.target).hasClass("template_item")){
         var element = $(e.target);
      }else{
         var element = $(e.target).parents('.template_item');
      }
        $(element).resizable({
            containment: "#template_wrapper",
            start: function() {
                that.canSelect = false;
        },
        stop: function() {
          if($(this).hasClass('weather_wrapper')||$(this).hasClass('time_wrapper')){
                return
              }
          var thatItem=that.selectArr(element.attr("data-estype"))[parseFloat(element.attr("data-type-num"))-1];
          thatItem.itemwidth = parseFloat(element.css("width"));
          thatItem.itemheight = parseFloat(element.css("height"));
          setTimeout(function() {
            if (parseFloat(element.css("width"))+parseFloat(element.css("left")) > that.intWidth - 5) {
              thatItem.itemwidth = that.intWidth - parseFloat(element.css("left"));
            }
            if (parseFloat(element.css("height")) + parseFloat(element.css("top")) > that.intHeight - 5) {
              thatItem.itemheight = that.intHeight - parseFloat(element.css("top"));
            }
            that.canSelect = true;
            if ($(".select_template").length == 1 &&element.hasClass("select_template")) {
              that.formInline.itemW =thatItem.itemwidth * 2;
              that.formInline.itemH =thatItem.itemheight * 2;
            }
          }, 20);
        }
      });
    },
    addVideo() {
      let item = $(".select_template");
      if (item.hasClass("video_wrapper")) {
        $("#videoClick").click();
      } else {
        this.show("请先选择你需要上传图片的组件");
      }
    },
    open2(type) {
      var that=this;
        this.$confirm('此操作将删除所有已添加组件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.templateType = '竖屏模板';
          if(type==1){
            this.intWidth = this.formInline.width / 2;
          }else if(type==2){
            this.intHeight = this.formInline.height / 2;
          }
          this.changeType();
        }).catch(() => {
          this.formInline.width=parseFloat($('#template_wrapper').css('width'))*2
          this.formInline.height=parseFloat($('#template_wrapper').css('height'))*2
        });
     },
    open3(type) {
      var that=this;
        this.$confirm('此操作将删除所有已添加组件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.templateType = '横屏模板';
          if(type==1){
            this.intWidth = this.formInline.width / 2;
          }else if(type==2){
            this.intHeight = this.formInline.height / 2;
          }
          this.changeType();
        }).catch(() => {
          this.formInline.width=parseFloat($('#template_wrapper').css('width'))*2
          this.formInline.height=parseFloat($('#template_wrapper').css('height'))*2
        });
    },  
    open1(val) {
      var that=this;
        this.$confirm('此操作将删除所有已添加组件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (val == '横屏模板') {
            this.formInline.height = 1080;
            this.formInline.width = 1920;
          } else if (val == '竖屏模板') {
            this.formInline.height = 1920;
            this.formInline.width = 1080;
          }
          this.changeTempW=false;
          this.changeTempH=false;
        }).catch(() => {
          this.changeTempW=true;
          this.changeTempH=true;
          this.formInline.width=parseFloat($('#template_wrapper').css('width'))*2
          this.formInline.height=parseFloat($('#template_wrapper').css('height'))*2
        });
    },  
    tempChange() {
      var that = this;
      setTimeout(function() {
        that.tempType();
      }, 0);
    },
    changeTemp(val) {
      this.open1(val);
    }, 
    setTempWidth() {
      let that = this;
      if (this.templateType == '横屏模板') {
        if (this.formInline.width < 100) {
          this.show("横屏模板宽度最小为100px");
          this.formInline.width = that.intWidth * 2;
        } else if (this.formInline.width > 4096) {
          this.show("横屏模板宽度最小为4096px");
          this.formInline.width = this.intWidth * 2;
        } else {
          if (this.formInline.width <= this.formInline.height) {
            if(this.changeTempW){
              this.open2(1);
            }else{
               this.intWidth = this.formInline.width / 2;
               this.changeType();
               this.templateType = '竖屏模板';
               this.changeTempW=true;
            }
          }else{
             this.intWidth = this.formInline.width / 2;
             that.tempChange();
          }
        }
      } else if (this.templateType== '竖屏模板') {
        if (this.formInline.width < 100) {
          this.show("竖屏模板宽度最小为100px");
          this.formInline.width = that.intWidth * 2;
        } else if (this.formInline.width > 2160) {
          this.show("竖屏模板宽度最小为2160px");
          this.formInline.width = this.intWidth * 2;
        } else {
          if (this.formInline.width >= this.formInline.height) {
            if(this.changeTempW){
              this.open3(1);
            }else{
               this.intWidth = this.formInline.width / 2;
               this.changeType();
               this.templateType = '横屏模板';
               this.changeTempW=true;
            }
          }else{
             this.intWidth = this.formInline.width / 2;
             that.tempChange();
          }
        }
      }
    },
    setTempHeight() {
      let that = this;
      if (this.templateType == '横屏模板') {
        if (this.formInline.height < 100) {
          this.show("横屏模板高度度最小为100px");
          this.formInline.height = this.intHeight * 2;
        } else if (this.formInline.height > 2160) {
          this.show("横屏模板高度度最大为2160px");
          this.formInline.height = this.intHeight * 2;
        } else {
          if (this.formInline.width <= this.formInline.height) {
            if(this.changeTempH){
              this.open2(2);
            }else{
               this.intHeight = this.formInline.height / 2;
               this.changeType();
               this.changeTempH=true;
            }
          }else{
            this.intHeight = this.formInline.height / 2;
            that.tempChange();
          }
        }
      } else if (this.templateType == '竖屏模板') {
        if (this.formInline.height < 100) {
          this.show("竖屏模板高度度最小为100px");
          this.formInline.height = this.intHeight * 2;
        } else if (this.formInline.height > 4096) {
          this.show("竖屏模板高度度最大为4096px");
          this.formInline.height = this.intHeight * 2;
        } else {
          if (this.formInline.width >= this.formInline.height) {
            if(this.changeTempH){
               this.open3(2);
            }else{
               this.intHeight = this.formInline.height / 2;
               this.changeType();
               this.changeTempH=true;
            }
          }else{
            this.intHeight = this.formInline.height / 2;
            that.tempChange();  
          }
        }
      }
    },
    setItemLeft() {
      let item = $(".select_template");
      if (this.oldLeft == "") {
        if (item.length < 1) {
          if (!this.itemChange) {
            this.formInline.itemX=''
          }
        }
      } else {
        if (item.length == 1) {
          if (this.formInline.itemX != "") {
            this.selectArr(item.attr("data-estype"))[
              parseFloat(item.attr("data-type-num")) - 1
            ].left =this.formInline.itemX/2 / this.intWidth * 100;
            this.oldLeft = this.formInline.itemX/2;
          }
        }
      }
    },
    setItemTop() {
      let item = $(".select_template");
      if (this.oldTop == "") {
        if (item.length < 1) {
          if (!this.itemChange) {
            this.formInline.itemY='';
          }
        }
      } else {
        if (item.length == 1) {
          if (this.formInline.itemY != "") {
            this.selectArr(item.attr("data-estype"))[
              parseFloat(item.attr("data-type-num")) - 1
            ].top =this.formInline.itemY/2 / this.intHeight * 100;
            this.oldTop = this.formInline.itemY/2;
          }
        }
      }
    },
    setItemWidth() {
      let item = $(".select_template");
      if (this.oldWidth == "") {
        if (item.length < 1) {
          if (!this.itemChange) {
            this.formInline.itemW='';
          }
        }
      } else {
        if (item.length == 1) {
          if (this.formInline.itemW != "") {
            if (this.formInline.itemW>this.formInline.width-parseFloat(this.formInline.itemX)){
              this.selectArr(item.attr("data-estype"))[
                parseFloat(item.attr("data-type-num")) - 1
              ].left =(this.formInline.width-this.formInline.itemW)/this.formInline.width*100;
              this.selectArr(item.attr("data-estype"))[
                parseFloat(item.attr("data-type-num")) - 1
              ].itemwidth =this.formInline.itemW / 2;
              this.formInline.itemX=this.formInline.width-this.formInline.itemW;
              this.oldWidth = this.formInline.itemW;
            }else{
                this.selectArr(item.attr("data-estype"))[
                parseFloat(item.attr("data-type-num")) - 1
              ].itemwidth =this.formInline.itemW / 2;
              this.oldWidth = this.formInline.itemW;
            }
          }
        }
      }
    },
    setItemHeight() {
      let item = $(".select_template");
      if (this.oldHeight == "") {
        if (item.length < 1) {
          if (!this.itemChange) {
            this.formInline.itemH='';
          }
        }
      } else {
        if (item.length == 1) {
          if (this.formInline.itemH != "") {
            if (this.formInline.itemH>this.formInline.height-parseFloat(this.formInline.itemY)) {
              this.selectArr(item.attr("data-estype"))[parseFloat(item.attr("data-type-num")) - 1].itemheight = this.formInline.itemH / 2;
              this.selectArr(item.attr("data-estype"))[parseFloat(item.attr("data-type-num")) - 1].top =(this.formInline.height-this.formInline.itemH)/this.formInline.height*100;
              this.oldHeight = this.formInline.itemH/2;
              this.formInline.itemY = this.formInline.height-this.formInline.itemH;
              this.oldHeight = this.formInline.itemH;
            } else {
              this.selectArr(item.attr("data-estype"))[
                parseFloat(item.attr("data-type-num")) - 1
              ].itemheight =this.formInline.itemH / 2;
              this.oldHeight = this.formInline.itemH;
            }
          }
        }
      }
    },
    // 组件被点击
    select(data,type) {
      this.oldel = $(".select_template");
      if (this.canSelect) {
        if (type == "slot") {
          this.showItem(1);
          if (this.slotSelect == data) {
            this.slotSelect = -1;
            this.changePosition(false, this.slotArr, data);
            this.slotName = "";
          } else {
            this.slotSelect = data;
            this.imgSelect = -1;
            this.videoSelect = -1;
            this.txtSelect = -1;
            this.weatherSelect = -1;
            this.timeSelect = -1;
            this.webSelect = -1;
            this.interSelect = -1;
            this.slotName = this.slotArr[data - 1].slotname;
            this.changePosition(true, this.slotArr, data);
            $(".module_list").find(".item").eq(0).addClass("active").siblings(".active").removeClass("active");
          }
        } else if (type == "img") {
          this.showItem(2);
          if (this.imgSelect == data) {
            this.imgSelect = -1;
            this.changePosition(false, this.imgArr, data);
          } else {
            this.imgSelect = data;
            this.slotSelect = -1;
            this.videoSelect = -1;
            this.txtSelect = -1;
            this.weatherSelect = -1;
            this.timeSelect = -1;
            this.webSelect = -1;
            this.interSelect = -1;
            this.changePosition(true, this.imgArr, data);
            $(".module_list").find(".item").eq(1).addClass("active").siblings(".active").removeClass("active");
          }
        } else if (type == "video") {
          this.showItem(3);
          if (this.videoSelect == data) {
            this.videoSelect = -1;
            this.changePosition(false, this.videoArr, data);
          } else {
            this.videoSelect = data;
            this.slotSelect = -1;
            this.imgSelect = -1;
            this.txtSelect = -1;
            this.weatherSelect = -1;
            this.timeSelect = -1;
            this.webSelect = -1;
            this.changePosition(true, this.videoArr, data);
            $(".module_list").find(".item").eq(2).addClass("active").siblings(".active").removeClass("active");
          }
        } else if (type == "txt") {
          this.showItem(4);
          if (this.txtSelect == data) {
            this.txtSelect = -1;
            this.changePosition(false, this.txtArr, data);
            this.txtFontColor = "#333333";
            this.bgColor = "rgba(255,255,255,1)";
            this.txtSpeed = "";
            this.txtOrien = "";
            this.orienshow = false;
          } else {
            this.txtSelect = data;
            this.slotSelect = -1;
            this.imgSelect = -1;
            this.videoSelect = -1;
            this.weatherSelect = -1;
            this.timeSelect = -1;
            this.webSelect = -1;
            this.interSelect = -1;
            this.txtFontColor = this.txtArr[data - 1].txtColor;
            this.bgColor = this.txtArr[data - 1].bgcolor;
            this.changePosition(true, this.txtArr, data);
            this.txtSpeed = this.txtArr[data - 1].txtspeed;
            this.txtOrien = this.txtArr[data - 1].orienta;
            $(".module_list").find(".item").eq(3).addClass("active").siblings(".active").removeClass("active");
          }
        } else if (type == "weather") {
          this.showItem(5);
          if (this.weatherSelect == data) {
            this.weatherSelect = -1;
            this.changePosition(false, this.weatherArr, data);
            this.txtFontColor = "#333333";
            this.bgColor = "rgba(255,255,255,1)";
          } else {
            this.weatherSelect = data;
            this.slotSelect = -1;
            this.imgSelect = -1;
            this.videoSelect = -1;
            this.txtSelect = -1;
            this.timeSelect = -1;
            this.webSelect = -1;
            this.interSelect = -1;
            this.changePosition(true, this.weatherArr, data);
            this.txtFontColor = this.weatherArr[data - 1].txtColor;
            this.bgColor = this.weatherArr[data - 1].bgcolor;
            $(".module_list").find(".item").eq(4).addClass("active").siblings(".active").removeClass("active");
          }
        } else if (type == "time") {
          this.showItem(6);
          if (this.timeSelect == data) {
            this.timeSelect = -1;
            this.changePosition(false, this.timeArr, data);
            this.txtFontColor = "#333333";
            this.bgColor = "rgba(255,255,255,1)";
          } else {
            this.timeSelect = data;
            this.slotSelect = -1;
            this.imgSelect = -1;
            this.videoSelect = -1;
            this.txtSelect = -1;
            this.weatherSelect = -1;
            this.webSelect = -1;
            this.interSelect = -1;
            this.changePosition(true, this.timeArr, data);
            this.txtFontColor = this.timeArr[data - 1].txtColor;
            this.bgColor = this.timeArr[data - 1].bgcolor;
            $(".module_list").find(".item").eq(5).addClass("active").siblings(".active").removeClass("active");
          }
        } else if (type == "web") {
          this.showItem(7);
          if (this.webSelect == data) {
            this.webSelect = -1;
            this.changePosition(false, this.webArr, data);
            this.webUrl = "";
          } else {
            this.webSelect = data;
            this.slotSelect = -1;
            this.imgSelect = -1;
            this.videoSelect = -1;
            this.txtSelect = -1;
            this.weatherSelect = -1;
            this.timeSelect = -1;
            this.interSelect = -1;
            this.webUrl = this.webArr[data - 1].weburl;
            this.changePosition(true, this.webArr, data);
            $(".module_list").find(".item").eq(6).addClass("active").siblings(".active").removeClass("active");
          }
        }else if(type == "inter"){
          // 互动组件被点击
          this.showItem(8);
           if (this.interSelect == data) {
            this.interSelect = -1;
            this.changePosition(false, this.interArr, data);
          } else {
            this.showInterImg=data;
            this.interType=this.interArr[data - 1].interType;
            this.interUrl=this.interArr[data - 1].interUrl;
            if(this.interArr[data - 1].interType==4){
              this.checkedTemp=this.interArr[data - 1].interTemp;
            }
            this.interArr[data - 1].interShow=true;
            this.interSelect = data;
            this.slotSelect = -1;
            this.imgSelect = -1;
            this.videoSelect = -1;
            this.txtSelect = -1;
            this.weatherSelect = -1;
            this.timeSelect = -1;
            this.webSelect = -1;
            this.changePosition(true, this.interArr, data);
            $(".module_list").find(".item").eq(7).addClass("active").siblings(".active").removeClass("active");
          }
        }
      }
    },
    changePosition(type, data, num) {
      let that = this;
      if (type) {
        this.itemChange = true;
        this.formInline.itemX = (data[num - 1].left* this.intWidth*2 / 100).toFixed();
        this.formInline.itemY = (data[num - 1].top * this.intHeight*2 / 100).toFixed();
        this.formInline.itemW = data[num - 1].itemwidth * 2;
        this.formInline.itemH = data[num - 1].itemheight * 2;
        this.oldLeft = (data[num - 1].left*2 * this.intWidth / 100).toFixed();
        this.oldTop = (data[num - 1].top*2 * this.intHeight / 100).toFixed();
        this.oldWidth = data[num - 1].itemwidth * 2;
        this.oldHeight = data[num - 1].itemheight * 2;
      } else {
        this.itemChange = false;
        this.formInline.itemX= "";
        this.formInline.itemY = "";
        this.formInline.itemW = "";
        this.formInline.itemH = "";
      }
    },
    changeUrl() {
      let urlReg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)/;
      let item = $(".select_template");
      if (item.length < 1) {
        if (!this.seleWeb) {
          if (this.webUrl != "") {
            this.show("请选择需要设置的模板");
          }
        }
        this.webUrl = "";
      } else {
        if (urlReg.test(this.webUrl)) {
          this.selectArr(item.attr("data-estype"))[
            parseFloat(item.attr("data-type-num")) - 1
          ].weburl = this.webUrl;
        } else {
          if (this.webUrl != "") {
            this.selectArr(item.attr("data-estype"))[
              parseFloat(item.attr("data-type-num")) - 1
            ].weburl =
              "http://" + this.webUrl;
          } else {
            this.selectArr(item.attr("data-estype"))[
              parseFloat(item.attr("data-type-num")) - 1
            ].weburl =
              "";
          }
        }
      }
    },
    webSet: _.debounce(function() {
      this.changeUrl();
    }, 2000),
    showWeb() {
      let item = $(".select_template");
      if (item.length < 1) {
        this.show("请选中需要预览的浏览器组件");
      } else {
        this.changeUrl();
        if (
          this.selectArr(item.attr("data-estype"))[
            parseFloat(item.attr("data-type-num")) - 1
          ].weburl != ""
        ) {
          this.selectArr(item.attr("data-estype"))[
            parseFloat(item.attr("data-type-num")) - 1
          ].webshow = true;
        } else {
          this.show("请先输入需要预览的网页地址");
        }
      }
    },
    hideWeb() {
      let item = $(".select_template");
      if (item.length < 1) {
        this.show("请选中需要重置的浏览器组件");
      } else {
        this.selectArr(item.attr("data-estype"))[
          parseFloat(item.attr("data-type-num")) - 1
        ].webshow = false;
        this.selectArr(item.attr("data-estype"))[
          parseFloat(item.attr("data-type-num")) - 1
        ].weburl =
          "";
        this.webUrl = "";
      }
    },
    weather(val) {
      let item = $(".select_template");
      if ($(".weather_wrapper").length < 1) {
        this.weatherList = ["城市", "天气", "温度", "风向"];
        this.show("请添加天气组件");
      } else {
        if (item.length > 0) {
          if (val.length > 0) {
            this.selectArr(item.attr("data-estype"))[
              parseFloat(item.attr("data-type-num")) - 1
            ].weather = [
              { txt: "", icon: "" },
              { txt: "", icon: "" },
              { txt: "", icon: "" },
              { txt: "", icon: "" }
            ];
            this.noWeather = false;
            for (let i = 0; i < val.length; i++) {
              switch (val[i]) {
                case "城市":
                  this.selectArr(item.attr("data-estype"))[
                    parseFloat(item.attr("data-type-num")) - 1
                  ].weather[0].txt =
                    "设备所在城市";
                  this.selectArr(item.attr("data-estype"))[
                    parseFloat(item.attr("data-type-num")) - 1
                  ].weather[0].icon =
                    "&#xe669;";
                  break;
                case "天气":
                  this.selectArr(item.attr("data-estype"))[
                    parseFloat(item.attr("data-type-num")) - 1
                  ].weather[1].txt =
                    "天气";
                  this.selectArr(item.attr("data-estype"))[
                    parseFloat(item.attr("data-type-num")) - 1
                  ].weather[1].icon =
                    "&#xe667;";
                  break;
                case "温度":
                  this.selectArr(item.attr("data-estype"))[
                    parseFloat(item.attr("data-type-num")) - 1
                  ].weather[2].txt =
                    "气温";
                  this.selectArr(item.attr("data-estype"))[
                    parseFloat(item.attr("data-type-num")) - 1
                  ].weather[2].icon =
                    "&#xe66a;";
                  break;
                case "风向":
                  this.selectArr(item.attr("data-estype"))[
                    parseFloat(item.attr("data-type-num")) - 1
                  ].weather[3].txt =
                    "风向";
                  this.selectArr(item.attr("data-estype"))[
                    parseFloat(item.attr("data-type-num")) - 1
                  ].weather[3].icon =
                    "&#xe66b;";
                  break;
              }
            }
          } else {
            this.selectArr(item.attr("data-estype"))[
              parseFloat(item.attr("data-type-num")) - 1
            ].weather = [
              { txt: "", icon: "" },
              { txt: "", icon: "" },
              { txt: "", icon: "" },
              { txt: "", icon: "" }
            ];
            this.noWeather = true;
          }
        } else {
          if (this.noWeather) {
            this.weatherList = [];
          } else {
            this.weatherList = ["城市", "天气", "温度", "风向"];
          }
          this.show("请选中天气组件");
        }
      }
    },
    txtColor(val) {
      let item = $(".select_template");
      if (val == null) {
      } else {
        if (item.length < 1) {
          this.show("请选择需要设置字体颜色的组件");
        } else {
          this.selectArr(item.attr("data-estype"))[
            parseFloat(item.attr("data-type-num")) - 1
          ].txtColor =
            arguments[0];
        }
      }
    },
    checkItem(data) {
      if (data) {
        if ($(".select_template").length < 1) {
          this.show("请选择需要设置的文本组件");
          this.orienshow = false;
        }
      }
    },
    speed(value) {
      let item = $(".select_template");
      if (item.length > 0) {
        this.selectArr(item.attr("data-estype"))[
          parseFloat(item.attr("data-type-num")) - 1
        ].txtspeed = this.txtSpeed;
        if (value != "1" && value != "") {
          this.orienshow = true;
        } else {
          this.orienshow = false;
        }
      }
    },
    ort(val) {
      let item = $(".select_template");
      if (item.length > 0) {
        this.selectArr(item.attr("data-estype"))[
          parseFloat(item.attr("data-type-num")) - 1
        ].orienta = val;
      }
    },
    txtBgColor(val) {
      let item = $(".select_template");
      if (val == null) {
      } else {
        if (item.length < 1) {
          this.show("请选择需要设置背景色的组件");
        } else {
          this.selectArr(item.attr("data-estype"))[
            parseFloat(item.attr("data-type-num")) - 1
          ].bgcolor =
            arguments[0];
        }
      }
    },
    showItem(num) {
      if (this.changeActive) {
        this.itemShow = num;
      }
    },
    txtChange(data1) {
      this.txtArr[data1].show = true;
      setTimeout(function() {
        $("#text" + (data1 + 1))[0].focus();
      }, 20);
    },
    setTxt(data1) {
      var that = this;
      this.txtArr[data1].show = false;
      setTimeout(function() {
        if (that.txtArr[data1].val == "") {
          that.txtArr[data1].val = "双击修改文字";
        }
      }, 20);
    },
    selectArr(data) {
      switch (data) {
        case "slot":
          return this.slotArr;
          break;
        case "img":
          return this.imgArr;
          break;
        case "video":
          return this.videoArr;
          break;
        case "txt":
          return this.txtArr;
          break;
        case "weather":
          return this.weatherArr;
          break;
        case "time":
          return this.timeArr;
          break;
        case "web":
          return this.webArr;
          break;
        case "inter":
          return this.interArr;
          break;
      }
    },
    goTop() {
      let that = $(".select_template");
      if (that.length > 0) {
        this.selectArr(that.attr("data-estype"))[
          parseFloat(that.attr("data-type-num")) - 1
        ].top = 0;
        this.formInline.itemY=0;
      } else {
        this.show("请单击选择需要调整的组件");
      }
    },
    goDown() {
      let that = $(".select_template");
      var templateHeight = parseFloat($(".select_template").css("height")); //当前模板的高度
      if (that.length > 0) {
        templateHeight = this.intHeight - templateHeight;
        this.selectArr(that.attr("data-estype"))[
          parseFloat(that.attr("data-type-num")) - 1
        ].top =templateHeight / this.intHeight * 100;
        this.formInline.itemY=templateHeight*2;
      } else {
        this.show("请单击选择需要调整的组件");
      }
    },
    goLeft() {
      let that = $(".select_template");
      if (that.length > 0) {
        this.selectArr(that.attr("data-estype"))[
          parseFloat(that.attr("data-type-num")) - 1
        ].left = 0;
        this.formInline.itemX=0;
      } else {
        this.show("请单击选择需要调整的组件");
      }
    },
    goRight() {
      let that = $(".select_template");
      var templateWidth = parseFloat($(".select_template").css("width")); //当前模板的宽度度
      if (that.length > 0) {
        templateWidth = this.intWidth - templateWidth;
        this.selectArr(that.attr("data-estype"))[
          parseFloat(that.attr("data-type-num")) - 1
        ].left =templateWidth / this.intWidth * 100;
        this.formInline.itemX=templateWidth*2
      } else {
        this.show("请单击选择需要调整的组件");
      }
    },
    colFull() {
      let that = $(".select_template");
      if (
        that.attr("data-estype") == "weather" ||
        that.attr("data-estype") == "time"
      ) {
        this.show("该组件不支持横向铺满");
        return false;
      } else {
        if (that.length > 0) {
          this.selectArr(that.attr("data-estype"))[
            parseFloat(that.attr("data-type-num")) - 1
          ].left = 0;
          this.formInline.itemX=0
          this.formInline.itemW=this.intWidth*2
          this.selectArr(that.attr("data-estype"))[
            parseFloat(that.attr("data-type-num")) - 1
          ].itemwidth = this.intWidth;
        } else {
          this.show("请单击选择需要调整的组件");
        }
      }
    },
    rowFull() {
      let that = $(".select_template");
      if (
        that.attr("data-estype") == "weather" ||
        that.attr("data-estype") == "time"
      ) {
        this.show("该组件不支持纵向铺满");
        return false;
      } else {
        if (that.length > 0) {
          this.selectArr(that.attr("data-estype"))[
            parseFloat(that.attr("data-type-num")) - 1
          ].top = 0;
          this.formInline.itemY=0
          this.formInline.itemH=this.intHeight*2
          this.selectArr(that.attr("data-estype"))[
            parseFloat(that.attr("data-type-num")) - 1
          ].itemheight = this.intHeight;
        } else {
          this.show("请单击选择需要调整的组件");
        }
      }
    },
    goFull() {
      let that = $(".select_template");
      if (
        that.attr("data-estype") == "weather" ||
        that.attr("data-estype") == "time"
      ) {
        this.show("该组件不支持全屏铺满");
        return false;
      } else {
        if (that.length > 0) {
          this.selectArr(that.attr("data-estype"))[
            parseFloat(that.attr("data-type-num")) - 1
          ].top = 0;
          this.selectArr(that.attr("data-estype"))[
            parseFloat(that.attr("data-type-num")) - 1
          ].left = 0;
          this.formInline.itemX=0
          this.formInline.itemY=0
          this.formInline.itemW=this.intWidth*2
          this.formInline.itemH=this.intHeight*2
          this.selectArr(that.attr("data-estype"))[
            parseFloat(that.attr("data-type-num")) - 1
          ].itemwidth = this.intWidth;
          this.selectArr(that.attr("data-estype"))[
            parseFloat(that.attr("data-type-num")) - 1
          ].itemheight = this.intHeight;
        } else {
          this.show("请单击选择需要调整的组件");
        }
      }
    },
    goMin() {
      let that = $(".select_template");
      if (that.length > 0) {
        this.selectArr(that.attr("data-estype"))[
          parseFloat(that.attr("data-type-num")) - 1
        ].zindex = 30;
        if (!isNaN(this.oldel.attr("data-num"))) {
          this.selectArr(this.oldel.attr("data-estype"))[
            parseFloat(this.oldel.attr("data-type-num")) - 1
          ].zindex =
            parseFloat(this.oldel.attr("data-num")) * 50;
        }
      } else {
        this.show("请单击选择需要调整的组件");
      }
    },
    goMax() {
      let that = $(".select_template");
      if (that.length > 0) {
        this.selectArr(that.attr("data-estype"))[
          parseFloat(that.attr("data-type-num")) - 1
        ].zindex = 9999;
        if (!isNaN(this.oldel.attr("data-num"))) {
          this.selectArr(this.oldel.attr("data-estype"))[
            parseFloat(this.oldel.attr("data-type-num")) - 1
          ].zindex =
            parseFloat(this.oldel.attr("data-num")) * 50;
        }
      } else {
        this.show("请单击选择需要调整的组件");
      }
    },
    goRemove() {
      let that = $(".select_template");
      let num = parseFloat(that.attr("data-type-num")) - 1;
      if (that.length > 0) {
        let list = this.selectArr(that.attr("data-estype"));
        list.splice(num, 1);
        for (let i = 0; i < list.length; i++) {
          list[i].number = i + 1;
        }
        this.slotSelect = -1;
        this.imgSelect = -1;
        this.videoSelect = -1;
        this.txtSelect = -1;
        this.weatherSelect = -1;
        this.timeSelect = -1;
        this.webSelect = -1;
        this.changePosition(false);
      } else {
        this.show("请单击选择需要调整的组件");
      }
    },
    show(msg) {
      this.dialogVisible = true;
      this.msg = msg;
    },
    tempType() {
      let list = $(".template_item");
      for (let i = 0; i < list.length; i++) {
        let width = parseFloat($(list[i]).css("width"));
        let height = parseFloat($(list[i]).css("height"));
        let top = parseFloat($(list[i]).css("top"));
        let left = parseFloat($(list[i]).css("left"));
        if (width == this.intWidth) {
          this.selectArr($(list[i]).attr("data-estype"))[
            parseFloat($(list[i]).attr("data-type-num")) - 1
          ].left = 0;
        } else if (width + left > this.intWidth) {
          this.selectArr($(list[i]).attr("data-estype"))[
            parseFloat($(list[i]).attr("data-type-num")) - 1
          ].left =
            (this.intWidth - width) / this.intWidth * 100;
        }
        if (height == this.intHeight) {
          this.selectArr($(list[i]).attr("data-estype"))[
            parseFloat($(list[i]).attr("data-type-num")) - 1
          ].top = 0;
        } else if (height + top > this.intHeight) {
          this.selectArr($(list[i]).attr("data-estype"))[
            parseFloat($(list[i]).attr("data-type-num")) - 1
          ].top =
            (this.intHeight - height) / this.intHeight * 100;
        }
      }
    },
    getinfor(data,obj) {
      let that = this;
      $.ajax({
        type: "POST",
        url: "http://dev-api1.yixinfa.cn/file/sign.shtm",
        dataType: "json",
        data: {
          "payload":"{\"name\":\"" + data + "\"}"
        },
        success: function(res) {
          if (res.code >= 0) {
            that.payload = res.payload;
            obj.setOption({
                url: that.payload.host,
                multipart_params: {
                  key: "" + that.payload.key,
                  policy: that.payload.policy,
                  OSSAccessKeyId: that.payload["access-id"],
                  success_action_status: "200", //让服务端返回200,不然，默认会返回204
                  signature: that.payload.sign,
                }
              });
            obj.start();
          }
        },
        error: function(res) {
          console.log(22222, res);
        }
      });
    },
    getUpInfor(data,obj,isvideo){
      this.$esellApi.send(
              "/media/callback/add.shtml",
              data,
              res => {
                this.payload = res.payload;
                if(isvideo=='video'){
                  this.interArr[parseFloat(this.interuoItem.attr("data-type-num")) - 1].videosrc=res.payload['access-url']
                };
                obj.setOption({
                    url: this.payload.host,
                    multipart_params: {
                      key: "" +this.payload.key,
                      policy: this.payload.policy,
                      OSSAccessKeyId: this.payload["access-id"],
                      success_action_status: "200", //让服务端返回200,不然，默认会返回204
                      signature: this.payload.sign,
                      callback: this.payload.callback,
                    }
                  });
                obj.start();
              },
              res => {
                this.$message({
                  type: "error",
                  message: res.message,
                });
              }
            );
    },
    // 获取模板信息
    getTempInfor() {
      this.$esellApi.send(
          "/template/options.shtml",
          {},
          res => {
            this.tempList=res.payload;
          },
          res => {
            this.$message({
                type: "error",
                message: res.message,
            });
          }
      );
    },
  },
  mounted: function() {
    this.$nextTick(function() {
      const that = this;
      this.$esellApi.checkPermissions();
      that.imguploader = new plupload.Uploader({
        file_data_name: "file",
        browse_button: "imageClick",
        multi_selection: false,
        runtimes: "html5,flash,html4",
        // 记得改路径
        flash_swf_url: "https://cdn.bootcss.com/plupload/2.3.6/Moxie.swf",
        url: "http://oss.aliyuncs.com",
        filters: {
          mime_types: [{ title: "files", extensions: "jpg, jpeg, bmp,png" }],
          max_file_size: "0.01gb", //最大上传
          prevent_duplicates: true //不允许选取重复文件
        },
        init: {
          //  添加文件
          FilesAdded: function(up, files) {
            let imgsType = "";
            let filename = files[0].type;
            if (filename.indexOf(".jpg") > 0) {
              imgsType = ".jpg";
            } else if (filename.indexOf(".jpeg") > 0) {
              imgsType = ".jpeg";
            } else if (filename.indexOf(".png") > 0) {
              imgsType = ".png";
            } else if (filename.indexOf(".bmp") > 0) {
              imgsType = ".bmp";
            } else if (filename.indexOf(".mp4") > 0) {
              imgsType = ".mp4";
            } else {
              imgsType = ".jpg";
            }
            that.getinfor(imgsType, that.imguploader);
            that.imgupItem = $(".select_template");
          },
          UploadProgress: function(up, file) {
            that.imgArr[
              parseFloat(that.imgupItem.attr("data-type-num")) - 1
            ].showbar = true;
            that.imgArr[
              parseFloat(that.imgupItem.attr("data-type-num")) - 1
            ].barwidth =
              file.percent;
          },

          // 上传成功
          FileUploaded: function(up, file, info) {
            that.imgArr[
              parseFloat(that.imgupItem.attr("data-type-num")) - 1
            ].showbar = false;
            if (info.status == 200) {
              that.imgArr[
                parseFloat(that.imgupItem.attr("data-type-num")) - 1
              ].showbgimg = true;
              that.imgArr[
                parseFloat(that.imgupItem.attr("data-type-num")) - 1
              ].imgsrc =
                that.payload["access-url"];
            }
          },
          Error: function(up, err) {
            if (err.code == -600) {
              that.show("选择的文件太大了");
            } else if (err.code == -601) {
              that.show("请选择正确的文件类型");
            } else if (err.code == -602) {
              that.show("这个文件已经上传过一遍了");
            } else {
              that.show("Error xml:" + err.response);
            }
          }
        }
      });
      // 实例化（初始）
      that.imguploader.init();
      that.videouploader = new plupload.Uploader({
        file_data_name: "file",
        browse_button: "videoClick",
        multi_selection: false,
        runtimes: "html5,flash,html4",
        // 记得改路径
        flash_swf_url: "https://cdn.bootcss.com/plupload/2.3.6/Moxie.swf",
        url: "http://oss.aliyuncs.com",
        filters: {
          mime_types: [
            {
              title: "files",
              extensions: "mpg,m4v,mp4,flv,3gp,mov,avi,rmvb,mkv,wmv"
            }
          ],
          max_file_size: "1gb", //最大上传
          prevent_duplicates: true //不允许选取重复文件
        },
        init: {
          //  添加文件
          FilesAdded: function(up, files) {
            let imgsType = "";
            let filename = files[0].type;
            if (filename.indexOf("jpg") > 0) {
              imgsType = ".jpg";
            } else if (filename.indexOf("jpeg") > 0) {
              imgsType = ".jpeg";
            } else if (filename.indexOf("png") > 0) {
              imgsType = ".png";
            } else if (filename.indexOf("bmp") > 0) {
              imgsType = ".bmp";
            } else if (filename.indexOf("mp4") > 0) {
              imgsType = ".mp4";
            } else if (filename.indexOf("mpg") > 0) {
              imgsType = ".mpg";
            } else if (filename.indexOf("m4v") > 0) {
              imgsType = ".m4v";
            } else if (filename.indexOf("flv") > 0) {
              imgsType = ".flv";
            } else if (filename.indexOf("3gp") > 0) {
              imgsType = ".3gp";
            } else if (filename.indexOf("mov") > 0) {
              imgsType = ".mov";
            } else if (filename.indexOf("avi") > 0) {
              imgsType = ".avi";
            } else if (filename.indexOf("rmvb") > 0) {
              imgsType = ".rmvb";
            } else if (filename.indexOf("mkv") > 0) {
              imgsType = ".mkv";
            } else if (filename.indexOf("wmv") > 0) {
              imgsType = ".wmv";
            } else {
              imgsType = ".mp4";
            }
            that.getinfor(imgsType, that.videouploader);
            that.videoupItem = $(".select_template");
          },
          UploadProgress: function(up, file) {
            that.videoArr[
              parseFloat(that.videoupItem.attr("data-type-num")) - 1
            ].showbar = true;
            that.videoArr[
              parseFloat(that.videoupItem.attr("data-type-num")) - 1
            ].barwidth =
              file.percent;
          },

          // 上传成功
          FileUploaded: function(up, file, info) {
            that.videoArr[
              parseFloat(that.videoupItem.attr("data-type-num")) - 1
            ].showbar = false;
            if (info.status == 200) {
              that.videoArr[
                parseFloat(that.videoupItem.attr("data-type-num")) - 1
              ].showbgimg = true;
              that.videoArr[
                parseFloat(that.videoupItem.attr("data-type-num")) - 1
              ].videosrc =
                that.payload["access-url"];
              that.videoArr[
                parseFloat(that.videoupItem.attr("data-type-num")) - 1
              ].imgsrc ="http://file1.yixinfa.cn/dev/180301/be3e46f82df444558384b66f288126c5";
            }
          },
          Error: function(up, err) {
            if (err.code == -600) {
              that.show("选择的文件太大了");
            } else if (err.code == -601) {
              that.show("请选择正确的文件类型");
            } else if (err.code == -602) {
              that.show("这个文件已经上传过一遍了");
            } else {
              that.show("Error xml:" + err.response);
            }
          }
        }
      });
      that.videouploader.init();
      that.interloader = new plupload.Uploader({
        file_data_name: "file",
        browse_button: "interClick",
        multi_selection: false,
        runtimes: "html5,flash,html4",
        // 记得改路径
        flash_swf_url: "https://cdn.bootcss.com/plupload/2.3.6/Moxie.swf",
        url: "http://oss.aliyuncs.com",
        filters: {
          mime_types: [
            {
              title: "files",
              extensions: "jpg, jpeg, bmp,png"
            }
          ],
          max_file_size: "2000kb", //最大上传
          prevent_duplicates: true //不允许选取重复文件
        },
        init: {
          //  添加文件
          FilesAdded: function(up, files) {
            let filename = files[0].name;
            that.getUpInfor({'name':filename}, that.interloader);
            that.interuoItem = $(".select_template");
          },
          UploadProgress: function(up, file) {
            that.interArr[
              parseFloat(that.interuoItem.attr("data-type-num")) - 1
            ].showbar = true;
            that.interArr[
              parseFloat(that.interuoItem.attr("data-type-num")) - 1
            ].barwidth =
              file.percent;
          },

          // 上传成功
          FileUploaded: function(up, file, info) {
            that.interArr[
              parseFloat(that.interuoItem.attr("data-type-num")) - 1
            ].showbar = false;
            if (info.status == 200) {
             that.interArr[
                parseFloat(that.interuoItem.attr("data-type-num")) - 1
              ].showbgimg = true;
              that.interArr[
                parseFloat(that.interuoItem.attr("data-type-num")) - 1
              ].imgsrc =
                that.payload["access-url"];
            }
          },
          Error: function(up, err) {
            if (err.code == -600) {
              that.show("选择的文件太大了");
            } else if (err.code == -601) {
              that.show("请选择正确的文件类型");
            } else if (err.code == -602) {
              that.show("这个文件已经上传过一遍了");
            } else {
              that.show("Error xml:" + err.response);
            }
          }
        }
      });
      that.interloader.init();
      that.interImgloader = new plupload.Uploader({
        file_data_name: "file",
        browse_button: "interImgClick",
        multi_selection: false,
        runtimes: "html5,flash,html4",
        // 记得改路径
        flash_swf_url: "https://cdn.bootcss.com/plupload/2.3.6/Moxie.swf",
        url: "http://oss.aliyuncs.com",
        filters: {
          mime_types: [
            {
              title: "files",
              extensions: "jpg, jpeg, bmp,png"
            }
          ],
          max_file_size: "7000kb", //最大上传
          prevent_duplicates: false //不允许选取重复文件
        },
        init: {
          //  添加文件
          FilesAdded: function(up, files) {
            let filename = files[0].name;
            that.getUpInfor({'name':filename}, that.interImgloader);
            that.interuoItem = $(".select_template");
          },
          UploadProgress: function(up, file) {
            that.interArr[
              parseFloat(that.interuoItem.attr("data-type-num")) - 1
            ].showbar = true;
            that.interArr[
              parseFloat(that.interuoItem.attr("data-type-num")) - 1
            ].barwidth =
              file.percent;
          },

          // 上传成功
          FileUploaded: function(up, file, info) {
            that.interArr[
              parseFloat(that.interuoItem.attr("data-type-num")) - 1
            ].showbar = false;
            if (info.status == 200) {
              that.interArr[parseFloat(that.interuoItem.attr("data-type-num")) - 1].interType =that.interType;
              that.interArr[parseFloat(that.interuoItem.attr("data-type-num")) - 1].interShow = true;
              that.interArr[parseFloat(that.interuoItem.attr("data-type-num")) - 1].interSrc =that.payload["access-url"];
            }
          },
          Error: function(up, err) {
            if (err.code == -600) {
              that.show("选择的文件太大了");
            } else if (err.code == -601) {
              that.show("请选择正确的文件类型");
            } else if (err.code == -602) {
              that.show("这个文件已经上传过一遍了");
            } else {
              that.show("Error xml:" + err.response);
            }
          }
        }
      });
      that.interImgloader.init();
      that.interVideoloader = new plupload.Uploader({
        file_data_name: "file",
        browse_button: "interVideoClick",
        multi_selection: false,
        runtimes: "html5,flash,html4",
        // 记得改路径
        flash_swf_url: "https://cdn.bootcss.com/plupload/2.3.6/Moxie.swf",
        url: "http://oss.aliyuncs.com",
        filters: {
          mime_types: [
            {
              title: "files",
              extensions: "mpg,m4v,mp4,flv,3gp,mov,avi,rmvb,mkv,wmv"
            }
          ],
          max_file_size: "1gb", //最大上传
          prevent_duplicates: false //不允许选取重复文件
        },
        init: {
          //  添加文件
          FilesAdded: function(up, files) {
            let filename = files[0].name;
            that.interuoItem = $(".select_template");
            that.getUpInfor({'name':filename}, that.interVideoloader,'video');
          },
          UploadProgress: function(up, file) {
            that.interArr[
              parseFloat(that.interuoItem.attr("data-type-num")) - 1
            ].showbar = true;
            that.interArr[
              parseFloat(that.interuoItem.attr("data-type-num")) - 1
            ].barwidth =
              file.percent;
          },

          // 上传成功
          FileUploaded: function(up, file, info) {
            var data=eval('(' + info.response + ')')
            that.interArr[
              parseFloat(that.interuoItem.attr("data-type-num")) - 1
            ].showbar = false;
            if (info.status == 200) {
              that.interArr[parseFloat(that.interuoItem.attr("data-type-num")) - 1].interType =that.interType;
              that.interArr[parseFloat(that.interuoItem.attr("data-type-num")) - 1].interShow = true;
              that.interArr[parseFloat(that.interuoItem.attr("data-type-num")) - 1].interSrc =data.payload.coverUrl;
            }
          },
          Error: function(up, err) {
            if (err.code == -600) {
              that.show("选择的文件太大了");
            } else if (err.code == -601) {
              that.show("请选择正确的文件类型");
            } else if (err.code == -602) {
              that.show("这个文件已经上传过一遍了");
            } else {
              that.show("Error xml:" + err.response);
            }
          }
        }
      });
      that.interVideoloader .init();
      $(".module_list .item").mouseenter(function(e) {
        e.preventDefault();
        if (that.changeActive) {
          $(this).addClass("active").siblings(".active").removeClass("active");
        }
      });
      $(".module_list .item").draggable({
        helper: "clone",
        start: function() {
          that.childNum = parseFloat($(this).attr("data-num"));
          that.changeActive = false;
        },
        stop: function(event) {
          that.changeActive = true;
          var top = parseFloat($(".mid").offset().top);
          var left = parseFloat($(".mid").offset().left);
          var right = left + parseFloat(that.intWidth);
          var bottom = top + parseFloat(that.intHeight);
          const x = event.clientX;
          const y = event.clientY;
          if (that.childNum == 4) {
            //                        文本
            var itemWidth = 220; //生成文本模板时的宽度
            var itemHeight = 40; //生成文本模板时的高度
          } else if (that.childNum == 5) {
            //                        天气
            var itemWidth = 223; //生成文本模板时的宽度
            var itemHeight = 40; //生成文本模板时的高度
          } else if (that.childNum == 6) {
            //                        时钟
            var itemWidth = 200; //生成文本模板时的宽度
            var itemHeight = 40; //生成文本模板时的高度
          }else if(that.childNum == 8){
            var itemWidth = 80; //生成文本模板时的宽度
            var itemHeight = 40; //生成文本模板时的高度
          }else {
            //                        广告位，视频，图片，浏览器
            var itemWidth = 300; //生成广告位模板时的宽度
            var itemHeight = 150; //生成广告位模板时的高度
          }
          that.ofx = event.clientX - itemWidth / 2 - left;
          that.ofy = event.clientY - itemHeight / 2 - top;
          if (x < left + itemWidth / 2) {
            that.ofx = 0;
          } else if (x > right - itemWidth / 2) {
            that.ofx = that.intWidth - itemWidth;
          }
          if (y < top + itemHeight) {
            that.ofy = 0;
          } else if (y > bottom - itemHeight) {
            that.ofy = that.intHeight - itemHeight;
          }
          switch (that.childNum) {
            case 1:
              if (left <= x && x <= right && (top <= y && y <= bottom)) {
                addItem(".slot_wrapper",itemWidth,itemHeight,that.slotArr,"data-slot","slot",false);
              } else {
                console.log("不可添加");
              }
              break;
            case 2:
              if (left <= x && x <= right && (top <= y && y <= bottom)) {
                addItem(".img_wrapper",itemWidth,itemHeight,that.imgArr,"data-img","img",false);
              } else {
                console.log("不可添加");
              }
              break;
            case 3:
              if (left <= x && x <= right && (top <= y && y <= bottom)) {
                addItem(".video_wrapper",itemWidth,itemHeight,that.videoArr,"data-video","video",false);
              } else {
                console.log("不可添加");
              }
              break;
            case 4:
              if (left <= x && x <= right && (top <= y && y <= bottom)) {
                addItem(".txt_wrapper",itemWidth,itemHeight,that.txtArr,"data-txt","txt",false);
              } else {
                console.log("不可添加");
              }
              break;
            case 5:
              if (left <= x && x <= right && (top <= y && y <= bottom)) {
                addItem(".weather_wrapper",itemWidth,itemHeight,that.weatherArr,"data-weather","weather",true);
              } else {
                console.log("不可添加");
              }
              break;
            case 6:
              if (left <= x && x <= right && (top <= y && y <= bottom)) {
                addItem(".time_wrapper",itemWidth,itemHeight,that.timeArr,"data-time","time",true);
              } else {
                console.log("不可添加");
              }
              break;
            case 7:
              if (left <= x && x <= right && (top <= y && y <= bottom)) {
                addItem(".web_wrapper",itemWidth,itemHeight,that.webArr,"data-web", "web",false);
              } else {
                console.log("不可添加");
              }
              break;
            case 8:
              if (left <= x && x <= right && (top <= y && y <= bottom)) {
                addItem(".inter_wrapper",itemWidth,itemHeight,that.interArr,"data-inter", "inter",false);
              } else {
                console.log("不可添加");
              }
              break;
            default:
          }
        }
      });
      function addItem(element,width,height,data,data1,type,only) {
        //                element    绑定的元素
        //                data       数据数组
        //                data1      获取自定义属性
        //                type       添加的模板种类
        //                only       是否唯一
        if (only) {
          if ($(element).length >= 1) {
            that.show("该组件仅允许添加一个");
            return false;
          } 
        }
        var soltObj = {
          number: $(element).length + 1,
          top: that.ofy / that.intHeight * 100,
          left: that.ofx / that.intWidth * 100,
          width: that.intWidth,
          height: that.intHeight,
          zindex: that.itemNum * 50,
          num: that.itemNum,
          isSelsct: false,
          type: type,
          itemwidth: width,
          itemheight: height,
          show: false,
          val: "双击修改文字",
          slotname: "广告位" + (parseFloat($(element).length) + 1),
          weather: [
            { txt: "设备所在城市", icon: "&#xe669;",type:'city'},
            { txt: "天气", icon: "&#xe667;",type:'weather'},
            { txt: "气温", icon: "&#xe66a;",type:'temperature'},
            { txt: "风向", icon: "&#xe66b;",type:'wind'}
          ],
          txtColor: "rgb(51,51,51)",
          bgcolor: "rgba(255,255,255,1)",
          txtspeed: "",
          orienta: "",
          weburl: "",
          webshow: false,
          showbar: false,
          showbgimg: false,
          barwidth: 0,
          imgsrc: "http://file1.yixinfa.cn/dev/180301/be3e46f82df444558384b66f288126c5",
          videosrc: "",
          interType:1,
          interSrc:'',
          interUrl:'',
          interTemp:'-1',
          interBg:'',
          interShow:false,
        };
        data.push(soltObj);
        that.itemNum += 1;
      }
    });
  },
  watch: {
    webUrl: function() {
      this.webSet();
    }
  },
  filters: {
    data: function(input) {
      var d = new Date(input);
      var year = d.getFullYear();
      var month =
        d.getMonth() + 1 < 10
          ? "0" + (d.getMonth() + 1)
          : "" + (d.getMonth() + 1);
      var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
      var hour = d.getHours() < 10 ? "0" + d.getHours() : "" + d.getHours();
      var minutes =
        d.getMinutes() < 10 ? "0" + d.getMinutes() : "" + d.getMinutes();
      var seconds =
        d.getSeconds() < 10 ? "0" + d.getSeconds() : "" + d.getSeconds();
      var week = d.getDay();
      switch (week) {
        case 0:
          week = "星期日";
          break;
        case 1:
          week = "星期一";
          break;
        case 2:
          week = "星期二";
          break;
        case 3:
          week = "星期三";
          break;
        case 4:
          week = "星期四";
          break;
        case 5:
          week = "星期五";
          break;
        case 6:
          week = "星期六";
          break;
        default:
          break;
      }
      return (
        year +
        "年" +
        month +
        "月" +
        day +
        "日 " +
        hour +
        ":" +
        minutes +
        ":" +
        seconds +
        " " +
        week
      );
    }
  },
  created(){
     this.getTempInfor();
  }
};
</script>
<style lang="scss" scoped>
@import "../../sass/template.scss";
</style>

