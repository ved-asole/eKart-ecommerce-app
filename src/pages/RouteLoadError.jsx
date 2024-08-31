import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types';

const RouteLoadError = ({ message = "Sorry, the page is not available" }) => {

  useEffect(() => { }, [message])

  return (
    <div className='container bg-dark text-white text-center py-2 px-2 vh-100
      py-md-3 px-md-5 mt-5 mt-md-0 position-relative' data-bs-theme="dark">
      <div className='container-fluid bg-dark text-white text-center
          position-absolute top-50 start-50 translate-middle'
        data-bs-theme="dark">
        <h1 className='fs-1'>Oops!</h1>
        <p>{message}</p>
        <div>
          <Link to="/" className="btn btn-light">Go Back to Home</Link>
        </div>
      </div>
    </div>
  )
}

RouteLoadError.propTypes = {
  message: PropTypes.string
}

export default RouteLoadError
