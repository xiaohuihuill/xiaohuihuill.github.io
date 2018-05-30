import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: "/login",
      name: "Login",
      component: resolve => require(["@/views/login/Login"], resolve)
    },
    {
      path: "/home",
      name: "Home",
      component: resolve => require(["@/views/home/Home"], resolve),
      children: [
        {
          path: "/device",
          name: "device",
          component: resolve => require(["@/views/device/Device"], resolve)
        },
        {
          path: "/advertising",
          name: "advertising",
          component: resolve =>
            require(["@/views/advManage/advertising/Advertising"], resolve)
        },
        {
          path: "/audit",
          name: "audit",
          component: resolve => require(["@/views/audit/Audit"], resolve)
        },
        {
          path: "/user",
          name: "user",
          component: resolve => require(["@/views/user/User"], resolve)
        }
      ]
    },
    {
      path: "/dev_detail",
      name: "DeviceDetail",
      component: resolve =>
        require(["@/views/device/deviceDetail/DeviceDetail"], resolve),
      children: []
    },
    {
      path: "/dev_detail/dev_detail_info",
      name: "DeviceDetailInfo",
      component: resolve =>
        require(["@/views/device/deviceDetail/DeviceDetailInfo"], resolve),
      children: []
    },
    {
      path: "/dev_detail/playList",
      name: "PlayList",
      component: resolve =>
        require(["@/views/device/deviceDetail/PlayList"], resolve),
      children: []
    },
    {
      path: "/dev_detail/edit_dev_info",
      name: "EditDeviceInfo",
      component: resolve =>
        require(["@/views/device/deviceDetail/EditDeviceInfo"], resolve),
      children: []
    },
    {
      path: "/dev_detail/remote_control",
      name: "RemoteControl",
      component: resolve =>
        require(["@/views/device/deviceDetail/RemoteControl"], resolve),
      children: []
    },
    {
      path: "/dev_group",
      name: "DeviceGroup",
      component: resolve =>
        require([
          "@/views/device/deviceGroupManage/DeviceGroupManage"
        ], resolve),
      children: []
    },
    {
      path: "/addAdv",
      name: "AddAdv",
      component: resolve =>
        require(["@/views/advManage/addAdv/AddAdv"], resolve),
      children: []
    },
    {
      path: "/editAdv",
      name: "EditAdv",
      component: resolve =>
        require(["@/views/advManage/editAdv/editAdv"], resolve),
      children: []
    },
    {
      path: "/advPlan",
      name: "AdvPlan",
      component: resolve =>
        require(["@/views/advManage/advPlan/Advplan"], resolve),
      children: []
    },
    {
      path: "/advListItem",
      name: "AdvListItem",
      component: resolve =>
        require(["@/views/advManage/advListItem/AdvListItem"], resolve)
    },
    {
      path: "/advDetails",
      name: "AdvDetails",
      component: resolve =>
        require(["@/views/advManage/advDetails/AdvDetails"], resolve)
    },
    {
      path: "/addAdvPlan",
      name: "AddAdvPlan",
      component: resolve =>
        require(["@/views/advManage/addAdvPlan/addAdvPlan"], resolve),
      children: []
    },
    {
      path: "/tmp_manage",
      name: "TemplateManage",
      component: resolve =>
        require(["@/views/user/templateManage/TemplateManage"], resolve),
      children: []
    },
    {
      path: "/add_dev",
      name: "AddDevice",
      component: resolve => require(["@/views/device/AddDevice"], resolve),
      children: []
    },
    {
      path: "/toAudit",
      name: "ToAudit",
      component: resolve => require(["@/views/audit/toAudit/toAudit"], resolve),
      children: []
    },
    {
      path: "/add_dev_group",
      name: "AddDeviceGroup",
      component: resolve =>
        require(["@/views/device/deviceGroupManage/AddDeviceGroup"], resolve),
      children: []
    },
    {
      path: "/examine_dev_group",
      name: "ExamineDeviceGroup",
      component: resolve =>
        require([
          "@/views/device/deviceGroupManage/ExamineDeviceGroup"
        ], resolve),
      children: []
    },
    {
      path: "/set_timing_switch",
      name: "SetTimingSwitch",
      component: resolve =>
        require(["@/views/device/setTimingSwitch/SetTimingSwitch"], resolve),
      children: []
    },
    {
      path: "/dev_group/add_dev",
      name: "DeviceGroupAddDevice",
      component: resolve =>
        require(["@/views/device/deviceGroupManage/AddDevice"], resolve),
      children: []
    },
    {
      path: "/dev_group/edit_dev_group",
      name: "DeviceGroupEditDeviceGroup",
      component: resolve =>
        require(["@/views/device/deviceGroupManage/EditDeviceGroup"], resolve),
      children: []
    },
    {
      path: "/error",
      name: "Error",
      component: resolve =>
        require(["@/views/error/error"], resolve),
      children: []
    }
  ]
});
