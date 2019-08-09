var http = require("../http.js")
var user = require("./user.js")
function getMessage(success) {
  http.getRequest("/message?pageSize=" + 5 + "&pageNum=" + 1, success)
}
function getMessageUser(userId, success) {
  user.getUser(userId, success)
}
function getActivityGroup(success){
  http.getRequest("/activity-group?pageNum=1&pageSize=3",success)
}
module.exports = {
  getMessage: getMessage,
  getMessageUser: getMessageUser,
  getActivityGroup: getActivityGroup,
  
}