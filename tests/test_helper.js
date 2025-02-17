const User = require("../models/user")
const initial = [
    {
        title:'me',
        author:"me1"
    },
    {
        title:"mee",
        author:"mee1"
    }
]

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports= {
    initial,
    usersInDb
}