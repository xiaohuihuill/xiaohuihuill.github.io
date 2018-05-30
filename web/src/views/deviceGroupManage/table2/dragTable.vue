<template>
  <!--拖拽表格-->
  <div class="app-container calendar-list-container">
    <el-table :data="list" border fit highlight-current-row>
      <el-table-column type="selection" width="48">
      </el-table-column>
      <el-table-column align="center" label="排序" width="95">
        <template slot-scope="scope">
          <i class="iF drag-handler">&#xe6af;</i>
        </template>
      </el-table-column>
      <el-table-column width="180px" label="编号">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="100px" label="广告名称">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="预览图">
        <template slot-scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="展现量">
        <template slot-scope="scope">
          <span>{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="时长">
        <template slot-scope="scope">
          <span>{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="播放次数">
        <template slot-scope="scope">
          <span>{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="播放情况">
        <template slot-scope="scope">
          <span>{{scope.row.number}}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作" width="400">
        <template slot-scope="scope">
          <div class="operation">
            <a class="blue fl" @click="pause(scope.row)">暂停</a>
            <a class="blue fl" @click="copy(scope.row)">复制</a>
            <a class="blue fl" @click="setTimingPlay(scope.row)">设置定时播放</a>
            <a class="blue fl" @click="setTimesToPlay = true">设置播放次数</a>
            <a class="blue fl" @click="moveTo=true">移动到</a>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!--设置播放次数-->
    <el-dialog title="设置播放次数" :visible.sync="setTimesToPlay" size="tiny">
      <div>
        <span>
          <span>播放次数</span>
          <span style="margin-left:10px;">
            <el-radio class="radio" v-model="radio" label="1">不限</el-radio>
          </span>
        </span>
        <span>
          <span style="margin-left:10px;">
            <el-radio class="radio" v-model="radio" label="2">播放</el-radio>
          </span>
          <span>
            &nbsp;
            <el-input style="width:100px;" v-model="input" placeholder="请输入次数"></el-input>&nbsp;次
          </span>
        </span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setTimesToPlay = false">取 消</el-button>
        <el-button type="primary" @click="setTimesToPlay = false">保 存</el-button>
      </span>
    </el-dialog>

    <!--移动到-->
    <el-dialog title="移动到" :visible.sync="moveTo" size="tiny">
      <div class="clearfix">
        <div class="fl" style="margin-top:6px;">
          <span>移动到</span>
        </div>
        <div class="fl" style="margin-left:10px;">
          <div class="row1" style="margin-bottom:20px;">
            <span>
              <el-radio class="radio" v-model="radio" label="1">移动到第</el-radio>
            </span>
            <span>
              <el-input style="width:100px;" v-model="input" placeholder=""></el-input>&nbsp;页
            </span>
          </div>
          <div class="row2" style="margin-bottom:20px;">
            <span>
              <el-radio class="radio" v-model="radio" label="1">移动到第</el-radio>
            </span>
            <span>
              <el-input style="width:100px;" v-model="input" placeholder=""></el-input>&nbsp;条广告后
            </span>
          </div>
          <div class="row3" style="margin-bottom:15px;">
            <span>
              <el-radio class="radio" v-model="radio" label="1">移动到第一位</el-radio>
            </span>
          </div>
          <div class="row4" style="margin-bottom:15px;">
            <span>
              <el-radio class="radio" v-model="radio" label="1">移动到最后一位</el-radio>
            </span>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer" style="padding-top:0">
        <el-button @click="moveTo = false">取 消</el-button>
        <el-button type="primary" @click="moveTo = false">完 成</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Sortable from 'sortablejs'
export default {
  name: 'dragTable',
  data() {
    return {
      setTimesToPlay: false,//设置播放次数
      moveTo: false,//移动到
      input: '',
      radio: "1",
      list: null,
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      sortable: null,
    }
  },
  created() {
    this.list = [{
      timestamp: "001",
      title: "广告1",
      author: "<img>",
      number: "1213",
    }, {
      timestamp: "002",
      title: "广告2",
      author: "<img>",
      number: "1213",
    }, {
      timestamp: "003",
      title: "广告3",
      author: "<img>",
      number: "1213",
    }];
  },
  mounted() {
    this.setSort();
    this.$esellApi.checkPermissions();
  },
  methods: {
    // 暂定
    pause(row) {
    },
    // 复制
    copy(row) {
    },
    // 设置定时播放
    setTimingPlay(row) {
      this.$router.push({ path: "/devgroup_mag/play_list/set_timing_play" })
    },
    // 设置播放次数
    setTimesToPlay(row) {
    },
    // 移动到
    moveTo(row) {
    },
    setSort() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0];
      this.sortable = Sortable.create(el, {
      })
    }
  }
}
</script>
<style scoped>
.drag-handler {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.show-d {
  margin-top: 15px;
}

.operation a {
  margin-right: 8px;
}
</style>

