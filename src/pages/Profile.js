import React, { useState, useEffect, useContext } from 'react'
//import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faThumbsUp, faThumbsDown, faPen, faCheck, faMessage } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

function Profile() {
  const location = useLocation()
  //console.log(location.state)
  const { authState } = useContext(AuthContext)
    let id = location.state
   // let { id } = useParams() for Link
    const [author, setAuthor] = useState({})
    const [right, setRight] = useState(false)
    const [listOfPosts, setListOfPosts] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
            axios.get(`http://localhost:3001/auth/basicinfo/${id}`)
            .then(response => {
                //console.log(response.data) 
                setAuthor({
                  username: response.data.username,
                  presentation: response.data.presentation,
                })
                setListOfPosts(response.data.Posts)
            })
      if(authState.status) {
        /*axios.get(`http://localhost:3001/posts/notvalidate/byuserid/${id}`)
    .then(response => {
               // console.log(response.data) 
      setListOfPosts(response.data)
    })*/
    axios.get(`http://localhost:3001/posts/byuserid/${id}`, {
      headers: {
        accessToken: localStorage.getItem('token')
      }
    })
    .then(response => {
        //console.log(response.data) 
        setRight(response.data.right)
        setLikedPosts(
          response.data.likedPosts.map(like => {
            //console.log('Likes', like.Likes[0].PostId)
            return like.Likes[0].PostId
          })
          )
   })
      } 
        }, [])
        const likeAPost = (postId) => {
          axios.post('http://localhost:3001/like', {'PostId': postId}, {
            headers: {
              accessToken: localStorage.getItem('token')
            }
          })
          .then(response => {
            setListOfPosts(
            listOfPosts.map(post => {
              if(post.id === postId) {
                if(response.data.liked === true) {
               return {...post, Likes: [...post.Likes, 0]}
              } else {
                const likeArray = post.Likes
                //Supprime un élément du tableau
                likeArray.pop()
                return {...post, Likes: likeArray}
              }
              } else {
                return post
              }
            })
            )
            if(likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter(id => {
              return id != postId
            }))
            } else {
              setLikedPosts([...likedPosts, postId])
            }
          })    
        }
        const edit = (option) => {
          document.getElementById(option).classList.add('hidden')
document.getElementById(`edit${option}`).classList.add('hidden')
document.getElementById(`update${option}`).classList.remove('hidden')
let text = document.getElementById(option).innerHTML
document.getElementById(`input${option}`).value = text
document.getElementById(`input${option}`).classList.remove('hidden')
        }
        
const update = (option) => {
          let newPresentation = document.getElementById(`input${option}`).value  
       // console.log(newText)
       let data = {}
        data.presentation = newPresentation
      axios.put('http://localhost:3001/auth/profile', data, {
        headers: {
          accessToken: localStorage.getItem('token')
        }
      }).then(() => {
        //variable en propriété
        setAuthor({...author, [option]: newPresentation}) 
      document.getElementById(option).classList.remove('hidden')
      document.getElementById(`edit${option}`).classList.remove('hidden')
      document.getElementById(`input${option}`).value = ''
      document.getElementById(`update${option}`).classList.add('hidden')
      document.getElementById(`input${option}`).classList.add('hidden')
      })
      }

  return (
       <div className='container-profile'>
        <div className='d-flex flex-column shadow bg-body rounded form profile'>
        <div className='bg-moyen text-white text-center'>
            <h4 className='fw-bold'>{author.username}</h4>
          </div>
          {authState.status && (
          <div className='d-flex mb-2'>
            <div className='col-4 btn btn-secondary text-white fw-bold text-end pe-2 btn-noradius nocursor'>
              <span className=''>Compte utilisateur</span>
              </div>
            <div className='flex-fill align-self-center fw-bold ps-2'>{author.username}</div>
          </div>
          )}
          <div className='d-flex mb-2'>
            <div className='col-4 btn btn-secondary text-white fw-bold text-end pe-2 btn-noradius nocursor'>
              <span className=''>Présentation</span>
              </div>
            <div className='flex-fill align-self-center ps-2 d-flex'>
              <div className='flex-fill col-12'>
              <div id='presentation' className='col-12 pt-2'>{author.presentation}</div>
              {right && (<textarea id='inputpresentation' rows="1" className='col-12 noborder hidden'>

              </textarea>)}
           </div> 
           {right && (
                <div>
                <div id='editpresentation'>
              <button className='btn btn-info btn-noradius text-light fw-bold'
              onClick={() => {
              edit('presentation')
             }}>
                <FontAwesomeIcon icon={faPen} />
              </button>
             </div> 
                 <div id='updatepresentation' className='hidden'>
             <button className='btn btn-success btn-noradius text-light fw-bold' 
             onClick={() => {
              update('presentation')
             }} 
              >
               <FontAwesomeIcon icon={faCheck} />
              </button>
              </div>
              </div>
              )}
              </div>
          </div>
          <div className='bg-moyen text-white fw-bold text-center'>Posts</div>
          <div className={authState.status ? 'profile-auth-posts' : 'profile-posts'}>
          <div className='flex-grow-1 d-flex flex-column' 
     >
      {listOfPosts.map((post, key) => {
        return (
        <div 
        className='d-flex bg-body rounded' 
        key={key}>
          <div className='col-12 d-flex justify-content-between text-start'>
          <div className='align-self-center align-self-stretch col-4 bg-moyen text-truncate text-white fw-bold ps-2 pe-2 border-end border-light cursor'
        onClick={() => {
          navigate(`/post/${post.id}`)
        }}>{post.title}</div>
          <div className='col-6 border-start ps-2 pe-2 pt-02 border-bottom border-moyen cursor'
        onClick={() => {
          navigate(`/post/${post.id}`)
        }}>
          <div className='d-flex'>
        <div className='col-11 text-start text-truncate pe-2'>
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
        <div className='align-self-center align-self-stretch col-2 d-flex bg-moyen'>
            <div className='flex-fill align-self-stretch pt-1 d-flex justify-content-around text-warning border-bottom border-light'> 
            {post.Likes.length >= 1 ? <FontAwesomeIcon icon={faStar} /> :  
            <FontAwesomeIcon icon={farStar} />} 
            {post.Likes.length >= 2 ? <FontAwesomeIcon icon={faStar} /> :  
            <FontAwesomeIcon icon={farStar} />} 
            {post.Likes.length >= 3 ? <FontAwesomeIcon icon={faStar} /> :  
            <FontAwesomeIcon icon={farStar} />} 
            {post.Likes.length >= 4 ? <FontAwesomeIcon icon={faStar} /> :  
            <FontAwesomeIcon icon={farStar} />} 
            {post.Likes.length >= 5 ? <FontAwesomeIcon icon={faStar} /> :  
            <FontAwesomeIcon icon={farStar} />} 
            </div>
            {authState.id != 0 && likedPosts != [] && (
          <div className='bg-warning text-secondary border-end border-moyen ps-1 pe-1 cursor'>
            {likedPosts.includes(post.id) ? <FontAwesomeIcon icon={faThumbsDown} onClick={() => {likeAPost(post.id)}} /> 
            : <FontAwesomeIcon icon={faThumbsUp} onClick={() => {likeAPost(post.id)}} />}
            </div>            
            )}
        </div>
        </div>
        </div>
        )
      })
    }
    </div>
          </div>
        </div>
        </div>
     
  )
}

export default Profile
