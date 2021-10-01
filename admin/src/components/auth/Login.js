import './auth.scss'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../../context/authContext/AuthContext'
import { login } from '../../context/authContext/apiCallAuth'
import { useHistory } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    const { user, isFetching, dispatch } = useContext(AuthContext)


    console.log(user);
    const handleLogin = (e) => {
        e.preventDefault()
        login({ email, password }, dispatch)

        history.push('/')
    }
    return (
        <div className="login">
            <from className="loginForm">
                <h4>Log In</h4>
                <input type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="inputLogin"
                />
                <input type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="inputLogin" />
                <button onClick={handleLogin} className="loginBtn">Log In</button>
            </from>
        </div>
    )
}

export default Login
