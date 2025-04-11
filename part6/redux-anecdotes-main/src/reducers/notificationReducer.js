import { createSlice, current } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        message(state, action){
            return action.payload
        },
        clearMessage(state, action){
            return action.payload
        }
    }
})

export const { message, clearMessage } = notificationSlice.actions

export const setNotification = (textNotification, time) => {
    return dispatch => {
        dispatch(message(textNotification))
        setTimeout(() => {
            dispatch(clearMessage(''))
        }, time * 1000)
    }
}

export default notificationSlice.reducer