import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: "notification",
    initialState: "",
    reducers:{
        getNotification(state, action){
            return action.payload
        },
        setNotification(state, action){
            return ""
        }
    }
})

const { getNotification, setNotification } = notificationSlice.actions

export const notification = (value, time) => {
    return dispatch => {
        dispatch(getNotification(value))
        setTimeout(() => {
            dispatch(setNotification())
        }, time * 1000)
    }
}

export const notificationReducer = notificationSlice.reducer