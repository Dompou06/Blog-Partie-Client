import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonDigging, faFaceSurprise } from '@fortawesome/free-solid-svg-icons'

function Error() {
    const location = useLocation()
    //console.log(location.state)
    const [message, setMessage] = useState('Erreur')
    useEffect(() => {
        if(location.state) {
            setMessage(location.state)
        } 
    })
    return (
        <div>
            <div className='text-secondary text-center fs-max'>
                {message === 'En construction' ?
        <FontAwesomeIcon icon={faPersonDigging} /> 
        : <FontAwesomeIcon icon={faFaceSurprise} />
        }</div>
        <div className='text-center fw-bold fs-2'>
        {message}
        </div>
        </div>
    )
}

export default Error