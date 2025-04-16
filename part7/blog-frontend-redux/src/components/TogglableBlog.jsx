import { useState } from "react"

const TogglabelBlog = (props) => {
    const [visible, setVisible] = useState(false)

    const style = {
        border: "1px solid #000",
        borderRadius: "8px",
        padding: "8px 15px",
        marginBottom: 5
    }

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const togglabelVisible = () => {
        setVisible(!visible)
    }

    return(
        <div style={style} className="divBlog">
            <div style={hideWhenVisible}>
                <span>{props.title}</span>
            </div>
            <div style={showWhenVisible} className="testDiv">
                {props.children}
                <button onClick={togglabelVisible}>hiden</button>
            </div>
        </div>
    )
}

export default TogglabelBlog