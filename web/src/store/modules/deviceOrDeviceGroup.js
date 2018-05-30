const deviceOrDeviceGroup = {
  state: {
    deviceList: [
      {
        label: "广告编号",
        status: true,
        prop: "id"
      },
      {
        label: "广告名称",
        status: true,
        prop: "name"
      },
      {
        label: "预览图",
        status: true,
        prop: "cover-url",
        img: true,
        class: "green"
      },
      {
        label: "展现量",
        status: true,
        prop: "epr",
        init: "0"
      },
      {
        label: "播放状态",
        status: true,
        prop: "status"
      },

      {
        label: "时长",
        status: true,
        prop: "duration"
      },
      // {
      //   label: "播放次数",
      //   status: true,
      //   prop: "pay-num",
      //   init: "不限"
      // },
      {
        label: "下载状态",
        status: true,
        prop: "download-status"
      }
    ],
    deviceGroupList: [
      {
        label: "广告编号",
        status: true,
        prop: "id"
      },
      {
        label: "广告名称",
        status: true,
        prop: "name"
      },
      {
        label: "预览图",
        status: true,
        prop: "cover-url",
        img: true,
        class: "green"
      },
      {
        label: "展现量",
        status: true,
        prop: "epr",
        init: "0"
      },
      {
        label: "播放状态",
        status: true,
        prop: "status"
      },

      {
        label: "时长",
        status: true,
        prop: "duration"
      },
      // {
      //   label: "播放次数",
      //   status: true,
      //   prop: "pay-num",
      //   init: "不限"
      // }
    ]
  },
  mutations: {},
  getters: {
    getDeviceListHeader: start => {
      return start.deviceList;
    },
    getDeviceGroupListHeader: start => {
      return start.deviceGroupList;
    }
  },
  actions: {}
};

export default deviceOrDeviceGroup;
