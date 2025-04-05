const Message = ({ messageObj }) => {

    const style = {
        border: messageObj?.status ? "2px solid #14db36" : "2px solid #db1414",
        padding: "5px 10px",
        borderRadius: '8px',
        backgroundColor: messageObj?.status ? "rgb(137, 206, 149)": "rgb(222, 144, 144)",
        color: messageObj?.status ? "#14db36" : "#db1414"
    }
    
    return messageObj && (
        <div style={style}>
           <span>{messageObj.message}</span> 
        </div>
    )
}

export default Message