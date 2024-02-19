import React, { useState } from 'react'
import ProductCard from '../components/Products/ProductCard'
import Filters from '../components/common/Filters'
import Pagination from '../components/Products/Pagination';

const Products = () => {

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(15);

  //Get current products 
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className='container bg-secondary-subtle text-start rounded p-3 px-3'>
      <div>
        <h1 className='fs-1'>All Products : </h1>
        <p>We have all categories of products for you. </p>
      </div>
      <hr className='mt-3 mb-2' />
      <div className='mx-2'>
        <div className="d-flex">
          <div className="col-2 border-end pt-3 d-none d-lg-block ms-1">
            <Filters setFilteredProducts={setFilteredProducts} />
          </div>
          <div className='vr d-none d-lg-block'></div>
          <div className='ps-lg-2 pt-2'>
            <div className="d-flex flex-wrap justify-content-center justify-content-md-between ms-lg-2">
              {
                currentProducts.map((product) =>
                  <ProductCard key={product.productId} product={product} />
                )
              }
            </div>
            <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} productsPerPage={productsPerPage} totalProducts={filteredProducts.length} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
