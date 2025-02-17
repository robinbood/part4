const bcrypt = require("bcryptjs")
const usersRouter = require("express").Router()
const User = require("../models/user")
const Blog = require("../models/blog")

usersRouter.get("/", async(request, response ) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

usersRouter.post("/", async (request , response) => {
    const {username, name, password} = request.body


    const saltRounds = 10
    const passswordHash = await bcrypt.hash(password,saltRounds)

    const user = new User ({
        username,
        name,
        passswordHash
    })



    const savedUser  = await user.save()

    response.status(201).json(savedUser)
})



module.exports = usersRouter