const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/Blog')
const User = require('../models/User')
const bcrypt = require('bcrypt')

describe('init', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.InitBlogs)
    }, 100000)

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)

    test('the number of blog posts correct', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.InitBlogs.length)
    })

})

test('unique id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('new a blog', async () => {
    const start = await helper.blogsInDb()
    const newblog = {
        title: 'new a blog',
        author: 'new',
        url: 'new.blog',
        likes: 10
    }
    await api
        .post('/api/blogs')
        .send(newblog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    expect(await helper.blogsInDb()).toHaveLength(start.length + 1)
}, 100000)

test('likes default to 0', async () => {
    const blog = {
        title: 'likes',
        author: 'likes',
        url: 'test.test',
    }

    const newblog = await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    expect(newblog.body.likes).toEqual(0)
})

test('validator', async () => {
    const noTitle = {
        author: 'test',
        url: 'test.test',
        likes: 10
    }
    const noUrl = {
        title: 'test',
        author: 'test',
        likes: 10
    }
    await api
        .post('/api/blogs')
        .send(noTitle)
        .expect(400)

    await api
        .post('/api/blogs')
        .send(noUrl)
        .expect(400)
})

test('remove a blog', async () => {
    const start = await helper.blogsInDb()

    await api.delete(`/api/blogs/${start[0].id}`).expect(204)
    const response = await helper.blogsInDb()
    expect(response).toHaveLength(start.length - 1)
}, 100000)

test('update a blog', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]
    blog.likes += 10
    await api.put(`/api/blogs/${blog.id}`).send(blog).expect(200)
    const res = await Blog.findById(blog.id)
    expect(res.likes).toEqual(blog.likes)
}, 100000)

// User tests
describe('initialize database with one user', () => {
    beforeEach( async () => {
      await User.deleteMany({});
  
      const passwordHash = await bcrypt.hash('hahahaha', 10);
      const user = new User({
        username: 'mikumiku',
        passwordHash
      });
  
      await user.save();
    }, 100000);
  
    test('database has one user', async () => {
      const users = await User.find({});
  
      expect(users).toHaveLength(1);
    }, 100000)
  
    test('create one blog'), async () => {

    }
  });

afterAll(() => {
    mongoose.connection.close()
})