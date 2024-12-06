import React, { lazy } from 'react'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
const Header = lazy(() => import('../components/common/Header.jsx'));

const ErrorPage = () => {

  const error = useRouteError();
  console.error(error);
  if (isRouteErrorResponse(error)) {
    return (
      <div className='container-fluid bg-dark text-white text-center py-2 px-2 
      py-md-3 px-md-5 mt-5 mt-md-0' data-bs-theme="dark">
        <Header />
        <div className='container-fluid bg-dark text-white text-center
          position-absolute top-50 start-50 translate-middle'
          data-bs-theme="dark">
          <h1 className='fs-1'>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <p className='text-secondary'>
            <i>{error.statusText || error.message}</i>
          </p>
          <div>
            <a href="/" className="btn btn-light">Go Back to Home</a>
          </div>
        </div>
      </div>

    );
  } else {
    return (
      <div className='container-fluid bg-dark text-white text-center py-2 px-2 
      py-md-3 px-md-5 mt-5 mt-md-0' data-bs-theme="dark">
        <Header />
        <div className='container-fluid bg-dark text-white text-center
          position-absolute top-50 start-50 translate-middle'
          data-bs-theme="dark">
          <h1 className='fs-1'>Oops!</h1>
          <p>Sorry, an unexpected error has occurred.</p>
          <div>
            <a href="/" className="btn btn-light">Go Back to Home</a>
          </div>
        </div>
      </div>
    )
  }
}

export default ErrorPage
