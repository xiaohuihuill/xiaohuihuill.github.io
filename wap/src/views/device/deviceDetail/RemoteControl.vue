<template>
  <div class="remote-control">
    <div class="voice">
      <div>声音：{{volume}}</div>
      <div class="voice-info">
        <mt-range v-model="volume">
          <div slot="start" class="voice-info-start">
            <i class="iF">&#xe646;</i>
          </div>
          <div slot="end" class="voice-info-end">
            <i class="iF">&#xe64a;</i>
          </div>
        </mt-range>
      </div>
    </div>
    <div class="brightness">
      <div>亮度：{{brightness}}</div>
      <div class="brightness-info">
        <mt-range v-model="brightness" :max="225">
          <div slot="start" class="brightness-info-start">
            <i class="iF">&#xe64c;</i>
          </div>
          <div slot="end" class="brightness-info-end">
            <i class="iF">&#xe64c;</i>
          </div>
        </mt-range>
      </div>
    </div>
    <div class="cacheTime">
      <div>缓存时间：{{cacheTime}} (天)</div>
      <div class="cacheTime-info">
        <div class="cacheTime-info-left kuang" @click="minusNum">-</div>
        <div class="cacheTime-info-content">{{cacheTime}}</div>
        <div class="cacheTime-info-right kuang" @click="addNum">+</div>
      </div>
    </div>
    <div class="other">
      <div class="other-set">其他设置</div>
      <div class="set-timing-switch" @click="setTimingSwitch">
        <div>设置定时开关机</div>
        <div>
          <i class="iF" style="color:#999999">&#xe61e;</i>
        </div>
      </div>
      <div class="restart" @click="restart">
        <div>是否重启</div>
        <div class="restart-right">
          <div style="padding-left:2.5rem">{{restartpickSelectedLable}}</div>
          <div>
            <i class="iF" style="color:#999999">&#xe61e;</i>
          </div>
        </div>
      </div>
      <div class="switch" @click="switch1">
        <div>是否关机</div>
        <div class="switch-right">
          <div style="padding-left:2.5rem">{{switchpickSelectedLable}}</div>
          <div>
            <i class="iF" style="color:#999999">&#xe61e;</i>
          </div>
        </div>
      </div>
      <div class="clearCache" @click="clearCache">
        <div>清理缓存</div>
        <div class="clearCache-right">
          <div style="padding-left:2.5rem">{{clearCachepickSelectedLable}}</div>
          <div>
            <i class="iF" style="color:#999999">&#xe61e;</i>
          </div>
        </div>
      </div>
    </div>
    <bottom-operation :message="message" @click="completeSettings"></bottom-operation>
    <SelectPick :checked="pickChecked" :list="pickList" :isShow="pickShow" @confirm="setGroup" @cancle="cancle"></SelectPick>
  </div>
</template>

<script>
import SelectPick from '@/components/select/SelectPick';
import Cell from "@/components/cell/Cell"
import { Toast } from 'mint-ui';
import BottomOperation from "@/components/bottomOperation/BottomOperation"
export default {
  name: "RemoteControl",
  components: {
    SelectPick,
    BottomOperation,
    Cell,
    Toast
  },
  data() {
    return {
      pickChecked: "",//默认传进去的值
      restartpickChecked: "",//重启默认值
      switchpickChecked: "",//开关机默认值
      clearCachepickChecked: "",//缓存默认值
      restartpickSelectedLable: "",//重启展示值
      switchpickSelectedLable: "",//开关机展示值
      clearCachepickSelectedLable: "",//缓存展示值
      restartpickSelectedValue: "",//重启传给后台的值
      switchpickSelectedValue: "",//开关机传给后台的值
      clearCachepickSelectedValue: "",//缓存传给后台的值
      operation: "",//传给后台的值立即开机还是立即关机re/sd(重启/关机)
      pickShow: false,//picker是否打开
      pickList: [],
      pickType: '',
      restartpickList: [{//重启默认list
        flex: 1,
        values: [
          { label: "是", value: 1 },
          { label: "否", value: 2 }
        ],
        className: 'slot1',
        textAlign: 'center',
        defaultIndex: 0,
      }],

      switchpickList: [{//开关机默认list
        flex: 1,
        values: [
          { label: "是", value: "1" },
          { label: "否", value: "2" }
        ],
        className: 'slot1',
        textAlign: 'center',
        defaultIndex: 0,
      }],

      clearCachepickList: [{//缓存默认list
        flex: 1,
        values: [
          { label: "是", value: "true" },
          { label: "否", value: "false" }
        ],
        className: 'slot1',
        textAlign: 'center',
        defaultIndex: 0,
      }],

      duration: 0,
      show: false,
      info: "",
      volume: null,
      brightness: null,
      cacheTime: 0,
      checkedGroup: "",
      slotInt: "",
      slots: "",
      showGroup: '',
      message: "完成设置",
      actionType: "",//下一个页面要用如果没有默认请求每天的可以传递一个everyday
    };
  },
  created() {
    this.getTimingSwitch();
  },
  methods: {
    //进入页面获取他是否有属性，有就回显，
    getTimingSwitch() {
      this.$esellApi.send("/api/device/attrbute/get.shtml", {
        id: this.$route.query.id,
      }).then(res => {
        // this.total = res.payload.total;
        console.log(121212121, res);
        if (res.payload == undefined) {
          this.actionType = "everyday";
          return;
        } else {
          this.volume = res.payload.volume;
          this.cacheTime = res.payload['cache-time'];
          this.actionType = res.payload['action-type']?res.payload['action-type']:"everyday";
          this.brightness = res.payload.brightness;
        }
      }).catch(res => {
        Toast({ message: res.message, position: 'middel', duration: 2000 });
      })
    },

    completeSettings() {
      if (this.restartpickSelectedValue == "1") {
        this.operation = 're'
      }
      if (this.switchpickSelectedValue == "1") {
        this.operation = 'sd'
      }
      this.$esellApi.send('/api/device/attrbute/save.shtml', {
        id: this.$route.query.id,
        volume: this.volume ? this.volume : 0,
        brightness: this.brightness ? this.brightness : 0,
        "cache-time": this.cacheTime ? this.cacheTime : 0,
        "clear-cache": this.clearCachepickSelectedValue ? this.clearCachepickSelectedValue : "",
        operation: this.operation,
      }).then(res => {
        Toast({ message: "设置成功", position: 'middel', duration: 3000 });
      }).catch(res => {
        Toast({ message: res.message, position: 'middel', duration: 3000 });
      })
    },
    restart() {
      this.pickShow = true;
      this.pickList = this.restartpickList;
      this.pickChecked = this.restartpickChecked
      this.pickType = "restart"
    },
    switch1() {
      this.pickType = "switch1"
      this.pickShow = true;
      this.pickList = this.switchpickList;
      this.pickChecked = this.switchpickChecked
    },
    clearCache() {
      this.pickType = "clearCache"
      this.pickShow = true;
      this.pickList = this.clearCachepickList;
      this.pickChecked = this.clearCachepickChecked
    },
    // picker的取消
    cancle() {
      this.pickShow = false;
    },
    // picker的确定
    setGroup(data) {
      console.log('点击了确认data', data);
      this.pickShow = false;
      if (this.pickType == "restart") {
        this.restartpickSelectedLable = data[0].label;
        this.restartpickSelectedValue = data[0].value;
        if (this.switchpickSelectedLable == "是" && this.restartpickSelectedLable == "是") {
          Toast({ message: "立即重启或立即关机只能选择一个", position: 'middel', duration: 2000 });
          this.switchpickSelectedValue = "";
          this.switchpickSelectedLable = "";
        }
      } else if (this.pickType == "switch1") {
        this.switchpickSelectedLable = data[0].label;
        this.switchpickSelectedValue = data[0].value;
        if (this.switchpickSelectedLable == "是" && this.restartpickSelectedLable == "是") {
          Toast({ message: "立即重启或立即关机只能选择一个", position: 'middel', duration: 2000 });
          this.restartpickSelectedValue = "";
          this.restartpickSelectedLable = "";
        }
      } else if (this.pickType == "clearCache") {
        this.clearCachepickSelectedLable = data[0].label;
        this.clearCachepickSelectedValue = data[0].value;
      }
    },
    minusNum() {
      this.cacheTime--;
      if (this.cacheTime == -1) {
        this.cacheTime = 0;
      }
    },
    addNum() {
      this.cacheTime++;
      if (this.cacheTime > 7) {
        this.cacheTime = 7;
      }
    },
    setTimingSwitch() {
      this.$router.push({ path: "/set_timing_switch", query: { id: this.$route.query.id, type: this.$route.query.type, actiontype: this.actionType } })
    },
  }
}

</script>
<style lang='scss' scoped>
@import "./../../../sass/remoteControl.scss";
</style>