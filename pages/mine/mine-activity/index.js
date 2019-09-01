// pages/mine/mine-activity/index.js
var activityApi = require("../../../utils/api/activity.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: [{
      joinTime: null,
      groupSort: null,
      groupShow: null,
      activityImg: null,
      activityStart: null,
      groupId: null,
      activityName: null,
      activityInformation: null,
      activityPersonNum: null,
      activityStartSignUp: null,
      groupIcon: null,
      activityId: null,
      groupName: null,
      activityShow: null,
      groupAddTime: null,
      activityEndSignUp: null,
      activityEnd: null
    }],
    pageNum: 1,
    isLast: false,
    showDeleteModel: false,
    willDeleteId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.setData({
      pageNum: 1,
      isLast: false,
      showDeleteModel:false
    })
    this.getActivity()
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
    this.getActivity()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 获得活动
   */
  getActivity: function() {
    var that = this
    if (this.data.isLast) {
      wx.showToast({
        title: '已经到底了',
        icon: 'none'
      })
      return
    }
    activityApi.getActivityByUser(this.data.pageNum, (res) => {
      console.log(res)
      that.setData({
        activityList: res.data.list,
        isLast: res.data.isLastPage,
        pageNum: res.data.nextPage
      })
    })
  },
  /**
   * 退出活动
   */
  signOut: function(e) {
    this.setData({
      showDeleteModel: true,
      willDeleteId: e.currentTarget.dataset.id
    })
  },
  /**
   * 隐藏界面
   */
  hideModal: function() {
    this.setData({
      showDeleteModel: false
    })
  },
  /**
   * 确定删除
   */
  realDelete: function() {
    var that = this
    activityApi.signOutActivity(this.data.willDeleteId, () => {
      wx.showToast({
        title: '退出活动成功',
        icon: 'success'
      })
      that.onReady()
    })
  }
})