const BlogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

BlogsRouter.get('/', async (request, response) => {
    // response.json(await Blog.find({}))
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)

})

BlogsRouter.get('/blog/:id', async (request, response) => {
    const blog = response.json(await Blog.findOne({ id: request.params.id }))
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

BlogsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    console.log(decodedToken)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        ...body,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

BlogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

BlogsRouter.put('/:id', async (request, response) => {
    const blog = {
        title: request.body.title,
        url: request.body.url,
        author: request.body.author,
        likes: request.body.likes
    }
    const savedBlog = await Blog.findOneAndUpdate({ id: request.params.id }, blog, { new: true })
    response.status(200).json(savedBlog)
})

module.exports = BlogsRouter