<template>
    <div class="tempalte-manager addtemplate_wrapper">
        <div class="top clearfix">
            <span class="fl">您的位置&nbsp;:&nbsp;</span>
            <span class="crumbs fl">
                <router-link to="/home" class="blue">系统首页</router-link>
                <span>></span>
                <span>布局管理</span>
            </span>
        </div>
        <div class="bottom">
            <div class="advertising" v-show="isShow" style="margin-top:20px;">
                <div class="importance-hint">
                    <div class="hint yxf-color">重要提示&nbsp;:</div>
                    <div class="hint-one">
                        <span>1、布局管理是为用户提供可选择布局中心，根据用户所选布局可以进行设备的布局设置和广告投放</span>
                    </div>
                    <div class="hint-two">
                        <span>2、用户可以根据实际的使用需求适当添加和删除布局</span>
                    </div>
                    <div class="hint-three">
                        <span>3、删除布局后用到该布局的设备获取广告会出现异常，请重新设置设备布局</span>
                    </div>
                    <div class="hint-line"></div>
                </div>
                <!--add-device-->
                <div class="template-options">

                    <!-- <a href="javascript:;" class="yxf-but" @click="$router.push({path:'/temp_mag/add_temp'})">
                        添加系统布局
                    </a> -->
                    <a href="javascript:;" data-butflag="1522754268098" class="yxf-but" @click="$router.push({path:'/temp_mag/add_custom_temp'})">添加自定义布局</a>
                </div>
                <!--all-device-->
                <div class="tempalte-type">
                    <div class="cf">
                       <div class="simple-template-landscape template_box fl" v-for="(item,index) in list" :key=index >
                            <div class="simple-template-landscape-image template_center">
                                <div data-v-9caab684="" id="template_wrapper" class="mid pr center_main" v-html="item.content">       </div>
                            </div>
                            <div class="simple-template-landscape-info cf">
                                <div class="item_left">
                                    <div class="template-name">
                                        <span>布局名称:</span>
                                        <span class="name">{{item.name}}</span>
                                    </div>
                                    <p>分辨率:
                                        <span>{{item.width}}*{{item.height}}</span>
                                    </p>
                                    <p>广告位:
                                        <span>{{item.width}}*{{item.height}}</span>
                                    </p>
                                </div>
                                <div class="item_right" data-butflag="1522754463456">
                                    <a href="javascript:;" class="yxf-but" @click="removeTemplate(item.id,index)" v-if="item['default-value']!='Y'">删除模板</a>
                                    <span v-else>默认模板无法删除</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="paging" v-if="ishide" style="text-align: center;margin-top:20px;">
                        <el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="page" :page-size="size" :page-sizes='[8,12,16]' layout="total, sizes, prev, pager, next, jumper" :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="advertising-group" v-show="!isShow" style="margin-top:20px;">
               <div style="width: 502px;">
		</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "tempalte-manager",
  data() {
    return {
      isShow: true,
      all: 40,
      ishide: true,
      active: "all",
      area: "",
      bg: "mine-system-layout",
      activeName: "landscape-template",
      list:[],
      page:1,
      size:8,
      total:99,
    };
  },
    mounted() {
        this.$esellApi.checkPermissions();
    },
  methods: {
    posterSwitch(str) {
      if (str === "mine-system-layout") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      this.bg = str;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    makeActive(str) {
      this.active = str;
    },
    removeTemplate(id,index){
        this.$confirm('删除后模板将无法恢复，确认删除？')
          .then(_ => {
            this.$esellApi.send(
                "/template/delete.shtml",
                {
                'id':id,
                },
                res => {
                    this.getList();
                },
                res => {
                    this.$message({
                        type: "error",
                        message: res.message,
                    });
                }
            );
          })
          .catch(_ => {});
    },
    sizeChange(val){
        this.size=val;
        this.getList();

    },
    pageChange(val){
        this.page=val;
        this.getList();
    },
    getList(){
        this.$esellApi.send(
            "/template/list.shtml",
            {
            'page':this.page,
            'size':this.size,
            },
            res => {
                this.list=res.payload.data;
                this.total=res.payload.total;
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
  },
    watch: {
        area: function(newVal, oldVal) {
        console.log(newVal);
        }
    },
    created(){
        this.getList();        
    }
};
</script>
<style lang="scss">
@import "../../sass/templateManage.scss";
@import "../../sass/showTemplate.scss";
.tempalte-type {
  position: relative;
}

.simple-template-quantity {
  position: absolute;
  top: 10px;
  right: 0;
}

div.active {
  transition: all 0.6s;
  color: $white !important;
  background-color: $impColor !important;
}

.material-hint {
  position: absolute;
  top: 10px;
  right: 0;
  color: #666;
}
</style>

