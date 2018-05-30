<template>
  <div class="app-container">
    <!--控制动态表格-->
    <el-popover ref="popover5" placement="left" width="80">
      <div class="filter-container" style="width:80px;">
        <h3 style="margin-bottom:10px;">显示列</h3>
        <el-checkbox-group v-model="checkboxVal" @change="tebleChange(checkboxVal)">
          <el-checkbox :label="item" v-for="(item) in formTheadOptions" :key="item"></el-checkbox>
        </el-checkbox-group>
      </div>
    </el-popover>
    <!--控制动态表格按钮-->
    <a href="javascript:;" class="yxf-but controllerColumn" v-popover:popover5>设置列表</a>
    <!--动态表格数据-->
    <el-table :data="tableData" :key='key' border fit highlight-current-row style="width:100%" @cell-click='selectApi' @select-all='selectAll' @select="changeFun">
      <el-table-column type="selection" width="48" align="center">
      </el-table-column>
      <el-table-column :label="item.label" :prop="item.prop" v-if="item.status" v-for="(item,index) in tableInfo" :key="index">
        <template slot-scope="scope">
          <div v-if="item.style">
            <div :class="item.class"> {{scope.row[item.prop]||item.init}}</div>
          </div>
          <div v-else>  
            <div v-if="item.img">
              <img :src="scope.row[item.prop]" style="width:80px;height:80px;">
            </div>
            <div v-else>
              {{(scope.row[item.prop])||item.init}}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="showcontrol">
        <template slot-scope="scope">
          <div class="file-operation-other clearfix" v-if="scope.row['default-value']!='Y'">
            <a class="blue fl" @click="itemAction(scope.row,item)" v-for="(item,index) in action" :key="index" :data-butflag="item.dataButFlag">{{item.name}}</a>
          </div>
          <div class="file-operation-other clearfix" v-else>
            <a class="fl" :class="item.callback?'blue':''" @click="itemAction(scope.row,item)" v-for="(item,index) in enAction" :key="index" :data-butflag="item.dataButFlag">{{item.name}}</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="paging" style="text-align: center;margin-top:20px;">
      <el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="page" :page-size="pagesize" :page-sizes='[10,20,30]' layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <!--设备信息-->
      <el-dialog title="设备信息" :visible.sync="deviceInforStatus" width="30%" :before-close="handleClose">
          <div class="device-info">
              <div style="width:100%;height:100%;border:1px solid #e5e5e5;border-bottom:none">
                  <div class="clearfix" style="width:100%" v-for="(item,index) in deviceInfoList" :key="index">
                      <div class="fl" style="padding:0 20px;width:20%;height:34px;line-height:34px;border-right:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;box-sizing:border-box">
                        {{item.title}}
                      </div>
                      <div class="fl" style="padding:0 20px;width:80%;height:34px;line-height:34px;box-sizing:border-box;border-bottom:1px solid #e5e5e5">
                        {{item.info}}
                      </div>
                  </div>
              </div>
          </div>
      </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    action: [],
    enAction: [],
    tableInfo: [],
    tableData: [], //保存列表信息,
    formTheadOptions: [], // 可选择表头
    checkboxVal: [], // checkboxVal
    page: 1, //当前页
    pagesize: 10, //当前页的条数
    total: 99, //当前信息的总条数
    deviceInfoList:[],
    deviceInforStatus:false,
    showcontrol:true,
  },
  data() {
    return {
      multipleSelection: [], //接收选中的数据
      key: 1, // table key
      showcontrol:true,
    };
  },
  mounted() { },
  watch: {
        checkboxVal(valArr) {
            this.$esellApi.checkPermissions();
            this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
            this.key = this.key + 1// 为了保证table 每次都会重渲 （牺牲性能保证效果，当然也可以不用）
        }
    },
  methods: {
    tebleChange(data) {
      for (let i = 0; i < this.tableInfo.length; i++) {
        if (data.indexOf(this.tableInfo[i].label) < 0) {
          this.tableInfo[i].status = false;
        } else {
          this.tableInfo[i].status = true;
        }
      }
    },
    sizeChange(val) {
      this.$emit("sizeChange", val);
    },
    pageChange(val) {
      this.$emit("pageChange", val);
    },
    changeFun(val) {
      this.multipleSelection = val;
      this.$emit("batchStartUsing", this.multipleSelection);
    },
    selectAll(val) {
      this.multipleSelection = val;
      this.$emit("batchStartUsing", this.multipleSelection);
    },
    selectApi(row, column, cell, event) {
      if (column.label === "推广计划名称") {
        if(this.$esellApi.hasPermission(1522748629616)){
          this.$router.push({ path: "/adv_mag/pop_plan_mag", query: { id: ''+row.id, name: ''+row.name } });
        }else{
          this.$message({
            message: "您还没有查看广告列表的权限",
            type:"error"
          });
        }
      }
    },
    handleClose(done) {
     this.$emit("closeDialog");
    },
    // 操作中的方法
    itemAction(data,item) {
      this.$emit(item.callback, data)
    },
  },
};
</script>
<style scoped lang="scss">
.app-container {
  position: relative;
}

.file-operation-file {
  padding: 0 30px;
  div {
    font-size: 13px;
    color: #6baef3;
  }
  .edit {}
  .delete {
    margin-left: 5px;
  }
}

.file-operation-other {
  div {
    cursor: pointer;
    margin-left: 14px;
    font-size: 13px;
    color: #6baef3;
  }
  .shear {}
  .copy {}
  .edit {}
  .delete1 {}
}

.controllerColumn {
  position: absolute;
  top: -40px;
  right: 0;
  z-index: 2;
}

.file-operation-othe {
  a {
    margin-right: 6px;
  }
  a:last-child {
    margin-right: 0;
  }
}

.blue {
  margin-right: 10px;
}

.no {
  color: #ff635c;
}
</style>
