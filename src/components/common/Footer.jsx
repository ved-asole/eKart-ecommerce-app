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
      fetchCategories(dispatch, 'categories')
  }, [])

  return (
    <footer id="footer">
      <div className='container bg-secondary-subtle pb-2'>
        <div className='my-4 p-2 bg-secondary-subtle border-bottom'>
          <Link to={'/'} element={<Home />} className='text-decoration-none text-white fw-medium'>
            <div className='m-0 p-1 mb-1 d-flex justify-content-center'>
              <p className='m-0'>Go to Top</p>
              <FontAwesomeIcon icon={faCircleArrowUp} className='pt-1 ps-1' />
            </div>
          </Link>
        </div>
        <div className='bg-secondary-subtle d-flex flex-column mx-5'>
          <div className='d-flex-row d-md-flex gap-5 mb-3'>
            <div className='categories text-center text-md-start flex-grow-1'>
              <h6 className='border-bottom pb-2 fw-bold'>Categories</h6>
              <ul className='list-group list-unstyled'>
                {
                  categories?.map(category =>
                    <li key={category.id}>
                      <Link to={`/categories/${category.name}`}
                        className='text-decoration-none text-body-secondary link-light'>
                        {category.name}
                      </Link>
                    </li>
                  )
                }
              </ul>
            </div>
            <div className='links text-center text-md-start flex-grow-1 mt-5 mt-md-0'>
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
            <div className='aboutUs text-center text-md-start flex-grow-1 mt-5 mt-md-0'>
              <h6 className='border-bottom pb-2 fw-bold'>About Us</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at lorem ut nibh semper iaculis a quis mauris. Integer leo eros, molestie at urna sit amet, blandit egestas diam. Praesent sollicitudin facilisis efficitur.</p>
            </div>
            <div className='contact text-center text-md-start flex-grow-1 mt-5 mt-md-0'>
              <h6 className='border-bottom pb-2 fw-bold'>Contact</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at lorem ut nibh semper iaculis a quis mauris. Integer leo eros, molestie at urna sit amet, blandit egestas diam. Praesent sollicitudin facilisis efficitur.</p>
            </div>
          </div>
        </div>
        <div className='border-top mb-0 pb-0 px-3'>
          <div className='fw-small d-flex-row d-md-flex flex-fill justify-content-between mt-3 align-items-center'>
            <div>
              <Link to={'/'} element={<Home />} className="navbar-brand">
                <img src="/logo.webp" alt="Logo" width="30" height="30"
                  className="d-inline-block mb-2" />
                <span className='fw-medium'>eKart Shopping</span>
              </Link>
            </div>
            <div>© 2024 All rights reserved</div>
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