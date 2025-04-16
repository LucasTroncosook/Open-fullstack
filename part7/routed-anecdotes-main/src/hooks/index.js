import { useState } from "react";

export const useFiled = (type) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const reset = () => {
        setValue('')
    }

    return{
        type,
        value,
        onChange,
        reset
    }
}

export const useNotify = () => {
    const [value, setValue] = useState('')

    const setNotify = (notify) => {
        setValue(notify)
    }

    return{
        value,
        setNotify
    }
}

export const useAnecdotes = (anecdotes) => {
    const [value, setValue] = useState(anecdotes)

    const createAnecdote = (newAnecdote) => {
        setValue(value.concat(newAnecdote))
    }

    const updateAnecdote = (updatedAnecdote) => {
        setValue(value.map(v => v.id !== updatedAnecdote.id ? v : updatedAnecdote))
    }

    return {
        value,
        createAnecdote,
        updateAnecdote
    }
}