import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { showToast } from '../../util/appUtil';

const OrderItem = ({ orderItem, isLast }) => {

  const [isMobileSize, setIsMobileSize] = useState(false)
  const product = orderItem.product;

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 400) setIsMobileSize(true);
    else setIsMobileSize(false);
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [])

  return (
    <div key={product.productId}
      className={isLast ? 'd-flex mb-md-2 mt-3 mx-md-4 justify-content-between justify-content-md-evenly align-items-center pb-md-2' :
        'd-flex mb-md-2 mt-3 mx-md-4 justify-content-between justify-content-md-evenly align-items-center pb-md-2 border-bottom'}
    >
      <div className='col-3 col-md-3 mx-3 mx-md-0 text-center'>
        <img className='rounded-3' src={product.image} alt={product.name}
          height={isMobileSize < 400 ? "60px" : "200px"}
        />
      </div>
      <div className='col-md-9 col-md-7 ps-3 ms-3 mx-md-0'>
        <p className='text-wrap mb-2'>
          {product.name}
        </p>
        <div className="d-flex flex-wrap align-items-center">
          <p className='text-body-secondary mb-0 text-sm'>Delivery by {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()} </p>
          <p className='ms-sm-5 pt-3'>Quantity : {orderItem.quantity}</p>
          <button className='fw-medium ms-md-5 bg-transparent border-0'
            onClick={() => showToast('Please cancel whole order')}
          >CANCEL</button>
        </div>
      </div>
    </div >
  )
}

OrderItem.propTypes = {
  orderItem: PropTypes.shape({
    product: PropTypes.shape({
      productId: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  isLast: PropTypes.bool.isRequired
};

export default OrderItem