import React, { useEffect, useState } from 'react'
import { PropTypes } from 'prop-types';

const AppLoader = ({ status, children }) => {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status !== undefined)
      setIsLoading(status);
  }, [status]);

  return (
    <div id='loader' className={
      'container-fluid bg-dark text-white text-center' +
        isLoading ? 'py-2 px-2 py-md-3 px-md-5 mt-5 mt-md-0' : ''
    }
      data-bs-theme="dark"
    >
      <div className={!isLoading ? "d-none" : "d-flex justify-content-center align-items-center"}
        style={{ height: "calc(100vh - 129px)" }}>
        <div className="spinner-border">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className='ms-2 fs-5 fw-medium'>Loading...</span>
      </div>
      <div className={isLoading ? "d-none" : ''}>
        {children}
      </div>
    </div>
  )
}

AppLoader.propTypes = {
  status: PropTypes.bool,
  children: PropTypes.node
}

export default AppLoader
