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
          <div v-if="item.type">
            <div :class="item.class"> {{scope.row[item.prop]}}</div>
          </div>
          <div v-else>
            <div>
              {{scope.row[item.prop]}}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="file-operation-other clearfix" v-if="scope.row.type!='A'">
            <a class="blue fl" @click="itemAction(scope.row,item)" v-for="(item,index) in action" :key="index" data-butflag="{{item.dataButFlag}}">{{item.name}}</a>
          </div>
          <div class="file-operation-other clearfix" v-else>
            <a class="fl" :class="item.callback?'blue':''" @click="itemAction(scope.row,item)" v-for="(item,index) in enAction" :key="index" data-butflag="{{item.dataButFlag}}">{{item.name}}</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="paging" style="text-align: center;margin-top:20px;">
      <el-pagination @size-change="sizeChange" @current-change="pageChange" :current-page="page" :page-size="pagesize" :page-sizes="pagesizes" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    action: [],//操作的内容；
    enAction: [],//无法操作时的内容；
    tableInfo: [],//表头信息
    tableData: [], //保存列表信息,
    formTheadOptions: [], // 可选择表头
    checkboxVal: [], // checkboxVal
    page: 1, //当前页
    pagesize: 10, //当前页的条数
    total: 99, //当前信息的总条数
    pagesizes: [10, 20, 30],//可选择当前页的条数
  },
  data() {
    return {
      multipleSelection: [], //接收选中的数据
      key: 1, // table key
    };
  },
  mounted() {
      this.$esellApi.checkPermissions();
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
      console.log(row);
      if (column.label === "推广计划名称") {
        this.$router.push({ path: "/adv_mag/pop_plan_mag", query: { id: row.id } });
      }
    },
    // 操作中的方法
    itemAction(data, item) {
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
  top: -50px;
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
