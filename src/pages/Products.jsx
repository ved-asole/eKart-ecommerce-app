import React, { lazy, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
const ProductCard = lazy(() => import('../components/products/ProductCard.jsx'));
const Filters = lazy(() => import('../components/products/Filters.jsx'));
const Pagination = lazy(() => import('../components/products/Pagination.jsx'));

const Products = () => {
  const [searchParams] = useSearchParams({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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
          <div className="col-3 col-xl-2 pt-3 d-none d-lg-block mb-2">
            <Filters getFilteredProducts={getFilteredProducts} setFilteredProducts={setFilteredProducts} categoryId={Number(searchParams.get('category'))} />
          </div>
          <div className='vr d-none d-lg-block'></div>
          <div className='ps-lg-2 pt-2 flex-fill'>
            {
              filteredProducts.length === 0
                ?
                <h3 className='text-center'>No Products Found</h3>
                :
                <div id='products'>
                  <div className="d-flex flex-wrap justify-content-center ms-lg-3 gap-2">
                    {
                      currentProducts.map((product) =>
                        <ProductCard key={product.productId} product={product} />
                      )
                    }
                  </div>
                  <div>
                    <Pagination currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      itemsPerPage={productsPerPage}
                      totalItems={filteredProducts.length}
                    />
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default Products