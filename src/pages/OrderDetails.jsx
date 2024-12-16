import React, { lazy, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetchData, { updateData } from '../util/DataFetcher.js';
import { getFormattedPrice, showToast } from '../util/appUtil.js';
const OrderDetailsItem = lazy(() => import('../components/order/OrderDetailsItem.jsx'));
const AppLoader = lazy(() => import('../components/common/AppLoader.jsx'));

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [totalItems, setTotalItems] = useState();
  const [discount, setDiscount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchData(
      `orders/${orderId}`,
      (data) => {
        calculateTotalItemsAndDiscount(data);
        setOrder(data)
        setIsLoading(false);
      },
      (errorMsg) => {
        console.log(errorMsg);
        setIsLoading(false);
      }
    )
  }, []);

  const calculateTotalItemsAndDiscount = (order) => {
    let total = 0;
    let discount = 0;
    order.orderItems.forEach((item) => {
      total += item.quantity;
      discount += item.quantity * item.product.price * item.product.discount / 100;
    });
    setTotalItems(total);
    setDiscount(Math.round(discount));
  }

  const cancelOrder = () => {
    // TODO: implement confirm dialog
    setIsLoading(true);
    order.orderStatus = "ORDER_CANCELLED";
    delete order._links;
    updateData(
      `orders/${orderId}`,
      order,
      (data) => {
        showToast('Order Cancelled');
        setOrder(data);
        calculateTotalItemsAndDiscount(data);
      },
      (error) => console.log(error)
    )
    setIsLoading(false);
  }

  return (
    <div id='orders' className="container d-flex flex-column flex-wrap flex-md-nowrap mx-auto px-0
    justify-content-center align-items-stretch">
      <div className='container bg-secondary-subtle text-start rounded me-md-2 mb-2 pb-2'>
        <h1 className='text-center mt-3'>ORDER DETAILS</h1>
        {
          isLoading ? <AppLoader status={true} /> :
            <div className='p-2 d-flex lh-lg gap-md-1 flex-wrap justify-content- justify-content-md-evenly'>
              <p className='col-6 col-md-3 d-inline-block text-start mb-0'>
                <span className='fw-bold text-body-secondary fs-6'>Order Id : </span>
                <span className="fw-medium text-secondary">{order.orderId}</span>
              </p>
              <p className='col-6 col-md-3 d-inline-block text-start mb-0'>
                <span className='fw-bold text-body-secondary fs-6'>Items: </span>
                <span className="fw-medium text-secondary">{totalItems}</span>
              </p>
              <p className='col-6 col-md-3 d-inline-block text-start mb-0'>
                <span className='fw-bold text-body-secondary text-body-secondary text-body-secondary fs-6'>Date: </span>
                <span className="fw-medium text-secondary">{order?.createdAt?.substring(0, 10)}</span>
              </p>
              <p className='col-6 col-md-3 d-inline-block text-start mb-0'>
                <span className='fw-bold text-body-secondary text-body-secondary fs-6'>Total: </span>
                <span className="fw-medium text-secondary">${getFormattedPrice(order.total)}</span>
              </p>
              <p className='col-6 col-md-3 d-inline-block text-start mb-0'>
                <span className='fw-bold text-body-secondary text-body-secondary fs-6'>Total: </span>
                <span className="fw-medium text-secondary">${getFormattedPrice(order.total)}</span>
              </p>
              <p className='col-6 col-md-3 d-inline-block text-start mb-0'>
                <span className='fw-bold text-body-secondary text-body-secondary fs-6'>Saved: </span>

                <span className="fw-medium text-secondary">${getFormattedPrice(discount)}</span>
              </p>
              <p className='col-12 col-md-3 d-inline-block text-start mb-0'>
                <span className='fw-bold text-body-secondary fs-6'>Delivery by: </span>
                <span className="fw-medium text-secondary">{new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
              </p>
              <p className='col-12 col-md-3 d-inline-block text-md-start mb-0'>
                <span className='fw-bold text-body-secondary fs-6'>Status: </span>
                <span className="fw-medium text-secondary">{order?.orderStatus?.replace('_', ' ')}</span>
              </p>
              <p className='col-12 col-md-3 d-inline-block text-center text-md-start mb-0'>
                <button className='btn fw-medium pt-4 px-0 pt-md-0 text-body-secondary link-light border-0'
                  onClick={cancelOrder}
                >CANCEL ORDER</button>
              </p>
            </div >
        }
      </div >
      <div className='container bg-secondary-subtle text-start rounded me-md-2'>
        <div id="order-details" className="mt-3 p-2 d-flex flex-column">
          {
            order?.orderItems?.map((orderItem) =>
              <OrderDetailsItem key={orderItem.orderItemId} orderItem={orderItem} />
            )
          }
        </div>
      </div >
    </div >
  )
}

export default OrderDetails
