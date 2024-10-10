import React, { useEffect, useState } from 'react'
import { getFormattedPrice } from '../../util/appUtil';

const OrderDetailsItem = ({ orderItem }) => {

  const [isMobileSize, setIsMobileSize] = useState(false)
  const product = orderItem.product;

  //choose the screen size 
  const handleResize = () => {
    // console.log("Order Item : handleResize : " + window.innerWidth);
    if (window.innerWidth < 400) setIsMobileSize(true);
    else setIsMobileSize(false);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [])

  return (
    <div key={product.productId}
      className='d-flex mb-4 mx-md-4 flex-column flex-sm-row justify-content-between 
      justify-content-md-evenly align-items-md-center gap-4 pb-4 border-bottom'>
      <div className='col-sm-4 mx-3 mx-md-0 text-center'>
        <img className='rounded-3' src={product.image} alt={product.name}
          height={isMobileSize < 768 ? "130px" : "460px"}
        />
      </div>
      <div className='col-sm-6 mt-1 mx-3 ps-4 mx-md-0'>
        <p className='text-wrap'>
          {product.name}
        </p>
        {/* <div className='d-flex justify-content-between'>
          <p>{product.name}</p> */}
        <p className='text-body-secondary text-sm'>Delivery by {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()} </p>
        {/* </div> */}
        <p>
          <span className='fs-md-5 fw-medium'>₹{getFormattedPrice(Math.trunc(product.price * (1 - product.discount / 100)))}</span>
          <span className='mx-2 text-body-secondary text-decoration-line-through'>{getFormattedPrice(product.price)}</span>
          <span className='fs-md-6 fw-normal'>{`${product.discount}% Off`}</span>
          {/* <button className='fw-medium ms-md-5 pt-4 pt-md-0 bg-transparent btn-primary border-0'>CANCEL</button> */}
        </p>
      </div>
    </div >
  )
}

export default OrderDetailsItem
