// pages/mine/mine-info/index.js
var util = require("../../../utils/util.js")
var myWx = require("../../../utils/wx.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      avatarUrl: null,
      city: null,
      country: null,
      gender: null,
      language: null,
      nickName: null,
      province: null,
      userId: null,
      stuId: null,
      tellNum: null,
      className: null,
      stuName: null,
      openId: null,
      signUpTime: null,
      userIcon: null
    },
    genders: ['女', '男']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 这里要用对象的拷贝，防止一处修改处处修改然后却没有提交修改的错误
    var userInfo = Object.assign({}, util.getGlobalUserInfo());
    this.setData({
      userInfo: userInfo,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 改变性别
   */
  changeGender: function(e) {
    this.setData({
      ['userInfo.gender']: e.detail.value
    })
  },
  /**
   * 提交修改
   */
  submit: function() {
    var that = this
    var userInfo=util.getGlobalUserInfo();
    myWx.updateUserInfo(this.data.userInfo, (res) => {
      if (res.status != 500) {
        // 成功提交
        wx.showToast({
          title: '提交成功',
          icon: 'success'
        })
        userInfo=that.data.userInfo;
      } else {
        wx.showToast({
          title: '提交失败，可能是学号已被注册',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 输入名字
   */
  changeName:function(e){
    this.setData({
      ['userInfo.stuName']:e.detail.value
    })
  },
  /**
   * 输入班级
   */
  changeClass:function(e){
    this.setData({
      ['userInfo.className']: e.detail.value
    })
  },
  /**
   * 输入电话号码
   */
  changeTellNum:function(e){
    this.setData({
      ['userInfo.tellNum']: e.detail.value
    })
  },
  /**
   * 输入学号
   */
  changeStuId: function (e) {
    this.setData({
      ['userInfo.stuId']: e.detail.value
    })
  }
})
/**
 * 这里有个问题不知道怎么解决
 * 大概问题就是，我更新了用户信息，然后想把全局的用户信息全都修改一遍，可是不知道怎么做，没有思路
 */