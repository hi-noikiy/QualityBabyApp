// 获取全局的用户信息
function getGlobalUserInfo() {
  return getApp().globalData.userInfo;
}
// 获取全局的登录信息
function getGlobalLoginInfo() {
  return getApp().globalData.loginInfo;
}
// 设置全局的用户信息(获得的用户微信信息)
function setGlobalUserInfo(userInfo) {
  getApp().globalData.userInfo.avatarUrl = userInfo.avatarUrl;
  getApp().globalData.userInfo.city = userInfo.city;
  getApp().globalData.userInfo.country = userInfo.country;
  getApp().globalData.userInfo.language = userInfo.language;
  getApp().globalData.userInfo.nickName = userInfo.nickName;
  getApp().globalData.userInfo.province = userInfo.province;
  getApp().globalData.userInfo.gender = userInfo.gender==1?true:false;
}
// 设置全局的用户信息(获取后台的用户信息)
function setGlobalUserInfoByServer(userInfo) {
  getApp().globalData.userInfo.openId = getGlobalLoginInfo().openId;
  getApp().globalData.userInfo.signUpTime = userInfo.signUpTime;
  getApp().globalData.userInfo.stuId = userInfo.stuId;
  getApp().globalData.userInfo.stuName = userInfo.stuName;
  getApp().globalData.userInfo.tellNum = userInfo.tellNum;
  getApp().globalData.userInfo.userIcon = userInfo.userIcon;
  getApp().globalData.userInfo.userId = userInfo.userId;
  getApp().globalData.userInfo.className = userInfo.className;
}
// 设置全局的登录信息
function setGlobalLoginInfo(loginInfo) {
  getApp().globalData.loginInfo = loginInfo;
}
// 判断字符串是否为空
function strIsEmpty(str) {
  if (str == "" || str == null || typeof (str) == "undefined") {
    return true;
  } else {
    return false;
  }
}
// 判断是否已经登录
function isLogin() {
  return !strIsEmpty(getApp().globalData.userInfo.nickName)
}
//创建时间格式化显示
function formatTime(value) {
  var date = new Date(value);
  var n = date.getFullYear();
  var y = date.getMonth() + 1;
  var r = date.getDate();
  var mytime = date.toLocaleTimeString();
  var mytimes = n + "-" + y + "-" + r + " " + mytime;
  return mytimes;
}
module.exports = {
  getGlobalUserInfo: getGlobalUserInfo,
  getGlobalLoginInfo: getGlobalLoginInfo,
  setGlobalUserInfo: setGlobalUserInfo,
  setGlobalLoginInfo: setGlobalLoginInfo,
  strIsEmpty: strIsEmpty,
  isLogin: isLogin,
  formatTime: formatTime,
  setGlobalUserInfoByServer: setGlobalUserInfoByServer
}