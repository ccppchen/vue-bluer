/**
 *   对Date的扩展，将 Date 转化为指定格式的String
 *   月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *   年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *   例子：
 *   (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *   (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 *   utils.fmtDate(new Date(time),'yyyy-MM-dd hh:mm');
 */

const fmtDate = (date, fmt) => {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}

/**
 * 浏览器的sessionStorage
 * @type {[Function]}
 */
const localStorage = window.sessionStorage
const JSON = window.JSON
const dbGet = (name) => {
  let value = localStorage.getItem(name)
  if (/^\{.*\}$/.test(value)) value = JSON.parse(value)
  return value
}

const dbSet = (name, value) => {
  if (typeof value === typeof {}) value = JSON.stringify(value)
  return localStorage.setItem(name, value)
}

const dbRemove = (name) => {
  return localStorage.removeItem(name)
}

/**
 * 浏览器的cookie操作
 * @param  {[key]}    [传key]
 * @return {[value]}  [获取key的值]
 */
const getCookie = (key) => {
  let arr = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
  let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
  if ((arr = document.cookie.match(reg))) {
    return decodeURIComponent(arr[2]);
  } else {
    return null;
  }
}
const setCookie = (key, value, days) => {
  // 设置cookie过期事件,默认是30天
  var expire = new Date();
  days = days || 30;
  expire.setTime(expire.getTime() + (+days) * 24 * 60 * 60 * 1000);
  document.cookie = key + "=" + encodeURIComponent(value) + ";expires=" + expire.toGMTString();
};
const deleteCookie = (key) => {
  var expire = new Date();
  expire.setTime(expire.getTime() - 1);
  var cval = getCookie(key);
  if (cval != null) {
    // 把toGMTString改成了toUTCString，两者等价。但是ECMAScript推荐使用toUTCString方法。toGMTString的存在仅仅是
    // 为了向下兼容
    document.cookie = key + "=" + cval + ";expires=" + expire.toUTCString();
  }
}
/**
 * 判断微信
 * @return {[Bool]} [ true false ]
 */
const isWeixin = () => {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) === "micromessenger") {
    return true;
  } else {
    return false;
  }
}

/**
 * 数字千分位格式化
 * @param  {[type]} s [传入的数字]
 * @param  {[type]} n [保留几位小数点]
 * @return {[type]}   [返回千分位格式]
 */
const fmoney = (s, n) => {
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  let l = s.split(".")[0].split("").reverse();
  let r = s.split(".")[1];
  let t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}

/**
 * 判断元素是否在可视区域
 * @chenpeng
 * @DateTime 2017-02-19
 * @param    {[obj]}      el     [dom节点]
 * @param    {[object]}   option [参数]
 * @return   {[Boole]}    [description]
 */
const isSeeing = (el, option) => {
  const setting = Object.assign({
    top: 0, // 元素在顶部伸出的距离
    right: 0, // 元素在右边伸出的距离才
    bottom: 0, // 元素在底部伸出的距离
    left: 0 // 元素在左边伸出的距离
  }, option)

  var bcr = el.getBoundingClientRect(); // 取得元素在可视区的位置

  var mw = el.offsetWidth; // 元素自身宽度
  var mh = el.offsetHeight; // 元素自身的高度
  var w = window.innerWidth; // 视窗的宽度
  var h = window.innerHeight; // 视窗的高度
  var boolX = (!((bcr.right - setting.left) <= 0 && ((bcr.left + mw) - setting.left) <= 0) && !((bcr.left + setting.right) >= w && (bcr.right + setting.right) >= (mw + w))); // 上下符合条件
  var boolY = (!((bcr.bottom - setting.top) <= 0 && ((bcr.top + mh) - setting.top) <= 0) && !((bcr.top + setting.bottom) >= h && (bcr.bottom + setting.bottom) >= (mh + h))); // 上下符合条件

  return el.width !== 0 && el.height !== 0 && boolX && boolY
}

export default {
  fmtDate,
  dbGet,
  dbSet,
  dbRemove,
  getCookie,
  setCookie,
  deleteCookie,
  isWeixin,
  fmoney,
  isSeeing
}
