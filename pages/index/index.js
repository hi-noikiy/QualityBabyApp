var http=require("../../utils/http.js")
var myWx=require("../../utils/wx.js")
var util=require("../../utils/util.js")
var indexApi = require("../../utils/api/index.js")
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
    activityGroupList:[{
      groupId: null,
      groupName: null,
      groupShow: null,
      groupIcon: null,
      groupSort: null,
      groupAddTime: null
    }],
    cardCur: 0, // 轮播图当前展示页
    swiperList: [{ // 轮播图列表
      id: 0, // 轮播图ID
      type: 'image', // 轮播图类型，一般为image
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg' // 图片地址
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
  },
  onLoad() {
    // 初始化towerSwiper 传已有的数组名即可
    this.towerSwiper('swiperList');
    myWx.login();
  },
  onReady(e){
    if (!util.isLogin()) {
      this.openType();
    }
    this.getMessage();
    this.getActivityGroup();
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
    myWx.getUserInfo();
  },
  /**
   * 访问得到留言信息
   */
  getMessage: function () {
    var that = this
    indexApi.getMessage( function (e) {
      // 临时变量存储
      var messageListTemp = e.data.list;
      // 创建对象数组
      var messageList =  that.data.messageList;
      // 遍历数组
      for (let messageTemp in messageListTemp) {
        // 获取用户
        indexApi.getMessageUser(messageListTemp[messageTemp].userId, function (e) {
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
  getActivityGroup:function(){
    var that=this
    indexApi.getActivityGroup(function(e){
      that.setData({
        activityGroupList:e.data.list
      })
    })
  }
})