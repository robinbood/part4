const jwt = require("jsonwebtoken")
const loginRouter = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("../models/user")


loginRouter.post("/", async (request, response) => {
    const { username, password } = request.body


    const user = await User.findOne({ username })
    const passswordCorrect = user === null ? false
        : await bcrypt.compare(password, user.passswordHash)

    if (!(user && passswordCorrect)) {
        return response.status(401).json({
            error: "Invaalid usernme or password"
        })
    }
    const tokenForUser = {
        username : user.username,
        id: user._id
    }

    const token = jwt.sign(tokenForUser, process.env.SECRET,{expiresIn:60*60})

    response.status(200)
    .send({token, username: user.username, name: user.name})

})


module.exports= loginRouter