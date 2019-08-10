var http = require("../http.js")

function getQuestion(success){
  http.getRequest("/question", success)
}

module.exports = {
  getQuestion: getQuestion
}