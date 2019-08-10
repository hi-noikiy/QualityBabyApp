var http = require("../../utils/http.js")
var myWx = require("../../utils/wx.js")
var util = require("../../utils/util.js")
var indexApi = require("../../utils/api/index.js")
var userApi = require("../../utils/api/user.js")
import {
  message
} from "../../utils/api/message.js"
Page({
  data: {
    messageList: [{
      messageId: null,
      messageTime: null,
      messageDetail: null,
      messageLike: null,
      messageShow: null,
      userId: null,
      user: {
        userId: null,
        stuId: null,
        tellNum: null,
        className: null,
        gender: null,
        stuName: null,
        openId: null,
        signUpTime: null,
        userIcon: null
      }
    }],
    activityGroupList: [{
      groupId: null,
      groupName: null,
      groupShow: null,
      groupIcon: null,
      groupSort: null,
      groupAddTime: null
    }],
    cardCur: 0, // 轮播图当前展示页
    swiperList: [{
      activityId: 10,
      activityName: "活动名1223456",
      activityInformation: "活动结合少",
      activityImg: "https://pangyuworld.github.io/assets/p4YBAFtjvnOAa7uqAABMXc2dvOk667_n-1557808233634.jpg",
      activityPersonNum: 11,
      activityStart: "2019-07-05 16:21:35",
      activityEnd: "2019-07-05 16:21:37",
      activityStartSignUp: "2019-07-05 16:21:40",
      activityEndSignUp: "2019-07-05 16:21:42",
      activityShow: true,
      groupId: 1,
    }],
  },
  onLoad() {
    // 初始化towerSwiper 传已有的数组名即可
    this.towerSwiper('swiperList');
  },
  onReady(e) {
    myWx.login();
    // 判断是否登录
    if (!util.isLogin()) {
      this.openType();
    }
    this.getMessage();
    this.getActivityGroup();
    this.getActivity();
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
   *  提示获取用户信息
   */
  openType() {
    var that = this
    myWx.getUserInfo(() => {
      userApi.getUserByOpenId(util.getGlobalLoginInfo().openId, (res) => {
        // 如果用户信息存在的话
        if (!util.strIsEmpty(res.data)) {
          util.setGlobalUserInfoByServer(res.data)
          // 判断是否回答了问卷
          indexApi.judgeAnswered(res.data.userId, () => {
            // 如果没有回答问卷，则跳转到回答问卷页面
            wx.navigateTo({
              url: '/pages/question/question',
            })
          })
        } else {
          // 否则进入一个注册界面
          wx.navigateTo({
            url: '/pages/welcome/welcome',
          })
        }
      })
    });
  },
  /**
   * 访问得到留言信息
   */
  getMessage: function() {
    var that = this
    indexApi.getMessage(function(e) {
      // 临时变量存储
      var messageListTemp = e.data.list;
      // 创建对象数组
      var messageList = that.data.messageList;
      // 遍历数组
      for (let messageTemp in messageListTemp) {
        // 获取用户
        indexApi.getMessageUser(messageListTemp[messageTemp].userId, function(e) {
          // 通过获得到的用户信息来构建对象
          messageList[messageTemp] = new message(messageListTemp[messageTemp], e.data)
          // 渲染该对象
          // 这里可以考虑怎么去优化一下
          that.setData({
            messageList: messageList
          })
        })
      }
    })
  },
  /**
   * 访问得到活动分组信息
   */
  getActivityGroup: function() {
    var that = this
    indexApi.getActivityGroup(function(e) {
      that.setData({
        activityGroupList: e.data.list
      })
    })
  },
  /**
   * 获取活动信息
   */
  getActivity: function() {
    var that = this
    indexApi.getActivity(function(e) {
      that.setData({
        swiperList: e.data.list
      })
    })
  }
})