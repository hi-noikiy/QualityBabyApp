// pages/activity/activity-index/index.js
var activityApi = require("../../../utils/api/activity.js")
var util = require("../../../utils/util.js")
var indexApi = require("../../../utils/api/index.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    groupList: [{
      groupAddTime: null,
      groupIcon: null,
      groupId: null,
      groupName: null,
      groupShow: null,
      groupSort: null
    }],
    groupIndex: null,
    activityList: [{
      pageNum: 1,
      isLastPage: false,
      list: [{
        activityId: null,
        activityName: null,
        activityInformation: null,
        activityImg: null,
        activityPersonNum: null,
        activityStart: null,
        activityEnd: null,
        activityStartSignUp: null,
        activityEndSignUp: null,
        activityShow: null,
        activitySignInNum: null,
        groupId: null,
      }]
    }],
    cardCur: 0, // 轮播图当前展示页
    swiperList: [{
      activityId: null,
      activityName: null,
      activityInformation: null,
      activityImg: null,
      activityPersonNum: null,
      activityStart: null,
      activityEnd: null,
      activityStartSignUp: null,
      activityEndSignUp: null,
      activityShow: null,
      groupId: null,
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getActivitys();
    this.towerSwiper('swiperList');
    this.getAllGroup();
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
    if (util.strIsEmpty(this.data.groupIndex)) {
      // 如果没有页面打开，则不执行操作
      return
    }
    // 如果有页面打开，则获取新的活动列表
    this.getActivity()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 获得所有的分组
   */
  getAllGroup: function() {
    var that = this
    activityApi.getActivityGroup((res) => {
      that.setData({
        groupList: res.data.list
      })
    })
  },
  /**
   * 切换分组
   */
  changeGroup: function(e) {
    console.log(e.detail)
    var that = this
    // 将当前打开的分组赋值给全局变量
    this.setData({
      groupIndex: e.detail.key
    })
    if (util.strIsEmpty(this.data.activityList[this.data.groupIndex])) {
      this.getActivity()
    }
  },
  /**
   * 获得活动
   */
  getActivity: function() {
    var that = this
    var groupIndex = that.data.groupIndex
    var pageNum = util.strIsEmpty(that.data.activityList[groupIndex]) ? 1 : that.data.activityList[groupIndex].pageNum
    if (util.strIsEmpty(groupIndex)) {
      // 如果没有打开任何东西，则不执行
      return
    }
    if (!util.strIsEmpty(that.data.activityList[groupIndex]) && that.data.activityList[groupIndex].isLastPage) {
      // 如果是最后一页，则提示已经没有了
      wx.showToast({
        title: '已经到底啦',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    activityApi.getActivityByGroup(groupIndex, pageNum, (res) => {
      console.log(res)
      that.setData({
        ["activityList[" + groupIndex + "].list"]: res.data.list,
        ["activityList[" + groupIndex + "].isLastPage"]: res.data.isLastPage,
        ["activityList[" + groupIndex + "].pageNum"]: res.data.pageNum
      })
      console.log(that.data.activityList)
    })
  },
  /**
   * 报名活动
   */
  signIn: function(e) {
    var that = this;
    var activityId = e.currentTarget.dataset.id;
    var userId = util.getGlobalUserInfo().userId;
    activityApi.signInActivity(activityId, userId, (res) => {
      if (res.status == 500) {
        wx.showToast({
          title: '报名失败，可能是已经报名该活动，请勿重复报名',
          icon: "none"
        })
      }
      if (res.success) {
        wx.showToast({
          title: '报名成功',
          icon: "success"
        })
        that.setData({
          ['activityList['+that.data.groupIndex+'].isLastPage']:false,
          ['activityList[' + that.data.groupIndex + '].pageNum']:1
        })
        that.getActivity();
      }
    })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  },
  /**
   * 获取活动信息
   */
  getActivitys: function () {
    var that = this
    indexApi.getActivity(function (e) {
      that.setData({
        swiperList: e.data.list
      })
    })
  },
})