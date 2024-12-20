import React, { lazy, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../redux/slices/categoriesSlice.js';
import { deleteData } from '../../../util/DataFetcher.js';
import { CATEGORIES_JSON_PATH } from '../../../util/commonConstants.js';
import { showToast } from '../../../util/appUtil.js';

const AddCategoryModel = lazy(() => import('./AddCategoryModel.jsx'));
const UpdateCategoryModel = lazy(() => import('./UpdateCategoryModel.jsx'));

/**
 * Categories component.
 *
 * This component renders the Admin Categories section of the app.
 *
 * @return {JSX.Element} The rendered Categories component.
 */
const Categories = () => {

  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    fetchCategories(dispatch);
  }, []);

  const deleteCategory = (categoryId) => {
    deleteData(
      CATEGORIES_JSON_PATH.concat(`/${categoryId}`),
      () => {
        showToast("Category deleted successfully");
        fetchCategories(dispatch);
      },
      (error) => {
        showToast("Unable to delete category");
        console.log(error);
      }
    )
  }

  return (
    <div>
      <section id="categories-section" className="mt-2">
        <h3>Categories</h3>
        <div className="d-flex justify-content-between mb-3">
          <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addCategoryModal">Add Category</button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="align-middle">
              <tr>
                <th className="w-10">ID</th>
                <th className="w-25">Name</th>
                <th className="w-50">Description</th>
                {/* <th>Parent Category</th> */}
                <th className="w-25">Actions</th>
              </tr>
            </thead>
            <tbody className='table-group-divider align-middle'>
              {
                categories.map(category => (
                  <tr key={category.categoryId}>
                    <td className="w-10">{category.categoryId}</td>
                    <td className="w-25">{category.name}</td>
                    <td className="w-50 text-start">{category.desc.substring(0, 100)}</td>
                    {/* <td>{category?.parentCategory?.categoryId}</td> */}
                    <td className="w-25">
                      <button className="btn btn-outline-secondary me-0 me-md-2 mb-2 mb-lg-0"
                        data-bs-toggle="modal" data-bs-target="#updateCategoryModal"
                        onClick={() => setCategoryId(category.categoryId)}
                      >Edit</button>
                      <button className="btn btn-outline-danger"
                        onClick={() => deleteCategory(category.categoryId)}
                      >Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </section>

      {/* <!-- Add Category Modal --> */}
      <AddCategoryModel />

      <UpdateCategoryModel categoryId={categoryId} />

    </div>
  )
}

export default Categories
