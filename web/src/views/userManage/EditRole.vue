<!--角色管理-->
<template>
  <div class="material-manage">
    <div class="top clearfix">
      <span class="fl">您的位置&nbsp;:&nbsp;</span>
      <span class="crumbs fl">
        <router-link to="/home" class="blue">系统首页</router-link>
        <span>></span>
        <router-link to="/user_mag" class="blue">用户管理</router-link>
        <span>></span>
        <router-link to="/user_mag/role_mag" class="blue">角色管理</router-link>
        <span>></span>
        <span>{{operationType}}角色</span>
      </span>
    </div>
    <div class="bottom">
      <div class="row1">
        <div class="material-name clearfix">
          <span class="material-name-left fl">角色名称</span>
          <span class="material-name-right fl">
            <el-input style="min-width:513px;" v-model="roleName" placeholder="请输入角色名称"></el-input>
          </span>
        </div>
      </div>
      <div class="tabs clearfix">
        <div class="tabs-advertising">
          <!-- <div class="fl mine-poster" :class="{'active':bg=='P'}" @click="posterSwitch('P')">PC 版</div> -->
          <!--<div class="fl poster-library" :class="{'active':bg=='M'}" @click="posterSwitch('M')">手机版</div>-->
        </div>
      </div>
      <div class="advertising" v-show="isShow" style="margin-top:20px;">
        <div>

          <el-tree @check-change="handleClick" @setCheckedNodes="setCheckedNodes" :data="jurisdictionList" :props="defaultProps" show-checkbox node-key="id" ref="permissionsTree" :default-checked-keys="currentUserPermissions" :highlight-current="true" :expand-on-click-node="false" :check-strictly="true" :render-content="renderContent" @setCheckedKeys="setCheckedKeys">
          </el-tree>

          <div style="margin-top:20px;">
            <a href="javascrip:;" class="yxf-but" style="margin-right:6px;" @click="cdup">
              返回
            </a>
            <el-button @click="getCheckedKeys()">完成</el-button>
          </div>
          <el-dialog title="添加/编辑" width="25%" class="add-event-dialog" :visible.sync="addEventdialogVisible" size="tiny">
            <el-form ref="addEventForm" :model="addEventForm" :rules="addEventNodeRules">
              <el-form-item label="菜单/按钮名称" prop="name">
                <el-input v-model="addEventForm.name"></el-input>
              </el-form-item>
              <el-form-item label="请求url" prop="url">
                <el-input v-model="addEventForm.url"></el-input>
              </el-form-item>

              <el-form-item label="类型" prop="type">
                </br>
                <el-select v-model="addEventForm.type">
                  <el-option value="1" label="菜单"></el-option>
                  <el-option value="2" label="按钮"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="按钮唯一标识" prop="butFlag" v-show="addEventForm.type=='2'">
                <el-input v-model="addEventForm.butFlag" readonly="readonly"></el-input>
              </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="addEventFormCancleBtn('addEventForm')">取 消</el-button>
              <el-button type="primary" @click="addEventFormSubmitBtn('addEventForm')">确 定</el-button>

            </span>
          </el-dialog>
        </div>
      </div>
      <div class="advertising-group" v-show="!isShow" style="margin-top:20px;">
        2
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "material-manage",
  data() {
    return {
      operationType: '添加',
      jurisdictionList: [], //权限列表
      type: "P", //p-pc版，m-移动版
      roleName: "", //角色名字
      checked: false,
      bg: "P",
      isShow: true,
      roleHave: false,
      tmepId: 1,
      defaultProps: {
        children: "permissions",
        label: "name",
        disabled: "disabled"
      },
      /*触发的当前的节点，放到全局，方便调用*/
      triggerCurrenNodeData: {},
      /*触发的当前节点*/
      triggerCurrenNode: {},
      /*新增事件弹窗的输入框数据*/
      addEventdialogVisible: false,
      addEventForm: {
        id: '',
        name: '',
        url: '',
        butFlag: '',
        type: '',
        parentId: '',
      },
      currentUserPermissions: []
    };
  },
  created() {
    let that = this;
    this.GetPageRolePermissions();
    this.roleName = this.$route.query.name;
    if (this.$route.query.id) {
      this.operationType = '编辑';
    }

    
    /** tree 扩展插件 */
    setTimeout(function(){
      $('.el-tree-node__content').on('click', function(e){
          if(e.srcElement && e.srcElement.tagName.toLocaleUpperCase()==="SPAN"){
            $(e.srcElement).parents('.el-tree-node__content').find('.el-tree-node__expand-icon').click();
          }else{
            e.currentTarget.childNodes[0].click();
          }
      });

      $('.el-checkbox__inner').on('click', function(e){

        let isChecked = 'is-checked';
        if(e.originalEvent){
          let checked = !$(e.target).parent().hasClass(isChecked);
          if(checked){
            $(e.target).parents('.el-tree-node:eq(0)').find('.el-tree-node__children .el-checkbox__input').map(function(index, item){
                if(!$(item).hasClass(isChecked)){
                  $(item).click();
                }
            });
            
            let $parentEl = $(e.target).parents('.el-tree-node:eq(0)').parents('.el-tree-node:eq(0)').find('.el-checkbox__input:eq(0)');
            if(!$parentEl.hasClass(isChecked)){
              that.checkedParentEl(e.target);
            }

          }else{
            $(e.target).parents('.el-tree-node:eq(0)').find('.el-tree-node__children .el-checkbox__input').map(function(index, item){
              if($(item).hasClass(isChecked)){
                $(item).click();
              }
            });
          }

        }
        
        e.cancelBubble = true;
        e.stopPropagation();

        //js阻止链接默认行为，没有停止冒泡
        // e.preventDefault(); 
      });

    }, 500);
  },
  mounted() {
    this.$nextTick(function() {
      if (this.$route.query) {
        if (this.$route.query.name) {
          this.roleName = this.$route.query.name;
        }
      }
    });
  },
  mounted: function() {
    this.$esellApi.checkPermissions();
  },
  methods: {
    checkedParentEl(target){
      let $parentEl = $(target).parents('.el-tree-node:eq(0)').parents('.el-tree-node:eq(0)').find('.el-checkbox__inner:eq(0)');
      if($parentEl.length > 0){
        $parentEl.click();
        this.checkedParentEl($parentEl);
      }
    },
    permissionsCheckChange(e) {
      console.log(e);
    },
    // 进入页面获取页面角色权限
    GetPageRolePermissions() {
      this.$esellApi.send(
        "/role/permission.shtml",
        {
          type: this.type,
          id: this.$route.query.id
        },
        res => {
          this.currentUserPermissions = res.payload.permissionsHas;
          
          for(var i =0; i < res.payload.permissionsAll.length; i++){
            if(res.payload.permissionsAll[i]['class-name'] == 'iF-home'){
              //如果是添加角色，则没有如下属性，故作判断              
              this.currentUserPermissions && this.currentUserPermissions.unshift(res.payload.permissionsAll[i].id);

              res.payload.permissionsAll[i].disabled = true;
              if (res.payload.type !== 'COM_ROOT') {
                break;
              }
            }
          }

          this.jurisdictionList = res.payload.permissionsAll;

        },
        res => {
          this.message("error", res.message)
        }
      );
    },
    // 编辑完后保存发送请求
    addNewUser() {
      var arr = [];
      this.jurisdictionList.forEach(function(v, i) {
        arr = arr.concat(v.allCheckedArray);
      });
      this.$esellApi.send(
        "/role/update.shtml",
        {
          id: this.$route.query.id,
          name: this.roleName,
          permissions: arr
        },
        res => {
          if (res.message == "OK") {
            this.message("success", "编辑成功");
            this.$router.push({ path: "/user_mag/role_mag" });
          }
        },
        res => {
          this.message("error", res.message)
        }
      );
    },
    posterSwitch(str) {
      if (str === "mine-poster") {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
      this.bg = str;
      console.log(str);
    },
    // // 全选Checked
    // handleCheckAllChange(event, i) {
    //   var item = this.jurisdictionList[i];
    //   var jurisdictionListId = item.id; //当前选中选项的名字
    //   if (event.target.checked) {
    //     item.allCheckedArray = [];
    //     item.cityOptions = [];
    //     item.permissions.forEach(function(ele, index) {
    //       item.cityOptions.push(ele);
    //       item.allCheckedArray.push(ele.id);
    //       item.checkAll = true;
    //     });
    //     item.cities = item.cityOptions;
    //     item.checkedCities = item.cityOptions;
    //     item.allCheckedArray.push(jurisdictionListId);
    //   } else {
    //     item.cities = item.permissions;
    //     item.checkedCities = [];
    //     item.allCheckedArray = [];
    //     item.checkAll = false;
    //   }
    //   item.allCheckedArray = this.unique(item.allCheckedArray);
    //   console.log("去重之后", item.allCheckedArray);
    // },
    // 去除重复的元素
    unique(arr) {
      let resultarr = [...new Set(arr)];
      return resultarr;
    },
    // // 单个Checked
    // handleCheckedCitiesChange(value, i) {
    //   var item = this.jurisdictionList[i];
    //   let jurisdictionListId = this.jurisdictionList[i].id;
    //   item.allCheckedArray = [];
    //   item.checkAll = value.length > 0;
    //   value.forEach(function(v, i) {
    //     item.allCheckedArray.push(v.id);
    //     if (value.length > 0) {
    //       item.allCheckedArray.push(jurisdictionListId);
    //     }
    //   });
    //   item.allCheckedArray = this.unique(item.allCheckedArray);
    //   console.log(this.jurisdictionList);
    // },
    cdup() {
      this.$router.go(-1);
    },
    getCheckedKeys() {
      let permissionIds = this.$refs.permissionsTree.getCheckedKeys();
      this.$esellApi.send(
        "/permission/saveOwnedID.shtml",
        {
          "permission-ids": permissionIds,
          "role-name": this.roleName,
          "role-id": this.$route.query.id,
        },
        res => {
          if (res.message == 'OK') {
            this.message("success", "保存成功，请通知用户重新登录！");
            // this.GetPageRolePermissions();
            this.$router.push({ path: "/user_mag/role_mag" });
          } else {
            this.message("error", res.message);
          }
        },
        res => {
          this.message("error", res.message);
        }
      );
    },
    savePermissionsSubmit() {
      this.$esellApi.send(
        "/permission/save.shtml",
        {
          "parent-id": this.addEventForm.parentId,
          "id": this.addEventForm.id,
          "type": this.addEventForm.type,
          "name": this.addEventForm.name,
          "url": this.addEventForm.url,
          "but-flag": this.addEventForm.type == 2 ? this.addEventForm.butFlag : ''
        },
        res => {
          if (res.message == 'OK') {
            this.addEventdialogVisible = false;
            this.GetPageRolePermissions();
          }
        },
        res => {
          this.message("error", res.message)
        }
      );
    },
    movePermissionSubmit(id) {
      this.$esellApi.send(
        "/permission/delete.shtml",
        {
          "id": id
        },
        res => {
          if (res.message == 'OK') {
            this.GetPageRolePermissions();
            this.message("success", "保存成功！");
          }
        },
        res => {
          this.message("error", res.message)
        }
      );
    },
    append(store, data, n) {
      //store.append({ id: 'tmep'+(this.tmepId++), label: "testtest", children: [] }, data);
      this.addEventdialogVisible = true;
      this.addEventForm = {};
      this.triggerCurrenNode = n;
      this.addEventForm.parentId = data.id;
      //使用当前时间戳作为but的唯一标识
      this.addEventForm.butFlag = new Date().getTime();
    },
    edit(store, data, n) {
      this.addEventdialogVisible = true;
      this.triggerCurrenNodeData = data;
      this.addEventForm = data;
      console.log(this.addEventForm);
      this.addEventForm.butFlag = data['but-flag'];
      this.addEventForm.parentId = data['parent-id'];
      this.triggerCurrenNode = n;
      if (!this.addEventForm.butFlag) {
        this.addEventForm.butFlag = new Date().getTime();
      }
    },
    remove(store, data) {
      store.remove(data);
      if (confirm(data.id)) {
        this.movePermissionSubmit(data.id);
      }
    },
    addEventFormCancleBtn(e) {
      this.addEventForm = {};
      this.addEventdialogVisible = false;
    },
    addEventFormSubmitBtn(e) {
      this.savePermissionsSubmit();
    },
    // handleClick(data, checked, node) {
    //   console.log(data);
    //   var array=[];
    //   if (checked) {
    //     console.log(data.id)
    //     this.$refs.permissionsTree.setCheckedNodes([]);
    //     console.log(1,this.$refs.permissionsTree.setCheckedNodes([data]))
    //     // this.$refs.permissionsTree.setCheckedNodes([]);
    //     // this.$refs.permissionsTree.setCheckedNodes([data]);
    //   }else{

    //   }
    // this.i++;
    // if (this.i % 2 == 0) {
    //   if (checked) {
    //     this.$refs.treeForm.setCheckedNodes([]);
    //     this.$refs.treeForm.setCheckedNodes([data]);
    //     //交叉点击节点
    //   } else {
    //     this.$refs.treeForm.setCheckedNodes([]);
    //     //点击已经选中的节点，置空
    //   }
    // }
    // },
    renderContent(h, { node, data, store }) {
      //区分开发测试与生产
      if(/(:\/\/localhost|:\/\/127|:\/\/dev-)/.test(location.href)){
        return (
          <span><span style="display:none;">card：{data.id}</span>
          <span >
            <span>{node.label}</span>
          </span>
          <span style="float: right; margin-right: 20px">
            <el-button size="mini" on-click={() => this.append(store, data, node)}>添加子菜单</el-button>
            <el-button size="mini" on-click={() => this.edit(store, data, node)}>编辑</el-button>
            <el-button size="mini" on-click={() => this.remove(store, data)}>删除(生产隐藏)</el-button>
          </span>
        </span>);
      }else{
         return (
          <span><span style="display:none;">当前ID：{data.id}</span>
          <span >
            <span>{node.label}</span>
          </span>
        </span>);
      }
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
@import "../../sass/addNewRole.scss";
div.active {
  transition: all 0.6s;
  color: #fff !important;
  background-color: #ff635c !important;
}
</style>

