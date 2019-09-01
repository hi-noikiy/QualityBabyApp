var wxCharts = require('../../../utils/wxchart.js');
var radarApi = require("../../../utils/api/radar.js")
var app = getApp();
var radarChart = null;
Page({
  data: {
    dataList: [],
    nameList: [],
    aspectData: null,
    aspectDetailList: []
  },
  /**
   * 加载时候获得数据
   */
  onLoad: function(e) {
    var that = this
    radarApi.getAspect((res) => {
      var aspectList = res.data
      var dataListTemp = new Array();
      var nameListTemp = new Array();
      // 将名称列表和数据列表赋值给临时变量
      for (var aspect in aspectList) {
        dataListTemp[aspect] = (aspectList[aspect].score / aspectList[aspect].aspect_score * 150)
        nameListTemp[aspect] = aspectList[aspect].aspect_name
      }
      that.setData({
        aspectData: res.data,
        dataList: dataListTemp,
        nameList: nameListTemp
      })
      // 绘制雷达图
      that.printRadar();
    })
  },
  /**
   * 点击雷达图事件
   */
  touchHandler: function(e) {
    var touchIndex = radarChart.getCurrentDataIndex(e);
    var aspectList = this.data.aspectData;
    var that = this
    radarApi.getAspectDetail(aspectList[touchIndex].aspect_id, (res) => {
      console.log(res)
      that.setData({
        aspectDetailList: res.data
      })
    })
  },
  onReady: function(e) {

  },
  /**
   * 绘制雷达图
   */
  printRadar: function() {
    var that = this
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    radarChart = new wxCharts({
      canvasId: 'radarCanvas',
      type: 'radar',
      categories: that.data.nameList,
      series: [{
        data: that.data.dataList
      }],
      legend: false,
      width: windowWidth,
      height: 400,
      extra: {
        radar: {
          max: 150
        }
      }
    });
  }
});