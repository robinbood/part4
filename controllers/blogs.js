const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")



blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog.find({}).populate("user",{username : 1, name : 1})
    response.status(200).json(blogs)
})
blogsRouter.post('/',async (request, response) => {
    const body = request.body
    const user = await User.findById(body.userId)


    const blog = new Blog ({
        title:body.title,
        author:body.author,
        url:body.url,
        likes:body.likes,
        user : user._id
    })

    const savedBlog = await blog.save()
    
    user.blogs = user.blogs.concat(savedBlog._id)

    response.status(201).json(savedBlog)
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