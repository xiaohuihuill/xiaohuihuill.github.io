import { Toast } from "mint-ui";
import { getQueryParam, isWeChat } from "@/common/base"

function esellapi() {
  var host;
  var appId;
  var appKey;
  var version;

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

  this.getAuthPage = function(){

    return '/wx/user/auth.wx';
  }

  this.getHost = function() {
      return this.host;
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

  this.login = function(url, userName, password, bind) {
    var psd = md5(password);
    let token = localStorage.getItem("token");
    var keyMap = {
      appid: this.appId,
      appkey: this.appKey,
      payload:
        '{"user-name": "' +
        userName +
        '", "password": "' +
        psd +
        '","bind":"' +
        bind +
        '","token":"' +
        token +
        '"}',
      sequence: new Date().getTime(),
      timestamp: new Date().getTime(),
      uuid: getUuid(),
      version: this.version
    };
    return send(this.host + url, keyMap);
  };

  var logout = function(authPage){
                
    localStorage.removeItem("token");
    localStorage.removeItem("UserFirstName");
    localStorage.removeItem("UserName");

    if(isWeChat()) {
      let enHost = encodeURIComponent(window.location.href);
      localStorage.setItem('lastAccessPage', enHost);
      window.location.href = authPage;
    }else {
      window.location.href = "/login";
    }

  };

  var send = function(url, keyMap) {
    
    const esell = new esellapi();
    esell.setAppId("U2YSLwZFRQsr5yBH");
    esell.setAppKey("ngywG2T3eCXVYtsr");
    esell.setVersion("1.3" + +new Date());
    esell.setHost("http://" + esell.getEnv() + "api1.yixinfa.cn");

    return new Promise((resolve, reject) => {
      var payload = keyMap["payload"];
      $.ajax({
        type: "POST",
        url: getUrl(url, keyMap),
        data: {
          payload: payload
        },
        crossDomain: true,
        success: function(res) {
          if (res.code >= 0) {
            resolve(res);
          } else {
            if (res.code == "-11004") {
              if (res.message == "要求先登录") {
                  logout(esell.getHost() + esell.getAuthPage());
              }
            } else if(res.code == '-10007' || res.code == '-10008'){
              logout(esell.getHost() + esell.getAuthPage());
            } else {
              reject(res);
            }
          }
        }
      });
    });
  };
  this.send = function(url, payload) {
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
    return send(this.host + url, keyMap);
  };
  this.getEnv = function() {
    if (
      window.location.href.indexOf("localhost") >= 0 ||
      window.location.href.indexOf("172.") >= 0 ||
      window.location.href.indexOf("192.168.") >= 0
    ) {
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
}

function esell() {
  const esell = new esellapi();
  esell.setAppId("U2YSLwZFRQsr5yBH");
  esell.setAppKey("ngywG2T3eCXVYtsr");
  esell.setVersion("1.3" + +new Date());
  esell.setHost("http://" + esell.getEnv() + "api1.yixinfa.cn");
  return esell;
}

export { esell };
