const Message = ({messageObject}) => {
    const styleMessage = {
        border: messageObject?.status ? "3px solid green" : "3px solid red",
        padding: "4px",
        borderRadius: "4px",
        color: messageObject?.status ? "green" : "red",
        backgroundColor: messageObject?.status ? "#D3D3D3" : "#D4D1D1" 
    }
    
    if(messageObject === null){
        return
    }

    return (
        <div style={styleMessage}>
            <p>{messageObject?.message}</p>
        </div>
    )
}

export default Message