// pages/welcome/welcome.js
var util = require("../../utils/util.js")
var myWx = require("../../utils/wx.js")
var userApi = require("../../utils/api/user.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      className: null,
      gender: null,
      openId: null,
      signUpTime: null,
      stuId: null,
      stuName: null,
      tellNum: null,
      userIcon: null
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 提交表单
   */
  submit() {
    this.setData({
      ['userInfo.openId']: util.getGlobalLoginInfo().openId,
      ['userInfo.userIcon']: util.getGlobalUserInfo().avatarUrl,
      ['userInfo.gender']: util.getGlobalUserInfo().gender
    })
    myWx.signIn(this.data.userInfo, (e) => {
      if (e.status != 500) {
        // 成功提交
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
        userApi.getUserByOpenId(util.getGlobalLoginInfo().openId, (res) => {
          util.setGlobalUserInfoByServer(res.data)
          // 跳转到答题界面
          wx.redirectTo({
            url: "/pages/question/question"
          })
        })
      } else {
        wx.showToast({
          title: '提交失败，可能是学号已被注册',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 输入姓名
   */
  inputName(e) {
    this.setData({
      ['userInfo.stuName']: e.detail.value
    })
  },
  /**
   * 输入班级
   */
  inputClass(e) {
    this.setData({
      ['userInfo.className']: e.detail.value
    })
  },
  /**
   * 输入学号
   */
  inputStuId(e) {
    this.setData({
      ['userInfo.stuId']: e.detail.value
    })
  },
  /**
   * 输入手机号
   */
  inputTellNumber(e) {
    this.setData({
      ['userInfo.tellNum']: e.detail.value
    })
  }
})