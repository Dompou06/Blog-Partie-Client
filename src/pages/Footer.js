import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='footer d-flex justify-content-between ps-4 pe-2 pt-2 bg-fonce text-light fw-mbold'>
        <Link to={`/help`} className='text-decoration-none text-light'>Aide</Link>
        <Link to={`/contact`} className='text-decoration-none text-light'>Contact</Link>
        <Link to={`/about`} className='text-decoration-none text-light'>A propos</Link>
        <Link to={`/legalnotice`} className='text-decoration-none text-light'>Mentions légales</Link>
      <div>© DPStudio 2023</div>
    </div>
  )
}

export default Footer
