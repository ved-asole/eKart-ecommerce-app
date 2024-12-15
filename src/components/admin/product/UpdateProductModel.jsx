import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import fetchData, { fetchLocalData, updateData } from '../../../util/DataFetcher.js';
import { fetchCategories } from '../../../redux/slices/categoriesSlice.js';
import { showToast } from '../../../util/appUtil.js';
import { fetchProducts } from '../../../redux/slices/productsSlice.js';

const UpdateProductModel = ({ productId }) => {

  const [product, setProduct] = useState({});
  const { register, handleSubmit, reset, formState } = useForm({});
  const { errors, isSubmitting, isSubmitted, isSubmitSuccessful } = formState;
  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productId !== 0 && productId !== product.productId) {
      reset({
        name: '',
        price: 0,
        desc: '',
        image: '',
        discount: 0,
        qtyInStock: 0,
        categoryId: 0
      });
      if (import.meta.env.VITE_FETCH_API_DATA) {
        fetchData(
          `products/${productId}`,
          (data) => {
            setProduct(data);
            reset({
              name: data.name,
              price: data.price,
              desc: data.desc,
              image: data.image,
              discount: data.discount,
              qtyInStock: data.qtyInStock,
              categoryId: data.categoryId
            });
          },
          (errorMsg) => console.log(errorMsg)
        );
      } else {
        fetchLocalData(
          PRODUCTS_JSON_PATH,
          (data) => {
            setProduct(data[productId])
            reset({
              name: data[productId].name,
              price: data[productId].price,
              desc: data[productId].desc,
              image: data[productId].image,
              discount: data[productId].discount,
              qtyInStock: data[productId].qtyInStock,
              categoryId: data[productId].categoryId
            });
          },
          (errorMsg) => dispatch(fetchProductsFailure(errorMsg))
        );
      }
    }
    if (categories === undefined || categories.length === 0)
      fetchCategories(dispatch);
  }, [productId, product, categories])

  const onSubmit = (data) => {
    updateData(
      `products/${productId}`,
      data,
      (data) => {
        setProduct(data);
        reset({
          name: data.name,
          price: data.price,
          desc: data.desc,
          image: data.image,
          discount: data.discount,
          qtyInStock: data.qtyInStock,
          categoryId: data.categoryId
        });
        showToast("Product updated successfully");
        fetchProducts(dispatch);
      },
      (error) => {
        showToast("Unable to update product");
        console.log(error);
      }
    )
  }

  return (
    <div className="modal fade" id="updateProductModal" tabIndex="-1" aria-labelledby="updateProductModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="updateProductModalLabel">Update Product</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form id='productForm' onSubmit={handleSubmit(onSubmit, (data) => {
              console.log(data)
            })}>
              <div className="form-floating mt-3">
                <input type="text" className={'form-control' + (errors.name ? ' is-invalid' : '')} id="name" placeholder="Product Name" required
                  defaultValue={product.name}
                  {...register("name", {
                    required: "Product name should not be empty",
                    minLength: {
                      value: 3,
                      message: "Product name should be at least 3 characters long"
                    },
                    maxLength: {
                      value: 100,
                      message: "Product name should be at most 100 characters long"
                    }
                  })}
                />
                <label htmlFor="name">Product Name</label>
                <div className="form-text text-start">Should be between 3 to 100 characters</div>
                {errors.name && <div className="text-danger form-text text-start mt-1">{errors.name.message}</div>}
              </div>
              <div className="row">
                <div className="form-floating col-lg-6 mt-4">
                  <select className={"form-control form-select" + (errors.categoryId ? ' is-invalid' : '')} id="category" required
                    {...register("categoryId", {
                      required: 'Category should not be empty',
                      validate: value => {
                        return value != 0
                      },
                      message: 'Category should be selected'
                    })}
                  >
                    <option key="none" value={0}>Select Category</option>
                    {categories.map(category => {
                      return category.categoryId == product.categoryId ?
                        (
                          <option key={category.categoryId} value={category.categoryId} selected>{category.name}</option>
                        ) :
                        (
                          <option key={category.categoryId} value={category.categoryId}>{category.name}</option>
                        )
                    })}
                  </select>
                  <label className='ms-2' htmlFor="category">Category</label>
                  {errors.categoryId && <div className="text-danger form-text text-start mt-1">{'Category should be selected'}</div>}
                </div>
                <div className="form-floating col-lg-6 mt-4">
                  <input type="number" className={"form-control" + (errors.qtyInStock ? ' is-invalid' : '')} id="qtyInStock" placeholder="Quantity In Stock" required
                    defaultValue={product.qtyInStock}
                    {...register("qtyInStock", {
                      required: 'Quantity In Stock should not be empty',
                      min: {
                        value: 1,
                        message: 'Quantity In Stock should be greater than 0'
                      }
                    })}
                  />
                  <label className='ms-2 mb-1' htmlFor="qtyInStock">Quantity In Stock</label>
                  <div className="form-text text-start">Should be greater than 0</div>
                  {errors.qtyInStock && <div className="text-danger form-text text-start mt-1">{errors.qtyInStock.message}</div>}
                </div>
              </div>
              <div className="row">
                <div className="form-floating col-md-6 mt-4">
                  <input type="number" className={"form-control" + (errors.price ? ' is-invalid' : '')} id="price" placeholder="Price" required
                    defaultValue={product.price}
                    {...register("price", {
                      required: 'Price should not be empty',
                      min: {
                        value: 1,
                        message: 'Price should be greater than 0'
                      }
                    })}
                  />
                  {/* <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">@</span>
                  <input type="number" id='price' className="form-control" placeholder="Price" aria-label="Username" aria-describedby="basic-addon1" />
                </div> */}
                  <label className='ms-2' htmlFor="price">Price</label>
                  <div className="form-text text-start">Should be greater than 0</div>
                  {errors.price && <div className="text-danger form-text text-start mt-1">{errors.price.message}</div>}
                </div>
                <div className="form-floating col-md-6 mt-4">
                  <input type="number" className={"form-control" + (errors.discount ? ' is-invalid' : '')} id="discount" placeholder="Discount" required
                    defaultValue={product.discount}
                    {...register("discount", {
                      required: 'Discount should not be empty',
                      min: {
                        value: 0,
                        message: 'Discount should be non-negative'
                      }
                    })}
                  />
                  <label className='ms-2' htmlFor="discount">Discount</label>
                  {errors.discount && <div className="text-danger form-text text-start mt-1">{errors.discount.message}</div>}
                </div>
              </div>
              <div className="form-floating mt-4">
                <textarea className={"form-control" + (errors.desc ? ' is-invalid' : '')}
                  id="desc" placeholder="Description" style={{ 'height': '200px' }} required
                  defaultValue={product.desc}
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
                  defaultValue={product.image} onKeyUp={(event) => setProduct({ ...product, image: event.target.value })}
                  {...register("image", { required: "Image should not be empty" })}
                />
                <label htmlFor="image">Image</label>
                <div className="form-text text-start">Should be between 3 to 60 characters</div>
                {errors.image && <div className="text-danger form-text text-start mt-1">{errors.image.message}</div>}
              </div>
              {/* <div className="form-floating mt-4">
              <input type="file" className={"form-control" + (errors.image ? ' is-invalid' : '')} id="image" placeholder="Image" required
                onChange={(e) => setValue("image", e.target.files[0])}
                {...register("image", {
                  required: 'Image should not be empty',
                })}
              />
              <label htmlFor="image">Image</label>
              {errors.image && <div className="text-danger form-text text-start mt-1">{errors.image.message}</div>}
            </div> */}
              <button className="btn btn-light py-2 mt-5 mb-4 mb-md-0" type="submit"
                disabled={isSubmitting || isSubmitted || isSubmitSuccessful}
                data-bs-dismiss="modal"
                onClick={handleSubmit(onSubmit)}
              >
                {isSubmitting || isSubmitted || isSubmitSuccessful ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> : null}
                {isSubmitting || isSubmitted || isSubmitSuccessful ? <output className='ms-1'>Updating product...</output> : "Update Product"}
              </button>
            </form>
          </div>
        </div>
      </div >
    </div >
  )
}

UpdateProductModel.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default UpdateProductModel
