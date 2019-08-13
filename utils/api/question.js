var http = require("../http.js")

function getQuestion(success) {
  http.getRequest("/question", success)
}

function answerQuestion(answer, success) {
  http.postRequestJson("/answer", answer, success)
}

module.exports = {
  getQuestion: getQuestion,
  answerQuestion: answerQuestion
}