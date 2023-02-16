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
        email: Yup.string().email()
        .required('Le champ Email doit être rempli'),
        password: Yup.string()
        .min(10, 'Le champ Mot de passe doit comporter au moins dix caractères')
        .max(20, 'Le champ Mot de passe doit comporter moins de vingt caractères')
        .required('Le champ Mot de passe doit être rempli')
    })
    
    const onSubmit = (data) => {
         axios.post('http://localhost:3001/auth', data)
     .then(() => {
      navigate('/login')
     }).catch(response => {   
       document.getElementById('message').innerHTML= response.response.data.error
     })
     }
  return (
    <div className='pt-5'>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className='d-flex flex-column shadow bg-body rounded form'>
          <div className='bg-moyen text-white text-center'>
            <h4 className='fw-bold'>Inscription</h4>
          </div>
          <div className='d-flex'>
            <label className='col-3 bg-moyen text-white fw-bold text-end pe-2'>Nom d'utilisateur</label>
            <Field className='form-control'
            autoComplete='off'
            name="username" 
            placeholder="Nom d'utilisateur" />
          </div>
          <div className='d-flex'>
            <label className='col-3 bg-moyen text-white fw-bold text-end pe-2'>Email</label>
            <Field className='form-control'
            autoComplete='off'
            fieldType="email"
            name="email" 
            placeholder="Email" />
          </div>
          <div className='d-flex'>
            <label className='col-3 bg-moyen text-white fw-bold text-end pe-2'>Mot de passe</label>
           <Field className='form-control'
            autoComplete='off'
            type="password"
            name="password" 
            placeholder="Mot de passe" />
          </div>
            
            
            <div id='message' className='text-danger fw-bold text-center'>
             <ErrorMessage name="username" component='span' />
             <ErrorMessage name="email" component='span' />
             <ErrorMessage name="password" component='span' />
             </div>
            <button type='submit' className='btn btn-success btn-noradius fw-bold'>Valider</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Registration
