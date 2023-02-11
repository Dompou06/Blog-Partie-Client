import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer() {
  let navigate = useNavigate()
  return (
    <div className='footer d-flex justify-content-between ps-4 pe-2 pt-2 bg-fonce text-light fw-mbold'>
        <div className='text-decoration-none text-light'
        onClick={() => {
          navigate('/help', {state: 'En construction'})
         }}>Aide</div>
        <div className='text-decoration-none text-light'
        onClick={() => {
          navigate('/contact', {state: 'En construction'})
         }}
        >Contact</div>
        <div className='text-decoration-none text-light'
        onClick={() => {
          navigate('/about', {state: 'En construction'})
         }}>A propos</div>
        <div className='text-decoration-none text-light'
        onClick={() => {
          navigate('/legalnotice', {state: 'En construction'})
         }}>Mentions légales</div>
      <div>© DPStudio 2023</div>
    </div>
  )
}

export default Footer
