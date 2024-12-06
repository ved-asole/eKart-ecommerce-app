import React, { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductsPage } from '../../../redux/slices/productsSlice.js';
const AddProductModel = lazy(() => import('./AddProductModel.jsx'));
const UpdateProductModel = lazy(() => import('./UpdateProductModel.jsx'));
const Pagination = lazy(() => import('../../products/Pagination.jsx'));

/*
 * Products component.
 * 
 * This component renders the Admin Products section of the app.
 * It displays a table of products with their details and allows for adding, editing, and deleting products.
 * 
 * @return {JSX.Element} The rendered Products component.
 */
const Products = () => {

  const products = useSelector((state) => state.products.products);
  const page = useSelector((state) => state.products.page);
  const size = useSelector((state) => state.products.size);
  const totalPages = useSelector((state) => state.products.totalPages);
  const dispatch = useDispatch();
  const [productId, setProductId] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (currentPage >= 0 || currentPage != page) {
      currentPage > 0 ?
        fetchProductsPage(dispatch, currentPage - 1, 10, "productId", "asc")
        : fetchProductsPage(dispatch, currentPage, 10, "productId", "asc");
    }
  }, [currentPage, page]);

  return (
    <div>
      <section id="products-section">
        <h3>Products</h3>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addProductModal">Add Product</button>
        </div>
        <div className="table-responsive">
          <table className="table table-responsive table-striped">
            <thead className="align-middle">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th className='text-wrap'>Quanity in Stock</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className='table-group-divider align-middle'>
              {products.map((product) => (
                <tr key={product.productId}>
                  <td className='text-wrap'>{product.productId}</td>
                  <td className='text-start'>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.qtyInStock}</td>
                  <td>{product.categoryId}</td>
                  <td className="w-25">
                    <button className="btn btn-outline-secondary me-0 me-md-2 mb-2 mb-lg-0"
                      data-bs-toggle="modal" data-bs-target="#updateProductModal"
                      onClick={() => setProductId(product.productId)}
                    >Edit</button>
                    <button className="btn btn-outline-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div id="pagination">
        <Pagination
          currentPage={currentPage == 0 ? 1 : currentPage}
          setCurrentPage={setCurrentPage}
          productsPerPage={size}
          totalProducts={size * totalPages}
        />
      </div>

      {/* <!-- Add Product Modal --> */}
      <AddProductModel />

      {/* <!-- Update Product Modal --> */}
      <UpdateProductModel productId={productId} />

    </div>
  )
}

export default Products