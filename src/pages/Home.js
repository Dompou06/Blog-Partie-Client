import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Pagination from './Pagination'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faMessage } from '@fortawesome/free-solid-svg-icons'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'

function Home() {
  let navigate = useNavigate()
    const [listOfPosts, setListOfPosts] = useState([])
   // const [pagination, setPagination] = useState(0)
    //const [currentPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(4)
    //const [postsPerPage, setpostsPerPage] = useState(4)
   
  useEffect(() => {
        axios.get('http://localhost:3001/posts')
    .then(response => {
     // console.log(response.data)
     
      let lOP = response.data
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      lOP.forEach(post => {
post.created = new Date(post.createdAt).toLocaleDateString('fr-FR', options)
      })   
      setListOfPosts(lOP)
    })
  },[])
 const indexOfLastPost = currentPage * postsPerPage
 const indexOfFirstPost = indexOfLastPost - postsPerPage
 const currentPosts = listOfPosts.slice(indexOfFirstPost, indexOfLastPost)
const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className='container-home d-flex flex-column'>
      <div className='mb-auto d-flex flex-column justify-content-start posts'>
        {currentPosts.map((post, key) => {
        return <div 
        className='d-flex flex-column box-shadow bg-body rounded mb-3' 
        key={key}>
         <Link to={`/post/${post.id}`} className='link bg-moyen text-white text-center fw-bold'>
          {post.title}</Link>
         <Link to={`/post/${post.id}`} className='link text-dark border-start border-end border-moyen p-2 d-flex'>
          <div className='flex-fill text-start text-truncate pe-2'>
            {post.postText}
            </div>
        {post.Comments.length != 0 && <div className="position-relative p-0 pe-1 text-moyen">
        <FontAwesomeIcon icon={faMessage} />
  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-clair">
  {post.Comments.length}
  </span>
</div>}
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
        </div>
        </div>
        </div>
          
      })}
      </div>
     <Pagination
        total={listOfPosts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        paginate={paginate} 
        />
    </div>
  )
}

export default Home
