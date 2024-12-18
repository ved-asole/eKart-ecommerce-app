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
  const page = useSelector((state) => state.orders.page);
  const [currentPage, setCurrentPage] = useState(0);
  const size = 5;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentPage >= 0 || currentPage != page) {
      let pageNum = currentPage > 0 ? currentPage - 1 : currentPage;
      fetchAllOrders(pageNum, size, "orderId", "desc", dispatch, navigate);
    }
  }, [currentPage, page]);


  return (
    <div id='orders' className="container d-flex flex-wrap flex-md-nowrap mx-auto px-0
    justify-content-center align-items-stretch">
      <div className='container bg-secondary-subtle text-start rounded me-md-2'>
        <h1 className='text-center mt-3'>YOUR ORDERS</h1>
        <hr className='border-5 mx-4' />
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
        <div id="pagination">
          <Pagination
            currentPage={currentPage == 0 ? 1 : currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={size}
            totalItems={totalElements}
          />
        </div>
      </div >
    </div >
  )
}

export default Orders