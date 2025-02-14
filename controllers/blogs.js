const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.post('/',async (request, response) => {
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

module.exports=blogsRouter