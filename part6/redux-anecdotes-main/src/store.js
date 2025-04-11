import { configureStore } from "@reduxjs/toolkit";
import anecodteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationSlice from "./reducers/notificationReducer"

const store = configureStore({
    reducer: {
        anecdotes: anecodteReducer,
        filter: filterReducer,
        notification: notificationSlice
    }
})

export default store