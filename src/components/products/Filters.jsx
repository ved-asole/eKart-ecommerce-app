import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/slices/productsSlice';

const Filters = ({ setFilteredProducts }) => {

  const categories = useSelector((state) => state.categories.categories)
  const products = useSelector((state) => state.products.products)
  const dispatch = useDispatch();
  // const categories = [...new Set(products?.map((product) => product.categoryId))];
  let minPrice = 0;
  const [maxPrice, setMaxPrice] = useState(100000);

  const priceChange = (event) => {
    setMaxPrice(event.target.value);
    setFilteredProducts(products.filter((product) =>
      Math.trunc(product.price * (1 - product.discount / 100)) <= maxPrice
    ));
  }

  const updateSorting = (event) => {
    const sortingType = event.target.value;
    const arrayForSorting = [...products];

    switch (sortingType) {
      case 'none':
        setFilteredProducts(products);
        break;
      case 'low-to-high-price':
        setFilteredProducts(arrayForSorting.sort((product1, product2) => product1.price - product2.price));
        break;
      case 'high-to-low-price':
        setFilteredProducts(arrayForSorting.sort((product1, product2) => product2.price - product1.price));
        break;
      case 'discount':
        setFilteredProducts(arrayForSorting.sort((product1, product2) => product2.discount - product1.discount));
        break;
      default:
        setFilteredProducts(products);
        break;
    }
  }

  useEffect(() => {
    if (products === undefined || products?.length === 0) {
      fetchProducts(dispatch);
    }
    setFilteredProducts(products);

  }, [products]);

  return (
    <div>
      <p className='fw-medium'>Filters :</p>
      <div className='mt-3'>
        <div className='mb-3'>Categories :</div>
        {categories.map((category) => <p key={category.categoryId} className='fs-6 ms-3 lh-1'>{category.name}</p>)}
      </div>
      <div className='pe-3 py-3 border-top'>
        <label htmlFor="priceRange" className="form-label">Price :</label>
        <input type="range" className="form-range" min={0} max={100000} step={1000} id="priceRange" value={maxPrice} onChange={priceChange}></input>
        <div className="d-flex flex-wrap justify-content-between">
          <span>Min: {minPrice}</span>
          <span>to</span>
          <span>{maxPrice}</span>
        </div>
      </div>
      <div className='py-3 border-top'>
        <div className='mb-3'>Sort By :</div>
        <div>
          <div className="btn-group-vertical" role="group" aria-label="Sort By Options">
            <input type="radio" className="btn-check" name="sortBy" id="sortBy-none"
              value={'none'} autoComplete="off" defaultChecked={true} onClick={updateSorting} />
            <label className="btn btn-outline-dark text-light" htmlFor="sortBy-none">None</label>
            <input type="radio" className="btn-check" name="sortBy" id="sortBy-low-to-high-price"
              value={'low-to-high-price'} autoComplete="off" onClick={updateSorting} />
            <label className="btn btn-outline-dark text-light" htmlFor="sortBy-low-to-high-price">Low to High Price</label>
            <input type="radio" className="btn-check" name="sortBy" id="sortBy-high-to-low-price"
              value={'high-to-low-price'} autoComplete="off" onClick={updateSorting} />
            <label className="btn btn-outline-dark text-light" htmlFor="sortBy-high-to-low-price">High to Low Price</label>
            <input type="radio" className="btn-check" name="sortBy" id="sortBy-discount"
              value={'discount'} autoComplete="off" onClick={updateSorting} />
            <label className="btn btn-outline-dark text-light" htmlFor="sortBy-discount">By Discount</label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Filters
