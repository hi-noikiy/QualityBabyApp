var http = require("../http.js")
// 根据页码获得留言
function getUser(userId, success) {
  http.getRequest("/user/" + userId, success)
}
function getUserByOpenId(openId,success){
  http.postRequest("/user/openId?openId=" + openId, success)
}
module.exports = {
  getUser: getUser,
  getUserByOpenId: getUserByOpenId
}