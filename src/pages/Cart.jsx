import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../components/cart/CartItem';
import { clearAllItemsFromCart, fetchPreviousCart } from '../redux/slices/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { getFormattedPrice, showToast } from '../util/appUtil';
import createCheckoutSession from '../util/payment';
import { useCookies } from 'react-cookie';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const cartFinalAmount = useSelector((state) => state.cart.cartFinalAmount);
  const cartTotalPrice = useSelector((state) => state.cart.cartTotalPrice);
  const cartTotalQuantity = useSelector((state) => state.cart.cartTotalQuantity);
  const cartTotalDiscount = useSelector((state) => state.cart.cartTotalDiscount);
  const [cookies] = useCookies([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPreviousCart(dispatch);
  }, [])

  const requestForCheckoutSession = () => {
    if (cookies['customerId'] != undefined) {
      createCheckoutSession(cookies['customerId'], cartItems);
    } else {
      showToast("Please login first");
      navigate('/auth');
    }
  }

  return (
    <div id='cart' className="container d-flex flex-wrap flex-column flex-lg-row flex-md-nowrap mx-auto px-0 
    justify-content-center align-items-stretch">
      <div className='container bg-secondary-subtle text-start rounded me-md-2'>
        <h1 className='text-center mt-3'>YOUR CART</h1>
        <hr />
        <div className="cartItems my-5 px-md-2 rounded overflow-auto"
          style={{
            "height": "calc(100vh - 300px)", "maxHeight": "100vh", "scrollbarWidth": "none"
          }}>
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
            <button className="btn btn-secondary text-white fs-5 fw-medium w-100 py-3"
              onClick={() => {
                if (cartItems.length != 0) requestForCheckoutSession();
                else showToast("Your cart is empty")
              }}
            >
              Proceed to Checkout
            </button>
            <div className="cart-buttons mt-3">
              <button className='btn btn-secondary text-white fs-5 fw-medium w-100 py-3'
                onClick={() => {
                  if (cartItems.length != 0) clearAllItemsFromCart(dispatch);
                  else showToast("Your cart is empty")
                }}
              >Clear Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Cart
