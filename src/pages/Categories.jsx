import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Categories = () => {

  // Getting categories from store
  const categories = useSelector(state => state.categories.categories);

  return (
    <section id="categoriesSection">
      <div className='container bg-secondary-subtle text-start rounded p-3 mt-3'>
        <h1 className='fs-1'>All Categories : </h1>
        <p>We have all categories of products for you. </p>
      </div>
      <div className='container rounded mt-3'>
        <div className='row gap-3 justify-content-lg-evenly'>
          {
            categories?.map((category) =>
              <Link key={category.id} to={"/categories/" + category.name}
                className="card bg-secondary-subtle text-decoration-none p-1 p-sm-2 col-md-6 col-xl-3 col-xxl-3">
                <img src={category.image}
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