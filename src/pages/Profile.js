import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
 faStar,
 faPen,
 faCheck,
 faMessage
} from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

function Profile() {
 const { authState, setAuthState } = useContext(AuthContext)
 const [author, setAuthor] = useState({})
 const [listOfPosts, setListOfPosts] = useState([])
 let navigate = useNavigate()

 useEffect(() => {
  axios
   .get(
    'http://localhost:3001/auth/me',
    {
     headers: {
      accessToken: localStorage.getItem('token')
     }
    },
    { withCredentials: true }
   )
   .then((response) => {
    let posts = []
    if (response.data.token) {
     localStorage.setItem('token', response.data.token)
    }
    setAuthor({
     username: response.data.basicInfo.username,
     presentation: response.data.basicInfo.presentation,
     email: response.data.basicInfo.email,
     mobile: response.data.basicInfo.mobile,
     tel: response.data.basicInfo.tel,
     address: response.data.basicInfo.address,
     cp: response.data.basicInfo.cp,
     city: response.data.basicInfo.city,
     state: response.data.basicInfo.state
    })
    posts = response.data.basicInfo.Posts
    setListOfPosts(posts)
   })
   .catch(() => {
    setAuthState({
     status: false,
     username: ''
    })
    localStorage.removeItem('token')
    navigate('/')
   })
 }, [])
 const edit = (option) => {
  document.getElementById(`edit${option}`).classList.add('hidden')
  document.getElementById(`update${option}`).classList.remove('hidden')
  document.getElementById(`input${option}`).disabled = false
  document.getElementById(`input${option}`).placeholder = ''
  document.getElementById(`input${option}`).select()
 }
 const update = (option) => {
  const value = document.getElementById(`input${option}`).value
  let data = {}
  data.field = option
  data.value = value
  axios
   .put(
    'http://localhost:3001/auth/profile',
    data,
    {
     headers: {
      accessToken: localStorage.getItem('token')
     }
    },
    { withCredentials: true }
   )
   .then((response) => {
    if (response.data.token) {
     localStorage.setItem('token', response.data.token)
    }
    setAuthor({ ...author, [option]: value })
    document.getElementById(`edit${option}`).classList.remove('hidden')
    document.getElementById(`input${option}`).disabled = true
    document.getElementById(`update${option}`).classList.add('hidden')
   })
 }
 const deleteAcount = () => {
  console.log('delete')
  axios.delete(
   'http://localhost:3001/auth',
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
  <div className="container-profile">
   <div className="d-flex flex-column shadow bg-body rounded form profile">
    <div className="bg-moyen text-white text-center d-flex justify-content-between">
     <h4 className="flex-fill fw-bold text-center">{authState.username}</h4>
     <button
      type="button"
      className="btn btn-danger btn-noradius fw-bold ps-025 pe-025"
      data-bs-toggle="modal"
      data-bs-target="#deleteModal"
     >
      X
     </button>
    </div>

    <div
     className="modal fade"
     id="deleteModal"
     tabIndex="-1"
     aria-labelledby="exampleModalLabel"
     aria-hidden="true"
    >
     <div className="modal-dialog">
      <div className="modal-content">
       <div className="modal-body text-center">
        Souhaitez-vous réellement supprimer votre compte ?
        <div className="d-flex justify-content-evenly pt-3 ps-5 pe-5">
         <button
          type="button"
          onClick={deleteAcount}
          className="btn btn-danger btn-noradius fw-bold"
          data-bs-dismiss="modal"
         >
          Close
         </button>
         <button
          type="button"
          className="btn btn-warning btn-noradius fw-bold"
          data-bs-dismiss="modal"
         >
          Save changes
         </button>
        </div>
       </div>
      </div>
     </div>
    </div>
    <div className="d-flex">
     <div className="col-4 btn btn-secondary text-white fw-bold text-end pe-2 btn-noradius nocursor">
      <span className="">Présentation</span>
     </div>
     <div className="flex-fill align-self-center ps-2 d-flex">
      <div className="flex-fill col-12">
       <textarea
        id="inputpresentation"
        rows="1"
        className="col-12 noborder"
        value={author.presentation}
        disabled
        onChange={(e) => setAuthor(e.target.value)}
       ></textarea>
      </div>
      <div>
       <div id="editpresentation">
        <button
         className="btn btn-info btn-noradius text-light fw-bold"
         onClick={() => {
          edit('presentation')
         }}
        >
         <FontAwesomeIcon icon={faPen} />
        </button>
       </div>
       <div id="updatepresentation" className="hidden">
        <button
         className="btn btn-success btn-noradius text-light fw-bold"
         onClick={() => {
          update('presentation')
         }}
        >
         <FontAwesomeIcon icon={faCheck} />
        </button>
       </div>
      </div>
     </div>
    </div>
    <div className="d-flex mb-2">
     <div className="d-flex flex-column btn-secondary">
      <div className="btn btn-secondary text-white fw-bold text-end pe-2 btn-noradius nocursor">
       <span className="">Email</span>
      </div>
      <div className="btn btn-secondary text-white fw-bold text-end pe-2 btn-noradius nocursor">
       <span className="">Adresse</span>
      </div>
     </div>
     <div className="flex-fill d-flex flex-column">
      <div className="flex-fill d-flex">
       <div className="flex-grow-1 align-self-center ps-2 d-flex">
        <input
         id="inputemail"
         className="flex-fill noborder inputw30"
         value={author.email}
         disabled
         onChange={(e) => setAuthor(e.target.value)}
        />
        <div id="editemail">
         <button
          className="btn btn-info btn-noradius text-light fw-bold"
          onClick={() => {
           edit('email')
          }}
         >
          <FontAwesomeIcon icon={faPen} />
         </button>
        </div>
        <div id="updateemail" className="hidden">
         <button
          className="btn btn-success btn-noradius text-light fw-bold"
          onClick={() => {
           update('email')
          }}
         >
          <FontAwesomeIcon icon={faCheck} />
         </button>
        </div>
       </div>
       <div className="btn btn-secondary text-white fw-bold text-end pe-2 btn-noradius nocursor">
        <span className="">Mobile</span>
       </div>
       <div className="align-self-center ps-2 d-flex">
        <div className="flex-fill d-flex">
         <input
          id="inputmobile"
          className="noborder inputw15"
          placeholder="Mobile"
          value={author.mobile}
          disabled
          onChange={(e) => setAuthor(e.target.value)}
         />
         <div id="editmobile">
          <button
           className="btn btn-info btn-noradius text-light fw-bold"
           onClick={() => {
            edit('mobile')
           }}
          >
           <FontAwesomeIcon icon={faPen} />
          </button>
         </div>
         <div id="updatemobile" className="hidden">
          <button
           className="btn btn-success btn-noradius text-light fw-bold"
           onClick={() => {
            update('mobile')
           }}
          >
           <FontAwesomeIcon icon={faCheck} />
          </button>
         </div>
        </div>
       </div>
       <div className="btn btn-secondary text-white fw-bold text-end pe-2 btn-noradius nocursor">
        <span className="">Tél.</span>
       </div>
       <div className="align-self-center ps-2 d-flex">
        <div className="flex-fill d-flex">
         <input
          id="inputtel"
          className="noborder inputw15"
          placeholder="Téléphone"
          value={author.tel}
          disabled
          onChange={(e) => setAuthor(e.target.value)}
         />
         <div id="edittel">
          <button
           className="btn btn-info btn-noradius text-light fw-bold"
           onClick={() => {
            edit('tel')
           }}
          >
           <FontAwesomeIcon icon={faPen} />
          </button>
         </div>
         <div id="updatetel" className="hidden">
          <button
           className="btn btn-success btn-noradius text-light fw-bold"
           onClick={() => {
            update('tel')
           }}
          >
           <FontAwesomeIcon icon={faCheck} />
          </button>
         </div>
        </div>
       </div>
      </div>

      <div className="flex-fill d-flex">
       <div className="flex-grow-1 align-self-center ps-2 d-flex">
        <input
         id="inputaddress"
         className="flex-fill noborder inputw30"
         placeholder="Adresse"
         value={author.address}
         disabled
         onChange={(e) => setAuthor(e.target.value)}
        />
        <div id="editaddress">
         <button
          className="btn btn-info btn-noradius text-light fw-bold"
          onClick={() => {
           edit('address')
          }}
         >
          <FontAwesomeIcon icon={faPen} />
         </button>
        </div>
        <div id="updateaddress" className="hidden">
         <button
          className="btn btn-success btn-noradius text-light fw-bold"
          onClick={() => {
           update('address')
          }}
         >
          <FontAwesomeIcon icon={faCheck} />
         </button>
        </div>
       </div>
       <div className="btn btn-secondary text-white fw-bold text-end pe-2 btn-noradius nocursor">
        <span className="">CP</span>
       </div>
       <div className="align-self-center ps-2 d-flex">
        <div className="d-flex">
         <input
          id="inputcp"
          className="inputw5 noborder"
          placeholder="CP"
          value={author.cp}
          disabled
          onChange={(e) => setAuthor(e.target.value)}
         />
         <div id="editcp">
          <button
           className="btn btn-info btn-noradius text-light fw-bold"
           onClick={() => {
            edit('cp')
           }}
          >
           <FontAwesomeIcon icon={faPen} />
          </button>
         </div>
         <div id="updatecp" className="hidden">
          <button
           className="btn btn-success btn-noradius text-light fw-bold"
           onClick={() => {
            update('cp')
           }}
          >
           <FontAwesomeIcon icon={faCheck} />
          </button>
         </div>
        </div>
       </div>
       <div className="btn btn-secondary text-white fw-bold text-end pe-2 btn-noradius nocursor">
        <span className="">Ville</span>
       </div>
       <div className="align-self-center ps-2 d-flex">
        <div className="flex-fill d-flex">
         <input
          id="inputcity"
          className="inputw10 noborder"
          placeholder="Ville"
          value={author.city}
          disabled
          onChange={(e) => setAuthor(e.target.value)}
         />
         <div id="editcity">
          <button
           className="btn btn-info btn-noradius text-light fw-bold"
           onClick={() => {
            edit('city')
           }}
          >
           <FontAwesomeIcon icon={faPen} />
          </button>
         </div>
         <div id="updatecity" className="hidden">
          <button
           className="btn btn-success btn-noradius text-light fw-bold"
           onClick={() => {
            update('city')
           }}
          >
           <FontAwesomeIcon icon={faCheck} />
          </button>
         </div>
        </div>
       </div>
       <div className="btn btn-secondary text-white fw-bold text-end pe-2 btn-noradius nocursor">
        <span className="">Pays</span>
       </div>
       <div className="align-self-center ps-2 d-flex">
        <div className="flex-fill d-flex">
         <input
          id="inputstate"
          className="inputw10 noborder"
          value={author.state}
          disabled
          onChange={(e) => setAuthor(e.target.value)}
         />
         <div id="editstate">
          <button
           className="btn btn-info btn-noradius text-light fw-bold"
           onClick={() => {
            edit('state')
           }}
          >
           <FontAwesomeIcon icon={faPen} />
          </button>
         </div>
         <div id="updatestate" className="hidden">
          <button
           className="btn btn-success btn-noradius text-light fw-bold"
           onClick={() => {
            update('state')
           }}
          >
           <FontAwesomeIcon icon={faCheck} />
          </button>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>

    <div className="bg-moyen text-white fw-bold text-center">Posts</div>
    <div className={authState.status ? 'profile-auth-posts' : 'profile-posts'}>
     <div className="flex-grow-1 d-flex flex-column">
      {listOfPosts.map((post, key) => {
       return (
        <div className="d-flex bg-body rounded" key={key}>
         <div className="col-12 d-flex justify-content-between text-start">
          <div
           className="align-self-center align-self-stretch col-4 bg-moyen text-truncate text-white fw-bold ps-2 pe-2 border-end border-light cursor"
           onClick={() => {
            navigate(`/post/${post.id}`)
           }}
          >
           {post.title}
          </div>
          <div
           className="col-6 border-start ps-2 pe-2 pt-02 border-bottom border-moyen cursor"
           onClick={() => {
            navigate(`/post/${post.id}`)
           }}
          >
           <div className="d-flex">
            <div className="col-11 text-start text-truncate pe-2">
             {post.postText}
            </div>
            <div className="position-relative p-0 pe-1 text-moyen">
             <FontAwesomeIcon icon={faMessage} />
             <span className="position-absolute top-3 start-10 translate-middle badge rounded-pill bg-clair">
              {post.Comments.length}
             </span>
            </div>
           </div>
          </div>
          <div className="align-self-center align-self-stretch col-2 d-flex bg-moyen">
           <div className="flex-fill align-self-stretch pt-1 d-flex justify-content-around text-warning border-bottom border-light">
            {post.Likes.length >= 1 ? (
             <FontAwesomeIcon icon={faStar} />
            ) : (
             <FontAwesomeIcon icon={farStar} />
            )}
            {post.Likes.length >= 2 ? (
             <FontAwesomeIcon icon={faStar} />
            ) : (
             <FontAwesomeIcon icon={farStar} />
            )}
            {post.Likes.length >= 3 ? (
             <FontAwesomeIcon icon={faStar} />
            ) : (
             <FontAwesomeIcon icon={farStar} />
            )}
            {post.Likes.length >= 4 ? (
             <FontAwesomeIcon icon={faStar} />
            ) : (
             <FontAwesomeIcon icon={farStar} />
            )}
            {post.Likes.length >= 5 ? (
             <FontAwesomeIcon icon={faStar} />
            ) : (
             <FontAwesomeIcon icon={farStar} />
            )}
           </div>
          </div>
         </div>
        </div>
       )
      })}
     </div>
    </div>
   </div>
  </div>
 )
}

export default Profile
