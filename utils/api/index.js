var http = require("../http.js")
var user = require("./user.js")
function getMessage(success) {
  http.getRequest("/message?showAll=false&pageSize=" + 5 + "&pageNum=" + 1, success)
}
function getMessageUser(userId, success) {
  user.getUser(userId, success)
}
function getActivityGroup(success){
  http.getRequest("/activity-group?showAll=false&pageNum=1&pageSize=3",success)
}
function getActivity(success){
  http.getRequest("/activity?showAll=false&pageNum=1&pageSize=6",success)
}
function judgeAnswered(userId,success){
  http.getRequest("/answer/"+userId,success)
}
module.exports = {
  getMessage: getMessage,
  getMessageUser: getMessageUser,
  getActivityGroup: getActivityGroup,
  getActivity: getActivity,
  judgeAnswered: judgeAnswered
}