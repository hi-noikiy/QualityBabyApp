var http = require("../http.js")
var util = require("../util.js")

function getAspect(success) {
  // http.getRequest("/aspect/score/"+util.getGlobalUserInfo().userId,success)
  http.getRequest("/aspect/score/16 ", success)
}

function getAspectDetail(aspectId, success) {
  // http.getRequest("/aspect/" + aspectId + "/detail/score/" + util.getGlobalUserInfo().userId)
  http.getRequest("/aspect/" + aspectId + "/detail/score/16",success)
}
module.exports = {
  getAspect: getAspect,
  getAspectDetail:getAspectDetail
}