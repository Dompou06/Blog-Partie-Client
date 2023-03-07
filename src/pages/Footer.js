import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Footer() {
  let navigate = useNavigate()
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
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
      <div>
      <Link href="https://dpstudio.fr/" className='link text-light' onClick = {() => openInNewTab('https://dpstudio.fr/')}>© DPStudio 2023</Link>        
        </div>
    </div>
  )
}

export default Footer
