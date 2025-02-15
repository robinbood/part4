const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require("./utils/config")
const middleware =require("./utils/middleware")
const logger = require("./utils/logger")
const blogsRouter = require("./controllers/blogs")


mongoose.set("strictQuery",false)



mongoose.connect(config.mongoUrl).then(result => {
    logger.info("connected to", config.mongoUrl);
    }).catch(error => {
        logger.error("error connecting to:", config.mongoUrl);
        
})

app.use(cors())
app.use(express.json())
app.use("/api/blogs",blogsRouter)
app.use(middleware.errorHandler)

module.exports = app
