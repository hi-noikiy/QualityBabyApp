// 路径配置
const rootDocment = 'http://pang.yank-tenyond.cn';
// 基础http请求
function baseHttp(url, method, onSuccess, onFaile) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: rootDocment + url,
    method: method,

    success: function(res) {
      wx.hideLoading();
      onSuccess(res.data)
    },
    fail: function() {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      onFaile(res.data)
    }
  })
}
// 为回答问题专门准备的访问
function postRequestJson(url,data,onSuccess,onFaile){
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: rootDocment + url,
    method: "post",
    data: data,
    success: function (res) {
      wx.hideLoading();
      onSuccess(res.data)
    },
    fail: function () {
      wx.hideLoading();
      wx.showModal({
        title: '网络错误',
        content: '网络出错，请刷新重试',
        showCancel: false
      })
      onFaile(res.data)
    }
  })
}
//get访问
function getRequest(url, onSuccess, onFaile) {
  baseHttp(url, 'get', onSuccess, onFaile)
}
//post访问
function postRequest(url, onSuccess, onFaile) {
  baseHttp(url, 'post', onSuccess, onFaile)
}
//delete访问
function deleteRequest(url, onSuccess, onFaile) {
  baseHttp(url, 'delete', onSuccess, onFaile)
}
//put访问
function putRequest(url, onSuccess, onFaile) {
  baseHttp(url, 'put', onSuccess, onFaile)
}
module.exports = {
  getRequest: getRequest,
  postRequest: postRequest,
  deleteRequest: deleteRequest,
  putRequest: putRequest,
  postRequestJson: postRequestJson
}