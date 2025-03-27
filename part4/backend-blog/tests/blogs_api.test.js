const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const app = require('../app')
const supertest = require('supertest')
const helper = require('./helper_blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const api = supertest(app)

let token

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)

    const user = new User({username: "Super Test", name: "Test", passwordHash})
    await user.save()

    const userForToken = { username: user.username, id: user._id }

    token = jwt.sign(userForToken, process.env.SECRET)

    for(let blog of helper.initialBlogs){
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('get blogs formate JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect("Content-Type", /application\/json/)    
})

test('Property id blogs', async () => {
    const blogs = await Blog.find({})

    const result = blogs.map(b =>  b.toJSON())

    for( let blog of result ){
        assert(blog.id !== blog._id)
    }
})

test('Create a blog and increment blogs', async () => {
    const blog = {
        title: "Probando test de mi app blog",
        author: "Lucas Troncoso",
        likes: 5,
        link: "SinPage"
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
    
    const blogs = await api.get('/api/blogs')
    assert.strictEqual(blogs.body.length, helper.initialBlogs.length + 1) 

    const titles = blogs.body.map(b => b.title)
    assert(titles.includes("Probando test de mi app blog"))
})

test('Property likes for default 0', async () => {
    const blog = {
        title: "Likes por defecto es 0",
        author: "Lucas Troncoso",
        link: "Este-es-un-link"
    }

    const savedBlog = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
    
    assert.strictEqual(savedBlog.body.likes, 0)    
})

test('Create blog undefined title or url, response status 400', async () => {
    const blog = {
        author: "Lucas Troncoso",
        link: "Este-es-un-link"
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(400)
})

test('delete a blog, response status 204', async () => {
    const blog = {
        title: "probando un blog con delete y token",
        author: "Lucas Troncoso",
        link: "https://fullstackopen.com/es/part4/autenticacion_basada_en_token#ejercicios-4-15-4-23",
        likes: 5
    }  

    const createBlog  = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    await api
        .delete(`/api/blogs/${createBlog.body.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)  
    
})

test('update blog, property likes', async () => {
    const blogs = await api.get('/api/blogs')
    const blog = blogs.body[0]
    const likes = {
        likes: 5
    }

    await api
        .put(`/api/blogs/${blog.id}`)
        .send(likes)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const updateBlog = (await api.get('/api/blogs')).body[0]

    assert(blog.likes !== updateBlog.likes)
})

test('401 Unauthorized token', async () => {
    const blog = {
        title: "probando un blog con delete y token",
        author: "Lucas Troncoso",
        link: "https://fullstackopen.com/es/part4/autenticacion_basada_en_token#ejercicios-4-15-4-23",
        likes: 5
    } 
    
    await api
        .post('/api/blogs')
        .send(blog)
        .expect(401)
})

after(() => {
    mongoose.connection.close()
})