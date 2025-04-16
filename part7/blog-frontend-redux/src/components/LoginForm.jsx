import { useState } from "react"
import { useFiled } from "../hooks"
const LoginForm = ({ login }) => {
    const username = useFiled('text')
    const password = useFiled('password')
    
    const loginForm = (e) => {
        e.preventDefault()

        login({
            username: username.value, 
            password: password.value
        })

        username.res()
        password.res()
    }

    return(
        <form onSubmit={loginForm} className="loginTest">
            <div>
                <span>username: </span>
                <input 
                    type={username.type}
                    value={username.value}
                    onChange={username.onChange}
                    data-testid = "username"
                />
            </div>
            <div>
                <span>password: </span>
                <input 
                    type={password.type}
                    value={password.value}
                    onChange={password.onChange}
                    data-testid = "password"
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm