const Message = ({message}) => {
    const styleMessage = {
        border: "3px solid green",
        padding: "4px",
        borderRadius: "4px",
        color: "green",
        backgroundColor: "#D3D3D3"
    }
    
    if(message === null){
        return
    }

    return (
        <div style={styleMessage}>
            <p>{message}</p>
        </div>
    )
}

export default Message