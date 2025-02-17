const { test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require('supertest')
const app = require("../app")
const api = supertest(app)
const helper = require("./test_helper")
const Blog = require("../models/blog")
const bcrypt = require("bcryptjs")
const User = require("../models/user")


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initial)
})

test("prolly gonna be JSON", async () => {
    await api.get("/api/blogs")
        .expect(200)
        .expect("Content-type", /application\/json/)
})

test("posting works?", async () => {
    const blog = new Blog ({
        title: "meee",
        author: "me3",
        url : "qksjhdesajd",
        likes: 6
    })

    await api.post("/api/blogs")
        .send(blog)
        .expect(201)
        .expect("Content-type", /application\/json/)

    const response = await api.get("/api/blogs")
    assert.strictEqual(response.body.length, helper.initial.length + 1)

})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })
})



after(async () => {
    await mongoose.connection.close()
})