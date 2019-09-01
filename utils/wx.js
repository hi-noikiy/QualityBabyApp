var http = require("./http.js")
var util = require('./util.js')
import { $wuxDialog } from '../dist/index'
// 登录
function login() {
  wx.login({
    success(e) {
      // 登录成功，获取openId
      http.postRequest("/wx/confirm/login?code=" + e.code, (res) => {
        // 将openId赋给全局
        util.setGlobalLoginInfo({
          openId: res.data.openid,
          sessionKey: res.data.session_key
        })
      })
    }
  })
}
// 获取用户信息
function getUserInfo(success) {
  $wuxDialog().open({
    resetOnClose: true,
    title: '提示',
    content: '获取用户信息',
    buttons: [
      {
        text: '确定',
        type: 'primary',
        openType: 'getUserInfo',
        onGetUserInfo(e) {
          util.setGlobalUserInfo(e.detail.userInfo)
          success();
        },
      },
    ],
  })
}
// 提交注册表单
function signIn(userInfo, success, faile) {
  http.postRequest("/user?userIcon=" + userInfo.userIcon
    + "&openId=" + userInfo.openId
    + "&stuId=" + userInfo.stuId
    + "&tellNum=" + userInfo.tellNum
    + "&className=" + userInfo.className
    + "&gender=" + userInfo.gender
    + "&stuName=" + userInfo.stuName, success, faile)
}
function updateUserInfo(userInfo,success,faile){
  http.putRequest("/user?userIcon=" + userInfo.userIcon
    + "&openId=" + userInfo.openId
    + "&stuId=" + userInfo.stuId
    + "&tellNum=" + userInfo.tellNum
    + "&className=" + userInfo.className
    + "&gender=" + userInfo.gender
    + "&stuName=" + userInfo.stuName, success, faile)
}
module.exports = {
  login: login,
  getUserInfo: getUserInfo,
  signIn: signIn,
  updateUserInfo: updateUserInfo
}