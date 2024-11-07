import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { clearAllItemsFromCart } from '../redux/slices/cartSlice';

const PaymentConfirmation = () => {
  let [searchParams] = useSearchParams();
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [orderId, setOrderId] = useState("");
  const [clientReferenceId, setClientReferenceId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      searchParams.size == 4 &&
      searchParams.get("success") &&
      searchParams.get("session_id") &&
      searchParams.get("order_id") &&
      searchParams.get("client_reference_id")
    ) {
      setStatus("Order Placed!");
      setMessage("You will receive an email confirmation.");
      setOrderId(searchParams.get("order_id"));
      setClientReferenceId(searchParams.get("client_reference_id"));
      clearAllItemsFromCart(dispatch);
    } else if (
      searchParams.size >= 2 && searchParams.size <= 4 &&
      searchParams.get("canceled") &&
      searchParams.get("session_id")
    ) {
      setStatus("Order Canceled");
      setMessage(
        "Continue to shop around and checkout when you're ready."
      );
    } else {
      searchParams.forEach((value, key) => {
        console.log("key : " + key + " value : " + value);
      });
      navigate("/routeLoadError");
    }
  }, []);

  return (
    <div className='container bg-dark text-white text-center py-2 px-2 vh-100
      py-md-3 px-md-5 mt-5 mt-md-0 position-relative' data-bs-theme="dark">
      <div className='container-fluid bg-dark text-white text-center
          position-absolute top-50 start-50 translate-middle'
        data-bs-theme="dark">
        <h1 className='fs-1'>{status}</h1>
        <p>{message}</p>
        {orderId && clientReferenceId && <p><b>Order Id :</b> {orderId}, <b>Transaction Reference :</b> {clientReferenceId}</p>}
        <div>
          <Link to="/" className="btn btn-light">Continue Shopping</Link>
        </div>
      </div>
    </div>
  )
}

export default PaymentConfirmation
