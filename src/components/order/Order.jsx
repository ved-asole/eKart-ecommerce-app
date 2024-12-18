import React, { lazy } from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types';
import { getFormattedPrice } from '../../util/appUtil.js'
const OrderItem = lazy(() => import('./OrderItem.jsx'));

const Order = ({ order }) => {

  return (
    <div className='border-bottom border-4 mt-3 p-2'>
      <div className="d-flex flex-wrap mb-3 pb-2 justify-content-around justify-content-md-evenly fw-medium">
        <p className='ps-md-5 mb-0 text-start'>Order #{order.orderId}</p>
        <p className='text-end mb-0'>Total: ${getFormattedPrice(order.total)}</p>
        <p className='text-end mb-0'>Status: {order.orderStatus.replace('_', ' ')}</p>
        <p className='mb-0'>
          <Link className='link-secondary' to={`/orders/${order.orderId}`}>Order Details</Link>
        </p>
      </div>
      <div id="order-details d-flex flex-column">
        {
          order.orderItems.map((orderItem) =>
            <OrderItem key={orderItem.orderItemId} orderItem={orderItem} isLast={order.orderItems[order.orderItems.length - 1].orderItemId === orderItem.orderItemId} />
          )
        }
      </div>
    </div >
  )
}

Order.propTypes = {
  order: PropTypes.shape({
    orderId: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    orderStatus: PropTypes.string.isRequired,
    orderItems: PropTypes.arrayOf(PropTypes.shape({
      orderItemId: PropTypes.number.isRequired,
      product: PropTypes.shape({
        productId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired
      }).isRequired,
    })).isRequired
  }).isRequired
}

export default Order
