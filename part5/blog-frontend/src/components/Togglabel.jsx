import { useState, forwardRef, useImperativeHandle } from "react"

const Togglabel = forwardRef((props, refs) =>{
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible ? 'none' : ''}
    const showWhenVisible = {display: visible ? '' : 'none'}

    const togglabelVisible = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            togglabelVisible
        }
    })

    return(
        <>
            <div style={hideWhenVisible}>
                <button onClick={togglabelVisible}>{props.label}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={togglabelVisible}>cancel</button>
            </div>
        </>
    )
})

export default Togglabel