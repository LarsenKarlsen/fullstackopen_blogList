const { request, response } = require("express")
const logger = require("./logger")

const requestLogger = (request, response, next) => {
  logger.info(`${request.method} - ${request.path} - ${JSON.stringify(request.body)}`)
  next()
}


module.exports = {
  requestLogger,
}