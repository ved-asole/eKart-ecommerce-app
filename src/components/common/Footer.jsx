import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/slices/categoriesSlice';
import { Link } from 'react-router-dom';
import Home from '../../pages/Home';

export const Footer = () => {

  const categories = useSelector(state => state.categories.categories);
  const dispatch = useDispatch();
  const links = [
    { id: 1, name: "Home", urlPath: "/" },
    { id: 2, name: "Categories", urlPath: "/categories" },
    { id: 3, name: "Cart", urlPath: "/cart" }
  ]

  useEffect(() => {
    if (categories === undefined || categories.length === 0)
      fetchCategories(dispatch)
  }, [])

  return (
    <footer id="footer">
      <div className='container bg-secondary-subtle pb-2 rounded'>
        <div id='goToTop' className='my-4 mt-3 p-2 bg-secondary-subtle border-bottom'>
          <Link to={'/'} element={<Home />} className='text-decoration-none text-white fw-medium'>
            <div className='m-0 p-1 mb-1 d-flex justify-content-center'>
              <p className='m-0'>Go to Top</p>
              <FontAwesomeIcon icon={faCircleArrowUp} className='pt-1 ps-1' />
            </div>
          </Link>
        </div>
        <div id='footerOptions' className='bg-secondary-subtle d-flex flex-column ms-4 ms-sm-5'>
          <div className='d-flex flex-wrap gap-5 mb-3'>
            <div className='categories text-start col-5 col-sm-5 col-xl-2 col-lg-5 me-2'>
              <h6 className='border-bottom pb-2 fw-bold'>Categories</h6>
              <ul className='list-group list-unstyled'>
                {
                  categories?.map(category =>
                    <li key={category.categoryId}>
                      <Link to={`/categories/${category.name}`}
                        className='text-decoration-none text-body-secondary link-light'>
                        {category.name}
                      </Link>
                    </li>
                  )
                }
              </ul>
            </div>
            <div id='links' className='text-start col-4 col-sm-5 col-sm-5 col-xl-2 col-lg-5 mt-md-0'>
              <h6 className='border-bottom pb-2 fw-bold'>Links</h6>
              <ul className='list-group list-unstyled'>
                {
                  links?.map(link =>
                    <li key={link.id}>
                      <Link to={link.urlPath} className='text-decoration-none text-body-secondary link-light'>
                        {link.name}
                      </Link>
                    </li>
                  )
                }
              </ul>
            </div>
            <div id='aboutUs' className='text-start col-12 col-sm-5 col-xl-3 mt-md-0 pe-4'>
              <h6 className='border-bottom pb-2 fw-bold'>About Us</h6>
              <p className='text-body-secondary text-wrap'>
                Welcome to eKart Shopping, your number one source for shopping.
                We're dedicated to giving you the very best of products, with a focus on three characteristics, e.g., dependability, customer service and uniqueness.
              </p>
            </div>
            <div id='contact' className='text-start col-12 col-sm-5 col-xl-3 mt-md-0 pe-4'>
              <h6 className='border-bottom pb-2 fw-bold'>Contact</h6>
              <p className='text-body-secondary text-wrap'>
                Email: support@ekartshopping.com <br />
                Phone: +91 123 456 7890 <br />
                Address: <br />123 Main St, Anytown, USA 12345 <br />
              </p>
            </div>
          </div>
        </div>
        <div id='footerBase' className='border-top mb-0 pb-0 px-3'>
          <div className='fw-small d-flex-row d-md-flex flex-fill justify-content-between mt-3 align-items-center'>
            <div>
              <Link to={'/'} element={<Home />} className="navbar-brand">
                <img src="/logo.webp" alt="Logo" width="30" height="30"
                  className="d-inline-block mb-2" />
                <span className='fs-6 fw-sm-medium fs-5'>eKart Shopping</span>
              </Link>
            </div>
            <div className='fs-6 fs-sm-5'>© 2024 All rights reserved</div>
            <div className='d-none d-md-inline-block'>Terms and Conditions</div>
            <div className='d-none d-md-inline-block'>Policies</div>
            <div className='d-none d-md-inline-block'>Contact Us</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer