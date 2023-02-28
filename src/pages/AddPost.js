import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { AuthContext } from '../helpers/AuthContext'

function AddPost() {
  let navigate = useNavigate()
  const { authState } = useContext(AuthContext)

    const initialValues = {
        title: '',
        postText: ''
    }

    useEffect(()=> {
      if(!authState.status) {
        navigate('/')
      }
    }, [])
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Le champ Titre doit être rempli'),
        postText: Yup.string().required('Le champ Description doit être rempli'),
    })
    const onSubmit = (data) => {
        axios.post('http://localhost:3001/posts', data, {
          headers: {
            accessToken: localStorage.getItem('token')
          } 
        }, { withCredentials: true })
    .then(response => {
      let idPost = ''
      if(response.data.token) {
        localStorage.setItem('token', response.data.token)
        idPost = response.data.id
      } else {
        idPost = response.data
      }
      navigate(`/post/${idPost}`)
    })
    }
    
  return (
    <div className='createPostContainer'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='d-flex flex-column shadow bg-body rounded ms-5 me-5'>
          <div className='bg-moyen text-white text-center'>
            <h4 className='fw-bold'>Ajouter un post</h4>
          </div>
          <div className='d-flex'>
            <label className='col-3 bg-moyen text-white fw-bold text-end pe-2'>Titre</label>
            <Field className='form-control'
            autoComplete='off'
            id="inputAddPost" 
            name="title" 
            placeholder="Titre" />
            </div>
          <div className='d-flex'>
            <label className='col-3 bg-moyen text-white fw-bold text-end pe-2'>Description</label>
           <Field as='textarea'
           className='form-control'
           rows="9"
            autoComplete='off'
            id="inputAddPost" 
            name="postText" 
            placeholder="Texte" />
            </div>
            <div className='text-danger fw-bold'>
            <ErrorMessage name='title' component='span' />
             <ErrorMessage name="postText" component='span' />
             </div>
            <button type='submit' className='btn btn-success btn-noradius fw-bold'>Créer le post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default AddPost
