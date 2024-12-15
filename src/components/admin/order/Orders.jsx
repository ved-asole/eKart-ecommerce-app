import React, { useEffect, useState } from 'react'
import fetchData from '../../../util/DataFetcher.js'
import { getFormattedPrice } from '../../../util/appUtil.js'
import OrderDetailsModel from './OrderDetails.jsx'

const Orders = () => {

  const [orders, setOrders] = useState([])
  const [orderId, setOrderId] = useState(0)

  useEffect(() => {
    fetchData(
      "orders",
      (data) => {
        setOrders(data)
      },
      (errorMsg) => { console.log(errorMsg) },
      "orders"
    );
  }, [])

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

      <OrderDetailsModel orderId={orderId} />

    </div>
  )
}

export default Orders
