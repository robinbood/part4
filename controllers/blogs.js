const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const userExtractor = require('../utils/middleware').userExtractor

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.status(200).json(blogs)
})
blogsRouter.post('/', userExtractor, async (request, response) => {
    const blog = new Blog(request.body)
  
    const user = request.user
  
    if (!user ) {
      return response.status(403).json({ error: 'user missing' })
    }  
  
    if (!blog.title || !blog.url ) {
      return response.status(400).json({ error: 'title or url missing' })
    }   
  
    blog.likes = blog.likes | 0
    blog.user = user
    user.blogs = user.blogs.concat(blog._id)
  
    await user.save()
  
    const savedBlog = await blog.save()
  
    response.status(201).json(savedBlog)
  })
  
blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/', async (request, response) => {
    const blog = new Blog(request.body)

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})
module.exports = blogsRouter