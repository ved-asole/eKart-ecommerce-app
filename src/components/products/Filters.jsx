import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductsByCategory } from '../../redux/slices/productsSlice';
import { Link } from 'react-router-dom';

const Filters = ({ getFilteredProducts, setFilteredProducts, categoryId }) => {

  const categories = useSelector((state) => state.categories.categories)
  const products = useSelector((state) => state.products.products)
  // const error = useSelector((state) => state.products.error)
  const dispatch = useDispatch();
  let minPrice = 0;
  const [maxPrice, setMaxPrice] = useState(150000);

  const priceChange = (event) => {
    setMaxPrice(event.target.value);
    setFilteredProducts(products.filter((product) =>
      Math.trunc(product.price * (1 - product.discount / 100)) <= maxPrice
    ));
  }

  const updateSorting = (event) => {
    const sortingType = event.target.value;
    const arrayForSorting = [...getFilteredProducts()];

    switch (sortingType) {
      case 'none':
        setFilteredProducts(products);
        break;
      case 'low-to-high-price':
        setFilteredProducts(arrayForSorting.sort((product1, product2) => Math.trunc(product1.price * (1 - product1.discount / 100)) - Math.trunc(product2.price * (1 - product2.discount / 100))));
        break;
      case 'high-to-low-price':
        setFilteredProducts(arrayForSorting.sort((product1, product2) => Math.trunc(product2.price * (1 - product2.discount / 100)) - Math.trunc(product1.price * (1 - product1.discount / 100))));
        break;
      case 'discount':
        setFilteredProducts(arrayForSorting.sort((product1, product2) => product2.discount - product1.discount));
        break;
      default:
        setFilteredProducts(arrayForSorting);
        break;
    }
  }

  // useEffect(() => {
  //   console.log("categoryId : " + categoryId);
  //   if (products.length == 0) {
  //     console.log("products.length : " + products.length);
  //     if (categoryId == null) {
  //       fetchProducts(dispatch);
  //       setFilteredProducts(products);
  //     }
  //     else {
  //       fetchProductsByCategory(dispatch, categoryId);
  //     }
  //   }
  //   setFilteredProducts(products);
  // }, [products, categoryId]);

  useEffect(() => {
    // This useEffect is dedicated to fetching products when the component mounts.
    if (categoryId == null) {
      fetchProducts(dispatch);
    } else {
      fetchProductsByCategory(dispatch, categoryId);
    }
  }, [categoryId]); // Empty dependency array means this runs once on mount.

  useEffect(() => {
    // This useEffect is for any other side effects that need to run when products or categoryId changes.
    console.log("categoryId : " + categoryId);
    if (products.length > 0) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts([]);
    }
  }, [products, categoryId]); // This will run on products or categoryId changes.

  return (
    <div>
      <p className='fw-medium'>Filters :</p>
      <div className="ps-2">
        <div className='mt-3'>
          <div className='mb-3'>Categories :</div>
          {categories.map((category) =>
            <Link className='text-decoration-none text-body-secondary' key={category.categoryId} to={`/products?category=${category.categoryId}`}>
              <p className='fs-6 ms-3 lh-1'>{category.name}</p>
            </Link>
          )}
        </div>
        <div className='pe-3 py-3 border-top'>
          <label htmlFor="priceRange" className="form-label">Price :</label>
          <input type="range" className="form-range" min={0} max={150000} step={1000} id="priceRange" value={maxPrice} onChange={priceChange}></input>
          <div className="d-flex flex-wrap justify-content-between">
            <span>Min: {minPrice}</span>
            <span>to</span>
            <span>{maxPrice}</span>
          </div>
        </div>
        <div className='py-3 border-top'>
        </div>
        <div className='mb-3'>Sort By :</div>
        <div>
          <div className="btn-group-vertical" role="group" aria-label="Sort By Options">
            <input type="radio" className="btn-check" name="sortBy" id="sortBy-none"
              value='none' autoComplete="off" defaultChecked={true} onClick={updateSorting} />
            <label className="btn btn-outline-dark text-light" htmlFor="sortBy-none">None</label>
            <input type="radio" className="btn-check" name="sortBy" id="sortBy-low-to-high-price"
              value='low-to-high-price' autoComplete="off" onClick={updateSorting} />
            <label className="btn btn-outline-dark text-light" htmlFor="sortBy-low-to-high-price">Low to High Price</label>
            <input type="radio" className="btn-check" name="sortBy" id="sortBy-high-to-low-price"
              value='high-to-low-price' autoComplete="off" onClick={updateSorting} />
            <label className="btn btn-outline-dark text-light" htmlFor="sortBy-high-to-low-price">High to Low Price</label>
            <input type="radio" className="btn-check" name="sortBy" id="sortBy-discount"
              value='discount' autoComplete="off" onClick={updateSorting} />
            <label className="btn btn-outline-dark text-light" htmlFor="sortBy-discount">By Discount</label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Filters