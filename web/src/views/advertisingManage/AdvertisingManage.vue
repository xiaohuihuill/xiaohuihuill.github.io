<template>
  <div class="device-group-manager">
    <div class="top clearfix">
      <span class="fl">您的位置&nbsp;:&nbsp;</span>
      <span class="crumbs fl">
        <router-link to="/home" class="blue">系统首页</router-link>
        <span>></span>
        <span>广告管理</span>
      </span>
    </div>
    <div class="bottom">
      <div class="importance-hint">
        <div class="hint yxf-color">重要提示&nbsp;:</div>
        <div class="hint-one">
          <span>1、推广计划是为了方便对广告进行分类的设置，对推广计划进行相应的操作后其下所有的广告将会随之更改</span>
        </div>
        <div class="hint-two">
          <span>2、《默认推广计划》不可编辑、删除</span>
        </div>
        <div class="hint-line"></div>
      </div>
      <!--add-device-->
      <div class="device-group-manager-options">
        <a href="javascript:;" class="yxf-but" @click="newPopularizationPlan" data-butflag="1522746719454">新建推广计划</a>
        <a href="javascript:;" class="yxf-but" @click="batchStartUsingXia" data-butflag="1522748399328">批量启用</a>
        <a href="javascript:;" class="yxf-but" @click="batchPause" data-butflag="1522748425295">批量暂停</a>
      </div>
      <!--all-device-->
      <div class="home-fenyeCon">
        <Table v-on:batchStartUsing="batchStartUsing" @open="open" @pause="pause" @edit="edit" @remove="remove" :action="action" :enAction="enAction" :tableInfo="tableInfo" :tableData="tableData" :page="page" :pagesize="pagesize" :total="total" :formTheadOptions="formTheadOptions" :showcontrol="true" :checkboxVal="checkboxVal" @sizeChange="sizeChange" @pageChange="pageChange"></Table>
      </div>
    </div>
  </div>
</template>
<script>
import Table from "../../components/table/fluidTable";
export default {
  name: "device-manager",
  components: {
    Table
  },
  data() {
    return {
      ishide: true,
      val: [],
      action: [
        { name: "启用", dataButFlag: "1522748787753", callback: "open" },
        { name: "暂停", dataButFlag: "1522748802080", callback: "pause" },
        { name: "编辑", dataButFlag: "1522748858271", callback: "edit" },
        { name: "删除", dataButFlag: "1522748890167", callback: "remove" }
      ],
      enAction: [
        { name: "启用", dataButFlag: "1522748787753", callback: "open" },
        { name: "暂停", dataButFlag: "1522748802080", callback: "pause" },
        { name: "编辑", dataButFlag: "1522748890167", callback: "" },
        { name: "　删除", dataButFlag: "1522748890167", callback: "" }
      ],
      tableInfo: [
        {
          label: "推广计划名称",
          status: true,
          prop: "name",
          style: true,
          class: "blue"
        },
        {
          label: "广告数",
          status: true,
          prop: "ad-count",
          init:'0'
        },
        {
          label: "展现量",
          status: true,
          prop: "epr",
          init:'0'
        },
        {
          label: "状态",
          status: true,
          prop: "status"
        }
      ],
      tableData: [], //保存列表信息,
      formTheadOptions: ["推广计划名称", "广告数", "展现量", "状态"], // 可选择表头
      checkboxVal: ["推广计划名称", "广告数", "展现量", "状态"], // checkboxVal
      page: 1, //当前页
      pagesize: 10, //当前页的条数
      total: 99 //当前信息的总条数
    };
  },
  methods: {
    batchStartUsing(val) {
      this.val = val;
    },
    // 启用
    open(data) {
      if (data) {
        if (data["status"] == "启用") {
          this.message("error", "请勿重复操作", () => { });
          return;
        } else {
          // 否则发送请求，重新渲染表格
          this.$esellApi.send(
            "/campaign/status/enable.shtml",
            {
              id: data.id
            },
            res => {
              data.status = "启用";
              this.message("success", "操作成功", () => { });
            },
            res => {
                this.message("error", res.message)
            }
          );
        }
      }
    },
    // 暂停
    pause(data) {
      console.log(111);
      if (data) {
        if (data["status"] == "暂停") {
          this.message("error", "请勿重复操作", () => { });
          return;
        } else {
          // 否则发送请求，重新渲染表格
          this.$esellApi.send(
            "/campaign/status/disable.shtml",
            {
              id: data.id
            },
            res => {
              data.status = "暂停";
              this.message("success", "操作成功", () => { });
            },
            res => {
                this.message("error", res.message)
            }
          );
        }
      }
    },
    // 编辑
    edit(data) {
      this.$router.push({
        path: "/adv_mag/edit_pop_plan",
        query: { name: data.name, id: data.id, page: this.page }
      });
    },
    // 删除
    remove(data) {
      console.log(data);
      var that = this;
      // 提示可直接使用
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        // 成功操作
        this.$esellApi.send(
          "/campaign/delete.shtml",
          {
            id: data.id
          },
          res => {
            this.getInfor();
            this.$message({
              type: "success",
              message: "删除成功!"
            });

          },
          res => {
                this.message("error", res.message)
          }
        );
      }).catch(() => {
        // 失败操作
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    pageChange(val) {
      this.page = val;
      this.getInfor();
    },
    sizeChange(val) {
      console.log(val)
      this.pagesize = val;
      this.getInfor();
    },
    getInfor() {
      this.$esellApi.send(
        "/campaign/list.shtml",
        {
          page: this.page,
          size: this.pagesize
        },
        res => {
            this.total = res.payload.total;
            var data = res.payload.data;
            for (var i = 0; i < data.length; i++) {
              if (data[i].status == "Y") {
                data[i].status = "启用";
              } else {
                data[i].status = "暂停";
              }
            }
            this.tableData = data;
            this.$esellApi.checkPermissions(1);
        },
        res => {
            this.$message({
            type: "error",
            message: res.message
          });
        }
      );
    },
    // 批量暂停
    batchPause() {
      console.log(this.val);
      let pauseArr = [];
      if (this.val.length > 0) {
        for (let i = 0; i < this.val.length; i++) {
          pauseArr.push(this.val[i].id);
        }
        this.$esellApi.send(
          "/campaign/status/batch/disable.shtml",
          {
            ids: pauseArr
          },
          res => {
            if (res.code >= 0) {
              for (let i = 0; i < this.val.length; i++) {
                this.val[i].status = "暂停";
              }
              this.message("success", '操作成功');
            }
          },
          res => {
                this.message("error", res.message)
          }
        );
      } else {
        this.message("error", "请先选择需要暂停的计划", () => { });
        return false;
      }
    },
    // 批量开启
    batchStartUsingXia() {
      console.log(this.val);
      let openArr = [];
      if (this.val.length > 0) {
        for (let i = 0; i < this.val.length; i++) {
          openArr.push(this.val[i].id);
        }
        this.$esellApi.send(
          "/campaign/status/batch/enable.shtml",
          {
            ids: openArr
          },
          res => {
            if (res.code >= 0) {
              for (let i = 0; i < this.val.length; i++) {
                this.val[i].status = "启用";
              }
              this.message("success", '操作成功');
            }
          },
          res => {
                this.message("error", res.message)
          }
        );
      } else {
        this.message("error", "请先选择需要开启的计划", () => { });
        return false;
      }
    },
    examineAdvertising() {
      this.$router.push({ path: "/adv_mag/examine_adv" });
    },
    newPopularizationPlan() {
      this.$router.push({ path: "/adv_mag/new_pop_plan" });
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
    handleRowHandle(row, event, column) {
      console.log(row);
      // console.log(event);
      console.log(column);
    }
  },
  created() {
    let a;
    this.page = this.$route.query.page != a ? this.$route.query.page : 1;
    this.getInfor();
    this.$esellApi.checkPermissions();
  },
  watch: {
    area: function(newVal, oldVal) {
      console.log(newVal);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../sass/advertisingManage.scss";
</style>

