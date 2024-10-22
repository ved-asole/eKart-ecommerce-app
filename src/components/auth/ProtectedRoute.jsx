import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLoader from '../common/AppLoader';
import { useCookies } from 'react-cookie';
import fetchData from '../../util/DataFetcher';
import { showToast } from '../../util/appUtil';
import { PropTypes } from 'prop-types';
import RouteLoadError from '../../pages/RouteLoadError';

const ProtectedRoute = ({ children, roles }) => {

  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAccessDenied, setIsAccessDenied] = useState(false);

  useEffect(() => {
    if (!roles) roles = ['USER'];
    if (localStorage.getItem('token')) {
      fetchData(
        "auth/check-token",
        (data) => {
          if (roles.includes(cookies['role'])) setIsAuthenticated(true)
          else {
            setIsAccessDenied(true);
            showToast("Access Denied");
          }
        },
        (errorMsg) => {
          showToast("Please login first");
          navigate('/auth');
        }
      )
    } else {
      showToast("Please login first");
      navigate('/auth');
    }
  }, [isAuthenticated, isAccessDenied]);

  // logic to check if the user is authenticated
  let content = <AppLoader />;
  if (isAccessDenied) {
    content = <RouteLoadError message="Access Denied!" />;
  } else {
    content = children;
  }
  return content;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.array
};

export default ProtectedRoute;