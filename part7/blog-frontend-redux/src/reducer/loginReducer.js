import { createSlice } from "@reduxjs/toolkit";
import { notification } from "./notificationReducer";
import loginServices from "../services/login"
import blogServices from "../services/blog"

const loginSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        loginUser(state, action){
            return action.payload
        },
        removeUser(state, action){
            return action.payload
        }
    }
})

const { loginUser, removeUser } = loginSlice.actions
export const loginToUser = (user) => {
    return async dispatch => {
        try {
            const userLogin = await loginServices.login(user)
            window.localStorage.setItem('loggedUser', JSON.stringify(userLogin))
            blogServices.setToken(userLogin.token)
            dispatch(loginUser(userLogin))
        } catch (error) {
            dispatch(notification(error.response.data.error, 5))
        }
    }
} 

export const recoverUser = () => {
    return dispatch => {
        const userLogin = JSON.parse(window.localStorage.getItem('loggedUser'))
        if(userLogin){
            blogServices.setToken(userLogin.token)
            dispatch(loginUser(userLogin))
        }
    }
}

export const removeToUser = () => {
    return dispatch => {
        window.localStorage.removeItem('loggedUser')
        dispatch(removeUser(null))
    }
}

export const loginReducer = loginSlice.reducer