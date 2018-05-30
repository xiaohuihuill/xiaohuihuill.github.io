// import { esell } from "@/assets/common/esellapi";

// 查找指定字符中某一个字符串的下标位置
export function searchSubStr(str, subStr) {
  let positions = new Array();
  let pos = str.indexOf(subStr);
  while (pos > -1) {
    positions.push(pos);
    pos = str.indexOf(subStr, pos + 1);
  }
  return positions;
}

export function getQueryParam(key){

  let params = window.location.search;

  if(!params || params==''){
    params = window.location.href;
    let indexOf = params.indexOf('?');
    if(indexOf == -1)
      return;
      
    params = params.substring(indexOf);
  }

  let arr = params.replace('?','').split('&');
  

  for(var i in arr){
    let param = arr[i].split('=');
    if(param[0] === key)
      return param[1];
  }

}

export function isWeChat( ){
    var ua = window.navigator.userAgent.toLowerCase(); 

    return (ua.match(/MicroMessenger/i) == 'micromessenger');
    
}

// 节流函数
export function throttle(func, wait, mustRun) {
  console.log('被调用')
  // immediate默认为false
  var timeout, args, context, timestamp, result;
  let immediate = false
  var later = function () {
    // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
    var last = new Date().getTime() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function () {
    context = this;
    args = arguments;
    timestamp = new Date().getTime();
    // 第一次调用该方法时，且immediate为true，则调用func函数
    let immediate=true;
    var callNow = immediate && !timeout;
    // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) { 
      result = func.apply(context, args);
      context = args = null;
    }
    return result;
  };
};
export const messageMixin = {
  data() {
    return {
      position:'top',
      content:'',
      showPopup:false,
      modal:true,
      duration:'3000',
      type:'error',
    }
  },
}
