import React, { useState } from 'react'
import ProductCard from '../components/products/ProductCard'
import Filters from '../components/products/Filters'
import Pagination from '../components/products/Pagination';

const Products = () => {

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(16);

  const getFilteredProducts = () => filteredProducts;

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
      <div className='ms-1 mx-2'>
        <div className="d-flex">
          <div className="col-3 col-xl-2 pt-3 d-none d-lg-block">
            <Filters getFilteredProducts={getFilteredProducts} setFilteredProducts={setFilteredProducts} />
          </div>
          <div className='vr d-none d-lg-block'></div>
          <div className='ps-lg-2 pt-2'>
            {
              filteredProducts.length === 0
                ?
                <h3 className='text-center'>No Products Found</h3>
                :
                <div className="d-flex flex-wrap justify-content-center ms-lg-3 gap-2">
                  {
                    currentProducts.map((product) =>
                      <ProductCard key={product.productId} product={product} />
                    )
                  }{
                    filteredProducts.length > productsPerPage
                      ? <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} productsPerPage={productsPerPage} totalProducts={filteredProducts.length} />
                      : ''
                  }
                </div>

            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default Products