import React from 'react'

const ProductCard = ({ product: { productId, name, image, price, discount, categoryId } }) => {
  return (
    <div className='text-decoration-none'>
      <div className='products-card'>
        <div key={productId} className="card p-1 p-sm-2 mb-3" >
          <img src={image}
            className="card-img-top rounded mx-auto mt-2 w-auto" height={"170px"} alt={name} />
          <div className="card-body mt-2 text-center p-2 pb-0" >
            <p className="card-title fw-medium text-wrap">
              {name.substr(0, name.indexOf('('))}
              <br />
              {name.substr(name.indexOf('('))}
            </p>
            <div className="card-text mb-0">
              <div className='d-flex justify-content-evenly align-items-center fw-bold mb-2'>
                <p className='mb-0 me-2'>₹{Math.trunc(price * (1 - discount / 100))}</p>
                <p className='text-decoration-line-through fw-normal mb-0 me-2' style={{ "fontSize": "15px" }}>₹{price}</p>
                <p className='mb-0' style={{ "fontSize": "12px" }}>{discount}% off</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
