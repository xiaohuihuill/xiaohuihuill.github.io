import { debug } from "util";

import { Message } from "element-ui";

function esellapi() {
  var host;
  var appId;
  var appKey;
  var version;
  var ownedPermissions = "ownedPermissions";
  var globalHideClass = "esell_hide";
  var relogin_flag = false;

  var getToken = function() {
    var token = localStorage.getItem("token");
    if (token && token != "undefined") {
      return token;
    } else {
      return null;
    }
  };

  var getUuid = function() {
    var uuid = localStorage.getItem("uuid");
    // console.log(uuid);
    if (uuid && uuid != "undefined") {
      return uuid;
    } else {
      uuid = guid();
      localStorage.setItem("uuid", uuid);
      return uuid;
    }
  };
  var guid = function() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  this.setHost = function(host) {
    this.host = host;
  };

  this.setAppId = function(appId) {
    this.appId = appId;
  };

  this.setAppKey = function(appKey) {
    this.appKey = appKey;
  };

  this.setVersion = function(version) {
    this.version = version;
  };

  var queryString = function(keyMap) {
    var result = "";
    for (var element in keyMap) {
      result += element + "=" + keyMap[element] + "&";
    }
    return result.substring(0, result.length - 1);
  };

  var getUrl = function(url, keyMap) {
    var String = queryString(keyMap);
    var sign = md5(String);
    delete keyMap["appkey"];
    delete keyMap["payload"];
    return url + "?" + queryString(keyMap) + "&sign=" + sign;
  };
  this.login = function(
    url,
    userName,
    password,
    successCallback,
    errorCallback
  ) {
    var psd = md5(password);
    var keyMap = {
      appid: this.appId,
      appkey: this.appKey,
      payload: '{"user-name": "' + userName + '", "password": "' + psd + '"}',
      sequence: new Date().getTime(),
      timestamp: new Date().getTime(),
      uuid: getUuid(),
      version: this.version
    };

    send(
      this.host + url,
      keyMap,
      function(res) {
        localStorage.setItem("token", res.payload.token);
        successCallback(res);
      },
      errorCallback
    );
  };

  var send = function(url, keyMap, successCallback, errorCallback) {
    var payload = keyMap["payload"];
    $.ajax({
      type: "POST",
      url: getUrl(url, keyMap),
      data: {
        payload: payload
      },
      crossDomain: true,
      success: function(res) {
        if (res.code < 0) {
          if (res.code == -11004 && location.hash != "#/") {
            if (!relogin_flag) {
              relogin_flag = true;
              localStorage.removeItem("token");
              Message({
                message: "登录超时，请重新登陆",
                type: "warning"
              });
              setTimeout(function(e) {
                window.location.href = "/";
              }, 100);
            }
          } else {
            errorCallback(res);
          }
        } else {
          successCallback(res);
        }
      },
      error: function(res) {
        Message({
          message: "服务器错误，请联系易售客服",
          type: "error"
        });
      }
    });

    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", getUrl(url, keyMap), true);
    // xhr.setRequestHeader(
    //   "Content-type",
    //   "application/x-www-form-urlencoded; charset=utf-8"
    // );
    // xhr.onreadystatechange = function() {
    //   if (xhr.readyState == 4 && xhr.status == 200) {
    //     successCallback(xhr.responseText);
    //   } else {
    //     errorCallback(xhr.responseText);
    //   }
    // };
    // var data = {
    //   payload: JSON.parse(payload)
    // };
    // console.log("data\n",JSON.stringify(data));
    // // var data = "payload:" + payload + "";
    // xhr.send(data);
  };
  this.send = function(url, payload, successCallback, errorCallback) {
    //权限处理开始
    let ownedPermissions = this.getPermissions();
    //每15分钟刷新一次权限
    let cacheTime = /(:\/\/localhost|:\/\/127|:\/\/dev-)/.test(location.href)
      ? 0.05
      : 15;

    if (
      ownedPermissions == "undefined" ||
      !ownedPermissions ||
      new Date().getTime() - ownedPermissions.time > 1000 * 60 * cacheTime
    ) {
      var keyMap = {
        appid: this.appId,
        appkey: this.appKey,
        //payload: JSON.stringify(payload),
        sequence: new Date().getTime(),
        timestamp: new Date().getTime(),
        token: getToken(),
        uuid: getUuid(),
        version: this.version
      };
      let that = this;

      send(
        this.host + "/permission/owned.shtml",
        keyMap,
        function(res) {
          let data = res.payload;
          that.setPermssions(data);
        },
        function(e) {
          errorCallback(e);
        }
      );
    }
    //权限处理结束

    var keyMap = {
      appid: this.appId,
      appkey: this.appKey,
      payload: JSON.stringify(payload),
      sequence: new Date().getTime(),
      timestamp: new Date().getTime(),
      token: getToken(),
      uuid: getUuid(),
      version: this.version
    };
    send(this.host + url, keyMap, successCallback, errorCallback);
  };
  this.getEnv = function() {
    if (window.location.href.indexOf("localhost") >= 0) {
      return "dev-";
    }
    var pattern = /(dev-|tst-|uat-)/i;
    var matcher = window.location.href.match(pattern);
    if (matcher && matcher.length >= 2) {
      return matcher[1];
    }
    return "";
  };

  // this.getEnv = function() {
  //   if (window.location.href.indexOf("localhost") >= 0) {
  //     return "http://dev-api1.yixinfa.cn";
  //   }
  //   if (window.location.href.indexOf("dev") < 0 && window.location.href.indexOf("tst") < 0) {
  //     return "http://api1.yixinfa.cn";
  //   }
  //   return "http://dev-api1.yixinfa.cn";
  // };

  this.setPermssions = function(data) {
    localStorage.setItem(
      "ownedPermissions",
      JSON.stringify({
        time: new Date().getTime(),
        data: data
      })
    );
  };

  this.getPermissions = function() {
    return eval("(" + localStorage.getItem("ownedPermissions") + ")");
  };

  this.refreshPermissions = function() {
    localStorage.setItem("ownedPermissions", undefined);
  };

  this.hasPermission = function(butFlag) {
    return (
      butFlag && this.getPermissions().data.indexOf(butFlag.toString()) > -1
    );
  };

  this.actionPermissionsCheck = function() {
    var elements = $("[data-butflag]");
    for (var i = 0; i < elements.length; ++i) {
      // let butFlag = $(elements[i]).data('butflag');
      let butFlag = $(elements[i]).attr("data-butflag");

      if (this.hasPermission(butFlag)) {
        $(elements[i]).css({
          display: "inline-block"
        });
      } else if (
        $(elements[i]).data("butmessage") &&
        !$(elements[i]).data("figure")
      ) {
        let cloneElement = $(elements[i])
          .attr("data-figure", "true")
          .clone();

        //当前提示来源于页面，为了达到统一提示的效果，故不再从页面取提示信息，但页面仍然需要添加此属性及值，以保证功能正常
        // let message = $(elements[i]).data("butmessage");
        let message = "没有系统权限";

        $(cloneElement)
          .attr("href", "javascript:void(0);")
          .unbind("click")
          .removeAttr("data-butflag")
          .on("click", function(e) {
            Message({
              message: message,
              type: "error"
            });
          });
        $(elements[i]).before(cloneElement);
      } else {
        $(elements[i]).hide();
        // $(elements[i]).remove();
      }
    }
  };

  /**
   * 
   * @param {time(毫秒)} param 
   * 可进行其它扩展
   */
  this.checkPermissions = function(param) {
    // setting defaultValue
    if (typeof param == "undefined") {
      param = {
        type: "time",
        time: 256
      };
    } else if (typeof param == "number") {
      param = {
        type: "time",
        time: param
      };
    } else if (typeof param == "object") {
    } else {
      console.log("未知参数{checkPermissions()}");
      return;
    }

    let that = this;
    if (param.type == "time") {
      setTimeout(function() {
        that.actionPermissionsCheck();
      }, param.time);
    } else {
      that.actionPermissionsCheck();
    }
  };
}

function esell() {
  const esell = new esellapi();
  esell.setAppId("U2YSLwZFRQsr5yBH");
  esell.setAppKey("ngywG2T3eCXVYtsr");
  esell.setVersion("1.3");
  esell.setHost("http://" + esell.getEnv() + "api1.yixinfa.cn");
  return esell;
}

export { esell };
