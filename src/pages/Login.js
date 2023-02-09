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
    <div className='pt-5'>
        <div className='d-flex flex-column shadow bg-body rounded form'>
        <div className='bg-moyen text-white text-center'>
            <h4 className='fw-bold'>Connection</h4>
          </div>
          <div className='d-flex'>
           <label className='col-3 bg-moyen text-white fw-bold text-end pe-2'>Nom d'utilisateur</label>
            <input type="text" className='form-control'
            value={username}
             onChange={e => {
                setUsername(e.target.value)
            }} />
            </div>
          <div className='d-flex'>
            <label className='col-3 bg-moyen text-white fw-bold text-end pe-2'>Mot de passe</label>
            <input type="password" className='form-control'
            value={password}
             onChange={e => {
                setPassword(e.target.value)
            }} />
            </div>
            <div id="message" className='text-danger fw-bold text-center'></div>
            <button onClick={login} className='btn btn-success btn-noradius'>Valider</button>
        </div>
    </div>
  )
}

export default Login
