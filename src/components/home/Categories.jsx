import React, { useEffect } from 'react';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';

const Categories = () => {

  // Using redux-toolkit to fetch Categories
  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories === undefined || categories.length === 0)
      fetchCategories(dispatch, 'categories')
  }, [])

  return (
    <section id="categoriesSection">
      <div className='container bg-secondary-subtle rounded'>
        <div className='row pt-4 mb-3 gap-2'>
          {
            categories?.map((category) =>
              <div key={category.id} className="col-3 col-sm-2 col-lg-1 flex-fill">
                <img className="rounded-circle m-auto mt-2-circle" width="70" height="70"
                  src={category.image}
                  aria-label={category.name.concat(" Category")}>
                </img>
                <p className='mt-1'>{category.name}</p>
              </div>
            )}
        </div>
      </div>
    </section>

  )
}

export default Categories