import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../redux/slices/categoriesSlice.js';

const CategoriesBar = () => {

  // Getting categories from store
  const categories = useSelector(state => state.categories.categories);
  const isLoading = useSelector(state => state.categories.loading);
  const error = useSelector(state => state.categories.error);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories === undefined || categories.length === 0)
      fetchCategories(dispatch)
  }, [categories])

  return (
    <section id="categoriesBarSection">
      <div className='container bg-secondary-subtle rounded'>
        <div className='row pt-3 mb-3 gap-2 justify-content-evenly'>
          {
            !isLoading && !error ?
              categories?.map((category) =>
                <Link to={"/products?category=" + category.categoryId} key={category.categoryId}
                  className="col-3 col-sm-2 col-lg-1 flex-fill text-decoration-none text-body-secondary link-light">
                  <img alt={category.name.concat(" Category")}
                    className="rounded-circle m-auto mt-2-circle" width="70" height="70"
                    src={category.image}
                    // src="..."
                    aria-label={category.name.concat(" Category")} />
                  <p className='mt-1 fw-bold'>{category.name}</p>
                </Link>
              ) :
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) =>
                <div key={i} className="col-3 col-sm-2 col-lg-1 placeholder-glow text-decoration-none text-body-secondary">
                  <img alt='...'
                    className="rounded-circle placeholder" width="70" height="70"
                    src="..."
                    aria-label="Category" />
                  <p className='mt-2 ms-1 ms-md-0 rounded placeholder col-12'></p>
                </div>
              )
          }
        </div>
      </div>
    </section>
  )
}

export default CategoriesBar