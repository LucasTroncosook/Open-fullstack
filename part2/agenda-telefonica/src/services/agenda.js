import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createPhone = (newPhone) => {
    const request = axios.post(baseUrl, newPhone)
    return request.then(response => response.data)
}

const deletePhone = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updatePhone = (id, newPhone) => {
    const request = axios.put(`${baseUrl}/${id}`, newPhone)
    return request.then(response => response.data)
}

export default {
    getAll,
    createPhone,
    deletePhone,
    updatePhone
}