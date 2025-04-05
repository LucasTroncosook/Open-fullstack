const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
        response.json(blogs)
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/', middleware.userExtractor ,async (request, response) => {
    const body = request.body

    const user = request.user
    console.log(user)

    if(!user.id){
        return response.status(401).json({error: 'unknown user'})
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        likes: body.likes || 0,
        url: body.url,
        user: user.id
    })

    const savedBlog = await blog.save()
    const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(populatedBlog)
    

})

blogsRouter.delete('/:id', middleware.userExtractor ,async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const user = request.user

    if(blog.user.toString() === user.id.toString()){
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        likes: body.likes
    }

    try {
        const updateBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true}).populate('user', { username: 1, name: 1 })

        response.status(201).json(updateBlog)
    } catch (error) {
        next(error)
    }
})
module.exports = blogsRouter