const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })

    const passwordCorrect = user === null 
        ? false
        : await bcrypt.compare(password, user.passwordHash)
    
    if(!(user && passwordCorrect)){
        return response.status(401).json({
            error: "invalid username or password"
        })
    }    

    const getFromToken = {
        username: user.username,
        id: user._id
    }

    const token = jwt.sign(getFromToken, process.env.SECRET)

    response.status(201).json({token, username: user.username, name: user.name})
})

module.exports = loginRouter