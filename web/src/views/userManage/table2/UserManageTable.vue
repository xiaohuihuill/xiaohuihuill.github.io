<template>
  <div class="app-container">
    <!--动态表格数据-->
    <div>
      <el-table :data="tableData" border fit highlight-current-row style="width: 100%" @select-all='selectAll' @select="changeFun">
        <el-table-column type="selection" width="48" align="center">
        </el-table-column>
        <el-table-column :key='fruit' v-for='(fruit,index) in formThead' :label="fruit.ch" :width="fruit.ch=='用户账号(真实姓名)'?248:''">
          <template slot-scope="scope">
            <div v-if="fruit.ch=='用户账号(真实姓名)'">
              {{scope.row[fruit.en]}} (
              <span v-html="scope.row[fruit.cn]||'——'"></span> )
            </div>
            <div v-else-if="fruit.ch=='账户状态'">
              <div v-html='scope.row[fruit.en]=="Y"?"启用":(scope.row[fruit.en]=="N"?"暂停":scope.row[fruit.en])||"——"' :class="[scope.row[fruit.en]=='Y'?'yes':'']"></div>
            </div>
            <div v-else>
              <div v-html='scope.row[fruit.en]||"——"'></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <div class="file-operation-other clearfix">
              <a class="blue start fl" @click="start(scope.row)" v-if="scope.row.status=='N'" data-butflag="1522755636983">启用</a>
              <a class="blue pause fl" @click="pause(scope.row)" v-if="scope.row.status=='Y'" data-butflag="1522755800640">暂停</a>
              <a class="blue edit fl" @click="edit(scope.row)" data-butflag="1522755837406">编辑</a>
              <a class="blue delete fl" @click="changePassword(scope.row)" data-butflag="1522755880782">重置密码</a>
              <a class="blue delete fl" @click="deviceRightControl(scope.row)" data-butflag="1523945955516">设备组权限控制</a>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paging" v-if="ishide" style="text-align: center;margin-top:20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="pagesize" :page-sizes='[10,30,50]' layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
const defaultFormThead = [
  { ch: "用户账号(真实姓名)", en: "user-name", cn: "name" },
  // { ch: "账号权限", en: "" },
  // { ch: "父账号", en: "parent-user-name" },
  { ch: "账户状态", en: "status" },
  { ch: "角色", en: "role-name" },
  { ch: "创建时间", en: "create-time" }
];
export default {
  data() {
    return {
      multipleSelection: '',//向父组件传递选中的设备组权限控制值
      pageIndex: 1, //第几页页码
      pagesize: 10, //页码
      isShow: false,
      ishide: true,
      // 列表数据
      key: 1, // table key
      formTheadOptions: [
        "用户账号(真实姓名)",
        "账号权限",
        "父账号",
        "账户状态",
        "角色",
        "创建时间"
      ], // 可选择表头
      formThead: defaultFormThead // 默认表头
    };
  },
  mounted() {
    this.$esellApi.checkPermissions();
  },
  props: ["tableData", 'total'],
  watch: {
    formThead(valArr) {
      this.$esellApi.checkPermissions();
      this.formThead = this.formTheadOptions.filter(
        i => valArr.indexOf(i) >= 0
      );
      this.key = this.key + 1; // 为了保证table 每次都会重渲 （牺牲性能保证效果，当然也可以不用）
    }
  },
  created() {
    console.log(this.tableData)
  },
  methods: {
    changeFun(val) {
      this.multipleSelection = val;
      this.$emit("batchStartUsing", this.multipleSelection)
    },
    selectAll(val) {
      this.multipleSelection = val;
      this.$emit("batchStartUsing", this.multipleSelection)
    },
    // 启用
    start(row) {
      this.$emit("start", row)
    },
    // 暂停
    pause(row) {
      this.$emit("pause", row)
    },
    toggle() {
      this.isShow = !this.isShow;
    },
    edit(row) {
      console.log(row);
      this.$router.push({
        path: "/user_mag/edit_user_info",
        query: { id: row.id, name: row.name }
      });
    },
    changePassword(row) {
      this.$router.push({ path: "/user_mag/change_password", query: { "id": row.id } });
    },
    deviceRightControl(row) {
      this.$router.push({ path: "/user_mag/dev_right_control", query: { "accountIds": '['+row.id+']' } });
    },
    // 分页条数切换
    handleSizeChange(val) {
      this.pagesize = val
      this.$emit('pagesize', val); //value就是子要传父的数据
    },
    // 分页当前页切换
    handleCurrentChange(val) {
      this.pageIndex = val
      this.$emit('pageIndex', val); //value就是子要传父的数据
    }
  }
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
  top: -95px;
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
</style>
