import React, { useEffect, useState } from 'react'
import { removeFromCart, updateCart } from '../../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { getFormattedPrice } from '../../util/appUtil';

const CartItem = ({ cartItem }) => {

  const dispatch = useDispatch();
  const [isMobileSize, setIsMobileSize] = useState(false)

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
      --tempCartItem.cartQuantity
      if (tempCartItem.cartQuantity < 1) dispatch(removeFromCart(tempCartItem));
      else {
        dispatch(updateCart(tempCartItem))
      }
      
    } else if (event.target.name === 'increaseCount') {
      ++tempCartItem.cartQuantity;
      dispatch(updateCart(tempCartItem))
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [])

  return (

    <div key={cartItem.productId}
      className='d-flex mb-4 mx-md-4 justify-content-between 
      justify-content-md-evenly align-items-center gap-4 pb-4 border-bottom'>
      <div className='col-4 col-md-6 mx-3 mx-md-0 text-center'>
        <img className='rounded-3' src={cartItem.image} alt={cartItem.name}
          height={isMobileSize < 768 ? "140px" : "560px"}
        />
      </div>
      <div className='col-md-6 mt-1 mx-3 mx-md-0'>
        <p>
          {cartItem.name}
        </p>
        {/* <div className='d-flex justify-content-between'>
          <p>{cartItem.name}</p>
          <p>Delivery by </p>
        </div> */}
        <p>
          <span className='fs-md-5 fw-medium'>₹{getFormattedPrice(Math.trunc(cartItem.price * (1 - cartItem.discount / 100)))}</span>
          <span className='mx-2 text-decoration-line-through'>{getFormattedPrice(cartItem.price)}</span>
          <span className='fs-md-6 fw-bold'>{`${cartItem.discount}% Off`}</span>
        </p>
        <div className="cart-count mt-3 d-inline-block">
          <button className='btn btn-dark px-3 py-1 rounded-start-2' name='decreaseCount'
            onClick={updateCountToAddToCart} disabled={cartItem.cartQuantity <= 1}
          >-</button>
          <span id='add-to-cart-count' className='p-2'>{cartItem.cartQuantity}</span>
          <button className='btn btn-dark px-3 py-1 rounded-end-2' name='increaseCount'
            onClick={updateCountToAddToCart}
          >+</button>
          <button className='fw-medium ms-md-5 pt-4 bg-transparent border-0'
            onClick={(event) => dispatch(removeFromCart(cartItem))}>REMOVE</button>
        </div>
      </div>
    </div >
  )
}

export default CartItem
