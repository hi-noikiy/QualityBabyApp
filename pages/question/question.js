var _self;
var questionApi = require("../../utils/api/question.js")
var util = require("../../utils/util.js")
Page({
  data: {
    currentQN: 0, // 当前题目
    swiperHeight: 200,
    qns: [
      {
        questionId: null,
        questionDetail: null,
        questionSort: null
      }
    ], // 问卷数据
  },
  onLoad: function (res) {
    _self = this;
    // 加载问卷信息
    questionApi.getQuestion((res) => {
      _self.setData({
        qns: res.data
      })
    })
    // wx.request({
    //   url: 'https://www.easy-mock.com/mock/5cb9655c01e2e57715d324b0/example/qn#!method=get',
    //   success: function(res) {
    //     _self.setData({
    //       qns: res.data.data
    //     });
    //   }
    // });
    // 计算屏幕高度
    wx, wx.getSystemInfo({
      success: function (res) {
        // swiper 高度 = 屏幕高度 - 顶部步骤高度 - 底部按钮高度
        _self.setData({
          swiperHeight: res.screenHeight - 180
        });
      }
    });
  },
  swiperChange: function (e) {
    this.setData({
      currentQN: e.detail.current
    });
  },
  formSubmit: function (e) {
    //检查数据
    var data = e.detail.value;
    var checkError = false;
    var errorIndex = 0;
    for (var k in data) {
      if (data[k] == '' || data[k].length < 1) {
        checkError = k;
        break;
      }
      errorIndex++;
    }
    if (checkError) {
      wx.showToast({
        title: '请完善选择',
        icon: "none"
      });
      _self.setData({
        currentQN: errorIndex
      });
      return;
    }
    // 全部问题已经回答完毕
    var result = new Array();
    var i = 0;
    for (var questionId in data) {
      result[i]=new Object();
      result[i].questionId = questionId;
      result[i].answerRank = data[questionId];
      result[i].userId = util.getGlobalUserInfo().userId;
      // result[i].answerTime=new Date();
      i++;
    }
    questionApi.answerQuestion(result,(res)=>{
      wx.showToast({
        title: '提交成功',
        icon:'success'
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    })
  },
  next: function () {
    this.setData({
      currentQN: this.data.currentQN + 1
    });
  }
})