import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
//import { AuthContext } from '../helpers/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faMessage } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

function Home() {
  let navigate = useNavigate()
 // const { authState } = useContext(AuthContext)
    const [listOfPosts, setListOfPosts] = useState([])
    //const [likedPosts, setLikedPosts] = useState([])
   
  useEffect(() => {
    //if(localStorage.getItem('token')) {
     // if(!authState.status) {
        axios.get('http://localhost:3001/posts')
    .then(response => {
      let lOP = response.data
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      lOP.forEach(post => {
post.created = new Date(post.createdAt).toLocaleDateString('fr-FR', options)
      })   
      setListOfPosts(lOP)
    })
  /*} else {
    axios.get('http://localhost:3001/posts', {
      headers: {
        accessToken: localStorage.getItem('token')
      }
    })
    .then(response => {
      //console.log(response.data.listOfPosts)
      let lOP = response.data.listOfPosts
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      lOP.forEach(post => {
post.created = new Date(post.createdAt).toLocaleDateString('fr-FR', options)
      })
     setListOfPosts(lOP)*/
    /* setLikedPosts(
      response.data.likedPosts.map(like => {
        //console.log(like.PostId)
        return like.PostId
      })
      )
    })*/
  
  },[])
 
  /*const likeAPost = (postId) => {
    axios.post('http://localhost:3001/like', {'PostId': postId}, 
    
    )
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

  }*/
  return (
    <div className='container-home'>
      {listOfPosts.map((post, key) => {
        return <div 
        className='d-flex flex-column box-shadow mb-3 bg-body rounded posts' 
        key={key}>
         <Link to={`/post/${post.id}`} className='link bg-moyen text-white text-center fw-bold'>
          {post.title}</Link>
         <Link to={`/post/${post.id}`} className='link text-dark border-start border-end border-moyen p-2 d-flex'>
          <div className='flex-fill text-start text-truncate pe-2'>
            {post.postText}
            </div>
        <div className="position-relative p-0 pe-1 text-moyen">
        <FontAwesomeIcon icon={faMessage} />
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-clair">
  {post.Comments.length}
  </span>
</div>
          
          </Link>
          <div className='d-flex bg-moyen rounded-bottom ps-2'>
          <div className='link flex-fill text-white text-start d-flex justify-content-between'
          onClick={() => {
            navigate('/author', {state: post.id})
           }}>
            <div className='fw-bold cursor'>{post.User.username}</div>
            <div className='pe-3'>créé le {post.created}</div>
            
          </div>
          <div className='d-flex'>
            <div className='text-warning pe-2'> 
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
            {/*authState.id != 0 && likedPosts != [] && (
          <div className='bg-warning text-moyen cursor ps-1 pe-1'>
            {likedPosts.includes(post.id) ? <FontAwesomeIcon icon={faThumbsDown} onClick={() => {likeAPost(post.id)}} /> 
            : <FontAwesomeIcon icon={faThumbsUp} onClick={() => {likeAPost(post.id)}} />}
            </div>            
            )*/}
        </div>
        </div>
          </div>
      })}
    </div>
  )
}

export default Home
