const blogsRouter = require("express").Router()
const Blog = require("../models/blog")

blogsRouter.post('/',async (request, response) => {
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
})

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({})
    response.status(200).json(blogs)
})

blogsRouter.delete('/:id' , async(request,response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/', async(request, response) => {
    const blog = new Blog(request.body)

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog,{new:true})
    response.json(updatedBlog)
} )
module.exports=blogsRouter