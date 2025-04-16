import { useSelector } from "react-redux"

const Message = () => {
    const notification = useSelector(state => state.notification)

    const style = {
        border: notification.includes('invalid') ? "2px solid #db1414" : "2px solid #14db36",
        padding: "5px 10px",
        borderRadius: '8px',
        backgroundColor: notification.includes('invalid') ? "rgb(222, 144, 144)": "rgb(137, 206, 149)",
        color: notification.includes('invalid') ? " #db1414" : " #14db36"
    }
    
    return notification && (
        <div style={style}>
           <span>{notification}</span> 
        </div>
    )
}

export default Message