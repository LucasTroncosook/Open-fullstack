import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    if(action.type === "NOTIFICATION"){
        return action.payload
    }else if(action.type === "CLEAR"){
        return ""
    }
    return state
}

export const NotificationContext = createContext()

export const useNotificationValue = () => {
    const notificationValue = useContext(NotificationContext)
    return notificationValue[0]
}

export const useNotificationDistpach = () => {
    const notificationDistpach = useContext(NotificationContext)
    return notificationDistpach[1]
}

export const useNotification = () => {
    const dispatch = useNotificationDistpach()

    const notify = (content, time) => {
        dispatch({ type: "NOTIFICATION", payload: content })
        setTimeout(() => {
            dispatch({ type: "CLEAR" })
        }, time * 1000)
    }

    return notify
}


export const NotificationContextProvider = ( props ) => {
    const [notification, distpachNotification] = useReducer(notificationReducer, "")

    return(
        <NotificationContext.Provider value={[notification, distpachNotification]}>
            {props.children}
        </NotificationContext.Provider>
    )
}