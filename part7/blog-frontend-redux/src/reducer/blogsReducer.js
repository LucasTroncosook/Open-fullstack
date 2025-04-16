import { createSlice } from "@reduxjs/toolkit";
import blogServices from "../services/blog"

const blogSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        getAll(state, action){
            return action.payload
        },
        setBlog(state, action){
            state.push(action.payload)
        },
        removeBlog(state, action){
            return state.filter(b => b.id !== action.payload)
        },
        updateBlog(state, action){
            return state.map(b => b.id !== action.payload.id ? b : action.payload)
        },
        setComment(state, action){
            return state.map(blog => blog.id !== action.payload.id ? blog : action.payload)
        }        
    }
})

const { getAll, setBlog, removeBlog, updateBlog, setComment } = blogSlice.actions

export const getBlogs = () => {
    return async dispatch => {
        const blogs = await blogServices.getAll()
        dispatch(getAll(blogs))
    }
}

export const createNewBlog = (newBlog) => {
    return async dispatch => {
        const blog = await blogServices.createBlog(newBlog)
        dispatch(setBlog(blog))
    }
} 

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogServices.deleteBlog(id)
        dispatch(removeBlog(id))
    }
}

export const updateOneBlog = (id, blog) =>{
    return async dispatch => {
        const updatedBlog = await blogServices.updateBlog(id, blog)
        dispatch(updateBlog(updatedBlog))    
    }
}

export const createComment = (id, comment) => {
    return async dispatch => {
        const newComment = await blogServices.createComment(id, comment)
        dispatch(setComment(newComment))
    }
}

export const blogReducer = blogSlice.reducer 