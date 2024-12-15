import { faChartBar, faCubes, faShirt, faTruckFast, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const Products = lazy(() => import('../components/admin/product/Products.jsx'));
const Categories = lazy(() => import('../components/admin/category/Categories.jsx'));
const Orders = lazy(() => import('../components/admin/order/Orders.jsx'));
const Users = lazy(() => import('../components/admin/user/Users.jsx'));
const Dashboard = lazy(() => import('../components/admin/Dashboard.jsx'));

const AdminPanel = () => {

  const [selectedOption, setSelectedOption] = useState('dashboard');
  const { option } = useParams();

  const options = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      icon: faChartBar
    },
    {
      key: 'products',
      label: 'Products',
      icon: faShirt
    },
    {
      key: 'categories',
      label: 'Categories',
      icon: faCubes
    },
    {
      key: 'orders',
      label: 'Orders',
      icon: faTruckFast
    },
    {
      key: 'users',
      label: 'Users',
      icon: faUsers
    }
  ];

  useEffect(() => {
    setSelectedOption(option || 'dashboard');
  }, [option, selectedOption])

  const renderComponent = () => {
    switch (selectedOption) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'categories':
        return <Categories />;
      case 'orders':
        return <Orders />;
      case 'users':
        return <Users />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="container rounded bg-secondary-subtle p-4">
      <div className="row d-flex flex-wrap justify-content-center align-items-top">
        <div className="col-lg-3 col-xxl-2 text-start px-lg-5 ps-xl-5 px-xxl-3 py-3 align-self-md-stretch border-end">
          <h3 className='text-center text-lg-start'>Admin Panel</h3>
          <div className="nav flex-row flex-lg-column justify-content-around mt-lg-4">
            {
              options.map((option) =>
                <Link key={option.key} to={`/admin/${option.key}`} className="nav-link text-nowrap text-white my-lg-2"
                  onClick={() => setSelectedOption(option)}>
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