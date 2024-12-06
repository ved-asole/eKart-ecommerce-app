import React, { lazy, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import fetchData from '../../util/DataFetcher';
import { showToast } from '../../util/appUtil';
import { PropTypes } from 'prop-types';
const RouteLoadError = lazy(() => import('../../pages/RouteLoadError.jsx'));
const AppLoader = lazy(() => import('../common/AppLoader.jsx'));

const ProtectedRoute = ({ children, roles }) => {

  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsCheckingAuth(true);
      fetchData(
        "auth/check-token",
        (data) => {

          if (
            // If roles are defined and user has one of the roles
            (roles !== undefined && roles.length > 0
              && cookies['role'] !== undefined && roles.indexOf(cookies['role']) !== -1)
            ||
            // If roles are not defined and user has USER role
            (roles === undefined && cookies['role'] !== undefined && data)
          ) {
            setIsAuthenticated(true);
          }
          else {
            setIsAuthenticated(false);
            showToast("Access Denied");
          }
          setIsCheckingAuth(false);
        },
        () => {
          setIsAuthenticated(false);
          showToast("Please login first");
          setIsCheckingAuth(false);
        }
      )
    } else {
      setIsAuthenticated(false);
      setIsCheckingAuth(false);
      showToast("Please login first");
      navigate('/auth');
    }
  }, [roles]);

  if (isCheckingAuth) {
    return <AppLoader status={true} />;
  } else if (isAuthenticated) {
    return children;
  } else return <RouteLoadError
    message="Access Denied!"
  />;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  roles: PropTypes.array
};

export default ProtectedRoute;