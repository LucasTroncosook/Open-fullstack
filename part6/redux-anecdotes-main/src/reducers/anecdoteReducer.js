import { createSlice } from "@reduxjs/toolkit"
import anecdotesServices from "../services/anecdotes"

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:{
    vote(state, action){
      const updateAnecdote = action.payload
      return state.map(a => a.id !== updateAnecdote.id ? a : updateAnecdote)
    },
    create(state, action){
      state.push(action.payload)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { vote, create, setAnecdotes } = anecdotesSlice.actions

export const getAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesServices.getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdotesServices.createAnecdote({content, votes: 0})
    dispatch(create(newNote))
  }
}

export const votedAnecdote = anecdote => {
  return async dispatch => {
    const anecdoteToChange = { ...anecdote, votes: anecdote.votes + 1 }
    const anecdoteUpdate = await anecdotesServices.updateAnecdote(anecdoteToChange)
    dispatch(vote(anecdoteUpdate))
  }
}

export default anecdotesSlice.reducer