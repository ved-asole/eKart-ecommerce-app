import { faCubes, faShirt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Products = lazy(() => import('../components/admin/product/Products.jsx'));
const Categories = lazy(() => import('../components/admin/category/Categories.jsx'));

const AdminPanel = () => {

  const [selectedOption, setSelectedOption] = useState('products');

  const options = [
    {
      key: 'products',
      label: 'Products',
      icon: faShirt
    },
    {
      key: 'categories',
      label: 'Categories',
      icon: faCubes
    }
  ];

  const handleOptionClick = (key) => {
    setSelectedOption(key);
  };

  useEffect(() => {
    setSelectedOption(window.location.pathname.split('/')[2]);
    window.location.pathname.startsWith('/admin') &&
      window.scrollTo(0, 0)
  }, [window.location.pathname, selectedOption])

  const renderComponent = () => {
    switch (selectedOption) {
      case 'products':
        return <Products />;
      case 'categories':
        return <Categories />;
      default:
        return <Products />;
    }
  };

  return (
    <div className="container rounded bg-secondary-subtle p-4">
      <div className="row d-flex flex-wrap justify-content-center align-items-center">
        <div className="col-lg-3 col-xxl-2 text-start px-lg-5 px-xxl-3 py-3 align-self-md-stretch border-end">
          <h3 className='text-center text-lg-start'>Admin Panel</h3>
          <div className="nav flex-row flex-lg-column justify-content-around mt-lg-4">
            {
              options.map((option) =>
                <Link key={option.key} to={`/admin/${option.key}`} className="nav-link text-white"
                  onClick={() => handleOptionClick(option)}>
                  <FontAwesomeIcon icon={option.icon} className='me-2' aria-hidden="true" />
                  {option.label}
                </Link>
              )
            }
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9 col-xxl-10 py-2 ps-3">
          {renderComponent()}
        </div>
      </div>
    </div >
  )
}

export default AdminPanel;