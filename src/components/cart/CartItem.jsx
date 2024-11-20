import React, { useEffect, useState } from 'react'
import { processRemoveFromCart, updateItemInCart } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { getFormattedPrice } from '../../util/appUtil';
import PropTypes from 'prop-types';

const CartItem = ({ cartItem }) => {

  const dispatch = useDispatch();
  const [isMobileSize, setIsMobileSize] = useState(false)

  const product = cartItem.product;

  //choose the screen size 
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobileSize(true)
    } else {
      setIsMobileSize(false)
    }
  }

  const updateCountToAddToCart = (event) => {
    let tempCartItem = { ...cartItem };
    if (event.target.name === 'decreaseCount') {
      --tempCartItem.quantity
      if (tempCartItem.quantity < 1) {
        processRemoveFromCart(dispatch, cartItem);
      }
      else {
        updateItemInCart(dispatch, tempCartItem);
      }
      cartItem = tempCartItem;
    } else if (event.target.name === 'increaseCount') {
      ++tempCartItem.quantity;
      updateItemInCart(dispatch, tempCartItem);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [])

  return (

    <div key={product.productId}
      className='d-flex mb-sm-4 mx-md-4 flex-column flex-md-row justify-content-between 
      justify-content-md-evenly align-items-center gap-4 pb-4 border-bottom pt-5 pt-sm-0'>
      <div className='col-sm-4 mx-3 mx-md-0 text-center'>
        <img className='rounded-3' src={product.image} alt={product.name}
          height={isMobileSize < 768 ? "130px" : "460px"}
        />
      </div>
      <div className='col-10 text-center text-md-start col-md-6 mt-1 mx-3 mx-md-0'>
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
        </p>
        <div className="cart-count d-inline-block">
          <button className='btn btn-dark px-3 py-1 rounded-start-2' name='decreaseCount'
            onClick={updateCountToAddToCart} disabled={cartItem.quantity < 1}
          >-</button>
          <span id='add-to-cart-count' className='p-2'>{cartItem.quantity}</span>
          <button className='btn btn-dark px-3 py-1 rounded-end-2' name='increaseCount'
            onClick={updateCountToAddToCart}
          >+</button>
          <button className='fw-medium ms-5 pt-4 bg-transparent border-0'
            onClick={(event) => processRemoveFromCart(dispatch, cartItem)}>REMOVE</button>
        </div>
      </div>
    </div >
  )
}

export default CartItem

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    product: PropTypes.shape({
      productId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discount: PropTypes.number.isRequired,
      categoryId: PropTypes.number.isRequired
    }),
    quantity: PropTypes.number.isRequired
  }).isRequired,
};