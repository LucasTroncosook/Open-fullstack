import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesServicios from "./services/anecdotes"
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotification } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const notify = useNotification()

  const createAnecdote = useMutation({
    mutationFn: anecdotesServicios.createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
    onError: (error) => {
      notify(error.response.data.error, 5)
    }
  })

  const updateAnecdote = useMutation({
    mutationFn: anecdotesServicios.updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.map(a => a.id !== updatedAnecdote.id ? a : updatedAnecdote))
    }
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesServicios.getAnecdotes
  })

  if(result.isLoading){
    return <div>loading data...</div>
  }

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    updateAnecdote.mutate(updatedAnecdote)
    notify(`anecdote '${anecdote.content}' voted`, 5)
  }

  const anecdotes = result.data

  return (
    <>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm 
        createAnecdote={createAnecdote}
      />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App
