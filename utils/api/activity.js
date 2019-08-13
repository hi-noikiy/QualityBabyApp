var http = require("../http.js")
var util = require("../util.js")
const pageSize = 10
// 获得所有活动分类列表（默认活动分类不会超过999个）
function getActivityGroup(success) {
  http.getRequest("/activity-group?showAll=false&pageNum=1&pageSize=999", success)
}
// 获得活动分类列表下的活动，每次获取10个
function getActivityByGroup(groupId, pageNum, success) {
  http.getRequest("/activity/activity-group/" + groupId
    + "?showAll=false&pageSize=" + pageSize
    + "&pageNum=" + pageNum, success)
}
// 报名活动
function signInActivity(activityId,userId,success){
  http.postRequest("/activity/user?activityId="+activityId+"&userId="+userId,success)
}
module.exports={
  getActivityGroup: getActivityGroup,
  getActivityByGroup: getActivityByGroup,
  signInActivity: signInActivity
}