import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../components/cart/CartItem';
import { clearAllItemsFromCart, fetchPreviousCart } from '../redux/slices/cartSlice';
import { Link } from 'react-router-dom';
import { getFormattedPrice} from '../util/appUtil';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartFinalAmount = useSelector((state) => state.cart.cartFinalAmount);
  const cartTotalPrice = useSelector((state) => state.cart.cartTotalPrice);
  const cartTotalQuantity = useSelector((state) => state.cart.cartTotalQuantity);
  const cartTotalDiscount = useSelector((state) => state.cart.cartTotalDiscount);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchPreviousCart(dispatch);
  }, [])

  return (
    <div id='cart' className="container d-flex flex-wrap flex-md-nowrap mx-auto px-0 
    justify-content-center align-items-stretch">
      <div className='container col-md- bg-secondary-subtle text-start rounded me-md-2'>
        <h1 className='text-center mt-3'>YOUR CART</h1>
        <hr />
        <div className="cartItems my-5 px-md-2 rounded">
          {
            cartItems.length > 0
              ? cartItems.map((cartItem) =>
                <CartItem key={cartItem.product.productId} cartItem={cartItem} />
              )
              : <div className='text-center mt-5 text-body h-100'>
                <h5>Your cart is empty!</h5>
                <Link to={'/products'}>
                  <button className='btn btn-light mt-3'>Continue Shopping</button>
                </Link>
              </div>
          }
        </div>
      </div >
      <div className='cart-options-section'>
        <div className='d-flex flex-wrap'>
          <div className='col-md-3 bg-secondary-subtle text-start rounded px-3 pt-3 mt-2 mt-md-0 col-12 col-md-12'>
            <div className="cart-summary">
              <h4 className='text-body pt-3 fs-5'>PRICE DETAILS</h4>
              <hr />
              <div className='d-flex justify-content-between align-content-center mx-2'>
                <p>Price ({cartTotalQuantity} item)</p>
                <p>₹{getFormattedPrice(cartTotalPrice)}</p>
              </div>
              <div className='d-flex justify-content-between mx-2'>
                <p>Discount</p>
                <p>₹{getFormattedPrice(Math.trunc(cartTotalDiscount))}</p>
              </div>
              <div className='d-flex justify-content-between mx-2'>
                <p>Delivery Charges</p>
                <p>
                  <span className='text-decoration-line-through'>₹
                    {
                      cartFinalAmount < 500
                        ? (cartFinalAmount === 0 ? 0 : 40)
                        : 40
                    }
                  </span>
                  <span className='ms-2'>Free</span>
                </p>
              </div>
              <hr className='my-2' />
              <div className='d-flex justify-content-between mx-2'>
                <p className='my-2'>Total Amount</p>
                <p className='my-2'>₹{getFormattedPrice(Math.trunc(cartFinalAmount))}</p>
              </div>
              <hr className='my-2' />
              <p className='mt-3 ms-1 text-body fw-bold'>You will save ₹{getFormattedPrice(Math.trunc(cartTotalDiscount))} on this order</p>
            </div>
          </div>
          <div className='col-12 mt-3 flex-fill'>
            <div className="btn btn-secondary text-white fs-5 fw-medium w-100 py-3">Proceed to Checkout
            </div>
            <div className="cart-buttons mt-3">
              <button className='btn btn-secondary text-white fs-5 fw-medium w-100 py-3'
                onClick={(event) => clearAllItemsFromCart(dispatch)}
              >Clear Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Cart
