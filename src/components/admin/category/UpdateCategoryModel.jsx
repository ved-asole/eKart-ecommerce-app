import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { fetchCategories } from '../../../redux/slices/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import fetchData, { fetchLocalData, updateData } from '../../../util/DataFetcher';
import { CATEGORIES_JSON_PATH } from '../../../util/commonConstants';
import { showToast } from '../../../util/appUtil';

const UpdateCategoryModel = ({ categoryId }) => {

  const { register, handleSubmit, reset, formState, setValue } = useForm({});
  const { errors, isSubmitting, isSubmitted, isSubmitSuccessful } = formState;

  const [category, setCategory] = useState({});
  const [defaultCategoryId, setDefaultCategoryId] = useState(null);
  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoryId !== 0 && categoryId !== category.categoryId) {
      reset({
        name: '',
        desc: '',
        image: '',
        parentCategory: null,
        active: true
      });
      if (import.meta.env.VITE_FETCH_API_DATA) {
        fetchData(
          CATEGORIES_JSON_PATH.concat(`/${categoryId}`),
          (data) => {
            setCategory(data);
            if (data.parentCategory == null) setDefaultCategoryId(0);
            else {
              setDefaultCategoryId(data.parentCategory ? 0 : data.parentCategory.categoryId);
              setValue('parentCategory', data.parentCategory.categoryId);
            }
            reset({
              name: data.name,
              desc: data.desc,
              image: data.image,
              parentCategory: data.parentCategory?.categoryId,
              active: data.active
            });
          },
          (errorMsg) => console.log(errorMsg)
        );
      } else {
        fetchLocalData(
          CATEGORIES_JSON_PATH,
          (data) => {
            setCategory(data[categoryId])
            reset({
              name: data[categoryId].name,
              desc: data[categoryId].desc,
              image: data[categoryId].image,
              parentCategory: data[categoryId].parentCategory?.categoryId,
              active: data[categoryId].active
            });
          },
          (errorMsg) => console.log(errorMsg)
        );
      }
    }
    if (categories === undefined || categories.length === 0)
      fetchCategories(dispatch);
  }, [categoryId, category, categories])

  const onSubmit = (data) => {
    data.categoryId = category.categoryId;
    console.log(data.parentCategory);
    if (data.parentCategory == 0) {
      data.parentCategory = null;
    } else {
      data.parentCategory = {
        categoryId: Number(data.parentCategory)
      }
    }
    updateData(
      CATEGORIES_JSON_PATH.concat(`/${categoryId}`),
      data,
      (data) => {
        setCategory(data);
        reset({
          name: category.name,
          desc: category.desc,
          image: category.image,
          parentCategory: category.parentCategory?.categoryId,
          active: category.active
        });
        showToast("Category updated successfully");
        fetchCategories(dispatch);
      },
      (error) => {
        showToast("Unable to update category");
        console.log(error);
      }
    )
  }

  return (
    <div className="modal fade" id="updateCategoryModal" tabIndex="-1" aria-labelledby="updateCategoryModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateCategoryModalLabel">Update Category</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form id='categoryForm'>
              <div className="form-floating mt-3">
                <input type="text" className={'form-control' + (errors.name ? ' is-invalid' : '')} id="name" placeholder="Category Name" required
                  defaultValue={category.name}
                  {...register("name", {
                    required: "Category name should not be empty",
                    minLength: {
                      value: 3,
                      message: "Category name should be at least 3 characters long"
                    },
                    maxLength: {
                      value: 50,
                      message: "Category name should be at most 50 characters long"
                    }
                  })}
                />
                <label htmlFor="name">Category Name</label>
                <div className="form-text text-start">Should be between 3 to 50 characters</div>
                {errors.name && <div className="text-danger form-text text-start mt-1">{errors.name.message}</div>}
              </div>
              <div className="row gap-5">
                <div className="form-floating col-lg-6 mt-4">
                  <select className={"form-control form-select" + (errors.categoryId ? ' is-invalid' : '')} id="parentCategory" required
                    value={defaultCategoryId || ''}
                    {...register("parentCategory", {
                      required: 'Parent Category should not be empty',
                      message: 'Parent Category should be selected'
                    })}
                  >
                    <option key="none" value={0}>No Category</option>
                    {categories.map(categoryEl => (
                      categoryEl.categoryId == category.parentCategory?.categoryId ?
                        (
                          <option key={categoryEl.categoryId} value={categoryEl.categoryId} defaultValue={true} selected>{categoryEl.name}</option>
                        ) :
                        (
                          <option key={categoryEl.categoryId} value={categoryEl.categoryId}>{categoryEl.name}</option>
                        )
                    ))}
                  </select>
                  <label className='ms-2' htmlFor="parentCategory">ParentCategory</label>
                  {errors.categoryId && <div className="text-danger form-text text-start mt-1">{'Category should be selected'}</div>}
                </div>
                <div className="form-check col-lg-5 mt-4 align-self-center text-start">
                  <input type="checkbox" id="active"
                    className="form-check-input form-checkbox p-2"
                    defaultChecked={category.active}
                    {...register("active")}
                  />
                  <label className="form-check-label ms-2" htmlFor="active">Active</label>
                </div>
              </div>
              <div className="form-floating mt-4">
                <textarea className={"form-control" + (errors.desc ? ' is-invalid' : '')}
                  id="desc" placeholder="Description" style={{ 'height': '100px' }} required
                  defaultValue={category.desc}
                  {...register("desc", {
                    required: 'Description should not be empty',
                    minLength: {
                      value: 10,
                      message: 'Description should be at least 10 characters long'
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Description should be at most 1000 characters long'
                    }
                  })}
                ></textarea>
                <label htmlFor="desc">Description</label>
                <div className="form-text text-start">Should be between 10 to 1000 characters</div>
                {errors.desc && <div className="text-danger form-text text-start mt-1">{errors.desc.message}</div>}
              </div>
              <div className="form-floating mt-3">
                <input type="text" className={'form-control' + (errors.image ? ' is-invalid' : '')} id="image" placeholder="Image" required
                  // onKeyUp={(e) => setImage(e.target.value)}
                  onKeyUp={(event) => setCategory({ ...category, image: event.target.value })}
                  defaultValue={category.image}
                  {...register("image", { required: "Image should not be empty" })}
                />
                <label htmlFor="image">Image</label>
                <div className="form-text text-start">Should be between 3 to 50 characters</div>
                {errors.image && <div className="text-danger form-text text-start mt-1">{errors.image.message}</div>}
              </div>
              <button className="btn btn-light py-2 mt-3 mb-1" type="submit"
                disabled={isSubmitting || isSubmitted || isSubmitSuccessful}
                onClick={handleSubmit(onSubmit)}
              >
                {isSubmitting || isSubmitted || isSubmitSuccessful ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : null}
                {isSubmitting || isSubmitted || isSubmitSuccessful ? <output className='ms-1'>Updating category...</output> : "Update Category"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
UpdateCategoryModel.propTypes = {
  categoryId: PropTypes.number.isRequired,
};

export default UpdateCategoryModel