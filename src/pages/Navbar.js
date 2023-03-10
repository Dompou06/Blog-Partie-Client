/* eslint-disable react/react-in-jsx-scope */
import { useState, useContext, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/AuthContext'

function Navbar() {
 const { authState, setAuthState } = useContext(AuthContext)
 const [actived, setActived] = useState(false)
 let navigate = useNavigate()

 useEffect(() => {
  if (authState.status) {
   axios
    .get(
     'http://localhost:3001/auth/auth',
     {
      headers: {
       accessToken: localStorage.getItem('token')
      }
     },
     { withCredentials: true }
    )
    .then((response) => {
     if (response.data.error) {
      setAuthState({
       status: false,
       username: ''
      })
     } else {
      if (response.data.token) {
       localStorage.setItem('token', response.data.token)
       setAuthState({
        status: true,
        username: response.data.response.username
       })
      } else {
       setAuthState({
        status: true,
        username: response.data.username
       })
      }
     }
    })
    .catch(() => {
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
 const linked = () => {
  setActived(true)
  navigate('/profile')
 }
 const logout = () => {
  axios.get(
   'http://localhost:3001/auth/logout',
   {
    headers: {
     accessToken: localStorage.getItem('token')
    }
   },
   { withCredentials: true }
  )
  localStorage.removeItem('token')
  setAuthState({
   status: false,
   username: ''
  })
  navigate('/')
 }
 return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-fonce mb-3">
   <div className="container-fluid">
    <NavLink to="/" className="navbar-brand">
     <span data-bs-toggle="collapse">Accueil</span>
    </NavLink>
    <button
     className="navbar-toggler"
     type="button"
     data-bs-toggle="collapse"
     data-bs-target="#navbarNav"
     aria-controls="navbarNav"
     aria-expanded="false"
     aria-label="Toggle navigation"
    >
     <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
     <ul className="navbar-nav">
      {!authState.status ? (
       <>
        <li className="nav-item">
         <NavLink
          to="/login"
          className={({ isActive }) =>
           isActive ? 'nav-link active' : 'nav-link'
          }
         >
          <span data-bs-toggle="collapse" data-bs-target="#navbarNav">
           Connection
          </span>
         </NavLink>
        </li>
        <li className="nav-item">
         <NavLink
          to="/registration"
          className={({ isActive }) =>
           isActive ? 'nav-link active' : 'nav-link'
          }
         >
          <span data-bs-toggle="collapse" data-bs-target="#navbarNav">
           Inscription
          </span>
         </NavLink>
        </li>
       </>
      ) : (
       <>
        <li className="nav-item">
         <NavLink
          to="/add"
          className={({ isActive }) =>
           isActive ? 'nav-link active' : 'nav-link'
          }
         >
          <span data-bs-toggle="collapse" data-bs-target="#navbarNav">
           Ajouter un post
          </span>
         </NavLink>
        </li>
        <li className="nav-item">
         <div
          onClick={() => {
           linked()
          }}
         >
          <span
           className={actived ? 'nav-link active' : 'nav-link'}
           data-bs-toggle="collapse"
           data-bs-target="#navbarNav"
          >
           {authState.username} {actived}
          </span>
         </div>
        </li>
        <li className="nav-item text-white cursor" onClick={logout}>
         <span
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          className="nav-link"
         >
          D??connection
         </span>
        </li>
       </>
      )}
     </ul>
    </div>
   </div>
  </nav>
 )
}

export default Navbar
