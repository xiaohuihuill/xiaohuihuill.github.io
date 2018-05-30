import Vue from "vue";
import Router from "vue-router";
// resolve => require([('@/views/' + file + '.vue')], resolve);
// export{resolve}
// function routeLazyLoading(file) {
//   return resolve => require(["@/views/" + file + ".vue"], resolve);
// import Error from "@/views/errorPage/404.vue"; //404页面

// import Login from "@/views/login/Login.vue"; //home页面

// import Summarize from "@/views/login/summarize/Summarize.vue"; //login-概述页面
// import Case from "@/views/login/case/Case.vue"; //login-案例页面
// import Expenses from "@/views/login/expenses/Expenses.vue"; //login-费用页面

// import Home from "@/views/home/Home.vue"; //home页面
// import SystemHomePage from "@/views/systemHomePage/SystemHomePage.vue"; //系统首页路由页面

// import AdvertisingManage from "@/views/advertisingManage/AdvertisingManage.vue"; //广告管理路由页面
// import PopulariztionPlanManage from "@/views/advertisingManage/PopulariztionPlanManage.vue"; //广告管理-推广计划管理路由页面
// import LowerIncidence from "@/views/advertisingManage/LowerIncidence.vue"; //广告管理-推广计划管理路由页面
// import NewPopularizationPlan from "@/views/advertisingManage/NewPopularizationPlan.vue"; //广告管理-推广计划管理路由页面
// import EditPopularizationPlan from "@/views/advertisingManage/EditPopularizationPlan.vue"; //广告管理-推广计划管理路由页面
// import ExamineAdvertising from "@/views/advertisingManage/ExamineAdvertising.vue"; //广告管理-查看广告路由页面
// import NewAdvertising from "@/views/advertisingManage/NewAdvertising.vue"; //广告管理-新建广告路由页面
// import NewAdvertisingGroup from "@/views/advertisingManage/NewAdvertisingGroup.vue"; //广告管理-新建广告组路由页面

// import AdvertisingAudit from "@/views/advertisingAudit/AdvertisingAudit.vue"; //广告审核路由页面

// import DeviceGroupManage from "@/views/deviceGroupManage/DeviceGroupManage.vue"; //设备组管理路由页面
// import IssueAdvertising from "@/views/deviceGroupManage/IssueAdvertising.vue"; //设备组管理-发布广告路由页面
// import RemoteControl from "@/views/deviceGroupManage/RemoteControl.vue"; //设备组管理-远程控制路由页面
// import AddDevice from "@/views/deviceGroupManage/AddDevice.vue"; //设备组管理-添加设备路由页面
// import NewDeviceGroup from "@/views/deviceGroupManage/NewDeviceGroup.vue"; //设备组管理-新建设备组路由页面
// import ScreenShotManageDeviceGroup from "@/views/deviceGroupManage/ScreenShotManage.vue"; //设备组管理-管理截屏路由页面
// import ExaminePlayList from "@/views/deviceGroupManage/ExaminePlayList.vue"; //设备组管理-播放列表-查看播放列表路由页面
// import TimedPlaylist from "@/views/deviceGroupManage/TimedPlaylist.vue"; //设备组管理-播放列表-查看播放列表-定时播放列表路由页面
// import ScreenShotManageDevice from "@/views/deviceManage/ScreenShotManageDevice.vue"; //设备组管理-管理截屏路由页面
// import PlayList from "@/views/deviceGroupManage/PlayList.vue"; //设备组管理组-播放列表路由页面
// import SetTimingPlay from "@/views/deviceGroupManage/SetTimingPlay.vue"; //设备组管理-设置定时播放时间路由页面
// import EditSetTimingPlay from "@/views/deviceGroupManage/EditSetTimingPlay.vue"; //设备组管理-编辑定时播放时间路由页面
// import AddTimingSwitchTime from "@/views/deviceGroupManage/AddTimingSwitchTime.vue"; //设备组管理-新增定时开关机时间路由页面
// import SetTimingSwitchTime from "@/views/deviceGroupManage/SetTimingSwitchTime.vue"; //设备组管理-设置定时开关机时间路由页面
// import AddTimingScreenShots from "@/views/deviceGroupManage/AddTimingScreenShots.vue"; //设备组管理-新增定时开关机时间路由页面
// import SetTimingScreenShots from "@/views/deviceGroupManage/SetTimingScreenShots.vue"; //设备组管理-设置定时开关机时间路由页面
// import NewSetTimingPlay from "@/views/deviceGroupManage/NewSetTimingPlay.vue"; //设备组管理-新增设置定时播放路由页面

// import DeviceManage from "@/views/deviceManage/DeviceManage.vue"; //设备管理路由页面
// import ManualAddDevice from "@/views/deviceManage/ManualAddDevice.vue"; //设备管理-手动添加设备路由页面
// import DeviceManageExaminePlayList from "@/views/deviceManage/DeviceManageExaminePlayList.vue"; //设备管理-播放列表-查看播放列表路由页面
// import DeviceManageTimedPlaylist from "@/views/deviceManage/DeviceManageTimedPlaylist.vue"; //设备管理-播放列表-查看播放列表-定时播放列表路由页面
// import EditDevice from "@/views/deviceManage/EditDevice.vue"; //设备管理-编辑设备路由页面

// import MaterialManage from "@/views/materialManage/MaterialManage.vue"; //素材管理组路由页面
// import AddMaterial from "@/views/materialManage/AddMaterial.vue"; //素材管理-新增素材组路由页面

// import TemplateManage from "@/views/template/TemplateManage.vue"; //模板管理路由页面
// import AddTemplate from "@/views/template/AddTemplate.vue"; //模板管理-添加模板路由页面
// import AddCustomTemplate from "@/views/template/AddCustomTemplate.vue"; //模板管理-添加自定义模板路由页面

// import StatementStatistics from "@/views/statementStatistics/StatementStatistics.vue"; //报表统计路由页面
// import PromotionPlanViewTheTrend from "@/views/statementStatistics/PromotionPlanViewTheTrend.vue"; //报表统计-推广计划查看趋势路由页面
// import AdvertisingViewTheTrend from "@/views/statementStatistics/AdvertisingViewTheTrend.vue"; //报表统计-广告的查看趋势路由页面
// import AdvertisingGroupViewTheTrend from "@/views/statementStatistics/AdvertisingGroupViewTheTrend.vue"; //报表统计-广告组的查看趋势路由页面
// import AdvertisingImpressions from "@/views/statementStatistics/AdvertisingImpressions.vue"; //报表统计-广告展现量路由页面
// import SeeThePlaybackDetails from "@/views/statementStatistics/SeeThePlaybackDetails.vue"; //报表统计-广告展现量-查看播放详情路由页面

// import PosterManage from "@/views/posterManage/PosterManage.vue"; //海报管理路由页面
// import MakePoster from "@/views/posterManage/MakePoster.vue"; //海报管理-制作海报路由页面

// import UserManage from "@/views/userManage/UserManage.vue"; //用户管理路由页面
// import AddNewUser from "@/views/userManage/AddNewUser.vue"; //用户管理-新增新用户路由页面
// import RoleManage from "@/views/userManage/RoleManage.vue"; //用户管理-新增新用户路由页面
// import EditUserInfo from "@/views/userManage/EditUserInfo.vue"; //用户管理-编辑用户信息路由页面
// import ChangePassword from "@/views/userManage/ChangePassword.vue"; //用户管理-修改密码路由页面
// import AddNewRole from "@/views/userManage/AddNewRole.vue"; //用户管理-增加新角色路由页面
// import EditRole from "@/views/userManage/EditRole.vue"; //用户管理-编辑角色路由页面
// import DeviceRightControl from "@/views/userManage/DeviceRightControl.vue"; //用户管理-设备权限控制路由页面

// import OperationLog from "@/views/operationLog/OperationLog.vue"; //操作日志路由页面

// import PersonalCenter from "@/views/personalCenter/PersonalCenter.vue"; //个人中心路由页面

// import MarketApplication from "@/views/marketApplication/MarketApplication.vue"; //市场应用路由页面

// import Renew from "@/views/marketApplication/Renew.vue"; //市场应用-续费路由页面

Vue.use(Router);
// 路由加载
export default new Router({
  // mode: "history",// 可要可不要
 routes: [
    {
      // 错误路由路径都直接跳到404页面
      path: "*",
      name: "404",
      component: resolve => require(["@/views/errorPage/404"], resolve)
    },
    {
      path: "/",
      name: "login",
      redirect:"/login",
      component: resolve => require(["@/views/login/Login.vue"], resolve),
      children: [
        {
          path: "/",
          name: "summarize",
          component: resolve =>
            require(["@/views/login/summarize/Summarize"], resolve)
        },
        {
          path: "/case",
          name: "case",
          component: resolve => require(["@/views/login/case/Case"], resolve)
        },
        {
          path: "/expenses",
          name: "expenses",
          component: resolve =>
            require(["@/views/login/expenses/Expenses"], resolve)
        }
      ]
    },
    {
      path: "/home",
      name: "home",
      component: resolve => require(["@/views/home/Home"], resolve),
      // 子路由
      children: [
        {
          // 系统首页
          path: "/",
          name: "systemHomePage",
          component: resolve =>require(["@/views/systemHomePage/SystemHomePage"], resolve)
        },
        // 广告管理
        {
          path: "/adv_mag",
          name: "advertisingManage",
          component: resolve =>
            require(["@/views/advertisingManage/AdvertisingManage"], resolve)
        },
        {
          path: "/adv_mag/pop_plan_mag/",
          component: resolve =>
            require([
              "@/views/advertisingManage/PopulariztionPlanManage"
            ], resolve)
        },
        {
          path: "/adv_mag/pop_plan_mag/lower_incidence",
          component: resolve =>
            require(["@/views/advertisingManage/LowerIncidence"], resolve)
        },
        {
          path: "/adv_mag/new_pop_plan",
          component: resolve =>
            require([
              "@/views/advertisingManage/NewPopularizationPlan"
            ], resolve)
        },

        {
          path: "/adv_mag/edit_pop_plan",
          component: resolve =>
            require([
              "@/views/advertisingManage/EditPopularizationPlan"
            ], resolve)
        },
        {
          path: "/adv_mag/new_adv",
          component: resolve =>
            require(["@/views/advertisingManage/NewAdvertising"], resolve)
        },
        {
          path: "/adv_mag/edit_adv",
          component: resolve =>
            require(["@/views/advertisingManage/EditAdvertising"], resolve)
        },
        {
          path: "/adv_mag/examine_adv",
          component: resolve =>
            require(["@/views/advertisingManage/ExamineAdvertising"], resolve)
        },
        {
          path: "/adv_mag/new_advgrop",
          component: resolve =>
            require(["@/views/advertisingManage/NewAdvertisingGroup"], resolve)
        },
        // 广告审核
        {
          path: "/adv_audit",
          component: resolve =>
            require(["@/views/advertisingAudit/AdvertisingAudit"], resolve)
        },

        {
          path: "/devgroup_mag/issue_adv",
          component: resolve =>
            require(["@/views/deviceGroupManage/IssueAdvertising"], resolve)
        },
        {
          path: "/devgroup_mag/add_dev",
          component: resolve =>
            require(["@/views/deviceGroupManage/AddDevice"], resolve)
        },
        {
          path: "/devgroup_mag",
          component: resolve =>
            require(["@/views/deviceGroupManage/DeviceGroupManage"], resolve)
        },
        {
          path: "/devgroup_mag/remote_control",
          component: resolve =>
            require(["@/views/deviceGroupManage/RemoteControl"], resolve)
        },
        {
          path: "/devgroup_mag/new_devgroup",
          component: resolve =>
            require(["@/views/deviceGroupManage/NewDeviceGroup"], resolve)
        },
        {
          name: "EditGroup",
          path: "/devgroup_mag/Edit_devgroup",
          component: resolve =>
            require(["@/views/deviceGroupManage/EditDeviceGroup"], resolve)
        },
        {
          path: "/devgroup_mag/screen_shot_mag",
          component: resolve =>
            require(["@/views/deviceGroupManage/ScreenShotManage"], resolve)
        },
        {
          path: "/devgroup_mag/examine_play_list",
          component: resolve =>
            require(["@/views/deviceGroupManage/ExaminePlayList"], resolve)
        },
        {
          path: "/devgroup_mag/examine_dev",
          component: resolve =>
            require(["@/views/deviceGroupManage/ExamineDevice"], resolve)
        },
        {
          path: "/devgroup_mag/play_list/timed_play_list",
          component: resolve =>
            require(["@/views/deviceGroupManage/TimedPlaylist"], resolve)
        },
        {
          path: "/devgroup_mag/play_list/set_timing_play",
          component: resolve =>
            require(["@/views/deviceGroupManage/SetTimingPlay"], resolve)
        },
        {
          path: "/devgroup_mag/remote_control/add_timing_switch_time",
          component: resolve =>
            require(["@/views/deviceGroupManage/AddTimingSwitchTime"], resolve)
        },
        {
          path: "/devgroup_mag/remote_control/set_timing_switch_time",
          component: resolve =>
            require(["@/views/deviceGroupManage/SetTimingSwitchTime"], resolve)
        },
        {
          path: "/devgroup_mag/remote_control/add_timing_screen_shots",
          component: resolve =>
            require(["@/views/deviceGroupManage/AddTimingScreenShots"], resolve)
        },
        {
          path: "/devgroup_mag/remote_control/set_timing_screen_shots",
          component: resolve =>
            require(["@/views/deviceGroupManage/SetTimingScreenShots"], resolve)
        },
        {
          path: "/devgroup_mag/play_list/set_timing_play/new_set_timing_play",
          component: resolve =>
            require(["@/views/deviceGroupManage/NewSetTimingPlay"], resolve)
        },
        {
          path: "/devgroup_mag/play_list/set_timing_play/edit_set_timing_play",
          component: resolve =>
            require(["@/views/deviceGroupManage/EditSetTimingPlay"], resolve)
        },

        // 设备管理
        {
          path: "/dev_mag",
          component: resolve =>
            require(["@/views/deviceManage/DeviceManage"], resolve)
        },
        {
          name: "deviceToAdv",
          path: "/dev_mag/issue_adv",
          component: resolve =>
            require(["@/views/deviceManage/IssueAdvertising"], resolve)
        },
        {
          name: "deviceToManyScreenAdv",
          path: "/dev_mag/issue_many_screen_adv",
          component: resolve =>
            require(["@/views/deviceManage/IssueManyScreenAdvertising"], resolve)
        },
        {
          path: "/dev_mag/remote_control",
          component: resolve =>
            require(["@/views/deviceManage/RemoteControl"], resolve)
        },
        {
          path: "/dev_mag/remote_control/add_timing_switch_time",
          component: resolve =>
            require(["@/views/deviceManage/AddTimingSwitchTime"], resolve)
        },
        {
          path: "/dev_mag/remote_control/add_timing_screen_shots",
          component: resolve =>
            require(["@/views/deviceManage/AddTimingScreenShots"], resolve)
        },
        {
          path: "/dev_mag/remote_control/set_timing_switch_time",
          component: resolve =>
            require(["@/views/deviceManage/SetTimingSwitchTime"], resolve)
        },
        {
          path: "/dev_mag/remote_control/add_timing_screen_shots",
          component: resolve =>
            require(["@/views/deviceManage/SetTimingScreenShots"], resolve)
        },
        {
          path: "/dev_mag/scree_shot_mag_dev",
          component: resolve =>
            require(["@/views/deviceManage/ScreenShotManageDevice"], resolve)
        },
        {
          name: "addDevice",
          path: "/dev_mag/manual_add_dev",
          component: resolve =>
            require(["@/views/deviceManage/ManualAddDevice"], resolve)
        },
        {
          path: "/dev_mag/examine_playlist",
          component: resolve =>
            require([
              "@/views/deviceManage/DeviceManageExaminePlayList"
            ], resolve)
        },
        {
          path: "/dev_mag/timed_playlist",
          component: resolve =>
            require(["@/views/deviceManage/DeviceManageTimedPlaylist"], resolve)
        },
        {
          name: "editDevice",
          path: "/dev_mag/edit_dev",
          component: resolve =>
            require(["@/views/deviceManage/EditDevice"], resolve)
        },

        // 素材管理
        {
          path: "/material_mag",
          component: resolve =>
            require(["@/views/materialManage/MaterialManage"], resolve)
        },
        {
          path: "/material_mag/add_material",
          component: resolve =>
            require(["@/views/materialManage/AddMaterial"], resolve)
        },
        // 海报管理
        {
          path: "/poster_mag",
          component: resolve =>
            require(["@/views/posterManage/PosterManage"], resolve)
        },
        {
          path: "/poster_mag/make_poster",
          component: resolve =>
            require(["@/views/posterManage/MakePoster"], resolve)
        },
        // 模板管理
        {
          path: "/temp_mag",
          component: resolve =>
            require(["@/views/template/TemplateManage"], resolve)
        },
        {
          path: "/temp_mag/add_custom_temp",
          component: resolve =>
            require(["@/views/template/AddCustomTemplate"], resolve)
        },
        {
          path: "/temp_mag/add_temp",
          component: resolve =>
            require(["@/views/template/AddTemplate"], resolve)
        },
        // 用户管理
        {
          path: "/user_mag",
          component: resolve =>
            require(["@/views/userManage/UserManage"], resolve)
        },
        {
          path: "/user_mag/add_new_user",
          component: resolve =>
            require(["@/views/userManage/AddNewUser"], resolve)
        },
        {
          path: "/user_mag/role_mag",
          component: resolve =>
            require(["@/views/userManage/RoleManage"], resolve)
        },
        {
          path: "/user_mag/add_new_role",
          component: resolve =>
            require(["@/views/userManage/AddNewRole"], resolve)
        },
        {
          path: "/user_mag/edit_role",
          component: resolve =>
            require(["@/views/userManage/EditRole"], resolve)
        },
        {
          path: "/user_mag/edit_user_info",
          component: resolve =>
            require(["@/views/userManage/EditUserInfo"], resolve)
        },
        {
          path: "/user_mag/change_password",
          component: resolve =>
            require(["@/views/userManage/ChangePassword"], resolve)
        },
        {
          path: "/user_mag/dev_right_control",
          component: resolve =>
            require(["@/views/userManage/DeviceRightControl"], resolve)
        },
        // 报表统计
        {
          path: "/statement_statistics",
          component: resolve =>
            require([
              "@/views/statementStatistics/StatementStatistics"
            ], resolve)
        },
        {
          path: "/statement_statistics/promotion_plan_view_the_trend",
          component: resolve =>
            require([
              "@/views/statementStatistics/PromotionPlanViewTheTrend"
            ], resolve)
        },
        {
          path: "/statement_statistics/adv_view_the_trend",
          component: resolve =>
            require([
              "@/views/statementStatistics/AdvertisingViewTheTrend"
            ], resolve)
        },
        {
          path: "/statement_statistics/adv_group_view_the_trend",
          component: resolve =>
            require([
              "@/views/statementStatistics/AdvertisingGroupViewTheTrend"
            ], resolve)
        },
        {
          path: "/statement_statistics/adv_impressions",
          component: resolve =>
            require([
              "@/views/statementStatistics/AdvertisingImpressions"
            ], resolve)
        },
        {
          path:
            "/statement_statistics/adv_impressions/see_the_playback_details",
          component: resolve =>
            require([
              "@/views/statementStatistics/SeeThePlaybackDetails"
            ], resolve)
        },

        // 操作日志
        {
          path: "/operation_log",
          component: resolve =>
            require(["@/views/operationLog/OperationLog"], resolve)
        },
        // 市场应用
        {
          path: "/market_application",
          component: resolve =>
            require(["@/views/marketApplication/MarketApplication"], resolve)
        },
        {
          path: "/market_application/renew",
          component: resolve =>
            require(["@/views/marketApplication/Renew"], resolve)
        },
        // 个人中心
        {
          path: "/personal_center",
          component: resolve =>
            require(["@/views/personalCenter/PersonalCenter"], resolve)
        },
        // corporate management公司管理
        {
          path: "/corporate_manage",
          component: resolve =>
            require(["@/views/corporateManage/CorporateManage"], resolve)
        },
         {
          path: "/corporate_manage/add_new_user",
          component: resolve =>
            require(["@/views/corporateManage/AddNewUser"], resolve)
        },
         {
          path: "/corporate_manage/change_password",
          component: resolve =>
            require(["@/views/corporateManage/ChangePassword"], resolve)
        },
          {
          path: "/corporate_manage/edit_corporate_info",
          component: resolve =>
            require(["@/views/corporateManage/EditCorporateInfo"], resolve)
        }
      ]
    }
  ]
});
