/* eslint-disable react/no-unescaped-entities */
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

function Login() {
  let navigate = useNavigate()

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const { setAuthState } = useContext(AuthContext)

    const login = () => {
        const data = {
            email: email,
            password: password
        }
       axios.post('http://localhost:3001/auth/login', data)
        .then(response => {
          //console.log(response.data)
          localStorage.setItem('token', response.data.token)
          setAuthState({
            status: true,
            id: response.data.id,
            username: response.data.username
          })
          navigate('/')
        })
        .catch(() => {
                document.getElementById('message').innerHTML='L\'email et/ou le mot de passe est erroné'
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
           <label className='col-3 bg-moyen text-white fw-bold text-end pe-2'>Email</label>
            <input type="email" className='form-control'
            value={email}
             onChange={e => {
                setEmail(e.target.value)
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
            <button className='btn btn-secondary text-light btn-noradius'>Mot de passe oublié</button>
            <div id="message" className='text-danger fw-bold text-center'></div>
            <button onClick={login} className='btn btn-success fw-bold btn-noradius'>Valider</button>
        </div>
    </div>
  )
}

export default Login
