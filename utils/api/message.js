var http = require("../http.js")
var user = require("./user.js")
var util = require("../util.js")
const pageSize = 10;
// 根据页码获得留言
function getMessage(pageNum, success) {
  http.getRequest("/message?showAll=false&pageSize=" + pageSize + "&pageNum=" + pageNum, success)
}
function addMessage(messageContent,success) {
  http.postRequest("/message?messageDetail=" + messageContent +
    "&messageLike=0" +
    "&messageShow=true" +
    "&userId=" + util.getGlobalUserInfo().userId, success)
}
function getMessageUser(userId, success) {
  user.getUser(userId, success)
}
function deleteMessage(messageId,success){
  http.putRequest("/message?messageId="+messageId+"&messageShow=false",success)
}
export class message {
  messageId
  messageTime
  messageDetail
  messageLike
  messageShow
  userId
  user = {
    userId:null,
    stuId:null,
    tellNum:null,
    className:null,
    gender:null,
    stuName:null,
    openId:null,
    signUpTime:null,
    userIcon:null
  }
  constructor(messageTemp,userTemp) {
    this.messageId = messageTemp.messageId
    this.messageTime = util.formatTime(messageTemp.messageTime)
    this.messageDetail = messageTemp.messageDetail
    this.messageLike = messageTemp.messageLike
    this.messageShow = messageTemp.messageShow
    this.userId = messageTemp.userId
    this.setUser(userTemp)
  }
  setUser(userTemp) {
    this.user.userId = userTemp.userId
    this.user.stuId = userTemp.stuId
    this.user.tellNum = userTemp.tellNum
    this.user.className = userTemp.className
    this.user.gender = userTemp.gender
    this.user.stuName = userTemp.stuName
    this.user.signUpTime = userTemp.signUpTime
    this.user.userIcon = userTemp.userIcon
  }
}
module.exports = {
  getMessage: getMessage,
  addMessage: addMessage,
  getMessageUser: getMessageUser,
  message: message,
  deleteMessage: deleteMessage
}