import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux';

const AppLoader = ({ status, children }) => {

  const [isLoading, setIsLoading] = useState(false);
  // const categoriesLoading = useSelector(state => state.categories.loading);
  // const productsLoading = useSelector(state => state.products.loading);
  // const cartLoading = useSelector(state => state.cart.loading);

  useEffect(() => {
    // console.log("isLoading : " + status);
    if (status !== undefined)
      setIsLoading(status
        // || categoriesLoading || productsLoading || cartLoading
      );
  }, [status
    // , categoriesLoading, productsLoading, cartLoading
  ]);

  return (
    // <div id='loader' className='container bg-body-secondary rounded bg-opacity-75'>
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

export default AppLoader
