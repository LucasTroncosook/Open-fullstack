require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(cors())

app.use(express.static('dist'))

morgan.token("body", (req) => (req.method === "POST" ? JSON.stringify(req.body) : ""));
app.use(morgan(":method :url :status :res[content-length] - :response-time - ms :body"));

const requestLogger = (request, response, next) => {
    console.log("Method", request.method)
    console.log("Path", request.path)
    console.log("Body", request.body)
    console.log("---")
    next()
}

const errorHandler = (error, request, response, next) => {
    if(error.name === "CastError"){
        return response.status(404).send({error: "malformatted id"})
    }else if(error.name === "ValidationError"){
        return response.status(400).json({error: error.message})
    }

    next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({
        error: "unknown endpoint"
    })
}

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const date = new Date

app.use(requestLogger)

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
        .then(person => {
            response.status(204).json(person)
        }).catch(error => {
            console.log(error)
        })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(personSaved => {
        response.json(personSaved)
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, {new: true, runValidators: true, context: "query"})
        .then(updatePerson => {
            response.json(updatePerson)
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} persons</p>
        <br/>
        <p>${date.toString()}</p>
    `)
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})