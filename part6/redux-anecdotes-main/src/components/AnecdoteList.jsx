import { useSelector, useDispatch } from "react-redux"
import { votedAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const List = ({ anecdote, handleVotes }) => {
    return(
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVotes}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
        return filter === ""
            ? anecdotes
            : anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })
    const dispatch = useDispatch()

    const handleClick = (anecdote) => {
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
        dispatch(votedAnecdote(anecdote))
    }

    return(
        <>
            {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
               <List 
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleVotes={() => handleClick(anecdote)}
               /> 
            )}
        </>
    )
}

export default AnecdoteList