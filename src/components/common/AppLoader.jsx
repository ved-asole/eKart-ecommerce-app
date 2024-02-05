import React from 'react'

const AppLoader = () => {
  return (
    // <div id='loader' className='container bg-body-secondary rounded bg-opacity-75'>
    <div id='loader' className='container-fluid bg-dark text-white text-center py-2 px-2 py-md-3 px-md-5 mt-5 mt-md-0' data-bs-theme="dark">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className='ms-2 fs-5 fw-medium'>Loading...</span>
      </div>
    </div>
  )
}

export default AppLoader
