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
          <div className='d-flex gap-5 mb-3'>
            <div className='categories text-start flex-grow-1 w-25'>
              <h6 className='border-bottom pb-2'>Categories</h6>
              <ul className='list-group list-unstyled'>
                {
                  categories?.map(category =>
                    <li key={category.id}>{category.name}</li>
                  )
                }
              </ul>
            </div>
            <div className='links text-start flex-grow-1 w-25'>
              <h6 className='border-bottom pb-2'>Links</h6>
              <ul className='list-group list-unstyled'>
                <li>Home</li>
                <li>Categories</li>
                <li>Profile</li>
              </ul>
            </div>
            <div className='aboutUs text-start flex-grow-1 w-25'>
              <h6 className='border-bottom pb-2'>About Us</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at lorem ut nibh semper iaculis a quis mauris. Integer leo eros, molestie at urna sit amet, blandit egestas diam. Praesent sollicitudin facilisis efficitur.</p>
            </div>
            <div className='contact text-start flex-grow-1 w-25'>
              <h6 className='border-bottom pb-2'>Contact</h6>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at lorem ut nibh semper iaculis a quis mauris. Integer leo eros, molestie at urna sit amet, blandit egestas diam. Praesent sollicitudin facilisis efficitur.</p>
            </div>
          </div>
        </div>
        <div className='border-top mb-0 pb-0 px-3'>
          <div className='fw-small d-flex flex-fill justify-content-between mt-3 align-items-center'>
            <div>
              <Link to={'/'} element={<Home />} className="navbar-brand">
                <img src="/logo.webp" alt="Logo" width="30" height="30"
                  className="d-inline-block mb-2" />
                <span >eKart Shopping</span>
              </Link>
            </div>
            <div>© 2024 All rights reserved</div>
            <div>Terms and Conditions</div>
            <div>Policies</div>
            <div>Contact Us</div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer