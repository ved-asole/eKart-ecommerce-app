import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchCategories } from '../../../redux/slices/categoriesSlice.js';
import { postData } from '../../../util/DataFetcher.js';
import { CATEGORIES_JSON_PATH } from '../../../util/commonConstants.js';
import { showToast, hideModel } from '../../../util/appUtil.js';

const AddCategoryModel = () => {

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      name: '',
      desc: '',
      image: '',
      parentCategory: null,
      active: true
    }
  });
  const { errors, isSubmitting, isSubmitted, isSubmitSuccessful } = formState;

  const categories = useSelector(state => state.categories.categories);
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (categories === undefined || categories.length === 0)
      fetchCategories(dispatch);
    reset({
      name: '',
      desc: '',
      image: '',
      parentCategory: null,
      active: false
    });
  }, [categories])

  const onSubmit = (data) => {
    data.parentCategory = {
      categoryId: data.parentCategory
    }
    postData(
      CATEGORIES_JSON_PATH,
      data,
      () => {
        fetchCategories(dispatch);
        showToast("Category added successfully");
        hideModel('addCategoryModal');
      },
      (error) => {
        showToast("Unable to add category");
        console.log(error);
      }
    )
  }

  return (
    <div className="modal fade" id="addCategoryModal" tabIndex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addCategoryModalLabel">Add Category</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form id='categoryForm'>
              <div className="form-floating mt-3">
                <input type="text" className={'form-control' + (errors.name ? ' is-invalid' : '')} id="name" placeholder="Category Name" required
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
                    {...register("parentCategory", {
                      required: 'Parent Category should not be empty',
                      validate: value => {
                        return value != 0
                      },
                      message: 'Parent Category should be selected'
                    })}
                  >
                    <option key="none" value={0}>Select Category</option>
                    {categories.map(category => (
                      <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                    ))}
                  </select>
                  <label className='ms-2' htmlFor="parentCategory">ParentCategory</label>
                  {errors.categoryId && <div className="text-danger form-text text-start mt-1">{'Category should be selected'}</div>}
                </div>
                <div className="form-check col-lg-5 mt-4 align-self-center text-start">
                  <input type="checkbox" id="active"
                    className="form-control form-check-input form-checkbox p-2"
                    {...register("active")}
                  />
                  <label className="form-check-label ms-2" htmlFor="active">Active</label>
                </div>
              </div>
              <div className="form-floating mt-4">
                <textarea className={"form-control" + (errors.desc ? ' is-invalid' : '')}
                  id="desc" placeholder="Description" style={{ 'height': '100px' }} required
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
                  onKeyUp={(e) => setImage(e.target.value)}
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
                {isSubmitting || isSubmitted || isSubmitSuccessful ? <output className='ms-1'>Adding category...</output> : "Add Category"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCategoryModel
