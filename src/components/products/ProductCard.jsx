import React from 'react'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types';

const ProductCard = ({ product: { productId, name, image, price, discount } }) => {
  return (
    <Link to={`/products/${productId}`} className='text-decoration-none'>
      <div className='products-card' style={{ "width": "250px" }}>
        <div key={productId} className="card p-1 p-sm-2" >
          <img src={image}
            className="card-img-top rounded-3 mx-auto mt-2 object-fit-contain" height={"150px"} alt={name} />
          <div className="card-body mt-2 text-center p-2 pb-0 mx-2" >
            <p className="card-title fw-medium text-wrap">
              {name.length > 42 ? name.substr(0, 42) + "..." : name}
            </p>
            <div className="card-text mb-0">
              <div className='d-flex justify-content-evenly align-items-center mb-2 me-2'>
                <p className='mb-0 fw-medium me-2'>₹{Math.trunc(price * (1 - discount / 100))}</p>
                <p className='text-decoration-line-through fw-normal mb-0 me-2' style={{ "fontSize": "15px" }}>₹{price}</p>
                <p className='mb-0 text-nowrap' style={{ "fontSize": "14px" }}>{discount}% off</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard

ProductCard.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired
    // qtyInStock: PropTypes.number.isRequired
    // categoryId: PropTypes.number.isRequired
  }).isRequired
};