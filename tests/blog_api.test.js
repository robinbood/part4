const {test, after, beforeEach } = require("node:test")
const assert = require("node:assert")
const mongoose = require("mongoose")
const supertest = require('supertest')
const app = require("../app")
const api =supertest(app)
const helper =require("./test_helper")
const Blog = require("../models/blog")


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initial)
})

test("prolly gonna be JSON" ,async () => {
    await api.get("/api/blogs")
    .expect(200)
    .expect("Content-type" , /application\/json/)
})

test("posting works?", async () => {
    const newBlog = {
        title:"meee",
        author:"me3"
    }

    await api.post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-type", /application\/json/)

    const response = await api.get("/api/blogs")
    assert.strictEqual(response.body.length ,helper.initial.length + 1)

})

after(async () => {
    await mongoose.connection.close()
})