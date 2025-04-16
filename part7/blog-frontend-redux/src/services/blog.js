import axios from "axios";
const url = '/api/blogs';

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(url)
    return response.data
}

const createBlog = async (newBlog) => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.post(url, newBlog, config)
    return response.data
}

const createComment = async (id, newComment) => {
    const response = await axios.post(`${url}/${id}/comments`, newComment)
    return response.data
}

const updateBlog = async (id, blog) => {
    const response = await axios.put(`${url}/${id}`, blog)
    return response.data
}

const deleteBlog = async (id) => {
    const config = {
        headers: {Authorization: token}
    }
    const response = await axios.delete(`${url}/${id}`, config)
    return response.data
}

export default { 
    getAll, 
    createBlog,
    updateBlog,
    deleteBlog,
    createComment,
    setToken
}