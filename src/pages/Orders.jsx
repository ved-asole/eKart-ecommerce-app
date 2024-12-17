import React, { lazy, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchAllOrders } from '../redux/slices/orderSlice.js';
const Order = lazy(() => import('../components/order/Order.jsx'));
const AppLoader = lazy(() => import('../components/common/AppLoader.jsx'));
const Pagination = lazy(() => import('../components/products/Pagination.jsx'));

const Orders = () => {
  const orders = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.loading);
  const totalElements = useSelector((state) => state.orders.totalElements);
  const [page, setPage] = useState(0);
  const size = 5;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllOrders(page, size, "orderId", "asc", dispatch, navigate);
  }, [])


  return (
    <div id='orders' className="container d-flex flex-wrap flex-md-nowrap mx-auto px-0
    justify-content-center align-items-stretch">
      <div className='container bg-secondary-subtle text-start rounded me-md-2'>
        <h1 className='text-center mt-3'>YOUR ORDERS</h1>
        <hr />
        {loading ? <AppLoader status={true} /> :
          <div id='orders' className="mb-5 mt-3 px-md-2 rounded">
            {
              orders.length > 0
                ? orders.map((order) =>
                  <Order key={order.orderId} order={order} />
                )
                : <div className='text-center mt-5 text-body h-100'>
                  <h5>No orders found!</h5>
                  <Link to={'/products'}>
                    <button className='btn btn-light mt-3'>Continue Shopping</button>
                  </Link>
                </div>
            }
          </div>
        }
        {
          orders.length > 5 &&
          <Pagination currentPage={1} setCurrentPage={setPage} productsPerPage={5} totalProducts={totalElements} />
        }
      </div >
    </div >
  )
}

export default Orders