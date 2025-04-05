import { useState } from "react"

const LoginForm = ({ login }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const loginForm = (e) => {
        e.preventDefault()

        login({
            username, 
            password
        })

        setUsername('')
        setPassword('')
    }

    return(
        <form onSubmit={loginForm} className="loginTest">
            <div>
                <span>username: </span>
                <input 
                    type="text"
                    name="username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    data-testid = "username"
                />
            </div>
            <div>
                <span>password: </span>
                <input 
                    type="password"
                    name="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                    data-testid = "password"
                />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm