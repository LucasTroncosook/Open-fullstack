const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('Authorization')

    if(authorization && authorization.startsWith('Bearer ')){
        request.token = authorization.replace('Bearer ', '')
    }

    next()
}

const userExtractor = async (request, response, next) => {
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if(decodedToken){
        request.user = await User.findById(decodedToken.id)
    }

    next()
}

const errorHandler = (error, request, response, next) => {
    if(process.env.NODE_ENV !== "test"){
        console.log(error.name)
    }

    if(error.name === "ValidationError"){
        return response.status(400).send({error: error.message})
    }else if(error.name === "MongoServerError" && error.message.includes('E11000 duplicate key error')){
        return response.status(401).json({error: "username is unique"})
    }else if(error.name === "JsonWebTokenError"){
        return response.status(401).json({error: 'token invalid'})
    }

    next(error)
}

module.exports = {
    errorHandler,
    tokenExtractor, 
    userExtractor
}