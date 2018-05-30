<template>
  <div class="poparization-plan-manage">
    <div class="top clearfix">
      <span class="fl">您的位置&nbsp;:&nbsp;</span>
      <span class="crumbs fl">
        <router-link to="/home" class="blue">系统首页</router-link>
        <span>></span>
        <router-link to="/devgroup_mag" class="blue">设备组管理</router-link>
        <span>></span>
        <router-link to="/devgroup_mag/examine_play_list" class="blue">播放列表</router-link>
        <span>></span>
        <span>查看定时播放列表</span>
      </span>
    </div>
    <div class="bottom">
      <div class="clearfix">
        <NoShowDatepicker></NoShowDatepicker>
      </div>
      <div style="margin-top:45px;">
        <dragTable></dragTable>
      </div>
    </div>
  </div>
</template>
<script>
import NoShowDatepicker from '@/components/datepicker/NoShowDatepicker.vue'
import dragTable from './table2/dragTable.vue'
export default {
  name: "examine-play-list",
  components: {
    dragTable,
    NoShowDatepicker
  },
  data() {
    return {
      statementStatisticsData: {
        input1: "",
        date1: "",
        date2: "",
        value1: "",
        value2: "",
        value3: "",
        radio: "1",
      },
    };
  },
  created() {
    console.log("进入了播放列表的定时播放列表");
  },
  mounted() {
      this.$esellApi.checkPermissions();
  },
  methods: {
    // 点击的某一天函数由组件内传递出来的参数

    cleanCondition() {
      this.statementStatisticsData = {
        input1: "",
        date1: "",
        date2: "",
        value1: "",
        value2: "",
        value3: "",
        radio: "1",
      }
    },
    advertisingPosition(str, index) {
      this.isShow = index;
      this.bg = str;
      console.log(this.isShow);
    },
  },
  watch: {

  },
  destroyed() {
  },
  updated() {
  },
  computed: {
  }
};
</script>
<style lang="scss" scoped>
@import "../../sass/PopulariztionPlanManage.scss";
div.active {
  transition: all .6s;
  color: $white !important;
  background-color: $impColor !important;
}

div.isActive {
  color: $impColor !important;
  background-color: $white !important;
  border: 1px solid $sublineColor;
  border-top: none; // border-top: 2px solid $impColor;
  border-bottom: none; // line-height: 38px!important;
  box-sizing: border-box;
  position: relative;
}

div.isActive::before {
  content: "";
  height: 2px;
  width: 100%;
  background-color: $impColor;
  position: absolute;
  top: -1px;
  left: 0;
}

.row3 {
  .all-advertising {
    border-left-color: transparent!important;
  }
}

.material-hint {
  position: absolute;
  top: 10px;
  right: 0;
}

.row3 {
  background: $bgColor;
  box-sizing: border-box;
  border: 1px solid $sublineColor;
  border-bottom: none;
  .bg {
    text-align: center;
    width: 140px;
    height: 44px;
    cursor: pointer;
    line-height: 44px;
  }
  .pdf {
    border-right: 1px solid $sublineColor;
  }
}
</style>


