const express = require('express')
const app = express()
const cors = require('cors')
require('express-async-errors')
const blogsRouter = require("./controllers/blogs")
const usersRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const mongoose = require('mongoose')
const config = require("./utils/config")
const middleware =require("./utils/middleware")
const logger = require("./utils/logger")


mongoose.set("strictQuery",false)



mongoose.connect(config.mongoUrl).then(result => {
    logger.info("connected to", config.mongoUrl);
    }).catch(error => {
        logger.error("error connecting to:", config.mongoUrl);
        
})

app.use(cors())
app.use(express.static("dist"))
app.use(express.json())

app.use("/api/login", loginRouter)
app.use("/api/blogs",blogsRouter)
app.use("/api/users", usersRouter)
app.use(middleware.errorHandler)

module.exports = app
