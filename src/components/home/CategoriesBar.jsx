import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../../redux/slices/categoriesSlice';

const CategoriesBar = () => {

  // Getting categories from store
  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories === undefined || categories.length === 0)
      fetchCategories(dispatch)
  }, [])

  return (
    <section id="categoriesBarSection">
      <div className='container bg-secondary-subtle rounded'>
        <div className='row pt-3 mb-3 gap-2'>
          {
            categories?.map((category) =>
              <Link to={"/categories/" + category.categoryId} key={category.categoryId}
                className="col-3 col-sm-2 col-lg-1 flex-fill text-decoration-none text-body-secondary link-light">
                <img alt={category.name.concat(" Category")}
                  className="rounded-circle m-auto mt-2-circle" width="70" height="70"
                  src={category.image}
                  aria-label={category.name.concat(" Category")} />
                <p className='mt-1 fw-bold'>{category.name}</p>
              </Link>
            )}
        </div>
      </div>
    </section>

  )
}

export default CategoriesBar