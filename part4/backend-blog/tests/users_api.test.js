const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const helper = require('./helper_blog')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')

const api = supertest(app)

describe('not create user and error 401', () => {
    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('undefined username or username < 3 caracteres', async () => {
        const user = {
            username: "Li",
            name: "Lucas",
            password: "1234566"
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(400)
    })

    test('undefined password or password < 3 caracteres', async () => {
        const user = {
            username: "Lucas Troncoso",
            name: "Lucas"
        }

        await api
            .post('/api/users')
            .send(user)
            .expect(401)
    })
})

after(async () => {
    await mongoose.connection.close()
})