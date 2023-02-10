import React, { useState, useEffect, useContext } from 'react'
//import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faThumbsUp, faThumbsDown, faPen } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

function Profile() {
  const location = useLocation()
  //console.log(location.state)
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
                //console.log(response.data) 
                setUsername(response.data.username)
            })
      if(!authState.status) {
        axios.get(`http://localhost:3001/posts/notvalidate/byuserid/${id}`)
    .then(response => {
               // console.log(response.data) 
      setListOfPosts(response.data)
    })
      } else {
            axios.get(`http://localhost:3001/posts/byuserid/${id}`)
            .then(response => {
               // console.log(response.data.listOfPosts) 
                setListOfPosts(response.data.listOfPosts)
                setLikedPosts(
                  response.data.likedPosts.map(like => {
                    return like.PostId
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
       <div className='createPostContainer'>
      <h1>{username}</h1>
      {authState.status && (
        <div className='d-flex flex-column shadow bg-body rounded ms-5 me-5 mb-3'>
        <div className='bg-secondary text-white fw-bold'>Compte</div>
        <div className='flex-grow-1 border-start border-end border-secondary' 
    >
      <div 
        className='d-flex rounded'>
          <div className='col-12 d-flex text-start bg-secondary'>
          <div className='align-self-center text-white fw-bold ps-2 pe-2'>
        Utilisateur
          </div>
          <div className='flex-fill bg-light fw-bold ps-2 d-flex justify-content-between'>
            <div className='align-self-center'>{username}</div>
            <button className='btn btn-info btn-noradius text-light fw-bold'>
            <FontAwesomeIcon icon={faPen} />
            </button>
          </div>
          <button className='align-self-center btn btn-secondary fw-bold'
          onClick={() => {
            navigate('/password')
          }}>
            Changer de mot de passe 
          </button>
          </div>
        </div>
        </div>
        </div>
      )}
      <div className='d-flex flex-column shadow bg-body rounded ms-5 me-5 mb-3'>
      <div className='bg-secondary text-white fw-bold'>Posts</div>
    <div className='flex-grow-1 border-start border-end border-secondary d-flex flex-column' 
    >
      {listOfPosts.map((post, key) => {
        return (
        <div 
        className='d-flex bg-body rounded' 
        key={key}>
          <div className='col-12 d-flex justify-content-between text-start'>
          <div className='align-self-start col-4 bg-secondary text-white fw-bold ps-2 pe-2 cursor'
        onClick={() => {
          navigate(`/post/${post.id}`)
        }}>{post.title}</div>
          <div className='flex-grow-1 text-truncate border-start border-end border-secondary ps-2 pe-2 cursor'
        onClick={() => {
          navigate(`/post/${post.id}`)
        }}>{post.postText}</div>
        <div className='align-self-end col-2 d-flex bg-secondary'>
            <div className='flex-fill align-self-center d-flex justify-content-around text-warning'> 
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
          <div className='bg-warning text-secondary cursor ps-1 pe-1'>
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
  )
}

export default Profile
