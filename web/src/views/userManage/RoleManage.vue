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
        <span>角色管理</span>
      </span>
    </div>
    <div class="bottom">
      <div class="row1">
        <router-link to="/user_mag/edit_role?type=new">
          <a href="javascript:;" class="yxf-but advertising-operation-delete" data-butflag="1522747247328">增加新角色</a>
        </router-link>
      </div>
      <div>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column label="角色名称">
            <template slot-scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column :prop="tableData['create-time']" label="添加时间">
            <template slot-scope="scope">
              {{scope.row['create-time']}}
            </template>
          </el-table-column>
          <el-table-column :prop="tableData['update-time']" label="更新时间">
            <template slot-scope="scope">
              {{scope.row['update-time']}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <div class="file-operation-other clearfix">
                <a class="blue edit fl" @click="edit(scope.row)" style="margin-right:10px;" data-butflag="1522747241467">编辑</a>
                <a class="blue edit fl" @click="delete1(scope.row)" data-butflag="1522747249713">删除</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="paging" v-if="ishide" style="text-align: center;margin-top:20px;">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-size="pagesize" :page-sizes='[10,30,50]' layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "material-manage",
  data() {
    return {
      tableData: "",
      index: "",
      ishide: true,
      pageIndex: 1, //第几页页码
      total: '', //总条数
      pagesize: 10 //页码
    };
  },
  created() {
    // 发送请求拿到页面表格数值赋值给list
    this.getRoleInfo();
  },
  mounted() {
      this.$esellApi.checkPermissions();
  },
  methods: {
    getRoleInfo() {
      this.$esellApi.send(
        "/role/list.shtml",
        {
          page: this.pageIndex, //当前页数
          size: this.pagesize //一页多少条
        },
        res => {
          console.log(res);
          this.tableData = res.payload.data;
          this.total = res.payload.total;
        },
        res => {
          this.message("error", res.message)
        }
      );
    },
    // 分页条数切换
    handleSizeChange(val) {
      this.pagesize = val;
      // 切换后重新发送请求
      this.getRoleInfo();
    },
    // 分页当前页切换
    handleCurrentChange(val) {
      this.pageIndex = val;
      // 切换后重新发送请求
      this.getRoleInfo();
    },
    // 编辑角色
    edit(row) {
      // 需要再加一个p或者M
      this.$router.push({
        path: "/user_mag/edit_role",
        query: { id: row.id, name: row.name }
      });
    },
    delete1(row) {
      console.log(row)
      this.$esellApi.send("/role/delete.shtml", { id: row.id },
        res => {
          if (res.message == "OK") {
            this.message("success", "操作成功", () => { })
            this.getRoleInfo();
          }
        },
        res => {
          console.log("删除rescuowu", res);
          this.message("error", res.message, () => { })
          return;
        }
      );
    }
  },
  watch: {
    area: function(newVal, oldVal) {
      console.log(newVal);
    }
  }
};
</script>
<style lang="scss" scoped>
.material-manage {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .top {
    line-height: 56px;
    margin-left: 20px;
    .crumbs {
      font-size: 12px;
    }
  }
  .bottom {
    background-color: #fff;
    padding: 20px;
    .row1 {
      padding: 0 0 20px 0;
      .material-name {
        height: 30px;
        line-height: 30px;
        &-left {}
        &-right {
          margin-left: 20px;
        }
      }
      .material-search {
        margin-top: 20px;
        margin-left: 68px;
        a {
          margin-right: 6px;
        }
      }
    }
    .material-manage-file-select {
      margin: 20px 0;
      a {
        margin-right: 6px;
      }
    }
  }
}

.el-breadcrumb {
  font-size: 14px;
  line-height: 1;
}
</style>

