import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFormattedPrice } from '../../../util/appUtil.js'
import { fetchAllOrders } from '../../../redux/slices/orderSlice.js';
const OrderDetailsModel = lazy(() => import('./OrderDetails.jsx'))
const Pagination = lazy(() => import('../../products/Pagination.jsx'))

const Orders = () => {

  const orders = useSelector((state) => state.orders.orders);
  const [orderId, setOrderId] = useState(0);
  const page = useSelector((state) => state.orders.page);
  const size = useSelector((state) => state.orders.size);
  const totalElements = useSelector((state) => state.orders.totalElements);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (currentPage >= 0 || currentPage != page) {
      let pageNum = currentPage > 0 ? currentPage - 1 : currentPage;
      fetchAllOrders(pageNum, 10, "orderId", "asc", dispatch, navigate);
    }
  }, [currentPage, page]);

  return (
    <div>
      <section id="orders-section" className="mt-2">
        <h3>Orders</h3>
        <div className="table-responsive mt-4">
          <table className="table table-striped table-hover text-start">
            <thead className='align-middle'>
              <tr>
                <th className="w-10">ID</th>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Total</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className='table-group-divider align-middle text-start'>
              {
                orders?.map(order => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.customer.firstName + " " + order.customer.lastName}</td>
                    <td>{order.customer.email}</td>
                    <td>{getFormattedPrice(order.total)}</td>
                    <td className='text-nowrap'>{String(order.orderStatus).replaceAll('_', ' ')}</td>
                    {/* <td>{category?.parentCategory?.categoryId}</td> */}
                    <td className='textwrap-no'>
                      <button className="btn btn-outline-secondary me-2 me-xxl-2 mb-2 mb-lg-0"
                        data-bs-toggle="modal" data-bs-target="#orderDetailsModal"
                        onClick={() => setOrderId(order.orderId)}
                      >Details</button>
                      <button className="btn btn-outline-danger">Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </section>

      <div id="pagination">
        <Pagination
          currentPage={currentPage == 0 ? 1 : currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={size}
          totalItems={totalElements}
        />
      </div>

      <OrderDetailsModel orderId={orderId} />

    </div>
  )
}

export default Orders
