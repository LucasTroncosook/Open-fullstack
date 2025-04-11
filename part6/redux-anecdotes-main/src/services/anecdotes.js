import axios from "axios";
const baseUrl = 'http://localhost:3005/anecdotes'

const getAnecdotes = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createAnecdote = async newAnecdote => {
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const updateAnecdote = async object => {
    const response = await axios.put(`${baseUrl}/${object.id}`, object)
    return response.data
}

export default {
    getAnecdotes,
    createAnecdote,
    updateAnecdote
}