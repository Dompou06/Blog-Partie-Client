/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.scss'
import './index.scss'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import { createPopper } from '@popperjs/core'

import Header from './pages/Navbar'
import Footer from './pages/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Add from './pages/AddPost'
import Post from './pages/Post'
import Profile from './pages/Profile'
import Error from './pages/Error'
import { AuthContext } from './helpers/AuthContext'

function App() {
  createPopper
  const [authState, setAuthState] = useState({
    status: false,
    id: 0,
    username: ''
  })
  useEffect(() => {
    if(localStorage.getItem('token')) {
      axios.get('http://localhost:3001/auth/auth', {
       headers: {
        accessToken: localStorage.getItem('token')
      }
      })
      .then(response => {
        if(response.data.error) {
          setAuthState({
            status: false,
            id: 0,
            username: ''
          })
        } else {
      setAuthState({
        status: true,
        id: response.data.id,
        username: response.data.username
      })
    }
      })
    }
  }, [])
  return (
    <div className="App"> 
    <AuthContext.Provider value={{authState, setAuthState}}>
    <Router>
      <Header />
      <div className='container-app'>
        <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/registration" exact element={<Registration/>} />
        <Route path="/login" exact element={<Login/>} />
        <Route path="/add" exact element={<Add/>} />
        <Route path="/post/:id" exact element={<Post/>} />
        <Route path="/profile" exact element={<Profile/>} />
        <Route path="*" exact element={<Error/>} />
        </Routes>
        </div>
        <Footer />
      </Router>
</AuthContext.Provider>
    </div>
  )
}

export default App
