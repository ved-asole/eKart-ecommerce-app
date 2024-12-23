import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../redux/slices/categoriesSlice';

const Categories = () => {

  // Getting categories from store
  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories === undefined || categories.length === 0)
      fetchCategories(dispatch)
  }, [])

  return (
    <section id="categoriesSection">
      <div className='container bg-secondary-subtle text-start rounded p-3'>
        <h1 className='fs-1'>All Categories : </h1>
        <p>We have all categories of products for you. </p>
      </div>
      <div className='container rounded mt-3'>
        <div className='row justify-content-lg-evenly'>
          {
            categories?.map((category) =>
              <Link key={category.categoryId} to={"/products?category=" + category.categoryId}
                className="card bg-secondary-subtle text-decoration-none p-1 p-sm-2 col-12 col-md-6 col-lg-4">
                <img src={category.image?.replace('.', '-200x200.')}
                  className="rounded mx-auto mt-2 mb-4" width={"200px"} height={"200px"} alt={category.name} />
                <div className="c-body text-center mt-2" >
                  <p className="card-title ms-2 ms-md-0 fw-bold fs-4">{category.name}</p>
                </div>
              </Link>
            )}
        </div>
      </div>
    </section>

  )
}

export default Categories