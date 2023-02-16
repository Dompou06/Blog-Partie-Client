import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../helpers/AuthContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faThumbsUp, faThumbsDown, faPen, faCheck } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

function Post() {
    let { id } = useParams()
    let navigate = useNavigate()
    const [Post, setPost] = useState({})
    const [postLenght, setPostLenght] = useState(0)
    const [postLiked, setPostLiked] = useState(true)
    const [comments, setComments] = useState([])
    const { authState } = useContext(AuthContext)

    useEffect(() => { 
        const getPost = async () => {
            const response = await
            axios.get(`http://localhost:3001/posts/byId/${id}`)
            let post = response.data
           // console.log(response.data)
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
            const createdAt = new Date(post.createdAt).toLocaleDateString('fr-FR', options)
            post.createdAt = createdAt
            const updatedAt = new Date(post.updatedAt).toLocaleDateString('fr-FR', options)
            post.updatedAt = updatedAt
            post.username = response.data.User.username
            //console.log(post)
            setPost(post)
            setPostLenght(post.Likes.length)
            post.Likes.map(liked => {
              if(liked.UserId != authState.id) {
            setPostLiked(true)
              } else {
            setPostLiked(false)
              }
            })
            //console.log(response.data)
           // console.log(authState)
        }
        getPost()    
        const getComments = async () => {
            const response = await
            axios.get(`http://localhost:3001/comments/${id}`)
           // console.log(response.data)
            setComments(response.data)
        }
        getComments()   
    }, [])
const editPost = (option) => {
document.getElementById(option).classList.add('hidden')
document.getElementById(`edit${option}`).classList.add('hidden')
document.getElementById(`update${option}`).classList.remove('hidden')
let postText = document.getElementById(option).innerHTML
document.getElementById(`input${option}`).value = postText
document.getElementById(`input${option}`).classList.remove('hidden')
}
const updatePost = (option) => {
    let newText = document.getElementById(`input${option}`).value  
let data = {}
if(option === 'title') {
  data.newTitle = newText 
} else {
  data.newBody = newText 
}
axios.put(`http://localhost:3001/posts/byId/${id}`, data, {
  headers: {
    accessToken: localStorage.getItem('token')
  }
}).then(() => {
  //variable en propriété
  setPost({...Post, [option]: newText}) 
document.getElementById(option).classList.remove('hidden')
document.getElementById(`edit${option}`).classList.remove('hidden')
document.getElementById(`input${option}`).value = ''
document.getElementById(`update${option}`).classList.add('hidden')
document.getElementById(`input${option}`).classList.add('hidden')
})
}
const deletePost = () => {
 // console.log(id)
  axios.delete(`http://localhost:3001/posts/byId/${id}`, {
    headers: {
      accessToken: localStorage.getItem('token')
    }
  }).then(() => {
    navigate('/')
  })
  }
    const initialValues = {
      commentBody: '',
      PostId: id
  }
  const validationSchema = Yup.object().shape({
      commentBody: Yup.string().required('Le champ Commentaire doit être rempli'),
  })
 const onSubmit = (data, {setSubmitting, resetForm}) => {
 // console.log('data', data)
  axios.post('http://localhost:3001/comments', data, {
    headers: {
      accessToken: localStorage.getItem('token')
    }
  })
      .then(response => {
        if(response.data.error) {
          document.getElementById('message').innerHTML = 'Conntectez-vous pour créer un commentaire'
        } else {
          data.UserId = authState.id
          data.User = {}
          data.User.username = response.data.username
         // console.log(data)
       setComments([data, ...comments])
     resetForm(initialValues)
    }
      })
  setSubmitting(false)
}
const likeAPost = () => {
  axios.post('http://localhost:3001/like', {'PostId': id}, {
    headers: {
      accessToken: localStorage.getItem('token')
    }
  })
 // console.log(postLenght)
  if(postLiked) {
  setPostLiked(false)
  setPostLenght(postLenght + 1)
} else {
  setPostLiked(true)
  setPostLenght(postLenght - 1)
}
}

const deleteComment = (id) => {
  axios.delete(`http://localhost:3001/comments/${id}`, {
    headers: {
      accessToken: localStorage.getItem('token')
    }
  }).then(() => {
    setComments(comments.filter(comment => {
      return comment.id != id
    }))
  })
}
  return (
    <div className='d-flex post'>
    <div 
        className='flex-fill d-flex flex-column shadow mb-3 bg-body rounded post-post' 
        >
          <div className='d-flex bg-moyen text-light'>
           <div className='flex-fill align-self-center fw-bold ps-2 pe-2'>
            <div id='title' className='text-center'>{Post.title}</div>
            {authState.username === Post.username && (
            <input id='inputtitle' type='text' className='hidden' />
            )}
            </div>
      {authState.username === Post.username ? (
            <div>
              <div id="edittitle">
             <button className='btn btn-info btn-noradius text-light fw-bold' 
             onClick={() => {
              editPost('title')
             }}>
              <FontAwesomeIcon icon={faPen} />
             </button>
             </div>
             <div id='updatetitle' className='hidden'>
             <button className='btn btn-success btn-noradius text-light fw-bold' 
             onClick={() => {
              updatePost('title')
             }}>
              <FontAwesomeIcon icon={faCheck} />
             </button>
             </div>
             </div>
             ) : (
              <button className='btn btn-1 novisible'>i</button>
             )}
          </div>
          <div className='flex-grow-1 border-start border-end border-moyen d-flex'>
              <div className='flex-fill col-12 ps-2 pe-2'>
            <div id='postText' className='text-start post-text'>{Post.postText}</div>
            <textarea id='inputpostText' rows='13' className='col-12 hidden'></textarea>
            </div>
          {authState.username === Post.username ? (
            <div className='align-self-end d-flex flex-column'>
              <div id="editpostText">
             <button className='col-12 btn btn-info btn-noradius text-light fw-bold' 
             onClick={() => {
              editPost('postText')
             }}>
              <FontAwesomeIcon icon={faPen} />
             </button>
             </div>
             <div id='updatepostText' className='hidden'>
             <button className='col-12 btn btn-success btn-noradius text-light fw-bold' 
             onClick={() => {
              updatePost('postText')
             }}>
              <FontAwesomeIcon icon={faCheck} />
             </button>
             </div>
             <button className='btn btn-danger btn-noradius fw-bold ps-3 pe-3' 
             onClick={deletePost}>X</button>
             </div>
             ) : (
              <button className='btn btn-1 novisible'>i</button>
             )}
            </div>
          <div className='d-flex bg-moyen rounded-bottom'>
          <div className='flex-fill align-self-center d-flex pe-3'>
            <div className='flex-fill align-self-center text-white text-start ps-2 cursor d-flex justify-content-between' onClick={() => {
          navigate('/profile', {state: Post.id})
         }}>
          <div className='fw-bold'>{Post.username}</div> 
          <div>créé le {Post.createdAt}</div>
          
          </div>
            </div>
          <div className='d-flex'>
           <div className='align-self-center text-warning pe-2'> 
            {postLenght >= 1 ? <FontAwesomeIcon icon={faStar} /> :  
            <FontAwesomeIcon icon={farStar} />} 
            {postLenght >= 2 ? <FontAwesomeIcon icon={faStar} /> :  
            <FontAwesomeIcon icon={farStar} />} 
            {postLenght >= 3 ? <FontAwesomeIcon icon={faStar} /> :  
            <FontAwesomeIcon icon={farStar} />} 
            {postLenght >= 4 ? <FontAwesomeIcon icon={faStar} /> :  
            <FontAwesomeIcon icon={farStar} />} 
            {postLenght >= 5 ? <FontAwesomeIcon icon={faStar} /> :  
            <FontAwesomeIcon icon={farStar} />} 
            </div>
            </div>
            {authState.status && (
          <button className='btn bg-warning btn-noradius text-secondary'
          onClick={() => {likeAPost()}}>
            { postLiked ? <FontAwesomeIcon icon={faThumbsUp} /> : <FontAwesomeIcon icon={faThumbsDown} /> }</button>
            )}
            </div>
    </div>
    
    <div className='flex-fill align-items-en ps-5 pb-3 d-flex flex-column'>
      <div className='bg-clair text-light text-center fw-bold mb-2'>Commentaires<button className='btn btn-1 novisible'>i</button></div>
      <div className='flex-grow-1 comments'>
      {comments.map((comment, key) => {
        return <div 
        className='d-flex flex-column mb-2 shadow bg-body rounded' 
        key={key}>
          <div className='bg-clair text-light text-start fs-6 ps-2 fw-bold flex-fill'
           onClick={() => {
            navigate(`/profile/${comment.UserId}`)
           }}>{comment.User.username}</div>
          <div className='d-flex'>
            <div className='flex-fill text-start fs-6 ps-2 pe-2 comment'>{comment.commentBody}</div>
            {authState.id === comment.UserId && (
            <button className='btn btn-danger btn-noradius fs-6 p-1 pt-0 pb-0 fw-bold' onClick={() => {deleteComment(comment.id)}}>x</button>
            )}
          </div>
          </div>

      })}
      </div>
      {authState.status && (
      <Formik initialValues={initialValues} onSubmit={onSubmit} 
      validationSchema={validationSchema}>
        <Form className='d-flex flex-column'>
            <Field className='form-control btn-noradius'
            autoComplete='off'
            id="inputAddComment" 
            name="commentBody" 
            placeholder="Nouveau commentaire" />
            <div className='text-danger fw-bold'>
            <ErrorMessage name='commentBody' component='span' />
             <div id='message'></div>
             </div>
            <button type='submit' className='btn btn-noradius rounded-bottom btn-success fw-bold'>Valider</button>
        </Form>
      </Formik>
      )}
    </div>
    </div>
  )
}

export default Post
