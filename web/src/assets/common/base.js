import { esell } from "@/assets/common/esellapi";

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

/**
 * example : 
 * import { region } from "@/assets/common/base"
 * this.a = new region();
 * @param array is regionArray
 * 可直接赋值
*/
export function region() {
  const esellApi = new esell();
  var array = [];
  
  esellApi.send(
    "/district/list.shtml",
    {},
    res => {
      array = res.payload;
      
    },
    res => {
      console.log("错误了");
    }
  );
}