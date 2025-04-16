import { createSlice } from "@reduxjs/toolkit";
import userServices from "../services/user"

const usersSlice = createSlice({
    name: "users",
    initialState: [],
    reducers: {
        getAll(state, action){
            return action.payload
        }
    }
})

const { getAll } = usersSlice.actions

export const getAllUsers = () => {
    return async dispatch => {
        const users = await userServices.getAllUser()
        dispatch(getAll(users))
    }
}

export const usersReducer = usersSlice.reducer