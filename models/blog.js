const mongoose = require('mongoose')

const config = require('../utils/config')
const logger = require('../utils/logger')

const mongoUrl = config.MONGODB_URI

logger.info("Connecting to ", mongoUrl)
mongoose.connect(mongoUrl)
.then(()=>{
  logger.info("Connected to MongoDB")
})
.catch(error => {
  logger.error("Error connecting to MongoDB\n", error)
})

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = mongoose.model('Blog', blogSchema)