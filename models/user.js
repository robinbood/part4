const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3
    },
    name: String,
    passswordHash: {
        type: String,
        required: true,
        unique: true,
        ninLength: 3
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        }
    ],
})

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passswordHash
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User