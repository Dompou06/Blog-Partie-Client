import React, { useState, useEffect, useContext } from 'react'
//import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

function Profile() {
  const location = useLocation()
 // console.log(location.state)
  const { authState } = useContext(AuthContext)
    let id = location.state
   // let { id } = useParams()
    const [username, setUsername] = useState('')
    const [listOfPosts, setListOfPosts] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    let navigate = useNavigate()

    useEffect(() => {
            axios.get(`http://localhost:3001/auth/basicinfo/${id}`)
            .then(response => {
              //  console.log(response.data) 
                setUsername(response.data.username)
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
       // console.log(response.data) 
        setLikedPosts(
          response.data.map(like => {
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

  return (
       <div className='container-profile'>
        <div className='d-flex flex-column shadow bg-body rounded form profile'>
        <div className='bg-moyen text-white text-center'>
            <h4 className='fw-bold'>{username}</h4>
          </div>
          {authState.status && (
          <div className='d-flex mb-2'>
            <div className='col-4 btn btn-secondary text-white fw-bold text-end pe-2 btn-noradius nocursor'>
              <span className=''>Compte utilisateur</span>
              </div>
            <div className='flex-fill align-self-center fw-bold ps-2'>{username}</div>
          <button className='btn btn-secondary fw-bold text-white btn-noradius'
          onClick={() => {
            navigate('/password')
          }}>
            Changer de mot de passe 
          </button>
          </div>
          )}
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
          <div className='align-self-start col-4 bg-moyen text-truncate text-white fw-bold ps-2 pe-2 border-end border-light cursor'
        onClick={() => {
          navigate(`/post/${post.id}`)
        }}>{post.title}</div>
          <div className='flex-grow-1 text-truncate border-start ps-2 pe-2 border-bottom border-moyen cursor'
        onClick={() => {
          navigate(`/post/${post.id}`)
        }}>{post.postText}</div>
        <div className='align-self-end align-self-stretch col-2 d-flex bg-moyen'>
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
