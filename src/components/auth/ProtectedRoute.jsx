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
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsCheckingAuth(true);
      fetchData(
        "auth/check-token",
        () => {

          if (
            // If roles are defined and user has one of the roles
            (roles !== undefined && roles.length > 0
              && cookies['role'] !== undefined && roles.indexOf(cookies['role']) !== -1)
            ||
            // If roles are not defined and user has USER role
            (roles === undefined && cookies['role'] !== undefined && cookies['role'] === 'USER')
          ) {
            setIsAuthenticated(true);
          }
          else {
            setIsAuthenticated(false);
            showToast("Access Denied");
            // navigate('/auth');
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
  }, [isAuthenticated, roles, cookies]);

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