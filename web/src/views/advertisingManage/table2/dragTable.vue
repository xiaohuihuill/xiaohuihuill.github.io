<template>
  <!--拖拽表格-->
  <div class="app-container calendar-list-container">
    <el-table :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column width="180px" align="center" label="编号">
        <template slot-scope="scope">
          <span>{{scope.row.timestamp}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="300px" label="广告名称">
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
      <el-table-column align="center" label="拖拽" width="95">
        <template slot-scope="scope">
          <i class="iF iF-issue drag-handler"></i>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import Sortable from 'sortablejs'
export default {
  name: 'dragTable',
  data() {
    return {
      list: null,
      total: null,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10
      },
      sortable: null,
      olderList: [],
      newList: []
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
    setSort() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
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
</style>

