import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import fetchData, { updateData } from '../../../util/DataFetcher.js';
import { getFormattedPrice, showToast } from '../../../util/appUtil.js';

const OrderDetailsModel = ({ orderId }) => {

  const [order, setOrder] = useState({});
  const { register, handleSubmit, reset, formState } = useForm({});
  const { errors, isSubmitting, isSubmitted, isSubmitSuccessful } = formState;

  useEffect(() => {
    if (orderId !== 0 && orderId !== order.orderId) {
      reset({
        orderId: '',
        customerId: 0,
        customerName: '',
        email: '',
        total: 0,
        discount: '0',
        noOfItems: 0,
        orderStatus: '',
        createdAt: ''
      });
      fetchData(
        `orders/${orderId}`,
        (data) => {
          data.discount = data.orderItems.reduce(
            (acc, orderItem) => {
              let discountAmount = orderItem.product.price * orderItem.product.discount / 100;
              return acc + discountAmount * orderItem.quantity
            }, 0
          ) || 0;
          data.discount = getFormattedPrice(data.discount);
          data.noOfItems = data.orderItems.reduce(
            (acc, orderItem) => acc + orderItem.quantity, 0
          );
          data.total = getFormattedPrice(data.total);
          data.createdAt = data.createdAt.replaceAll('T', ' ')
          setOrder(data);
          reset({
            orderId: data.orderId,
            customerId: data.customer.customerId,
            customerName: data.customer.firstName + " " + data.customer.lastName,
            email: data.customer.email,
            total: data.total,
            noOfItems: data.noOfItems,
            discount: data.discount,
            orderStatus: String(data.orderStatus).replaceAll('_', ' '),
            createdAt: data.createdAt
          });
        },
        (errorMsg) => console.log(errorMsg)
      );
    }
  }, [orderId, order])

  const onSubmit = (data) => {
    updateData(
      `orders/${orderId}`,
      data,
      (data) => {
        setProduct(data);
        reset({
          name: data.name,
          total: data.total,
          desc: data.desc,
          image: data.image,
          discount: '0',
          qtyInStock: data.qtyInStock,
          orderId: data.orderId,
          orderStatus: String(data.orderStatus).replaceAll('_', ' ')
        });
        showToast("Order updated successfully");
      },
      (error) => {
        showToast("Unable to update order");
        console.log(error);
      }
    )
  }

  return (
    <div className="modal fade" id="orderDetailsModal" tabIndex="-1" aria-labelledby="orderDetailsModalLabel">
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="orderDetailsModalLabel">Order Details</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form id='orderForm' className='mb-2' onSubmit={handleSubmit(onSubmit, (data) => {
              console.log(data)
            })}>
              <div className="row">
                <div className="form-floating col-6 col-lg-3 mt-4">
                  <input type="number" className={"form-control" + (errors.orderId ? ' is-invalid' : '')} id="orderId" placeholder="Order Id" required
                    defaultValue={order.orderId} disabled
                    {...register("orderId", {
                      required: 'Order Id should not be empty',
                      min: {
                        value: 1,
                        message: 'Order Id should be greater than 0'
                      }
                    })}
                  />
                  <label className='ms-2 mb-1' htmlFor="orderId">Order Id</label>
                  {/* <div className="form-text text-start">Should be greater than 0</div> */}
                  {errors.orderId && <div className="text-danger form-text text-start mt-1">{errors.orderId.message}</div>}
                </div>
                <div className="form-floating col-6 col-lg-3 mt-4">
                  <input type="number" className={"form-control" + (errors.customerId ? ' is-invalid' : '')} id="customerId" placeholder="Customer Id" required
                    defaultValue={order.customerId} disabled
                    {...register("customerId", {
                      required: 'Customer Id should not be empty',
                      min: {
                        value: 1,
                        message: 'Customer Id should be greater than 0'
                      }
                    })}
                  />
                  <label className='ms-2 mb-1' htmlFor="customerId">Customer Id</label>
                  {/* <div className="form-text text-start">Should be greater than 0</div> */}
                  {errors.customerId && <div className="text-danger form-text text-start mt-1">{errors.customerId.message}</div>}
                </div>
                <div className="form-floating col-6 col-lg-3 mt-4">
                  <input type="text" className={"form-control" + (errors.customerName ? ' is-invalid' : '')}
                    id="customerName" placeholder="Customer Name" required
                    defaultValue={order?.customer?.firstName + " " + order?.customer?.lastName} disabled
                    {...register("customerName", {
                      required: 'Customer Name should not be empty',
                      minLength: {
                        value: 3,
                        message: 'Customer Name should have at least 3 characters'
                      },
                      maxLength: {
                        value: 50,
                        message: 'Customer Name should have at most 50 characters'
                      },
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: 'Customer Name should only contain alphabets'
                      }
                    })}
                  />
                  <label className='ms-2 mb-1' htmlFor="customerName">Customer Name</label>
                  {/* <div className="form-text text-start">Should be a valid name</div> */}
                  {errors.customerName && <div className="text-danger form-text text-start mt-1">{errors.customerName.message}</div>}
                </div>
                <div className="form-floating col-6 col-lg-3 mt-4">
                  <input type="text" className={"form-control" + (errors.orderStatus ? ' is-invalid' : '')}
                    id="orderStatus" placeholder="Order Status" required disabled
                    {...register("orderStatus", {
                      required: 'Order status should not be empty'
                    })}
                  />
                  <label className='ms-2 mb-1' htmlFor="orderStatus">Order Status</label>
                  {/* <div className="form-text text-start">Should be a valid name</div> */}
                  {errors.orderStatus && <div className="text-danger form-text text-start mt-1">{errors.orderStatus.message}</div>}
                </div>
              </div>
              <div className="row">
                <div className="form-floating col-lg-6 col-xl-3 mt-4">
                  <div className="input-group align-items-center mb-3">
                    <label className='me-3' htmlFor="total">Total : </label>
                    <span className="input-group-text" id="rupees">₹</span>
                    <input type="text" className={"form-control" + (errors.total ? ' is-invalid' : '')}
                      id="total" placeholder="Total" aria-describedby="rupees" required
                      defaultValue={getFormattedPrice(order.total)} disabled
                      {...register("total", {
                        required: 'Total should not be empty',
                        // min: {
                        //   value: 1,
                        //   message: 'Total should be greater than 0'
                        // }
                      })}
                    />
                  </div>
                  {/* <div className="form-text text-start">Should be greater than 0</div> */}
                  {errors.total && <div className="text-danger form-text text-start mt-1">{errors.total.message}</div>}
                </div>
                <div className="form-floating col-lg-6 col-xl-3 mt-4">
                  <div className="input-group align-items-center mb-3">
                    <label className='me-3' htmlFor="discount">Discount : </label>
                    <span className="input-group-text" id="rupees">₹</span>
                    <input type="text" className={"form-control" + (errors.discount ? ' is-invalid' : '')}
                      id="discount" placeholder="Discount" aria-describedby="rupees" required
                      defaultValue={order.discount} disabled
                      {...register("discount", {
                        required: 'Discount should not be empty',
                        // min: {
                        //   value: 1,
                        //   message: 'Discount should be greater than 0'
                        // }
                      })}
                    />
                  </div>
                  {/* <div className="form-text text-start">Should be greater than 0</div> */}
                  {errors.discount && <div className="text-danger form-text text-start mt-1">{errors.discount.message}</div>}
                </div>
                <div className="form-floating col-lg-6 col-xl-2 mt-4">
                  <div className="input-group align-items-center mb-3">
                    <label className='me-3' htmlFor="noOfItems">No. of Items : </label>
                    <input type="number" className={"form-control pe-0" + (errors.noOfItems ? ' is-invalid' : '')}
                      id="noOfItems" placeholder="Number Of Items" required
                      defaultValue={order.noOfItems} disabled
                      {...register("noOfItems", {
                        required: 'Number of items should not be empty',
                        min: {
                          value: 1,
                          message: 'Number of items should be greater than 0'
                        }
                      })}
                    />
                  </div>
                  {errors.noOfItems && <div className="text-danger form-text text-start mt-1">{errors.noOfItems.message}</div>}
                </div>
                <div className="form-floating col-lg-6 col-xl-4 mt-4">
                  <div className="input-group align-items-center mb-3">
                    <label className='me-3' htmlFor="createdAt">Order Date : </label>
                    <span className="input-group-text" id="rupees">₹</span>
                    <input type="text" className={"form-control" + (errors.createdAt ? ' is-invalid' : '')}
                      id="createdAt" placeholder="Total" aria-describedby="rupees" required
                      defaultValue={order.createdAt} disabled
                      {...register("createdAt", {
                        required: 'CreatedAt should not be empty',
                        valueAsDate: {
                          value: new Date(order.createdAt),
                          message: 'CreatedAt should be a valid date'
                        }
                      })}
                    />
                  </div>
                  {/* <div className="form-text text-start">Should be greater than 0</div> */}
                  {errors.createdAt && <div className="text-danger form-text text-start mt-1">{errors.createdAt.message}</div>}
                </div>
              </div>
              <section id="order-details-section" className="mt-2">
                <h3>Orders Details</h3>
                <div className="table-responsive mt-4">
                  <table className="table table-striped table-hover align-middle">
                    <thead className="align-middle">
                      <tr>
                        <th className="w-10">ID</th>
                        <th className='w-25'>Product Name</th>
                        <th>ProductId</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Quantity</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className='table-group-divider align-middle'>
                      {
                        order?.orderItems?.map(orderItem => (
                          <tr key={orderItem.orderItemId}>
                            <td>{orderItem.orderItemId}</td>
                            <td className="text-start w-25">{orderItem.product.name}</td>
                            <td>{orderItem.product.productId}</td>
                            <td>₹ {getFormattedPrice(Math.trunc(orderItem.product.price * (1 - orderItem.product.discount / 100)))}</td>
                            <td>₹ {getFormattedPrice(orderItem.product.price * orderItem.product.discount / 100)}</td>
                            <td>{orderItem.quantity}</td>
                            <td className="">
                              <button className="btn btn-outline-secondary me-2 me-xxl-2 mb-2 mb-lg-0"
                                data-bs-toggle="modal" data-bs-target="#orderDetailsModal"
                              // onClick={() => setOrder(order.orderId)}
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
              <button className="btn btn-light py-2 mt-4 mb-5 mb-md-0" type="submit"
                disabled={isSubmitting || isSubmitted || isSubmitSuccessful}
                data-bs-dismiss="modal"
              // onClick={handleSubmit(onSubmit)}
              >
                {isSubmitting || isSubmitted || isSubmitSuccessful ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : null}
                {isSubmitting || isSubmitted || isSubmitSuccessful ? <output className='ms-1'>Updating order...</output> : "Update Order"}
              </button>
            </form>
          </div>
        </div>
      </div >
    </div >
  )
}

OrderDetailsModel.propTypes = {
  orderId: PropTypes.number.isRequired
}

export default OrderDetailsModel