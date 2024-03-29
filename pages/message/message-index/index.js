// pages/message/message-index/index.js
var messageApi = require("../../../utils/api/message.js")
var util = require("../../../utils/util.js")
import {
  message
} from "../../../utils/api/message.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageContent: "",
    messageNextNum: 0,
    hasNextPage: true,
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
    userId: null,
    showDeleteModel:false
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
      messageNextNum: 1,
      messageContent: '',
      userId: util.getGlobalUserInfo().userId,
      showDeleteModel: false
    })
    this.getMessage();

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
    this.getMessage();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 访问得到留言信息
   */
  getMessage: function() {
    if (!this.data.hasNextPage) {
      wx.showToast({
        title: '已经到底啦',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    var that = this
    messageApi.getMessage(this.data.messageNextNum, function(e) {
      // 临时变量存储
      var messageListTemp = e.data.list;
      // 创建对象数组
      var messageList = (that.data.messageNextNum <= 1) ? new Array() : that.data.messageList;
      // 标记当前长度
      var index = (that.data.messageNextNum <= 1) ? 0 : that.data.messageList.length;
      // 遍历数组
      for (let messageTemp in messageListTemp) {
        // 获取用户
        messageApi.getMessageUser(messageListTemp[messageTemp].userId, function(e) {
          // 通过获得到的用户信息来构建对象
          messageList[parseFloat(messageTemp) + parseFloat(index)] = new message(messageListTemp[messageTemp], e.data)
          // 渲染该对象
          // 这里可以考虑怎么去优化一下
          that.setData({
            messageList: messageList
          })
        })
      }
      // 更新下一页的页码
      that.setData({
        messageNextNum: e.data.nextPage,
        hasNextPage: e.data.hasNextPage
      })
    })
  },
  /**
   * 编辑留言
   */
  inputMessage: function(e) {
    this.setData({
      messageContent: e.detail.value
    })
  },
  /**
   * 添加留言
   */
  addMessage: function() {
    if (this.data.messageContent.length < 1) {
      wx.showToast({
        title: '请输入留言内容',
        icon: 'none'
      })
      return
    }
    var that = this
    messageApi.addMessage(this.data.messageContent, (res) => {
      wx.showToast({
        title: '留言成功',
        icon: 'success'
      })
      that.onReady()
    })
  },
  /**
   * 删除留言
   */
  deleteMessage: function (e) {
    this.setData({
      showDeleteModel:true,
      willDeleteId: e.currentTarget.dataset.id
    })
  },
  /**
   * 隐藏界面
   */
  hideModal:function(){
    this.setData({
      showDeleteModel:false
    })
  },
  /**
   * 确定删除
   */
  realDelete:function(){
    var that=this
    messageApi.deleteMessage(this.data.willDeleteId,()=>{
      wx.showToast({
        title: '删除留言成功',
        icon: 'success'
      })
      that.onReady()
    })
  }
})