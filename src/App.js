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
import Author from './pages/Author'
import Profile from './pages/Profile'
import Error from './pages/Error'
import Forget from './pages/Forget'
import NewPassword from './pages/NewPassword'
import { AuthContext } from './helpers/AuthContext'

axios.defaults.withCredentials = true
 
function App() {
  createPopper
  /**
* Etat d'authentification 
* @param {Boolean} some status
* @param {String} some username
* @return { Object }
*/
  const [authState, setAuthState] = useState({
    status: false,
    username: ''
  })
  useEffect(() => {
    //Changement d'état d'authentification
    if(localStorage.getItem('token')) {
      axios.get('http://localhost:3001/auth/auth', {
       headers: {
        accessToken: localStorage.getItem('token')
      }
      }, { withCredentials: true })
      .then(response => {
        if(response.data.error) {
          localStorage.removeItem('token')
          setAuthState({
            status: false,
            username: ''
          })
        } else {
      setAuthState({
        status: true,
        username: response.data.username
      })
    } 
      })
      .catch(() => {
        localStorage.removeItem('token')
        setAuthState({
          status: false,
          username: ''
        })
      })
    } else {
      setAuthState({
        status: false,
        username: ''
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
        <Route path="/forget" exact element={<Forget/>} />
        <Route path="/resetpassword/:id" exact element={<NewPassword/>} />
        <Route path="/add" exact element={<Add/>} />
        <Route path="/post/:id" exact element={<Post/>} />
        <Route path="/author" exact element={<Author/>} />
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
