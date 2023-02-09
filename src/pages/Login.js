/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function Login() {
  let navigate = useNavigate()

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const { setAuthState } = useContext(AuthContext)

    const login = () => {
        const data = {
            username: username,
            password: password
        }
       axios.post('http://localhost:3001/auth/login', data)
        .then(response => {
          localStorage.setItem('token', response.data.token)
          setAuthState({
            status: true,
            id: response.data.id,
            username: response.data.username
          })
          navigate('/')
        })
        .catch(() => {
                document.getElementById('message').innerHTML='Le nom d\'utilisateur et/ou le mot de passe est erroné'
                setAuthState({
                  status: false,
                  id: 0,
                  username: ''
                })
            }
            )
    }
  return (
    <div>
        <h1>Connection</h1>
        <div className='d-flex flex-column shadow bg-body rounded form'>
            <label>Nom d'utilisateur</label>
            <input type="text"
            value={username}
             onChange={e => {
                setUsername(e.target.value)
            }} />
            <label>Mot de passe</label>
            <input type="password"
            value={password}
             onChange={e => {
                setPassword(e.target.value)
            }} />
            <div id="message" className='text-danger fw-bold'></div>
            <button onClick={login} className='btn btn-success mt-2'>Valider</button>
        </div>
    </div>
  )
}

export default Login
