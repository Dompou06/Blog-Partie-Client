/* eslint-disable react/no-unescaped-entities */
import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

function Registration() {
  let navigate = useNavigate()

    const initialValues = {
        username: '',
        password: ''
    }
    const validationSchema = Yup.object().shape({
        username: Yup.string()
        .required('Le champ Auteur doit être rempli'),
        password: Yup.string()
        .min(10, 'Le champ Mot de passe doit comporter au moins dix caractères')
        .max(20, 'Le champ Mot de passe doit comporter moins de vingt caractères')
        .required('Le champ Mot de passe doit être rempli')
    })
    
    const onSubmit = (data) => {
         axios.post('http://localhost:3001/auth', data)
     .then(() => {
      navigate('/')
     }).catch(response => {   
       document.getElementById('message').innerHTML= response.response.data.error
     })
     }
  return (
    <div className=''>
      <h1>Inscription</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='d-flex flex-column shadow bg-body rounded form'>
            <label>Nom d'utilisateur</label>
            <Field className='form-control'
            autoCo3mplete='off'
            id="inputAddPost" 
            name="username" 
            placeholder="Nom d'utilisateur" />
            <label>Mot de passe</label>
           <Field className='form-control'
            autoComplete='off'
            type="password"
            id="inputAddPost" 
            name="password" 
            placeholder="Mot de passe" />
            <div id='message' className='text-danger fw-bold text-center'>
             <ErrorMessage name="username" component='span' />
             <ErrorMessage name="password" component='span' />
             </div>
            <button type='submit' className='btn btn-success'>Valider</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Registration
