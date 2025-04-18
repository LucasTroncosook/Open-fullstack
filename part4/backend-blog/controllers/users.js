const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs', {link: 1, title: 1, author: 1})

    response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    if(password?.length <= 3 || !password){
        return response.status(401).json({error: "Password must have more than 3 characters"})
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = new User({
        username,
        name,
        passwordHash
    })
    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (error) {
        next(error)
    }
})

module.exports = usersRouter